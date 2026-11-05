-- SmartPay Fintech Platform Database Schema
-- Target: MySQL 8.0+ / MariaDB 10.4+
CREATE DATABASE IF NOT EXISTS smartpay_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
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
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `autopay_mandates`
--

DROP TABLE IF EXISTS `autopay_mandates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `autopay_mandates` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NOT NULL,
  `merchant_name` varchar(150) NOT NULL,
  `category` varchar(50) DEFAULT 'Subscription',
  `amount` decimal(12,2) NOT NULL,
  `max_amount` decimal(12,2) DEFAULT NULL,
  `frequency` varchar(50) NOT NULL DEFAULT 'MONTHLY',
  `bank_name` varchar(100) DEFAULT 'HDFC Bank',
  `masked_account_number` varchar(30) DEFAULT '├▓├▓├▓├▓ 5543',
  `umn` varchar(100) NOT NULL,
  `status` varchar(25) NOT NULL DEFAULT 'ACTIVE',
  `start_date` date NOT NULL,
  `next_debit_date` date NOT NULL,
  `end_date` date DEFAULT NULL,
  `last_debit_at` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `umn` (`umn`),
  KEY `idx_autopay_user` (`user_id`),
  KEY `idx_autopay_status` (`status`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `bank_accounts`
--

DROP TABLE IF EXISTS `bank_accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bank_accounts` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `account_number_masked` varchar(30) NOT NULL,
  `account_type` varchar(30) DEFAULT NULL,
  `bank_name` varchar(100) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `ifsc_code` varchar(20) DEFAULT NULL,
  `is_primary` bit(1) NOT NULL,
  `logo_url` varchar(255) DEFAULT NULL,
  `simulated_balance` decimal(15,2) DEFAULT NULL,
  `upi_linked` bit(1) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `account_holder_name` varchar(100) DEFAULT NULL,
  `bank_code` varchar(20) DEFAULT NULL,
  `last_checked_at` datetime(6) DEFAULT NULL,
  `provider_reference` varchar(100) DEFAULT NULL,
  `verification_status` varchar(25) DEFAULT NULL,
  `verified_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `bank_verification_logs`
--

DROP TABLE IF EXISTS `bank_verification_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bank_verification_logs` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `bank_account_id` bigint(20) DEFAULT NULL,
  `created_at` datetime(6) NOT NULL,
  `failure_reason` varchar(255) DEFAULT NULL,
  `provider_reference` varchar(100) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `verification_status` varchar(30) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_bank_verif_user` (`user_id`),
  KEY `idx_bank_verif_ref` (`provider_reference`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `coupons`
--

DROP TABLE IF EXISTS `coupons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `coupons` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `category` varchar(50) DEFAULT NULL,
  `claimed` bit(1) NOT NULL,
  `code` varchar(50) NOT NULL,
  `logo_url` varchar(255) DEFAULT NULL,
  `merchant_name` varchar(100) NOT NULL,
  `min_order` decimal(10,2) DEFAULT NULL,
  `offer_text` varchar(200) NOT NULL,
  `valid_till` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `device_sessions`
--

