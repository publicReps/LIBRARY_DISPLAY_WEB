-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 02, 2025 at 01:55 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dashboard`
--

-- --------------------------------------------------------

--
-- Table structure for table `b_images`
--

CREATE TABLE `b_images` (
  `id` int(11) NOT NULL,
  `src` varchar(255) NOT NULL,
  `title` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `b_images`
--

INSERT INTO `b_images` (`id`, `src`, `title`) VALUES
(1, 'images/67fafbbda2988_eco cls11.jpeg', 'Economics class 11'),
(2, 'images/67fafc1857dca_eco cls12.jpeg', 'Economy class 12'),
(3, 'images/67fafc72d02c9_1st sem edu.jpeg', 'Education 1st sem'),
(4, 'images/67fafcd084fb1_1st sem.jpeg', '1st sem'),
(5, 'images/67fafcf6792aa_1st sem_a.jpeg', '1st sem'),
(6, 'images/67fafd13703c0_3rd sem.jpeg', '3rd sem'),
(7, 'images/67fb0291d9b8b_4th sem eco.jpeg', 'Economics 4th sem'),
(8, 'images/67fb02aeec983_aee.jpeg', 'Ability Enhancement Course'),
(9, 'images/67fb02c845c58_chem.jpeg', 'Chemistry'),
(10, 'images/67fb02e570b61_chem_1st.jpeg', 'Chemistry 1st sem'),
(11, 'images/67fb030692548_com_1st.jpeg', 'Commerce 1st sem'),
(12, 'images/67fb0323c5e0c_commerce.jpeg', 'Commerce'),
(13, 'images/67fb033de47ff_eco 2nd sem.jpeg', 'Economics 2nd sem'),
(14, 'images/67fb0352c5204_eco 3rd sem.jpeg', 'Economics 3rd sem'),
(15, 'images/67fb036db6407_eco sem3.jpeg', 'Economics 3rd sem'),
(16, 'images/67fb037f0b396_eco.jpeg', 'Economics'),
(17, 'images/67fb03d781d3a_eco_2nd sem.jpeg', 'Economics 2nd sem'),
(18, 'images/67fb03f7a124d_eco_5th sem.jpeg', 'Economics 5th sem'),
(19, 'images/67fb041685acb_edu 1st sem.jpeg', 'Education 1st sem'),
(20, 'images/67fb043c46147_geography.jpeg', 'Geography'),
(21, 'images/67fb0455a79f1_GGY.jpeg', 'Geography'),
(22, 'images/67fb046b09109_ggy_a.jpeg', 'Geography');

-- --------------------------------------------------------

--
-- Table structure for table `dashboard`
--

CREATE TABLE `dashboard` (
  `id` int(11) NOT NULL,
  `details` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `dashboard`
--

INSERT INTO `dashboard` (`id`, `details`) VALUES
(1, 'ba/2024/33'),
(2, 'bsc/2023/09'),
(3, 'New Arrival Book Display'),
(4, 'Library Activities'),
(5, 'PLEASE RETURN YOUR BOOKS AND REISSUE IN A GIVEN TIME PERIOD. OTHERWISE YOU WILL BE PAY FINE.'),
(6, '2,82,718'),
(7, '40'),
(8, '54,0000'),
(9, '8,848'),
(10, '2'),
(11, '1(27Vols.)'),
(12, '6282'),
(13, '5601'),
(14, '6'),
(15, '27'),
(16, '28'),
(17, '26'),
(18, '27'),
(19, '28'),
(20, '27'),
(21, '29'),
(22, '27'),
(23, '28'),
(24, '26'),
(25, '29'),
(26, '28');

-- --------------------------------------------------------

--
-- Table structure for table `l_images`
--

CREATE TABLE `l_images` (
  `id` int(11) NOT NULL,
  `src` varchar(255) NOT NULL,
  `title` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `l_images`
--

INSERT INTO `l_images` (`id`, `src`, `title`) VALUES
(1, 'images/67e4dd67259e1_1743051947406.jpg', '25/04/23'),
(2, 'images/67e4dd9774868_1743051947382.jpg', '2023-24'),
(3, 'images/67e4ddd136da2_1743051947361.jpg', '2023-24'),
(4, 'images/67e4dde7b3e55_1743051947340.jpg', '2023-24'),
(5, 'images/67e4de41a7d21_1742459451720.jpg', '2023-24'),
(6, 'images/67e4de6b77de5_1742459451696.jpg', '2023-24'),
(7, 'images/67e4de9c9124c_1742459451744 (1).jpg', '2023-24'),
(8, 'images/67e4dee251aee_1742620076155.jpg', '2023-24'),
(9, 'images/67e4df2f1c3af_1742620076189.jpg', '2023-24'),
(10, 'images/67e4dfa306d42_1742619899888 (1).jpg', '2023-24'),
(11, 'images/67e4dfc016d18_1742620076139 (1).jpg', '2023-24'),
(12, 'images/67e4dfdb1472b_1742620076173 (1).jpg', '2023-24'),
(13, 'images/67e4e110a5ee8_1743052921633 (1).jpg', '2023-24'),
(14, 'images/67e4e1ac9eeca_1743051200127.JPG', '2023-24'),
(15, 'images/67e4e1d82328e_1743051160457.JPG', '2023-24'),
(16, 'images/67e4e1f33b66a_1743051200088.JPG', '2023-24'),
(17, 'images/67e4e21be55f8_1743051160559.JPG', '2023-24'),
(18, 'images/67e4e27ba8844_1743051160513.JPG', '2023-24'),
(19, 'images/67e4e2b8a89e7_1743051160442.JPG', '2023-24'),
(20, 'images/67e4e2dc002c8_1743051160472.JPG', '23-24'),
(21, 'images/67e4e319c81bb_1743052921609.jpg', '2023-24'),
(22, 'images/67e4e35a2ee2e_1743052921654.jpg', '2023-24'),
(23, 'images/67e4e3a6c4017_1743051461203.jpg', '2024-25'),
(24, 'images/67e4e3c047b9d_1743051461143.jpg', '2024-25'),
(25, 'images/67e4e3e0c7542_1743051461165.jpeg', '2024-25'),
(26, 'images/67e4e3fe33ea9_1743051461187.jpg', '2024-25'),
(27, 'images/67e4e41f9028c_1743051432525.jpg', '2024-25'),
(28, 'images/67e4e456e0de9_1743051432507.jpg', '2024-25'),
(29, 'images/67e4e48544892_1743051432577.jpg', '2024-25'),
(30, 'images/67e4e4c5d1d89_1742450950618.jpg', '2024-25'),
(31, 'images/67e4e4e6cecfa_1743051947455.jpg', '2024-25'),
(32, 'images/67e4e525d919a_1743051947480.jpg', '2024-25');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `b_images`
--
ALTER TABLE `b_images`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `dashboard`
--
ALTER TABLE `dashboard`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `l_images`
--
ALTER TABLE `l_images`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `b_images`
--
ALTER TABLE `b_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `dashboard`
--
ALTER TABLE `dashboard`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `l_images`
--
ALTER TABLE `l_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
