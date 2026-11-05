package com.smartpay.onboarding;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface OnboardingSessionRepository extends JpaRepository<OnboardingSession, Long> {
    Optional<OnboardingSession> findFirstByUserIdOrderByCreatedAtDesc(Long userId);
    Optional<OnboardingSession> findByUserIdAndOnboardingStatus(Long userId, String onboardingStatus);
}
