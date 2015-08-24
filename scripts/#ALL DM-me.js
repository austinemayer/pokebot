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
//		pokebot DM me - tell Oak to DM you
//
//  Author:
//    Andrew Studnicky

module.exports = function DMme (robot) {

   robot.respond(/DM me$/i, function (res) {
   		//	Demo of sending DM to a user from a response.
   		robot.messageRoom(res.message.user.name, "Sup, " + (res.message.user.name).charAt(0).toUpperCase() + res.message.user.name.slice(1) + "?");	//	Send to the user channel
   	
   		//	This method should be used for presenting data not desired in the main channels.
   	});

};