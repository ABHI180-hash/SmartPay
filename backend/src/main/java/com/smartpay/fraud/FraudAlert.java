package com.smartpay.fraud;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "fraud_alerts")
public class FraudAlert {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;

    @Column(length = 64)
    private String transactionReference;

    @Column(nullable = false, length = 100)
    private String targetIdentifier;

    private Integer riskScore;

    @Column(nullable = false, length = 20)
    private String riskLevel; // LOW, MEDIUM, HIGH, CRITICAL

    @Column(length = 255)
    private String detectedReason;

    @Column(length = 40)
    private String actionTaken; // WARNING_DISPLAYED, BLOCKED, ALLOWED_BY_USER

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    public FraudAlert() {
        this.createdAt = LocalDateTime.now();
    }

    @PrePersist
    protected void onCreate() {
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

    public String getTransactionReference() {
        return transactionReference;
    }

    public void setTransactionReference(String transactionReference) {
        this.transactionReference = transactionReference;
    }

    public String getTargetIdentifier() {
        return targetIdentifier;
    }

    public void setTargetIdentifier(String targetIdentifier) {
        this.targetIdentifier = targetIdentifier;
    }

    public Integer getRiskScore() {
        return riskScore;
    }

    public void setRiskScore(Integer riskScore) {
        this.riskScore = riskScore;
    }

    public String getRiskLevel() {
        return riskLevel;
    }

    public void setRiskLevel(String riskLevel) {
        this.riskLevel = riskLevel;
    }

    public String getDetectedReason() {
        return detectedReason;
    }

    public void setDetectedReason(String detectedReason) {
        this.detectedReason = detectedReason;
    }

    public String getActionTaken() {
        return actionTaken;
    }

    public void setActionTaken(String actionTaken) {
        this.actionTaken = actionTaken;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
