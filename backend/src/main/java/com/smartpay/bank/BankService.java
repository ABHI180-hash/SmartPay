package com.smartpay.bank;

import com.smartpay.exception.BadRequestException;
import com.smartpay.exception.ResourceNotFoundException;
import com.smartpay.onboarding.BankVerificationLog;
import com.smartpay.onboarding.BankVerificationLogRepository;
import com.smartpay.user.User;
import com.smartpay.user.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class BankService {

    private final BankAccountRepository bankRepository;
    private final BankServiceProvider bankServiceProvider;
    private final BankVerificationLogRepository bankVerificationLogRepository;
    private final UserRepository userRepository;
    private final SecureRandom random = new SecureRandom();

    public BankService(
            BankAccountRepository bankRepository,
            BankServiceProvider bankServiceProvider,
            BankVerificationLogRepository bankVerificationLogRepository,
            UserRepository userRepository) {
        this.bankRepository = bankRepository;
        this.bankServiceProvider = bankServiceProvider;
        this.bankVerificationLogRepository = bankVerificationLogRepository;
        this.userRepository = userRepository;
    }

    /**
     * Get all supported Indian banks
     */
    public List<SupportedBankDto> getSupportedBanks() {
        return bankServiceProvider.getSupportedBanks();
    }

    /**
     * Search supported Indian banks
     */
    public List<SupportedBankDto> searchBanks(String query) {
        return bankServiceProvider.searchBanks(query);
    }

    /**
     * Discover eligible accounts for a user at a given bank via PSP/provider
     */
    @Transactional(readOnly = true)
    public List<DiscoveredAccountDto> discoverAccounts(Long userId, String bankCode, String mobileNumber) {
        String phone = mobileNumber;
        String userName = "AVIJIT ROY";
        if (userId != null) {
            Optional<User> u = userRepository.findById(userId);
            if (u.isPresent()) {
                if (phone == null || phone.isBlank()) {
                    phone = u.get().getPhone();
                }
                userName = u.get().getFullName();
            }
        }
        return bankServiceProvider.discoverAccounts(bankCode, phone, userName);
    }

    /**
     * Verify and link bank account with official PSP provider reference
     */
    @Transactional
    public BankAccount verifyAndLinkAccount(Long userId, BankVerificationRequest request) {
        if (userId == null) {
            userId = 1L; // Fallback to primary account
        }

        // Call Provider
        BankVerificationResult result = bankServiceProvider.verifyAccount(request, userId);
        if (!result.isSuccessful()) {
            // Log failure
            bankVerificationLogRepository.save(new BankVerificationLog(
                    userId, null, "NONE", "FAILED", result.getFailureReason()));
            throw new BadRequestException("Bank verification failed: " + result.getFailureReason());
        }

        // Clear existing primary if requested
        if (request.isSetPrimary()) {
            bankRepository.findByUserIdAndIsPrimaryTrue(userId).ifPresent(acc -> {
                acc.setPrimary(false);
                bankRepository.save(acc);
            });
        }

        // Check if account already linked
        Optional<BankAccount> existing = bankRepository.findByUserId(userId).stream()
                .filter(a -> a.getBankName().equalsIgnoreCase(request.getBankCode())
                        || a.getAccountNumberMasked().equalsIgnoreCase(request.getMaskedAccountNumber()))
                .findFirst();

        BankAccount account;
        if (existing.isPresent()) {
            account = existing.get();
            account.setVerificationStatus("VERIFIED");
            account.setProviderReference(result.getProviderReference());
            account.setLastCheckedAt(LocalDateTime.now());
            if (request.isSetPrimary()) {
                account.setPrimary(true);
            }
        } else {
            account = new BankAccount();
            account.setUserId(userId);
            account.setBankCode(request.getBankCode().toUpperCase());
            account.setBankName(getBankDisplayName(request.getBankCode()));
            account.setAccountNumberMasked(request.getMaskedAccountNumber());
            account.setAccountHolderName(request.getAccountHolderName() != null ? request.getAccountHolderName() : "AVIJIT ROY");
            account.setAccountType(request.getAccountType() != null ? request.getAccountType() : "SAVINGS");
            account.setIfscCode(request.getIfscCode() != null ? request.getIfscCode() : request.getBankCode() + "0001048");
            account.setProviderReference(result.getProviderReference());
            account.setVerificationStatus("VERIFIED");
            account.setPrimary(request.isSetPrimary() || bankRepository.findByUserId(userId).isEmpty());
            account.setSimulatedBalance(new BigDecimal(35000 + random.nextInt(45000)));
            account.setUpiLinked(true);
            account.setVerifiedAt(LocalDateTime.now());
            account.setLastCheckedAt(LocalDateTime.now());
        }

        BankAccount saved = bankRepository.save(account);

        // Audit log in bank_verification_logs
        bankVerificationLogRepository.save(new BankVerificationLog(
                userId, saved.getId(), result.getProviderReference(), "SUCCESS", null));

        return saved;
    }

    @Transactional(readOnly = true)
    public List<BankAccount> getAccountsByUserId(Long userId) {
        return bankRepository.findByUserId(userId);
    }

    @Transactional(readOnly = true)
    public List<BankAccount> getVerifiedAccounts(Long userId) {
        return bankRepository.findByUserIdAndVerificationStatus(userId, "VERIFIED");
    }

    @Transactional(readOnly = true)
    public BankAccount getPrimaryAccount(Long userId) {
        return bankRepository.findByUserIdAndIsPrimaryTrue(userId)
                .orElseGet(() -> bankRepository.findByUserId(userId).stream().findFirst().orElse(null));
    }

    @Transactional
    public BankAccount setPrimaryAccount(Long userId, Long accountId) {
        BankAccount target = bankRepository.findById(accountId)
                .orElseThrow(() -> new ResourceNotFoundException("Bank account not found: " + accountId));

        if (!target.getUserId().equals(userId)) {
            throw new ResourceNotFoundException("Account does not belong to user");
        }

        bankRepository.findByUserIdAndIsPrimaryTrue(userId).ifPresent(acc -> {
            acc.setPrimary(false);
            bankRepository.save(acc);
        });

        target.setPrimary(true);
        return bankRepository.save(target);
    }

    @Transactional
    public void unlinkAccount(Long userId, Long accountId) {
        BankAccount target = bankRepository.findById(accountId)
                .orElseThrow(() -> new ResourceNotFoundException("Bank account not found: " + accountId));

        if (!target.getUserId().equals(userId)) {
            throw new ResourceNotFoundException("Account does not belong to user");
        }

        // Soft mark or deactivate while preserving logs
        target.setVerificationStatus("REVOKED");
        target.setUpiLinked(false);
        target.setPrimary(false);
        bankRepository.save(target);

        // Audit log
        bankVerificationLogRepository.save(new BankVerificationLog(
                userId, target.getId(), target.getProviderReference() != null ? target.getProviderReference() : "UNLINK",
                "REVOKED", "User unlinked bank account"));
    }

    @Transactional(readOnly = true)
    public BigDecimal checkBalance(Long userId, Long accountId) {
        BankAccount target = bankRepository.findById(accountId)
                .orElseThrow(() -> new ResourceNotFoundException("Bank account not found"));

        if (!target.getUserId().equals(userId)) {
            throw new ResourceNotFoundException("Account does not belong to user");
        }

        return target.getSimulatedBalance();
    }

    @Transactional(readOnly = true)
    public Optional<BankVerificationLog> getVerificationLogByReference(String reference) {
        return bankVerificationLogRepository.findByProviderReference(reference);
    }

    private String getBankDisplayName(String code) {
        if ("HDFC".equalsIgnoreCase(code)) return "HDFC Bank";
        if ("SBI".equalsIgnoreCase(code)) return "State Bank of India";
        if ("ICICI".equalsIgnoreCase(code)) return "ICICI Bank";
        if ("AXIS".equalsIgnoreCase(code)) return "Axis Bank";
        if ("PNB".equalsIgnoreCase(code)) return "Punjab National Bank";
        if ("BOB".equalsIgnoreCase(code)) return "Bank of Baroda";
        if ("KOTAK".equalsIgnoreCase(code)) return "Kotak Mahindra Bank";
        if ("IDFC".equalsIgnoreCase(code)) return "IDFC FIRST Bank";
        return code.toUpperCase() + " Bank";
    }
}
