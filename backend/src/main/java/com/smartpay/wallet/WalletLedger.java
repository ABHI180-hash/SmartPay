package com.smartpay.wallet;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "wallet_ledger")
public class WalletLedger {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long walletId;

    @Column(nullable = false, length = 10)
    private String entryType; // DEBIT or CREDIT

    @Column(nullable = false, precision = 15, scale = 2)
    private BigDecimal amount;

    @Column(nullable = false, precision = 15, scale = 2)
    private BigDecimal openingBalance;

    @Column(nullable = false, precision = 15, scale = 2)
    private BigDecimal closingBalance;

    @Column(length = 40)
    private String transactionType = "TRANSFER";

    @Column(nullable = false, length = 60)
    private String transactionRef;

    @Column(length = 255)
    private String description;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    public WalletLedger() {
        this.createdAt = LocalDateTime.now();
    }

    public WalletLedger(Long walletId, String entryType, BigDecimal amount, BigDecimal openingBalance, BigDecimal closingBalance, String transactionRef, String description) {
        this.walletId = walletId;
        this.entryType = entryType;
        this.amount = amount;
        this.openingBalance = openingBalance;
        this.closingBalance = closingBalance;
        this.transactionRef = transactionRef;
        this.description = description;
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getWalletId() {
        return walletId;
    }

    public void setWalletId(Long walletId) {
        this.walletId = walletId;
    }

    public String getEntryType() {
        return entryType;
    }

    public void setEntryType(String entryType) {
        this.entryType = entryType;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public BigDecimal getOpeningBalance() {
        return openingBalance;
    }

    public void setOpeningBalance(BigDecimal openingBalance) {
        this.openingBalance = openingBalance;
    }

    public BigDecimal getClosingBalance() {
        return closingBalance;
    }

    public void setClosingBalance(BigDecimal closingBalance) {
        this.closingBalance = closingBalance;
    }

    public String getTransactionType() {
        return transactionType;
    }

    public void setTransactionType(String transactionType) {
        this.transactionType = transactionType;
    }

    public String getTransactionRef() {
        return transactionRef;
    }

    public void setTransactionRef(String transactionRef) {
        this.transactionRef = transactionRef;
    }

    public String getReferenceNumber() {
        return transactionRef;
    }

    public void setReferenceNumber(String referenceNumber) {
        this.transactionRef = referenceNumber;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
