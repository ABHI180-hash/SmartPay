package com.smartpay.auth;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface OAuthAccountRepository extends JpaRepository<OAuthAccount, Long> {
    Optional<OAuthAccount> findByProviderAndProviderSubjectId(String provider, String providerSubjectId);
    Optional<OAuthAccount> findByUserIdAndProvider(Long userId, String provider);
    Optional<OAuthAccount> findByProviderEmail(String providerEmail);
}
