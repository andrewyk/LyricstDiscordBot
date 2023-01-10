const usersDynamo = require('../database/usersDynamo');

const dynamo_loginUsers = async (userID, userName) => {

  const params = {'UserID':userID, "UserName":userName};

  await usersDynamo.addorUpdateUsers(params)

}

const dynamo_getUsers = async () => {

  return await usersDynamo.getUsers()

}

module.exports = {

  dynamo_loginUsers,
  dynamo_getUsers
    
}