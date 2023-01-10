const AWS = require('aws-sdk');

AWS.config.update({

  region: process.env.AWS_DEFAULT_REGION,
  accessKeyID: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY

})


const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "USERS";

const getUsers = async ()=> {

  const params = {

    TableName: TABLE_NAME

  };

  const characters = await dynamoClient.scan(params).promise();
  console.log(characters)
  return characters

}

const addorUpdateUsers = async(character) => {

  const params = {
    TableName: TABLE_NAME,
    Item: character

  }

  return await dynamoClient.put(params).promise()

}


module.exports = {
  getUsers,
  addorUpdateUsers
}