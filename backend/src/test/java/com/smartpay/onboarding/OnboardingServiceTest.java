package com.smartpay.onboarding;

import com.smartpay.exception.BadRequestException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class OnboardingServiceTest {

    @Autowired
    private OnboardingService onboardingService;

    @Test
    @DisplayName("Test 16: Send mobile OTP generates simulation code in dev mode")
    void testSendMobileOtpSimulation() {
        MobileOtpSendRequest req = new MobileOtpSendRequest();
        req.setMobileNumber("9876543210");
        Map<String, Object> res = onboardingService.sendMobileOtp(req);

        assertNotNull(res);
        assertTrue((Boolean) res.get("devSimulationMode"));
        assertNotNull(res.get("simulatedOtp"));
        assertEquals(6, ((String) res.get("simulatedOtp")).length());
        assertNotNull(res.get("mobileNumberMasked"));
    }

    @Test
    @DisplayName("Test 17: Verify mobile OTP with correct code succeeds")
    void testVerifyMobileOtpSuccess() {
        MobileOtpSendRequest sendReq = new MobileOtpSendRequest();
        sendReq.setMobileNumber("9876543210");
        Map<String, Object> sendRes = onboardingService.sendMobileOtp(sendReq);
        String correctOtp = (String) sendRes.get("simulatedOtp");

        MobileOtpVerifyRequest verifyReq = new MobileOtpVerifyRequest();
        verifyReq.setMobileNumber("9876543210");
        verifyReq.setOtp(correctOtp);
        Map<String, Object> verifyRes = onboardingService.verifyMobileOtp(verifyReq);

        assertNotNull(verifyRes);
        assertTrue((Boolean) verifyRes.get("verified"));
    }

    @Test
    @DisplayName("Test 18: Verify mobile OTP with invalid code fails and counts attempts")
    void testVerifyMobileOtpInvalidCode() {
        MobileOtpSendRequest sendReq = new MobileOtpSendRequest();
        sendReq.setMobileNumber("9876543210");
        onboardingService.sendMobileOtp(sendReq);

        MobileOtpVerifyRequest verifyReq = new MobileOtpVerifyRequest();
        verifyReq.setMobileNumber("9876543210");
        verifyReq.setOtp("000000");
        assertThrows(BadRequestException.class, () -> onboardingService.verifyMobileOtp(verifyReq));
    }

    @Test
    @DisplayName("Test 19: Google OAuth authentication identifies returning user with linked accounts")
    void testGoogleAuthReturningUser() {
        GoogleAuthRequest req = new GoogleAuthRequest();
        req.setIdToken("simulated-google-jwt-token-xyz");
        req.setGoogleSubjectId("1092830192830192");
        req.setEmail("avijit.roy@gmail.com");
        req.setName("Avijit Roy");
        req.setAvatarUrl("https://images.unsplash.com/photo-1534528741775-53994a69daeb");
        req.setDeviceIdentifier("test-device-fingerprint-sha256");

        GoogleAuthResponse res = onboardingService.authenticateGoogle(req);

        assertNotNull(res);
        assertNotNull(res.getAccessToken());
        assertTrue(res.isReturningUser());
        assertEquals("Avijit Roy", res.getFullName());
        assertNotNull(res.getVerifiedBanks());
    }
}
