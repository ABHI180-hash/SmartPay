package com.smartpay.exception;

public class FraudRiskBlockedException extends RuntimeException {
    private final int riskScore;
    private final String riskLevel;

    public FraudRiskBlockedException(String message) {
        super(message);
        this.riskScore = 90;
        this.riskLevel = "CRITICAL";
    }

    public FraudRiskBlockedException(String message, int riskScore, String riskLevel) {
        super(message);
        this.riskScore = riskScore;
        this.riskLevel = riskLevel;
    }

    public int getRiskScore() {
        return riskScore;
    }

    public String getRiskLevel() {
        return riskLevel;
    }
}
