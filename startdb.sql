-- MySQL dump 10.13  Distrib 5.5.27, for Win32 (x86)
--
-- Host: localhost    Database: reu_wheelchair
-- ------------------------------------------------------
-- Server version	5.5.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `rfid_values`
--
USE reu_wheelchair;
DROP TABLE IF EXISTS `rfid_values`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rfid_values` (
  `number` int(11) NOT NULL DEFAULT '0',
  `RFID_tag` varchar(12) DEFAULT NULL,
  PRIMARY KEY (`number`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rfid_values`
--

LOCK TABLES `rfid_values` WRITE;
/*!40000 ALTER TABLE `rfid_values` DISABLE KEYS */;
INSERT INTO `rfid_values` VALUES (1,'670072B9CC60'),(2,'67007277A6C4'),(3,'67007286A231'),(4,'6700725D91D9'),(5,'670072AF3F85'),(6,'44007557BED8'),(7,'440079871FA5'),(8,'440075571F79'),(9,'4400758543F7'),(10,'04002B14417A'),(11,'04002B09B690'),(12,'04002F74623D'),(13,'040028B2F668'),(14,'04002B00B996'),(15,'44007984FC45'),(16,'03002E1C7445'),(17,'03002ED0B845'),(18,'03002EDC9766'),(19,'03002DCDE407'),(20,'03002F401579'),(21,'03002F705C00'),(22,'03002E10D3EE'),(23,'03002F71D984'),(24,'03002D8D4EED'),(25,'03002E3F1200');
/*!40000 ALTER TABLE `rfid_values` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room_locations`
--

DROP TABLE IF EXISTS `room_locations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `room_locations` (
  `room` int(11) NOT NULL DEFAULT '0',
  `location` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room_locations`
--

LOCK TABLES `room_locations` WRITE;
/*!40000 ALTER TABLE `room_locations` DISABLE KEYS */;
INSERT INTO `room_locations` VALUES (107,'4 4'),(105,'0 1'),(106,'0 5'),(105,'3 2'),(106,'3 4'),(105,'6 1'),(106,'6 5'),(101,'1 2'),(102,'2 5'),(103,'4 1'),(104,'5 4');
/*!40000 ALTER TABLE `room_locations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2013-08-29 10:02:55
