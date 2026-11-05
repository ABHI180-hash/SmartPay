package com.smartpay.wallet;

import com.smartpay.common.ApiResponse;
import com.smartpay.security.UserPrincipal;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/wallet")
@Tag(name = "Wallet", description = "Digital Wallet & Ledger operations")
public class WalletController {

    private final WalletService walletService;

    public WalletController(WalletService walletService) {
        this.walletService = walletService;
    }

    @GetMapping
    @Operation(summary = "Get user's wallet details and balance")
    public ResponseEntity<ApiResponse<WalletDto>> getWallet(@AuthenticationPrincipal UserPrincipal currentUser) {
        Long userId = currentUser != null ? currentUser.getId() : 1L;
        WalletDto dto = walletService.getWalletByUserId(userId);
        return ResponseEntity.ok(ApiResponse.success(dto, "Wallet retrieved successfully"));
    }

    @GetMapping("/balance")
    @Operation(summary = "Get current wallet balance")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getBalance(@AuthenticationPrincipal UserPrincipal currentUser) {
        Long userId = currentUser != null ? currentUser.getId() : 1L;
        WalletDto dto = walletService.getWalletByUserId(userId);
        return ResponseEntity.ok(ApiResponse.success(
                Map.of(
                        "balance", dto.getBalance(),
                        "upiLiteXBalance", dto.getUpiLiteXBalance(),
                        "upiLiteXEnabled", dto.isUpiLiteXEnabled(),
                        "currency", dto.getCurrency()
                ),
                "Balance retrieved"
        ));
    }

    @PostMapping("/add-money")
    @Operation(summary = "Top up / add money to digital wallet (ledger-backed)")
    public ResponseEntity<ApiResponse<WalletDto>> addMoney(
            @AuthenticationPrincipal UserPrincipal currentUser,
            @Valid @RequestBody AddMoneyRequest request) {
        Long userId = currentUser != null ? currentUser.getId() : 1L;
        WalletDto dto = walletService.addMoney(userId, request);
        return ResponseEntity.ok(ApiResponse.success(dto, "Money added successfully to wallet"));
    }

    @PostMapping("/toggle-upi-lite")
    @Operation(summary = "Toggle UPI Lite X offline payment mode")
    public ResponseEntity<ApiResponse<WalletDto>> toggleUpiLite(
            @AuthenticationPrincipal UserPrincipal currentUser,
            @RequestParam boolean enabled) {
        Long userId = currentUser != null ? currentUser.getId() : 1L;
        WalletDto dto = walletService.toggleUpiLiteX(userId, enabled);
        return ResponseEntity.ok(ApiResponse.success(dto, "UPI Lite X status updated"));
    }

    @GetMapping("/ledger")
    @Operation(summary = "Get wallet ledger statement entries")
    public ResponseEntity<ApiResponse<List<WalletLedger>>> getLedger(@AuthenticationPrincipal UserPrincipal currentUser) {
        Long userId = currentUser != null ? currentUser.getId() : 1L;
        List<WalletLedger> entries = walletService.getLedgerEntries(userId);
        return ResponseEntity.ok(ApiResponse.success(entries, "Ledger entries retrieved"));
    }
}
