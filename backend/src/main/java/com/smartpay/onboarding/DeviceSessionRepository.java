package com.smartpay.onboarding;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.List;

public interface DeviceSessionRepository extends JpaRepository<DeviceSession, Long> {
    Optional<DeviceSession> findByUserIdAndDeviceIdentifierHash(Long userId, String deviceIdentifierHash);
    List<DeviceSession> findByUserId(Long userId);
    List<DeviceSession> findByUserIdAndTrustStatus(Long userId, String trustStatus);
}
