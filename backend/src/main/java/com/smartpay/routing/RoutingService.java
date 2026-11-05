package com.smartpay.routing;

import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;

@Service
public class RoutingService {

    public Map<String, Object> getRailHealth() {
        Map<String, Object> rails = new HashMap<>();

        Map<String, Object> upiRail = Map.of(
                "name", "NPCI UPI Rail",
                "status", "OPTIMAL",
                "successRate", 99.4,
                "latencyMs", 210,
                "fallbackRecommended", false
        );

        Map<String, Object> walletRail = Map.of(
                "name", "SmartPay Ledger Core",
                "status", "OPTIMAL",
                "successRate", 100.0,
                "latencyMs", 45,
                "fallbackRecommended", false
        );

        Map<String, Object> liteXRail = Map.of(
                "name", "UPI Lite X (Offline / NFC Rail)",
                "status", "ACTIVE",
                "offlineCapable", true,
                "maxOfflinePerTxn", 500.00
        );

        rails.put("UPI", upiRail);
        rails.put("WALLET", walletRail);
        rails.put("UPI_LITE_X", liteXRail);
        rails.put("smartFallbackEngine", "HEALTHY");
        rails.put("activeRecommendation", "WALLET_INSTANT");

        return rails;
    }

    public String suggestBestRoute(String requestedMode, double amount) {
        if (amount <= 500 && "UPI_LITE_X".equalsIgnoreCase(requestedMode)) {
            return "UPI_LITE_X";
        }
        return "WALLET";
    }
}
