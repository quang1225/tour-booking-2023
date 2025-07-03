-- phpMyAdmin SQL Dump
-- version 4.9.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 09, 2023 at 04:10 PM
-- Server version: 5.7.35-log
-- PHP Version: 5.6.40

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `miane885_tourBooking2023`
--

-- --------------------------------------------------------

--
-- Table structure for table `Category`
--

CREATE TABLE `Category` (
  `id` int(11) NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) DEFAULT CURRENT_TIMESTAMP(3),
  `isActive` tinyint(1) DEFAULT '1',
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Category`
--

INSERT INTO `Category` (`id`, `name`, `createdAt`, `isActive`, `description`) VALUES
(1, 'Hà Nội', '2023-07-03 10:41:46.702', 1, 'Discover the capital of Vietnam'),
(2, 'Hồ Chí Minh', '2023-07-03 10:41:46.702', 1, 'Explore Vietnam\'s largest city'),
(3, 'Kiên Giang', '2023-07-03 10:41:46.702', 1, 'Discover life on the river in Vietnam'),
(4, 'Miền Nam', '2023-07-03 10:41:46.702', 1, 'Explore the South of Vietnam'),
(5, 'Category Tesst', '2023-07-07 17:02:54.491', 1, 'abcd');

-- --------------------------------------------------------

--
-- Table structure for table `Order`
--

CREATE TABLE `Order` (
  `startDate` datetime(3) NOT NULL,
  `numberOfAdults` int(11) NOT NULL,
  `numberOfChilds` int(11) NOT NULL,
  `numberOfInfants` int(11) NOT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'PENDING',
  `createdAt` datetime(3) DEFAULT CURRENT_TIMESTAMP(3),
  `otherRequest` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `paymentMethod` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userEmail` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tourId` int(11) NOT NULL,
  `adultPrice` int(11) NOT NULL,
  `childPrice` int(11) NOT NULL,
  `infantPrice` int(11) NOT NULL,
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `transactionId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Order`
--

INSERT INTO `Order` (`startDate`, `numberOfAdults`, `numberOfChilds`, `numberOfInfants`, `status`, `createdAt`, `otherRequest`, `paymentMethod`, `userEmail`, `tourId`, `adultPrice`, `childPrice`, `infantPrice`, `id`, `transactionId`) VALUES
('2023-07-09 17:29:52.043', 1, 1, 0, 'PAID', '2023-07-09 17:37:12.449', '', 'card', 'quang5@test.com', 4, 50, 20, 10, '5U715690XW101120Y', '6RV338947Y381400R');

-- --------------------------------------------------------

--
-- Table structure for table `Tour`
--

CREATE TABLE `Tour` (
  `id` int(11) NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `featuredImage` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `galleryImgs` varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL,
  `duration` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) DEFAULT CURRENT_TIMESTAMP(3),
  `isActive` tinyint(1) DEFAULT '1',
  `adultPrice` int(11) NOT NULL,
  `childPrice` int(11) NOT NULL,
  `infantPrice` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Tour`
--

INSERT INTO `Tour` (`id`, `name`, `description`, `featuredImage`, `galleryImgs`, `duration`, `createdAt`, `isActive`, `adultPrice`, `childPrice`, `infantPrice`) VALUES
(1, 'Tour 4 days 3 nights: Discover Hồ Gươm', 'abc 123', 'https://picsum.photos/seed/11/1260/750', 'https://picsum.photos/seed/12/1260/750,https://picsum.photos/seed/13/1260/750', '4 days 3 nights', '2023-07-02 13:09:27.610', 1, 50, 20, 10),
(2, 'Tour 4 days 3 nights: Discover Chợ Bến Thành', 'abc 123', 'https://picsum.photos/seed/21/1260/750', 'https://picsum.photos/seed/22/1260/750,https://picsum.photos/seed/23/1260/750', '4 days 3 nights', '2023-07-02 13:09:27.610', 1, 120, 70, 15),
(3, 'Tour 4 days 3 nights: Discover Đảo Phú Quốc', 'abc 123', 'https://picsum.photos/seed/31/1260/750', 'https://picsum.photos/seed/32/1260/750,https://picsum.photos/seed/23/1260/750', '4 days 3 nights', '2023-07-02 13:09:27.610', 1, 100, 50, 20),
(4, 'Tour 4 days 3 nights: Discover Hồ Hoàn Kiếm', 'abc 123', 'https://picsum.photos/seed/41/1260/750', 'https://picsum.photos/seed/42/1260/750,https://picsum.photos/seed/43/1260/750', '4 days 3 nights', '2023-07-02 13:09:27.610', 1, 50, 20, 10),
(5, 'Tour 4 days 3 nights: Discover Cầu Thủ Thiêm', 'abc 123', 'https://picsum.photos/seed/51/1260/750', 'https://picsum.photos/seed/52/1260/750,https://picsum.photos/seed/53/1260/750', '4 days 3 nights', '2023-07-02 13:09:27.611', 1, 120, 70, 15),
(6, 'Tour 4 days 3 nights: Discover Bến Nhà Rồng', 'abc 123', 'https://picsum.photos/seed/61/1260/750', 'https://picsum.photos/seed/62/1260/750,https://picsum.photos/seed/53/1260/750', '4 days 3 nights', '2023-07-02 13:09:27.611', 1, 100, 50, 20),
(7, 'Tour 4 days 3 nights: Discover Nhà Thờ Đức Bà', 'abc 123', 'https://picsum.photos/seed/71/1260/750', 'https://picsum.photos/seed/72/1260/750,https://picsum.photos/seed/73/1260/750', '4 days 3 nights', '2023-07-02 13:09:27.611', 1, 50, 20, 10),
(8, 'Tour 4 days 3 nights: Discover Thảo Cầm Viên', 'abc 123', 'https://picsum.photos/seed/81/1260/750', 'https://picsum.photos/seed/82/1260/750,https://picsum.photos/seed/83/1260/750', '4 days 3 nights', '2023-07-02 13:09:27.611', 1, 120, 70, 15),
(9, 'Tour 4 days 3 nights: Discover Quận Bình Thạnh', 'abc 123', 'https://picsum.photos/seed/91/1260/750', 'https://picsum.photos/seed/92/1260/750,https://picsum.photos/seed/93/1260/750', '4 days 3 nights', '2023-07-02 13:09:27.611', 1, 100, 50, 20);

