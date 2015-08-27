//	Description:
//	Greet new users and prompt them to pick a starter Pokémon
//
//	Dependencies:
//	postgress
//
//	Configuration:
//	None
//
//	Commands:
//	None
//
//	Author:
//	Andrew Studnicky

module.exports = function greetUser (robot) {

	robot.enter(function (res) {

		//	Greet new channel users.
		res.send('Hello, ' + (res.message.user.name).charAt(0).toUpperCase() + res.message.user.name.slice(1) + '! DM me to get started!');	//	Send as a reply to all
		//	DM the user to start the initialization script
		robot.messageRoom(res.message.user.name, "Let's get started, " + (res.message.user.name).charAt(0).toUpperCase() + res.message.user.name.slice(1) + "! Type \"pick starter\" to get your first pokemon!");

	});

};