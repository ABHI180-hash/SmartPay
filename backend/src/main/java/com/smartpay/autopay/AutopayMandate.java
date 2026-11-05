package com.smartpay.autopay;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "autopay_mandates")
public class AutopayMandate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long userId;

    @Column(nullable = false, length = 150)
    private String merchantName;

    @Column(length = 50)
    private String category = "Subscription";

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal amount;

    @Column(precision = 12, scale = 2)
    private BigDecimal maxAmount;

    @Column(nullable = false, length = 50)
    private String frequency = "MONTHLY"; // MONTHLY, WEEKLY, QUARTERLY, ANNUALLY, AS_PRESENTED

    @Column(length = 100)
    private String bankName = "HDFC Bank";

    @Column(length = 30)
    private String maskedAccountNumber = "•••• 5543";

    @Column(nullable = false, unique = true, length = 100)
    private String umn; // Unique Mandate Number (NPCI standard)

    @Column(nullable = false, length = 25)
    private String status = "ACTIVE"; // ACTIVE, PAUSED, REVOKED, EXPIRED

    @Column(nullable = false)
    private LocalDate startDate = LocalDate.now();

    @Column(nullable = false)
    private LocalDate nextDebitDate = LocalDate.now().plusMonths(1);

    private LocalDate endDate;

    private LocalDateTime lastDebitAt;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(nullable = false)
    private LocalDateTime updatedAt = LocalDateTime.now();

    public AutopayMandate() {}

    public AutopayMandate(Long userId, String merchantName, String category, BigDecimal amount,
                          BigDecimal maxAmount, String frequency, String bankName,
                          String maskedAccountNumber, String umn) {
        this.userId = userId;
        this.merchantName = merchantName;
        this.category = category;
        this.amount = amount;
        this.maxAmount = maxAmount != null ? maxAmount : amount.multiply(BigDecimal.valueOf(1.5));
        this.frequency = frequency != null ? frequency : "MONTHLY";
        this.bankName = bankName != null ? bankName : "HDFC Bank";
        this.maskedAccountNumber = maskedAccountNumber != null ? maskedAccountNumber : "•••• 5543";
        this.umn = umn;
        this.status = "ACTIVE";
        this.startDate = LocalDate.now();
        this.nextDebitDate = LocalDate.now().plusMonths(1);
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

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getMerchantName() { return merchantName; }
    public void setMerchantName(String merchantName) { this.merchantName = merchantName; }

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

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
