package com.smartpay.fraud;

import java.util.ArrayList;
import java.util.List;

public class FraudAnalysisResult {

    private boolean safe;
    private Integer riskScore; // 0 to 100
    private String riskLevel; // LOW, MEDIUM, HIGH, CRITICAL
    private String warningTitle;
    private String warningMessage;
    private String recommendation;
    private List<String> detectedPatterns = new ArrayList<>();

    public FraudAnalysisResult() {}

    public static FraudAnalysisResult safe() {
        FraudAnalysisResult res = new FraudAnalysisResult();
        res.setSafe(true);
        res.setRiskScore(10);
        res.setRiskLevel("LOW");
        res.setWarningTitle("Verified Safe Contact");
        res.setWarningMessage("AI Scam Shield verified this recipient. No fraud or suspicious reports found.");
        res.setRecommendation("Safe to proceed with payment.");
        return res;
    }

    public boolean isSafe() {
        return safe;
    }

    public void setSafe(boolean safe) {
        this.safe = safe;
    }

    public Integer getRiskScore() {
        return riskScore;
    }

    public void setRiskScore(Integer riskScore) {
        this.riskScore = riskScore;
    }

    public String getRiskLevel() {
        return riskLevel;
    }

    public void setRiskLevel(String riskLevel) {
        this.riskLevel = riskLevel;
    }

    public String getWarningTitle() {
        return warningTitle;
    }

    public void setWarningTitle(String warningTitle) {
        this.warningTitle = warningTitle;
    }

    public String getWarningMessage() {
        return warningMessage;
    }

    public void setWarningMessage(String warningMessage) {
        this.warningMessage = warningMessage;
    }

    public String getRecommendation() {
        return recommendation;
    }

    public void setRecommendation(String recommendation) {
        this.recommendation = recommendation;
    }

    public List<String> getDetectedPatterns() {
        return detectedPatterns;
    }

    public void setDetectedPatterns(List<String> detectedPatterns) {
        this.detectedPatterns = detectedPatterns;
    }
}
