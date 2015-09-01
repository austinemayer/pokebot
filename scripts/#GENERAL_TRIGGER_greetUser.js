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

	robot.enter(function (res) {
		//	TODO:
		//	read USER table from postgres and compare to robot.brain database to see if user has been here before.


		//	Greet new channel users.
		res.send('Hello, ' + (res.message.user.name).charAt(0).toUpperCase() + res.message.user.name.slice(1) + '!\nSend me a private message me to get started on your adventure!');

		//	Refer here for how to force open an IM
		//	https://api.slack.com/methods/im.open
		//	DM the user to start the initialization script
		robot.messageRoom(res.message.user.name, "Let's get started, " + (res.message.user.name).charAt(0).toUpperCase() + res.message.user.name.slice(1) + "! Type \"pick starter\" to get your first pokemon!");


	});

};