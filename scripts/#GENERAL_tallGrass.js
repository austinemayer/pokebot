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

	//	TODO: This script should run on a timer, and not be called directly.
	//	The rarity index should be based on the number of users present in the channel. 
	robot.respond(/(tall\s*grass(.*))$/i, {id: 'tallGrass'}, function (res) {

		var rarity = res.match[1].replace(/(tall\s*grass)/ig, "").trim() || "";
		switch (true) {
		case (parseInt(rarity) >= 0 && parseInt(rarity) <= 255) :
			spawnPokemon(res.message, rarity);
			break;
		default:
			res.send('This command spawns a wild pokemon with a rarity index between 0 and 255.');
		}

	//	Use API to get current active users in room

	//	Generate rarity

	//	Make DB call

	//	Spawn pokemon

	});

	function spawnPokemon(context, rarity){

			//	TODO: Logic here to select pokemon from database with appropriate rarity scope
			//	For now just use a random number to pick a random index from static array
			var selector = Math.floor(Math.random() * pokemon_list.length);

			console.log(selector);

			var this_pokemon = Pokemon.build(pokemon_list[selector]);

			//	Specify target room because this script is non-reply invoked
			robot.messageRoom('general', "A wild :" + this_pokemon.name.toLowerCase() + ": " + this_pokemon.name + " has appeared!");

			//	Save the instance to the database
			//	This shouldn't *actually* save but right now the DB isn't prepopulated and I wanted to run tests on it
			this_pokemon.save()
			.then(function(){
				robot.messageRoom(context.user.name, "Pokemon saved as: " + this_pokemon);
			})
			.catch(function(error){
				robot.messageRoom(context.user.name, "Pokemon didn't save.\n" + error + "\nSafe to ignore unqiue key constraint errors.");
			});

	}

	var pokemon_list = [
	{
		abilities: [
			{"name": "glitch"}
		],
		attack: 136,
		catch_rate: 0,
		defense: 0,
		evolutions: [{}],
		gen: 1,
		growth_rate: {},
		hp: 33,
		is_starter: false,
		male_female_ratio: 0,
		movelist: {},
		name: "Missingno",
		national_id: 0,
		sp_atk: 6,
		sp_def: 6,
		speed: 0,
		types: [
			{type: "flying"},
			{type: "normal"}
		]
	},

	{	
		abilities: [
			{name:"static"},
			{name:"lightningrod"}
		],
		attack: 55,
		catch_rate: 190,
		defense: 40,
		evolutions: [
			{name: "Raichu", national_id:"26", method:"thunderstone"}
		],
		gen: 1,
		growth_rate: {rate:"medium fast"},
		hp: 35,
		is_starter: true,
		male_female_ratio: 1/7,
		movelist: {},
		name: "Pikachu",
		national_id: 25,
		sp_atk: 50,
		sp_def: 50,
		speed: 90,
		types: [
			{name:"electric"}
		]
	},

	{
		abilities: [
			{"name": "run-away"},
			{name: "adaptability"},
			{name: "anticipation"}
		],
		attack: 55,
		catch_rate: 45,
		defense: 50,
		evolutions: [
			{name: "Umbreon", national_id:"197",method: "happiness"},
			{name: "Sylveon", national_id:"700", method: "level_up"},
			{name: "Leafeon", national_id: "470", method: "leafstone"},
			{name: "Glaceon", national_id: "471", method: "icestone"},
			{name: "Vaporeon", national_id: "134", method: "waterstone"},
			{name: "Jolteon", national_id: "135", method: "thunderstone"},
			{name: "Flareon", national_id: "136", method: "firestone"},
			{name: "Espeon", national_id: "197", method: "happiness"}
		],
		gen: 1,
		growth_rate: {rate: "medium fast"},
		hp: 55,
		is_starter: true,
		male_female_ratio: 1/7,
		movelist: {},
		name: "Eevee",
		national_id: 133,
		sp_atk: 45,
		sp_def: 65,
		speed: 55,
		types: [
			{name: "normal"}
		]
	},

	{	
		abilities: [{name:"huge-power"},{name:"thick-fat"},{name:"sap-sipper"}],
		attack: 20,
		catch_rate: 190,
		defense: 50,
		evolutions: [
			{name: "Azumarill", national_id:"184", method:"level_up"}
		],
		gen: 2,
		growth_rate: {rate:"fast"},
		hp: 70,
		is_starter: true,
		male_female_ratio: 1/7,
		movelist: {},
		name: "Marill",
		national_id: 183,
		sp_atk: 20,
		sp_def: 50,
		speed: 40,
		types: [
			{name:"water"},
			{name: "fairy"}
		]
	},

	{	
		abilities: [
			{name:"synchronize"},
			{name:"trace"},
			{name:"telepathy"}
		],
		attack: 25,
		catch_rate: 235,
		defense: 25,
		evolutions: [
			{name: "Kirlia", national_id:"281", method:"level_up"}
		],
		gen: 3,
		growth_rate: {rate:"slow"},
		hp: 40,
		is_starter: true,
		male_female_ratio: 1/7,
		movelist: {},
		name: "Ralts",
		national_id: 280,
		sp_atk: 45,
		sp_def: 35,
		speed: 40,
		types: [
			{name:"fairy"},
			{name: "psychic"}
		]
	}
	];



};

