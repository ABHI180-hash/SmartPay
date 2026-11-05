package com.smartpay.auth;

import com.smartpay.exception.BadRequestException;
import com.smartpay.exception.ResourceNotFoundException;
import com.smartpay.security.JwtTokenProvider;
import com.smartpay.security.UserPrincipal;
import com.smartpay.user.Role;
import com.smartpay.user.RoleRepository;
import com.smartpay.user.User;
import com.smartpay.user.UserRepository;
import com.smartpay.wallet.AddMoneyRequest;
import com.smartpay.wallet.WalletService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;
    private final WalletService walletService;

    @Value("${smartpay.jwt.refresh-expiration-ms:604800000}")
    private long refreshExpirationMs;

    public AuthService(UserRepository userRepository,
                       RoleRepository roleRepository,
                       RefreshTokenRepository refreshTokenRepository,
                       PasswordEncoder passwordEncoder,
                       JwtTokenProvider tokenProvider,
                       WalletService walletService) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.refreshTokenRepository = refreshTokenRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenProvider = tokenProvider;
        this.walletService = walletService;
    }

    @Transactional
    public AuthResponse login(LoginRequest request) {
        String identifier = request.getIdentifier().trim();
        User user = userRepository.findByPhone(identifier)
                .or(() -> userRepository.findByUsername(identifier))
                .or(() -> userRepository.findByEmail(identifier))
                .or(() -> userRepository.findByUpiId(identifier))
                .orElseThrow(() -> new BadRequestException("No account found with identifier: " + identifier));

        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new BadRequestException("Invalid credentials. Please verify your phone number and UPI PIN.");
        }

        if (!user.isEnabled()) {
            throw new BadRequestException("Account has been disabled. Please contact support.");
        }

        UserPrincipal principal = UserPrincipal.create(user);
        String accessToken = tokenProvider.generateToken(principal);
        RefreshToken refreshToken = createRefreshToken(user);

        List<String> roles = user.getRoles().stream()
                .map(Role::getName)
                .collect(Collectors.toList());

        return new AuthResponse(
                accessToken,
                refreshToken.getToken(),
                user.getId(),
                user.getUsername(),
                user.getFullName(),
                user.getEmail(),
                user.getPhone(),
                user.getUpiId(),
                user.getAvatarUrl(),
                roles
        );
    }

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        String phone = request.getPhone().trim().replaceAll("[^0-9]", "");
        if (phone.length() > 10) {
            phone = phone.substring(phone.length() - 10);
        }

        if (userRepository.existsByPhone(phone)) {
            throw new BadRequestException("An account with phone number " + phone + " already exists.");
        }

        String email = request.getEmail() != null && !request.getEmail().isBlank()
                ? request.getEmail().trim().toLowerCase()
                : phone + "@smartpay.local";

        if (userRepository.existsByEmail(email)) {
            throw new BadRequestException("Email " + email + " is already registered.");
        }

        String username = phone;
        if (userRepository.existsByUsername(username)) {
            username = "user_" + UUID.randomUUID().toString().substring(0, 8);
        }

        String upiId = request.getUpiId() != null && !request.getUpiId().isBlank()
                ? request.getUpiId().trim().toLowerCase()
                : phone + "@smartpay";

        User user = new User();
        user.setFullName(request.getFullName().trim());
        user.setPhone(phone);
        user.setEmail(email);
        user.setUsername(username);
        user.setUpiId(upiId);
        user.setPasswordHash(passwordEncoder.encode(request.getPassword().trim()));
        user.setEnabled(true);
        user.setKycVerified(true);
        user.setAvatarUrl("https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80");

        Role userRole = roleRepository.findByName("ROLE_USER")
                .orElseGet(() -> roleRepository.save(new Role("ROLE_USER")));
        user.setRoles(new HashSet<>(Collections.singletonList(userRole)));

        User savedUser = userRepository.save(user);

        // Auto-create wallet and give initial balance
        walletService.createWalletForUser(savedUser.getId());
        AddMoneyRequest initialDeposit = new AddMoneyRequest();
        initialDeposit.setAmount(new BigDecimal("1450.00"));
        initialDeposit.setSource("SmartPay Welcome Bonus");
        initialDeposit.setReference("WELCOME-" + savedUser.getId());
        walletService.addMoney(savedUser.getId(), initialDeposit);

        UserPrincipal principal = UserPrincipal.create(savedUser);
        String accessToken = tokenProvider.generateToken(principal);
        RefreshToken refreshToken = createRefreshToken(savedUser);

        List<String> roles = savedUser.getRoles().stream()
                .map(Role::getName)
                .collect(Collectors.toList());

        return new AuthResponse(
                accessToken,
                refreshToken.getToken(),
                savedUser.getId(),
                savedUser.getUsername(),
                savedUser.getFullName(),
                savedUser.getEmail(),
                savedUser.getPhone(),
                savedUser.getUpiId(),
                savedUser.getAvatarUrl(),
                roles
        );
    }

    @Transactional
    public RefreshToken createRefreshToken(User user) {
        RefreshToken refreshToken = refreshTokenRepository.findByUser(user)
                .orElseGet(() -> {
                    RefreshToken token = new RefreshToken();
                    token.setUser(user);
                    return token;
                });
        refreshToken.setExpiryDate(Instant.now().plusMillis(refreshExpirationMs));
        refreshToken.setToken(UUID.randomUUID().toString());
        return refreshTokenRepository.save(refreshToken);
    }

    @Transactional
    public AuthResponse refreshAccessToken(RefreshTokenRequest request) {
        RefreshToken token = refreshTokenRepository.findByToken(request.getRefreshToken())
                .orElseThrow(() -> new BadRequestException("Invalid refresh token"));

        if (token.getExpiryDate().isBefore(Instant.now())) {
            refreshTokenRepository.delete(token);
            throw new BadRequestException("Refresh token has expired. Please log in again.");
        }

        User user = token.getUser();
        UserPrincipal principal = UserPrincipal.create(user);
        String newAccessToken = tokenProvider.generateToken(principal);

        List<String> roles = user.getRoles().stream()
                .map(Role::getName)
                .collect(Collectors.toList());

        return new AuthResponse(
                newAccessToken,
                token.getToken(),
                user.getId(),
                user.getUsername(),
                user.getFullName(),
                user.getEmail(),
                user.getPhone(),
                user.getUpiId(),
                user.getAvatarUrl(),
                roles
        );
    }

    @Transactional
    public void logout(String refreshToken) {
        if (refreshToken != null && !refreshToken.isBlank()) {
            refreshTokenRepository.findByToken(refreshToken).ifPresent(refreshTokenRepository::delete);
        }
    }

    @Transactional
    public void resetPin(ForgotPinRequest request) {
        String identifier = request.getPhone().trim().replaceAll("[^0-9]", "");
        User user = userRepository.findByPhone(identifier)
                .or(() -> userRepository.findByEmail(request.getPhone().trim()))
                .orElseThrow(() -> new ResourceNotFoundException("No account found for " + request.getPhone()));

        // In production, verify OTP here. In demo, allow reset if OTP matches default "1234" or is non-empty.
        if (request.getOtp() == null || request.getOtp().isBlank()) {
            throw new BadRequestException("OTP is required to reset PIN");
        }

        user.setPasswordHash(passwordEncoder.encode(request.getNewPin().trim()));
        userRepository.save(user);
    }
}
