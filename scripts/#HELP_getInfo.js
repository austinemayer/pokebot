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
//	hubot info            - Show a list of available info topics
//
//	Author:
//	Andrew Studnicky

module.exports = function getInfo (robot) {

	robot.respond(/info(.*)$/i, function (res) {
		//	Check the room first, only answer DM or help channel
		if (res.message.room != "help" || res.message.room != res.message.user.name){
			robot.messageRoom(res.message.user.name, "I can only answer help questions in the help channel or via private message, @" + (res.message.user.name).charAt(0).toUpperCase() + res.message.user.name.slice(1) + ".");
			return;
		} else {
			var infoQuery = res.match[1].trim() || "";
			switch (infoQuery) {
				case "me":
				res.send('Your userID is ' + res.message.user.id + ', and you just asked about *' + infoQuery + '* in the ' + res.message.room + ' channel.');
				break;
				default:
				var topics = ["me"];
				res.reply("I can certainly help! Just tell me what you need info on.\n");
				topics.forEach(function(element){
					res.send("•\t" + element + "\n");
				});
			}
		}
	});
};