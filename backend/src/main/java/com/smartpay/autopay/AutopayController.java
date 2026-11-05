package com.smartpay.autopay;

import com.smartpay.common.ApiResponse;
import com.smartpay.security.UserPrincipal;
import com.smartpay.transaction.TransactionDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/autopay")
@Tag(name = "AutoPay Mandates", description = "NPCI e-Mandate and Recurring Auto-Debit Management")
public class AutopayController {

    private final AutopayService autopayService;

    public AutopayController(AutopayService autopayService) {
        this.autopayService = autopayService;
    }

    @GetMapping
    @Operation(summary = "List all AutoPay recurring mandates for current user")
    public ResponseEntity<ApiResponse<List<AutopayDto>>> getMandates(
            @AuthenticationPrincipal UserPrincipal currentUser,
            @RequestParam(required = false) Long userId) {
        Long targetId = currentUser != null ? currentUser.getId() : userId;
        if (targetId == null) targetId = 1L;
        List<AutopayDto> list = autopayService.getMandates(targetId);
        return ResponseEntity.ok(ApiResponse.success(list, "AutoPay mandates fetched successfully"));
    }

    @PostMapping
    @Operation(summary = "Create a new AutoPay recurring mandate")
    public ResponseEntity<ApiResponse<AutopayDto>> createMandate(
            @AuthenticationPrincipal UserPrincipal currentUser,
            @Valid @RequestBody CreateAutopayRequest request) {
        Long userId = currentUser != null ? currentUser.getId() : 1L;
        AutopayDto created = autopayService.createMandate(userId, request);
        return ResponseEntity.ok(ApiResponse.success(created, "AutoPay mandate created successfully"));
    }

    @PutMapping("/{id}/toggle")
    @Operation(summary = "Pause or resume an existing AutoPay mandate")
    public ResponseEntity<ApiResponse<AutopayDto>> toggleMandate(
            @AuthenticationPrincipal UserPrincipal currentUser,
            @PathVariable Long id) {
        Long userId = currentUser != null ? currentUser.getId() : 1L;
        AutopayDto updated = autopayService.toggleStatus(userId, id);
        return ResponseEntity.ok(ApiResponse.success(updated, "AutoPay mandate status updated"));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Revoke/cancel an AutoPay mandate")
    public ResponseEntity<ApiResponse<Void>> revokeMandate(
            @AuthenticationPrincipal UserPrincipal currentUser,
            @PathVariable Long id) {
        Long userId = currentUser != null ? currentUser.getId() : 1L;
        autopayService.revokeMandate(userId, id);
        return ResponseEntity.ok(ApiResponse.success(null, "AutoPay mandate revoked successfully"));
    }

    @PostMapping("/{id}/execute")
    @Operation(summary = "Manually trigger auto-debit for an active mandate")
    public ResponseEntity<ApiResponse<TransactionDto>> executeMandate(
            @AuthenticationPrincipal UserPrincipal currentUser,
            @PathVariable Long id) {
        Long userId = currentUser != null ? currentUser.getId() : 1L;
        TransactionDto txn = autopayService.executeMandateDebit(userId, id);
        return ResponseEntity.ok(ApiResponse.success(txn, "AutoPay recurring debit processed successfully"));
    }
}
