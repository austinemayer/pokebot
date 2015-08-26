//	Description:
//	Tell oak to DM you
//
//	Dependencies:
//	None
//
//	Configuration:
//	None
//
//	Commands:
//	pokebot DM me - tell Oak to DM you
//
//	Author:
//	Andrew Studnicky


//	Define required modules
var request = require('request');

//	Define requires data models
var Models = require('./models'),
	User = Models.User;

module.exports = function DMme (robot) {

	robot.respond(/DM me$/i, function (res) {

		//	Demo of sending DM to a user from a response.
		//	Send to the user channel (A room with channel of user's name is considered DM)
		robot.messageRoom(res.message.user.name, "Sup, " + (res.message.user.name).charAt(0).toUpperCase() + res.message.user.name.slice(1) + "?");

		//	This method should be used for presenting data not desired in the main channels.

		//	Generate an instance based on the user model
		var studs = User.build({
			slack_id: res.message.user.id,
			slack_name: res.message.user.name,
			slack_role: "user"
		});

		//	Save the instance to the database
		studs.save()
		.then(function(){

		})
		.catch(function(error){
			robot.messageRoom(res.message.user.name, "Welp... that happened.\n" + error);
		});
	});

};