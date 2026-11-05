package com.smartpay.fraud;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface SuspiciousIdentifierRepository extends JpaRepository<SuspiciousIdentifier, Long> {
    Optional<SuspiciousIdentifier> findByIdentifierIgnoreCaseAndActiveTrue(String identifier);
    boolean existsByIdentifierIgnoreCaseAndActiveTrue(String identifier);
}
