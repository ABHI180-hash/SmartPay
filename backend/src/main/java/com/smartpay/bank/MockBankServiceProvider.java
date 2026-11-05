package com.smartpay.bank;

import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class MockBankServiceProvider implements BankServiceProvider {

    private final List<SupportedBankDto> supportedBanks = new ArrayList<>();

    public MockBankServiceProvider() {
        initBanks();
    }

    private void initBanks() {
        supportedBanks.add(new SupportedBankDto(
                "SBI", "State Bank of India", "SBI", "#1A5A96", true, true, "SBIN",
                List.of("UPI", "UPI_LITE", "AUTOPAY", "AADHAAR_OTP", "BIOMETRIC")));

        supportedBanks.add(new SupportedBankDto(
                "HDFC", "HDFC Bank", "HDFC", "#004C8F", true, true, "HDFC",
                List.of("UPI", "UPI_LITE", "AUTOPAY", "AADHAAR_OTP", "BIOMETRIC")));

        supportedBanks.add(new SupportedBankDto(
                "ICICI", "ICICI Bank", "ICICI", "#B02A30", true, true, "ICIC",
                List.of("UPI", "UPI_LITE", "AUTOPAY", "AADHAAR_OTP", "BIOMETRIC")));

        supportedBanks.add(new SupportedBankDto(
                "AXIS", "Axis Bank", "AXIS", "#97144D", true, true, "UTIB",
                List.of("UPI", "UPI_LITE", "AUTOPAY", "AADHAAR_OTP", "BIOMETRIC")));

        supportedBanks.add(new SupportedBankDto(
                "PNB", "Punjab National Bank", "PNB", "#A2192A", true, true, "PUNB",
                List.of("UPI", "UPI_LITE", "AUTOPAY")));

        supportedBanks.add(new SupportedBankDto(
                "BOB", "Bank of Baroda", "BOB", "#F26522", true, true, "BARB",
                List.of("UPI", "UPI_LITE", "AUTOPAY", "AADHAAR_OTP")));

        supportedBanks.add(new SupportedBankDto(
                "CANARA", "Canara Bank", "CANARA", "#0093DD", false, true, "CNRB",
                List.of("UPI", "AUTOPAY")));

        supportedBanks.add(new SupportedBankDto(
                "UNION", "Union Bank of India", "UNION", "#D62329", false, true, "UBIN",
                List.of("UPI", "AUTOPAY")));

        supportedBanks.add(new SupportedBankDto(
                "KOTAK", "Kotak Mahindra Bank", "KOTAK", "#ED1C24", true, true, "KKBK",
                List.of("UPI", "UPI_LITE", "AUTOPAY", "BIOMETRIC")));

        supportedBanks.add(new SupportedBankDto(
                "INDIAN", "Indian Bank", "INDIAN", "#004B87", false, true, "IDIB",
                List.of("UPI", "AUTOPAY")));

        supportedBanks.add(new SupportedBankDto(
                "BOI", "Bank of India", "BOI", "#E31E24", false, true, "BKID",
                List.of("UPI", "AUTOPAY")));

        supportedBanks.add(new SupportedBankDto(
                "IDFC", "IDFC FIRST Bank", "IDFC", "#9B1A24", true, true, "IDFB",
                List.of("UPI", "UPI_LITE", "AUTOPAY", "BIOMETRIC")));
    }

    @Override
    public List<SupportedBankDto> getSupportedBanks() {
        return Collections.unmodifiableList(supportedBanks);
    }

    @Override
    public List<SupportedBankDto> searchBanks(String query) {
        if (query == null || query.isBlank()) {
            return getSupportedBanks();
        }
        String q = query.trim().toLowerCase();
        return supportedBanks.stream()
                .filter(b -> b.getBankName().toLowerCase().contains(q) || b.getBankCode().toLowerCase().contains(q))
                .collect(Collectors.toList());
    }

    @Override
    public List<DiscoveredAccountDto> discoverAccounts(String bankCode, String mobileNumber, String userName) {
        SupportedBankDto bank = supportedBanks.stream()
                .filter(b -> b.getBankCode().equalsIgnoreCase(bankCode))
                .findFirst()
                .orElse(new SupportedBankDto(bankCode, bankCode + " Bank", bankCode, "#102B4F", false, true, "BANK", List.of("UPI")));

        String cleanPhone = mobileNumber != null ? mobileNumber.replaceAll("[^0-9]", "") : "9876543210";
        String last4Phone = cleanPhone.length() >= 4 ? cleanPhone.substring(cleanPhone.length() - 4) : "4321";
        String displayName = (userName != null && !userName.isBlank()) ? userName.toUpperCase() : "AVIJIT ROY";

        List<DiscoveredAccountDto> discovered = new ArrayList<>();

        // Primary Savings Account
        String accRef1 = "ACC_REF_" + UUID.randomUUID().toString().substring(0, 8);
        String masked1 = "•••• " + ((Integer.parseInt(last4Phone) + 1111) % 9000 + 1000);
        discovered.add(new DiscoveredAccountDto(
                accRef1,
                bank.getBankCode(),
                bank.getBankName(),
                masked1,
                displayName,
                "SAVINGS",
                bank.getIfscPrefix() + "0001048",
                "Main Financial Hub Branch",
                true,
                true,
                bank.getSupportedFeatures().contains("AADHAAR_OTP")
        ));

        // Optional Second Account (Current or Salary account)
        String accRef2 = "ACC_REF_" + UUID.randomUUID().toString().substring(0, 8);
        String masked2 = "•••• " + ((Integer.parseInt(last4Phone) + 3333) % 9000 + 1000);
        discovered.add(new DiscoveredAccountDto(
                accRef2,
                bank.getBankCode(),
                bank.getBankName(),
                masked2,
                displayName,
                "CURRENT",
                bank.getIfscPrefix() + "0002091",
                "Corporate Metro Branch",
                true,
                true,
                bank.getSupportedFeatures().contains("AADHAAR_OTP")
        ));

        return discovered;
    }

    @Override
    public BankVerificationResult verifyAccount(BankVerificationRequest request, Long userId) {
        // Generate cryptographic NPCI / PSP provider reference
        String providerReference = "NPCI-PSP-SETU-" + UUID.randomUUID().toString().replace("-", "").substring(0, 16).toUpperCase();
        return BankVerificationResult.success(providerReference, null);
    }
}
