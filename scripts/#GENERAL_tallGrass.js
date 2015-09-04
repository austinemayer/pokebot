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

module.exports = function tallGrass(robot) {

	//	Define required modules
	var Sequelize = require('sequelize');

	//	Define required data models
	var Models = require('./models'),
		User = Models.User,
		Pokemon = Models.Pokemon,
		Pokemon_Instance = Models.Pokemon_Instance;

	//	Initialize with no spawning enabled
	var wild = false;

	//	Leave this command in as restricted for admins once middleware is in place
	robot.respond(/((tall\s*grass)(.*))$/i, {id: 'admin.tallGrass'}, function (res) {
		var rarity = res.match[3].trim() || "";	//	Third capture group is the important part

		switch (true) {

		case (rarity == "stop"):		//	Turn off wild pokemon spawning
			wild = false;
			res.send('Wild pokemon spawning stopped.');
			break;

		case (rarity == "start"):		//	Turn on wild pokemon spawning
			wild = true;
			res.send('Wild pokemon spawning started.');
			break;

		case (parseInt(rarity) >= 0 && parseInt(rarity) <= 255):	//	Force a pokemon spawn with a specified rarity rating
			wildPokemon(rarity);
			break;

		default:
			res.send('Spawn a random wild pokemon with a rarity index between 0 _(Common)_ and 255 _(Legendary)_.');
		}

	});

	//	Recursive self-executing function! Neat! Start spawning wild pokemon!
	(function tallGrassLoop(){
		setTimeout(function(){
			if (wild === true) {
				wildPokemon(setRarity());
			}
			tallGrassLoop();
		}, setTimer());
	})();

	//	Randomize timer between 6 and 12 minutes...
	function setTimer(){
		//	TODO:: Timer min should be reduced by a factor of the number of present users in the channel
		return Math.floor(Math.random() * 360000 + 360000);
	}

	function setRarity(){
		//	TODO:: The rarity index should also be a factor of the number of present users present in the channel.
		return 254;	//	Just show all (non-legendary) pokemon for now
	}

	function wildPokemon(rarity){

		Pokemon.findOne({
			where:{
				is_wild: true,
				catch_rate: {$gte: (255-rarity)},	//	Invert for UX clarity (rarity as ascending numbers instead of descending)
			},
			order: [
				Sequelize.fn('RANDOM')
			]
		})
		.then(function(this_pokemon){
			//	Specify target room because this script is non-reply invoked
			robot.messageRoom('general', "Wild :" + this_pokemon.name.toLowerCase() + ": " + this_pokemon.name + " appeared!");
			//	Set pokemon timeout
			setTimeout(function escape(){
				robot.messageRoom('general', "Too slow! :" + this_pokemon.name.toLowerCase() + ": " + this_pokemon.name + " has escaped!");
			}, Math.floor(Math.random()*15000+20000-55*this_pokemon.speed));	//	Faster pokemon have shorter catch timers! :P

		});

	}


};