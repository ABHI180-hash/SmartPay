package com.smartpay.onboarding;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.List;

public interface OtpVerificationRepository extends JpaRepository<OtpVerification, Long> {
    Optional<OtpVerification> findFirstByDestinationHashAndPurposeAndStatusOrderByCreatedAtDesc(
            String destinationHash, String purpose, String status);
    List<OtpVerification> findByDestinationHashOrderByCreatedAtDesc(String destinationHash);
}
