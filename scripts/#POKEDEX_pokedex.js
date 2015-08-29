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
//	hubot pokedex <query> - Return pokedex data from pokeapi.com by name or national pokedex number
//
//	Author:
//	Andrew Studnicky

//	Refer here for how to make Hubot send preformatted attachments:
//	https://github.com/inkel/hubot-slack-attachment
//	https://api.slack.com/docs/attachments

module.exports = function pokedex(robot) {

var request = require('request');

	//	Build return request
	return robot.respond(/pokedex(.*)/i, function(res) {

		//	Only do this in the pokedex channel or DM
		if (res.message.room == "pokedex" || res.message.room == res.message.user.name) {

			//	Get the user query, remove colons so people can use the emotes for fun
			var pokemon = res.match[1].replace(/:$/,'').toLowerCase().trim();

			if (pokemon.length > 0) {
				var endPoint = 'http://pokeapi.co/api/v1/pokemon/' + pokemon;
				// res.robot.http(endpoint).query(pokemon).get()
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
				//	Null or no pattern matched.
				res.reply('Tell me a name or _National Pokedex ID_ of a Pokémon to learn about it!');
			}
		}
	});

	function parseReply(json) {

		pokemonData = JSON.parse(json);
		//	This is a bit hacky, but it returns the pokemon's picture from the API without making a second call.
		var data = 'http://pokeapi.co/media/img/' + pokemonData.national_id + '.png\n' + '*Name:*\t\t\t' +  pokemonData.name + '\n\n';
		//	Types may contain one or two objects, so this has to be a bit weird...
		//	I should maybe use handlebars...
		data += '*Type*:\t\t\t';
		pokemonData.types.map(function(e){
			data += e.name.charAt(0).toUpperCase() + e.name.slice(1) + ' ';
		});
		data += '\n\n';
		//	Make power level bars for stats because they're fun!
		[	//	Dict obj sets display strings for keys
			{attack:"Attack"},
			{defense:"Defense"},
			{hp:"Hit points"},
			{speed:"Speed"},
			{sp_def:"Special Defense"},
			{sp_atk:"Special Attack"}
		].map(function(obj){
			//	Iterate desired keys, generate string with ASCII powerbar
			for (var key in obj){
				var bar_len = pokemonData[key]/10;
				var bar = '', tabs = '\t', count = 0;
				do {
					bar += '█';
					count++;
				} while(count < bar_len);
				if (obj[key].length < 14){
					tabs += "\t";
				}
				data += '*' + obj[key] + '*:' + tabs + pokemonData[key] + '\n' + bar + '\n\n';
			}
		});
		return (data);

		
	}
};
