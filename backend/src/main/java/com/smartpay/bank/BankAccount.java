package com.smartpay.bank;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "bank_accounts")
public class BankAccount {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long userId;

    @Column(length = 20)
    private String bankCode; // e.g. HDFC, SBI, ICICI, AXIS

    @Column(nullable = false, length = 100)
    private String bankName;

    @Column(nullable = false, length = 30)
    private String accountNumberMasked;

    @Column(length = 100)
    private String accountHolderName;

    @Column(length = 30)
    private String accountType = "SAVINGS";

    @Column(length = 20)
    private String ifscCode;

    @Column(length = 100)
    private String providerReference; // e.g. NPCI-PSP-SETU-87391

    @Column(length = 25)
    private String verificationStatus = "VERIFIED"; // VERIFIED, PENDING, FAILED, REVOKED

    @Column(nullable = false)
    private boolean isPrimary = false;

    @Column(precision = 15, scale = 2)
    private BigDecimal simulatedBalance = new BigDecimal("45200.50");

    @Column(nullable = false)
    private boolean upiLinked = true;

    private String logoUrl;

    private LocalDateTime verifiedAt = LocalDateTime.now();

    private LocalDateTime lastCheckedAt = LocalDateTime.now();

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public BankAccount() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getBankCode() {
        return bankCode;
    }

    public void setBankCode(String bankCode) {
        this.bankCode = bankCode;
    }

    public String getBankName() {
        return bankName;
    }

    public void setBankName(String bankName) {
        this.bankName = bankName;
    }

    public String getAccountNumberMasked() {
        return accountNumberMasked;
    }

    public void setAccountNumberMasked(String accountNumberMasked) {
        this.accountNumberMasked = accountNumberMasked;
    }

    public String getAccountHolderName() {
        return accountHolderName;
    }

    public void setAccountHolderName(String accountHolderName) {
        this.accountHolderName = accountHolderName;
    }

    public String getAccountType() {
        return accountType;
    }

    public void setAccountType(String accountType) {
        this.accountType = accountType;
    }

    public String getIfscCode() {
        return ifscCode;
    }

    public void setIfscCode(String ifscCode) {
        this.ifscCode = ifscCode;
    }

    public String getProviderReference() {
        return providerReference;
    }

    public void setProviderReference(String providerReference) {
        this.providerReference = providerReference;
    }

    public String getVerificationStatus() {
        return verificationStatus;
    }

    public void setVerificationStatus(String verificationStatus) {
        this.verificationStatus = verificationStatus;
    }

    public boolean isPrimary() {
        return isPrimary;
    }

    public void setPrimary(boolean primary) {
        isPrimary = primary;
    }

    public BigDecimal getSimulatedBalance() {
        return simulatedBalance;
    }

    public void setSimulatedBalance(BigDecimal simulatedBalance) {
        this.simulatedBalance = simulatedBalance;
    }

    public boolean isUpiLinked() {
        return upiLinked;
    }

    public void setUpiLinked(boolean upiLinked) {
        this.upiLinked = upiLinked;
    }

    public String getLogoUrl() {
        return logoUrl;
    }

    public void setLogoUrl(String logoUrl) {
        this.logoUrl = logoUrl;
    }

    public LocalDateTime getVerifiedAt() {
        return verifiedAt;
    }

    public void setVerifiedAt(LocalDateTime verifiedAt) {
        this.verifiedAt = verifiedAt;
    }

    public LocalDateTime getLastCheckedAt() {
        return lastCheckedAt;
    }

    public void setLastCheckedAt(LocalDateTime lastCheckedAt) {
        this.lastCheckedAt = lastCheckedAt;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
