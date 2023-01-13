const createHeader  = () => {

	const geniusHeader = {
		headers: {
			'Access-Control-Allow-Origin': '*',
			Authorization: "Bearer " + process.env.GENIUS_CLIENT_ACCESS
		}
	}

	console.log(geniusHeader)
	return geniusHeader

}

const getAccessToken = () => {

	return process.env.GENIUS_CLIENT_ACCESS

}




module.exports = {

	createHeader,
	getAccessToken

}