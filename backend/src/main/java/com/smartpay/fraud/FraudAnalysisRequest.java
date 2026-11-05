package com.smartpay.fraud;

import java.math.BigDecimal;

public class FraudAnalysisRequest {

    private String targetIdentifier;
    private String targetName;
    private BigDecimal amount;
    private String note;

    public FraudAnalysisRequest() {}

    public FraudAnalysisRequest(String targetIdentifier, String targetName, BigDecimal amount, String note) {
        this.targetIdentifier = targetIdentifier;
        this.targetName = targetName;
        this.amount = amount;
        this.note = note;
    }

    public String getTargetIdentifier() {
        return targetIdentifier;
    }

    public void setTargetIdentifier(String targetIdentifier) {
        this.targetIdentifier = targetIdentifier;
    }

    public String getTargetName() {
        return targetName;
    }

    public void setTargetName(String targetName) {
        this.targetName = targetName;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }
}
