// eslint-disable-next-line no-unused-vars
const dotenv = require('dotenv').config();
const AWS = require('aws-sdk');

AWS.config.update({

  region: process.env.AWS_DEFAULT_REGION,
  accessKeyID: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY

});

const dynamoClient = new AWS.DynamoDB.DocumentClient();

const api = require('../api/modules');
const usersDynamo = require('../database/usersdynamo');

const UserID = '123';
const UserName = 'testUser';
const SongList = ['testSong'];

test('api get genius song', async () => {

  const geniusSongData = await api.geniusSongApi.getGeniusSong(['fade','away']);
  expect(geniusSongData[0]).toMatch(/Fade Away/);

});

test('dynamo user register', async () => {
  
  const userInfo = {UserID: UserID, UserName: UserName};

  await usersDynamo.addorUpdateUser(userInfo);
  var params = {
    Key:{
      'UserID' : UserID
    },
    TableName : 'USERS'
  };

  let usersData = await dynamoClient.get(params).promise();
  expect(usersData.Item).toEqual(userInfo);


  await dynamoClient.delete(params).promise();
  usersData = await dynamoClient.get(params).promise();
  expect(usersData.Item).toBeUndefined();
  
});

test('dynamo user songs register', async() => {

  var params = {
    Key:{
      'UserID' : UserID
    },
    TableName : 'USERS_SONGS'
  };

  let usersData = await dynamoClient.get(params).promise();
  expect(usersData.Item).toEqual({UserID: UserID, SongList: []});

  await dynamoClient.delete(params).promise();
  usersData = await dynamoClient.get(params).promise();
  expect(usersData.Item).toBeUndefined();

});

test('dynamo add users song', async() => {

  await usersDynamo.addUserSong(UserID,SongList);
  let userSongList = await usersDynamo.getUserSongList(UserID);
  expect(userSongList).toEqual(SongList);

  var params = {
    Key:{
      'UserID' : UserID
    },
    TableName : 'USERS_SONGS'
  };

  await dynamoClient.delete(params).promise();
  let usersData = await dynamoClient.get(params).promise();
  expect(usersData.Item).toBeUndefined();

});