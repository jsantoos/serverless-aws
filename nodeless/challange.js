const AWS = require('aws-sdk');

const dynamodb = new AWS.DynamoDB.DocumentClient();
const dynamodbTableName = 'users';
const user = '/user';

exports.handler = async function(event) {
  console.log('Request event: ', event);
  let response;
  switch(true) {
    case event.httpMethod === 'GET' && event.path === user:
      response = buildResponse(200);
      break;
    case event.httpMethod === 'GET' && event.path === user:
      response = await getUser(event.queryStringParameters.userID);
      break;
    case event.httpMethod === 'GET' && event.path === user:
      response = await getUsers();
      break;
    case event.httpMethod === 'POST' && event.path === user:
      response = await saveUser(JSON.parse(event.body));
      break;
    case event.httpMethod === 'PATCH' && event.path === user:
      const requestBody = JSON.parse(event.body);
      response = await updateUser(requestBody.userID, requestBody.updateKey, requestBody.updateValue);
      break;
    case event.httpMethod === 'DELETE' && event.path === user:
      response = await deleteUser(JSON.parse(event.body).userID);
      break;
    default:
      response = buildResponse(404, '404 Not Found');
  }
  return response;
}

async function getUser(userID) {
  const params = {
    TableName: dynamodbTableName,
    Key: {
      'userID': userID
    }
  }
  return await dynamodb.get(params).promise().then((response) => {
    return buildResponse(200, response.Item);
  }, (error) => {
    console.error('log: ', error);
  });
}

async function scanDynamoRecords(scanParams, itemArray) {
  try {
    const dynamoData = await dynamodb.scan(scanParams).promise();
    itemArray = itemArray.concat(dynamoData.Items);
    if (dynamoData.LastEvaluatedKey) {
      scanParams.ExclusiveStartkey = dynamoData.LastEvaluatedKey;
      return await scanDynamoRecords(scanParams, itemArray);
    }
    return itemArray;
  } catch(error) {
    console.error('log: ', error);
  }
}

async function saveUser(requestBody) {
  const params = {
    TableName: dynamodbTableName,
    Item: requestBody
  }
  return await dynamodb.put(params).promise().then(() => {
    const body = {
      Operation: 'SAVE',
      Message: 'SUCCESS',
      Item: requestBody
    }
    return buildResponse(200, body);
  }, (error) => {
    console.error('log: ', error);
  })
}

async function updateUser(userId, updateKey, updateValue) {
  const params = {
    TableName: dynamodbTableName,
    Key: {
      'userID': userID
    },
    UpdateExpression: `set ${updateKey} = :value`,
    ExpressionAttributeValues: {
      ':value': updateValue
    },
    ReturnValues: 'UPDATED_NEW'
  }
  return await dynamodb.update(params).promise().then((response) => {
    const body = {
      Operation: 'UPDATE',
      Message: 'SUCCESS',
      UpdatedAttributes: response
    }
    return buildResponse(200, body);
  }, (error) => {
    console.error('log: ', error);
  })
}

async function deleteUser(userID) {
  const params = {
    TableName: dynamodbTableName,
    Key: {
      'userID': userID
    },
    ReturnValues: 'ALL_OLD'
  }
  return await dynamodb.delete(params).promise().then((response) => {
    const body = {
      Operation: 'DELETE',
      Message: 'SUCCESS',
      Item: response
    }
    return buildResponse(200, body);
  }, (error) => {
    console.error('Do your custom error handling here. I am just gonna log it: ', error);
  })
}

function buildResponse(statusCode, body) {
  return {
    statusCode: statusCode,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }
}