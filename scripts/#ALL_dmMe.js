//	Description:
//		Tell oak to DM you
//
//	Dependencies:
//		None
//
//	Configuration:
//		None
//
//	Commands:
//		DM me - tell Oak to DM you
//
//	Author:
//		Andrew Studnicky

module.exports = function dmMe (robot) {

//	Define required modules
var request = require('request');


	robot.respond(/DM me$/i, function (res) {

		//	Demo of sending DM to a user from a response.
		//	Send to the user channel (A room with channel of user's name is considered DM)
		robot.messageRoom(res.message.user.name, "Sup, " + (res.message.user.name).charAt(0).toUpperCase() + res.message.user.name.slice(1) + "?");

		//	Build the channel invite
		//	https://pokebot.slack.com/api/channels.invite?token={MY_TOKEN}&channel={username}&user={myid}

	});

};