package com.smartpay.onboarding;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "onboarding_sessions", indexes = {
    @Index(name = "idx_onboard_user", columnList = "userId")
})
public class OnboardingSession {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long userId;

    @Column(nullable = false, length = 40)
    private String currentStep = "WELCOME"; // WELCOME, GOOGLE_AUTH, MOBILE_OTP, BANK_SELECTION, BANK_DISCOVERY, BANK_VERIFICATION, CONFIRMATION, COMPLETED

    @Column(nullable = false, length = 30)
    private String onboardingStatus = "IN_PROGRESS"; // IN_PROGRESS, COMPLETED, ABANDONED

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    private LocalDateTime updatedAt = LocalDateTime.now();

    public OnboardingSession() {}

    public OnboardingSession(Long userId, String currentStep, String onboardingStatus) {
        this.userId = userId;
        this.currentStep = currentStep;
        this.onboardingStatus = onboardingStatus;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
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

    public String getCurrentStep() {
        return currentStep;
    }

    public void setCurrentStep(String currentStep) {
        this.currentStep = currentStep;
    }

    public String getOnboardingStatus() {
        return onboardingStatus;
    }

    public void setOnboardingStatus(String onboardingStatus) {
        this.onboardingStatus = onboardingStatus;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
