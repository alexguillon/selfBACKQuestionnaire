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
-- Table structure for table `UserInfo6`
--

DROP TABLE IF EXISTS `UserInfo6`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `UserInfo6` (
  `id` varchar(255) DEFAULT NULL,
  `perceptionsQ1` int(11) DEFAULT NULL,
  `perceptionsQ2` int(11) DEFAULT NULL,
  `perceptionsQ3` int(11) DEFAULT NULL,
  `perceptionsQ4` int(11) DEFAULT NULL,
  `perceptionsQ5` int(11) DEFAULT NULL,
  `perceptionsQ6` int(11) DEFAULT NULL,
  `perceptionsQ7` int(11) DEFAULT NULL,
  `perceptionsQ8` int(11) DEFAULT NULL,
  `activity` varchar(30) DEFAULT NULL,
  `activityNumber` int(11) DEFAULT NULL,
  `kneesPain` tinyint(1) DEFAULT NULL,
  `wristsHandsPain` int(11) DEFAULT NULL,
  `elbowsPain` tinyint(1) DEFAULT NULL,
  `shouldersPain` tinyint(1) DEFAULT NULL,
  `anklesFeetPain` tinyint(1) DEFAULT NULL,
  `hipsThighsPain` tinyint(1) DEFAULT NULL,
  `lowerBackPain` tinyint(1) DEFAULT NULL,
  `upperBackPain` tinyint(1) DEFAULT NULL,
  `neckPain` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserInfo6`
--

LOCK TABLES `UserInfo6` WRITE;
/*!40000 ALTER TABLE `UserInfo6` DISABLE KEYS */;
/*!40000 ALTER TABLE `UserInfo6` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-06-12 10:31:18
