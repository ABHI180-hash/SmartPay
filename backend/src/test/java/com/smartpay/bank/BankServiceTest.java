package com.smartpay.bank;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class BankServiceTest {

    @Autowired
    private BankService bankService;

    @Test
    @DisplayName("Test 12: List all supported Indian banks returns catalog with UPI capabilities")
    void testGetSupportedBanks() {
        List<SupportedBankDto> banks = bankService.getSupportedBanks();
        assertNotNull(banks);
        assertTrue(banks.size() >= 12, "Should include at least 12 major Indian banks (SBI, HDFC, ICICI, Axis...)");

        boolean hasSbi = banks.stream().anyMatch(b -> "SBI".equalsIgnoreCase(b.getBankCode()));
        boolean hasHdfc = banks.stream().anyMatch(b -> "HDFC".equalsIgnoreCase(b.getBankCode()));
        assertTrue(hasSbi, "Catalog must include SBI");
        assertTrue(hasHdfc, "Catalog must include HDFC");
    }

    @Test
    @DisplayName("Test 13: Search Indian banks by name or code filters correctly")
    void testSearchBanks() {
        List<SupportedBankDto> results = bankService.searchBanks("ICICI");
        assertNotNull(results);
        assertFalse(results.isEmpty());
        assertEquals("ICICI", results.get(0).getBankCode());
    }

    @Test
    @DisplayName("Test 14: Bank discovery simulator discovers accounts matching phone number")
    void testDiscoverAccounts() {
        List<DiscoveredAccountDto> discovered = bankService.discoverAccounts(1L, "HDFC", "9876543210");
        assertNotNull(discovered);
        assertFalse(discovered.isEmpty(), "Should return eligible HDFC demo accounts");
        assertNotNull(discovered.get(0).getMaskedAccountNumber());
    }

    @Test
    @DisplayName("Test 15: Bank account verification simulation links account successfully")
    void testVerifyAndLinkAccount() {
        BankVerificationRequest req = new BankVerificationRequest();
        req.setBankCode("SBI");
        req.setAccountType("SAVINGS");
        req.setMaskedAccountNumber("•••• 4892");
        req.setIfscCode("SBIN0001042");
        req.setVerificationMethod("DEBIT_CARD");
        req.setDebitLast6("654321");
        req.setExpiryMonth("09");
        req.setExpiryYear("28");
        req.setSetPrimary(true);

        BankAccount account = bankService.verifyAndLinkAccount(1L, req);

        assertNotNull(account);
        assertNotNull(account.getId());
        assertEquals("VERIFIED", account.getVerificationStatus());
        assertEquals("SBI", account.getBankCode());
    }
}
