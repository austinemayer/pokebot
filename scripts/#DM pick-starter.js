//  Description:
//    Tell oak to give you pokemans.
//
//  Dependencies:
//		None
//
//  Configuration:
//		None
//
//  Commands:
//		 pick starter - Choose your starting pokemon.
//
//  Author:
//    Austin Mayer

module.exports = function pickStarter (robot) {
//slack_id: res.message.user.id, slack_name: res.message.user.name;, starter_id: “”, nickname: “"

var pkmnObj = {};
var startersObj = {[
					{"Bulbasaur":"001","Charmander":"004","Squirtle":"007"},
					{"Chikorita":"000","Cyndaquil":"000","Totodile":"000"},
					{"Treecko":"000","Torchic":"000","Mudkip":"000"},
					{"Turtwig":"000","Chimchar":"000","Piplup":"000"},
					{"Snivy":"000","Tepig":"000","Oshawott":"000"},
					{"Chespin":"000","Fennekin":"000","Froakie":"000"}
				]};

   robot.respond(/pick starter$/i, function (res) {

	   	if (res.message.room == res.message.user.name) {

	   		pkmnObj.slack_id = res.message.user.id,
	   		pkmnObj.slack_name = res.message.user.name;
	   		
	   		res.send(res.message.user.name, "Ok, what is your favorite generation?");

	   		robot.hear(/gen (.*)$/i, function (res){
				var favGen = res.match[1].trim();
				
				switch(favGen){
					case "1":
					res.send("Would you like Bulbasaur :bulbasaur:, Charmander :charmander:, or Squirtle :squirtle: ?");
					finalizeStarter(pkmn[0]);
					break;

					case "2":
					res.send('Would you like Chikorita :chikorita:, Cyndaquil :cyndaquil, or Totodile :totodile: ?');
					finalizeStarter();
					break;

					case "3":
                    res.send('Would you like Treecko :treecko:, Torchic :torchic:, or Mudkip :mudkip: ?');
					finalizeStarter();
					break;

					case "4":
					res.send("Would you like Turtwig :turtwig:, Chimchar :chimchar:, or Piplup :piplup: ?");
					finalizeStarter();
					break;

					case "5":
					res.send("Would you like Snivy :snivy:, Tepig :tepig:, or Oshawott :oshawott: ?");
					finalizeStarter();
					break;

					case "6":
					res.send("Would you like Chespin :chespin:, Fennekin :fennekin:, or Froakie :froakie: ?");
					finalizeStarter();
					break;

					case 'default':
					res.send('Not real');
				}

			});

	   	}else{

	   		res.send("Please private message me to choose pokemon");

	   	};

	});

	function finalizeStarter(){
		robot.respond(/(.*)/i, function (res){
			var starter = res.match[1].trim().toLowerCase();

			console.log("Starter:"+starter);
			
			if (startersObj[starter]){

				for (key in pok)
				res.send("Win");
			}else{
				res.send("Loose");
			}

		});
	}
	
};
