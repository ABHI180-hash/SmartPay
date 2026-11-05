package com.smartpay.offline;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface OfflineTransactionRepository extends JpaRepository<OfflineTransaction, Long> {
    List<OfflineTransaction> findByUserIdOrderByCreatedAtDesc(Long userId);
    Optional<OfflineTransaction> findByClientReference(String clientReference);
}
