package com.smartpay.transaction;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "transactions", indexes = {
    @Index(name = "idx_txn_reference", columnList = "transactionReference", unique = true),
    @Index(name = "idx_txn_utr", columnList = "utrNumber"),
    @Index(name = "idx_txn_sender", columnList = "senderId"),
    @Index(name = "idx_txn_recipient", columnList = "recipientId"),
    @Index(name = "idx_txn_idempotency", columnList = "idempotencyKey", unique = true)
})
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 64)
    private String transactionReference;

    @Column(length = 32)
    private String utrNumber;

    @Column(nullable = false)
    private Long senderId;

    @Column(length = 100)
    private String senderName;

    @Column(length = 80)
    private String senderUpiId;

    private Long recipientId;

    @Column(nullable = false, length = 100)
    private String recipientName;

    @Column(length = 80)
    private String recipientUpiId;

    @Column(nullable = false, precision = 15, scale = 2)
    private BigDecimal amount;

    @Column(nullable = false, length = 30)
    private String paymentMode = "WALLET"; // WALLET, UPI, UPI_LITE_X, BANK_ACCOUNT

    @Column(nullable = false, length = 30)
    private String status = "INITIATED"; // INITIATED, PROCESSING, SUCCESS, FAILED, PENDING, REVERSED

    @Column(nullable = false, length = 30)
    private String type = "PAYMENT"; // PAYMENT, RECEIVE, TOPUP, REFUND

    @Column(length = 40)
    private String category = "GENERAL"; // FOOD, SHOPPING, TRAVEL, BILLS, OTHERS

    @Column(length = 100)
    private String bankName = "SmartPay Core Wallet";

    @Column(length = 40)
    private String authMethod = "PIN"; // PIN, BIOMETRIC, PASSKEY

    @Column(length = 255)
    private String note;

    @Column(length = 120, unique = true)
    private String idempotencyKey;

    @Column(length = 255)
    private String failureReason;

    private Integer riskScore = 0;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    public Transaction() {
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

    public String getTransactionReference() {
        return transactionReference;
    }

    public void setTransactionReference(String transactionReference) {
        this.transactionReference = transactionReference;
    }

    public String getUtrNumber() {
        return utrNumber;
    }

    public void setUtrNumber(String utrNumber) {
        this.utrNumber = utrNumber;
    }

    public Long getSenderId() {
        return senderId;
    }

    public void setSenderId(Long senderId) {
        this.senderId = senderId;
    }

    public String getSenderName() {
        return senderName;
    }

    public void setSenderName(String senderName) {
        this.senderName = senderName;
    }

    public String getSenderUpiId() {
        return senderUpiId;
    }

    public void setSenderUpiId(String senderUpiId) {
        this.senderUpiId = senderUpiId;
    }

    public Long getRecipientId() {
        return recipientId;
    }

    public void setRecipientId(Long recipientId) {
        this.recipientId = recipientId;
    }

    public String getRecipientName() {
        return recipientName;
    }

    public void setRecipientName(String recipientName) {
        this.recipientName = recipientName;
    }

    public String getRecipientUpiId() {
        return recipientUpiId;
    }

    public void setRecipientUpiId(String recipientUpiId) {
        this.recipientUpiId = recipientUpiId;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public String getPaymentMode() {
        return paymentMode;
    }

    public void setPaymentMode(String paymentMode) {
        this.paymentMode = paymentMode;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getBankName() {
        return bankName;
    }

    public void setBankName(String bankName) {
        this.bankName = bankName;
    }

    public String getAuthMethod() {
        return authMethod;
    }

    public void setAuthMethod(String authMethod) {
        this.authMethod = authMethod;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public String getIdempotencyKey() {
        return idempotencyKey;
    }

    public void setIdempotencyKey(String idempotencyKey) {
        this.idempotencyKey = idempotencyKey;
    }

    public String getFailureReason() {
        return failureReason;
    }

    public void setFailureReason(String failureReason) {
        this.failureReason = failureReason;
    }

    public Integer getRiskScore() {
        return riskScore;
    }

    public void setRiskScore(Integer riskScore) {
        this.riskScore = riskScore;
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
