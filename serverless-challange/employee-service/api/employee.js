'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk'); 

AWS.config.setPromisesDependency(require('bluebird'));

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.submit = (event, context, callback) => {
  const requestBody = JSON.parse(event.body);
  const fullname = requestBody.fullname;
  const role = requestBody.role;
  const age = requestBody.age;

  if (typeof fullname !== 'string' || typeof role !== 'string' || typeof age !== 'number') {
    console.error('Validation Failed');
    callback(new Error('Couldn\'t submit employee because of validation errors.'));
    return;
  }

  submitEmployeeP(employeeInfo(fullname, role, age))
    .then(res => {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          message: `Sucessfully submitted employee with name ${fullname}`,
          employeeId: res.id
        })
      });
    })
    .catch(err => {
      console.log(err);
      callback(null, {
        statusCode: 500,
        body: JSON.stringify({
          message: `Unable to submit employee with name ${fullname}`,
        })
      })
    });
};

module.exports.list = (event, context, callback) => {
  var params = {
      TableName: process.env.EMPLOYEE_TABLE,
      // ProjectionExpression: "id, fullname, role, age"
  };

  console.log("Scanning Candidate table.");
  const onScan = (err, data) => {

      if (err) {
          console.log('Scan failed to load data. Error JSON:', JSON.stringify(err, null, 2));
          callback(err);
      } else {
          console.log("Scan succeeded.");
          return callback(null, {
              statusCode: 200,
              body: JSON.stringify({
                  employees: data.Items
              })
          });
      }

  };

  dynamoDb.scan(params, onScan);

};
module.exports.get = (event, context, callback) => {
  const params = {
    TableName: process.env.EMPLOYEE_TABLE,
    Key: {
      id: event.pathParameters.id,
    },
  };

  dynamoDb.get(params).promise()
    .then(result => {
      const response = {
        statusCode: 200,
        body: JSON.stringify(result.Item),
      };
      callback(null, response);
    })
    .catch(error => {
      console.error(error);
      callback(new Error('Couldn\'t fetch employee.'));
      return;
    });
};

module.exports.delete = (event, context, callback) => {
  const params = {
    TableName: process.env.EMPLOYEE_TABLE,
    Key: {
      id: event.pathParameters.id,
    },
  };

  dynamoDb.delete(params).promise()
    .then(result => {
      const response = {
        statusCode: 200,
        body: JSON.stringify(result.Item),
      };
      callback(null, response);
    })
    .catch(error => {
      console.error(error);
      callback(new Error('Couldn\'t delete employee.'));
      return;
    });
};


const submitEmployeeP = employee => {
  console.log('Submitting employee');
  const employeeInfo = {
    TableName: process.env.EMPLOYEE_TABLE,
    Item: employee,
  };
  return dynamoDb.put(employeeInfo).promise()
    .then(res => employee);
};

const employeeInfo = (fullname, role, age) => {
  const timestamp = new Date().getTime();
  return {
    id: uuid.v1(),
    fullname: fullname,
    age: age,
    role: role,
    submittedAt: timestamp,
    updatedAt: timestamp,
  };
};