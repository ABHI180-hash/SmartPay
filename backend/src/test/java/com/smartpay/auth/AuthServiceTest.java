package com.smartpay.auth;

import com.smartpay.exception.BadRequestException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class AuthServiceTest {

    @Autowired
    private AuthService authService;

    @Test
    @DisplayName("Test 1: Existing user login with valid credentials")
    void testExistingUserLoginSuccess() {
        LoginRequest req = new LoginRequest("9876543210", "1234");
        AuthResponse res = authService.login(req);

        assertNotNull(res);
        assertNotNull(res.getAccessToken());
        assertNotNull(res.getRefreshToken());
        assertEquals("9876543210", res.getPhone());
        assertTrue(res.getRoles().contains("ROLE_USER"));
    }

    @Test
    @DisplayName("Test 2: Login failure with invalid password")
    void testLoginInvalidPassword() {
        LoginRequest req = new LoginRequest("9876543210", "9999");
        assertThrows(BadRequestException.class, () -> authService.login(req));
    }

    @Test
    @DisplayName("Test 3: Login failure with non-existent user")
    void testLoginNonExistentUser() {
        LoginRequest req = new LoginRequest("9000000000", "1234");
        assertThrows(BadRequestException.class, () -> authService.login(req));
    }

    @Test
    @DisplayName("Test 4: Register new user successfully")
    void testRegisterNewUserSuccess() {
        String randomPhone = "91" + (10000000 + (long)(Math.random() * 89999999));
        RegisterRequest req = new RegisterRequest();
        req.setFullName("Test User");
        req.setPhone(randomPhone);
        req.setPassword("5678");
        req.setEmail("test_" + randomPhone + "@example.com");

        AuthResponse res = authService.register(req);

        assertNotNull(res);
        assertNotNull(res.getAccessToken());
        assertEquals("Test User", res.getFullName());
    }

    @Test
    @DisplayName("Test 5: Register fails when phone number already exists")
    void testRegisterDuplicatePhoneFails() {
        RegisterRequest req = new RegisterRequest();
        req.setFullName("Duplicate Tester");
        req.setPhone("9876543210"); // Already exists in seed data
        req.setPassword("1234");

        assertThrows(BadRequestException.class, () -> authService.register(req));
    }

    @Test
    @DisplayName("Test 6: Refresh token produces valid new access token")
    void testRefreshTokenSuccess() {
        LoginRequest loginReq = new LoginRequest("9876543210", "1234");
        AuthResponse loginRes = authService.login(loginReq);

        RefreshTokenRequest refReq = new RefreshTokenRequest(loginRes.getRefreshToken());
        AuthResponse refRes = authService.refreshAccessToken(refReq);

        assertNotNull(refRes);
        assertNotNull(refRes.getAccessToken());
        assertEquals(loginRes.getUserId(), refRes.getUserId());
    }
}
