package com.smartpay.onboarding;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "device_sessions", indexes = {
    @Index(name = "idx_device_user", columnList = "userId"),
    @Index(name = "idx_device_hash", columnList = "deviceIdentifierHash")
})
public class DeviceSession {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long userId;

    @Column(nullable = false, length = 128)
    private String deviceIdentifierHash;

    @Column(length = 100)
    private String deviceName = "Web Browser (Chrome/Firefox)";

    @Column(nullable = false, length = 25)
    private String trustStatus = "TRUSTED"; // TRUSTED, UNTRUSTED, PENDING_OTP

    private LocalDateTime lastLoginAt = LocalDateTime.now();

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public DeviceSession() {}

    public DeviceSession(Long userId, String deviceIdentifierHash, String deviceName, String trustStatus) {
        this.userId = userId;
        this.deviceIdentifierHash = deviceIdentifierHash;
        this.deviceName = deviceName;
        this.trustStatus = trustStatus;
        this.lastLoginAt = LocalDateTime.now();
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

    public String getDeviceIdentifierHash() {
        return deviceIdentifierHash;
    }

    public void setDeviceIdentifierHash(String deviceIdentifierHash) {
        this.deviceIdentifierHash = deviceIdentifierHash;
    }

    public String getDeviceName() {
        return deviceName;
    }

    public void setDeviceName(String deviceName) {
        this.deviceName = deviceName;
    }

    public String getTrustStatus() {
        return trustStatus;
    }

    public void setTrustStatus(String trustStatus) {
        this.trustStatus = trustStatus;
    }

    public LocalDateTime getLastLoginAt() {
        return lastLoginAt;
    }

    public void setLastLoginAt(LocalDateTime lastLoginAt) {
        this.lastLoginAt = lastLoginAt;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