-- --------------------------------------------------------

--
-- Table structure for table `User`
--

CREATE TABLE `User` (
  `id` int(11) NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) DEFAULT CURRENT_TIMESTAMP(3),
  `isActive` tinyint(1) DEFAULT '1',
  `password` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `isAdmin` tinyint(1) DEFAULT '0',
  `fullname` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `User`
--

INSERT INTO `User` (`id`, `email`, `createdAt`, `isActive`, `password`, `isAdmin`, `fullname`) VALUES
(1, 'quang2@test.com', '2023-07-03 10:38:46.421', 1, NULL, 0, NULL),
(2, 'quang3@test.com', '2023-07-03 10:38:46.421', 1, NULL, 0, NULL),
(3, 'quang1@test.com', '2023-07-03 10:38:46.421', 1, NULL, 0, NULL),
(15, 'quang6@test.com', '2023-07-09 18:06:48.335', 1, '$2a$10$N1mwYgHGvJZDoPMiWXPUr.gDw4vPwTwCLZoLbcbCwW8m8at2aawgK', 0, NULL),
(14, 'tuanlua44@gmail.com', '2023-07-07 18:30:19.218', 1, '$2a$10$mK43aYIqA19dLD8pWeiag.nuznIC9RUlinVuvuNnsCzuxkMxB.3au', 0, 'tuanlua'),
(13, 'quang5@test.com', '2023-07-07 12:53:21.493', 1, '$2a$10$2A68qC463DQxNdyzaKFwVeWOwH2QA4vNERPiO7qOmRt7z3eQ4ns2W', 0, 'Quang 5'),
(12, 'quang4@test.com', '2023-07-07 11:29:43.211', 1, '$2a$10$yv32TEEPLE0VeEKzwhfWX.jZ0M5doOn.Bn70HNa8dpqmw9Fyo29IS', 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `_CategoryToTour`
--

CREATE TABLE `_CategoryToTour` (
  `A` int(11) NOT NULL,
  `B` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `_CategoryToTour`
--

INSERT INTO `_CategoryToTour` (`A`, `B`) VALUES
(1, 1),
(1, 4),
(2, 2),
(2, 5),
(2, 6),
(2, 7),
(2, 8),
(2, 9),
(3, 3),
(4, 2),
(4, 3),
(4, 5),
(4, 6),
(4, 7),
(4, 8),
(4, 9);

-- --------------------------------------------------------

--
-- Table structure for table `_TourToUser`
--

CREATE TABLE `_TourToUser` (
  `A` int(11) NOT NULL,
  `B` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `_TourToUser`
--

INSERT INTO `_TourToUser` (`A`, `B`) VALUES
(1, 13),
(6, 13);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Category`
--
ALTER TABLE `Category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Order`
--
ALTER TABLE `Order`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Order_transactionId_key` (`transactionId`),
  ADD KEY `Order_userEmail_fkey` (`userEmail`),
  ADD KEY `Order_tourId_fkey` (`tourId`);

--
-- Indexes for table `Tour`
--
ALTER TABLE `Tour`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `User_email_key` (`email`);

--
-- Indexes for table `_CategoryToTour`
--
ALTER TABLE `_CategoryToTour`
  ADD UNIQUE KEY `_CategoryToTour_AB_unique` (`A`,`B`),
  ADD KEY `_CategoryToTour_B_index` (`B`);

--
-- Indexes for table `_TourToUser`
--
ALTER TABLE `_TourToUser`
  ADD UNIQUE KEY `_TourToUser_AB_unique` (`A`,`B`),
  ADD KEY `_TourToUser_B_index` (`B`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Category`
--
ALTER TABLE `Category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `Tour`
--
ALTER TABLE `Tour`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `User`
--
ALTER TABLE `User`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
