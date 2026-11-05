package com.smartpay.auth;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "oauth_accounts", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"provider", "providerSubjectId"})
})
public class OAuthAccount {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long userId;

    @Column(nullable = false, length = 50)
    private String provider = "GOOGLE";

    @Column(nullable = false, length = 120)
    private String providerSubjectId;

    @Column(nullable = false, length = 120)
    private String providerEmail;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public OAuthAccount() {}

    public OAuthAccount(Long userId, String provider, String providerSubjectId, String providerEmail) {
        this.userId = userId;
        this.provider = provider;
        this.providerSubjectId = providerSubjectId;
        this.providerEmail = providerEmail;
        this.createdAt = LocalDateTime.now();
    }

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

    public String getProvider() {
        return provider;
    }

    public void setProvider(String provider) {
        this.provider = provider;
    }

    public String getProviderSubjectId() {
        return providerSubjectId;
    }

    public void setProviderSubjectId(String providerSubjectId) {
        this.providerSubjectId = providerSubjectId;
    }

    public String getProviderEmail() {
        return providerEmail;
    }

    public void setProviderEmail(String providerEmail) {
        this.providerEmail = providerEmail;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
