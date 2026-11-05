package com.smartpay.fraud;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class FraudService {

    private final FraudAlertRepository alertRepository;
    private final SuspiciousIdentifierRepository suspiciousRepository;

    private static final String[] FRAUD_KEYWORDS = {
            "lottery", "prize", "winner", "kyc update", "electricity bill",
            "account blocked", "crypto bonus", "double money", "claim reward",
            "refund processing fee", "urgent help needed", "police fine",
            "apk", "anydesk", "teamviewer", "quicksupport", "rustdesk",
            "phishing", "scam", "gift card"
    };

    public FraudService(FraudAlertRepository alertRepository, SuspiciousIdentifierRepository suspiciousRepository) {
        this.alertRepository = alertRepository;
        this.suspiciousRepository = suspiciousRepository;
    }

    @Transactional
    public FraudAnalysisResult analyzeTransaction(Long userId, FraudAnalysisRequest request) {
        String identifier = request.getTargetIdentifier() != null ? request.getTargetIdentifier().trim() : "";
        String note = request.getNote() != null ? request.getNote().toLowerCase() : "";
        String targetName = request.getTargetName() != null ? request.getTargetName().toLowerCase() : "";
        BigDecimal amount = request.getAmount() != null ? request.getAmount() : BigDecimal.ZERO;

        List<String> patterns = new ArrayList<>();
        int riskScore = 5;

        // 1. Check blacklist database
        Optional<SuspiciousIdentifier> flagged = suspiciousRepository.findByIdentifierIgnoreCaseAndActiveTrue(identifier);
        if (flagged.isPresent()) {
            riskScore = 95;
            patterns.add("Reported fraudulent identifier in National Threat Database (" + flagged.get().getRiskCategory() + ")");
        }

        // 2. Keyword heuristic checks
        int matchedKeywords = 0;
        for (String kw : FRAUD_KEYWORDS) {
            if (note.contains(kw) || targetName.contains(kw) || identifier.toLowerCase().contains(kw)) {
                matchedKeywords++;
                patterns.add("High-risk phishing keyword detected: '" + kw + "'");
            }
        }
        if (matchedKeywords >= 2) {
            riskScore += 80;
        } else if (matchedKeywords == 1) {
            riskScore += 45;
        }

        // 3. Amount velocity & threshold rule
        if (amount.compareTo(new BigDecimal("50000")) > 0) {
            riskScore += 20;
            patterns.add("High-value transaction above typical threshold (₹" + amount + ")");
        }

        // Cap at 100
        riskScore = Math.min(riskScore, 100);

        FraudAnalysisResult result = new FraudAnalysisResult();
        result.setRiskScore(riskScore);
        result.setDetectedPatterns(patterns);

        if (riskScore >= 80) {
            result.setSafe(false);
            result.setRiskLevel("CRITICAL");
            result.setWarningTitle("Critical Fraud Alert: AI Scam Shield Warning");
            result.setWarningMessage("This recipient has been reported for scams or matches high-risk phishing behavior.");
            result.setRecommendation("DO NOT PROCEED with this payment. If you suspect fraud, report immediately.");

            logAlert(userId, identifier, riskScore, "CRITICAL", patterns.toString(), "BLOCKED");
        } else if (riskScore >= 40) {
            result.setSafe(false);
            result.setRiskLevel("MEDIUM");
            result.setWarningTitle("Security Warning: Suspicious Payment Request");
            result.setWarningMessage("SmartPay AI detected unusual keywords or unfamiliar recipient details.");
            result.setRecommendation("Verify the recipient identity before entering your UPI PIN.");

            logAlert(userId, identifier, riskScore, "MEDIUM", patterns.toString(), "WARNING_DISPLAYED");
        } else {
            result.setSafe(true);
            result.setRiskLevel("LOW");
            result.setWarningTitle("Verified Safe Recipient");
            result.setWarningMessage("AI Scam Shield verified this payment request. No risk indicators detected.");
            result.setRecommendation("Safe to proceed.");
        }

        return result;
    }

    private void logAlert(Long userId, String targetIdentifier, int score, String level, String reason, String action) {
        FraudAlert alert = new FraudAlert();
        alert.setUserId(userId);
        alert.setTargetIdentifier(targetIdentifier);
        alert.setRiskScore(score);
        alert.setRiskLevel(level);
        alert.setDetectedReason(reason);
        alert.setActionTaken(action);
        alertRepository.save(alert);
    }

    @Transactional(readOnly = true)
    public List<FraudAlert> getUserAlerts(Long userId) {
        return alertRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    @Transactional(readOnly = true)
    public List<FraudAlert> getAllAlerts() {
        return alertRepository.findTop20ByOrderByCreatedAtDesc();
    }

    @Transactional
    public void reportSuspicious(String identifier, String category) {
        SuspiciousIdentifier record = suspiciousRepository.findByIdentifierIgnoreCaseAndActiveTrue(identifier)
                .orElse(new SuspiciousIdentifier(identifier, category, 0));
        record.setReportCount(record.getReportCount() + 1);
        suspiciousRepository.save(record);
    }
}
