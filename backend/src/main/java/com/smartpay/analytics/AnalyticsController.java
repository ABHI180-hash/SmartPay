package com.smartpay.analytics;

import com.smartpay.common.ApiResponse;
import com.smartpay.security.UserPrincipal;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/analytics")
@Tag(name = "Spending Analytics", description = "AI financial insights, category breakdown, and monthly trends")
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    public AnalyticsController(AnalyticsService analyticsService) {
        this.analyticsService = analyticsService;
    }

    @GetMapping("/monthly-spending")
    @Operation(summary = "Get monthly spending analytics, donut breakdown, and top merchants")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getMonthlySpending(
            @AuthenticationPrincipal UserPrincipal currentUser) {
        Map<String, Object> data = analyticsService.getMonthlySpending(currentUser != null ? currentUser.getId() : null);
        return ResponseEntity.ok(ApiResponse.success(data, "Analytics data retrieved"));
    }
}
