package com.smartpay.wallet;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface WalletLedgerRepository extends JpaRepository<WalletLedger, Long> {
    List<WalletLedger> findByWalletIdOrderByCreatedAtDesc(Long walletId);
    Page<WalletLedger> findByWalletIdOrderByCreatedAtDesc(Long walletId, Pageable pageable);
}
