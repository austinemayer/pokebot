//	Description:
//	Return information about selected topics
//
//	Dependencies:
//	None
//
//	Configuration:
//	None
//
//	Commands:
//	pokebot info -          Show a list of available info topics
//
//	Author:
//	Andrew Studnicky
 
module.exports = function getInfo (robot) {

	robot.respond(/info$/i, function (res) {

		if (res.message.room == "help" || res.message.room == res.message.user.name){
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

		var infoQuery = res.match[1].trim();

		if (res.message.room == "help" || res.message.room == res.message.user.name){
			switch (infoQuery) {
				case "me":
					res.send('Your userID is ' + res.message.user.id + ', and you just asked about *' + infoQuery + '* in the ' + res.message.room + ' channel.');
				break;
				default:
					res.reply('I\'m sorry, ' + res.message.user.name + ', I can\'t tell you about  *' + infoQuery + '* right now.');
				break;
			}
		} else {
			robot.messageRoom('#help', "Let's talk here, @" + (res.message.user.name).charAt(0).toUpperCase() + res.message.user.name.slice(1) + ".");
		}

	});

};