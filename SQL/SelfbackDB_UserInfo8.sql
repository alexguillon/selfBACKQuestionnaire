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
-- Table structure for table `UserInfo8`
--

DROP TABLE IF EXISTS `UserInfo8`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `UserInfo8` (
  `id` varchar(255) DEFAULT NULL,
  `mobilityOption` int(11) DEFAULT NULL,
  `selfCareOption` int(11) DEFAULT NULL,
  `usualActivitiesOption` int(11) DEFAULT NULL,
  `painOption` int(11) DEFAULT NULL,
  `anxietyOption` int(11) DEFAULT NULL,
  `qolScale` int(11) DEFAULT NULL,
  `sleepQ1Option` int(11) DEFAULT NULL,
  `sleepQ2Option` int(11) DEFAULT NULL,
  `sleepQ3Option` int(11) DEFAULT NULL,
  `sleepQ4Option` int(11) DEFAULT NULL,
  `moodOneOne` int(11) DEFAULT NULL,
  `moodOneTwo` int(11) DEFAULT NULL,
  `moodOneThree` int(11) DEFAULT NULL,
  `moodOneFour` int(11) DEFAULT NULL,
  `moodOneFive` int(11) DEFAULT NULL,
  `moodOneSix` int(11) DEFAULT NULL,
  `moodOneSeven` int(11) DEFAULT NULL,
  `moodOneEight` int(11) DEFAULT NULL,
  `moodOneNine` int(11) DEFAULT NULL,
  `moodOneTen` int(11) DEFAULT NULL,
  `moodTwoOne` int(11) DEFAULT NULL,
  `moodTwoTwo` int(11) DEFAULT NULL,
  `moodTwoThree` int(11) DEFAULT NULL,
  `moodTwoFour` int(11) DEFAULT NULL,
  `moodTwoFive` int(11) DEFAULT NULL,
  `moodTwoSix` int(11) DEFAULT NULL,
  `moodTwoSeven` int(11) DEFAULT NULL,
  `moodTwoEight` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserInfo8`
--

LOCK TABLES `UserInfo8` WRITE;
/*!40000 ALTER TABLE `UserInfo8` DISABLE KEYS */;
/*!40000 ALTER TABLE `UserInfo8` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-06-12 10:31:17
