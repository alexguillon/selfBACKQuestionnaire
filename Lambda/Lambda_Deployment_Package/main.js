var mysql = require('mysql');
var config = require('./config.json');
var pool = mysql.createPool({
    host: config.dbhost,
    user: config.dbuser,
    password: config.dbpassword,
    database: config.dbname,
    connectTimeout: 200000000000000,
    adquireTimeout: 200000000000000,
    debug: false
});
var cptLifeStyle = 0;
var cptEthnicGroupWhite = 0;
var cptEthnicGroupMixed = 0;
var cptEthnicGroupAsia = 0;
var cptUserJobE = 0;
var cptUserJobU = 0;
var cptLevel = 0;
var cptMIA = 0;
var cptSOP = 0;
var cptMobilityQOLGood = 0;
var cptMobilityQOLBad = 0;
var cptSelfCareQOLGood = 0;
var cptSelfCareQOLBad = 0;
var cptUsualActivitiesQOLGood = 0;
var cptUsualActivitiesQOLBad = 0;
var cptPainQOLBad = 0;
var cptPainQOLGood = 0;
var cptAnxietyQOLGood = 0;
var cptAnxietyQOLBad = 0;

var sessionID = "";

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 15; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
sessionID = makeid();

//TABLE 1
var ageDB;
var gendDB;
var metricSystemDB;
var heightDB;
var weightDB;
//TABLE 2
var aloneDB;
var withOthersDB;
var spouseDB = "false";
var parentsDB = "false";
var otherDB = "false";
var childUnderFiveDB = "false";
var childBetweenSixAndFifteenDB = "false";
var childOverFifteenDB = "false";
var ethnicGroupDB = "other";
var ethnicGroupBackgroundDB = "other";
var educationalBackgroundOptionDB;
//TABLE 3
var employedDB;
var employmentOptionDB;
var averageLBPDB;
var worstLBPDB;
var lengthTimeEpisodeDB;
var totalLengthTimeDB;
var workActivityReducedDB;
var leisureActivityReducedDB;
var painMedicationDaysDB;
//TABLE 4
var agree1DB;
var agree2DB;
var agree3DB;
var agree4DB;
var agree5DB;
var agree6DB;
var agree7DB;
var agree8DB;
var agree9DB;
var agree10DB;
var agree11DB;
var agree12DB;
var agree13DB;
var agree14DB;
var agree15DB;
var agree16DB;
var agree17DB;
var agree18DB;
var agree19DB;
var agree20DB;
var agree21DB;
var agree22DB;
var agree23DB;
var agree24DB;
//TABLE 5
var levelPhysicalActivityDB;
var beliefsQ1DB;
var beliefsQ2DB;
var beliefsQ3DB;
var beliefsQ4DB;
var beliefsQ5DB;
var confidenceQ1DB;
var confidenceQ2DB;
var confidenceQ3DB;
var confidenceQ4DB;
var confidenceQ5DB;
var confidenceQ6DB;
var confidenceQ7DB;
var confidenceQ8DB;
var confidenceQ9DB;
var confidenceQ10DB;
//TABLE 6
var perceptionsQ1DB;
var perceptionsQ2DB;
var perceptionsQ3DB;
var perceptionsQ4DB;
var perceptionsQ5DB;
var perceptionsQ6DB;
var perceptionsQ7DB;
var perceptionsQ8DB;
var activityDB;
var activityNumberDB;
var kneesPainDB = "false";
var wristsHandsPainDB = "false";
var elbowsPainDB = "false";
var shouldersPainDB = "false";
var anklesFeetPainDB = "false";
var hipsThighsPainDB = "false";
var lowerBackPainDB = "false";
var neckPainDB = "false";
var upperBackPainDB = "false";
//TABLE 7
var cardioVascularDB = "false";
var heartFailureDB = "false";
var strokeDB = "false";
var asthmaDB = "false";
var bronchitisDB = "false";
var diabetesDB = "false";
var gastrointestinalDB = "false";
var kidneyDB = "false";
var cancerDB = "false";
var epilepsyDB = "false";
var osteoporosisDB = "false";
var degenerativeJointDB = "false";
var depressionDB = "false";
var anxietyDB = "false";
var sleepApneaDB = "false";
var rheumatoidArthritisDB = "false";
var psoriaticArthritisDB = "false";
var noneDB = "false";
var shortOfBreathDB;
//TABLE 8
var mobilityOptionDB;
var selfcareOptionDB;
var usualActivitiesOptionDB;
var painOptionDB;
var anxietyOptionDB;
var qolScaleDB;
var sleepQ1OptionDB;
var sleepQ2OptionDB;
var sleepQ3OptionDB;
var sleepQ4OptionDB;
var moodOneOneDB;
var moodOneTwoDB;
var moodOneThreeDB;
var moodOneFourDB;
var moodOneFiveDB;
var moodOneSixDB;
var moodOneSevenDB;
var moodOneEightDB;
var moodOneNineDB;
var moodOneTenDB;
var moodTwoOneDB;
var moodTwoTwoDB;
var moodTwoThreeDB;
var moodTwoFourDB;
var moodTwoFiveDB;
var moodTwoSixDB;
var moodTwoSevenDB;
var moodTwoEightDB;




function elicitSlot(sessionAttributes, intentName, slots, slotToElicit, message) {
    return {
        sessionAttributes,
        dialogAction: {
            type: 'ElicitSlot',
            intentName,
            slots,
            slotToElicit,
            message,
        },
    };
}

function close(sessionAttributes, fulfillmentState, message) {
    return {
        sessionAttributes,
        dialogAction: {
            type: 'Close',
            fulfillmentState,
            message,
        },
    };
}

function delegate(sessionAttributes, slots) {
    return {
        sessionAttributes,
        dialogAction: {
            type: 'Delegate',
            slots,
        },
    };
}

// ---------------- Helper Functions --------------------------------------------------

function buildValidationResult(isValid, violatedSlot, messageContent) {
    if (messageContent == null) {
        return {
            isValid,
            violatedSlot,
        };
    }
    return {
        isValid,
        violatedSlot,
        message: {
            contentType: 'PlainText',
            content: messageContent
        },
    };
}

function isInArray(value, array) {
    for (var i = 0; i < array.length; i++) {
        if (value.includes(array[i])) {
            return true;
        }
    }
    return false;
}

