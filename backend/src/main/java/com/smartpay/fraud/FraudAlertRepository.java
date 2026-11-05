package com.smartpay.fraud;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FraudAlertRepository extends JpaRepository<FraudAlert, Long> {
    List<FraudAlert> findByUserIdOrderByCreatedAtDesc(Long userId);
    List<FraudAlert> findTop20ByOrderByCreatedAtDesc();
}
