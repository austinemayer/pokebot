var Sequelize = require('sequelize'),	//	require node module containing class export
	sequelize = null,					//	initialize sequelize instance to null
	postgres = {};						//	initialize empty reference to postgres

//	Requires recommended for automating import and associations...
//	fs = require('fs');
//	path = require('path');

	//	Define database connection from env variable, default to local if not present
	var database_uri = process.env.DATABASE_URL || 'postgres://pokebot:oak@localhost:5432/pokebot';

	sequelize = new Sequelize(database_uri, {
			dialect:  'postgres',
			protocol: 'postgres'
	});
	
	//	Create reference object
	postgres = {
		Sequelize: Sequelize,
		sequelize: sequelize,
		
		//  Define models from script files
		User: 		sequelize.import(__dirname + '/user_model.js'),
		Pokemon:	sequelize.import(__dirname + '/pokemon_model.js')
	};

	/* Associations go here */
	// global.postgres.User.hasMany(global.postgres.SomethingElse)

//	Pattern for reading all models from directory and adding
	// fs.readdirSync(__dirname).filter(function(file) {
	// 	return file.indexOf('.') !== 0 && file !== 'index.js';
	// }).forEach(function(file) {
	// 	var model;
	// 	model = sequelize["import"](path.join(__dirname, file));
	// 	postgres[model.name] = model;
	// });
//	Pattern for reading all associations and creating them in database
	// Object.keys(postgres).forEach(function(modelName) {
	// 	if ('associate' in postgres[modelName]) {
	// 		postgres[modelName].associate(postgres);
	// 	}
	// });

module.exports = postgres;