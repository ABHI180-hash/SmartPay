package com.smartpay.khata;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface KhataGroupRepository extends JpaRepository<KhataGroup, Long> {
    List<KhataGroup> findByCreatorIdOrderByCreatedAtDesc(Long creatorId);
}
