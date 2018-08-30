[![Build Status](https://travis-ci.org/gbols/api-endpoint.svg?branch=master)](https://travis-ci.org/gbols/api-endpoint)[![Maintainability](https://api.codeclimate.com/v1/badges/00e0c0d02db50dfc3f1c/maintainability)](https://codeclimate.com/github/gbols/api-endpoint/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/00e0c0d02db50dfc3f1c/test_coverage)](https://codeclimate.com/github/gbols/api-endpoint/test_coverage) [![Coverage Status](https://coveralls.io/repos/github/gbols/api-endpoint/badge.svg?branch=develop)](https://coveralls.io/github/gbols/api-endpoint?branch=develop)
# StackOverFlow Lite 
stackoverflow lite is a platform where users can post questions and get other users to help them with answers.

### Table of Content
* Features in the applicationn
* Technology stack used
* Getting started 
* Running Tests
* How to Contribute

### Features in the application
* Users can see an array of Questions Upon visiting the landing page.
* Users can see the most popular Questions in the application.
* Users can create account by signing up with a valid enail address ans username.
* **Users**
* Registered users can login with verified details.
* Registered users can post Questions to the application.
* Registered users can accept an answer to the question they posted.

## API docs
For an indepth look at the build and up-to-date documentation, visit the [api documentation website]() to get started

* POST `localhost:3000/api/v1/questions`
* Enter the URL above and submit question the form filed provided.

* PUT `localhost:3000/api/v1/questions/:qId/answers/:aId`
* Enter the URL above and accept an answer as the correct response for a question.

#### Running Tests
**Server-side tests**
* Create a test database 
* run 
```>$ npm run test ```

 **Client-side tests**
* Create a test database 
* run 
```>$ npm run test```

#### Current Limitations in the application
* Users can connect it to their socila media accounts.

### How to Contribute
* Fork the repository
* Create a feature branch with a feature.md file
* Write tests and make them pass
* Open a pull request

### Technology Stack Used
* NodeJS
* ExpressJS
* PostgresSQL

## Getting Started 
* Before cloning the repo make sure you have PostgresSQL and Node installed on your local machine
* Clone the repo to your local machine
```>$ git clone https://github.com/gbols/api-endpoint/tree/develop```
* Change the directory into the develop directory
```>$ cd develop```
* Install all required dependencies ny running 
```>$ npm install```
 bg-encryption-wildcards-160158014
* Once the installation is complete make sure to connect the neccesary variables.
