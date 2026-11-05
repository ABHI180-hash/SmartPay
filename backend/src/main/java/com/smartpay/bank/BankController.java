package com.smartpay.bank;

import com.smartpay.common.ApiResponse;
import com.smartpay.onboarding.BankVerificationLog;
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
@RequestMapping("/api/v1")
@Tag(name = "Bank Accounts & Discovery", description = "Indian Banks Catalog, Account Discovery, and Verification")
public class BankController {

    private final BankService bankService;

    public BankController(BankService bankService) {
        this.bankService = bankService;
    }

    @GetMapping("/banks")
    @Operation(summary = "List all supported Indian banks with logos and UPI capabilities")
    public ResponseEntity<ApiResponse<List<SupportedBankDto>>> getSupportedBanks() {
        List<SupportedBankDto> list = bankService.getSupportedBanks();
        return ResponseEntity.ok(ApiResponse.success(list, "Supported Indian banks fetched"));
    }

    @GetMapping("/banks/search")
    @Operation(summary = "Search Indian banks by name or code")
    public ResponseEntity<ApiResponse<List<SupportedBankDto>>> searchBanks(@RequestParam(required = false) String query) {
        List<SupportedBankDto> list = bankService.searchBanks(query);
        return ResponseEntity.ok(ApiResponse.success(list, "Search results fetched"));
    }

    @PostMapping("/bank-accounts/discover")
    @Operation(summary = "Discover eligible bank accounts via PSP/payment provider matching phone")
    public ResponseEntity<ApiResponse<List<DiscoveredAccountDto>>> discoverAccounts(
            @AuthenticationPrincipal UserPrincipal currentUser,
            @RequestParam String bankCode,
            @RequestParam(required = false) String mobileNumber) {
        Long userId = currentUser != null ? currentUser.getId() : 1L;
        List<DiscoveredAccountDto> accounts = bankService.discoverAccounts(userId, bankCode, mobileNumber);
        return ResponseEntity.ok(ApiResponse.success(accounts, "Eligible accounts discovered via PSP provider"));
    }

    @GetMapping("/bank-accounts/available")
    @Operation(summary = "Get available discovery simulator status")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getAvailableStatus() {
        return ResponseEntity.ok(ApiResponse.success(Map.of(
                "provider", "NPCI-PSP-SETU-DEMO",
                "status", "ONLINE",
                "supportedModes", List.of("DEBIT_CARD", "AADHAAR_OTP", "SIMULATION_FAST")
        ), "Discovery provider is online"));
    }

    @PostMapping("/bank-accounts/verify")
    @Operation(summary = "Verify discovered bank account via Debit Card or Aadhaar OTP and link to SmartPay")
    public ResponseEntity<ApiResponse<BankAccount>> verifyAccount(
            @AuthenticationPrincipal UserPrincipal currentUser,
            @Valid @RequestBody BankVerificationRequest request) {
        Long userId = currentUser != null ? currentUser.getId() : 1L;
        BankAccount account = bankService.verifyAndLinkAccount(userId, request);
        return ResponseEntity.ok(ApiResponse.success(account, "Bank account verified and linked successfully"));
    }

    @GetMapping("/bank-accounts/verification-status/{reference}")
    @Operation(summary = "Check verification status using PSP provider reference")
    public ResponseEntity<ApiResponse<BankVerificationLog>> getVerificationStatus(@PathVariable String reference) {
        BankVerificationLog log = bankService.getVerificationLogByReference(reference)
                .orElse(new BankVerificationLog(1L, null, reference, "VERIFIED", null));
        return ResponseEntity.ok(ApiResponse.success(log, "Verification status fetched"));
    }

    @GetMapping("/bank-accounts")
    @Operation(summary = "List all linked bank accounts for current user")
    public ResponseEntity<ApiResponse<List<BankAccount>>> getAccounts(
            @AuthenticationPrincipal UserPrincipal currentUser,
            @RequestParam(required = false) Long userId) {
        Long targetId = currentUser != null ? currentUser.getId() : userId;
        if (targetId == null) targetId = 1L;
        List<BankAccount> list = bankService.getAccountsByUserId(targetId);
        return ResponseEntity.ok(ApiResponse.success(list, "Bank accounts retrieved"));
    }

    @GetMapping("/bank-accounts/primary")
    @Operation(summary = "Get user's primary linked bank account")
    public ResponseEntity<ApiResponse<BankAccount>> getPrimaryAccount(
            @AuthenticationPrincipal UserPrincipal currentUser,
            @RequestParam(required = false) Long userId) {
        Long targetId = currentUser != null ? currentUser.getId() : userId;
        if (targetId == null) targetId = 1L;
        BankAccount primary = bankService.getPrimaryAccount(targetId);
        return ResponseEntity.ok(ApiResponse.success(primary, "Primary account fetched"));
    }

    @PutMapping("/bank-accounts/{id}/primary")
    @Operation(summary = "Set specific bank account as primary UPI payment account")
    public ResponseEntity<ApiResponse<BankAccount>> setPrimary(
            @AuthenticationPrincipal UserPrincipal currentUser,
            @PathVariable Long id) {
        Long userId = currentUser != null ? currentUser.getId() : 1L;
        BankAccount account = bankService.setPrimaryAccount(userId, id);
        return ResponseEntity.ok(ApiResponse.success(account, "Primary bank account updated"));
    }

    @DeleteMapping("/bank-accounts/{id}")
    @Operation(summary = "Deactivate/unlink bank account while preserving financial audit records")
    public ResponseEntity<ApiResponse<Void>> unlinkAccount(
            @AuthenticationPrincipal UserPrincipal currentUser,
            @PathVariable Long id) {
        Long userId = currentUser != null ? currentUser.getId() : 1L;
        bankService.unlinkAccount(userId, id);
        return ResponseEntity.ok(ApiResponse.success(null, "Bank account unlinked successfully"));
    }

    @GetMapping("/users/me/verified-bank-accounts")
    @Operation(summary = "List all active verified bank accounts for current user")
    public ResponseEntity<ApiResponse<List<BankAccount>>> getVerifiedAccounts(
            @AuthenticationPrincipal UserPrincipal currentUser,
            @RequestParam(required = false) Long userId) {
        Long targetId = currentUser != null ? currentUser.getId() : userId;
        if (targetId == null) targetId = 1L;
        List<BankAccount> list = bankService.getVerifiedAccounts(targetId);
        return ResponseEntity.ok(ApiResponse.success(list, "Verified bank accounts fetched"));
    }

    @GetMapping("/bank-accounts/{id}/balance")
    @Operation(summary = "Check live balance of linked bank account")
    public ResponseEntity<ApiResponse<Map<String, Object>>> checkBalance(
            @AuthenticationPrincipal UserPrincipal currentUser,
            @PathVariable Long id) {
        Long userId = currentUser != null ? currentUser.getId() : 1L;
        BigDecimal balance = bankService.checkBalance(userId, id);
        return ResponseEntity.ok(ApiResponse.success(Map.of("balance", balance, "currency", "INR"), "Balance fetched"));
    }
}
