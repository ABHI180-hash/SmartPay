package com.smartpay.transaction;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class TransactionDto {

    private Long id;
    private String transactionReference;
    private String utrNumber;
    private Long senderId;
    private String senderName;
    private String senderUpiId;
    private Long recipientId;
    private String recipientName;
    private String recipientUpiId;
    private BigDecimal amount;
    private String paymentMode;
    private String status;
    private String type;
    private String category;
    private String bankName;
    private String authMethod;
    private String note;
    private Integer riskScore;
    private LocalDateTime createdAt;

    public TransactionDto() {}

    public TransactionDto(Transaction txn) {
        this.id = txn.getId();
        this.transactionReference = txn.getTransactionReference();
        this.utrNumber = txn.getUtrNumber();
        this.senderId = txn.getSenderId();
        this.senderName = txn.getSenderName();
        this.senderUpiId = txn.getSenderUpiId();
        this.recipientId = txn.getRecipientId();
        this.recipientName = txn.getRecipientName();
        this.recipientUpiId = txn.getRecipientUpiId();
        this.amount = txn.getAmount();
        this.paymentMode = txn.getPaymentMode();
        this.status = txn.getStatus();
        this.type = txn.getType();
        this.category = txn.getCategory();
        this.bankName = txn.getBankName();
        this.authMethod = txn.getAuthMethod();
        this.note = txn.getNote();
        this.riskScore = txn.getRiskScore();
        this.createdAt = txn.getCreatedAt();
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
}
