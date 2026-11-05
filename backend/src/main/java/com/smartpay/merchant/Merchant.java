package com.smartpay.merchant;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "merchants")
public class Merchant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private Long userId;

    @Column(nullable = false, length = 120)
    private String businessName;

    @Column(length = 60)
    private String category = "RETAIL";

    @Column(length = 30)
    private String gstNumber;

    private boolean soundboxEnabled = true;

    @Column(precision = 15, scale = 2)
    private BigDecimal totalCollected = new BigDecimal("48250.00");

    @Column(precision = 15, scale = 2)
    private BigDecimal pendingDuesTotal = new BigDecimal("3450.00");

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public Merchant() {}

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

    public String getBusinessName() {
        return businessName;
    }

    public void setBusinessName(String businessName) {
        this.businessName = businessName;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getGstNumber() {
        return gstNumber;
    }

    public void setGstNumber(String gstNumber) {
        this.gstNumber = gstNumber;
    }

    public boolean isSoundboxEnabled() {
        return soundboxEnabled;
    }

    public void setSoundboxEnabled(boolean soundboxEnabled) {
        this.soundboxEnabled = soundboxEnabled;
    }

    public BigDecimal getTotalCollected() {
        return totalCollected;
    }

    public void setTotalCollected(BigDecimal totalCollected) {
        this.totalCollected = totalCollected;
    }

    public BigDecimal getPendingDuesTotal() {
        return pendingDuesTotal;
    }

    public void setPendingDuesTotal(BigDecimal pendingDuesTotal) {
        this.pendingDuesTotal = pendingDuesTotal;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
