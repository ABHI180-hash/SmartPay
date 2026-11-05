package com.smartpay.fraud;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "suspicious_identifiers", indexes = {
    @Index(name = "idx_suspicious_val", columnList = "identifier", unique = true)
})
public class SuspiciousIdentifier {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 100)
    private String identifier; // phone, UPI ID, or account

    @Column(nullable = false, length = 60)
    private String riskCategory; // PHISHING, LOTTERY, IMPERSONATION, INVESTMENT_SCAM

    private Integer reportCount = 1;

    private boolean active = true;

    private LocalDateTime createdAt = LocalDateTime.now();

    public SuspiciousIdentifier() {}

    public SuspiciousIdentifier(String identifier, String riskCategory, Integer reportCount) {
        this.identifier = identifier;
        this.riskCategory = riskCategory;
        this.reportCount = reportCount;
        this.active = true;
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIdentifier() {
        return identifier;
    }

    public void setIdentifier(String identifier) {
        this.identifier = identifier;
    }

    public String getRiskCategory() {
        return riskCategory;
    }

    public void setRiskCategory(String riskCategory) {
        this.riskCategory = riskCategory;
    }

    public Integer getReportCount() {
        return reportCount;
    }

    public void setReportCount(Integer reportCount) {
        this.reportCount = reportCount;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
