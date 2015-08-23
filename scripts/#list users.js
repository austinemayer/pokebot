//  Description:
//    List all users in the room
//
//  Dependencies:
//		None
//
//  Configuration:
//		None
//
//  Commands:
//		list users
//
//  Author:
//    Andrew Studnicky

module.exports = function listUsers (robot) {
   return robot.respond(/list users$/i, function (res) {

   		console.log(res.envelope.room);
 		console.log("Start loop");

   		for (var user in res.envelope.room.user) {
   			console.log('Do the thing.');
        	res.send('This guy ' + user.name);
   		}
   	});
};