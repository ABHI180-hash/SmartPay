package com.smartpay.merchant;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MerchantDueRepository extends JpaRepository<MerchantDue, Long> {
    List<MerchantDue> findByMerchantIdOrderByCreatedAtDesc(Long merchantId);
    List<MerchantDue> findByMerchantIdAndStatusOrderByCreatedAtDesc(Long merchantId, String status);
}
