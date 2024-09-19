-- MySQL dump 10.13  Distrib 8.0.33, for macos13 (arm64)
--
-- Host: localhost    Database: sb-ecommerce-dev
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` bigint NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `name` varchar(80) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_46ccwnsi9409t36lurvtyljak` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category_seq`
--

DROP TABLE IF EXISTS `category_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category_seq`
--

LOCK TABLES `category_seq` WRITE;
/*!40000 ALTER TABLE `category_seq` DISABLE KEYS */;
INSERT INTO `category_seq` VALUES (101);
/*!40000 ALTER TABLE `category_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` bigint NOT NULL,
  `description` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `name` varchar(80) DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `quantity` int NOT NULL,
  `short_description` varchar(80) DEFAULT NULL,
  `category_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK1mtsbur82frn64de7balymq9s` (`category_id`),
  CONSTRAINT `FK1mtsbur82frn64de7balymq9s` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'SHISHA offers an exceptional smoking experience with its impressive features.\nIt produces large clouds of smoke, allows for deep lung inhalation, and provides an approximate 12,000 puff capacity.\nWith a generous 24ml e-liquid capacity, it offers a long-lasting and satisfying smoking session.\nSHISHA combines tradition with modern convenience, featuring ornate designs and a type-C charging method.\n\nKEY SELLING POINTS\nAuthentic Shisha Experience\n','assets/images/product/img.png?x=960&y=720&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=960&ey=720&align=center&resizesource&unsharp=1.5x1+0.7+0.02&cox=0&coy=0&cdx=960&cdy=720','JNR® SHISHA Disposable Vape - HOOKAH',20.00,5,'JNR® SHISHA Disposable Vape - HOOKAH Specieal',1),(2,'SHISHA offers an exceptional smoking experience with its impressive features.\nIt produces large clouds of smoke, allows for deep lung inhalation, and provides an approximate 12,000 puff capacity.\nWith a generous 24ml e-liquid capacity, it offers a long-lasting and satisfying smoking session.\nSHISHA combines tradition with modern convenience, featuring ornate designs and a type-C charging method.\n\nKEY SELLING POINTS\nAuthentic Shisha Experience\nDive into classic shisha flavors,\nCrafted for a traditional vaping sensation\nOn-the-Go Shisha Bliss\nPocket-sized pouch for enjoyment anytime, Anywhere, like essentials\nIntense satisfaction Direct-to-Lung\nExperience a strong flavor and massive vapor clouds\nConsistent and enjoyable flavor\nEvery puff is always smooth and flavorful','assets/images/product/dispoasable.png?x=960&y=720&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=960&ey=720&align=center&resizesource&unsharp=1.5x1+0.7+0.02&cox=0&coy=0&cdx=960&cdy=720','JNR® SHISHA Disposable Vape - HOOKAH\n',30.50,10,'JNR® SHISHA Disposable Vape - HOOKAH\n Hot',1),(3,'SHISHA offers an exceptional smoking experience with its impressive features.\nIt produces large clouds of smoke, allows for deep lung inhalation, and provides an approximate 12,000 puff capacity.\nWith a generous 24ml e-liquid capacity, it offers a long-lasting and satisfying smoking session.\nSHISHA combines tradition with modern convenience, featuring ornate designs and a type-C charging method.\n\nKEY SELLING POINTS\nAuthentic Shisha Experience\nDive into classic shisha flavors,\nCrafted for a traditional vaping sensation\nOn-the-Go Shisha Bliss\nPocket-sized pouch for enjoyment anytime, Anywhere, like essentials\nIntense satisfaction Direct-to-Lung\nExperience a strong flavor and massive vapor clouds\nConsistent and enjoyable flavor\nEvery puff is always smooth and flavorful','assets/images/product/disposable1.png?x=960&y=720&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=960&ey=720&align=center&resizesource&unsharp=1.5x1+0.7+0.02&cox=0&coy=0&cdx=960&cdy=720\n','JNR® SHISHA Disposable Vape - HOOKAH\n',40.00,15,'JNR® SHISHA Disposable Vape - HOOKAH\n Hot',4),(4,'SHISHA offers an exceptional smoking experience with its impressive features.\nIt produces large clouds of smoke, allows for deep lung inhalation, and provides an approximate 12,000 puff capacity.\nWith a generous 24ml e-liquid capacity, it offers a long-lasting and satisfying smoking session.\nSHISHA combines tradition with modern convenience, featuring ornate designs and a type-C charging method.\n\nKEY SELLING POINTS\nAuthentic Shisha Experience\nDive into classic shisha flavors,\nCrafted for a traditional vaping sensation\nOn-the-Go Shisha Bliss\nPocket-sized pouch for enjoyment anytime, Anywhere, like essentials\nIntense satisfaction Direct-to-Lung\nExperience a strong flavor and massive vapor clouds\nConsistent and enjoyable flavor\nEvery puff is always smooth and flavorful','assets/images/product/jnr.png?x=960&y=720&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=960&ey=720&align=center&resizesource&unsharp=1.5x1+0.7+0.02&cox=0&coy=0&cdx=960&cdy=720','JNR® SHISHA',21.50,8,'JNR® SHISHA Disposable Vape - HOOKAH\n Hot',2),(5,'SHISHA offers an exceptional smoking experience with its impressive features.\nIt produces large clouds of smoke, allows for deep lung inhalation, and provides an approximate 12,000 puff capacity.\nWith a generous 24ml e-liquid capacity, it offers a long-lasting and satisfying smoking session.\nSHISHA combines tradition with modern convenience, featuring ornate designs and a type-C charging method.\n\nKEY SELLING POINTS\nAuthentic Shisha Experience\nDive into classic shisha flavors,\nCrafted for a traditional vaping sensation\nOn-the-Go Shisha Bliss\nPocket-sized pouch for enjoyment anytime, Anywhere, like essentials\nIntense satisfaction Direct-to-Lung\nExperience a strong flavor and massive vapor clouds\nConsistent and enjoyable flavor\nEvery puff is always smooth and flavorful','assets/images/product/jnr1.png?x=960&y=720&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=960&ey=720&align=center&resizesource&unsharp=1.5x1+0.7+0.02&cox=0&coy=0&cdx=960&cdy=720','JNR® SHISHA',90.00,0,'JNR® SHISHA Disposable Vape - HOOKAH\n Hot',5);
LOCK TABLES `product_seq` WRITE;
/*!40000 ALTER TABLE `product_seq` DISABLE KEYS */;
INSERT INTO `product_seq` VALUES (101);
/*!40000 ALTER TABLE `product_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(48) DEFAULT NULL,
  `name` varchar(16) DEFAULT NULL,
  `password` varchar(256) DEFAULT NULL,
  `surname` varchar(16) DEFAULT NULL,
  `timestamp` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_unique` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-19 11:08:52
