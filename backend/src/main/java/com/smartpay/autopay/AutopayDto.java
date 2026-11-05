package com.smartpay.autopay;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

public class AutopayDto {

    private Long id;
    private Long userId;
    private String merchant;
    private String category;
    private BigDecimal amount;
    private BigDecimal maxAmount;
    private String frequency;
    private String bankName;
    private String maskedAccountNumber;
    private String umn;
    private String status;
    private LocalDate startDate;
    private LocalDate nextDebitDate;
    private LocalDate endDate;
    private LocalDateTime lastDebitAt;
    private String logoText;
    private String logoBg;

    public AutopayDto() {}

    public AutopayDto(AutopayMandate mandate) {
        this.id = mandate.getId();
        this.userId = mandate.getUserId();
        this.merchant = mandate.getMerchantName();
        this.category = mandate.getCategory();
        this.amount = mandate.getAmount();
        this.maxAmount = mandate.getMaxAmount();
        this.frequency = mandate.getFrequency();
        this.bankName = mandate.getBankName();
        this.maskedAccountNumber = mandate.getMaskedAccountNumber();
        this.umn = mandate.getUmn();
        this.status = mandate.getStatus();
        this.startDate = mandate.getStartDate();
        this.nextDebitDate = mandate.getNextDebitDate();
        this.endDate = mandate.getEndDate();
        this.lastDebitAt = mandate.getLastDebitAt();

        // Visual helpers
        String name = mandate.getMerchantName() != null ? mandate.getMerchantName() : "SP";
        this.logoText = name.length() >= 2 ? name.substring(0, 2).toUpperCase() : name.toUpperCase();
        if (name.toLowerCase().contains("netflix")) {
            this.logoBg = "bg-red-600";
        } else if (name.toLowerCase().contains("spotify")) {
            this.logoBg = "bg-green-600";
        } else if (name.toLowerCase().contains("bescom") || name.toLowerCase().contains("electricity")) {
            this.logoBg = "bg-amber-600";
        } else if (name.toLowerCase().contains("zerodha") || name.toLowerCase().contains("sip")) {
            this.logoBg = "bg-blue-600";
        } else {
            this.logoBg = "bg-[#167C80]";
        }
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getMerchant() { return merchant; }
    public void setMerchant(String merchant) { this.merchant = merchant; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public BigDecimal getAmount() { return amount; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }

    public BigDecimal getMaxAmount() { return maxAmount; }
    public void setMaxAmount(BigDecimal maxAmount) { this.maxAmount = maxAmount; }

    public String getFrequency() { return frequency; }
    public void setFrequency(String frequency) { this.frequency = frequency; }

    public String getBankName() { return bankName; }
    public void setBankName(String bankName) { this.bankName = bankName; }

    public String getMaskedAccountNumber() { return maskedAccountNumber; }
    public void setMaskedAccountNumber(String maskedAccountNumber) { this.maskedAccountNumber = maskedAccountNumber; }

    public String getUmn() { return umn; }
    public void setUmn(String umn) { this.umn = umn; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDate getStartDate() { return startDate; }
    public void setStartDate(LocalDate startDate) { this.startDate = startDate; }

    public LocalDate getNextDebitDate() { return nextDebitDate; }
    public void setNextDebitDate(LocalDate nextDebitDate) { this.nextDebitDate = nextDebitDate; }

    public LocalDate getEndDate() { return endDate; }
    public void setEndDate(LocalDate endDate) { this.endDate = endDate; }

    public LocalDateTime getLastDebitAt() { return lastDebitAt; }
    public void setLastDebitAt(LocalDateTime lastDebitAt) { this.lastDebitAt = lastDebitAt; }

    public String getLogoText() { return logoText; }
    public void setLogoText(String logoText) { this.logoText = logoText; }

    public String getLogoBg() { return logoBg; }
    public void setLogoBg(String logoBg) { this.logoBg = logoBg; }
}
