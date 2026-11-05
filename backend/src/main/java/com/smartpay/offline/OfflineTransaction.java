package com.smartpay.offline;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "offline_transactions")
public class OfflineTransaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long userId;

    @Column(nullable = false, unique = true, length = 64)
    private String clientReference;

    @Column(nullable = false, length = 80)
    private String recipientUpi;

    @Column(nullable = false, precision = 15, scale = 2)
    private BigDecimal amount;

    private boolean synced = false;

    private LocalDateTime syncedAt;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public OfflineTransaction() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getClientReference() {
        return clientReference;
    }

    public void setClientReference(String clientReference) {
        this.clientReference = clientReference;
    }

    public String getRecipientUpi() {
        return recipientUpi;
    }

    public void setRecipientUpi(String recipientUpi) {
        this.recipientUpi = recipientUpi;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public boolean isSynced() {
        return synced;
    }

    public void setSynced(boolean synced) {
        this.synced = synced;
    }

    public LocalDateTime getSyncedAt() {
        return syncedAt;
    }

    public void setSyncedAt(LocalDateTime syncedAt) {
        this.syncedAt = syncedAt;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
