package com.smartpay.onboarding;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.List;

public interface VerifiedMobileNumberRepository extends JpaRepository<VerifiedMobileNumber, Long> {
    Optional<VerifiedMobileNumber> findByMobileNumber(String mobileNumber);
    Optional<VerifiedMobileNumber> findByUserIdAndMobileNumber(Long userId, String mobileNumber);
    List<VerifiedMobileNumber> findByUserId(Long userId);
}
