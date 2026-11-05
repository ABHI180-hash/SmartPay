package com.smartpay.fraud;

import com.smartpay.common.ApiResponse;
import com.smartpay.security.UserPrincipal;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/fraud")
@Tag(name = "AI Scam Shield", description = "AI-powered transaction fraud risk analysis and threat intelligence")
public class FraudController {

    private final FraudService fraudService;

    public FraudController(FraudService fraudService) {
        this.fraudService = fraudService;
    }

    @PostMapping("/analyze")
    @Operation(summary = "Real-time AI Scam Shield analysis before payment confirmation")
    public ResponseEntity<ApiResponse<FraudAnalysisResult>> analyze(
            @AuthenticationPrincipal UserPrincipal currentUser,
            @RequestBody FraudAnalysisRequest request) {
        Long userId = (currentUser != null) ? currentUser.getId() : null;
        FraudAnalysisResult result = fraudService.analyzeTransaction(userId, request);
        return ResponseEntity.ok(ApiResponse.success(result, "Fraud analysis complete"));
    }

    @GetMapping("/alerts")
    @Operation(summary = "Get user's AI scam shield alert history")
    public ResponseEntity<ApiResponse<List<FraudAlert>>> getAlerts(
            @AuthenticationPrincipal UserPrincipal currentUser) {
        List<FraudAlert> alerts = fraudService.getUserAlerts(currentUser.getId());
        return ResponseEntity.ok(ApiResponse.success(alerts, "Fraud alerts retrieved"));
    }

    @PostMapping("/report")
    @Operation(summary = "Report a suspicious UPI ID, phone number or QR code")
    public ResponseEntity<ApiResponse<String>> reportSuspicious(
            @RequestBody Map<String, String> body) {
        String identifier = body.get("identifier");
        String category = body.getOrDefault("category", "REPORTED_BY_USER");
        if (identifier != null && !identifier.isBlank()) {
            fraudService.reportSuspicious(identifier, category);
        }
        return ResponseEntity.ok(ApiResponse.success("Thank you. Incident reported to AI Scam Shield.", "Report submitted"));
    }
}
