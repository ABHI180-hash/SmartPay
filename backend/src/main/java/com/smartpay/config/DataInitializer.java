package com.smartpay.config;

import com.smartpay.bank.BankAccount;
import com.smartpay.bank.BankAccountRepository;
import com.smartpay.fraud.SuspiciousIdentifier;
import com.smartpay.fraud.SuspiciousIdentifierRepository;
import com.smartpay.khata.KhataGroup;
import com.smartpay.khata.KhataGroupRepository;
import com.smartpay.khata.KhataMember;
import com.smartpay.khata.KhataMemberRepository;
import com.smartpay.merchant.Merchant;
import com.smartpay.merchant.MerchantDue;
import com.smartpay.merchant.MerchantDueRepository;
import com.smartpay.merchant.MerchantRepository;
import com.smartpay.notification.Notification;
import com.smartpay.notification.NotificationRepository;
import com.smartpay.rewards.Coupon;
import com.smartpay.rewards.CouponRepository;
import com.smartpay.transaction.Transaction;
import com.smartpay.transaction.TransactionRepository;
import com.smartpay.user.Role;
import com.smartpay.user.RoleRepository;
import com.smartpay.user.User;
import com.smartpay.user.UserRepository;
import com.smartpay.wallet.Wallet;
import com.smartpay.wallet.WalletLedger;
import com.smartpay.wallet.WalletLedgerRepository;
import com.smartpay.wallet.WalletRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Component
public class DataInitializer implements CommandLineRunner {

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final WalletRepository walletRepository;
    private final WalletLedgerRepository ledgerRepository;
    private final BankAccountRepository bankRepository;
    private final TransactionRepository transactionRepository;
    private final MerchantRepository merchantRepository;
    private final MerchantDueRepository dueRepository;
    private final SuspiciousIdentifierRepository suspiciousRepository;
    private final CouponRepository couponRepository;
    private final KhataGroupRepository khataGroupRepository;
    private final KhataMemberRepository khataMemberRepository;
    private final NotificationRepository notificationRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(RoleRepository roleRepository,
                           UserRepository userRepository,
                           WalletRepository walletRepository,
                           WalletLedgerRepository ledgerRepository,
                           BankAccountRepository bankRepository,
                           TransactionRepository transactionRepository,
                           MerchantRepository merchantRepository,
                           MerchantDueRepository dueRepository,
                           SuspiciousIdentifierRepository suspiciousRepository,
                           CouponRepository couponRepository,
                           KhataGroupRepository khataGroupRepository,
                           KhataMemberRepository khataMemberRepository,
                           NotificationRepository notificationRepository,
                           PasswordEncoder passwordEncoder) {
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.walletRepository = walletRepository;
        this.ledgerRepository = ledgerRepository;
        this.bankRepository = bankRepository;
        this.transactionRepository = transactionRepository;
        this.merchantRepository = merchantRepository;
        this.dueRepository = dueRepository;
        this.suspiciousRepository = suspiciousRepository;
        this.couponRepository = couponRepository;
        this.khataGroupRepository = khataGroupRepository;
        this.khataMemberRepository = khataMemberRepository;
        this.notificationRepository = notificationRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        if (roleRepository.count() > 0 && userRepository.count() > 0) {
            return; // Already initialized
        }

        // 1. Roles
        Role userRole = roleRepository.save(new Role("ROLE_USER"));
        Role merchantRole = roleRepository.save(new Role("ROLE_MERCHANT"));
        Role adminRole = roleRepository.save(new Role("ROLE_ADMIN"));

        // 2. Default User: Avijit Roy
        User avijit = new User();
        avijit.setFullName("Avijit Roy");
        avijit.setUsername("avijit");
        avijit.setPhone("9876543210");
        avijit.setEmail("avijit@smartpay.io");
        avijit.setPasswordHash(passwordEncoder.encode("1234")); // Default 4-digit PIN
        avijit.setUpiId("9876543210@smartpay");
        avijit.setEnabled(true);
        avijit.setKycVerified(true);
        avijit.setAvatarUrl("https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80");
        avijit.setRoles(Set.of(userRole));
        avijit = userRepository.save(avijit);

        // Avijit's Wallet: ₹1,450.00
        Wallet wallet = new Wallet();
        wallet.setUserId(avijit.getId());
        wallet.setBalance(new BigDecimal("1450.00"));
        wallet.setUpiLiteXBalance(new BigDecimal("200.00"));
        wallet.setUpiLiteXEnabled(true);
        wallet.setStatus("ACTIVE");
        wallet.setCurrency("INR");
        wallet = walletRepository.save(wallet);

        WalletLedger ledger = new WalletLedger();
        ledger.setWalletId(wallet.getId());
        ledger.setEntryType("CREDIT");
        ledger.setAmount(new BigDecimal("1450.00"));
        ledger.setOpeningBalance(BigDecimal.ZERO);
        ledger.setClosingBalance(new BigDecimal("1450.00"));
        ledger.setTransactionType("INITIAL_LOAD");
        ledger.setReferenceNumber("WELCOME-BONUS-01");
        ledger.setDescription("Welcome Credit & Initial Deposit");
        ledgerRepository.save(ledger);

        // 3. Bank Accounts
        BankAccount hdfc = new BankAccount();
        hdfc.setUserId(avijit.getId());
        hdfc.setBankName("HDFC Bank");
        hdfc.setAccountNumberMasked("**** 5543");
        hdfc.setAccountType("SAVINGS");
        hdfc.setIfscCode("HDFC0001024");
        hdfc.setPrimary(true);
        hdfc.setSimulatedBalance(new BigDecimal("45200.50"));
        bankRepository.save(hdfc);

        BankAccount sbi = new BankAccount();
        sbi.setUserId(avijit.getId());
        sbi.setBankName("State Bank of India");
        sbi.setAccountNumberMasked("**** 2512");
        sbi.setAccountType("SAVINGS");
        sbi.setIfscCode("SBIN0004510");
        sbi.setPrimary(false);
        sbi.setSimulatedBalance(new BigDecimal("12850.00"));
        bankRepository.save(sbi);

        // 4. Default Transactions (matching design screenshot)
        createTxn(avijit.getId(), "Zomato", "zomato@upi", new BigDecimal("250.00"), "PAYMENT", "FOOD", "Dinner order", "TXN2026103001");
        createTxn(avijit.getId(), "Anil Kumar", "9822334455@smartpay", new BigDecimal("500.00"), "RECEIVE", "GENERAL", "Lunch share received", "TXN2026103002");
        createTxn(avijit.getId(), "Dmart", "dmart@retail", new BigDecimal("1200.00"), "PAYMENT", "SHOPPING", "Weekly groceries", "TXN2026102901");
        createTxn(avijit.getId(), "Amazon India", "amazon@upi", new BigDecimal("950.00"), "PAYMENT", "SHOPPING", "Wireless mouse", "TXN2026102801");
        createTxn(avijit.getId(), "Swiggy", "swiggy@upi", new BigDecimal("750.00"), "PAYMENT", "FOOD", "Gourmet meal", "TXN2026102701");

        // 5. Merchant User: ACME Store
        User merchantUser = new User();
        merchantUser.setFullName("ACME Store");
        merchantUser.setUsername("acmestore");
        merchantUser.setPhone("9800012345");
        merchantUser.setEmail("contact@acmestore.com");
        merchantUser.setPasswordHash(passwordEncoder.encode("password123"));
        merchantUser.setUpiId("acmestore@smartpay");
        merchantUser.setEnabled(true);
        merchantUser.setRoles(Set.of(merchantRole));
        merchantUser = userRepository.save(merchantUser);

        Merchant merchant = new Merchant();
        merchant.setUserId(merchantUser.getId());
        merchant.setBusinessName("ACME Store");
        merchant.setCategory("SUPERMARKET");
        merchant.setGstNumber("27AAACA1234A1Z5");
        merchant.setTotalCollected(new BigDecimal("48250.00"));
        merchant.setPendingDuesTotal(new BigDecimal("3450.00"));
        merchant.setSoundboxEnabled(true);
        merchant = merchantRepository.save(merchant);

        // Seed Merchant Dues (from Business Dashboard)
        createDue(merchant.getId(), "Rohit Verma", "9811223344", new BigDecimal("450.00"), LocalDate.now().plusDays(2));
        createDue(merchant.getId(), "Anil Kumar", "9822334455", new BigDecimal("1200.00"), LocalDate.now().plusDays(5));
        createDue(merchant.getId(), "Priya Sharma", "9833445566", new BigDecimal("350.00"), LocalDate.now().plusDays(7));
        createDue(merchant.getId(), "Vikram Patel", "9844556677", new BigDecimal("780.00"), LocalDate.now().plusDays(3));

        // 6. Suspicious Identifiers for AI Scam Shield
        suspiciousRepository.save(new SuspiciousIdentifier("lotteryprize@upi", "LOTTERY_SCAM", 48));
        suspiciousRepository.save(new SuspiciousIdentifier("electricity.bill.pay@paytm", "PHISHING", 120));
        suspiciousRepository.save(new SuspiciousIdentifier("9899001122", "IMPERSONATION", 35));
        suspiciousRepository.save(new SuspiciousIdentifier("crypto.double@axis", "INVESTMENT_FRAUD", 62));

        // 7. Coupons
        Coupon c1 = new Coupon();
        c1.setMerchantName("Zomato");
        c1.setOfferText("Flat 50% OFF up to ₹120 on delicious dining");
        c1.setCode("SMARTZOMATO");
        c1.setCategory("FOOD");
        c1.setMinOrder(new BigDecimal("199.00"));
        c1.setValidTill(LocalDate.now().plusMonths(1));
        couponRepository.save(c1);

        Coupon c2 = new Coupon();
        c2.setMerchantName("Swiggy");
        c2.setOfferText("₹100 Cashback on Gourmet order");
        c2.setCode("SMARTSWIG");
        c2.setCategory("FOOD");
        c2.setMinOrder(new BigDecimal("299.00"));
        c2.setValidTill(LocalDate.now().plusMonths(1));
        couponRepository.save(c2);

        Coupon c3 = new Coupon();
        c3.setMerchantName("Amazon");
        c3.setOfferText("10% Instant Discount on Gadgets");
        c3.setCode("SMARTAMZ");
        c3.setCategory("SHOPPING");
        c3.setMinOrder(new BigDecimal("1000.00"));
        c3.setValidTill(LocalDate.now().plusMonths(2));
        couponRepository.save(c3);

        // 8. Khata Group
        KhataGroup group = new KhataGroup();
        group.setName("Flatmates (Apartment 4B)");
        group.setDescription("Shared rent, electricity, and groceries");
        group.setCreatorId(avijit.getId());
        group.setTotalExpense(new BigDecimal("3600.00"));
        group = khataGroupRepository.save(group);

        KhataMember m1 = new KhataMember();
        m1.setGroupId(group.getId());
        m1.setUserId(avijit.getId());
        m1.setName("Avijit Roy");
        m1.setBalance(new BigDecimal("600.00")); // gets back 600
        khataMemberRepository.save(m1);

        KhataMember m2 = new KhataMember();
        m2.setGroupId(group.getId());
        m2.setName("Rahul Sharma");
        m2.setBalance(new BigDecimal("-300.00")); // owes 300
        khataMemberRepository.save(m2);

        KhataMember m3 = new KhataMember();
        m3.setGroupId(group.getId());
        m3.setName("Sneha Patel");
        m3.setBalance(new BigDecimal("-300.00")); // owes 300
        khataMemberRepository.save(m3);

        // 9. Notifications
        notificationRepository.save(new Notification(
                avijit.getId(),
                "Payment Received: ₹500.00",
                "Anil Kumar sent you ₹500.00 via SmartPay. Credited to your wallet.",
                "PAYMENT"
        ));
        notificationRepository.save(new Notification(
                avijit.getId(),
                "AI Scam Shield Protection",
                "All transaction security checks active. Threat database updated with 0 alerts detected today.",
                "SECURITY"
        ));
        notificationRepository.save(new Notification(
                avijit.getId(),
                "UPI Lite X Offline Mode",
                "Your wallet is configured for offline tap payments up to ₹500 without internet connection.",
                "SYSTEM"
        ));
    }

