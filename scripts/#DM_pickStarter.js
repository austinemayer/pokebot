//  Description:
//    Tell oak to give you a pokemans.
//
//  Dependencies:
//		None
//
//  Configuration:
//		None
//
//  Commands:
//		 starter - Choose your starting pokemon.
//
//  Author:
//    Austin Mayer
//    Andrew Studnicky

//	TODO:

//	After user_pokemon table is created, add a check here for the user already has a pokemon.
//	If they do, skip the entire script.

//	Convert this procedure to an object and instantiate per user
//	Ensure that the appropriate instance is answering the correct user
//	Otherwise users may be able to intercept each other's starter script

//	Figure out how to de-register listeners using middleware and listener metadata
//	Otherwise oak will reply any time he hears these pokemon's names, which is bad.
//	https://github.com/github/hubot/blob/master/docs/scripting.md#listener-metadata

module.exports = function starter (robot) {

	robot.respond(/starter(.*)$/i, {id: 'starter.init'}, function (res) {

		if (res.message.room != res.message.user.name) {
			res.reply("Please private message me!");
			return;

		} else {

		//	Get what the user gave us...
		var userQuery = res.match[1].trim() || "";

		//	Play regexplinko with the response...
		switch (true) {
			case (/(^list\s*generations)/ig).test(userQuery):
				//	Get the list of generations
				(function(){

					var generations = getGenList();
					res.send("Generations available to choose from are:\n");
					generations.forEach(function(gen){
						res.send("•\t" + gen + "\n");
					});

				})();
				break;
				case (/(^list\s*[1-6](st|nd|rd|th)?|other)/ig.test(userQuery)):
				(function(){

					var gen = userQuery.match(/[1-6]|other/)[0];
					res.send("Pokemon available from set " + gen + " are: \n");
					if (gen == "other"){gen = 0;}	//	Set 'other' to 0...

					//	Get the list of starters from the gen selected
					var starters = getStartersByGen(gen);

					starters.forEach(function(pokemon){
						res.send("•\t:" + pokemon.toLowerCase() + ": " + pokemon + " \n");
					});

				})();
				break;
				case (/(^list\s*all)/ig.test(userQuery)):
				(function(){

					//	Get the list of starters from the gen selected
					var starters = getAllStarters();
					res.send("All starter pokemon available are: \n");
					starters.forEach(function(pokemon){
						res.send("•\t:" + pokemon.toLowerCase() + ": " + pokemon + " \n");
					});

				})();
				break;
				case (/(^pick\s*.*)/ig.test(userQuery)):
				(function(){

					var selected = userQuery.substring(4).trim();
					var starters = getAllStarters();

					//	Capitalize the input or it will fail check
					if (starters.indexOf(selected.charAt(0).toUpperCase() + selected.slice(1)) != -1){

					//	TODO: Store result into user_pokemon table!!!

						res.send("You've selected :" + selected.toLowerCase() + ": " + selected + " as your starter pokemon.\nGreat choice, " + res.message.user.name + "!");
					} else {
						res.send("I\'m sorry, " + res.message.user.name + ", but " + selected + " is not available.");
					}

				})();
				break;
				default:
				var topics = ["starter list generations", "starter list <generation number or 'all'>", "starter pick <pokemon>"];

				res.reply("Use the following commands to pick your starter pokemon.\n");
				topics.forEach(function(element){
					res.send("•\t" + element + "\n");
				});
			}
		}
	});

function getGenList(){

	var data = [];
	starter_options.forEach(function(e){
		data.push(e.gen);
	});

	return data.sort();
}

function getStartersByGen(gen){

	var data = [];
	starter_options[gen].starters.forEach(function(e){
		data.push(e.name);
	});

	return data.sort();
}

function getAllStarters(){

	var data = [];
	starter_options.forEach(function(e){
		e.starters.forEach(function(pkmn){
			data.push(pkmn.name);		
		});
	});

	return data.sort();
}

	//	Have this static data at the ready
	//	TODO: Retrieve starters from database
	var starter_options = [
	{gen: "Other Starters", starters: [
		{name: "Pikachu", national_id: 25},
		{name: "Eevee", national_id: 133},
		{name: "Marill", national_id: 183},
		{name: "Ralts", national_id: 280}
	]},
	{gen: "1st Generation", starters: [
		{name: "Bulbasaur", national_id: 1},
		{name: "Charmander", national_id: 4},
		{name: "Squirtle", national_id: 7}
	]},
	{gen: "2nd Generation", starters: [
		{name: "Chikorita", national_id: 152},
		{name: "Cyndaquil", national_id: 155},
		{name: "Totodile", national_id: 158}
	]},
	{gen: "3rd Generation", starters: [
		{name: "Treecko", national_id: 252},
		{name: "Torchic", national_id: 255},
		{name: "Mudkip", national_id: 258}
	]},
	{gen: "4th Generation", starters: [
		{name: "Turtwig", national_id: 387},
		{name: "Chimchar", national_id: 390},
		{name: "Piplup", national_id: 393}
	]},
	{gen: "5th Generation", starters: [
		{name: "Snivy", national_id: 495},
		{name: "Tepig", national_id: 498},
		{name: "Oshawott", national_id: 501}
	]},
	{gen: "6th Generation", starters: [
		{name: "Chespin", national_id: 650},
		{name: "Fennekin", national_id: 653},
		{name: "Froakie", national_id: 656}
	]}
	];

};