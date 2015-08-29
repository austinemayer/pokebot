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

//	Refer here for making hubot identify present users

	//	https://api.slack.com/methods/users.list/test
	//	https://slack.com/api/users.list?token={API TOKEn}&presence=1&pretty=1

	//	https://api.slack.com/methods/users.getPresence/test
	//	https://slack.com/api/users.getPresence?token={API TOKEN}&user={USER ID}&pretty=1

//	Refer here for identifying user info

	//	https://api.slack.com/methods/users.info/test
	// https://slack.com/api/users.info?token=xoxp-9504395826-9504467254-9531521718-1d3f52&user=U09EUDR7G&pretty=1

//	Define required modules
var Sequelize = require('sequelize');

//	Define requires data models
var Models = require('./models'),
User = Models.User;

module.exports = function testUser (robot) {

	robot.respond(/test\s*users?$/i, function (res) {

		if (res.message.room != res.message.user.name) {
			res.reply("Please private message me!");
			return;
		} else {

		//	Refer for how to get user info + role:
		//	https://api.slack.com/methods/users.info

		//	Instantiate a new user
		var this_user = User.build({
			slack_id: res.message.user.id.toString(),
			slack_name: res.message.user.name,
			slack_role: "user"
		});

		console.log(this_user);

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
