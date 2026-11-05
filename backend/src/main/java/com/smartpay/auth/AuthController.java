package com.smartpay.auth;

import com.smartpay.common.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@Tag(name = "Authentication", description = "User registration, login, token refresh, and PIN reset")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    @Operation(summary = "Sign in with phone number/email/UPI ID and PIN")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@Valid @RequestBody LoginRequest request) {
        AuthResponse response = authService.login(request);
        return ResponseEntity.ok(ApiResponse.success(response, "Login successful"));
    }

    @PostMapping("/register")
    @Operation(summary = "Register new SmartPay user account")
    public ResponseEntity<ApiResponse<AuthResponse>> register(@Valid @RequestBody RegisterRequest request) {
        AuthResponse response = authService.register(request);
        return ResponseEntity.ok(ApiResponse.success(response, "Account registered successfully"));
    }

    @PostMapping("/refresh")
    @Operation(summary = "Refresh expired JWT access token")
    public ResponseEntity<ApiResponse<AuthResponse>> refresh(@Valid @RequestBody RefreshTokenRequest request) {
        AuthResponse response = authService.refreshAccessToken(request);
        return ResponseEntity.ok(ApiResponse.success(response, "Token refreshed successfully"));
    }

    @PostMapping("/logout")
    @Operation(summary = "Logout user and invalidate refresh token")
    public ResponseEntity<ApiResponse<Void>> logout(@RequestBody(required = false) RefreshTokenRequest request) {
        if (request != null && request.getRefreshToken() != null) {
            authService.logout(request.getRefreshToken());
        }
        return ResponseEntity.ok(ApiResponse.success(null, "Logged out successfully"));
    }

    @PostMapping("/forgot-pin")
    @Operation(summary = "Reset forgotten UPI PIN using verified OTP")
    public ResponseEntity<ApiResponse<Void>> forgotPin(@Valid @RequestBody ForgotPinRequest request) {
        authService.resetPin(request);
        return ResponseEntity.ok(ApiResponse.success(null, "PIN reset successfully. You can now login."));
    }
}
