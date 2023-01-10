const usersDynamo = require('../database/usersDynamo');

const dynamo_loginUsers = (userID, userName) => {

  const params = {'UserID':userID, "UserName":userName};

  usersDynamo.addorUpdateUsers(params)

}

module.exports = {

  dynamo_loginUsers
    
}