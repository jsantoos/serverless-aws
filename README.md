<!--
title: 'AWS Serverless HTTP API example in NodeJS'
description: 'This example demonstrates how to setup an HTTP API allowing you to create, list, get, update and delete Employees. DynamoDB is used to store the data.'
layout: Doc
platform: AWS
language: nodeJS
authorLink: 'https://github.com/jsantoos'
authorName: 'João Santos'
-->
# Serverless HTTP API - (AWS + NodeJS + DynamoDB)

This example demonstrates how to setup a [RESTFUL] Web Services allowing you to create, list, get, update and delete Employees. DynamoDB is used to store the data. This is just an example and of an challange you could use any data storage as a backend.

## Structure

This service has a directory api and all the employee operations in a single file. For each operation exactly one file exists e.g. `api/employee.js`. In this file there is exactly four functions (list, get, update and delete) which is directly attached to `module.exports`.

## Use-cases

- API for a Web Application
- API for a Mobile Application

## Prerequisite
- AWS account
- Node.js
- AWS CLI and configure it (creating an IAM user and getting the keys)

## Setup

```bash
In the service path:

npm install -g serverless
npm install
serverless config credentials --provider aws --key AKIAIOSFODNN7EXAMPLE --secret wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY

```

## Deploy

In order to deploy the endpoint simply run

```bash
serverless deploy or sls deploy
```

The expected result should be similar to:

```bash
Serverless: Packaging service...
Serverless: Excluding development dependencies...
Serverless: Service files not changed. Skipping deployment...
Service Information
service: employee
stage: dev
region: us-east-1
stack: employee-dev
resources: 33
api keys:
  None
endpoints:
  POST - https://ugvpksnz45.execute-api.us-east-1.amazonaws.com/dev/employees
  GET - https://ugvpksnz45.execute-api.us-east-1.amazonaws.com/dev/employees
  GET - https://ugvpksnz45.execute-api.us-east-1.amazonaws.com/dev/employees/{id}
  PUT - https://ugvpksnz45.execute-api.us-east-1.amazonaws.com/dev/employees/{id}
  DELETE - https://ugvpksnz45.execute-api.us-east-1.amazonaws.com/dev/employees/{id}
functions:
  employeeSubmission: employee-dev-employeeSubmission
  listEmployees: employee-dev-listEmployees
  employeeDetails: employee-dev-employeeDetails
  updateEmployee: employee-dev-updateEmployee
  deleteEmployee: employee-dev-deleteEmployee
```

## Usage

You can create, retrieve, update, or delete Employees with the following commands:

### Insert a Employee

```bash
curl -X POST https://XXXXXXX.execute-api.us-east-1.amazonaws.com/employees --data '{ "fullname": "João Santos", "role": "FullStack Deve", "age": 25 }'

or 

via RESTMAN/POSTMAN/INSOMNIA inserting an JSON method POST

{ "fullname": "João Santos", "role": "FullStack Deve", "age": 25 }

```

Example Result:
```bash
{
    "message": "Sucessfully submitted employee with name JP",
    "employeeId": "d50ae1e0-22e8-11ec-8861-910dd1281191"
}
```

### List all Employees

```bash
curl https://XXXXXXX.execute-api.us-east-1.amazonaws.com/dev/employees

or

via RESTMAN/POSTMAN/INSOMNIA inserting an JSON method GET


```

Example output:
```bash
{
    "employees": [
        {
            "role": "Data Scientist",
            "updatedAt": 1633112954944,
            "id": "42755550-22ba-11ec-b023-db63edb18d6f",
            "fullname": "João Santos",
            "submittedAt": 1633094391589,
            "age": 25
        },
        {
            "role": "FullStack Delllveloper",
            "updatedAt": 1633114394366,
            "id": "d50ae1e0-22e8-11ec-8861-910dd1281191",
            "fullname": "JP",
            "submittedAt": 1633114394366,
            "age": 25
        }
  ]
 }
 ```
 
### Get one Employee

```bash
# Replace the <id> part with a real id from your employee table
curl https://XXXXXXX.execute-api.us-east-1.amazonaws.com/dev/employees/<id>

or

via RESTMAN/POSTMAN/INSOMNIA inserting an JSON method GET

```

Example Result:
```bash

    {
        "role": "Data Scientist",
        "updatedAt": 1633112954944,
        "id": "42755550-22ba-11ec-b023-db63edb18d6f",
        "fullname": "João Santos",
        "submittedAt": 1633094391589,
        "age": 25
      }
```

### Update a Employee

```bash
# Replace the <id> part with a real id from your employees table
curl -X PUT https://XXXXXXX.execute-api.us-east-1.amazonaws.com/dev/employee/<id> --data '{ "fullname": "João Souza", "role": "Machine Learning", "age": 26 }'

or

via RESTMAN/POSTMAN/INSOMNIA inserting an JSON method PUT

```

Example Result:
```bash
    {
        "role": "Data Scientist",
        "updatedAt": 1633112954944,
        "id": "42755550-22ba-11ec-b023-db63edb18d6f",
        "fullname": "João Santos",
        "submittedAt": 1633094391589,
        "age": 25
      }
```
### Delete a Employee

```bash
# Replace the <id> part with a real id from your Employee table
curl -X DELETE https://XXXXXXX.execute-api.us-east-1.amazonaws.com/dev/employees/<id>

or

via RESTMAN/POSTMAN/INSOMNIA inserting an JSON method DELETE

```

No output

## Serverless

https://www.serverless.com/

https://serverless-stack.com/chapters/organizing-serverless-projects.html

https://serverless-stack.com/chapters/configure-dynamodb-in-serverless.html

https://serverless-stack.com/chapters/deploy-a-serverless-app-with-dependencies.html

### AWS Lambda

https://aws.amazon.com/pt/lambda/

### DynamoDB
https://aws.amazon.com/pt/dynamodb/
