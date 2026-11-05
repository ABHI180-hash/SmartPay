package com.smartpay.qr;

import com.smartpay.fraud.FraudAnalysisResult;
import java.math.BigDecimal;

public class QrValidationResult {

    private boolean valid;
    private String payeeUpiId;
    private String payeeName;
    private BigDecimal amount;
    private String note;
    private FraudAnalysisResult fraudAnalysis;

    public QrValidationResult() {}

    public boolean isValid() {
        return valid;
    }

    public void setValid(boolean valid) {
        this.valid = valid;
    }

    public String getPayeeUpiId() {
        return payeeUpiId;
    }

    public void setPayeeUpiId(String payeeUpiId) {
        this.payeeUpiId = payeeUpiId;
    }

    public String getPayeeName() {
        return payeeName;
    }

    public void setPayeeName(String payeeName) {
        this.payeeName = payeeName;
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

    public FraudAnalysisResult getFraudAnalysis() {
        return fraudAnalysis;
    }

    public void setFraudAnalysis(FraudAnalysisResult fraudAnalysis) {
        this.fraudAnalysis = fraudAnalysis;
    }
}
