package com.smartpay.bank;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface BankAccountRepository extends JpaRepository<BankAccount, Long> {
    List<BankAccount> findByUserId(Long userId);
    Optional<BankAccount> findByIdAndUserId(Long id, Long userId);
    List<BankAccount> findByUserIdAndVerificationStatus(Long userId, String verificationStatus);
    Optional<BankAccount> findByUserIdAndIsPrimaryTrue(Long userId);
    Optional<BankAccount> findFirstByUserIdAndVerificationStatusAndIsPrimaryTrue(Long userId, String verificationStatus);
    List<BankAccount> findByUserIdAndBankCode(Long userId, String bankCode);
}
