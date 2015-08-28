//	Description:
//	Tell oak to DM you
//
//	Dependencies:
//	None
//
//	Configuration:
//	None
//
//	Commands:
//	tall grass - spawn a wild pokemon
//
//	Author:
//	Andrew Studnicky


//	Define required modules -- I don't feel like this should be global but why does this crash if I scope it?
Sequelize = require('sequelize');

//	Define requires data models
var Models = require('./models'),
	Pokemon = Models.Pokemon;

module.exports = function tallGrass (robot) {

	robot.respond(/(tall\s*grass)$/i, function (res) {

		//	Logic here to select pokemon from appropriate scope
		var this_pokemon = Pokemon.build({
			abilities: [{"name": "glitch"}],
			attack: 136,
			catch_rate: 0,
			defense: 0,
			evolutions: {},
			hp: 33,
			male_female_ratio: 0,
			movelist: {},
			name: "Missingno",
			national_id: 0,
			sp_atk: 6,
			sp_def: 6,
			speed: 0,
			types: [{"type": "flying"},{"type": "normal"}]
		});

		robot.messageRoom('general', "A wild :" + this_pokemon.name + ": " + this_pokemon.name + " has appeared!");

		//	Save the instance to the database
		this_pokemon.save()
		.then(function(){
			robot.messageRoom(res.message.user.name, "Pokemon saved as: " + this_pokemon);
		})
		.catch(function(error){
			robot.messageRoom(res.message.user.name, "Hmm... ask a dev about this?\n" + error);
		});

	});

};