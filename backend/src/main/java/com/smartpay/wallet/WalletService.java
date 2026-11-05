package com.smartpay.wallet;

import com.smartpay.exception.BadRequestException;
import com.smartpay.exception.InsufficientFundsException;
import com.smartpay.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Service
public class WalletService {

    private final WalletRepository walletRepository;
    private final WalletLedgerRepository ledgerRepository;

    public WalletService(WalletRepository walletRepository, WalletLedgerRepository ledgerRepository) {
        this.walletRepository = walletRepository;
        this.ledgerRepository = ledgerRepository;
    }

    @Transactional(readOnly = true)
    public WalletDto getWalletByUserId(Long userId) {
        Wallet wallet = walletRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Wallet not found for user: " + userId));
        return new WalletDto(wallet);
    }

    @Transactional
    public Wallet createWalletForUser(Long userId) {
        return walletRepository.findByUserId(userId).orElseGet(() -> {
            Wallet wallet = new Wallet();
            wallet.setUserId(userId);
            wallet.setBalance(BigDecimal.ZERO);
            wallet.setUpiLiteXBalance(BigDecimal.ZERO);
            wallet.setUpiLiteXEnabled(true);
            wallet.setStatus("ACTIVE");
            wallet.setCurrency("INR");
            return walletRepository.save(wallet);
        });
    }

    @Transactional
    public WalletDto addMoney(Long userId, AddMoneyRequest request) {
        if (request.getAmount() == null || request.getAmount().compareTo(BigDecimal.ZERO) <= 0) {
            throw new BadRequestException("Amount must be greater than zero");
        }

        Wallet wallet = walletRepository.findByUserIdWithLock(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Wallet not found for user: " + userId));

        if (!"ACTIVE".equalsIgnoreCase(wallet.getStatus())) {
            throw new BadRequestException("Wallet is not active: " + wallet.getStatus());
        }

        BigDecimal openingBalance = wallet.getBalance();
        BigDecimal closingBalance = openingBalance.add(request.getAmount());
        wallet.setBalance(closingBalance);
        walletRepository.save(wallet);

        String reference = (request.getReference() != null && !request.getReference().isBlank())
                ? request.getReference()
                : "TOPUP-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();

        WalletLedger ledger = new WalletLedger();
        ledger.setWalletId(wallet.getId());
        ledger.setEntryType("CREDIT");
        ledger.setAmount(request.getAmount());
        ledger.setOpeningBalance(openingBalance);
        ledger.setClosingBalance(closingBalance);
        ledger.setTransactionType("ADD_MONEY");
        ledger.setReferenceNumber(reference);
        ledger.setDescription("Top-up via " + (request.getSource() != null ? request.getSource() : "Bank Account"));
        ledgerRepository.save(ledger);

        return new WalletDto(wallet);
    }

    @Transactional
    public Wallet debit(Long userId, BigDecimal amount, String referenceNumber, String description) {
        if (amount == null || amount.compareTo(BigDecimal.ZERO) <= 0) {
            throw new BadRequestException("Debit amount must be positive");
        }

        Wallet wallet = walletRepository.findByUserIdWithLock(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Wallet not found for user: " + userId));

        if (wallet.getBalance().compareTo(amount) < 0) {
            throw new InsufficientFundsException(
                    "Insufficient wallet balance. Available: ₹" + wallet.getBalance() + ", Required: ₹" + amount
            );
        }

        BigDecimal openingBalance = wallet.getBalance();
        BigDecimal closingBalance = openingBalance.subtract(amount);
        wallet.setBalance(closingBalance);
        walletRepository.save(wallet);

        WalletLedger ledger = new WalletLedger();
        ledger.setWalletId(wallet.getId());
        ledger.setEntryType("DEBIT");
        ledger.setAmount(amount);
        ledger.setOpeningBalance(openingBalance);
        ledger.setClosingBalance(closingBalance);
        ledger.setTransactionType("PAYMENT");
        ledger.setReferenceNumber(referenceNumber);
        ledger.setDescription(description != null ? description : "Payment deduction");
        ledgerRepository.save(ledger);

        return wallet;
    }

    @Transactional
    public Wallet credit(Long userId, BigDecimal amount, String referenceNumber, String description) {
        if (amount == null || amount.compareTo(BigDecimal.ZERO) <= 0) {
            throw new BadRequestException("Credit amount must be positive");
        }

        Wallet wallet = walletRepository.findByUserIdWithLock(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Wallet not found for user: " + userId));

        BigDecimal openingBalance = wallet.getBalance();
        BigDecimal closingBalance = openingBalance.add(amount);
        wallet.setBalance(closingBalance);
        walletRepository.save(wallet);

        WalletLedger ledger = new WalletLedger();
        ledger.setWalletId(wallet.getId());
        ledger.setEntryType("CREDIT");
        ledger.setAmount(amount);
        ledger.setOpeningBalance(openingBalance);
        ledger.setClosingBalance(closingBalance);
        ledger.setTransactionType("RECEIVE");
        ledger.setReferenceNumber(referenceNumber);
        ledger.setDescription(description != null ? description : "Payment received");
        ledgerRepository.save(ledger);

        return wallet;
    }

    @Transactional
    public WalletDto toggleUpiLiteX(Long userId, boolean enabled) {
        Wallet wallet = walletRepository.findByUserIdWithLock(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Wallet not found"));
        wallet.setUpiLiteXEnabled(enabled);
        return new WalletDto(walletRepository.save(wallet));
    }

    @Transactional(readOnly = true)
    public List<WalletLedger> getLedgerEntries(Long userId) {
        Wallet wallet = walletRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Wallet not found"));
        return ledgerRepository.findByWalletIdOrderByCreatedAtDesc(wallet.getId());
    }
}
