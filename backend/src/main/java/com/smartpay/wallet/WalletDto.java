package com.smartpay.wallet;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class WalletDto {

    private Long id;
    private Long userId;
    private BigDecimal balance;
    private BigDecimal upiLiteXBalance;
    private boolean upiLiteXEnabled;
    private String status;
    private String currency;
    private LocalDateTime updatedAt;

    public WalletDto() {}

    public WalletDto(Wallet wallet) {
        this.id = wallet.getId();
        this.userId = wallet.getUserId();
        this.balance = wallet.getBalance();
        this.upiLiteXBalance = wallet.getUpiLiteXBalance();
        this.upiLiteXEnabled = wallet.isUpiLiteXEnabled();
        this.status = wallet.getStatus();
        this.currency = wallet.getCurrency();
        this.updatedAt = wallet.getUpdatedAt();
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

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
