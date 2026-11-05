package com.smartpay.qr;

import com.smartpay.common.ApiResponse;
import com.smartpay.security.UserPrincipal;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/qr")
@Tag(name = "QR Payments", description = "NPCI standard UPI QR code generation, scanning, and fraud validation")
public class QrController {

    private final QrService qrService;

    public QrController(QrService qrService) {
        this.qrService = qrService;
    }

    @PostMapping("/generate")
    @Operation(summary = "Generate personal or merchant payment QR code")
    public ResponseEntity<ApiResponse<QrCode>> generate(
            @AuthenticationPrincipal UserPrincipal currentUser,
            @RequestBody(required = false) QrGenerateRequest request) {
        QrGenerateRequest req = (request != null) ? request : new QrGenerateRequest();
        QrCode code = qrService.generateUserQr(currentUser.getId(), req);
        return ResponseEntity.ok(ApiResponse.success(code, "QR code generated"));
    }

    @PostMapping("/validate")
    @Operation(summary = "Scan & validate QR payload with AI Scam Shield safety verification")
    public ResponseEntity<ApiResponse<QrValidationResult>> validate(
            @AuthenticationPrincipal UserPrincipal currentUser,
            @RequestBody Map<String, String> body) {
        String raw = body.get("payload");
        Long userId = (currentUser != null) ? currentUser.getId() : null;
        QrValidationResult result = qrService.validateAndParse(userId, raw);
        return ResponseEntity.ok(ApiResponse.success(result, "QR code scanned and validated"));
    }
}
