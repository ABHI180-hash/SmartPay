package com.smartpay.onboarding;

import com.smartpay.bank.BankAccount;
import java.util.List;

public class GoogleAuthResponse {
    private String accessToken;
    private String refreshToken;
    private String tokenType = "Bearer";
    private Long userId;
    private String email;
    private String fullName;
    private String phone;
    private String avatarUrl;
    private String upiId;
    private boolean isReturningUser;
    private boolean deviceTrusted;
    private boolean onboardingCompleted;
    private String onboardingStep;
    private List<BankAccount> verifiedBanks;
    private List<String> roles;

    public GoogleAuthResponse() {}

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    public String getTokenType() {
        return tokenType;
    }

    public void setTokenType(String tokenType) {
        this.tokenType = tokenType;
    }

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

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }

    public String getUpiId() {
        return upiId;
    }

    public void setUpiId(String upiId) {
        this.upiId = upiId;
    }

    public boolean isReturningUser() {
        return isReturningUser;
    }

    public void setReturningUser(boolean returningUser) {
        isReturningUser = returningUser;
    }

    public boolean isDeviceTrusted() {
        return deviceTrusted;
    }

    public void setDeviceTrusted(boolean deviceTrusted) {
        this.deviceTrusted = deviceTrusted;
    }

    public boolean isOnboardingCompleted() {
        return onboardingCompleted;
    }

    public void setOnboardingCompleted(boolean onboardingCompleted) {
        this.onboardingCompleted = onboardingCompleted;
    }

    public String getOnboardingStep() {
        return onboardingStep;
    }

    public void setOnboardingStep(String onboardingStep) {
        this.onboardingStep = onboardingStep;
    }

    public List<BankAccount> getVerifiedBanks() {
        return verifiedBanks;
    }

    public void setVerifiedBanks(List<BankAccount> verifiedBanks) {
        this.verifiedBanks = verifiedBanks;
    }

    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }
}
