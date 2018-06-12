# Conversational system for the selfBACK Questionnaire
#
#
[![N|Solid](data:image/png;base64,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)](http://www.selfback.eu/)

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
