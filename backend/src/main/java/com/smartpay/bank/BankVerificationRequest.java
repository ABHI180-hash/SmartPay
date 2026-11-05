package com.smartpay.bank;

import jakarta.validation.constraints.NotBlank;

public class BankVerificationRequest {

    @NotBlank(message = "Bank code is required")
    private String bankCode;

    @NotBlank(message = "Masked account number is required")
    private String maskedAccountNumber;

    private String accountHolderName;
    private String accountType = "SAVINGS";
    private String ifscCode;

    private String verificationMethod = "DEBIT_CARD"; // DEBIT_CARD, AADHAAR, SIMULATION_FAST

    // Note: In compliance with fintech guidelines, raw card credentials or PINs are NEVER stored in database.
    private String debitLast6;
    private String expiryMonth;
    private String expiryYear;
    private String aadhaarLast4;

    private boolean setPrimary = true;

    public BankVerificationRequest() {}

    public String getBankCode() {
        return bankCode;
    }

    public void setBankCode(String bankCode) {
        this.bankCode = bankCode;
    }

    public String getMaskedAccountNumber() {
        return maskedAccountNumber;
    }

    public void setMaskedAccountNumber(String maskedAccountNumber) {
        this.maskedAccountNumber = maskedAccountNumber;
    }

    public String getAccountHolderName() {
        return accountHolderName;
    }

    public void setAccountHolderName(String accountHolderName) {
        this.accountHolderName = accountHolderName;
    }

    public String getAccountType() {
        return accountType;
    }

    public void setAccountType(String accountType) {
        this.accountType = accountType;
    }

    public String getIfscCode() {
        return ifscCode;
    }

    public void setIfscCode(String ifscCode) {
        this.ifscCode = ifscCode;
    }

    public String getVerificationMethod() {
        return verificationMethod;
    }

    public void setVerificationMethod(String verificationMethod) {
        this.verificationMethod = verificationMethod;
    }

    public String getDebitLast6() {
        return debitLast6;
    }

    public void setDebitLast6(String debitLast6) {
        this.debitLast6 = debitLast6;
    }

    public String getExpiryMonth() {
        return expiryMonth;
    }

    public void setExpiryMonth(String expiryMonth) {
        this.expiryMonth = expiryMonth;
    }

    public String getExpiryYear() {
        return expiryYear;
    }

    public void setExpiryYear(String expiryYear) {
        this.expiryYear = expiryYear;
    }

    public String getAadhaarLast4() {
        return aadhaarLast4;
    }

    public void setAadhaarLast4(String aadhaarLast4) {
        this.aadhaarLast4 = aadhaarLast4;
    }

    public boolean isSetPrimary() {
        return setPrimary;
    }

    public void setSetPrimary(boolean setPrimary) {
        this.setPrimary = setPrimary;
    }
}
