//  Description:
//    Greet new users and prompt them to pick a starter pokemon
//
//  Dependencies:
//		postgress
//
//  Configuration:
//		None
//
//  Commands:
//		None
//
//  Author:
//    Andrew Studnicky

module.exports = function greetUser (robot) {
   robot.enter(function (res) {
   		//	Greet new channel users.
        res.send('Hello, ' + (res.message.user.name).charAt(0).toUpperCase() + res.message.user.name.slice(1) + '!');	//	Send as a reply to all

        //	This method should be built out to generate new user data in postgres
   		robot.messageRoom(res.message.user.name, "Let's get started, " + (res.message.user.name).charAt(0).toUpperCase() + res.message.user.name.slice(1) + "!");	//	Send to the user channel

    });
};