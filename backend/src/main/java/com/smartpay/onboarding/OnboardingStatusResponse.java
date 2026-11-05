package com.smartpay.onboarding;

import com.smartpay.bank.BankAccount;
import java.util.List;

public class OnboardingStatusResponse {
    private Long userId;
    private String email;
    private String fullName;
    private String mobileNumber;
    private boolean onboardingCompleted;
    private String currentStep;
    private int verifiedBanksCount;
    private BankAccount primaryBank;
    private List<BankAccount> verifiedBanks;
    private boolean deviceTrusted;

    public OnboardingStatusResponse() {}

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getMobileNumber() {
        return mobileNumber;
    }

    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    public boolean isOnboardingCompleted() {
        return onboardingCompleted;
    }

    public void setOnboardingCompleted(boolean onboardingCompleted) {
        this.onboardingCompleted = onboardingCompleted;
    }

    public String getCurrentStep() {
        return currentStep;
    }

    public void setCurrentStep(String currentStep) {
        this.currentStep = currentStep;
    }

    public int getVerifiedBanksCount() {
        return verifiedBanksCount;
    }

    public void setVerifiedBanksCount(int verifiedBanksCount) {
        this.verifiedBanksCount = verifiedBanksCount;
    }

    public BankAccount getPrimaryBank() {
        return primaryBank;
    }

    public void setPrimaryBank(BankAccount primaryBank) {
        this.primaryBank = primaryBank;
    }

    public List<BankAccount> getVerifiedBanks() {
        return verifiedBanks;
    }

    public void setVerifiedBanks(List<BankAccount> verifiedBanks) {
        this.verifiedBanks = verifiedBanks;
    }

    public boolean isDeviceTrusted() {
        return deviceTrusted;
    }

    public void setDeviceTrusted(boolean deviceTrusted) {
        this.deviceTrusted = deviceTrusted;
    }
}
