package com.smartpay.wallet;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "wallets")
public class Wallet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private Long userId;

    @Column(nullable = false, precision = 15, scale = 2)
    private BigDecimal balance = BigDecimal.ZERO;

    @Column(nullable = false, precision = 15, scale = 2)
    private BigDecimal upiLiteXBalance = new BigDecimal("500.00");

    @Column(nullable = false)
    private boolean upiLiteXEnabled = true;

    @Column(nullable = false, length = 20)
    private String status = "ACTIVE"; // ACTIVE, FROZEN, SUSPENDED

    @Column(nullable = false, length = 10)
    private String currency = "INR";

    @Version
    private Long version; // Optimistic locking to prevent double-spending & race conditions

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    public Wallet() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    public Wallet(Long userId) {
        this.userId = userId;
        this.balance = new BigDecimal("1450.00"); // Match initial reference balance
        this.upiLiteXBalance = new BigDecimal("500.00");
        this.upiLiteXEnabled = true;
        this.status = "ACTIVE";
        this.currency = "INR";
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PrePersist
    protected void onCreate() {
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

    public BigDecimal getBalance() {
        return balance;
    }

    public void setBalance(BigDecimal balance) {
        this.balance = balance;
    }

    public BigDecimal getUpiLiteXBalance() {
        return upiLiteXBalance;
    }

    public void setUpiLiteXBalance(BigDecimal upiLiteXBalance) {
        this.upiLiteXBalance = upiLiteXBalance;
    }

    public boolean isUpiLiteXEnabled() {
        return upiLiteXEnabled;
    }

    public void setUpiLiteXEnabled(boolean upiLiteXEnabled) {
        this.upiLiteXEnabled = upiLiteXEnabled;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public Long getVersion() {
        return version;
    }

    public void setVersion(Long version) {
        this.version = version;
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
