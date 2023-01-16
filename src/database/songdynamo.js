const AWS = require('aws-sdk');

AWS.config.update({

  region: process.env.AWS_DEFAULT_REGION,
  accessKeyID: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY

});


const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_SONGS = "SONGS";

const addorUpdateSong = async(songInfo) => {
  //add Users information if not exist
    const params = {
      TableName: TABLE_SONGS,
      Item: songInfo
  
    };
  
    return await dynamoClient.put(params).promise();
  
};

const getSongData = async(songName) => {
  const params = {
    FilterExpression: "contains(SearchName, :songname)",
    TableName: TABLE_SONGS,
    ExpressionAttributeValues:{
      ':songname':songName.toLowerCase()
    }
  };
  try{
    return await dynamoClient.scan(params).promise();
  } catch(error){
    console.log(error);
  }
};


module.exports = {
  addorUpdateSong,
  getSongData
};
