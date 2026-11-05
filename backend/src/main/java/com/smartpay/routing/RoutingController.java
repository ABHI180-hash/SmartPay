package com.smartpay.routing;

import com.smartpay.common.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/routing")
@Tag(name = "Smart Routing & Fallback", description = "Real-time payment rail health and automated routing intelligence")
public class RoutingController {

    private final RoutingService routingService;

    public RoutingController(RoutingService routingService) {
        this.routingService = routingService;
    }

    @GetMapping("/health")
    @Operation(summary = "Get current status and latency of payment rails (UPI, Core Wallet, Lite X)")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getHealth() {
        Map<String, Object> health = routingService.getRailHealth();
        return ResponseEntity.ok(ApiResponse.success(health, "Payment rail health status"));
    }
}
