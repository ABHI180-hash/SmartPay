package com.smartpay.bank;

import jakarta.validation.constraints.NotBlank;

public class LinkBankRequest {

    @NotBlank(message = "Bank name is required")
    private String bankName;

    @NotBlank(message = "Account number is required")
    private String accountNumber;

    private String ifscCode;

    private String accountType = "SAVINGS";

    private boolean setPrimary = false;

    public LinkBankRequest() {}

    public String getBankName() {
        return bankName;
    }

    public void setBankName(String bankName) {
        this.bankName = bankName;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }

    public String getIfscCode() {
        return ifscCode;
    }

    public void setIfscCode(String ifscCode) {
        this.ifscCode = ifscCode;
    }

    public String getAccountType() {
        return accountType;
    }

    public void setAccountType(String accountType) {
        this.accountType = accountType;
    }

    public boolean isSetPrimary() {
        return setPrimary;
    }

    public void setSetPrimary(boolean setPrimary) {
        this.setPrimary = setPrimary;
    }
}
