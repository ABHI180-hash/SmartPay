package com.smartpay.wallet;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.math.BigDecimal;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.atomic.AtomicInteger;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class WalletServiceConcurrencyTest {

    @Autowired
    private WalletService walletService;

    @Autowired
    private WalletRepository walletRepository;

    @Test
    @DisplayName("Test 20: Concurrency double-spend prevention: 5 concurrent threads debiting ₹100 from ₹200 wallet allows exactly 2 debits and rejects 3")
    void testConcurrentDebitsPreventDoubleSpend() throws InterruptedException {
        // Setup a dedicated test wallet with exactly 200 INR balance
        Long testUserId = 99999L;
        Wallet wallet = walletRepository.findByUserId(testUserId).orElseGet(() -> {
            Wallet w = new Wallet();
            w.setUserId(testUserId);
            w.setBalance(new BigDecimal("200.00"));
            w.setUpiLiteXBalance(BigDecimal.ZERO);
            w.setUpiLiteXEnabled(false);
            w.setStatus("ACTIVE");
            w.setCurrency("INR");
            return walletRepository.save(w);
        });
        wallet.setBalance(new BigDecimal("200.00"));
        walletRepository.save(wallet);

        int threads = 5;
        ExecutorService executor = Executors.newFixedThreadPool(threads);
        CountDownLatch readyLatch = new CountDownLatch(threads);
        CountDownLatch startLatch = new CountDownLatch(1);
        CountDownLatch doneLatch = new CountDownLatch(threads);

        AtomicInteger successCount = new AtomicInteger(0);
        AtomicInteger failureCount = new AtomicInteger(0);

        for (int i = 0; i < threads; i++) {
            final int index = i;
            executor.submit(() -> {
                readyLatch.countDown();
                try {
                    startLatch.await(); // Wait for all threads to align
                    walletService.debit(testUserId, new BigDecimal("100.00"), "CONCUR-" + index, "Concurrent test debit");
                    successCount.incrementAndGet();
                } catch (Exception e) {
                    failureCount.incrementAndGet();
                } finally {
                    doneLatch.countDown();
                }
            });
        }

        readyLatch.await();
        startLatch.countDown(); // Fire all 5 concurrent requests simultaneously
        doneLatch.await();
        executor.shutdown();

        Wallet finalWallet = walletRepository.findByUserId(testUserId).orElseThrow();
        assertEquals(2, successCount.get(), "Exactly 2 debits of ₹100 should succeed from ₹200 initial balance");
        assertEquals(3, failureCount.get(), "3 debits must fail due to InsufficientFundsException");
        assertEquals(0, finalWallet.getBalance().compareTo(BigDecimal.ZERO), "Final balance must be exactly ₹0.00 without double-spending");
    }
}
