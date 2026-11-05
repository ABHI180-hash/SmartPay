package com.smartpay.wallet;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;

public class AddMoneyRequest {

    @NotNull(message = "Amount is required")
    @DecimalMin(value = "1.00", message = "Minimum amount to add is ₹1.00")
    private BigDecimal amount;

    private String source;
    private String sourceBankName;
    private String reference;
    private String paymentMethod = "BANK_ACCOUNT";

    public AddMoneyRequest() {}

    public AddMoneyRequest(BigDecimal amount, String sourceBankName) {
        this.amount = amount;
        this.sourceBankName = sourceBankName;
        this.source = sourceBankName;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public String getSource() {
        return source != null ? source : sourceBankName;
    }

    public void setSource(String source) {
        this.source = source;
        this.sourceBankName = source;
    }

    public String getSourceBankName() {
        return sourceBankName;
    }

    public void setSourceBankName(String sourceBankName) {
        this.sourceBankName = sourceBankName;
        this.source = sourceBankName;
    }

    public String getReference() {
        return reference;
    }

    public void setReference(String reference) {
        this.reference = reference;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }
}
