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
//		info - show a list of available info topics
//		info <query> - get info about the named topic (currently just "me")
//
//  Author:
//    Andrew Studnicky

module.exports = function getInfo (robot) {

	robot.respond(/info$/i, function (res) {
		var topics = ["me"];
		
		res.reply("I can certainly help! Just tell me what you need info on.\n");
		topics.forEach(function(element){
			res.send("•\t" + element + "\n");
		});
	});

	robot.respond(/info (.*)$/i, function (res) {
		var infoQuery = res.match[1].trim(),
			fromWhom = res.message.user.name;

		switch (infoQuery) {
			case "me":
				var roomSent = res.message.room,
				fromWhomID = res.message.user.id;
				res.send('Your userID is ' + fromWhomID + ', and you just asked about *' + infoQuery + '* in the ' + roomSent + ' channel.');
			break;
			default:
				res.reply('I\'m sorry, ' + fromWhom + ', I can\'t tell you about  *' + infoQuery + '* right now.');
			break;
		}
	});
};