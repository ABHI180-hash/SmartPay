package com.smartpay.qr;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface QrCodeRepository extends JpaRepository<QrCode, Long> {
    List<QrCode> findByUserIdOrderByCreatedAtDesc(Long userId);
    Optional<QrCode> findFirstByUserIdAndQrTypeOrderByCreatedAtDesc(Long userId, String qrType);
}
