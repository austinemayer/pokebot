//  Description:
//    Start a new DM
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

module.exports = function dmNewUser (robot) {
   return robot.enter(function (res) {
   		message = ('Hello, ' + (res.message.user.name).charAt(0).toUpperCase() + '!');
   		robot.messageRoom({room: res.message.user.name}, message);	//	Send to the user channel
   	});
};