function validateQuestionnaire5(a18One, a18Two, a18Three, a18Four, a18Five, a18Six, a18Seven, a18Eight, mostImportantActivity, miaValue, sitesOfPain, diseases, breath, mobilityQOL, selfCareQOL, usualActivitiesQOL, painQOL, anxietyQOL, healthToday, sleepFirst, sleepSecond, sleepThird, sleepFourth, moodFirst, moodSecond, moodThird, moodFourth, moodFifth, moodSixth, moodSeventh, moodEighth, moodNinth, moodTenth, moodTwoFirst, moodTwoSecond, moodTwoThird, moodTwoFourth, moodTwoFifth, moodTwoSixth, moodTwoSeventh, moodTwoEighth, reaction) {

    if (a18One) {
        if (a18One >= 0 && a18One <= 10) {
            perceptionsQ1DB = a18One;
        } else {
            return buildValidationResult(false, 'GetFirstAnswerPageEighteen', `You have to tick a number between 0 and 10.`);
        }
    }
    if (a18Two) {
        if (a18Two >= 0 && a18Two <= 10) {
            perceptionsQ2DB = a18Two;
        } else {
            return buildValidationResult(false, 'GetSecondAnswerPageEighteen', `You have to tick a number between 0 and 10.`);
        }
    }
    if (a18Three) {
        if (a18Three >= 0 && a18Three <= 10) {
            perceptionsQ3DB = a18Three;
        } else {
            return buildValidationResult(false, 'GetThirdAnswerPageEighteen', `You have to tick a number between 0 and 10.`);
        }
    }
    if (a18Four) {
        if (a18Four >= 0 && a18Four <= 10) {
            perceptionsQ4DB = a18Four;
        } else {
            return buildValidationResult(false, 'GetFourthAnswerPageEighteen', `You have to tick a number between 0 and 10.`);
        }
    }
    if (a18Five) {
        if (a18Five >= 0 && a18Five <= 10) {
            perceptionsQ5DB = a18Five;
        } else {
            return buildValidationResult(false, 'GetFifthAnswerPageEighteen', `You have to tick a number between 0 and 10.`);
        }
    }
    if (a18Six) {
        if (a18Six >= 0 && a18Six <= 10) {
            perceptionsQ6DB = a18Six;
        } else {
            return buildValidationResult(false, 'GetSixthAnswerPageEighteen', `You have to tick a number between 0 and 10.`);
        }
    }
    if (a18Seven) {
        if (a18Seven >= 0 && a18Seven <= 10) {
            perceptionsQ7DB = a18Seven;
        } else {
            return buildValidationResult(false, 'GetSeventhAnswerPageEighteen', `You have to tick a number between 0 and 10.`);
        }
    }
    if (a18Eight) {
        if (a18Eight >= 0 && a18Eight <= 10) {
            perceptionsQ8DB = a18Eight;
        } else {
            return buildValidationResult(false, 'GetEighthAnswerPageEighteen', `You have to tick a number between 0 and 10.`);
        }
    }
    

    if (mostImportantActivity) {
       activityDB = mostImportantActivity;
    }
    
    if(miaValue){
        if (miaValue >= 0 && miaValue <= 10) {
            activityNumberDB = miaValue;
        } else {
            return buildValidationResult(false, 'GetMostImportantActivityValue', `You have to tick a number between 0 and 10.`);
        }
    }
    
    const sites = ['neck', 'back', 'hip', 'thigh', 'ankle', 'feet', 'foot', 'shoulder', 'elbow', 'wrist', 'hand', 'knee', 'arm', 'leg', 'no'];
    if (sitesOfPain) {
        if (isInArray(sitesOfPain, sites) || cptSOP > 0) {
            if (sitesOfPain.includes("back") || cptSOP > 0) {
                if (cptSOP == 0) {
                    cptSOP = 1;
                    return buildValidationResult(false, 'GetSitesOfPain', `Is it a pain in your lower or upper back ?`);
                } else {
                    if (sitesOfPain.includes("lower")) {
                        lowerBackPainDB = "true";
                        cptSOP = 0;
                        return buildValidationResult(false, 'GetSitesOfPain', `Okay. Any other sites ?`);
                    } else if (sitesOfPain.includes("upper")) {
                        upperBackPainDB = "true";
                        cptSOP = 0;
                        return buildValidationResult(false, 'GetSitesOfPain', `Okay. Any other sites ?`);
                    } else {
                        return buildValidationResult(false, 'GetSitesOfPain', `I am sorry, I don't get it. Is it a pain in your lower or upper back ?`);
                    }
                }
            } else if (sitesOfPain.includes("neck")) {
                neckPainDB = "true";
                return buildValidationResult(false, 'GetSitesOfPain', `Okay. Any other sites ?`);
            } else if (sitesOfPain.includes("hip")) {
                hipsThighsPainDB = "true";
                return buildValidationResult(false, 'GetSitesOfPain', `Okay. Any other sites ?`);
            } else if (sitesOfPain.includes("thigh")) {
                hipsThighsPainDB = "true";
                return buildValidationResult(false, 'GetSitesOfPain', `Okay. Any other sites ?`);
            } else if (sitesOfPain.includes("ankle")) {
                anklesFeetPainDB = "true";
                return buildValidationResult(false, 'GetSitesOfPain', `Okay. Any other sites ?`);
            } else if (sitesOfPain.includes("foot") || sitesOfPain.includes("feet")) {
                anklesFeetPainDB = "true";
                return buildValidationResult(false, 'GetSitesOfPain', `Okay. Any other sites ?`);
            } else if (sitesOfPain.includes("shoulder")) {
                shouldersPainDB = "true";
                return buildValidationResult(false, 'GetSitesOfPain', `Okay. Any other sites ?`);
            } else if (sitesOfPain.includes("elbow")) {
                elbowsPainDB = "true";
                return buildValidationResult(false, 'GetSitesOfPain', `Okay. Any other sites ?`);
            } else if (sitesOfPain.includes("wrist")) {
                wristsHandsPainDB = "true";
                return buildValidationResult(false, 'GetSitesOfPain', `Okay. Any other sites ?`);
            } else if (sitesOfPain.includes("hand")) {
                wristsHandsPainDB = "true";
                return buildValidationResult(false, 'GetSitesOfPain', `Okay. Any other sites ?`);
            } else if (sitesOfPain.includes("knee")) {
                kneesPainDB = "true";
                return buildValidationResult(false, 'GetSitesOfPain', `Okay. Any other sites ?`);
            } else if (sitesOfPain.includes("arm")) {
                shouldersPainDB = "true";
                elbowsPainDB = "true";
                wristsHandsPainDB = "true";
                return buildValidationResult(false, 'GetSitesOfPain', `Okay. Any other sites ?`);
            } else if (sitesOfPain.includes("leg")) {
                kneesPainDB = "true";
                anklesFeetPainDB = "true";
                hipsThighsPainDB = "true";
                return buildValidationResult(false, 'GetSitesOfPain', `Okay. Any other sites ?`);
            } else if (sitesOfPain.includes("no")) {

            }
        } else {
            return buildValidationResult(false, 'GetSitesOfPain', `I am sorry, I don't know this part of the body. Can you repeat please ?`);
        }
    }

    if (diseases) {
        if (diseases.includes("Cardio vascular") || diseases.includes("heart attack") || diseases.includes("angina pectoris") || diseases.includes("heart disease")) {
            cardioVascularDB = "true";
            return buildValidationResult(false, 'GetDiseases', `Okay. Do you have any other disease ?`);
        } else if (diseases.includes("heart failure")) {
            heartFailureDB = "true";
            return buildValidationResult(false, 'GetDiseases', `Okay. Do you have any other disease ?`);
        } else if (diseases.includes("haemorrhage") || diseases.includes("stroke")) {
            strokeDB = "true";
            return buildValidationResult(false, 'GetDiseases', `Okay. Do you have any other disease ?`);
        } else if (diseases.includes("asthma")) {
            asthmaDB = "true";
            return buildValidationResult(false, 'GetDiseases', `Okay. Do you have any other disease ?`);
        } else if (diseases.includes("bronchitis") || diseases.includes("emphysema") || diseases.includes("pulmonary") || diseases.includes("COPD")) {
            bronchitisDB = "true";
            return buildValidationResult(false, 'GetDiseases', `Okay. Do you have any other disease ?`);
        } else if (diseases.includes("diabetes")) {
            diabetesDB = "true";
            return buildValidationResult(false, 'GetDiseases', `Okay. Do you have any other disease ?`);
        } else if (diseases.includes("Gastrointestinal problems") || diseases.includes("constipation") || diseases.includes("diarrhoea") || diseases.includes("bloating") || diseases.includes("constipation") || diseases.includes("Crohn's disease") || diseases.includes("coeliac disease")) {
            gastrointestinalDB = "true";
            return buildValidationResult(false, 'GetDiseases', `Okay. Do you have any other disease ?`);
        } else if (diseases.includes("Kidney disease")) {
            kidneyDB = "true";
            return buildValidationResult(false, 'GetDiseases', `Okay. Do you have any other disease ?`);
        } else if (diseases.includes("cancer")) {
            cancerDB = "true";
            return buildValidationResult(false, 'GetDiseases', `Okay. Do you have any other disease ?`);
        } else if (diseases.includes("epilepsy")) {
            epilepsyDB = "true";
            return buildValidationResult(false, 'GetDiseases', `Okay. Do you have any other disease ?`);
        } else if (diseases.includes("Osteoporosis")) {
            osteoporosisDB = "true";
            return buildValidationResult(false, 'GetDiseases', `Okay. Do you have any other disease ?`);
        } else if (diseases.includes("Degenerative joint") || diseases.includes("osteoarthritis")) {
            degenerativeJointDB = "true";
            return buildValidationResult(false, 'GetDiseases', `Okay. Do you have any other disease ?`);
        } else if (diseases.includes("Depression")) {
            depressionDB = "true";
            return buildValidationResult(false, 'GetDiseases', `Okay. Do you have any other disease ?`);
        } else if (diseases.includes("Anxiety")) {
            anxietyDB = "true";
            return buildValidationResult(false, 'GetDiseases', `Okay. Do you have any other disease ?`);
        } else if (diseases.includes("Sleep apnea") || diseases.includes("narcolepsy") || diseases.includes("restless legs")) {
            sleepApneaDB = "true";
            return buildValidationResult(false, 'GetDiseases', `Okay. Do you have any other disease ?`);
        } else if (diseases.includes("restless legs")) {
            sleepApneaDB = "true";
            return buildValidationResult(false, 'GetDiseases', `Okay. Do you have any other disease ?`);
        } else if (diseases.includes("Rheumatoid")) {
            rheumatoidArthritisDB = "true";
            return buildValidationResult(false, 'GetDiseases', `Okay. Do you have any other disease ?`);
        } else if (diseases.includes("Psoriatic") || diseases.includes("psoriasis")) {
            psoriaticArthritisDB = "true";
            return buildValidationResult(false, 'GetDiseases', `Okay. Do you have any other disease ?`);
        } else if (diseases.includes("other")) {
            otherDB = "true";
            return buildValidationResult(false, 'GetDiseases', `Okay. Do you have any other disease ?`);
        } else if (diseases.includes("no")) {

        } else if (diseases.includes("none")) {
            noneDB = "true";
        } else {
            return buildValidationResult(false, 'GetDiseases', `Uh, sorry, I don't know this disease. Please repeat.`);
        }
    }

    if (breath) {
        if (breath.includes("yes")) {
            shortOfBreathDB = "true";
        } else if (breath.includes("no")) {
            shortOfBreathDB = "false";
        } else {
            return buildValidationResult(false, 'GetBreath', `I am sorry, I didn't understand. Answer yes or no please.`);
        }
    }

    if (mobilityQOL) {
        if (mobilityQOL.includes("good") || cptMobilityQOLGood > 0) {
            if (cptMobilityQOLGood == 0) {
                cptMobilityQOLGood = 1;
                return buildValidationResult(false, 'GetMobilityQOL', `Do you have no problems at all, or slight problems ?`);
            } else {
                if (mobilityQOL.includes("no")) {
                    mobilityOptionDB = 1;
                } else if (mobilityQOL.includes("slight")) {
                    mobilityOptionDB = 2;
                } else {
                    return buildValidationResult(false, 'GetMobilityQOL', `Sorry I didn't get it. Do you have no problems at all, or slight problems ?`);
                }
            }
        } else if (mobilityQOL.includes("bad") || cptMobilityQOLBad > 0) {
            if (cptMobilityQOLBad == 0) {
                cptMobilityQOLBad = 1;
                return buildValidationResult(false, 'GetMobilityQOL', `Are you able to walk ?`);
            } else {
                if (mobilityQOL.includes("yes")) {
                    mobilityOptionDB = 4;
                } else if (mobilityQOL.includes("no")) {
                    mobilityOptionDB = 5;
                } else {
                    return buildValidationResult(false, 'GetMobilityQOL', `Sorry I didn't get it. Are you able to walk ?`);
                }
            }
        } else if (mobilityQOL.includes("neutral")) {
            mobilityOptionDB = 3;
        } else {
            return buildValidationResult(false, 'GetMobilityQOL', `I am sorry, I did not understand what you said. Please repeat..`);
        }
    }

    if (selfCareQOL) {
        if (selfCareQOL.includes("good") || cptSelfCareQOLGood > 0) {
            if (cptSelfCareQOLGood == 0) {
                cptSelfCareQOLGood = 1;
                return buildValidationResult(false, 'GetSelfCareQOL', `Do you have no problems at all, or slight problems ?`);
            } else {
                if (selfCareQOL.includes("no")) {
                    selfcareOptionDB = 1;
                } else if (selfCareQOL.includes("slight")) {
                    selfcareOptionDB = 2;
                } else {
                    return buildValidationResult(false, 'GetSelfCareQOL', `Sorry I didn't get it. Do you have no problems at all, or slight problems ?`);
                }
            }
        } else if (selfCareQOL.includes("bad") || cptSelfCareQOLBad > 0) {
            if (cptSelfCareQOLBad == 0) {
                cptSelfCareQOLBad = 1;
                return buildValidationResult(false, 'GetSelfCareQOL', `Are you able to wash or dress yourself ?`);
            } else {
                if (selfCareQOL.includes("yes")) {
                    selfcareOptionDB = 4;
                } else if (selfCareQOL.includes("no")) {
                    selfcareOptionDB = 5;
                } else {
                    return buildValidationResult(false, 'GetSelfCareQOL', `Sorry I didn't get it. Are you able to wash or dress yourself ?`);
                }
            }
        } else if (selfCareQOL.includes("neutral")) {
            selfcareOptionDB = 3;
        } else {
            return buildValidationResult(false, 'GetSelfCareQOL', `I am sorry, I did not understand what you said. Please repeat..`);

        }
    }

    if (usualActivitiesQOL) {
        if (usualActivitiesQOL.includes("good") || cptUsualActivitiesQOLGood > 0) {
            if (cptUsualActivitiesQOLGood == 0) {
                cptUsualActivitiesQOLGood = 1;
                return buildValidationResult(false, 'GetUsualActivityQOL', `Do you have no problems at all, or slight problems ?`);
            } else {
                if (usualActivitiesQOL.includes("no")) {
                    usualActivitiesOptionDB = 1;
                } else if (usualActivitiesQOL.includes("slight")) {
                    usualActivitiesOptionDB = 2;
                } else {
                    return buildValidationResult(false, 'GetUsualActivityQOL', `Sorry I didn't get it. Do you have no problems at all, or slight problems ?`);
                }
            }
        } else if (usualActivitiesQOL.includes("bad") || cptUsualActivitiesQOLBad > 0) {
            if (cptUsualActivitiesQOLBad == 0) {
                cptUsualActivitiesQOLBad = 1;
                return buildValidationResult(false, 'GetUsualActivityQOL', `Are you able to do your usual activities ?`);
            } else {
                if (usualActivitiesQOL.includes("yes")) {
                    usualActivitiesOptionDB = 4;
                } else if (usualActivitiesQOL.includes("no")) {
                    usualActivitiesOptionDB = 5;
                } else {
                    return buildValidationResult(false, 'GetUsualActivityQOL', `Sorry I didn't get it. Are you able to do your usual activities ?`);
                }
            }
        } else if (usualActivitiesQOL.includes("neutral")) {
            usualActivitiesOptionDB = 3;
        } else {
            return buildValidationResult(false, 'GetUsualActivityQOL', `I am sorry, I did not understand what you said. Please repeat..`);
        }
    }

    if (painQOL) {
        if (painQOL.includes("good") || cptPainQOLGood > 0) {
            if (cptPainQOLGood == 0) {
                cptPainQOLGood = 1;
                return buildValidationResult(false, 'GetPainQOL', `Do you have no problems at all, or slight problems ?`);
            } else {
                if (painQOL.includes("no")) {
                    painOptionDB = 1;
                } else if (painQOL.includes("slight")) {
                    painOptionDB = 2;
                } else {
                    return buildValidationResult(false, 'GetPainQOL', `Sorry I didn't get it. Do you have no problems at all, or slight problems ?`);
                }
            }
        } else if (painQOL.includes("bad") || cptPainQOLBad > 0) {
            if (cptPainQOLBad == 0) {
                cptPainQOLBad = 1;
                return buildValidationResult(false, 'GetPainQOL', `Is it an extreme pain ?`);
            } else {
                if (painQOL.includes("yes")) {
                    painOptionDB = 5;
                } else if (painQOL.includes("no")) {
                    painOptionDB = 4;
                } else {
                    return buildValidationResult(false, 'GetPainQOL', `Sorry I didn't get it. Is it an extreme pain ?`);
                }
            }
        } else if (painQOL.includes("neutral")) {
            painOptionDB = 3;
        } else {
            return buildValidationResult(false, 'GetPainQOL', `I am sorry, I did not understand what you said. Please repeat..`);
        }
    }
    if (anxietyQOL) {
        if (anxietyQOL.includes("good") || cptAnxietyQOLGood > 0) {
            if (cptAnxietyQOLGood == 0) {
                cptAnxietyQOLGood = 1;
                return buildValidationResult(false, 'GetAnxietyQOL', `Do you have no problems at all, or slight problems ?`);
            } else {
                if (anxietyQOL.includes("no")) {
                    anxietyOptionDB = 1;
                } else if (anxietyQOL.includes("slight")) {
                    anxietyOptionDB = 2;
                } else {
                    return buildValidationResult(false, 'GetAnxietyQOL', `Sorry I didn't get it. Do you have no problems at all, or slight problems ?`);
                }
            }
        } else if (anxietyQOL.includes("bad") || cptAnxietyQOLBad > 0) {
            if (cptAnxietyQOLBad == 0) {
                cptAnxietyQOLBad = 1;
                return buildValidationResult(false, 'GetAnxietyQOL', `Are you extremeley anxious or depressed ?`);
            } else {
                if (anxietyQOL.includes("yes")) {
                    anxietyOptionDB = 5;
                } else if (anxietyQOL.includes("no")) {
                    anxietyOptionDB = 4;
                } else {
                    return buildValidationResult(false, 'GetAnxietyQOL', `Sorry I didn't get it. Are you extremeley anxious or depressed ?`);
                }
            }
        } else if (anxietyQOL.includes("neutral")) {
            anxietyOptionDB = 3;
        } else {
            return buildValidationResult(false, 'GetAnxietyQOL', `I am sorry, I did not understand what you said. Please repeat..`);
        }
    }

    if (healthToday) {
        if (healthToday >= 0 && healthToday <= 100) {
            qolScaleDB = healthToday;
        } else {
            return buildValidationResult(false, 'GetHealthToday', `This scale is numbered from 0 to 100.. Please tick a number between 0 and 100.`);
        }
    }

    if (sleepFirst) {
        if (sleepFirst.includes("seldom") || sleepFirst.includes("never")) {
            sleepQ1OptionDB = 1;
        } else if (sleepFirst.includes("sometimes")) {
            sleepQ1OptionDB = 2;
        } else if (sleepFirst.includes("several times") || sleepFirst.includes("everyday") || sleepFirst.includes("always") || sleepFirst.includes("often")) {
            sleepQ1OptionDB = 3;
        } else {
            return buildValidationResult(false, 'GetSleepFirstQuestion', `I'm sorry I don't get it. Is it seldom, sometimes or several times a week ?.`);
        }
    }

    if (sleepSecond) {
        if (sleepSecond.includes("seldom") || sleepSecond.includes("never")) {
            sleepQ2OptionDB = 1;
        } else if (sleepSecond.includes("sometimes")) {
            sleepQ2OptionDB = 2;
        } else if (sleepSecond.includes("several times") || sleepSecond.includes("everyday") || sleepSecond.includes("always") || sleepSecond.includes("often")) {
            sleepQ2OptionDB = 3;
        } else {
            return buildValidationResult(false, 'GetSleepSecondQuestion', `I'm sorry I don't get it. Is it seldom, sometimes or several times a week ?.`);
        }
    }

    if (sleepThird) {
        if (sleepThird.includes("seldom") || sleepThird.includes("never")) {
            sleepQ3OptionDB = 1;
        } else if (sleepThird.includes("sometimes")) {
            sleepQ3OptionDB = 2;
        } else if (sleepThird.includes("several times") || sleepThird.includes("everyday") || sleepThird.includes("always") || sleepThird.includes("often")) {
            sleepQ3OptionDB = 3;
        } else {
            return buildValidationResult(false, 'GetSleepThirdQuestion', `I'm sorry I don't get it. Is it seldom, sometimes or several times a week ?.`);
        }
    }

    if (sleepFourth) {
        if (sleepFourth.includes("seldom") || sleepFourth.includes("never")) {
            sleepQ4OptionDB = 1;
        } else if (sleepFourth.includes("sometimes")) {
            sleepQ4OptionDB = 2;
        } else if (sleepFourth.includes("several times") || sleepFourth.includes("everyday") || sleepFourth.includes("always") || sleepFourth.includes("often")) {
            sleepQ4OptionDB = 3;
        } else {
            return buildValidationResult(false, 'GetSleepFourthQuestion', `I'm sorry I don't get it. Is it seldom, sometimes or several times a week ?.`);
        }
    }

    if (moodFirst) {
        if (moodFirst >= 0 && moodFirst <= 4) {
            moodOneOneDB = moodFirst;
        } else {
            return buildValidationResult(false, 'GetMoodFirstQuestion', `You have to tick a number between 0 and 4.`);
        }
    }

    if (moodSecond) {
        if (moodSecond >= 0 && moodSecond <= 4) {
            moodOneTwoDB = moodSecond;
        } else {
            return buildValidationResult(false, 'GetMoodSecondQuestion', `You have to tick a number between 0 and 4.`);
        }
    }

    if (moodThird) {
        if (moodThird >= 0 && moodThird <= 4) {
            moodOneThreeDB = moodThird;
        } else {
            return buildValidationResult(false, 'GetMoodThirdQuestion', `You have to tick a number between 0 and 4.`);
        }
    }
    if (moodOneThreeDB == null) {
        moodOneThreeDB = 2;
    }

    if (moodFourth) {
        if (moodFourth >= 0 && moodFourth <= 4) {
            moodOneFourDB = moodFourth;
        } else {
            return buildValidationResult(false, 'GetMoodFourthQuestion', `You have to tick a number between 0 and 4.`);
        }
    }

    if (moodFifth) {
        if (moodFifth >= 0 && moodFifth <= 4) {
            moodOneFiveDB = moodFifth;
        } else {
            return buildValidationResult(false, 'GetMoodFifthQuestion', `You have to tick a number between 0 and 4.`);
        }
    }

    if (moodSixth) {
        if (moodSixth >= 0 && moodSixth <= 4) {
            moodOneSixDB = moodSixth;
        } else {
            return buildValidationResult(false, 'GetMoodSixthQuestion', `You have to tick a number between 0 and 4.`);
        }
    }

    if (moodSeventh) {
        if (moodSeventh >= 0 && moodSeventh <= 4) {
            moodOneSevenDB = moodSeventh;
        } else {
            return buildValidationResult(false, 'GetMoodSeventhQuestion', `You have to tick a number between 0 and 4.`);
        }
    }

    if (moodEighth) {
        if (moodEighth >= 0 && moodEighth <= 4) {
            moodOneEightDB = moodEighth;
        } else {
            return buildValidationResult(false, 'GetMoodEighthQuestion', `You have to tick a number between 0 and 4.`);
        }
    }

    if (moodNinth) {
        if (moodNinth >= 0 && moodNinth <= 4) {
            moodOneNineDB = moodNinth;
        } else {
            return buildValidationResult(false, 'GetMoodNinthQuestion', `You have to tick a number between 0 and 4.`);
        }
    }

    if (moodTenth) {
        if (moodTenth >= 0 && moodTenth <= 4) {
            moodOneTenDB = moodTenth;
        } else {
            return buildValidationResult(false, 'GetMoodTenthQuestion', `You have to tick a number between 0 and 4.`);
        }
    }

    if (moodTwoFirst) {
        if (moodTwoFirst >= 0 && moodTwoFirst <= 4) {
            moodTwoOneDB = moodTwoFirst;
        } else {
            return buildValidationResult(false, 'GetMoodTwoFirstQuestion', `You have to tick a number between 0 and 3.`);
        }
    }

    if (moodTwoSecond) {
        if (moodTwoSecond >= 0 && moodTwoSecond <= 4) {
            moodTwoTwoDB = moodTwoSecond;
        } else {
            return buildValidationResult(false, 'GetMoodTwoSecondQuestion', `You have to tick a number between 0 and 3.`);
        }
    }

    if (moodTwoThird) {
        if (moodTwoThird >= 0 && moodTwoThird <= 4) {
            moodTwoThreeDB = moodTwoThird;
        } else {
            return buildValidationResult(false, 'GetMoodTwoThirdQuestion', `You have to tick a number between 0 and 3.`);
        }
    }

    if (moodTwoFourth) {
        if (moodTwoFourth >= 0 && moodTwoFourth <= 4) {
            moodTwoFourDB = moodTwoFourth;
        } else {
            return buildValidationResult(false, 'GetMoodTwoFourthQuestion', `You have to tick a number between 0 and 3.`);
        }
    }

    if (moodTwoFifth) {
        if (moodTwoFifth >= 0 && moodTwoFifth <= 4) {
            moodTwoFiveDB = moodTwoFifth;
        } else {
            return buildValidationResult(false, 'GetMoodTwoFifthQuestion', `You have to tick a number between 0 and 3.`);
        }
    }

    if (moodTwoSixth) {
        if (moodTwoSixth >= 0 && moodTwoSixth <= 4) {
            moodTwoSixDB = moodTwoSixth;
        } else {
            return buildValidationResult(false, 'GetMoodTwoSixthQuestion', `You have to tick a number between 0 and 3.`);
        }
    }

    if (moodTwoSeventh) {
        if (moodTwoSeventh >= 0 && moodTwoSeventh <= 4) {
            moodTwoSevenDB = moodTwoSeventh;
        } else {
            return buildValidationResult(false, 'GetMoodTwoSeventhQuestion', `You have to tick a number between 0 and 3.`);
        }
    }

    if (moodTwoEighth) {
        if (moodTwoEighth >= 0 && moodTwoEighth <= 4) {
            moodTwoEightDB = moodTwoEighth;
            pool.getConnection(function(err, connection) {
                if (err) throw err; // You *MUST* handle err and not continue execution if
                // there is an error. this is a standard part of Node.js
                connection.query(`INSERT INTO UserInfo2 VALUES("${sessionID}",${aloneDB},${withOthersDB},${spouseDB},${parentsDB},${otherDB},${childUnderFiveDB},${childBetweenSixAndFifteenDB},${childOverFifteenDB},"${ethnicGroupDB}","${ethnicGroupBackgroundDB}",${educationalBackgroundOptionDB})`, function(error, results, fields) {
                    connection.release();
                    if (error)
                        throw error;

                });
            });
            pool.getConnection(function(err, connection) {
                if (err) throw err; // You *MUST* handle err and not continue execution if
                // there is an error. this is a standard part of Node.js
                connection.query(`INSERT INTO UserInfo1 VALUES("${sessionID}",${ageDB},"${metricSystemDB}","${gendDB}",${heightDB},${weightDB})`, function(error, results, fields) {
                    connection.release();
                    if (error)
                        throw error;
                });
            });
            pool.getConnection(function(err, connection) {
                if (err) throw err; // You *MUST* handle err and not continue execution if
                // there is an error. this is a standard part of Node.js
                connection.query(`INSERT INTO UserInfo3 VALUES("${sessionID}",${employedDB},${employmentOptionDB},${averageLBPDB},${worstLBPDB},${lengthTimeEpisodeDB},"${totalLengthTimeDB}",${workActivityReducedDB},${leisureActivityReducedDB},${painMedicationDaysDB})`, function(error, results, fields) {
                    connection.release();
                    if (error)
                        throw error;

                });
            });
            pool.getConnection(function(err, connection) {
                if (err) throw err; // You *MUST* handle err and not continue execution if
                // there is an error. this is a standard part of Node.js
                connection.query(`INSERT INTO UserInfo4 VALUES("${sessionID}",${agree1DB},${agree2DB},${agree3DB},${agree4DB},${agree5DB},${agree6DB},${agree7DB},${agree8DB},${agree9DB},${agree10DB},${agree11DB},${agree12DB},${agree13DB},${agree14DB},${agree15DB},${agree16DB},${agree17DB},${agree18DB},${agree19DB},${agree20DB},${agree21DB},${agree22DB},${agree23DB},${agree24DB})`, function(error, results, fields) {
                    connection.release();
                    if (error)
                        throw error;
                });
            });

            pool.getConnection(function(err, connection) {
                if (err) throw err; // You *MUST* handle err and not continue execution if
                // there is an error. this is a standard part of Node.js
                connection.query(`INSERT INTO UserInfo5 VALUES("${sessionID}",${levelPhysicalActivityDB},${beliefsQ1DB},${beliefsQ2DB},${beliefsQ3DB},${beliefsQ4DB},${beliefsQ5DB},${confidenceQ1DB},${confidenceQ2DB},${confidenceQ3DB},${confidenceQ4DB},${confidenceQ5DB},${confidenceQ6DB},${confidenceQ7DB},${confidenceQ8DB},${confidenceQ9DB},${confidenceQ10DB})`, function(error, results, fields) {
                    connection.release();
                    if (error)
                        throw error;
                });
            });
            pool.getConnection(function(err, connection) {
                if (err) throw err; // You *MUST* handle err and not continue execution if
                // there is an error. this is a standard part of Node.js
                connection.query(`INSERT INTO UserInfo6 VALUES("${sessionID}",${perceptionsQ1DB},${perceptionsQ2DB},${perceptionsQ3DB},${perceptionsQ4DB},${perceptionsQ5DB},${perceptionsQ6DB},${perceptionsQ7DB},${perceptionsQ8DB},"${activityDB}",${activityNumberDB},${kneesPainDB},${wristsHandsPainDB},${elbowsPainDB},${shouldersPainDB},${anklesFeetPainDB},${hipsThighsPainDB},${lowerBackPainDB},${upperBackPainDB},${neckPainDB})`, function(error, results, fields) {
                    connection.release();
                    if (error)
                        throw error;
                });
            });
            pool.getConnection(function(err, connection) {
                if (err) throw err; // You *MUST* handle err and not continue execution if
                // there is an error. this is a standard part of Node.js
                connection.query(`INSERT INTO UserInfo7 VALUES("${sessionID}",${cardioVascularDB},${heartFailureDB},${strokeDB},${asthmaDB},${bronchitisDB},${diabetesDB},${gastrointestinalDB},${kidneyDB},${cancerDB},${epilepsyDB},${osteoporosisDB},${degenerativeJointDB},${depressionDB},${anxietyDB},${sleepApneaDB},${rheumatoidArthritisDB},${psoriaticArthritisDB},${noneDB},${shortOfBreathDB})`, function(error, results, fields) {
                    connection.release();
                    if (error)
                        throw error;
                });
            });
            pool.getConnection(function(err, connection) {
                if (err) throw err; // You *MUST* handle err and not continue execution if
                // there is an error. this is a standard part of Node.js
                connection.query(`INSERT INTO UserInfo8 VALUES("${sessionID}",${mobilityOptionDB},${selfcareOptionDB},${usualActivitiesOptionDB},${painOptionDB},${anxietyOptionDB},${qolScaleDB},${sleepQ1OptionDB},${sleepQ2OptionDB},${sleepQ3OptionDB},${sleepQ4OptionDB},${moodOneOneDB},${moodOneTwoDB},${moodOneThreeDB},${moodOneFourDB},${moodOneFiveDB},${moodOneSixDB},${moodOneSevenDB},${moodOneEightDB},${moodOneNineDB},${moodOneTenDB},${moodTwoOneDB},${moodTwoTwoDB},${moodTwoThreeDB},${moodTwoFourDB},${moodTwoFiveDB},${moodTwoSixDB},${moodTwoSevenDB},${moodTwoEightDB})`, function(error, results, fields) {
                    connection.destroy();
                    if (error)
                        throw error;
                });
            });
        } else {
            return buildValidationResult(false, 'GetMoodTwoEighthQuestion', `You have to tick a number between 0 and 3.`);
        }
    }

    if (reaction) {

    }
    return buildValidationResult(true, null, null);
}

