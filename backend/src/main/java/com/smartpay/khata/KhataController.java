package com.smartpay.khata;

import com.smartpay.common.ApiResponse;
import com.smartpay.security.UserPrincipal;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/khata")
@Tag(name = "Family & Group Khata", description = "Group ledger, bill splitting, dues tracking, and peer settlements")
public class KhataController {

    private final KhataService khataService;

    public KhataController(KhataService khataService) {
        this.khataService = khataService;
    }

    @GetMapping("/groups")
    @Operation(summary = "Get list of all Khata groups for current user")
    public ResponseEntity<ApiResponse<List<KhataGroup>>> getGroups(
            @AuthenticationPrincipal UserPrincipal currentUser) {
        List<KhataGroup> groups = khataService.getUserGroups(currentUser.getId());
        return ResponseEntity.ok(ApiResponse.success(groups, "Groups retrieved"));
    }

    @PostMapping("/groups")
    @Operation(summary = "Create a new Family or Group Khata")
    public ResponseEntity<ApiResponse<KhataGroup>> createGroup(
            @AuthenticationPrincipal UserPrincipal currentUser,
            @RequestBody Map<String, Object> body) {
        String name = (String) body.get("name");
        String desc = (String) body.get("description");
        @SuppressWarnings("unchecked")
        List<String> members = (List<String>) body.get("members");

        KhataGroup group = khataService.createGroup(currentUser.getId(), currentUser.getUsername(), name, desc, members);
        return ResponseEntity.ok(ApiResponse.success(group, "Khata group created successfully"));
    }

    @GetMapping("/groups/{id}")
    @Operation(summary = "Get Khata group details, members, expenses and settlements")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getGroupDetails(@PathVariable Long id) {
        Map<String, Object> details = khataService.getGroupDetails(id);
        return ResponseEntity.ok(ApiResponse.success(details, "Group details retrieved"));
    }

    @PostMapping("/groups/{id}/expenses")
    @Operation(summary = "Add an expense and split across group members")
    public ResponseEntity<ApiResponse<KhataExpense>> addExpense(
            @PathVariable Long id,
            @RequestBody Map<String, Object> body) {
        Long payerId = Long.valueOf(body.get("payerId").toString());
        String title = (String) body.get("title");
        BigDecimal amount = new BigDecimal(body.get("amount").toString());

        KhataExpense expense = khataService.addExpense(id, payerId, title, amount);
        return ResponseEntity.ok(ApiResponse.success(expense, "Expense recorded and split"));
    }

    @PostMapping("/groups/{id}/settle")
    @Operation(summary = "Record settlement payment between group members")
    public ResponseEntity<ApiResponse<KhataSettlement>> settle(
            @PathVariable Long id,
            @RequestBody Map<String, Object> body) {
        Long fromId = Long.valueOf(body.get("fromMemberId").toString());
        Long toId = Long.valueOf(body.get("toMemberId").toString());
        BigDecimal amount = new BigDecimal(body.get("amount").toString());

        KhataSettlement settlement = khataService.recordSettlement(id, fromId, toId, amount);
        return ResponseEntity.ok(ApiResponse.success(settlement, "Settlement recorded"));
    }
}
