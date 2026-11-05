package com.smartpay.onboarding;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "verified_mobile_numbers", indexes = {
    @Index(name = "idx_verified_mobile", columnList = "mobileNumber")
})
public class VerifiedMobileNumber {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;

    @Column(nullable = false, length = 20)
    private String mobileNumber;

    @Column(nullable = false, length = 25)
    private String verificationStatus = "VERIFIED"; // VERIFIED, PENDING, EXPIRED

    @Column(nullable = false)
    private LocalDateTime verifiedAt = LocalDateTime.now();

    public VerifiedMobileNumber() {}

    public VerifiedMobileNumber(Long userId, String mobileNumber, String verificationStatus) {
        this.userId = userId;
        this.mobileNumber = mobileNumber;
        this.verificationStatus = verificationStatus;
        this.verifiedAt = LocalDateTime.now();
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

    public String getMobileNumber() {
        return mobileNumber;
    }

    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    public String getVerificationStatus() {
        return verificationStatus;
    }

    public void setVerificationStatus(String verificationStatus) {
        this.verificationStatus = verificationStatus;
    }

    public LocalDateTime getVerifiedAt() {
        return verifiedAt;
    }

    public void setVerifiedAt(LocalDateTime verifiedAt) {
        this.verifiedAt = verifiedAt;
    }
}
