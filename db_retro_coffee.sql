-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 21, 2021 at 07:38 AM
-- Server version: 10.4.13-MariaDB
-- PHP Version: 7.4.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_retro_coffee`
--

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

CREATE TABLE `account` (
  `ac_id` int(11) UNSIGNED NOT NULL,
  `ac_name` varchar(50) NOT NULL,
  `ac_email` varchar(50) NOT NULL,
  `ac_phone` varchar(20) NOT NULL,
  `ac_password` varchar(100) NOT NULL,
  `ac_level` int(11) NOT NULL DEFAULT 1,
  `ac_status` int(11) NOT NULL DEFAULT 1,
  `ac_created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `ac_updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`ac_id`, `ac_name`, `ac_email`, `ac_phone`, `ac_password`, `ac_level`, `ac_status`, `ac_created_at`, `ac_updated_at`) VALUES
(1, 'Indra David', 'indradavidpesik@gmail.com', '082292192488', '123456', 1, 1, '2021-01-20 01:02:21', '2021-01-20 01:02:21');

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `cr_id` int(11) UNSIGNED NOT NULL,
  `cs_id` int(11) UNSIGNED NOT NULL,
  `cr_product` varchar(50) NOT NULL,
  `cr_price` bigint(12) NOT NULL,
  `cr_qty` int(11) NOT NULL,
  `cr_total` bigint(12) NOT NULL,
  `cr_expired` int(11) NOT NULL,
  `cr_pic_image` text NOT NULL,
  `cr_created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `cr_updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `ct_id` int(11) UNSIGNED NOT NULL,
  `ct_name` varchar(50) NOT NULL,
  `ct_status` int(11) NOT NULL DEFAULT 1,
  `ct_pic_image` text DEFAULT NULL,
  `ct_created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `ct_updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `cs_id` int(11) UNSIGNED NOT NULL,
  `ac_id` int(11) UNSIGNED NOT NULL,
  `cs_gender` int(11) DEFAULT NULL,
  `cs_dob` date DEFAULT NULL,
  `cs_address` text DEFAULT NULL,
  `cs_latitude` double DEFAULT NULL,
  `cs_longitude` double DEFAULT NULL,
  `cs_pic_image` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`cs_id`, `ac_id`, `cs_gender`, `cs_dob`, `cs_address`, `cs_latitude`, `cs_longitude`, `cs_pic_image`) VALUES
(1, 1, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `favorite`
--

CREATE TABLE `favorite` (
  `fa_id` int(11) UNSIGNED NOT NULL,
  `cs_id` int(11) UNSIGNED NOT NULL,
  `pr_id` int(11) UNSIGNED NOT NULL,
  `fa_created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `fa_updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `history`
--

CREATE TABLE `history` (
  `ht_id` int(11) UNSIGNED NOT NULL,
  `cs_id` int(11) UNSIGNED NOT NULL,
  `or_id` int(11) UNSIGNED NOT NULL,
  `ht_product` varchar(50) NOT NULL,
  `ht_price` bigint(20) NOT NULL,
  `ht_qty` int(11) NOT NULL,
  `ht_total` bigint(20) NOT NULL,
  `ht_created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `ht_updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `notice`
--

CREATE TABLE `notice` (
  `nc_id` int(11) UNSIGNED NOT NULL,
  `cs_id` int(11) UNSIGNED NOT NULL,
  `or_id` int(11) UNSIGNED NOT NULL,
  `nc_message` text NOT NULL,
  `nc_created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `nc_updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `or_id` int(11) UNSIGNED NOT NULL,
  `cs_id` int(11) UNSIGNED NOT NULL,
  `or_pay_total` bigint(12) NOT NULL,
  `or_address` text NOT NULL,
  `or_latitude` double DEFAULT NULL,
  `or_longitude` double DEFAULT NULL,
  `or_status` int(11) NOT NULL DEFAULT 0,
  `or_note_cancel` text NOT NULL,
  `or_note_approve` text NOT NULL,
  `or_method_payment` varchar(25) NOT NULL,
  `or_fee` bigint(12) NOT NULL,
  `or_date_order` datetime NOT NULL,
  `or_created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `or_updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `pr_id` int(11) UNSIGNED NOT NULL,
  `ct_id` int(11) UNSIGNED NOT NULL,
  `pr_name` varchar(50) NOT NULL,
  `pr_price` bigint(12) NOT NULL,
  `pr_desc` text NOT NULL,
  `pr_discount` int(11) NOT NULL,
  `pr_discount_price` bigint(12) NOT NULL,
  `pr_is_discount` int(11) NOT NULL DEFAULT 0,
  `pr_status` int(11) NOT NULL DEFAULT 1,
  `pr_pic_image` text NOT NULL,
  `pr_created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `pr_updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`ac_id`);

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`cr_id`),
  ADD KEY `cs_id` (`cs_id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`ct_id`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`cs_id`),
  ADD KEY `ac_id` (`ac_id`);

--
-- Indexes for table `favorite`
--
ALTER TABLE `favorite`
  ADD PRIMARY KEY (`fa_id`),
  ADD KEY `cs_id` (`cs_id`),
  ADD KEY `pr_id` (`pr_id`);

--
-- Indexes for table `history`
--
ALTER TABLE `history`
  ADD PRIMARY KEY (`ht_id`),
  ADD KEY `cs_id` (`cs_id`),
  ADD KEY `or_id` (`or_id`);

--
-- Indexes for table `notice`
--
ALTER TABLE `notice`
  ADD PRIMARY KEY (`nc_id`),
  ADD KEY `nc_cs_id` (`cs_id`),
  ADD KEY `nc_or_id` (`or_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`or_id`),
  ADD KEY `cs_id` (`cs_id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`pr_id`),
  ADD KEY `ct_id` (`ct_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `account`
--
ALTER TABLE `account`
  MODIFY `ac_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `cr_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `ct_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `cs_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `favorite`
--
ALTER TABLE `favorite`
  MODIFY `fa_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `history`
--
ALTER TABLE `history`
  MODIFY `ht_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `notice`
--
ALTER TABLE `notice`
  MODIFY `nc_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `or_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `pr_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`cs_id`) REFERENCES `customer` (`cs_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `customer`
--
ALTER TABLE `customer`
  ADD CONSTRAINT `customer_ibfk_1` FOREIGN KEY (`ac_id`) REFERENCES `account` (`ac_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `favorite`
--
ALTER TABLE `favorite`
  ADD CONSTRAINT `favorite_ibfk_1` FOREIGN KEY (`cs_id`) REFERENCES `customer` (`cs_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `favorite_ibfk_2` FOREIGN KEY (`pr_id`) REFERENCES `product` (`pr_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `history`
--
ALTER TABLE `history`
  ADD CONSTRAINT `history_ibfk_1` FOREIGN KEY (`cs_id`) REFERENCES `customer` (`cs_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `history_ibfk_2` FOREIGN KEY (`or_id`) REFERENCES `orders` (`or_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `notice`
--
ALTER TABLE `notice`
  ADD CONSTRAINT `notice_ibfk_1` FOREIGN KEY (`cs_id`) REFERENCES `customer` (`cs_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `notice_ibfk_2` FOREIGN KEY (`or_id`) REFERENCES `orders` (`or_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`cs_id`) REFERENCES `customer` (`cs_id`) ON UPDATE CASCADE;

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`ct_id`) REFERENCES `category` (`ct_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
