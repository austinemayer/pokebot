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
//	hubot tall grass      - spawn a wild pokemon
//
//	Author:
//	Andrew Studnicky

module.exports = function tallGrass (robot) {

	//	Define required modules
	var Sequelize = require('sequelize');

	//	Define requires data models
	var Models = require('./models'),
		User = Models.User,
		Pokemon = Models.Pokemon,
		User_Pokemon = Models.User_Pokemon;

	robot.respond(/(tall\s*grass)$/i, {id: 'tallGrass'}, function (res) {

		//	TODO: Logic here to select pokemon from database with appropriate rarity scope
		var this_pokemon = Pokemon.build({
			abilities: [{"name": "glitch"}],
			attack: 136,
			catch_rate: 0,
			defense: 0,
			evolutions: {},
			growth_rate: {},
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

		robot.messageRoom('general', "A wild :" + this_pokemon.name.toLowerCase() + ": " + this_pokemon.name + " has appeared!");

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