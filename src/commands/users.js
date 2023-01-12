const usersDynamo = require('../database/usersdynamo');

const registerUsers = async (message) => {

  try{

    const params = {'UserID':message.author.id, "UserName":message.author.username};

    await usersDynamo.addorUpdateUser(params);
    message.reply("Registration complete.");
  } catch(error){
    message.reply("Error has occured when registering. Please try again.");
  }

};

module.exports = {

  registerUsers
    
};