package com.smartpay.khata;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface KhataExpenseRepository extends JpaRepository<KhataExpense, Long> {
    List<KhataExpense> findByGroupIdOrderByCreatedAtDesc(Long groupId);
}
