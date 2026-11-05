package com.smartpay.qr;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "qr_codes")
public class QrCode {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long userId;

    @Column(nullable = false, length = 500)
    private String upiPayload;

    @Column(precision = 15, scale = 2)
    private BigDecimal amount;

    @Column(nullable = false, length = 20)
    private String qrType = "STATIC"; // STATIC, DYNAMIC

    @Column(length = 100)
    private String note;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public QrCode() {}

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

    public String getUpiPayload() {
        return upiPayload;
    }

    public void setUpiPayload(String upiPayload) {
        this.upiPayload = upiPayload;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public String getQrType() {
        return qrType;
    }

    public void setQrType(String qrType) {
        this.qrType = qrType;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
