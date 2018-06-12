# Conversational system for the selfBACK Questionnaire
#
#
[![N|Solid](http://alexandre.guillon.free.fr/images/selfback_logo.png)](http://www.selfback.eu/)

## What is selfBACK ?
##### selfBACK is a decision support system to improve self-management of non-specific low back pain. The decision support is conveyed to the patient via a smartphone app, in the form of advice for self-management. This advice is always tailored to the patient, and is based on their symptom state, symptom progression, goal setting and other patient characteristics, such as information from a physical activity-detecting wristband worn by the patient.


## Description of my work
##### At the beginning of the experience, the user has to fill a questionnaire on a website that really takes time (around 30 minutes). My goal has been to create a conversational system for this questionnaire. The user has just to answer some questions asked by a bot with his voice. The questionnaire by the voice takes less time than the classical questionnaire.
#
## What did I use for the conversational system ?
#
#### Amazon LEX
##### Amazon   Lex is   a   service   for   building   conversational interfaces  into  any  application  using  voice  and  text. At the end, I had a bot that is asking questions to the user. (https://aws.amazon.com/lex/)
#

#### Amazon LAMBDA
##### To  handle  all  the  user  input,  I used  an Amazon  Lambda  javascript  function  linked  to the Amazon Lex bot. (https://aws.amazon.com/lambda/)
#
#### Amazon RDS
##### Amazon Relational Database Service (Amazon RDS) makes it easy to set up, operate, and scale a relational database in the cloud. I used it to store the data from the user after he did the questionnaire. (https://aws.amazon.com/rds)
#
#### Android application
##### This is the final rendering on an android application  : 
[![N|Solid](http://alexandre.guillon.free.fr/images/Capture_sb2.PNG)](http://alexandre.guillon.free.fr/images/Capture_sb2.PNG)

# Tutorial for the installation 
#### First, you need to create an Amazon AWS account. 
#### For all the steps, you need to use the region "eu-west-1". 
### 1) Create a MySQL Amazon RDS database
##### Follow this tutorial to create a MySQL RDS database : https://aws.amazon.com/getting-started/tutorials/create-mysql-db/?nc1=f_ls .  
##### Once you succeeded in connect to the database with MySQL Workbench, go to the SQL directory from this repository and execute all the 8 scripts to create the 8 tables in your RDS database.
#
### 2) Create an Amazon LEX Bot
##### Create a custom LEX Bot here : https://eu-west-1.console.aws.amazon.com/lex/ . Once you are in the online console to begin to build your bot, click on the little "+" next to the Intents (see the picture)
 [![N|Solid](http://alexandre.guillon.free.fr/images/Capture_sb3.PNG)](http://alexandre.guillon.free.fr/images/Capture_sb3.PNG)
##### Choose "Import intent" and import all the Zip packages from the LEX directory of this repository. At the end, you must have eight intents with slots in each of them.
#
### 3) Create a Lambda node JS function 
##### Go the Lambda console here : https://eu-west-1.console.aws.amazon.com/lambda and create a lambda function with nodeJS. 
##### After that, choose "Upload a .ZIP file" (see the picture)
 [![N|Solid](http://alexandre.guillon.free.fr/images/Capture_sb4.PNG)](http://alexandre.guillon.free.fr/images/Capture_sb4.PNG)
##### Upload the "Lambda_Deployment_Package.zip" from the Lambda directory. 
##### In the "config.json" file, you have to change the value in order to make the Lambda function connect to your database.
#
### 4) Link the Lambda function to your LEX bot
##### Go to your LEX bot and for every intent, select your lambda function in the options "Lambda initialization and validation" and "Fulfillment".
#
#
#### 5) Link the full bot to the Android application 
##### Open Android studio and open the project named "selfBACK_QuestionnaireApp" situated in the Android_App folder from this repository. Follow those steps :
 1. This sample requires Cognito to authorize to Amazon Lex to post content.  Use Amazon Cognito to create a new identity pool:
	1. In the [Amazon Cognito Console](https://console.aws.amazon.com/cognito/), press the `Manage Federated Identities` button and on the resulting page press the `Create new identity pool` button.
	
	1. Give your identity pool a name and ensure that `Enable access to unauthenticated identities` under the `Unauthenticated identities` section is checked.  This allows the sample application to assume the unauthenticated role associated with this identity pool.  Press the `Create Pool` button to create your identity pool.

		**Important**: see note below on unauthenticated user access.

	1. As part of creating the identity pool, Cognito will setup two roles in [Identity and Access Management (IAM)](https://console.aws.amazon.com/iam/home#roles).  These will be named something similar to: `Cognito_PoolNameAuth_Role` and `Cognito_PoolNameUnauth_Role`.  You can view them by pressing the `View Details` button.  Now press the `Allow` button to create the roles.
	1. Save the `Identity pool ID` value that shows up in red in the "Getting started with Amazon Cognito" page, it should look similar to: `eu-west-1:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" and note the region that is being used.  These will be used in the application code later.
	1. Now we will attach a policy to the unauthenticated role which has permissions to access the required Amazon Lex API.  This is done by attaching an IAM Policy to the unauthenticated role in the [IAM Console](https://console.aws.amazon.com/iam/home#roles).  First, search for the unauth role that you created in step 3 above (named something similar to `Cognito_PoolNameUnauth_Role`) and select its hyperlink.  In the resulting "Summary" page press the `Attach Policy` button in the "Permissions" tab.
	1. Search for "lex" and check the box next to the policy named `AmazonLexFullAccess` and then press the `Attach Policy` button.  This policy allows the application to perform all operations on the Amazon Lex service.

		More information on AWS IAM roles and policies can be found [here](http://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_manage.html).  More information on Amazon Lex policies can be found [here](http://docs.aws.amazon.com/lex/latest/dg/access-control-managing-permissions.html).

		**Note**: to keep this example simple it makes use of unauthenticated users in the identity pool.  This can be used for getting started and prototypes but unauthenticated users should typically only be given read-only permissions in production applications.  More information on Cognito identity pools including the Cognito developer guide can be found [here](http://aws.amazon.com/cognito/).

1. Open the selfBACK_QuestionnaireApp project.

1. Open `res/values/strings.xml` and update the values for Cognito Identity Pool ID (from the value you saved above), Cognito region for Cognito Identity Pool Id (for example us-east-1), Lex region, your Amazon Lex Bot name and the Bot Alias (usually $LATEST).

1. Build and run the sample app.
### If you did all the steps well, you should have the android application working and at the end, the data stored in your MySQL RDS database.
### If you have any issues, you can contact me at alexandredev@outlook.fr

## Good bye !
