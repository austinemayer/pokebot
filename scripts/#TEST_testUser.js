//	Description:
//		Test a user
//
//	Dependencies:
//		Sequelize
//
//	Configuration:
//		None
//
//	Commands:
//		None
//
//	Author:
//		Andrew Studnicky


//	Define required modules
var Sequelize = require('sequelize');

//	Define requires data models
var Models = require('./models'),
User = Models.User;

module.exports = function testUser (robot) {

	robot.respond(/test user$/i, function (res) {

		if (res.message.room != res.message.user.name) {
			res.reply("Please private message me!");
			return;
		} else {

		//	Instantiate a new user
		var this_user = User.build({
			slack_id: res.message.user.id,
			slack_name: res.message.user.name,
			slack_role: "user"
		});

		//	Save the instance to the database
		this_user.save()
		.then(function(){
			robot.messageRoom(res.message.user.name, "User saves as: " + this_user);
		})
		.catch(function(error){
			robot.messageRoom(res.message.user.name, "Hmm... ask a dev about this?\n" + error);
			robot.messageRoom(this_user);
		});

	}
});
};
