package com.smartpay.khata;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface KhataMemberRepository extends JpaRepository<KhataMember, Long> {
    List<KhataMember> findByGroupId(Long groupId);
    List<KhataMember> findByUserId(Long userId);
}
