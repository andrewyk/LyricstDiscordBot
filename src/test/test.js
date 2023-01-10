// eslint-disable-next-line no-unused-vars
const dotenv = require('dotenv').config();
const AWS = require('aws-sdk');

AWS.config.update({

  region: process.env.AWS_DEFAULT_REGION,
  accessKeyID: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY

})

const dynamoClient = new AWS.DynamoDB.DocumentClient();

const api = require('../api/modules');
const commands = require('../commands/modules');

test('api get genius song', async () => {

  const geniusSongData = await api.geniusSongApi.getGeniusSong(['fade','away'])
  expect(geniusSongData[0]).toMatch(/Fade Away/)

})

test('dynamo user login', async () => {
  
  await commands.users.dynamo_loginUsers('123', 'testUser')
  var params = {
    Key:{
      'UserID' : '123'
    },
    TableName : 'USERS'
  }

  let usersData = await dynamoClient.get(params).promise()
  expect(usersData.Item).toEqual({UserID:'123', UserName: 'testUser'})


  await dynamoClient.delete(params).promise()
  usersData = await dynamoClient.get(params).promise()
  expect(usersData.Item).toBeUndefined()


})