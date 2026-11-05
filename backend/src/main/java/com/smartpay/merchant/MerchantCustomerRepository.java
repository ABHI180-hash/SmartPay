package com.smartpay.merchant;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MerchantCustomerRepository extends JpaRepository<MerchantCustomer, Long> {
    List<MerchantCustomer> findByMerchantIdOrderByLastVisitDesc(Long merchantId);
}
