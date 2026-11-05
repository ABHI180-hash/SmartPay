package com.smartpay.onboarding;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "bank_verification_logs", indexes = {
    @Index(name = "idx_bank_verif_user", columnList = "userId"),
    @Index(name = "idx_bank_verif_ref", columnList = "providerReference")
})
public class BankVerificationLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long userId;

    private Long bankAccountId;

    @Column(nullable = false, length = 100)
    private String providerReference;

    @Column(nullable = false, length = 30)
    private String verificationStatus; // SUCCESS, FAILED, PENDING, REVOKED

    @Column(length = 255)
    private String failureReason;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public BankVerificationLog() {}

    public BankVerificationLog(Long userId, Long bankAccountId, String providerReference, String verificationStatus, String failureReason) {
        this.userId = userId;
        this.bankAccountId = bankAccountId;
        this.providerReference = providerReference;
        this.verificationStatus = verificationStatus;
        this.failureReason = failureReason;
        this.createdAt = LocalDateTime.now();
    }

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

    public Long getBankAccountId() {
        return bankAccountId;
    }

    public void setBankAccountId(Long bankAccountId) {
        this.bankAccountId = bankAccountId;
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

    public String getFailureReason() {
        return failureReason;
    }

    public void setFailureReason(String failureReason) {
        this.failureReason = failureReason;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