DROP TABLE IF EXISTS `device_sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `device_sessions` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `device_identifier_hash` varchar(128) NOT NULL,
  `device_name` varchar(100) DEFAULT NULL,
  `last_login_at` datetime(6) DEFAULT NULL,
  `trust_status` varchar(25) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_device_user` (`user_id`),
  KEY `idx_device_hash` (`device_identifier_hash`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `fraud_alerts`
--

DROP TABLE IF EXISTS `fraud_alerts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `fraud_alerts` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `action_taken` varchar(40) DEFAULT NULL,
  `created_at` datetime(6) NOT NULL,
  `detected_reason` varchar(255) DEFAULT NULL,
  `risk_level` varchar(20) NOT NULL,
  `risk_score` int(11) DEFAULT NULL,
  `target_identifier` varchar(100) NOT NULL,
  `transaction_reference` varchar(64) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `khata_expenses`
--

DROP TABLE IF EXISTS `khata_expenses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `khata_expenses` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `amount` decimal(15,2) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `group_id` bigint(20) NOT NULL,
  `payer_id` bigint(20) NOT NULL,
  `payer_name` varchar(100) NOT NULL,
  `title` varchar(150) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `khata_groups`
--

DROP TABLE IF EXISTS `khata_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `khata_groups` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `creator_id` bigint(20) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `total_expense` decimal(15,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `khata_members`
--

DROP TABLE IF EXISTS `khata_members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `khata_members` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `balance` decimal(15,2) DEFAULT NULL,
  `group_id` bigint(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `khata_settlements`
--

DROP TABLE IF EXISTS `khata_settlements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `khata_settlements` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `amount` decimal(15,2) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `from_member_id` bigint(20) NOT NULL,
  `from_member_name` varchar(100) NOT NULL,
  `group_id` bigint(20) NOT NULL,
  `settled` bit(1) NOT NULL,
  `settled_at` datetime(6) DEFAULT NULL,
  `to_member_id` bigint(20) NOT NULL,
  `to_member_name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `merchant_customers`
--

DROP TABLE IF EXISTS `merchant_customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `merchant_customers` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `last_visit` datetime(6) DEFAULT NULL,
  `merchant_id` bigint(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `total_purchases` decimal(15,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `merchant_dues`
--

DROP TABLE IF EXISTS `merchant_dues`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `merchant_dues` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `amount` decimal(15,2) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `customer_name` varchar(100) NOT NULL,
  `customer_phone` varchar(20) NOT NULL,
  `due_date` date DEFAULT NULL,
  `merchant_id` bigint(20) NOT NULL,
  `reminder_sent_at` datetime(6) DEFAULT NULL,
  `status` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `merchants`
--

DROP TABLE IF EXISTS `merchants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `merchants` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `business_name` varchar(120) NOT NULL,
  `category` varchar(60) DEFAULT NULL,
  `created_at` datetime(6) NOT NULL,
  `gst_number` varchar(30) DEFAULT NULL,
  `pending_dues_total` decimal(15,2) DEFAULT NULL,
  `soundbox_enabled` bit(1) NOT NULL,
  `total_collected` decimal(15,2) DEFAULT NULL,
  `user_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKh9v6fyuu5mnk7p3qtlpta2947` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notifications` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `message` varchar(500) NOT NULL,
  `is_read` bit(1) NOT NULL,
  `title` varchar(150) NOT NULL,
  `type` varchar(30) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `oauth_accounts`
--

DROP TABLE IF EXISTS `oauth_accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `oauth_accounts` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `provider` varchar(50) NOT NULL,
  `provider_email` varchar(120) NOT NULL,
  `provider_subject_id` varchar(120) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKg6i154bongbaqxg7hx16259vx` (`provider`,`provider_subject_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `offline_transactions`
--

DROP TABLE IF EXISTS `offline_transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `offline_transactions` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `amount` decimal(15,2) NOT NULL,
  `client_reference` varchar(64) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `recipient_upi` varchar(80) NOT NULL,
  `synced` bit(1) NOT NULL,
  `synced_at` datetime(6) DEFAULT NULL,
  `user_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKnro1p9l6te5dtcm5wt08yrjgm` (`client_reference`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `onboarding_sessions`
--

DROP TABLE IF EXISTS `onboarding_sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `onboarding_sessions` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `current_step` varchar(40) NOT NULL,
  `onboarding_status` varchar(30) NOT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `user_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_onboard_user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `otp_verifications`
--

DROP TABLE IF EXISTS `otp_verifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `otp_verifications` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `attempt_count` int(11) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `destination_hash` varchar(128) NOT NULL,
  `expires_at` datetime(6) NOT NULL,
  `otp_hash` varchar(128) NOT NULL,
  `purpose` varchar(40) NOT NULL,
  `status` varchar(30) NOT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `verified_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_otp_dest` (`destination_hash`),
  KEY `idx_otp_purpose` (`purpose`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `qr_codes`
--

DROP TABLE IF EXISTS `qr_codes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `qr_codes` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `amount` decimal(15,2) DEFAULT NULL,
  `created_at` datetime(6) NOT NULL,
  `note` varchar(100) DEFAULT NULL,
  `qr_type` varchar(20) NOT NULL,
  `upi_payload` varchar(500) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `refresh_tokens`
--

DROP TABLE IF EXISTS `refresh_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `refresh_tokens` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `expiry_date` datetime(6) NOT NULL,
  `token` varchar(120) NOT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKghpmfn23vmxfu3spu3lfg4r2d` (`token`),
  UNIQUE KEY `UK7tdcd6ab5wsgoudnvj7xf1b7l` (`user_id`),
  CONSTRAINT `FK1lih5y2npsf8u5o3vhdb9y0os` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roles` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKofx66keruapi6vyqpv6f2or37` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `suspicious_identifiers`
--

DROP TABLE IF EXISTS `suspicious_identifiers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `suspicious_identifiers` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `active` bit(1) NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `identifier` varchar(100) NOT NULL,
  `report_count` int(11) DEFAULT NULL,
  `risk_category` varchar(60) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_suspicious_val` (`identifier`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `transactions` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `amount` decimal(15,2) NOT NULL,
  `category` varchar(40) DEFAULT NULL,
  `created_at` datetime(6) NOT NULL,
  `failure_reason` varchar(255) DEFAULT NULL,
  `idempotency_key` varchar(120) DEFAULT NULL,
  `note` varchar(255) DEFAULT NULL,
  `payment_mode` varchar(30) NOT NULL,
  `recipient_id` bigint(20) DEFAULT NULL,
  `recipient_name` varchar(100) NOT NULL,
  `recipient_upi_id` varchar(80) DEFAULT NULL,
  `risk_score` int(11) DEFAULT NULL,
  `sender_id` bigint(20) NOT NULL,
  `sender_name` varchar(100) DEFAULT NULL,
  `sender_upi_id` varchar(80) DEFAULT NULL,
  `status` varchar(30) NOT NULL,
  `transaction_reference` varchar(64) NOT NULL,
  `type` varchar(30) NOT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `utr_number` varchar(32) DEFAULT NULL,
  `bank_name` varchar(100) DEFAULT 'SmartPay Core Wallet',
  `auth_method` varchar(40) DEFAULT 'PIN',
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_txn_reference` (`transaction_reference`),
  UNIQUE KEY `idx_txn_idempotency` (`idempotency_key`),
  KEY `idx_txn_utr` (`utr_number`),
  KEY `idx_txn_sender` (`sender_id`),
  KEY `idx_txn_recipient` (`recipient_id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_roles`
--

DROP TABLE IF EXISTS `user_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_roles` (
  `user_id` bigint(20) NOT NULL,
  `role_id` bigint(20) NOT NULL,
  PRIMARY KEY (`user_id`,`role_id`),
  KEY `FKh8ciramu9cc9q3qcqiv4ue8a6` (`role_id`),
  CONSTRAINT `FKh8ciramu9cc9q3qcqiv4ue8a6` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`),
  CONSTRAINT `FKhfh9dx7w3ubf1co1vdev94g3f` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `avatar_url` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) NOT NULL,
  `email` varchar(100) NOT NULL,
  `enabled` bit(1) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `kyc_verified` bit(1) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `upi_id` varchar(60) DEFAULT NULL,
  `username` varchar(60) NOT NULL,
  `account_status` varchar(20) NOT NULL,
  `onboarding_completed` bit(1) NOT NULL,
  `biometric_enabled` bit(1) DEFAULT b'1',
  `quick_pay_limit` decimal(12,2) DEFAULT 5000.00,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK6dotkott2kjsp8vw4d0m25fb7` (`email`),
  UNIQUE KEY `UKdu5v5sr43g5bfnji4vb8hg5s3` (`phone`),
  UNIQUE KEY `UKr43af9ap4edm43mmtq01oddj6` (`username`),
  UNIQUE KEY `UKid6ubrew0co9ux1tcdt10fpls` (`upi_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `verified_mobile_numbers`
--

DROP TABLE IF EXISTS `verified_mobile_numbers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `verified_mobile_numbers` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `mobile_number` varchar(20) NOT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `verification_status` varchar(25) NOT NULL,
  `verified_at` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_verified_mobile` (`mobile_number`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `wallet_ledger`
--

DROP TABLE IF EXISTS `wallet_ledger`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wallet_ledger` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `amount` decimal(15,2) NOT NULL,
  `closing_balance` decimal(15,2) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `entry_type` varchar(10) NOT NULL,
  `opening_balance` decimal(15,2) NOT NULL,
  `transaction_ref` varchar(60) NOT NULL,
  `transaction_type` varchar(40) DEFAULT NULL,
  `wallet_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `wallets`
--

DROP TABLE IF EXISTS `wallets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wallets` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `balance` decimal(15,2) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `currency` varchar(10) NOT NULL,
  `status` varchar(20) NOT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `upi_litexbalance` decimal(15,2) NOT NULL,
  `upi_litexenabled` bit(1) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `version` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKsswfdl9fq40xlkove1y5kc7kv` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping routines for database 'smartpay_db'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-11-05 20:00:22
