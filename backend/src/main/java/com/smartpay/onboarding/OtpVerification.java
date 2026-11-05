package com.smartpay.onboarding;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "otp_verifications", indexes = {
    @Index(name = "idx_otp_dest", columnList = "destinationHash"),
    @Index(name = "idx_otp_purpose", columnList = "purpose")
})
public class OtpVerification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;

    @Column(nullable = false, length = 128)
    private String destinationHash; // SHA-256 hash of normalized phone number

    @Column(nullable = false, length = 40)
    private String purpose = "ONBOARDING_MOBILE"; // ONBOARDING_MOBILE, DEVICE_VERIFICATION, LOGIN, PIN_RESET

    @Column(nullable = false, length = 128)
    private String otpHash; // BCrypt or SHA-256 hashed OTP value (never stored in plain text!)

    @Column(nullable = false)
    private LocalDateTime expiresAt;

    private LocalDateTime verifiedAt;

    @Column(nullable = false)
    private int attemptCount = 0;

    @Column(nullable = false, length = 30)
    private String status = "PENDING"; // PENDING, VERIFIED, EXPIRED, MAX_ATTEMPTS_EXCEEDED

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public OtpVerification() {}

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

    public String getDestinationHash() {
        return destinationHash;
    }

    public void setDestinationHash(String destinationHash) {
        this.destinationHash = destinationHash;
    }

    public String getPurpose() {
        return purpose;
    }

    public void setPurpose(String purpose) {
        this.purpose = purpose;
    }

    public String getOtpHash() {
        return otpHash;
    }

    public void setOtpHash(String otpHash) {
        this.otpHash = otpHash;
    }

    public LocalDateTime getExpiresAt() {
        return expiresAt;
    }

    public void setExpiresAt(LocalDateTime expiresAt) {
        this.expiresAt = expiresAt;
    }

    public LocalDateTime getVerifiedAt() {
        return verifiedAt;
    }

    public void setVerifiedAt(LocalDateTime verifiedAt) {
        this.verifiedAt = verifiedAt;
    }

    public int getAttemptCount() {
        return attemptCount;
    }

    public void setAttemptCount(int attemptCount) {
        this.attemptCount = attemptCount;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
