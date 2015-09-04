//	Description:
//		Greet new users and prompt them to pick a starter Pokémon
//
//	Dependencies:
//		None
//
//	Configuration:
//		None
//
//	Commands:
//		None
//
//	Author:
//		Andrew Studnicky

module.exports = function greetUser (robot) {


	//	Get the utility functions
	var Utilities = require('./utility');

	robot.enter({id: 'user.greet'}, function (res) {
		//	TODO:
		//	read USER table from postgres and compare to robot.brain database to see if user has been here before.
		//	Could also just check if they have a starter pokemon?


		//	Refer here for identifying user info

		//	https://api.slack.com/methods/users.info/test
		// 	https://slack.com/api/users.info?token={API TOKEN}&user={USER ID}}&pretty=1

		//	Greet new channel users.
		res.send('Hello, ' + Utilities.proper_capitalize(res.message.user.name) + '!\nSend me a private message me to get started on your adventure!');

		//	Refer here for how to force open an IM
		//	https://api.slack.com/methods/im.open
		//	DM the user to start the initialization script
		robot.messageRoom(res.message.user.name, "Let's get started, " + Utilities.proper_capitalize(res.message.user.name) + "!\nUse the \`\`\`starter\`\`\` command to pick your first pokemon!");


	});

};