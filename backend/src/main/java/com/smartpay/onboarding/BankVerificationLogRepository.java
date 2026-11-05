package com.smartpay.onboarding;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface BankVerificationLogRepository extends JpaRepository<BankVerificationLog, Long> {
    List<BankVerificationLog> findByUserIdOrderByCreatedAtDesc(Long userId);
    Optional<BankVerificationLog> findByProviderReference(String providerReference);
}
