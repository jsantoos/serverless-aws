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

This example demonstrates how to setup a [RESTFUL Web Services allowing you to create, list, get, update and delete Employees. DynamoDB is used to store the data. This is just an example and of an challange you could use any data storage as a backend.

## Structure

This service has a separate directory for all the employee operations. For each operation exactly one file exists e.g. `api/employee.js`. In each of these files there is exactly one function which is directly attached to `module.exports`.

## Use-cases

- API for a Web Application
- API for a Mobile Application

## Setup

```bash
npm install
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

You can create, retrieve, update, or delete todos with the following commands:

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
curl https://XXXXXXX.execute-api.us-east-1.amazonaws.com/employees

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
 
### Get one Todo

```bash
# Replace the <id> part with a real id from your employee table
curl https://XXXXXXX.execute-api.us-east-1.amazonaws.com/employees/<id>

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

### Update a Todo

```bash
# Replace the <id> part with a real id from your todos table
curl -X PUT https://XXXXXXX.execute-api.us-east-1.amazonaws.com/todos/<id> --data '{ "fullname": "João Souza", "role": "Machine Learning", "age": 26 }'

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
# Replace the <id> part with a real id from your todos table
curl -X DELETE https://XXXXXXX.execute-api.us-east-1.amazonaws.com/employees/<id>

or

via RESTMAN/POSTMAN/INSOMNIA inserting an JSON method GET

```

No output

## Serverless

https://www.serverless.com/

### AWS Lambda

https://aws.amazon.com/pt/lambda/

### DynamoDB
https://aws.amazon.com/pt/dynamodb/?trk=ps_a134p000006gXxQAAU&trkCampaign=acq_paid_search_brand&sc_channel=PS&sc_campaign=acquisition_BR&sc_publisher=Google&sc_category=Database&sc_country=BR&sc_geo=LATAM&sc_outcome=acq&sc_detail=%2Bdynamodb&sc_content=DynamoDB_bmm&sc_matchtype=b&sc_segment=536393528866&sc_medium=ACQ-P|PS-GO|Brand|Desktop|SU|Database|DynamoDB|BR|EN|Text&s_kwcid=AL!4422!3!536393528866!b!!g!!%2Bdynamodb&ef_id=CjwKCAjw49qKBhAoEiwAHQVTo46obYzAmKDtZxjj9d2rK80ahbJfsKonXFqFR4aa8_awYxVilwtZXBoCKLwQAvD_BwE:G:s&s_kwcid=AL!4422!3!536393528866!b!!g!!%2Bdynamodb
