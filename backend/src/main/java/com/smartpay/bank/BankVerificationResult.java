package com.smartpay.bank;

public class BankVerificationResult {
    private boolean successful;
    private String providerReference;
    private String verificationStatus;
    private String failureReason;
    private BankAccount bankAccount;

    public BankVerificationResult() {}

    public BankVerificationResult(boolean successful, String providerReference, String verificationStatus, String failureReason, BankAccount bankAccount) {
        this.successful = successful;
        this.providerReference = providerReference;
        this.verificationStatus = verificationStatus;
        this.failureReason = failureReason;
        this.bankAccount = bankAccount;
    }

    public static BankVerificationResult success(String providerReference, BankAccount bankAccount) {
        return new BankVerificationResult(true, providerReference, "VERIFIED", null, bankAccount);
    }

    public static BankVerificationResult failure(String failureReason) {
        return new BankVerificationResult(false, null, "FAILED", failureReason, null);
    }

    public boolean isSuccessful() {
        return successful;
    }

    public void setSuccessful(boolean successful) {
        this.successful = successful;
    }

    public String getProviderReference() {
        return providerReference;
    }

    public void setProviderReference(String providerReference) {
        this.providerReference = providerReference;
    }

    public String getVerificationStatus() {
        return verificationStatus;
    }

    public void setVerificationStatus(String verificationStatus) {
        this.verificationStatus = verificationStatus;
    }

    public String getFailureReason() {
        return failureReason;
    }

    public void setFailureReason(String failureReason) {
        this.failureReason = failureReason;
    }

    public BankAccount getBankAccount() {
        return bankAccount;
    }

    public void setBankAccount(BankAccount bankAccount) {
        this.bankAccount = bankAccount;
    }
}
