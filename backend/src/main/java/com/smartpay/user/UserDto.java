package com.smartpay.user;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

public class UserDto {

    private Long id;
    private String username;
    private String fullName;
    private String email;
    private String phone;
    private String upiId;
    private String avatarUrl;
    private boolean kycVerified;
    private boolean enabled;
    private Boolean biometricEnabled;
    private java.math.BigDecimal quickPayLimit;
    private List<String> roles;
    private LocalDateTime createdAt;

    public UserDto() {}

    public UserDto(User user) {
        this.id = user.getId();
        this.username = user.getUsername();
        this.fullName = user.getFullName();
        this.email = user.getEmail();
        this.phone = user.getPhone();
        this.upiId = user.getUpiId();
        this.avatarUrl = user.getAvatarUrl();
        this.kycVerified = user.isKycVerified();
        this.enabled = user.isEnabled();
        this.biometricEnabled = user.getBiometricEnabled();
        this.quickPayLimit = user.getQuickPayLimit();
        this.roles = user.getRoles() != null
                ? user.getRoles().stream().map(Role::getName).collect(Collectors.toList())
                : List.of();
        this.createdAt = user.getCreatedAt();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getUpiId() {
        return upiId;
    }

    public void setUpiId(String upiId) {
        this.upiId = upiId;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }

    public boolean isKycVerified() {
        return kycVerified;
    }

    public void setKycVerified(boolean kycVerified) {
        this.kycVerified = kycVerified;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public Boolean getBiometricEnabled() {
        return biometricEnabled;
    }

    public void setBiometricEnabled(Boolean biometricEnabled) {
        this.biometricEnabled = biometricEnabled;
    }

    public java.math.BigDecimal getQuickPayLimit() {
        return quickPayLimit;
    }

    public void setQuickPayLimit(java.math.BigDecimal quickPayLimit) {
        this.quickPayLimit = quickPayLimit;
    }

    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
