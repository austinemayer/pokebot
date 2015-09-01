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

	//	Define required data models
	var Models = require('./models'),
		User = Models.User,
		Pokemon = Models.Pokemon,
		Pokemon_Instance = Models.Pokemon_Instance;

	//	Recursive self-executing function!
	//	Start spawning wild pokemon!
	(function tallGrassLoop(){
		setTimeout(function(){
			spawnPokemon(setRarity());
			tallGrassLoop();
		}, setTimer());
	})();

	//	Randomize timer between 7.5 and 15 minutes...
	function setTimer(){
		var timer = Math.floor(Math.random() * 450000 + 450000);
		return timer;
	}

	function setRarity(){
		//	The rarity index should be based on the number of users present in the channel.
		//	Pending on proper database import.
		return 1;
	}


	//	Leave this command in as restricted for admins once middleware is in place 
	robot.respond(/(tall\s*grass(.*))$/i, {id: 'tallGrass'}, function (res) {

		var rarity = res.match[1].replace(/(tall\s*grass)/ig, "").trim() || "";
		switch (true) {
		case (parseInt(rarity) >= 0 && parseInt(rarity) <= 255):
			spawnPokemon(rarity);
			break;
		default:
			res.send('This command spawns a wild pokemon with a rarity index between 0 and 255.');
		}

	//	Use API to get current active users in room

	//	Generate rarity

	//	Make DB call

	//	Spawn pokemon

	});

	function spawnPokemon(rarity){

			//	TODO: Logic here to select pokemon from database with appropriate rarity scope

			//	For now, just use a random number to pick an index from static object array
			var selector = Math.floor(Math.random() * pokemon_list.length);

			var this_pokemon = Pokemon.build(pokemon_list[selector]);

			//	Specify target room because this script is non-reply invoked
			robot.messageRoom('general', "A wild :" + this_pokemon.name.toLowerCase() + ": " + this_pokemon.name + " has appeared!");

			//	If a pokemon isn't in the DB but gets called, save it.
			//	These should all safetly fail on SequelizeUniqueConstraintError if they already exist (db init)
			this_pokemon.save();
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
		is_wild: false,
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
			{name: "Raichu", national_id: "26", method: "thunderstone"}
		],
		gen: 1,
		growth_rate: {rate: "medium fast"},
		hp: 35,
		is_starter: true,
		is_wild: true,
		male_female_ratio: 1/7,
		movelist: {},
		name: "Pikachu",
		national_id: 25,
		sp_atk: 50,
		sp_def: 50,
		speed: 90,
		types: [
			{name: "electric"}
		]
	},

	{
		abilities: [
			{name: "run-away"},
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
		is_wild: true,
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
		abilities: [
			{name: "huge-power"},
			{name: "thick-fat"},
			{name: "sap-sipper"}
		],
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
		is_wild: true,
		male_female_ratio: 1/7,
		movelist: {},
		name: "Marill",
		national_id: 183,
		sp_atk: 20,
		sp_def: 50,
		speed: 40,
		types: [
			{name: "water"},
			{name: "fairy"}
		]
	},

	{	
		abilities: [
			{name: "synchronize"},
			{name: "trace"},
			{name: "telepathy"}
		],
		attack: 25,
		catch_rate: 235,
		defense: 25,
		evolutions: [
			{name: "Kirlia", national_id: "281", method: "level_up"}
		],
		gen: 3,
		growth_rate: {rate: "slow"},
		hp: 40,
		is_starter: true,
		is_wild: true,
		male_female_ratio: 1/7,
		movelist: {},
		name: "Ralts",
		national_id: 280,
		sp_atk: 45,
		sp_def: 35,
		speed: 40,
		types: [
			{name: "fairy"},
			{name: "psychic"}
		]
	},

	{	
		abilities: [
			{name: "chlorophyll"},
			{name: "overgrow"}
		],
		attack: 49,
		catch_rate: 45,
		defense: 49,
		evolutions: [
			{name: "Ivysaur", national_id: "2", method: "level_up"}
		],
		gen: 1,
		growth_rate: {rate: "medium slow"},
		hp: 45,
		is_starter: true,
		is_wild: true,
		male_female_ratio: 1/7,
		movelist: {},
		name: "Bulbasaur",
		national_id: 1,
		sp_atk: 65,
		sp_def: 65,
		speed: 45,
		types: [
			{name: "poison"},
			{name: "grass"}
		]
	},

	{	
		abilities: [
			{name: "blaze"},
			{name: "solar-power"}
		],
		attack: 52,
		catch_rate: 45,
		defense: 43,
		evolutions: [
			{name: "Charmeleon", national_id: "5", method: "level_up"}
		],
		gen: 1,
		growth_rate: {rate: "medium slow"},
		hp: 39,
		is_starter: true,
		is_wild: true,
		male_female_ratio: 1/7,
		movelist: {},
		name: "Charmander",
		national_id: 4,
		sp_atk: 60,
		sp_def: 50,
		speed: 65,
		types: [
			{name: "fire"}
		]
	},

	{	
		abilities: [
			{name: "rain-dish"},
			{name: "torrent"}
		],
		attack: 48,
		catch_rate: 45,
		defense: 65,
		evolutions: [
			{name: "Wartortle", national_id: "8", method: "level_up"}
		],
		gen: 1,
		growth_rate: {rate: "medium slow"},
		hp: 44,
		is_starter: true,
		is_wild: true,
		male_female_ratio: 1/7,
		movelist: {},
		name: "Squirtle",
		national_id: 7,
		sp_atk: 50,
		sp_def: 64,
		speed: 43,
		types: [
			{name: "water"}
		]
	},

	{	
		abilities: [
			{name: "overgrow"},
			{name: "leaf-guard"}
		],
		attack: 49,
		catch_rate: 45,
		defense: 65,
		evolutions: [
			{name: "Bayleef", national_id: "153", method: "level_up"}
		],
		gen: 2,
		growth_rate: {rate: "medium slow"},
		hp: 45,
		is_starter: true,
		is_wild: true,
		male_female_ratio: 1/7,
		movelist: {},
		name: "Chikorita",
		national_id: 152,
		sp_atk: 49,
		sp_def: 65,
		speed: 45,
		types: [
			{name: "grass"}
		]
	},

	{	
		abilities: [
			{name: "flash-fire"},
			{name: "blaze"}
		],
		attack: 52,
		catch_rate: 45,
		defense: 43,
		evolutions: [
			{name: "Quilava", national_id: "156", method: "level_up"}
		],
		gen: 2,
		growth_rate: {rate: "medium slow"},
		hp: 39,
		is_starter: true,
		is_wild: true,
		male_female_ratio: 1/7,
		movelist: {},
		name: "Cyndaquil",
		national_id: 155,
		sp_atk: 60,
		sp_def: 50,
		speed: 65,
		types: [
			{name: "fire"}
		]
	},

	{	
		abilities: [
			{name: "torrent"},
			{name: "sheer-force"}
		],
		attack: 65,
		catch_rate: 45,
		defense: 64,
		evolutions: [
			{name: "Croconaw", national_id: "159", method: "level_up"}
		],
		gen: 2,
		growth_rate: {rate: "medium slow"},
		hp: 50,
		is_starter: true,
		is_wild: true,
		male_female_ratio: 1/7,
		movelist: {},
		name: "Totodile",
		national_id: 158,
		sp_atk: 44,
		sp_def: 48,
		speed: 43,
		types: [
			{name: "water"}
		]
	},

	{	
		abilities: [
			{name: "overgrow"},
			{name: "unburden"}
		],
		attack: 45,
		catch_rate: 45,
		defense: 35,
		evolutions: [
			{name: "Grovyle", national_id: "253", method: "level_up"}
		],
		gen: 3,
		growth_rate: {rate: "medium slow"},
		hp: 40,
		is_starter: true,
		is_wild: true,
		male_female_ratio: 1/7,
		movelist: {},
		name: "Treecko",
		national_id: 252,
		sp_atk: 65,
		sp_def: 55,
		speed: 70,
		types: [
			{name: "grass"}
		]
	},

	{	
		abilities: [
			{name: "speed-boost"},
			{name: "blaze"}
		],
		attack: 60,
		catch_rate: 45,
		defense: 40,
		evolutions: [
			{name: "Combusken", national_id: "256", method: "level_up"}
		],
		gen: 3,
		growth_rate: {rate: "medium slow"},
		hp: 45,
		is_starter: true,
		is_wild: true,
		male_female_ratio: 1/7,
		movelist: {},
		name: "Torchic",
		national_id: 255,
		sp_atk: 70,
		sp_def: 50,
		speed: 45,
		types: [
			{name: "fire"}
		]
	},

	{	
		abilities: [
			{name: "damp"},
			{name: "torrent"}
		],
		attack: 70,
		catch_rate: 45,
		defense: 50,
		evolutions: [
			{name: "Marshtomp", national_id: "259", method: "level_up"}
		],
		gen: 3,
		growth_rate: {rate: "medium slow"},
		hp: 50,
		is_starter: true,
		is_wild: true,
		male_female_ratio: 1/7,
		movelist: {},
		name: "Mudkip",
		national_id: 258,
		sp_atk: 50,
		sp_def: 50,
		speed: 40,
		types: [
			{name: "water"}
		]
	},

	{
		abilities: [
			{name: "overgrow"},
			{name: "shell-armor"}
		],
		attack: 68,
		catch_rate: 45,
		defense: 64,
		evolutions: [
			{name: "Grotle", national_id: "388", method: "level_up"}
		],
		gen: 4,
		growth_rate: {rate: "medium slow"},
		hp: 55,
		is_starter: true,
		is_wild: true,
		male_female_ratio: 1/7,
		movelist: {},
		name: "Turtwig",
		national_id: 387,
		sp_atk: 45,
		sp_def: 55,
		speed: 31,
		types: [
			{name: "grass"}
		]
	},

	{	
		abilities: [
			{name: "blaze"},
			{name: "iron-fist"}
		],
		attack: 58,
		catch_rate: 45,
		defense: 44,
		evolutions: [
			{name: "Monferno", national_id: "391", method: "level_up"}
		],
		gen: 4,
		growth_rate: {rate: "medium slow"},
		hp: 44,
		is_starter: true,
		is_wild: true,
		male_female_ratio: 1/7,
		movelist: {},
		name: "Chimchar",
		national_id: 390,
		sp_atk: 58,
		sp_def: 44,
		speed: 61,
		types: [
			{name: "fire"}
		]
	},

	{	
		abilities: [
			{name: "torrent"},
			{name: "defiant"}
		],
		attack: 51,
		catch_rate: 45,
		defense: 53,
		evolutions: [
			{name: "Prinplup", national_id: "394", method: "level_up"}
		],
		gen: 4,
		growth_rate: {rate: "medium slow"},
		hp: 53,
		is_starter: true,
		is_wild: true,
		male_female_ratio: 1/7,
		movelist: {},
		name: "Piplup",
		national_id: 393,
		sp_atk: 61,
		sp_def: 56,
		speed: 40,
		types: [
			{name: "water"}
		]
	},

	{	
		abilities: [
			{name: "overgrow"},
			{name: "contrary"}
		],
		attack: 45,
		catch_rate: 45,
		defense: 55,
		evolutions: [
			{name: "Servine", national_id: "496", method: "level_up"}
		],
		gen: 5,
		growth_rate: {rate: "medium slow"},
		hp: 45,
		is_starter: true,
		is_wild: true,
		male_female_ratio: 1/7,
		movelist: {},
		name: "Snivy",
		national_id: 495,
		sp_atk: 45,
		sp_def: 55,
		speed: 63,
		types: [
			{name: "grass"}
		]
	},
	
	{	
		abilities: [
			{name: "thick-fat"},
			{name: "blaze"}
		],
		attack: 63,
		catch_rate: 45,
		defense: 45,
		evolutions: [
			{name: "Pignite", national_id: "499", method: "level_up"}
		],
		gen: 5,
		growth_rate: {rate: "medium slow"},
		hp: 65,
		is_starter: true,
		is_wild: true,
		male_female_ratio: 1/7,
		movelist: {},
		name: "Tepig",
		national_id: 498,
		sp_atk: 45,
		sp_def: 45,
		speed: 45,
		types: [
			{name: "fire"}
		]
	},
	
	{	
		abilities: [
			{name: "torrent"},
			{name: "shell-armor"}
		],
		attack: 55,
		catch_rate: 45,
		defense: 45,
		evolutions: [
			{name: "Dewott", national_id: "502", method: "level_up"}
		],
		gen: 5,
		growth_rate: {rate: "medium slow"},
		hp: 55,
		is_starter: true,
		is_wild: true,
		male_female_ratio: 1/7,
		movelist: {},
		name: "Oshawott",
		national_id: 501,
		sp_atk: 63,
		sp_def: 45,
		speed: 45,
		types: [
			{name: "water"}
		]
	},
	
	{	
		abilities: [
			{name: "overgrow"},
			{name: "bulletproof"}
		],
		attack: 61,
		catch_rate: 45,
		defense: 65,
		evolutions: [
			{name: "Quilladin", national_id: "651", method: "level_up"}
		],
		gen: 6,
		growth_rate: {rate: "medium slow"},
		hp: 56,
		is_starter: true,
		is_wild: true,
		male_female_ratio: 1/7,
		movelist: {},
		name: "Chespin",
		national_id: 650,
		sp_atk: 48,
		sp_def: 45,
		speed: 38,
		types: [
			{name: "grass"}
		]
	},
	
	{	
		abilities: [
			{name: "blaze"},
			{name: "magician"}
		],
		attack: 45,
		catch_rate: 45,
		defense: 40,
		evolutions: [
			{name: "Braixen", national_id: "654", method: "level_up"}
		],
		gen: 6,
		growth_rate: {rate: "medium slow"},
		hp: 40,
		is_starter: true,
		is_wild: true,
		male_female_ratio: 1/7,
		movelist: {},
		name: "Fennekin",
		national_id: 653,
		sp_atk: 62,
		sp_def: 60,
		speed: 60,
		types: [
			{name: "fire"}
		]
	},
	
	{	
		abilities: [
			{name: "torrent"},
			{name: "protean"}
		],
		attack: 56,
		catch_rate: 45,
		defense: 41,
		evolutions: [
			{name: "Frogadier", national_id: "657", method: "level_up"}
		],
		gen: 6,
		growth_rate: {rate: "medium slow"},
		hp: 41,
		is_starter: true,
		is_wild: true,
		male_female_ratio: 1/7,
		movelist: {},
		name: "Froakie",
		national_id: 656,
		sp_atk: 62,
		sp_def: 44,
		speed: 71,
		types: [
			{name: "water"}
		]
	}

	];

};

//	Template for new pokemon object

// {	
// 	abilities: [
// 		{name: ""},
// 		{name: ""},
// 		{name: ""}
// 	],
// 	attack: ,
// 	catch_rate: ,
// 	defense: ,
// 	evolutions: [
// 		{name: "", national_id: "", method: ""}
// 	],
// 	gen: ,
// 	growth_rate: {rate: ""},
// 	hp: ,
// 	is_starter: true,
// 	is_wild: true,
// 	male_female_ratio: ,
// 	movelist: {},
// 	name: "",
// 	national_id: ,
// 	sp_atk: ,
// 	sp_def: ,
// 	speed: ,
// 	types: [
// 		{name: ""},
// 		{name: ""}
// 	]
// },