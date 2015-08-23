//  Description:
//    Return information about selected topics
//
//  Dependencies:
//		None
//
//  Configuration:
//		None
//
//  Commands:
//		info
//		info <query>
//
//  Author:
//    Andrew Studnicky

module.exports = function getInfo (robot) {

   return robot.respond(/info (.*)$/i, function (res) {
   		infoQuery = res.match[1];
   		roomSent = res.message.room;
   		fromWhom = res.message.user.name;
   		fromWhomID = res.message.user.id;

   		//	Demo retrieving info about the query sent
        res.send('Info about ' + infoQuery + ' asked in ' + roomSent + ' by user ' + fromWhom + ' with id of ' + fromWhomID);	//	Send as a reply to all
    });

};