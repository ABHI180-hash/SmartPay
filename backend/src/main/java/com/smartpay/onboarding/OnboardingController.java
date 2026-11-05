package com.smartpay.onboarding;

import com.smartpay.common.ApiResponse;
import com.smartpay.security.UserPrincipal;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1")
@Tag(name = "Onboarding & Returning User Authentication", description = "Google Sign-In, Mobile OTP, Bank Verification and Device Trust")
public class OnboardingController {

    private final OnboardingService onboardingService;

    public OnboardingController(OnboardingService onboardingService) {
        this.onboardingService = onboardingService;
    }

    @PostMapping("/auth/google")
    @Operation(summary = "Authenticate with Google OAuth/OIDC, identify returning user or create new profile")
    public ResponseEntity<ApiResponse<GoogleAuthResponse>> authenticateGoogle(@Valid @RequestBody GoogleAuthRequest request) {
        GoogleAuthResponse response = onboardingService.authenticateGoogle(request);
        return ResponseEntity.ok(ApiResponse.success(response, response.isReturningUser() ? "Welcome back to SmartPay!" : "Google account authenticated successfully"));
    }

    @PostMapping("/onboarding/mobile/send-otp")
    @Operation(summary = "Send OTP to mobile number for verification")
    public ResponseEntity<ApiResponse<Map<String, Object>>> sendMobileOtp(@Valid @RequestBody MobileOtpSendRequest request) {
        Map<String, Object> result = onboardingService.sendMobileOtp(request);
        return ResponseEntity.ok(ApiResponse.success(result, (String) result.get("message")));
    }

    @PostMapping("/onboarding/mobile/verify-otp")
    @Operation(summary = "Verify OTP entered by user")
    public ResponseEntity<ApiResponse<Map<String, Object>>> verifyMobileOtp(@Valid @RequestBody MobileOtpVerifyRequest request) {
        Map<String, Object> result = onboardingService.verifyMobileOtp(request);
        return ResponseEntity.ok(ApiResponse.success(result, (String) result.get("message")));
    }

    @PostMapping("/auth/device-verification")
    @Operation(summary = "Register and trust device after OTP verification")
    public ResponseEntity<ApiResponse<Map<String, Object>>> verifyDevice(@Valid @RequestBody DeviceVerifyRequest request) {
        Map<String, Object> result = onboardingService.verifyDevice(request);
        return ResponseEntity.ok(ApiResponse.success(result, (String) result.get("message")));
    }

    @GetMapping("/users/me/onboarding-status")
    @Operation(summary = "Get current user's onboarding completion status and verified banks")
    public ResponseEntity<ApiResponse<OnboardingStatusResponse>> getOnboardingStatus(
            @AuthenticationPrincipal UserPrincipal currentUser,
            @RequestParam(required = false) Long userId) {
        Long targetId = currentUser != null ? currentUser.getId() : userId;
        if (targetId == null) {
            targetId = 1L; // Fallback to primary demo user
        }
        OnboardingStatusResponse status = onboardingService.getOnboardingStatus(targetId);
        return ResponseEntity.ok(ApiResponse.success(status, "Onboarding status fetched"));
    }

    @PostMapping("/onboarding/complete")
    @Operation(summary = "Mark onboarding process as completed")
    public ResponseEntity<ApiResponse<Map<String, Object>>> completeOnboarding(
            @AuthenticationPrincipal UserPrincipal currentUser,
            @RequestParam(required = false) Long userId) {
        Long targetId = currentUser != null ? currentUser.getId() : userId;
        if (targetId == null) {
            targetId = 1L;
        }
        Map<String, Object> result = onboardingService.completeOnboarding(targetId);
        return ResponseEntity.ok(ApiResponse.success(result, (String) result.get("message")));
    }
}
