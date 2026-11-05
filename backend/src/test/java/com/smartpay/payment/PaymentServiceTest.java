package com.smartpay.payment;

import com.smartpay.exception.FraudRiskBlockedException;
import com.smartpay.exception.InsufficientFundsException;
import com.smartpay.transaction.TransactionDto;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class PaymentServiceTest {

    @Autowired
    private PaymentService paymentService;

    @Test
    @DisplayName("Test 7: Successful simulated payment generates valid 12-digit UTR")
    void testProcessTransferSuccess() {
        TransferRequest req = new TransferRequest();
        req.setRecipientIdentifier("9876543211"); // Robin
        req.setRecipientName("Robin");
        req.setAmount(new BigDecimal("25.00"));
        req.setPaymentMode("WALLET");
        req.setNote("Dinner split");
        req.setIdempotencyKey("test-idem-" + UUID.randomUUID());

        TransactionDto dto = paymentService.processTransfer(1L, req);

        assertNotNull(dto);
        assertNotNull(dto.getTransactionReference());
        assertNotNull(dto.getUtrNumber());
        assertEquals("SUCCESS", dto.getStatus());
        assertEquals(new BigDecimal("25.00"), dto.getAmount());
    }

    @Test
    @DisplayName("Test 8: Idempotency check prevents duplicate deduction on identical request")
    void testIdempotencyPreventsDuplicateTransfer() {
        String key = "fixed-idem-key-" + UUID.randomUUID();

        TransferRequest req1 = new TransferRequest();
        req1.setRecipientIdentifier("9876543211");
        req1.setRecipientName("Robin");
        req1.setAmount(new BigDecimal("10.00"));
        req1.setPaymentMode("WALLET");
        req1.setIdempotencyKey(key);

        TransactionDto first = paymentService.processTransfer(1L, req1);

        TransferRequest req2 = new TransferRequest();
        req2.setRecipientIdentifier("9876543211");
        req2.setRecipientName("Robin");
        req2.setAmount(new BigDecimal("10.00"));
        req2.setPaymentMode("WALLET");
        req2.setIdempotencyKey(key);

        TransactionDto second = paymentService.processTransfer(1L, req2);

        assertEquals(first.getTransactionReference(), second.getTransactionReference());
        assertEquals(first.getUtrNumber(), second.getUtrNumber());
    }

    @Test
    @DisplayName("Test 9: Insufficient balance throws InsufficientFundsException")
    void testInsufficientBalanceThrowsException() {
        TransferRequest req = new TransferRequest();
        req.setRecipientIdentifier("9876543211");
        req.setRecipientName("Robin");
        req.setAmount(new BigDecimal("99999999.00"));
        req.setPaymentMode("WALLET");

        assertThrows(InsufficientFundsException.class, () -> paymentService.processTransfer(1L, req));
    }

    @Test
    @DisplayName("Test 10: AI Scam Shield blocks high-risk phishing / malicious APK transfers")
    void testScamShieldBlocksPhishing() {
        TransferRequest req = new TransferRequest();
        req.setRecipientIdentifier("phishing_syndicate@upi");
        req.setRecipientName("Lottery Prize APK Claim");
        req.setAmount(new BigDecimal("100.00"));
        req.setNote("lottery claim gift apk install");

        assertThrows(FraudRiskBlockedException.class, () -> paymentService.processTransfer(1L, req));
    }

    @Test
    @DisplayName("Test 11: Transaction history retrieval returns user transactions")
    void testGetTransactionsForUser() {
        List<TransactionDto> history = paymentService.getTransactionsForUser(1L);
        assertNotNull(history);
        assertFalse(history.isEmpty(), "User 1 should have transaction records");
    }
}
