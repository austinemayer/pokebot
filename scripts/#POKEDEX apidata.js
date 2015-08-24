//	Description:
//	Retrieve Pokemon data from pokeapi endpoint.
//
//	Dependencies:
//	Request
//
//	Configuration:
//	None
//
//	Commands:
//	pokebot pokedex <query> - Return pokedex data from pokeapi.com by name or pokedex number
//
//	Author:
//	Andrew Studnicky

module.exports = function pokedex(robot) {

	var request = require('request');

	return robot.respond(/pokedex(.*)/i, function(res) {

		//	Only do this in the pokedex channel or DM
		if (res.message.room == "pokedex" || res.message.room == res.message.user.name) {

			//	Get the user query
			var pokemon = res.match[1].trim().toLowerCase();

			if (pokemon.length > 0) {
				var endPoint = 'http://pokeapi.co/api/v1/pokemon/' + pokemon;
				request( endPoint, function (error, response, body) {

					//	Base the reply on the response status code...
					switch(true){
						//	Good reply
						case (response.statusCode == 200):
						message = parseReply(response.body); 
						res.send(message);
						break;
						//	Server offline?
						case (response.statusCode >= 300 && response.statusCode < 400):
						res.reply('I\'m sorry, I seem to have misplaced that data.');
						break;
						//	Unrecognized request
						case (response.statusCode >= 400 && response.statusCode < 500):
						res.reply('I didn\'t understand you, did you spell that right?');
						break;
						//	Internal error
						case(response.statusCode>=500):
						res.reply('It seems I\'ve forgotten that.');
						break;
						//	Unknown bad reply
						case 'default':
						res.reply('Hmm, try asking again later.');
					}
				});
			} else {
				res.reply('Tell me a name or _National Pokedex ID_ of a Pokémon to learn about it!');
			}
		}

	});

function parseReply(json) {
	pokemonData = JSON.parse(json);
	var data = 'http://pokeapi.co/media/img/' + pokemonData.national_id + '.png\n' +
	'*Name:*\t\t\t' +  pokemonData.name + '\n\n';
			//	Types may contain one or two objects, so this has to be a bit weird...
			data += '*Type*:\t\t\t';
			pokemonData.types.map(function(e){
				data += e.name.charAt(0).toUpperCase() + e.name.slice(1) + ' ';
			});
			data += '\n\n';
			//	Make power level bars for stats because they're fun!
			[
				{attack:"Attack"},
				{defense:"Defense"},
				{hp:"Hit points"},
				{speed:"Speed"},
				{sp_def:"Special Defense"},
				{sp_atk:"Special Attack"}
			].map(function(obj){
				for (var key in obj){
					var bar_len = pokemonData[key]/10;
					var bar = '', tabs = '\t', count = 0;
					do {
						bar += '█';
						count++;
					} while(count < bar_len);
					if (obj[key].length < 14){tabs += "\t";}
					data += '*' + obj[key] + '*:' + tabs + pokemonData[key] + '\t' + bar + '\n\n';
				}});
			return (data);
		}

	};