    private void createTxn(Long userId, String partyName, String upi, BigDecimal amount, String type, String cat, String note, String ref) {
        Transaction txn = new Transaction();
        txn.setTransactionReference(ref);
        txn.setUtrNumber("430198" + (100000 + (int)(Math.random() * 900000)));
        txn.setSenderId("PAYMENT".equals(type) ? userId : 999L);
        txn.setSenderName("PAYMENT".equals(type) ? "Avijit Roy" : partyName);
        txn.setSenderUpiId("PAYMENT".equals(type) ? "9876543210@smartpay" : upi);
        txn.setRecipientId("PAYMENT".equals(type) ? 999L : userId);
        txn.setRecipientName(partyName);
        txn.setRecipientUpiId(upi);
        txn.setAmount(amount);
        txn.setPaymentMode("WALLET");
        txn.setStatus("SUCCESS");
        txn.setType(type);
        txn.setCategory(cat);
        txn.setNote(note);
        txn.setIdempotencyKey("IDEM-" + ref);
        txn.setRiskScore(0);
        transactionRepository.save(txn);
    }

    private void createDue(Long merchantId, String name, String phone, BigDecimal amount, LocalDate dueDate) {
        MerchantDue due = new MerchantDue();
        due.setMerchantId(merchantId);
        due.setCustomerName(name);
        due.setCustomerPhone(phone);
        due.setAmount(amount);
        due.setDueDate(dueDate);
        due.setStatus("PENDING");
        dueRepository.save(due);
    }
}
