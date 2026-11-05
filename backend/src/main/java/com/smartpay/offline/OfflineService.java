package com.smartpay.offline;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class OfflineService {

    private final OfflineTransactionRepository offlineRepository;

    public OfflineService(OfflineTransactionRepository offlineRepository) {
        this.offlineRepository = offlineRepository;
    }

    @Transactional
    public OfflineTransaction recordOfflinePayment(Long userId, OfflineTransaction tx) {
        tx.setUserId(userId);
        tx.setSynced(true);
        tx.setSyncedAt(LocalDateTime.now());
        return offlineRepository.save(tx);
    }

    @Transactional(readOnly = true)
    public List<OfflineTransaction> getUserOfflineHistory(Long userId) {
        return offlineRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }
}
