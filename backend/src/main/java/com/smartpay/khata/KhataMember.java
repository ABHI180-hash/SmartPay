package com.smartpay.khata;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "khata_members")
public class KhataMember {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long groupId;

    private Long userId;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(length = 20)
    private String phone;

    @Column(precision = 15, scale = 2)
    private BigDecimal balance = BigDecimal.ZERO; // positive = gets back, negative = owes

    public KhataMember() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getGroupId() {
        return groupId;
    }

    public void setGroupId(Long groupId) {
        this.groupId = groupId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public BigDecimal getBalance() {
        return balance;
    }

    public void setBalance(BigDecimal balance) {
        this.balance = balance;
    }
}
