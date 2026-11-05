package com.smartpay.bank;

import java.util.List;

public interface BankServiceProvider {
    List<SupportedBankDto> getSupportedBanks();
    List<SupportedBankDto> searchBanks(String query);
    List<DiscoveredAccountDto> discoverAccounts(String bankCode, String mobileNumber, String userName);
    BankVerificationResult verifyAccount(BankVerificationRequest request, Long userId);
}
