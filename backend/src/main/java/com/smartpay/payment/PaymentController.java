package com.smartpay.payment;

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
@RequestMapping("/api/v1/payments")
@Tag(name = "Payments", description = "Execute money transfers, send/receive payments with AI fraud checks")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping("/transfer")
    @Operation(summary = "Transfer funds to contact, UPI ID, or merchant")
    public ResponseEntity<ApiResponse<TransactionDto>> transfer(
            @AuthenticationPrincipal UserPrincipal currentUser,
            @RequestHeader(value = "Idempotency-Key", required = false) String idempotencyHeader,
            @Valid @RequestBody TransferRequest request) {
        if (request.getIdempotencyKey() == null && idempotencyHeader != null) {
            request.setIdempotencyKey(idempotencyHeader);
        }
        Long senderId = currentUser != null ? currentUser.getId() : 1L;
        TransactionDto result = paymentService.processTransfer(senderId, request);
        return ResponseEntity.ok(ApiResponse.success(result, "Payment processed successfully"));
    }

    @GetMapping
    @Operation(summary = "Get user's complete payment and transaction history")
    public ResponseEntity<ApiResponse<List<TransactionDto>>> getHistory(
            @AuthenticationPrincipal UserPrincipal currentUser) {
        Long userId = currentUser != null ? currentUser.getId() : 1L;
        List<TransactionDto> history = paymentService.getTransactionsForUser(userId);
        return ResponseEntity.ok(ApiResponse.success(history, "Transaction history retrieved"));
    }

    @GetMapping("/{reference}")
    @Operation(summary = "Get transaction details by reference number")
    public ResponseEntity<ApiResponse<TransactionDto>> getDetails(@PathVariable String reference) {
        TransactionDto dto = paymentService.getByReference(reference);
        return ResponseEntity.ok(ApiResponse.success(dto, "Transaction details retrieved"));
    }
}
