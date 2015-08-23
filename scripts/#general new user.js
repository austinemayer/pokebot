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
   return robot.enter(function (res) {
   		console.log(res.send());
        res.send('Hello, ' + (res.message.user.name).charAt(0).toUpperCase() + res.message.user.name.slice(1) + '!');	//	Send as a reply to all
    });
};