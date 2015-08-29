//	Description:
//		Database configuration file
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

var Sequelize = require('sequelize'),	//	require node module
	sequelize = null,					//	create an empty class reference
	postgres = {};						//	create empty DB object

//	Define database connection from env variable, default to local if not present
var database_uri = process.env.DATABASE_URL || 'postgres://pokebot:oak@localhost:5432/pokebot';

//	instaniate a new Sequelize class
sequelize = new Sequelize(database_uri, {
	dialect:  'postgres',
	protocol: 'postgres'
});

//	Build our reference object
postgres = {
	sequelize: sequelize,
	Sequelize: Sequelize, 
	//  Define models as attributes from script files
	User: 			sequelize.import(__dirname + '/user_model.js'),
	Pokemon:		sequelize.import(__dirname + '/pokemon_model.js'),
	User_Pokemon:	sequelize.import(__dirname + '/user_pokemon_model.js')
};

	/* Associations go here */

	// global.postgres.User.hasMany(global.postgres.SomethingElse)

module.exports = postgres;