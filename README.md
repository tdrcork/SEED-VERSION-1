# SEED

# Important Note:  
This Repo is Only for the Front End. i.e. an angular 5 SPA.  This does include the client side logic for REST calls to API Gateway endpoints/Lamda Functions with Cognito Authentication.

# The Example website's sign up and sign in pages will NOT work
For User Authentication or any kind of REST call to work, you must first configure an aws account and place the correct credentials in the appropriate places.  These places are currently filled with placeholders.

# Technologies Used
-Angular 5
-Angular Material
-Flex Layout
-Serverless Framework
-AWS S3
-AWS Lamda
-AWS API Gateway
-AWS DynamoDB
-AWS Cloudfront
-AWS Cognito

# What The Front End Contains
The Front End is an Angular SPA with the following:
-Header/Footer
-Landing Page
-Sign Up Page
-Sign In Page
-Email Confirmation Page
-Authentication Service
-Simple REST API Service
-example page that uses rest service to post to a db

# User Authentication
User authentication is taken care of by an auth service created within the app/user directory.  The service uses amazon cognitos SDK and is used by the rest service in order to protect the end points.

# Back End/API
The API itself does not exist in this repo. There is a service for storing and retrieving user specific data in app/rest.  Once again, this will not work unless you add the correct credentials.  

You can find the serverless rest skelaton app here:  https://github.com/tdrcork/serverless-seed-api

# S3 Deployment Script
This also does not exist on this repo. 

# Really Important But I put it last anyway:
I was only able to put this entire thing together because of the wonderful examples and tutorials I have been able to find online.  My s3 deployment script and skelaton rest api are almost exact copies of those found in the serverless examples page: https://github.com/serverless/examples

Much of my angular application is based off of the application that was created in the Udemy Course "AWS Serverless API's & Apps - A Complete Introduction" by Maximilian Schwarzmuller.  Link here:  https://www.udemy.com/aws-serverless-a-complete-introduction/learn/v4/overview
