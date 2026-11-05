package com.smartpay.transaction;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    Optional<Transaction> findByTransactionReference(String transactionReference);

    Optional<Transaction> findByIdempotencyKey(String idempotencyKey);

    Optional<Transaction> findByUtrNumber(String utrNumber);

    List<Transaction> findBySenderIdOrRecipientIdOrderByCreatedAtDesc(Long senderId, Long recipientId);

    Page<Transaction> findBySenderIdOrRecipientIdOrderByCreatedAtDesc(Long senderId, Long recipientId, Pageable pageable);

    @Query("SELECT t FROM Transaction t WHERE (t.senderId = :userId OR t.recipientId = :userId) AND t.createdAt BETWEEN :startDate AND :endDate ORDER BY t.createdAt DESC")
    List<Transaction> findByUserIdAndDateRange(
            @Param("userId") Long userId,
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate
    );

    @Query("SELECT COALESCE(SUM(t.amount), 0) FROM Transaction t WHERE t.senderId = :userId AND t.status = 'SUCCESS' AND t.type = 'PAYMENT' AND t.createdAt BETWEEN :startDate AND :endDate")
    BigDecimal getTotalSpentInDateRange(
            @Param("userId") Long userId,
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate
    );

    @Query("SELECT t.category, COALESCE(SUM(t.amount), 0) FROM Transaction t WHERE t.senderId = :userId AND t.status = 'SUCCESS' AND t.type = 'PAYMENT' GROUP BY t.category")
    List<Object[]> getCategorySpendingBreakdown(@Param("userId") Long userId);
}
