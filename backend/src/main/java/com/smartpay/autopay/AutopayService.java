package com.smartpay.autopay;

import com.smartpay.bank.BankAccount;
import com.smartpay.bank.BankAccountRepository;
import com.smartpay.exception.BadRequestException;
import com.smartpay.exception.ResourceNotFoundException;
import com.smartpay.payment.TransferRequest;
import com.smartpay.payment.PaymentService;
import com.smartpay.transaction.TransactionDto;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AutopayService {

    private final AutopayMandateRepository autopayMandateRepository;
    private final BankAccountRepository bankAccountRepository;
    private final PaymentService paymentService;
    private final SecureRandom random = new SecureRandom();

    public AutopayService(AutopayMandateRepository autopayMandateRepository,
                          BankAccountRepository bankAccountRepository,
                          PaymentService paymentService) {
        this.autopayMandateRepository = autopayMandateRepository;
        this.bankAccountRepository = bankAccountRepository;
        this.paymentService = paymentService;
    }

    @Transactional(readOnly = true)
    public List<AutopayDto> getMandates(Long userId) {
        return autopayMandateRepository.findByUserIdOrderByCreatedAtDesc(userId)
                .stream()
                .map(AutopayDto::new)
                .collect(Collectors.toList());
    }

    @Transactional
    public AutopayDto createMandate(Long userId, CreateAutopayRequest request) {
        if (request.getMerchantName() == null || request.getMerchantName().isBlank()) {
            throw new BadRequestException("Merchant name is required");
        }
        if (request.getAmount() == null || request.getAmount().signum() <= 0) {
            throw new BadRequestException("Amount must be positive");
        }

        String bankName = request.getBankName();
        String maskedAccount = request.getMaskedAccountNumber();

        if (bankName == null || bankName.isBlank()) {
            BankAccount primaryBank = bankAccountRepository.findByUserIdAndIsPrimaryTrue(userId)
                    .orElse(null);
            if (primaryBank != null) {
                bankName = primaryBank.getBankName();
                maskedAccount = primaryBank.getAccountNumberMasked();
            } else {
                bankName = "HDFC Bank";
                maskedAccount = "•••• 5543";
            }
        }

        // Generate NPCI Unique Mandate Number (UMN)
        String merchantClean = request.getMerchantName().replaceAll("[^a-zA-Z0-9]", "").toUpperCase();
        if (merchantClean.length() > 8) merchantClean = merchantClean.substring(0, 8);
        String umn = "MND/" + LocalDate.now().getYear() + "/" + merchantClean + "/" + (100000 + random.nextInt(900000));

        AutopayMandate mandate = new AutopayMandate(
                userId,
                request.getMerchantName().trim(),
                request.getCategory() != null ? request.getCategory() : "Subscription",
                request.getAmount(),
                request.getMaxAmount(),
                request.getFrequency() != null ? request.getFrequency() : "MONTHLY",
                bankName,
                maskedAccount,
                umn
        );

        AutopayMandate saved = autopayMandateRepository.save(mandate);
        return new AutopayDto(saved);
    }

    @Transactional
    public AutopayDto toggleStatus(Long userId, Long mandateId) {
        AutopayMandate mandate = autopayMandateRepository.findByIdAndUserId(mandateId, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Mandate not found with id: " + mandateId));

        if ("REVOKED".equalsIgnoreCase(mandate.getStatus())) {
            throw new BadRequestException("Cannot toggle a revoked mandate. Create a new one.");
        }

        String newStatus = "ACTIVE".equalsIgnoreCase(mandate.getStatus()) ? "PAUSED" : "ACTIVE";
        mandate.setStatus(newStatus);
        mandate.setUpdatedAt(LocalDateTime.now());
        AutopayMandate saved = autopayMandateRepository.save(mandate);
        return new AutopayDto(saved);
    }

    @Transactional
    public void revokeMandate(Long userId, Long mandateId) {
        AutopayMandate mandate = autopayMandateRepository.findByIdAndUserId(mandateId, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Mandate not found with id: " + mandateId));

        mandate.setStatus("REVOKED");
        mandate.setUpdatedAt(LocalDateTime.now());
        autopayMandateRepository.save(mandate);
    }

    @Transactional
    public TransactionDto executeMandateDebit(Long userId, Long mandateId) {
        AutopayMandate mandate = autopayMandateRepository.findByIdAndUserId(mandateId, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Mandate not found with id: " + mandateId));

        if (!"ACTIVE".equalsIgnoreCase(mandate.getStatus())) {
            throw new BadRequestException("Mandate is not active (current status: " + mandate.getStatus() + ")");
        }

        // Process recurring payment
        TransferRequest transferRequest = new TransferRequest();
        transferRequest.setRecipientIdentifier(mandate.getMerchantName().toLowerCase().replaceAll("\\s+", "") + "@autopay");
        transferRequest.setRecipientName(mandate.getMerchantName());
        transferRequest.setAmount(mandate.getAmount());
        transferRequest.setPaymentMode("BANK_ACCOUNT");
        transferRequest.setCategory("AUTOPAY");
        transferRequest.setNote("AutoPay Mandate Debit: " + mandate.getUmn());

        TransactionDto txn = paymentService.processTransfer(userId, transferRequest);

        // Update mandate next schedule
        mandate.setLastDebitAt(LocalDateTime.now());
        if ("MONTHLY".equalsIgnoreCase(mandate.getFrequency())) {
            mandate.setNextDebitDate(mandate.getNextDebitDate().plusMonths(1));
        } else if ("WEEKLY".equalsIgnoreCase(mandate.getFrequency())) {
            mandate.setNextDebitDate(mandate.getNextDebitDate().plusWeeks(1));
        } else if ("QUARTERLY".equalsIgnoreCase(mandate.getFrequency())) {
            mandate.setNextDebitDate(mandate.getNextDebitDate().plusMonths(3));
        } else if ("ANNUALLY".equalsIgnoreCase(mandate.getFrequency())) {
            mandate.setNextDebitDate(mandate.getNextDebitDate().plusYears(1));
        }
        mandate.setUpdatedAt(LocalDateTime.now());
        autopayMandateRepository.save(mandate);

        return txn;
    }
}
