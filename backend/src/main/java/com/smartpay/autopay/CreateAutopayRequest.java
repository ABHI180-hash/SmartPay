package com.smartpay.autopay;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;

public class CreateAutopayRequest {

    @NotBlank(message = "Merchant name is required")
    private String merchantName;

    private String category = "Subscription";

    @NotNull(message = "Amount is required")
    @DecimalMin(value = "1.00", message = "Amount must be at least ₹1.00")
    private BigDecimal amount;

    private BigDecimal maxAmount;

    private String frequency = "MONTHLY"; // MONTHLY, WEEKLY, QUARTERLY, ANNUALLY

    private String bankName;

    private String maskedAccountNumber;

    public CreateAutopayRequest() {}

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
}