function validateQuestionnaire4(getLevel, aOne, aTwo, aThree, aFour, aFive, aOneBis, aTwoBis, aThreeBis, aFourBis, aFiveBis, aSixBis, aSevenBis, aEightBis, aNineBis, aTenBis) {

    if (getLevel) {
        if (getLevel.includes("no") || cptLevel > 0) {
            if (cptLevel == 0) {
                cptLevel = 1;
                return buildValidationResult(false, 'GetLevel', `Okay. Then can you do regular physical activity and training ? Yes or No ?`);
            } else {
                if (getLevel.includes("no") || cptLevel > 1) {
                    if (cptLevel == 1) {
                        cptLevel = 2;
                        return buildValidationResult(false, 'GetLevel', `Okay. Then can you do some physical activity during at least 4 hours per week ? Yes or No ?`);
                    } else {
                        if (getLevel.includes("no")) {
                            levelPhysicalActivityDB = 1;
                        } else if (getLevel.includes("yes")) {
                            levelPhysicalActivityDB = 2;
                        }
                    }
                } else if (getLevel.includes("yes")) {
                    levelPhysicalActivityDB = 3;
                }
            }
        } else if (getLevel.includes("yes")) {
            levelPhysicalActivityDB = 4;
        }
    }

    if (aOne) {
        if (aOne >= 0 && aOne <= 6) {
            beliefsQ1DB = aOne;
        } else {
            return buildValidationResult(false, 'GetFirstAnswerPageSixteen', `Please tick a number between 0 and 6.`);
        }
    }
    if (aTwo) {
        if (aTwo >= 0 && aTwo <= 6) {
            beliefsQ2DB = aTwo;
        } else {
            return buildValidationResult(false, 'GetSecondAnswerPageSixteen', `Please tick a number between 0 and 6.`);
        }
    }
    if (aThree) {
        if (aThree >= 0 && aThree <= 6) {
            beliefsQ3DB = aThree;
        } else {
            return buildValidationResult(false, 'GetThirdAnswerPageSixteen', `Please tick a number between 0 and 6.`);
        }
    }
    if (aFour) {
        if (aFour >= 0 && aFour <= 6) {
            beliefsQ4DB = aFour;
        } else {
            return buildValidationResult(false, 'GetFourthAnswerPageSixteen', `Please tick a number between 0 and 6.`);
        }
    }
    if (aFive) {
        if (aFive >= 0 && aFive <= 6) {
            beliefsQ5DB = aFive;
        } else {
            return buildValidationResult(false, 'GetFifthAnswerPageSixteen', `Please tick a number between 0 and 6.`);
        }
    }

    if (aOneBis) {
        if (aOneBis >= 0 && aOneBis <= 6) {
            confidenceQ1DB = aOneBis;
        } else {
            return buildValidationResult(false, 'GetFirstAnswerPageSeventeen', `Please tick a number between 0 and 6.`);
        }
    }
    if (aTwoBis) {
        if (aTwoBis >= 0 && aTwoBis <= 6) {
            confidenceQ2DB = aTwoBis;
        } else {
            return buildValidationResult(false, 'GetSecondAnswerPageSeventeen', `Please tick a number between 0 and 6.`);
        }
    }
    if (aThreeBis) {
        if (aThreeBis >= 0 && aThreeBis <= 6) {
            confidenceQ3DB = aThreeBis;
        } else {
            return buildValidationResult(false, 'GetThirdAnswerPageSeventeen', `Please tick a number between 0 and 6.`);
        }
    }
    if (aFourBis) {
        if (aFourBis >= 0 && aFourBis <= 6) {
            confidenceQ4DB = aFourBis;
        } else {
            return buildValidationResult(false, 'GetFourthAnswerPageSeventeen', `Please tick a number between 0 and 6.`);
        }
    }
    if (aFiveBis) {
        if (aFiveBis >= 0 && aFiveBis <= 6) {
            confidenceQ5DB = aFiveBis;
        } else {
            return buildValidationResult(false, 'GetFifthAnswerPageSeventeen', `Please tick a number between 0 and 6.`);
        }
    }
    if (aSixBis) {
        if (aSixBis >= 0 && aSixBis <= 6) {
            confidenceQ6DB = aSixBis;
        } else {
            return buildValidationResult(false, 'GetSixthAnswerPageSeventeen', `Please tick a number between 0 and 6.`);
        }
    }
    if (aSevenBis) {
        if (aSevenBis >= 0 && aSevenBis <= 6) {
            confidenceQ7DB = aSevenBis;
        } else {
            return buildValidationResult(false, 'GetSeventhAnswerPageSeventeen', `Please tick a number between 0 and 6.`);
        }
    }
    if (aEightBis) {
        if (aEightBis >= 0 && aEightBis <= 6) {
            confidenceQ8DB = aEightBis;
        } else {
            return buildValidationResult(false, 'GetEighthAnswerPageSeventeen', `Please tick a number between 0 and 6.`);
        }
    }
    if (aNineBis) {
        if (aNineBis >= 0 && aNineBis <= 6) {
            confidenceQ9DB = aNineBis;
        } else {
            return buildValidationResult(false, 'GetNinthAnswerPageSeventeen', `Please tick a number between 0 and 6.`);
        }
    }
    if (aTenBis) {
        if (aTenBis >= 0 && aTenBis <= 6) {
            confidenceQ10DB = aTenBis;
        } else {
            return buildValidationResult(false, 'GetTenthAnswerPageSeventeen', `Please tick a number between 0 and 6.`);
        }
    }
    return buildValidationResult(true, null, null);
}

