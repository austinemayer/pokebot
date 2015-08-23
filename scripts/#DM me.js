//  Description:
//    Tell oak to DM you
//
//  Dependencies:
//		None
//
//  Configuration:
//		None
//
//  Commands:
//		DM me - tell Oak to DM you
//
//  Author:
//    Andrew Studnicky

module.exports = function DMme (robot) {
   return robot.respond(/DM me$/i, function (res) {
   		robot.messageRoom({room: res.message.user.name}, "Sup?");	//	Send to the user channel
   	});
};