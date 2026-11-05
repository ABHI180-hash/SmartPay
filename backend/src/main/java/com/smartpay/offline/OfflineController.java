package com.smartpay.offline;

import com.smartpay.common.ApiResponse;
import com.smartpay.security.UserPrincipal;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/offline")
@Tag(name = "UPI Lite X Offline", description = "Offline payments sync and state management")
public class OfflineController {

    private final OfflineService offlineService;

    public OfflineController(OfflineService offlineService) {
        this.offlineService = offlineService;
    }

    @PostMapping("/sync")
    @Operation(summary = "Sync offline Lite X transactions when connectivity restores")
    public ResponseEntity<ApiResponse<OfflineTransaction>> syncPayment(
            @AuthenticationPrincipal UserPrincipal currentUser,
            @RequestBody OfflineTransaction tx) {
        OfflineTransaction saved = offlineService.recordOfflinePayment(currentUser.getId(), tx);
        return ResponseEntity.ok(ApiResponse.success(saved, "Offline transaction synced successfully"));
    }

    @GetMapping("/history")
    @Operation(summary = "Get list of synced offline payments")
    public ResponseEntity<ApiResponse<List<OfflineTransaction>>> getHistory(
            @AuthenticationPrincipal UserPrincipal currentUser) {
        List<OfflineTransaction> history = offlineService.getUserOfflineHistory(currentUser.getId());
        return ResponseEntity.ok(ApiResponse.success(history, "Offline history retrieved"));
    }
}