function validateQuestionnaire3(qOne, qTwo, qThree, qFour, qFive, qSix, qSeven, qEight, qNine, qTen, qEleven, qTwelve, qThirteen, qFourteen, qFifteen, qSixteen, qSeventeen, qEighteen, qNineteen, qTwenty, qTwentyOne, qTwentyTwo, qTwentyThree, qTwentyFour) {

    if (qOne) {
        if (qOne.includes("agree") && !(qOne.includes("disagree"))) {
            agree1DB = "true";
        } else if (qOne.includes("disagree")) {
            agree1DB = "false";
        } else {
            return buildValidationResult(false, 'GetFirstAnswer', `I didn't understand. Can you repeat please ?`);
        }
    }
    if (qTwo) {
        if (qTwo.includes("agree") && !(qTwo.includes("disagree"))) {
            agree2DB = "true";
        } else if (qTwo.includes("disagree")) {
            agree2DB = "false";
        } else {
            return buildValidationResult(false, 'GetSecondAnswer', `I didn't understand. Can you repeat please ?`);
        }
    }
    if (qThree) {
        if (qThree.includes("agree") && !(qThree.includes("disagree"))) {
            agree3DB = "true";
        } else if (qThree.includes("disagree")) {
            agree3DB = "false";
        } else {
            return buildValidationResult(false, 'GetThirdAnswer', `I didn't understand. Can you repeat please ?`);
        }
    }
    if (qFour) {
        if (qFour.includes("agree") && !(qFour.includes("disagree"))) {
            agree4DB = "true";
        } else if (qFour.includes("disagree")) {
            agree4DB = "false";
        } else {
            return buildValidationResult(false, 'GetFourthAnswer', `I didn't understand. Can you repeat please ?`);
        }
    }
    if (qFive) {
        if (qFive.includes("agree") && !(qFive.includes("disagree"))) {
            agree5DB = "true";
        } else if (qFive.includes("disagree")) {
            agree5DB = "false";
        } else {
            return buildValidationResult(false, 'GetFifthAnswer', `I didn't understand. Can you repeat please ?`);
        }
    }
    if (qSix) {
        if (qSix.includes("agree") && !(qSix.includes("disagree"))) {
            agree6DB = "true";
        } else if (qSix.includes("disagree")) {
            agree6DB = "false";
        } else {
            return buildValidationResult(false, 'GetSixthAnswer', `I didn't understand. Can you repeat please ?`);
        }
    }
    if (qSeven) {
        if (qSeven.includes("agree") && !(qSeven.includes("disagree"))) {
            agree7DB = "true";
        } else if (qSeven.includes("disagree")) {
            agree7DB = "false";
        } else {
            return buildValidationResult(false, 'GetSeventhAnswer', `I didn't understand. Can you repeat please ?`);
        }
    }
    if (qEight) {
        if (qEight.includes("agree") && !(qEight.includes("disagree"))) {
            agree8DB = "true";
        } else if (qEight.includes("disagree")) {
            agree8DB = "false";
        } else {
            return buildValidationResult(false, 'GetEighthAnswer', `I didn't understand. Can you repeat please ?`);
        }
    }
    if (qNine) {
        if (qNine.includes("agree") && !(qNine.includes("disagree"))) {
            agree9DB = "true";
        } else if (qNine.includes("disagree")) {
            agree9DB = "false";
        } else {
            return buildValidationResult(false, 'GetNinthAnswer', `I didn't understand. Can you repeat please ?`);
        }
    }
    if (qTen) {
        if (qTen.includes("agree") && !(qTen.includes("disagree"))) {
            agree10DB = "true";
        } else if (qTen.includes("disagree")) {
            agree10DB = "false";
        } else {
            return buildValidationResult(false, 'GetAnswerTen', `I didn't understand. Can you repeat please ?`);
        }
    }
    if (qEleven) {
        if (qEleven.includes("agree") && !(qEleven.includes("disagree"))) {
            agree11DB = "true";
        } else if (qEleven.includes("disagree")) {
            agree11DB = "false";
        } else {
            return buildValidationResult(false, 'GetAnswerEleven', `I didn't understand. Can you repeat please ?`);
        }
    }
    if (qTwelve) {
        if (qTwelve.includes("agree") && !(qTwelve.includes("disagree"))) {
            agree12DB = "true";
        } else if (qTwelve.includes("disagree")) {
            agree12DB = "false";
        } else {
            return buildValidationResult(false, 'GetAnswerTwelve', `I didn't understand. Can you repeat please ?`);
        }
    }
    if (qThirteen) {
        if (qThirteen.includes("agree") && !(qThirteen.includes("disagree"))) {
            agree13DB = "true";
        } else if (qThirteen.includes("disagree")) {
            agree13DB = "false";
        } else {
            return buildValidationResult(false, 'GetAnswerThirteen', `I didn't understand. Can you repeat please ?`);
        }
    }
    if (qFourteen) {
        if (qFourteen.includes("agree") && !(qFourteen.includes("disagree"))) {
            agree14DB = "true";
        } else if (qFourteen.includes("disagree")) {
            agree14DB = "false";
        } else {
            return buildValidationResult(false, 'GetAnswerFourteen', `I didn't understand. Can you repeat please ?`);
        }
    }
    if (qFifteen) {
        if (qFifteen.includes("agree") && !(qFifteen.includes("disagree"))) {
            agree15DB = "true";
        } else if (qFifteen.includes("disagree")) {
            agree15DB = "false";
        } else {
            return buildValidationResult(false, 'GetAnswerFifteen', `I didn't understand. Can you repeat please ?`);
        }
    }
    if (qSixteen) {
        if (qSixteen.includes("agree") && !(qSixteen.includes("disagree"))) {
            agree16DB = "true";
        } else if (qSixteen.includes("disagree")) {
            agree16DB = "false";
        } else {
            return buildValidationResult(false, 'GetAnswerSixteen', `I didn't understand. Can you repeat please ?`);
        }
    }
    if (qSeventeen) {
        if (qSeventeen.includes("agree") && !(qSeventeen.includes("disagree"))) {
            agree17DB = "true";
        } else if (qSeventeen.includes("disagree")) {
            agree17DB = "false";
        } else {
            return buildValidationResult(false, 'GetAnswerSeventeen', `I didn't understand. Can you repeat please ?`);
        }
    }
    if (qEighteen) {
        if (qEighteen.includes("agree") && !(qEighteen.includes("disagree"))) {
            agree18DB = "true";
        } else if (qEighteen.includes("disagree")) {
            agree18DB = "false";
        } else {
            return buildValidationResult(false, 'GetAnswerEighteen', `I didn't understand. Can you repeat please ?`);
        }
    }
    if (qNineteen) {
        if (qNineteen.includes("agree") && !(qNineteen.includes("disagree"))) {
            agree19DB = "true";
        } else if (qNineteen.includes("disagree")) {
            agree19DB = "false";
        } else {
            return buildValidationResult(false, 'GetAnswerNineteen', `I didn't understand. Can you repeat please ?`);
        }
    }
    if (qTwenty) {
        if (qTwenty.includes("agree") && !(qTwenty.includes("disagree"))) {
            agree20DB = "true";
        } else if (qTwenty.includes("disagree")) {
            agree20DB = "false";
        } else {
            return buildValidationResult(false, 'GetAnswerTwenty', `I didn't understand. Can you repeat please ?`);
        }
    }
    if (qTwentyOne) {
        if (qTwentyOne.includes("agree") && !(qTwentyOne.includes("disagree"))) {
            agree21DB = "true";
        } else if (qTwentyOne.includes("disagree")) {
            agree21DB = "false";
        } else {
            return buildValidationResult(false, 'GetAnswerTwentyOne', `I didn't understand. Can you repeat please ?`);
        }
    }
    if (qTwentyTwo) {
        if (qTwentyTwo.includes("agree") && !(qTwentyTwo.includes("disagree"))) {
            agree22DB = "true";
        } else if (qTwentyTwo.includes("disagree")) {
            agree22DB = "false";
        } else {
            return buildValidationResult(false, 'GetAnswerTwentyTwo', `I didn't understand. Can you repeat please ?`);
        }
    }
    if (qTwentyThree) {
        if (qTwentyThree.includes("agree") && !(qTwentyThree.includes("disagree"))) {
            agree23DB = "true";
        } else if (qTwentyThree.includes("disagree")) {
            agree23DB = "false";
        } else {
            return buildValidationResult(false, 'GetAnswerTwentyThree', `I didn't understand. Can you repeat please ?`);
        }
    }
    if (qTwentyFour) {
        if (qTwentyFour.includes("agree") && !(qTwentyFour.includes("disagree"))) {
            agree24DB = "true";
        } else if (qTwentyFour.includes("disagree")) {
            agree24DB = "false";
        } else {
            return buildValidationResult(false, 'GetAnswerTwentyFour', `I didn't understand. Can you repeat please ?`);
        }
    }

    return buildValidationResult(true, null, null);
}

