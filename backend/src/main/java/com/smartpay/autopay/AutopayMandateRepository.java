package com.smartpay.autopay;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AutopayMandateRepository extends JpaRepository<AutopayMandate, Long> {

    List<AutopayMandate> findByUserIdOrderByCreatedAtDesc(Long userId);

    List<AutopayMandate> findByUserIdAndStatus(Long userId, String status);

    Optional<AutopayMandate> findByIdAndUserId(Long id, Long userId);

    Optional<AutopayMandate> findByUmn(String umn);

    long countByUserIdAndStatus(Long userId, String status);
}
