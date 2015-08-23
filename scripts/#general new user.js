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

module.exports = function newUser (robot) {
   return robot.enter(function (res) {
        res.send('Hello, ' + res.message.user.name + '!');	//	Send as a reply to all
    });
};