function validateQuestionnaire_Days(days, workActivity, leisureActivity, nonPrescriptionMedication) {

    if (days) {
        totalLengthTimeDB = days;
    }

    if (workActivity) {
        if (workActivity.includes("yes")) {
            workActivityReducedDB = "true";
        } else if (workActivity.includes("no")) {
            workActivityReducedDB = "false";
        }
    }

    if (leisureActivity) {
        if (leisureActivity.includes("yes")) {
            leisureActivityReducedDB = "true";
        } else if (leisureActivity.includes("no")) {
            leisureActivityReducedDB = "false";
        }
    }

    if (nonPrescriptionMedication) {
       if(nonPrescriptionMedication>=0 && nonPrescriptionMedication<=7){
           painMedicationDaysDB=nonPrescriptionMedication;
       } else {
            return buildValidationResult(false, 'GetNonPrescriptionMedication', `I am sorry. Can you repeat please ? How many days ?`);
        }
    }

    return buildValidationResult(true, null, null);
}

function validateQuestionnaire2(lifeStyle, ethnicGroup, schooling, job, avgBP, worstBP, painLength, lengthTest, workActivity, leisureActivity, nonPrescriptionMedication) {

    const parents = ['mom', 'mum', 'mummy', 'mommy', 'mother', 'parent', 'father', 'dad', 'daddy', 'papa', 'mama', 'parents'];
    const children = ['son', 'daughter', 'child', 'baby', 'kid', 'teenager', 'bambino'];
    const partner = ['wife', 'husband', 'spouse', 'companion', 'partner', 'boyfriend', 'girlfriend', 'fiancé', 'sweetheart', 'darling'];
    const underFive = ['one', 'two', 'three', 'four', 'five'];
    const betweenSixAndFifteen = ['six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'three', 'fourteen', 'fifteen'];

    if (lifeStyle) {
        if (lifeStyle.includes("other") || cptLifeStyle > 0) {
            aloneDB = "false";
            withOthersDB = "true";
            if (cptLifeStyle == 0) {
                cptLifeStyle = 1;
                return buildValidationResult(false, 'GetLifeStyle', `Please indicate me every person who is living with you one by one. Once finished, tell me \"that\'s all\".`);
            } else {
                if (isInArray(lifeStyle, parents) || lifeStyle.includes("brother") || lifeStyle.includes("sister")) {
                    parentsDB = "true";
                    return buildValidationResult(false, 'GetLifeStyle', `Okay good ! Any other person ?`);
                } else if (isInArray(lifeStyle, children) || cptLifeStyle == 2) {
                    if (cptLifeStyle == 1) {
                        cptLifeStyle = 2;
                        return buildValidationResult(false, 'GetLifeStyle', `How old is your child ?`);
                    } else {
                        if (isInArray(lifeStyle, underFive)) {
                            childUnderFiveDB = "true";
                        } else if (isInArray(lifeStyle, betweenSixAndFifteen)) {
                            childBetweenSixAndFifteenDB = "true";
                        } else {
                            childOverFifteenDB = "true";
                        }
                        cptLifeStyle = 1;
                        return buildValidationResult(false, 'GetLifeStyle', `Okay good ! Any other person ?`);
                    }
                } else if (isInArray(lifeStyle, partner)) {
                    spouseDB = "true";
                    return buildValidationResult(false, 'GetLifeStyle', `Okay good ! Any other person ?`);
                } else if (lifeStyle.includes("no") || lifeStyle.includes("that's all") || lifeStyle.includes("that is all")) {

                } else {
                    otherDB = "true";
                    return buildValidationResult(false, 'GetLifeStyle', `Okay good ! Any other person ?`);
                }
            }
        } else if (lifeStyle.includes("alone")) {
            aloneDB = "true";
            withOthersDB = "false";
        }
    }
    const ukCountry = ['wales', 'scotland', 'england', 'great britain', 'northern', 'welsh', 'scottish', 'british', 'english'];

    if (ethnicGroup) {
        if (ethnicGroup.includes("white") || cptEthnicGroupWhite > 0) {
            ethnicGroupDB = "white";
            if (cptEthnicGroupWhite == 0) {
                cptEthnicGroupWhite = 1;
                return buildValidationResult(false, 'GetEthnicGroup', `Okay ! Are you from the UK ?`);
            } else if (cptEthnicGroupWhite > 0) {
                if (ethnicGroup.includes("yes") || cptEthnicGroupWhite > 1) {
                    if (cptEthnicGroupWhite == 1) {
                        cptEthnicGroupWhite = 2;
                        return buildValidationResult(false, 'GetEthnicGroup', `Which country in the UK ?`);
                    } else if (cptEthnicGroupWhite == 2) {
                        cptEthnicGroupWhite = 0;
                        if (isInArray(ethnicGroup, ukCountry)) {
                            ethnicGroupBackgroundDB = "UK";
                        } else if (ethnicGroup.includes("irish") || ethnicGroup.includes("ireland")) {
                            ethnicGroupBackgroundDB = "irish";
                        } else if (ethnicGroup.includes("gypsy") || ethnicGroup.includes("traveller")) {
                            ethnicGroupBackgroundDB = "gypsy";
                        } else {
                            return buildValidationResult(false, 'GetEthnicGroup', `I don't know this country in the United Kingdom. What is your country of origin ?`);
                        }

                    }
                } else if (ethnicGroup.includes("no")) {
                    ethnicGroupBackgroundDB = "other";
                    cptEthnicGroupWhite = 0;
                }
            }
        } else if (ethnicGroup.includes("mixed") || ethnicGroup.includes("multiple") || cptEthnicGroupMixed > 0) {
            ethnicGroupDB = "mixed";
            if (cptEthnicGroupMixed == 0) {
                cptEthnicGroupMixed = 1;
                return buildValidationResult(false, 'GetEthnicGroup', `Okay ! What are your two ethnics group ?`);
            } else if (cptEthnicGroupMixed > 0) {
                if (ethnicGroup.includes("white") && ethnicGroup.includes("caribbean")) {
                    ethnicGroupBackgroundDB = "White and caribbean";
                    cptEthnicGroupMixed = 0;
                } else if (ethnicGroup.includes("white") && ethnicGroup.includes("africa")) {
                    ethnicGroupBackgroundDB = "White and african";
                    cptEthnicGroupMixed = 0;
                } else if (ethnicGroup.includes("white") && ethnicGroup.includes("asia")) {
                    ethnicGroupBackgroundDB = "White and asian";
                    cptEthnicGroupMixed = 0;
                } else {
                    ethnicGroupBackgroundDB = "other";
                    cptEthnicGroupMixed = 0;
                }
            }
        } else if (ethnicGroup.includes("asia") || cptEthnicGroupAsia > 0) {
            ethnicGroupDB = "asian";
            if (cptEthnicGroupAsia == 0) {
                cptEthnicGroupAsia = 1;
                return buildValidationResult(false, 'GetEthnicGroup', `Okay great ! Where are you from in Asia ?`);
            } else if (cptEthnicGroupAsia > 0) {
                if (ethnicGroup.includes("india")) {
                    ethnicGroupBackgroundDB = "india";
                    cptEthnicGroupAsia = 0;
                } else if (ethnicGroup.includes("pakistan")) {
                    ethnicGroupBackgroundDB = "pakistan";
                    cptEthnicGroupAsia = 0;
                } else if (ethnicGroup.includes("bangladesh")) {
                    ethnicGroupBackgroundDB = "bangladesh";
                    cptEthnicGroupAsia = 0;
                } else if (ethnicGroup.includes("china") || ethnicGroup.includes("chinese")) {
                    ethnicGroupBackgroundDB = "china";
                    cptEthnicGroupAsia = 0;
                } else {
                    ethnicGroupBackgroundDB = "other";
                    cptEthnicGroupAsia = 0;
                }
            }
        } else if (ethnicGroup.includes("africa") || ethnicGroup.includes("black") || ethnicGroup.includes("caribbean")) {
            ethnicGroupDB = "african/caribbean";
            if (ethnicGroup.includes("africa")) {
                ethnicGroupBackgroundDB = "africa";
            } else if (ethnicGroup.includes("caribbean")) {
                ethnicGroupBackgroundDB = "caribbean";
            } else {
                ethnicGroupBackgroundDB = "other";
            }
        } else if (ethnicGroup.includes("arab")) {
            ethnicGroupDB = "other";
            ethnicGroupBackgroundDB = "arab";
        }
    }

    if (schooling) {
        educationalBackgroundOptionDB = schooling;
    }

    if (job) {
        if ((job.includes("employed") && !(job.includes("unemployed"))) || cptUserJobE > 0) {
            employedDB = "true";
            if (cptUserJobE == 0) {
                cptUserJobE = 1;
                return buildValidationResult(false, 'GetUserJob', `Is it a part-time job, full-time job or a work in your house ? `);
            } else {
                if (job.includes("part time")) {
                    employmentOptionDB = 2;
                } else if (job.includes("full time")) {
                    employmentOptionDB = 1;
                } else {
                    employmentOptionDB = 3;
                }
            }
        } else if (job.includes("unemployed") || cptUserJobU > 0) {
            employedDB = "false";
            if (cptUserJobU == 0) {
                cptUserJobU = 1;
                return buildValidationResult(false, 'GetUserJob', `What is the reason of this unemployment ? Retirement, study, joblessness ? If it is an other reason, say "other reason".`);
            } else {
                if (job.includes("unemployed") || job.includes("jobless") || job.includes("unemployment")) {
                    employmentOptionDB = 1;
                } else if (job.includes("retirement") || job.includes("disable") || job.includes("disability")) {
                    employmentOptionDB = 2;
                } else if (job.includes("stud") || job.includes("education")) {
                    employmentOptionDB = 3;
                } else if (job.includes("other")) {
                    employmentOptionDB = 4;
                }
            }
        }
    }

    if (avgBP) {
        if (avgBP < 0 || avgBP > 10) {
            return buildValidationResult(false, 'GetAverageBackPain', `The value has to be between 0 and 10. Please try again. Indicate your average low back pain.`);
        } else {
            averageLBPDB = avgBP;
        }
    }

    if (worstBP) {
        if (worstBP < 0 || worstBP > 10) {
            return buildValidationResult(false, 'GetWorstBackPain', `The value has to be between 0 and 10. Please try again. Indicate your worst low back pain.`);
        } else {
            if (avgBP > worstBP) {
                return buildValidationResult(false, 'GetWorstBackPain', `The value has to be higher than the average value. Please try again. Indicate your worst low back pain.`);
            } else {
                worstLBPDB = worstBP;
            }
        }
    }

    if (painLength) {
        if (painLength < 1) {
            lengthTimeEpisodeDB = 1;
        } else if (painLength >= 1 && painLength <= 4) {
            lengthTimeEpisodeDB = 2;
        } else if (painLength >= 5 && painLength <= 12) {
            lengthTimeEpisodeDB = 3;
        } else {
            lengthTimeEpisodeDB = 4;
        }
    }

    if (lengthTest) {
        if (lengthTest.includes("yes")) {
            totalLengthTimeDB = "every day";
        } else if (lengthTest.includes("no")) {
            return buildValidationResult(false, 'GetTestEverydayLength', `Oh okay it is a good thing. Then around how many days have you had low back trouble during the last 12 months ?`);
        }
    }

    if (workActivity) {
        if (workActivity.includes("yes")) {
            workActivityReducedDB = "true";
        } else if (workActivity.includes("no")) {
            workActivityReducedDB = "false";
        }
    }

    if (leisureActivity) {
        if (leisureActivity.includes("yes")) {
            leisureActivityReducedDB = "true";
        } else if (leisureActivity.includes("no")) {
            leisureActivityReducedDB = "false";
        }
    }

     if (nonPrescriptionMedication) {
       if(nonPrescriptionMedication>=0 && nonPrescriptionMedication<=7){
           painMedicationDaysDB=nonPrescriptionMedication;
       } else {
            return buildValidationResult(false, 'GetNonPrescriptionMedication', `I am sorry. Can you repeat please ? How many days ?`);
        }
    }


    return buildValidationResult(true, null, null);
}

function validateHeightAndWeightMS(height, weight) {
    metricSystemDB="MS";
    if (height) {
        if (height >= 145 && height <= 215) {
            heightDB = height;
        } else {
            return buildValidationResult(false, 'GetHeight', `The height must be between 145 and 215 centimeters. Please repeat.`);
        }
    }

    if (weight) {
        if (weight >= 40 && weight <= 150) {
            weightDB = weight;
        } else {
            return buildValidationResult(false, 'GetWeight', `The weight must be between 40 and 150 kilos. Please repeat.`);
        }
    }

    return buildValidationResult(true, null, null);
}

function validateHeightAndWeightIS(feet, inches, weight) {
    metricSystemDB="IS";
    if (feet) {
        if (feet >= 5 && feet <= 7) {

        } else {
            return buildValidationResult(false, 'GetFeet', `The feet must be between 5 and 7. Please repeat.`);
        }
    }

    if (inches) {
        if (inches >= 0 && inches <= 11) {
            heightDB = feet + inches;
        } else {
            return buildValidationResult(false, 'GetInches', `The inches must be between 0 and 11. Please repeat.`);
        }
    }

    if (weight) {
        if (weight >= 88 && inches <= 330) {
            weightDB = weight;
        } else {
            return buildValidationResult(false, 'GetWeight', `The weight must be between 88 and 330 pounds. Please repeat.`);
        }
    }


    return buildValidationResult(true, null, null);
}

function validateQuestionnaire(age, gender) {
    if (age) {
        if (age < 18 || age > 99) {
            return buildValidationResult(false, 'GetAge', `Your age must be between 18 and 99 years old. How old are you ?`);
        } else {
            ageDB = age;
        }
    }

    if (gender) {
        if (!gender.includes("man") && !gender.includes("woman") && !gender.includes("male") && !gender.includes("female")) {
            return buildValidationResult(false, 'GetGender', `Hm.. \"${gender}\" ? Please enter a valid value. Are you a man or a woman ?`);
        } else {
            gendDB = "M";
            if (gender.includes("woman") || gender.includes("female")) {
                gendDB = "F";
            }
        }
    }
    return buildValidationResult(true, null, null);
}

function fillQuestionnaire5(intentRequest, callback) {

    const a18One = intentRequest.currentIntent.slots.GetFirstAnswerPageEighteen;
    const a18Two = intentRequest.currentIntent.slots.GetSecondAnswerPageEighteen;
    const a18Three = intentRequest.currentIntent.slots.GetThirdAnswerPageEighteen;
    const a18Four = intentRequest.currentIntent.slots.GetFourthAnswerPageEighteen;
    const a18Five = intentRequest.currentIntent.slots.GetFifthAnswerPageEighteen;
    const a18Six = intentRequest.currentIntent.slots.GetSixthAnswerPageEighteen;
    const a18Seven = intentRequest.currentIntent.slots.GetSeventhAnswerPageEighteen;
    const a18Eight = intentRequest.currentIntent.slots.GetEighthAnswerPageEighteen;
    const mostImportantActivity = intentRequest.currentIntent.slots.GetMostImportantActivity;
    const miaValue = intentRequest.currentIntent.slots.GetMostImportantActivityValue;
    const sitesOfPain = intentRequest.currentIntent.slots.GetSitesOfPain;
    const diseases = intentRequest.currentIntent.slots.GetDiseases;
    const breath = intentRequest.currentIntent.slots.GetBreath;
    const mobilityQOL = intentRequest.currentIntent.slots.GetMobilityQOL;
    const selfCareQOL = intentRequest.currentIntent.slots.GetSelfCareQOL;
    const usualActivitiesQOL = intentRequest.currentIntent.slots.GetUsualActivityQOL;
    const painQOL = intentRequest.currentIntent.slots.GetPainQOL;
    const anxietyQOL = intentRequest.currentIntent.slots.GetAnxietyQOL;
    const healthToday = intentRequest.currentIntent.slots.GetHealthToday;
    const sleepFirst = intentRequest.currentIntent.slots.GetSleepFirstQuestion;
    const sleepSecond = intentRequest.currentIntent.slots.GetSleepSecondQuestion;
    const sleepThird = intentRequest.currentIntent.slots.GetSleepThirdQuestion;
    const sleepFourth = intentRequest.currentIntent.slots.GetSleepFourthQuestion;
    const moodFirst = intentRequest.currentIntent.slots.GetMoodFirstQuestion;
    const moodSecond = intentRequest.currentIntent.slots.GetMoodSecondQuestion;
    const moodThird = intentRequest.currentIntent.slots.GetMoodThirdQuestion;
    const moodFourth = intentRequest.currentIntent.slots.GetMoodFourthQuestion;
    const moodFifth = intentRequest.currentIntent.slots.GetMoodFifthQuestion;
    const moodSixth = intentRequest.currentIntent.slots.GetMoodSixthQuestion;
    const moodSeventh = intentRequest.currentIntent.slots.GetMoodSeventhQuestion;
    const moodEighth = intentRequest.currentIntent.slots.GetMoodEighthQuestion;
    const moodNinth = intentRequest.currentIntent.slots.GetMoodNinthQuestion;
    const moodTenth = intentRequest.currentIntent.slots.GetMoodTenthQuestion;
    const moodTwoFirst = intentRequest.currentIntent.slots.GetMoodTwoFirstQuestion;
    const moodTwoSecond = intentRequest.currentIntent.slots.GetMoodTwoSecondQuestion;
    const moodTwoThird = intentRequest.currentIntent.slots.GetMoodTwoThirdQuestion;
    const moodTwoFourth = intentRequest.currentIntent.slots.GetMoodTwoFourthQuestion;
    const moodTwoFifth = intentRequest.currentIntent.slots.GetMoodTwoFifthQuestion;
    const moodTwoSixth = intentRequest.currentIntent.slots.GetMoodTwoSixthQuestion;
    const moodTwoSeventh = intentRequest.currentIntent.slots.GetMoodTwoSeventhQuestion;
    const moodTwoEighth = intentRequest.currentIntent.slots.GetMoodTwoEighthQuestion;
    const reaction = intentRequest.currentIntent.slots.GetReaction;
    const source = intentRequest.invocationSource;

    if (source === 'DialogCodeHook') {
        const slots = intentRequest.currentIntent.slots;
        const validationResult = validateQuestionnaire5(a18One, a18Two, a18Three, a18Four, a18Five, a18Six, a18Seven, a18Eight, mostImportantActivity, miaValue, sitesOfPain, diseases, breath, mobilityQOL, selfCareQOL, usualActivitiesQOL, painQOL, anxietyQOL, healthToday, sleepFirst, sleepSecond, sleepThird, sleepFourth, moodFirst, moodSecond, moodThird, moodFourth, moodFifth, moodSixth, moodSeventh, moodEighth, moodNinth, moodTenth, moodTwoFirst, moodTwoSecond, moodTwoThird, moodTwoFourth, moodTwoFifth, moodTwoSixth, moodTwoSeventh, moodTwoEighth, reaction);
        if (!validationResult.isValid) {
            slots[`${validationResult.violatedSlot}`] = null;
            callback(elicitSlot(intentRequest.sessionAttributes, intentRequest.currentIntent.name, slots, validationResult.violatedSlot, validationResult.message));
            return;
        }
        const outputSessionAttributes = intentRequest.sessionAttributes;
        callback(delegate(outputSessionAttributes, intentRequest.currentIntent.slots));
        return;
    }

    callback(close(intentRequest.sessionAttributes, 'Fulfilled', {
        contentType: 'PlainText',
        content: `Thank you, the questionnaire is now finished. I stored all your informations on a database. Thank you very much for your time. Good bye`
    }));
}

function fillQuestionnaire4(intentRequest, callback) {

    const getLevel = intentRequest.currentIntent.slots.GetLevel;
    const aOne = intentRequest.currentIntent.slots.GetFirstAnswerPageSixteen;
    const aTwo = intentRequest.currentIntent.slots.GetSecondAnswerPageSixteen;
    const aThree = intentRequest.currentIntent.slots.GetThirdAnswerPageSixteen;
    const aFour = intentRequest.currentIntent.slots.GetFourthAnswerPageSixteen;
    const aFive = intentRequest.currentIntent.slots.GetFifthAnswerPageSixteen;
    const aOneBis = intentRequest.currentIntent.slots.GetFirstAnswerPageSeventeen;
    const aTwoBis = intentRequest.currentIntent.slots.GetSecondAnswerPageSeventeen;
    const aThreeBis = intentRequest.currentIntent.slots.GetThirdAnswerPageSeventeen;
    const aFourBis = intentRequest.currentIntent.slots.GetFourthAnswerPageSeventeen;
    const aFiveBis = intentRequest.currentIntent.slots.GetFifthAnswerPageSeventeen;
    const aSixBis = intentRequest.currentIntent.slots.GetSixthAnswerPageSeventeen;
    const aSevenBis = intentRequest.currentIntent.slots.GetSeventhAnswerPageSeventeen;
    const aEightBis = intentRequest.currentIntent.slots.GetEighthAnswerPageSeventeen;
    const aNineBis = intentRequest.currentIntent.slots.GetNinthAnswerPageSeventeen;
    const aTenBis = intentRequest.currentIntent.slots.GetTenthAnswerPageSeventeen;

    const source = intentRequest.invocationSource;

    if (source === 'DialogCodeHook') {
        const slots = intentRequest.currentIntent.slots;
        const validationResult = validateQuestionnaire4(getLevel, aOne, aTwo, aThree, aFour, aFive, aOneBis, aTwoBis, aThreeBis, aFourBis, aFiveBis, aSixBis, aSevenBis, aEightBis, aNineBis, aTenBis);
        if (!validationResult.isValid) {
            slots[`${validationResult.violatedSlot}`] = null;
            callback(elicitSlot(intentRequest.sessionAttributes, intentRequest.currentIntent.name, slots, validationResult.violatedSlot, validationResult.message));
            return;
        }
        const outputSessionAttributes = intentRequest.sessionAttributes;
        callback(delegate(outputSessionAttributes, intentRequest.currentIntent.slots));
        return;
    }

    callback(close(intentRequest.sessionAttributes, 'Fulfilled', {
        contentType: 'PlainText',
        content: `Thank you, you have completed the fourth part. Say "Finish" to go to the final part.`
    }));
}

function fillQuestionnaire_Days(intentRequest, callback) {
    const days = intentRequest.currentIntent.slots.GetDays;
    const workActivity = intentRequest.currentIntent.slots.GetWorkActivityTrouble;
    const leisureActivity = intentRequest.currentIntent.slots.GetLeisureActivity;
    const nonPrescriptionMedication = intentRequest.currentIntent.slots.GetNonPrescriptionMedication;
    const source = intentRequest.invocationSource;

    if (source === 'DialogCodeHook') {
        const slots = intentRequest.currentIntent.slots;
        const validationResult = validateQuestionnaire_Days(days, workActivity, leisureActivity, nonPrescriptionMedication);
        if (!validationResult.isValid) {
            slots[`${validationResult.violatedSlot}`] = null;
            callback(elicitSlot(intentRequest.sessionAttributes, intentRequest.currentIntent.name, slots, validationResult.violatedSlot, validationResult.message));
            return;
        }
        const outputSessionAttributes = intentRequest.sessionAttributes;
        callback(delegate(outputSessionAttributes, intentRequest.currentIntent.slots));
        return;
    }

    callback(close(intentRequest.sessionAttributes, 'Fulfilled', {
        contentType: 'PlainText',
        content: `Thank you, you have completed the second page. Say "Begin third part" to continue the questionnaire.`
    }));
}

function fillQuestionnaire3(intentRequest, callback) {

    const qOne = intentRequest.currentIntent.slots.GetFirstAnswer;
    const qTwo = intentRequest.currentIntent.slots.GetSecondAnswer;
    const qThree = intentRequest.currentIntent.slots.GetThirdAnswer;
    const qFour = intentRequest.currentIntent.slots.GetFourthAnswer;
    const qFive = intentRequest.currentIntent.slots.GetFifthAnswer;
    const qSix = intentRequest.currentIntent.slots.GetSixthAnswer;
    const qSeven = intentRequest.currentIntent.slots.GetSeventhAnswer;
    const qEight = intentRequest.currentIntent.slots.GetEighthAnswer;
    const qNine = intentRequest.currentIntent.slots.GetNinthAnswer;
    const qTen = intentRequest.currentIntent.slots.GetAnswerTen;
    const qEleven = intentRequest.currentIntent.slots.GetAnswerEleven;
    const qTwelve = intentRequest.currentIntent.slots.GetAnswerTwelve;
    const qThirteen = intentRequest.currentIntent.slots.GetAnswerThirteen;
    const qFourteen = intentRequest.currentIntent.slots.GetAnswerFourteen;
    const qFifteen = intentRequest.currentIntent.slots.GetAnswerFifteen;
    const qSixteen = intentRequest.currentIntent.slots.GetAnswerSixteen;
    const qSeventeen = intentRequest.currentIntent.slots.GetAnswerSeventeen;
    const qEighteen = intentRequest.currentIntent.slots.GetAnswerEighteen;
    const qNineteen = intentRequest.currentIntent.slots.GetAnswerNineteen;
    const qTwenty = intentRequest.currentIntent.slots.GetAnswerTwenty;
    const qTwentyOne = intentRequest.currentIntent.slots.GetAnswerTwentyOne;
    const qTwentyTwo = intentRequest.currentIntent.slots.GetAnswerTwentyTwo;
    const qTwentyThree = intentRequest.currentIntent.slots.GetAnswerTwentyThree;
    const qTwentyFour = intentRequest.currentIntent.slots.GetAnswerTwentyFour;

    const source = intentRequest.invocationSource;

    if (source === 'DialogCodeHook') {
        const slots = intentRequest.currentIntent.slots;
        const validationResult = validateQuestionnaire3(qOne, qTwo, qThree, qFour, qFive, qSix, qSeven, qEight, qNine, qTen, qEleven, qTwelve, qThirteen, qFourteen, qFifteen, qSixteen, qSeventeen, qEighteen, qNineteen, qTwenty, qTwentyOne, qTwentyTwo, qTwentyThree, qTwentyFour);
        if (!validationResult.isValid) {
            slots[`${validationResult.violatedSlot}`] = null;
            callback(elicitSlot(intentRequest.sessionAttributes, intentRequest.currentIntent.name, slots, validationResult.violatedSlot, validationResult.message));
            return;
        }
        const outputSessionAttributes = intentRequest.sessionAttributes;
        callback(delegate(outputSessionAttributes, intentRequest.currentIntent.slots));
        return;
    }

    callback(close(intentRequest.sessionAttributes, 'Fulfilled', {
        contentType: 'PlainText',
        content: `Thank you, you have completed the third part. Sorry for all those questions but we want to create the best program we can for you. Say "Go to part four" to continue the questionnaire.`
    }));
}

function fillQuestionnaire2(intentRequest, callback) {

    const lifeStyle = intentRequest.currentIntent.slots.GetLifeStyle;
    const ethnicGroup = intentRequest.currentIntent.slots.GetEthnicGroup;
    const avgBP = intentRequest.currentIntent.slots.GetAverageBackPain;
    const worstBP = intentRequest.currentIntent.slots.GetWorstBackPain;
    const schooling = intentRequest.currentIntent.slots.GetSchooling;
    const job = intentRequest.currentIntent.slots.GetUserJob;
    const painLength = intentRequest.currentIntent.slots.GetBackPainLength;
    const lengthTest = intentRequest.currentIntent.slots.GetTestEverydayLength;
    const workActivity = intentRequest.currentIntent.slots.GetWorkActivityTrouble;
    const leisureActivity = intentRequest.currentIntent.slots.GetLeisureActivity;
    const nonPrescriptionMedication = intentRequest.currentIntent.slots.GetNonPrescriptionMedication;
    const source = intentRequest.invocationSource;

    if (source === 'DialogCodeHook') {
        const slots = intentRequest.currentIntent.slots;
        const validationResult = validateQuestionnaire2(lifeStyle, ethnicGroup, schooling, job, avgBP, worstBP, painLength, lengthTest, workActivity, leisureActivity, nonPrescriptionMedication);
        if (!validationResult.isValid) {
            slots[`${validationResult.violatedSlot}`] = null;
            callback(elicitSlot(intentRequest.sessionAttributes, intentRequest.currentIntent.name, slots, validationResult.violatedSlot, validationResult.message));
            return;
        }
        const outputSessionAttributes = intentRequest.sessionAttributes;
        callback(delegate(outputSessionAttributes, intentRequest.currentIntent.slots));
        return;
    }

    callback(close(intentRequest.sessionAttributes, 'Fulfilled', {
        contentType: 'PlainText',
        content: `Thank you, you have completed the second page. Say "Begin third part" to continue the questionnaire.`
    }));
}

function fillHeightAndWeightMS(intentRequest, callback) {

    const height = intentRequest.currentIntent.slots.GetHeight;
    const weight = intentRequest.currentIntent.slots.GetWeight;
    const source = intentRequest.invocationSource;

    if (source === 'DialogCodeHook') {
        const slots = intentRequest.currentIntent.slots;
        const validationResult = validateHeightAndWeightMS(height, weight);
        if (!validationResult.isValid) {
            slots[`${validationResult.violatedSlot}`] = null;
            callback(elicitSlot(intentRequest.sessionAttributes, intentRequest.currentIntent.name, slots, validationResult.violatedSlot, validationResult.message));
            return;
        }
        const outputSessionAttributes = intentRequest.sessionAttributes;
        callback(delegate(outputSessionAttributes, intentRequest.currentIntent.slots));
        return;
    }

    callback(close(intentRequest.sessionAttributes, 'Fulfilled', {
        contentType: 'PlainText',
        content: `Thank you, say begin second page to continue`
    }));
}

function fillHeightAndWeightIS(intentRequest, callback) {

    const feet = intentRequest.currentIntent.slots.GetFeet;
    const inches = intentRequest.currentIntent.slots.GetInches;
    const weight = intentRequest.currentIntent.slots.GetWeight;

    const source = intentRequest.invocationSource;

    if (source === 'DialogCodeHook') {
        const slots = intentRequest.currentIntent.slots;
        const validationResult = validateHeightAndWeightIS(feet, inches, weight);
        if (!validationResult.isValid) {
            slots[`${validationResult.violatedSlot}`] = null;
            callback(elicitSlot(intentRequest.sessionAttributes, intentRequest.currentIntent.name, slots, validationResult.violatedSlot, validationResult.message));
            return;
        }
        const outputSessionAttributes = intentRequest.sessionAttributes;
        callback(delegate(outputSessionAttributes, intentRequest.currentIntent.slots));
        return;
    }

    callback(close(intentRequest.sessionAttributes, 'Fulfilled', {
        contentType: 'PlainText',
        content: `Thank you, say begin second page to continue`
    }));
}

function fillQuestionnaire(intentRequest, callback) {
    const age = intentRequest.currentIntent.slots.GetAge;
    const gender = intentRequest.currentIntent.slots.GetGender;
    const source = intentRequest.invocationSource;

    if (source === 'DialogCodeHook') {
        const slots = intentRequest.currentIntent.slots;
        const validationResult = validateQuestionnaire(age, gender);
        if (!validationResult.isValid) {
            slots[`${validationResult.violatedSlot}`] = null;
            callback(elicitSlot(intentRequest.sessionAttributes, intentRequest.currentIntent.name, slots, validationResult.violatedSlot, validationResult.message));
            return;
        }
        const outputSessionAttributes = intentRequest.sessionAttributes;
        callback(delegate(outputSessionAttributes, intentRequest.currentIntent.slots));
        return;
    }

    callback(close(intentRequest.sessionAttributes, 'Fulfilled', {
        contentType: 'PlainText',
        content: `Understood ! Now I would like to know your height. How tall are you (you can say it in centimeters or feet and inches, both are accepted) ?`
    }));
}

function dispatch(intentRequest, callback) {
    const intentName = intentRequest.currentIntent.name;
    if (intentName === 'selfBACKQuestionnaire') {
        return fillQuestionnaire(intentRequest, callback);
    } else if (intentName === 'GetHeightIS_SBQ') {
        return fillHeightAndWeightIS(intentRequest, callback);
    } else if (intentName === 'GetHeightAndWeightMS_SBQ') {
        return fillHeightAndWeightMS(intentRequest, callback);
    } else if (intentName === 'SecondPageSBQ') {
        return fillQuestionnaire2(intentRequest, callback);
    } else if (intentName === 'SecondPageSBQ_Days') {
        return fillQuestionnaire_Days(intentRequest, callback);
    } else if (intentName === 'ThirdPageSBQ') {
        return fillQuestionnaire3(intentRequest, callback);
    } else if (intentName === 'FourthPageSBQ') {
        return fillQuestionnaire4(intentRequest, callback);
    } else if (intentName === 'FifthPageSBQ') {
        return fillQuestionnaire5(intentRequest, callback);
    }
    throw new Error(`Intent with name ${intentName} not supported`);
}
exports.handler = (event, context, callback) => {
    //prevent timeout from waiting event loop
    context.callbackWaitsForEmptyEventLoop = false;
    try {
        dispatch(event, (response) => callback(null, response));
    } catch (err) {
        callback(err);
    }
};