package com.smartpay.merchant;

import com.smartpay.common.ApiResponse;
import com.smartpay.security.UserPrincipal;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/merchant")
@Tag(name = "Merchant Operations", description = "Digital Khata, pending dues collection, Soundbox, and merchant analytics")
public class MerchantController {

    private final MerchantService merchantService;

    public MerchantController(MerchantService merchantService) {
        this.merchantService = merchantService;
    }

    @GetMapping("/dashboard")
    @Operation(summary = "Get full merchant business dashboard metrics and digital Khata ledger")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getDashboard(
            @AuthenticationPrincipal UserPrincipal currentUser) {
        Map<String, Object> data = merchantService.getDashboardData(currentUser.getId());
        return ResponseEntity.ok(ApiResponse.success(data, "Merchant dashboard data retrieved"));
    }

    @PostMapping("/dues")
    @Operation(summary = "Add a new customer credit / pending due to Digital Khata")
    public ResponseEntity<ApiResponse<MerchantDue>> addDue(
            @AuthenticationPrincipal UserPrincipal currentUser,
            @RequestBody Map<String, Object> body) {
        String name = (String) body.get("customerName");
        String phone = (String) body.get("customerPhone");
        BigDecimal amount = new BigDecimal(body.get("amount").toString());
        LocalDate dueDate = body.get("dueDate") != null ? LocalDate.parse(body.get("dueDate").toString()) : null;

        MerchantDue due = merchantService.addDue(currentUser.getId(), name, phone, amount, dueDate);
        return ResponseEntity.ok(ApiResponse.success(due, "Due entry added to Khata"));
    }

    @PatchMapping("/dues/{id}/settle")
    @Operation(summary = "Mark customer pending due as fully settled/paid")
    public ResponseEntity<ApiResponse<MerchantDue>> settleDue(
            @AuthenticationPrincipal UserPrincipal currentUser,
            @PathVariable Long id) {
        MerchantDue due = merchantService.settleDue(currentUser.getId(), id);
        return ResponseEntity.ok(ApiResponse.success(due, "Due marked as paid"));
    }

    @PostMapping("/dues/{id}/remind")
    @Operation(summary = "Send automated WhatsApp/SMS payment reminder for due")
    public ResponseEntity<ApiResponse<MerchantDue>> remindDue(
            @AuthenticationPrincipal UserPrincipal currentUser,
            @PathVariable Long id) {
        MerchantDue due = merchantService.sendReminder(currentUser.getId(), id);
        return ResponseEntity.ok(ApiResponse.success(due, "Payment reminder sent to customer"));
    }

    @PostMapping("/soundbox/toggle")
    @Operation(summary = "Enable or disable SmartPay Audio Soundbox announcements")
    public ResponseEntity<ApiResponse<Boolean>> toggleSoundbox(
            @AuthenticationPrincipal UserPrincipal currentUser,
            @RequestParam boolean enabled) {
        boolean state = merchantService.toggleSoundbox(currentUser.getId(), enabled);
        return ResponseEntity.ok(ApiResponse.success(state, "Soundbox status updated"));
    }
}
