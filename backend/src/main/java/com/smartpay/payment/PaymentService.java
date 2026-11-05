package com.smartpay.payment;

import com.smartpay.bank.BankAccount;
import com.smartpay.bank.BankAccountRepository;
import com.smartpay.exception.BadRequestException;
import com.smartpay.exception.FraudRiskBlockedException;
import com.smartpay.exception.InsufficientFundsException;
import com.smartpay.exception.ResourceNotFoundException;
import com.smartpay.fraud.FraudAnalysisRequest;
import com.smartpay.fraud.FraudAnalysisResult;
import com.smartpay.fraud.FraudService;
import com.smartpay.transaction.Transaction;
import com.smartpay.transaction.TransactionDto;
import com.smartpay.transaction.TransactionRepository;
import com.smartpay.user.User;
import com.smartpay.user.UserRepository;
import com.smartpay.wallet.WalletService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class PaymentService {

    private final TransactionRepository transactionRepository;
    private final WalletService walletService;
    private final UserRepository userRepository;
    private final BankAccountRepository bankAccountRepository;
    private final FraudService fraudService;
    private final SecureRandom random = new SecureRandom();

    public PaymentService(TransactionRepository transactionRepository,
                          WalletService walletService,
                          UserRepository userRepository,
                          BankAccountRepository bankAccountRepository,
                          FraudService fraudService) {
        this.transactionRepository = transactionRepository;
        this.walletService = walletService;
        this.userRepository = userRepository;
        this.bankAccountRepository = bankAccountRepository;
        this.fraudService = fraudService;
    }

    @Transactional
    public TransactionDto processTransfer(Long senderId, TransferRequest request) {
        // 1. Idempotency protection against double submit
        if (request.getIdempotencyKey() != null && !request.getIdempotencyKey().isBlank()) {
            Optional<Transaction> existing = transactionRepository.findByIdempotencyKey(request.getIdempotencyKey().trim());
            if (existing.isPresent()) {
                return new TransactionDto(existing.get());
            }
        }

        // 2. Fetch sender
        User sender = userRepository.findById(senderId)
                .orElseThrow(() -> new ResourceNotFoundException("Sender user not found: " + senderId));

        // 3. AI Scam Shield check
        FraudAnalysisRequest fraudReq = new FraudAnalysisRequest(
                request.getRecipientIdentifier(),
                request.getRecipientName(),
                request.getAmount(),
                request.getNote()
        );
        FraudAnalysisResult fraudCheck = fraudService.analyzeTransaction(senderId, fraudReq);
        if ("CRITICAL".equalsIgnoreCase(fraudCheck.getRiskLevel())) {
            throw new FraudRiskBlockedException("Payment blocked by AI Scam Shield: " + fraudCheck.getWarningMessage());
        }

        // 4. Resolve recipient
        String identifier = request.getRecipientIdentifier().trim();
        Optional<User> recipientOpt = userRepository.findByPhone(identifier)
                .or(() -> userRepository.findByUpiId(identifier))
                .or(() -> userRepository.findByUsername(identifier));

        String recipientName = request.getRecipientName() != null && !request.getRecipientName().isBlank()
                ? request.getRecipientName()
                : (recipientOpt.isPresent() ? recipientOpt.get().getFullName() : identifier);

        String recipientUpi = recipientOpt.isPresent()
                ? recipientOpt.get().getUpiId()
                : (identifier.contains("@") ? identifier : identifier + "@smartpay");

        // 5. Generate Reference and UTR
        String datePrefix = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        String txnRef = "TXN" + datePrefix + (100000 + random.nextInt(900000));
        String utr = "43" + datePrefix.substring(4) + (100000 + random.nextInt(900000));

        // 6. Handle Debit: Bank Account vs Wallet
        String mode = request.getPaymentMode() != null ? request.getPaymentMode().toUpperCase() : "WALLET";
        String chosenBankName = "SmartPay Core Wallet";

        if (mode.contains("BANK")) {
            BankAccount bank = null;
            if (request.getBankAccountId() != null) {
                bank = bankAccountRepository.findByIdAndUserId(request.getBankAccountId(), senderId).orElse(null);
            }
            if (bank == null) {
                bank = bankAccountRepository.findByUserIdAndIsPrimaryTrue(senderId)
                        .or(() -> bankAccountRepository.findByUserId(senderId).stream().findFirst())
                        .orElse(null);
            }

            if (bank != null) {
                chosenBankName = bank.getBankName() + " " + bank.getAccountNumberMasked();
                BigDecimal currentBal = bank.getSimulatedBalance() != null ? bank.getSimulatedBalance() : new BigDecimal("45000.00");
                if (currentBal.compareTo(request.getAmount()) < 0) {
                    throw new InsufficientFundsException("Insufficient funds in " + bank.getBankName() + ". Available: ₹" + currentBal);
                }
                bank.setSimulatedBalance(currentBal.subtract(request.getAmount()));
                bank.setLastCheckedAt(LocalDateTime.now());
                bankAccountRepository.save(bank);
            } else {
                chosenBankName = request.getBankName() != null ? request.getBankName() : "HDFC Bank •••• 5543";
            }
        } else {
            // Debit sender's wallet (atomic & pessimistic lock protected)
            walletService.debit(senderId, request.getAmount(), txnRef, "Transfer to " + recipientName);
        }

        // 7. If recipient exists in SmartPay, credit their wallet
        if (recipientOpt.isPresent()) {
            walletService.credit(recipientOpt.get().getId(), request.getAmount(), txnRef, "Received from " + sender.getFullName());
        }

        // 8. Persist transaction record
        Transaction txn = new Transaction();
        txn.setTransactionReference(txnRef);
        txn.setUtrNumber(utr);
        txn.setSenderId(senderId);
        txn.setSenderName(sender.getFullName());
        txn.setSenderUpiId(sender.getUpiId());
        txn.setRecipientId(recipientOpt.map(User::getId).orElse(null));
        txn.setRecipientName(recipientName);
        txn.setRecipientUpiId(recipientUpi);
        txn.setAmount(request.getAmount());
        txn.setPaymentMode(mode);
        txn.setBankName(chosenBankName);
        txn.setAuthMethod((Boolean.TRUE.equals(request.getBiometricVerified()) || "BIOMETRIC".equalsIgnoreCase(request.getAuthMethod())) ? "BIOMETRIC" : "PIN");
        txn.setStatus("SUCCESS");
        txn.setType("PAYMENT");
        txn.setCategory(request.getCategory() != null ? request.getCategory() : "GENERAL");
        txn.setNote(request.getNote());
        txn.setIdempotencyKey(request.getIdempotencyKey() != null ? request.getIdempotencyKey().trim() : UUID.randomUUID().toString());
        txn.setRiskScore(fraudCheck.getRiskScore());

        Transaction savedTxn = transactionRepository.save(txn);
        return new TransactionDto(savedTxn);
    }

    @Transactional(readOnly = true)
    public List<TransactionDto> getTransactionsForUser(Long userId) {
        return transactionRepository.findBySenderIdOrRecipientIdOrderByCreatedAtDesc(userId, userId)
                .stream()
                .map(TransactionDto::new)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public TransactionDto getByReference(String reference) {
        Transaction txn = transactionRepository.findByTransactionReference(reference)
                .orElseThrow(() -> new ResourceNotFoundException("Transaction not found for reference: " + reference));
        return new TransactionDto(txn);
    }
}
