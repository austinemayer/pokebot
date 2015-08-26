var Sequelize = require('sequelize'),	//	require node module containing class export
	sequelize = null,					//	initialize sequelize instance to null
	postgres = {};						//	initialize empty reference to postgres postgres

//	Requires recommended for automating import and associations...
//	fs = require('fs');
//	path = require('path');

	//	Define database connection config on remote
	if (process.env.DATABASE_URL) {
		sequelize = new Sequelize(process.env.DATABASE_URL, {
			dialect:  'postgres',
			protocol: 'postgres',
			logging:  true //false
		});
	} else {
	//	Use local machine settings otherwise
		sequelize = new Sequelize('postgres://pokebot:oak@localhost:5432/pokebot');
	}

	//	Create reference object
	postgres = {
		Sequelize: Sequelize,
		sequelize: sequelize,
		
		//  Define models from script files
		User:      sequelize.import(__dirname + '/user_model.js')
	};

	/* Associations go here */
	// global.postgres.User.hasMany(global.postgres.SomethingElse)

//	Pattern for reading all models from directory and adding
	// fs.readdirSync(__dirname).filter(function(file) {
	// 	return file.indexOf('.') !== 0 && file !== 'index.coffee';
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