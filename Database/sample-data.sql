-- SmartPay Fintech Platform Sample / Seed Data
-- Target: MySQL 8.0+ / MariaDB 10.4+
USE smartpay_db;

-- MariaDB dump 10.19  Distrib 10.4.32-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: smartpay_db
-- ------------------------------------------------------
-- Server version	10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping data for table `autopay_mandates`
--

LOCK TABLES `autopay_mandates` WRITE;
/*!40000 ALTER TABLE `autopay_mandates` DISABLE KEYS */;
INSERT INTO `autopay_mandates` (`id`, `user_id`, `merchant_name`, `category`, `amount`, `max_amount`, `frequency`, `bank_name`, `masked_account_number`, `umn`, `status`, `start_date`, `next_debit_date`, `end_date`, `last_debit_at`, `created_at`, `updated_at`) VALUES (1,1,'Netflix Premium','Entertainment',649.00,1000.00,'MONTHLY','HDFC Bank','├▓├▓├▓├▓ 5543','NETFLIX@HDFC0099881','ACTIVE','2026-01-15','2026-11-15',NULL,NULL,'2026-10-31 12:43:30','2026-10-31 07:19:35'),(2,1,'Spotify Duo','Music',149.00,500.00,'MONTHLY','HDFC Bank','├▓├▓├▓├▓ 5543','SPOTIFY@HDFC0099882','ACTIVE','2026-02-20','2026-11-20',NULL,NULL,'2026-10-31 12:43:30','2026-10-31 12:43:30'),(3,1,'BESCOM Electricity Bill','Utilities',1250.00,2500.00,'MONTHLY','HDFC Bank','├▓├▓├▓├▓ 5543','BESCOM@HDFC0099883','ACTIVE','2026-03-05','2026-11-05',NULL,NULL,'2026-10-31 12:43:30','2026-10-31 12:43:30'),(4,1,'Zerodha Coin SIP','Investments',5000.00,10000.00,'MONTHLY','State Bank of India','├▓├▓├▓├▓ 2512','ZERODHA@SBI0011223','ACTIVE','2026-01-01','2026-11-01',NULL,NULL,'2026-10-31 12:43:30','2026-10-31 12:43:30');
/*!40000 ALTER TABLE `autopay_mandates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `bank_accounts`
--

LOCK TABLES `bank_accounts` WRITE;
/*!40000 ALTER TABLE `bank_accounts` DISABLE KEYS */;
INSERT INTO `bank_accounts` (`id`, `account_number_masked`, `account_type`, `bank_name`, `created_at`, `ifsc_code`, `is_primary`, `logo_url`, `simulated_balance`, `upi_linked`, `user_id`, `account_holder_name`, `bank_code`, `last_checked_at`, `provider_reference`, `verification_status`, `verified_at`) VALUES (1,'**** 5543','SAVINGS','HDFC Bank','2026-10-30 16:33:16.000000','HDFC0001024','\0',NULL,45200.50,'',1,NULL,NULL,NULL,NULL,NULL,NULL),(2,'**** 2512','SAVINGS','State Bank of India','2026-10-30 16:33:16.000000','SBIN0004510','\0',NULL,12551.00,'',1,NULL,NULL,'2026-10-31 07:26:12.000000',NULL,NULL,NULL),(3,'.... 5432','SAVINGS','HDFC Bank','2026-10-30 17:35:08.000000','HDFC0001048','',NULL,34253.00,'',1,'Avijit Roy','HDFC','2026-10-31 12:53:22.000000','NPCI-PSP-SETU-147B6403EE374254','VERIFIED','2026-10-30 17:35:08.000000'),(4,'???????????? 4456','SAVINGS','State Bank of India','2026-10-30 17:40:18.000000','SBIN0001048','',NULL,45211.00,'',4,'Rohit Verma','SBI','2026-10-30 17:40:18.000000','NPCI-PSP-SETU-2E88CC7F50ED47C1','VERIFIED','2026-10-30 17:40:18.000000'),(5,'ΓÇóΓÇóΓÇóΓÇó 9543','SAVINGS','State Bank of India','2026-10-31 06:40:47.000000','SBIN0001048','',NULL,51385.00,'',3,'AVIJIT ROY','SBI','2026-10-31 06:40:47.000000','NPCI-PSP-SETU-E9EE6C3CBFE544F3','VERIFIED','2026-10-31 06:40:47.000000');
/*!40000 ALTER TABLE `bank_accounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `bank_verification_logs`
--

LOCK TABLES `bank_verification_logs` WRITE;
/*!40000 ALTER TABLE `bank_verification_logs` DISABLE KEYS */;
INSERT INTO `bank_verification_logs` (`id`, `bank_account_id`, `created_at`, `failure_reason`, `provider_reference`, `user_id`, `verification_status`) VALUES (1,3,'2026-10-30 17:35:08.000000',NULL,'NPCI-PSP-SETU-147B6403EE374254',1,'SUCCESS'),(2,4,'2026-10-30 17:40:18.000000',NULL,'NPCI-PSP-SETU-2E88CC7F50ED47C1',4,'SUCCESS'),(3,5,'2026-10-31 06:40:48.000000',NULL,'NPCI-PSP-SETU-E9EE6C3CBFE544F3',3,'SUCCESS');
/*!40000 ALTER TABLE `bank_verification_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `coupons`
--

LOCK TABLES `coupons` WRITE;
/*!40000 ALTER TABLE `coupons` DISABLE KEYS */;
INSERT INTO `coupons` (`id`, `category`, `claimed`, `code`, `logo_url`, `merchant_name`, `min_order`, `offer_text`, `valid_till`) VALUES (1,'FOOD','\0','SMARTZOMATO',NULL,'Zomato',199.00,'Flat 50% OFF up to Γé╣120 on delicious dining','2026-11-30'),(2,'FOOD','\0','SMARTSWIG',NULL,'Swiggy',299.00,'Γé╣100 Cashback on Gourmet order','2026-11-30'),(3,'SHOPPING','\0','SMARTAMZ',NULL,'Amazon',1000.00,'10% Instant Discount on Gadgets','2026-12-30');
/*!40000 ALTER TABLE `coupons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `device_sessions`
--

LOCK TABLES `device_sessions` WRITE;
/*!40000 ALTER TABLE `device_sessions` DISABLE KEYS */;
INSERT INTO `device_sessions` (`id`, `created_at`, `device_identifier_hash`, `device_name`, `last_login_at`, `trust_status`, `user_id`) VALUES (1,'2026-10-30 17:35:14.000000','5c1e3278bfff3417d74773f05986bfd62ef661533383a37ccba6ac12e22afb4d','Chrome Windows 11','2026-10-30 17:35:19.000000','TRUSTED',3),(2,'2026-10-30 17:40:17.000000','704e0b37186a2def7f5aa0cb2ad3f9af45def1a0601265675d29bbf942b5a929','Chrome Windows','2026-10-30 17:40:18.000000','TRUSTED',4),(3,'2026-10-31 06:40:31.000000','2432070866e61f47d316956d34901f135d2e05e39bd166df1f6c50ccdf46fcd6','Chrome on Windows 11','2026-10-31 06:40:31.000000','PENDING_OTP',3);
/*!40000 ALTER TABLE `device_sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `fraud_alerts`
--

LOCK TABLES `fraud_alerts` WRITE;
/*!40000 ALTER TABLE `fraud_alerts` DISABLE KEYS */;
INSERT INTO `fraud_alerts` (`id`, `action_taken`, `created_at`, `detected_reason`, `risk_level`, `risk_score`, `target_identifier`, `transaction_reference`, `user_id`) VALUES (1,'BLOCKED','2026-10-30 16:34:07.000000','[Reported fraudulent identifier in National Threat Database (LOTTERY_SCAM), High-risk phishing keyword detected: \'lottery\', High-risk phishing keyword detected: \'prize\', High-risk phishing keyword detected: \'winner\']','CRITICAL',100,'lotteryprize@upi',NULL,1),(2,'BLOCKED','2026-10-30 17:04:10.000000','[Reported fraudulent identifier in National Threat Database (LOTTERY_SCAM), High-risk phishing keyword detected: \'lottery\', High-risk phishing keyword detected: \'winner\']','CRITICAL',100,'lotteryprize@upi',NULL,1),(3,'BLOCKED','2026-10-30 17:05:50.000000','[Reported fraudulent identifier in National Threat Database (LOTTERY_SCAM), High-risk phishing keyword detected: \'lottery\', High-risk phishing keyword detected: \'winner\']','CRITICAL',100,'lotteryprize@upi',NULL,1),(4,'WARNING_DISPLAYED','2026-11-05 14:18:03.000000','[High-risk phishing keyword detected: \'lottery\', High-risk phishing keyword detected: \'winner\']','MEDIUM',65,'phishing_apk_scam@fake',NULL,1);
/*!40000 ALTER TABLE `fraud_alerts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `khata_expenses`
--

LOCK TABLES `khata_expenses` WRITE;
/*!40000 ALTER TABLE `khata_expenses` DISABLE KEYS */;
/*!40000 ALTER TABLE `khata_expenses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `khata_groups`
--

LOCK TABLES `khata_groups` WRITE;
/*!40000 ALTER TABLE `khata_groups` DISABLE KEYS */;
INSERT INTO `khata_groups` (`id`, `created_at`, `creator_id`, `description`, `name`, `total_expense`) VALUES (1,'2026-10-30 16:33:16.000000',1,'Shared rent, electricity, and groceries','Flatmates (Apartment 4B)',3600.00);
/*!40000 ALTER TABLE `khata_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `khata_members`
--

LOCK TABLES `khata_members` WRITE;
/*!40000 ALTER TABLE `khata_members` DISABLE KEYS */;
INSERT INTO `khata_members` (`id`, `balance`, `group_id`, `name`, `phone`, `user_id`) VALUES (1,600.00,1,'Avijit Roy',NULL,1),(2,-300.00,1,'Rahul Sharma',NULL,NULL),(3,-300.00,1,'Sneha Patel',NULL,NULL);
/*!40000 ALTER TABLE `khata_members` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `khata_settlements`
--

LOCK TABLES `khata_settlements` WRITE;
/*!40000 ALTER TABLE `khata_settlements` DISABLE KEYS */;
/*!40000 ALTER TABLE `khata_settlements` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `merchant_customers`
--

LOCK TABLES `merchant_customers` WRITE;
/*!40000 ALTER TABLE `merchant_customers` DISABLE KEYS */;
/*!40000 ALTER TABLE `merchant_customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `merchant_dues`
--

LOCK TABLES `merchant_dues` WRITE;
/*!40000 ALTER TABLE `merchant_dues` DISABLE KEYS */;
INSERT INTO `merchant_dues` (`id`, `amount`, `created_at`, `customer_name`, `customer_phone`, `due_date`, `merchant_id`, `reminder_sent_at`, `status`) VALUES (1,450.00,'2026-10-30 16:33:16.000000','Rohit Verma','9811223344','2026-11-01',1,NULL,'PENDING'),(2,1200.00,'2026-10-30 16:33:16.000000','Anil Kumar','9822334455','2026-11-04',1,NULL,'PENDING'),(3,350.00,'2026-10-30 16:33:16.000000','Priya Sharma','9833445566','2026-11-06',1,NULL,'PENDING'),(4,780.00,'2026-10-30 16:33:16.000000','Vikram Patel','9844556677','2026-11-02',1,NULL,'PENDING');
/*!40000 ALTER TABLE `merchant_dues` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `merchants`
--

LOCK TABLES `merchants` WRITE;
/*!40000 ALTER TABLE `merchants` DISABLE KEYS */;
INSERT INTO `merchants` (`id`, `business_name`, `category`, `created_at`, `gst_number`, `pending_dues_total`, `soundbox_enabled`, `total_collected`, `user_id`) VALUES (1,'ACME Store','SUPERMARKET','2026-10-30 16:33:16.000000','27AAACA1234A1Z5',3450.00,'',48250.00,2),(2,'ACME Store','RETAIL','2026-10-30 17:05:50.000000',NULL,3450.00,'',48250.00,1);
/*!40000 ALTER TABLE `merchants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
INSERT INTO `notifications` (`id`, `created_at`, `message`, `is_read`, `title`, `type`, `user_id`) VALUES (1,'2026-10-30 16:33:16.000000','Anil Kumar sent you Γé╣500.00 via SmartPay. Credited to your wallet.','\0','Payment Received: Γé╣500.00','PAYMENT',1),(2,'2026-10-30 16:33:16.000000','All transaction security checks active. Threat database updated with 0 alerts detected today.','\0','AI Scam Shield Protection','SECURITY',1),(3,'2026-10-30 16:33:16.000000','Your wallet is configured for offline tap payments up to Γé╣500 without internet connection.','\0','UPI Lite X Offline Mode','SYSTEM',1);
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `oauth_accounts`
--

LOCK TABLES `oauth_accounts` WRITE;
/*!40000 ALTER TABLE `oauth_accounts` DISABLE KEYS */;
INSERT INTO `oauth_accounts` (`id`, `created_at`, `provider`, `provider_email`, `provider_subject_id`, `user_id`) VALUES (1,'2026-10-30 17:35:14.000000','GOOGLE','avijit.roy@gmail.com','1092830192830192',3),(2,'2026-10-30 17:40:17.000000','GOOGLE','rohit.verma@gmail.com','google_user_991823',4),(3,'2026-10-31 06:40:31.000000','GOOGLE','avijit.roy@gmail.com','google_oauth_sub_1092830192',3);
/*!40000 ALTER TABLE `oauth_accounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `offline_transactions`
--

LOCK TABLES `offline_transactions` WRITE;
/*!40000 ALTER TABLE `offline_transactions` DISABLE KEYS */;
/*!40000 ALTER TABLE `offline_transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `onboarding_sessions`
--

LOCK TABLES `onboarding_sessions` WRITE;
/*!40000 ALTER TABLE `onboarding_sessions` DISABLE KEYS */;
INSERT INTO `onboarding_sessions` (`id`, `created_at`, `current_step`, `onboarding_status`, `updated_at`, `user_id`) VALUES (1,'2026-10-30 17:35:14.000000','COMPLETED','COMPLETED','2026-10-31 06:40:50.000000',3),(2,'2026-10-30 17:40:17.000000','COMPLETED','COMPLETED','2026-10-30 17:40:18.000000',4);
/*!40000 ALTER TABLE `onboarding_sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `otp_verifications`
--

LOCK TABLES `otp_verifications` WRITE;
/*!40000 ALTER TABLE `otp_verifications` DISABLE KEYS */;
INSERT INTO `otp_verifications` (`id`, `attempt_count`, `created_at`, `destination_hash`, `expires_at`, `otp_hash`, `purpose`, `status`, `user_id`, `verified_at`) VALUES (1,0,'2026-10-30 17:34:52.000000','7619ee8cea49187f309616e30ecf54be072259b43760f1f550a644945d5572f2','2026-10-30 17:39:52.000000','7301814ed08deda26cf0fe23f4502afd6b8cb2d7d4b08228ea459c897e17bef4','ONBOARDING_MOBILE','VERIFIED',NULL,'2026-10-30 17:34:56.000000'),(2,0,'2026-10-30 17:40:18.000000','5b3cf37ac4181ab67b31b2b39258962d159f9b4f5954e976312e575631a56f49','2026-10-30 17:45:18.000000','7301814ed08deda26cf0fe23f4502afd6b8cb2d7d4b08228ea459c897e17bef4','ONBOARDING_MOBILE','VERIFIED',4,'2026-10-30 17:40:18.000000'),(3,0,'2026-10-31 06:40:31.000000','a31fef82d950af867a4577c99ddbf1cd1d1dac3346b71a1e49fe4ad0d3a1d413','2026-10-31 06:45:31.000000','7301814ed08deda26cf0fe23f4502afd6b8cb2d7d4b08228ea459c897e17bef4','ONBOARDING_MOBILE','VERIFIED',NULL,'2026-10-31 06:40:38.000000');
/*!40000 ALTER TABLE `otp_verifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `qr_codes`
--

LOCK TABLES `qr_codes` WRITE;
/*!40000 ALTER TABLE `qr_codes` DISABLE KEYS */;
/*!40000 ALTER TABLE `qr_codes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `refresh_tokens`
--

LOCK TABLES `refresh_tokens` WRITE;
/*!40000 ALTER TABLE `refresh_tokens` DISABLE KEYS */;
INSERT INTO `refresh_tokens` (`id`, `expiry_date`, `token`, `user_id`) VALUES (1,'2026-11-12 14:20:18.000000','6f1f0351-7f95-43e4-be3a-b6cbdc5dbdd0',1),(15,'2026-11-07 06:40:31.000000','99b72068-f063-483c-9b0d-b978392df247',3),(16,'2026-11-06 17:40:18.000000','6fe3b946-03d5-46be-b696-c2a0a96af934',4);
/*!40000 ALTER TABLE `refresh_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` (`id`, `name`) VALUES (3,'ROLE_ADMIN'),(2,'ROLE_MERCHANT'),(1,'ROLE_USER');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `suspicious_identifiers`
--

LOCK TABLES `suspicious_identifiers` WRITE;
/*!40000 ALTER TABLE `suspicious_identifiers` DISABLE KEYS */;
INSERT INTO `suspicious_identifiers` (`id`, `active`, `created_at`, `identifier`, `report_count`, `risk_category`) VALUES (1,'','2026-10-30 16:33:16.000000','lotteryprize@upi',48,'LOTTERY_SCAM'),(2,'','2026-10-30 16:33:16.000000','electricity.bill.pay@paytm',120,'PHISHING'),(3,'','2026-10-30 16:33:16.000000','9899001122',35,'IMPERSONATION'),(4,'','2026-10-30 16:33:16.000000','crypto.double@axis',62,'INVESTMENT_FRAUD');
/*!40000 ALTER TABLE `suspicious_identifiers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `transactions`
--

LOCK TABLES `transactions` WRITE;
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
INSERT INTO `transactions` (`id`, `amount`, `category`, `created_at`, `failure_reason`, `idempotency_key`, `note`, `payment_mode`, `recipient_id`, `recipient_name`, `recipient_upi_id`, `risk_score`, `sender_id`, `sender_name`, `sender_upi_id`, `status`, `transaction_reference`, `type`, `updated_at`, `utr_number`, `bank_name`, `auth_method`) VALUES (1,250.00,'FOOD','2026-10-30 16:33:16.000000',NULL,'IDEM-TXN2026103001','Dinner order','WALLET',999,'Zomato','zomato@upi',0,1,'Avijit Roy','9876543210@smartpay','SUCCESS','TXN2026103001','PAYMENT','2026-10-30 16:33:16.000000','430198563762','SmartPay Core Wallet','PIN'),(2,500.00,'GENERAL','2026-10-30 16:33:16.000000',NULL,'IDEM-TXN2026103002','Lunch share received','WALLET',1,'Anil Kumar','9822334455@smartpay',0,999,'Anil Kumar','9822334455@smartpay','SUCCESS','TXN2026103002','RECEIVE','2026-10-30 16:33:16.000000','430198583267','SmartPay Core Wallet','PIN'),(3,1200.00,'SHOPPING','2026-10-30 16:33:16.000000',NULL,'IDEM-TXN2026102901','Weekly groceries','WALLET',999,'Dmart','dmart@retail',0,1,'Avijit Roy','9876543210@smartpay','SUCCESS','TXN2026102901','PAYMENT','2026-10-30 16:33:16.000000','430198771675','SmartPay Core Wallet','PIN'),(4,950.00,'SHOPPING','2026-10-30 16:33:16.000000',NULL,'IDEM-TXN2026102801','Wireless mouse','WALLET',999,'Amazon India','amazon@upi',0,1,'Avijit Roy','9876543210@smartpay','SUCCESS','TXN2026102801','PAYMENT','2026-10-30 16:33:16.000000','430198362895','SmartPay Core Wallet','PIN'),(5,750.00,'FOOD','2026-10-30 16:33:16.000000',NULL,'IDEM-TXN2026102701','Gourmet meal','WALLET',999,'Swiggy','swiggy@upi',0,1,'Avijit Roy','9876543210@smartpay','SUCCESS','TXN2026102701','PAYMENT','2026-10-30 16:33:16.000000','430198211106','SmartPay Core Wallet','PIN'),(6,50.00,'FOOD','2026-10-30 16:34:19.000000',NULL,'TEST-IDEM-001','Burger order','WALLET',NULL,'Swiggy Delivery','swiggy@upi',5,1,'Avijit Roy','9876543210@smartpay','SUCCESS','TXN20261030525452','PAYMENT','2026-10-30 16:34:19.000000','431030795757','SmartPay Core Wallet','PIN'),(7,120.00,'SHOPPING','2026-10-30 17:06:06.000000',NULL,'TEST-IDEM-002','Snacks & Drinks','WALLET',NULL,'Dmart Supermarket','dmart@retail',5,1,'Avijit Roy','9876543210@smartpay','SUCCESS','TXN20261030847326','PAYMENT','2026-10-30 17:06:06.000000','431030991313','SmartPay Core Wallet','PIN'),(8,500.00,'Food','2026-10-30 17:08:20.000000',NULL,'add1234f-dc08-4c4c-9644-1a580861671c','Retried via SmartPay Fallback Rail','WALLET',NULL,'sneha.patel','sneha.patel@icici',5,1,'Avijit Roy','9876543210@smartpay','SUCCESS','TXN20261030260880','PAYMENT','2026-10-30 17:08:20.000000','431030469262','SmartPay Core Wallet','PIN'),(9,250.00,'Food','2026-10-31 06:44:49.000000',NULL,'8e11fc38-5ae4-4e5c-8819-6c9efada1d6b','Payment via QR Code','WALLET',NULL,'Zomato','zomato@upi',5,1,'Avijit Roy','9876543210@smartpay','SUCCESS','TXN20261031124739','PAYMENT','2026-10-31 06:44:49.000000','431031547460','SmartPay Core Wallet','PIN'),(10,299.00,'Food','2026-10-31 07:01:46.000000',NULL,'9b9570b2-3793-4b7a-8d89-9362bb195ede','Recharge for +91 9876543210 (28 Days)','WALLET',NULL,'Jio Prepaid Recharge','jiorecharge@smartpay',5,1,'Avijit Roy','9876543210@smartpay','SUCCESS','TXN20261031629083','PAYMENT','2026-10-31 07:01:46.000000','431031700274','SmartPay Core Wallet','PIN'),(11,600.00,'Transfer','2026-10-31 07:19:43.000000',NULL,'8735ac44-1049-44de-9048-408435879723','Testing Bank Account Debit','BANK_ACCOUNT',NULL,'Alexandria','alexandria@smartpay',5,1,'Avijit Roy','9876543210@smartpay','SUCCESS','TXN20261031576468','PAYMENT','2026-10-31 07:19:43.000000','431031552398','HDFC Bank .... 5432','BIOMETRIC'),(12,299.00,'Transfer','2026-10-31 07:26:12.000000',NULL,'9aa7dd40-4146-46f9-be78-bf33ef182661','Recharge for +91 9876543210 (28 Days)','BANK_ACCOUNT',NULL,'Jio Prepaid Recharge','jiorecharge@smartpay',5,1,'Avijit Roy','9876543210@smartpay','SUCCESS','TXN20261031544954','PAYMENT','2026-10-31 07:26:12.000000','431031508306','State Bank of India **** 2512','BIOMETRIC'),(13,500.00,'Transfer','2026-10-31 12:51:51.000000',NULL,'29afd805-8808-42f9-b1ab-4a4409ca20f7','Payment to Robin Jessy via QR','BANK_ACCOUNT',NULL,'Robin Jessy','paytmqr1wdw1qsy4q@paytm',5,1,'Avijit Roy','9876543210@smartpay','SUCCESS','TXN20261031828175','PAYMENT','2026-10-31 12:51:51.000000','431031678362','HDFC Bank .... 5432','BIOMETRIC'),(14,1200.00,'Transfer','2026-10-31 12:52:49.000000',NULL,'ccec8a6c-7f24-4de0-b284-0a4fe5bf80f2','Money Transfer via SmartPay','BANK_ACCOUNT',NULL,'Fany','fany@smartpay',5,1,'Avijit Roy','9876543210@smartpay','SUCCESS','TXN20261031603508','PAYMENT','2026-10-31 12:52:49.000000','431031416816','HDFC Bank .... 5432','PIN'),(15,500.00,'Transfer','2026-10-31 12:53:22.000000',NULL,'cef016a4-1121-43f0-bb06-c99dff9cd7e6','Payment to Robin Jessy via QR','BANK_ACCOUNT',NULL,'Robin Jessy','paytmqr1wdw1qsy4q@paytm',5,1,'Avijit Roy','9876543210@smartpay','SUCCESS','TXN20261031842916','PAYMENT','2026-10-31 12:53:22.000000','431031256901','HDFC Bank .... 5432','BIOMETRIC'),(16,15.00,'GENERAL','2026-11-05 14:18:03.000000',NULL,'idem-1793888282979','Audit Test Transfer','WALLET',NULL,'Robin','robin@smartpay',5,1,'Avijit Roy','9876543210@smartpay','SUCCESS','TXN20261105625075','PAYMENT','2026-11-05 14:18:03.000000','431105924009','SmartPay Core Wallet','PIN'),(17,5000.00,'GENERAL','2026-11-05 14:18:03.000000',NULL,'58aed19e-acb2-49f7-b465-4bd0598abf30','gift lottery claim apk download','WALLET',NULL,'Lottery Winner APK download','phishing_apk_scam@fake',65,1,'Avijit Roy','9876543210@smartpay','SUCCESS','TXN20261105365859','PAYMENT','2026-11-05 14:18:03.000000','431105625267','SmartPay Core Wallet','PIN');
/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `user_roles`
--

LOCK TABLES `user_roles` WRITE;
/*!40000 ALTER TABLE `user_roles` DISABLE KEYS */;
INSERT INTO `user_roles` (`user_id`, `role_id`) VALUES (1,1),(1,2),(1,3),(2,2),(3,1),(4,1);
/*!40000 ALTER TABLE `user_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `avatar_url`, `created_at`, `email`, `enabled`, `full_name`, `kyc_verified`, `password_hash`, `phone`, `updated_at`, `upi_id`, `username`, `account_status`, `onboarding_completed`, `biometric_enabled`, `quick_pay_limit`) VALUES (1,'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80','2026-10-30 16:33:16.000000','avijit@smartpay.io','','Avijit Roy','','$2a$10$RcrgjTXpk/DUVb5Ac.nUVOQAh1UwI7UGu/WfLhI8vD6ikHBKhRsdq','9876543210','2026-10-31 07:27:15.000000','9876543210@smartpay','avijit','','\0','',5000.00),(2,NULL,'2026-10-30 16:33:16.000000','contact@acmestore.com','','ACME Store','\0','$2a$10$/6C/4h6/xpPjFEOY9Tgb9eZ7ZbNGqnUEPQmWNNQv4ouzqAAau11ZS','9800012345','2026-10-30 16:33:16.000000','acmestore@smartpay','acmestore','','\0','',5000.00),(3,'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150','2026-10-30 17:35:14.000000','avijit.roy@gmail.com','','Avijit Roy','\0','$2a$10$D75K3kHozdy5A8Uq60XwkO2ArnlAzMimIZBXcM2i.QIpQdXFV97nm','+91 9898357271','2026-10-31 06:40:50.000000',NULL,'avijitroy','ACTIVE','','',5000.00),(4,'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150','2026-10-30 17:40:17.000000','rohit.verma@gmail.com','','Rohit Verma','\0','$2a$10$2oyA9uMjn5dVtPb0rONUxOqQdI2kPKsBIa6RW5bROEYNy8H3YpOj6','+91 9823412345','2026-10-30 17:40:18.000000','9823412345@smartpay','rohitverma','ACTIVE','','',5000.00);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `verified_mobile_numbers`
--

LOCK TABLES `verified_mobile_numbers` WRITE;
/*!40000 ALTER TABLE `verified_mobile_numbers` DISABLE KEYS */;
INSERT INTO `verified_mobile_numbers` (`id`, `mobile_number`, `user_id`, `verification_status`, `verified_at`) VALUES (1,'9876543210',NULL,'VERIFIED','2026-10-30 17:34:57.000000'),(2,'9823412345',4,'VERIFIED','2026-10-30 17:40:18.000000'),(3,'7501777432',NULL,'VERIFIED','2026-10-31 06:40:38.000000');
/*!40000 ALTER TABLE `verified_mobile_numbers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `wallet_ledger`
--

LOCK TABLES `wallet_ledger` WRITE;
/*!40000 ALTER TABLE `wallet_ledger` DISABLE KEYS */;
INSERT INTO `wallet_ledger` (`id`, `amount`, `closing_balance`, `created_at`, `description`, `entry_type`, `opening_balance`, `transaction_ref`, `transaction_type`, `wallet_id`) VALUES (1,1450.00,1450.00,'2026-10-30 16:33:16.000000','Welcome Credit & Initial Deposit','CREDIT',0.00,'WELCOME-BONUS-01','INITIAL_LOAD',1),(2,50.00,1400.00,'2026-10-30 16:34:19.000000','Transfer to Swiggy Delivery','DEBIT',1450.00,'TXN20261030525452','PAYMENT',1),(3,120.00,1280.00,'2026-10-30 17:06:06.000000','Transfer to Dmart Supermarket','DEBIT',1400.00,'TXN20261030847326','PAYMENT',1),(4,500.00,780.00,'2026-10-30 17:08:20.000000','Transfer to sneha.patel','DEBIT',1280.00,'TXN20261030260880','PAYMENT',1),(5,250.00,530.00,'2026-10-31 06:44:49.000000','Transfer to Zomato','DEBIT',780.00,'TXN20261031124739','PAYMENT',1),(6,299.00,231.00,'2026-10-31 07:01:46.000000','Transfer to Jio Prepaid Recharge','DEBIT',530.00,'TXN20261031629083','PAYMENT',1),(7,5000.00,5231.00,'2026-10-31 07:27:24.000000','Top-up via HDFC Bank **** 5543','CREDIT',231.00,'TOPUP-1793431644105','ADD_MONEY',1),(8,500.00,5731.00,'2026-10-31 12:52:32.000000','Top-up via HDFC Bank **** 5543','CREDIT',5231.00,'TOPUP-1793451151601','ADD_MONEY',1),(9,5000.00,10731.00,'2026-10-31 12:52:36.000000','Top-up via HDFC Bank **** 5543','CREDIT',5731.00,'TOPUP-1793451156108','ADD_MONEY',1),(10,15.00,10716.00,'2026-11-05 14:18:03.000000','Transfer to Robin','DEBIT',10731.00,'TXN20261105625075','PAYMENT',1),(11,5000.00,5716.00,'2026-11-05 14:18:03.000000','Transfer to Lottery Winner APK download','DEBIT',10716.00,'TXN20261105365859','PAYMENT',1),(15,100.00,100.00,'2026-11-05 14:24:46.000000','Concurrent test debit','DEBIT',200.00,'CONCUR-2','PAYMENT',5),(16,100.00,0.00,'2026-11-05 14:24:46.000000','Concurrent test debit','DEBIT',100.00,'CONCUR-4','PAYMENT',5),(20,100.00,100.00,'2026-11-05 14:27:32.000000','Concurrent test debit','DEBIT',200.00,'CONCUR-2','PAYMENT',5),(21,100.00,0.00,'2026-11-05 14:27:32.000000','Concurrent test debit','DEBIT',100.00,'CONCUR-3','PAYMENT',5);
/*!40000 ALTER TABLE `wallet_ledger` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `wallets`
--

LOCK TABLES `wallets` WRITE;
/*!40000 ALTER TABLE `wallets` DISABLE KEYS */;
INSERT INTO `wallets` (`id`, `balance`, `created_at`, `currency`, `status`, `updated_at`, `upi_litexbalance`, `upi_litexenabled`, `user_id`, `version`) VALUES (1,5716.00,'2026-10-30 16:33:16.000000','INR','ACTIVE','2026-11-05 14:18:03.000000',200.00,'',1,10),(2,1450.00,'2026-10-30 17:35:14.000000','INR','ACTIVE','2026-10-30 17:35:14.000000',500.00,'',3,0),(3,1450.00,'2026-10-30 17:40:17.000000','INR','ACTIVE','2026-10-30 17:40:17.000000',500.00,'',4,0),(5,0.00,'2026-11-05 14:24:46.000000','INR','ACTIVE','2026-11-05 14:27:32.000000',0.00,'\0',99999,6);
/*!40000 ALTER TABLE `wallets` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-11-05 20:00:37
