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
var request = require('request')
Sequelize = require('sequelize');

//	Define requires data models
var Models = require('./models'),
User = Models.User,
Pokemon = Models.Pokemon;

module.exports = function dmMe (robot) {

	robot.respond(/DM me$/i, function (res) {

		//	Demo of sending DM to a user from a response.
		//	Send to the user channel (A room with channel of user's name is considered DM)
		robot.messageRoom(res.message.user.name, "Sup, " + (res.message.user.name).charAt(0).toUpperCase() + res.message.user.name.slice(1) + "?");

		//	Build the channel invite
		//	https://pokebot.slack.com/api/channels.invite?token={MY_TOKEN}&channel={username}&user={myid}


		//	This method should be used for presenting data not desired in the main channels.

		//	Generate an instance based on the user model

		var this_user = User.build({
			slack_id: res.message.user.id,
			slack_name: res.message.user.name,
			slack_role: "user"
		});

		//	Save the instance to the database
		this_user.save()
		.then(function(){
			robot.messageRoom(res.message.user.name, "User saves as: " + this_user);
		})
		.catch(function(error){
			robot.messageRoom(res.message.user.name, "Hmm... ask a dev about this?\n" + error);
		});

		console.log(this_user);

		var new_pokemon = Pokemon.build({
			abilities: [{"name": "glitch"}],
			attack: "136",
			catch_rate: "0",
			defense: "0",
			evolutions: {},
			hp: "33",
			male_female_ratio: "0",
			movelist: {},
			name: "Missingno.:",
			national_id: '000',
			sp_atk: "6",
			sp_def: "6",
			speed: "0",
			types: [{"type": "flying"},{"type": "normal"}]
		});

		console.log(new_pokemon);


	});

};