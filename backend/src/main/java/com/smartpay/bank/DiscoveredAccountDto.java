package com.smartpay.bank;

public class DiscoveredAccountDto {
    private String accountReference;
    private String bankCode;
    private String bankName;
    private String maskedAccountNumber;
    private String accountHolderName;
    private String accountType; // SAVINGS, CURRENT
    private String ifscCode;
    private String branchName;
    private boolean isEligibleForUpi;
    private boolean requiresDebitCard;
    private boolean supportsAadhaar;

    public DiscoveredAccountDto() {}

    public DiscoveredAccountDto(String accountReference, String bankCode, String bankName,
                                String maskedAccountNumber, String accountHolderName, String accountType,
                                String ifscCode, String branchName, boolean isEligibleForUpi,
                                boolean requiresDebitCard, boolean supportsAadhaar) {
        this.accountReference = accountReference;
        this.bankCode = bankCode;
        this.bankName = bankName;
        this.maskedAccountNumber = maskedAccountNumber;
        this.accountHolderName = accountHolderName;
        this.accountType = accountType;
        this.ifscCode = ifscCode;
        this.branchName = branchName;
        this.isEligibleForUpi = isEligibleForUpi;
        this.requiresDebitCard = requiresDebitCard;
        this.supportsAadhaar = supportsAadhaar;
    }

    public String getAccountReference() {
        return accountReference;
    }

    public void setAccountReference(String accountReference) {
        this.accountReference = accountReference;
    }

    public String getBankCode() {
        return bankCode;
    }

    public void setBankCode(String bankCode) {
        this.bankCode = bankCode;
    }

    public String getBankName() {
        return bankName;
    }

    public void setBankName(String bankName) {
        this.bankName = bankName;
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

    public String getBranchName() {
        return branchName;
    }

    public void setBranchName(String branchName) {
        this.branchName = branchName;
    }

    public boolean isEligibleForUpi() {
        return isEligibleForUpi;
    }

    public void setEligibleForUpi(boolean eligibleForUpi) {
        isEligibleForUpi = eligibleForUpi;
    }

    public boolean isRequiresDebitCard() {
        return requiresDebitCard;
    }

    public void setRequiresDebitCard(boolean requiresDebitCard) {
        this.requiresDebitCard = requiresDebitCard;
    }

    public boolean isSupportsAadhaar() {
        return supportsAadhaar;
    }

    public void setSupportsAadhaar(boolean supportsAadhaar) {
        this.supportsAadhaar = supportsAadhaar;
    }
}
