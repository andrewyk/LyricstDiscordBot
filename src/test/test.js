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
const songDynamo = require('../database/songdynamo');

const UserID = '123';
const UserName = 'testUser';
const SongList = ['testSong'];

test('api get genius song', async () => {

  const geniusSongData = await api.geniusSongApi.getGeniusSong(['fade','away']);
  const geniusSongList = Object.keys(geniusSongData);
  expect(geniusSongList[0]).toMatch(/Fade Away/);

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

test('dynamo update users song', async() => {

  await usersDynamo.updateUserSong(UserID,SongList);
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

test('dynamo add songs info', async() => {
  var songTitle = 'testSong';
  var songID = '1234';
  var params = {
    Key:{
      'SongTitle' : songTitle
    },
    TableName : 'SONGS'
  };
  var songObject = {SongTitle:songTitle, SongID:songID};

  await songDynamo.addorUpdateSong(songObject);
  let songData = await dynamoClient.get(params).promise();
  expect(songData.Item).toEqual(songObject);

  songData = await dynamoClient.delete(params).promise();
  expect(songData.Item).toBeUndefined();


});