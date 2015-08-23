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
//		pokebot info - \t\tShow a list of available info topics
//		pokebot info <query> - \t\tGet info about the topic specified
//
//  Author:
//    Andrew Studnicky

module.exports = function getInfo (robot) {

	robot.respond(/info$/i, function (res) {
		console.log(res.message);
		if (res.message.room == "help"){
			var topics = ["me"];
		
			res.reply("I can certainly help! Just tell me what you need info on.\n");
			topics.forEach(function(element){
				res.send("•\t" + element + "\n");
			});
		} else {
   			robot.messageRoom('#help', "Let's talk here, @" + (res.message.user.name).charAt(0).toUpperCase() + res.message.user.name.slice(1) + ".");
		}
	});

	robot.respond(/info (.*)$/i, function (res) {
		var infoQuery = res.match[1].trim(),
			fromWhom = res.message.user.name;

		if (res.message.room == "help"){
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
		} else {
   			robot.messageRoom('#help', "Let's talk here, @" + (res.message.user.name).charAt(0).toUpperCase() + res.message.user.name.slice(1) + ".");
		}
	});
};