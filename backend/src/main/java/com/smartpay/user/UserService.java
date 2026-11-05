package com.smartpay.user;

import com.smartpay.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public UserDto getUserProfile(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
        return new UserDto(user);
    }

    @Transactional
    public UserDto updateProfile(Long userId, UpdateProfileRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        if (request.getFullName() != null && !request.getFullName().isBlank()) {
            user.setFullName(request.getFullName().trim());
        }
        if (request.getEmail() != null && !request.getEmail().isBlank()) {
            user.setEmail(request.getEmail().trim().toLowerCase());
        }
        if (request.getAvatarUrl() != null && !request.getAvatarUrl().isBlank()) {
            user.setAvatarUrl(request.getAvatarUrl().trim());
        }

        return new UserDto(userRepository.save(user));
    }

    @Transactional
    public UserDto updateBiometricSettings(Long userId, Boolean enabled, java.math.BigDecimal quickPayLimit) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        if (enabled != null) {
            user.setBiometricEnabled(enabled);
        }
        if (quickPayLimit != null && quickPayLimit.signum() >= 0) {
            user.setQuickPayLimit(quickPayLimit);
        }
        return new UserDto(userRepository.save(user));
    }
}
