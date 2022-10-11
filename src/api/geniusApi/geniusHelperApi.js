const dotenv = require('dotenv').config();

const geniusApiHelper = {}


geniusApiHelper.createHeader  = () => {

    const geniusHeader = {
        headers: {
            'Access-Control-Allow-Origin': '*',
            Authorization: "Bearer " + process.env.GENIUS_CLIENT_ACCESS
        }
    }

    return geniusHeader

}

geniusApiHelper.getaccessToken = () => {

    return process.env.GENIUS_CLIENT_ACCESS

}




module.exports = geniusApiHelper