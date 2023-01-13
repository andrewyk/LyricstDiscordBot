const helper = require('../helpers/modules');
const usersDynamo = require('../database/usersdynamo');

const registerUsers = async (message) => {

  try{

    const params = {'UserID':message.author.id, "UserName":message.author.username};
    await usersDynamo.addorUpdateUser(params);
    message.reply(helper.message.registerMsg);
  } catch(error){
    message.reply(helper.message.errorMsg);
  }

};

module.exports = {

  registerUsers
    
};