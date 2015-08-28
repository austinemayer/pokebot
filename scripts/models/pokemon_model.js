module.exports = function(sequelize, DataTypes) {
	var Pokemon;
	Pokemon = sequelize.define('Pokemon', {
		abilities: {
			type: Sequelize.JSON,
			allowNull: false,
			hasComment: {type: Sequelize.STRING, field: "Abilities as JSON object"},
			fieldWithUnderscores: { type: Sequelize.STRING, field: "abilties_json" }
		},
		attack: {
			type: Sequelize.INTEGER,
			allowNull: false,
			hasComment: {type: Sequelize.STRING, field: "Attack rating"}
		},
		catch_rate: {
			type: Sequelize.INTEGER,
			allowNull: false,
			hasComment: {type: Sequelize.STRING, field: "Special Attack Rating"},
			fieldWithUnderscores: { type: Sequelize.STRING, field: "catch_rate" }
		},
		defense: {
			type: Sequelize.INTEGER,
			allowNull: false,
			hasComment: {type: Sequelize.STRING, field: "Defense Rating"}
		},
		evolutions: {
			type: Sequelize.JSON,
			allowNull: true,
			hasComment: {type: Sequelize.STRING, field: "Possible evolutions as JSON object"},
			fieldWithUnderscores: { type: Sequelize.STRING, field: "evolutions_json" }
		},
		hp: {
			type: Sequelize.INTEGER,
			allowNull: false,
			hasComment: {type: Sequelize.STRING, field: "Health Points"}
		},
		male_female_ratio: {
			type: Sequelize.REAL,
			allowNull: false,
			hasComment: {type: Sequelize.STRING, field: "Male to Female ratio"},
			fieldWithUnderscores: { type: Sequelize.STRING, field: "m_to_f" }
		},
		movelist: {
			type: Sequelize.JSON,
			allowNull: false,
			hasComment: {type: Sequelize.STRING, field: "Movelist as JSON object"},
			fieldWithUnderscores: { type: Sequelize.STRING, field: "moves_json" }
		},
		name: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true,
			hasComment: {type: Sequelize.STRING, field: "Pokemon name"},
			fieldWithUnderscores: { type: Sequelize.STRING, field: "display_name" }
		},
		national_id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			allowNull: false,
			unique: true,
			hasComment: {type: Sequelize.STRING, field: "Unique Pokedex ID (National index)"},
			fieldWithUnderscores: { type: Sequelize.STRING, field: "pokedex_id" }
		},
		sp_atk: {
			type: Sequelize.INTEGER,
			allowNull: false,
			hasComment: {type: Sequelize.STRING, field: "Special Attack Rating"},
			fieldWithUnderscores: { type: Sequelize.STRING, field: "sp_atk" }
		},
		sp_def: {
			type: Sequelize.INTEGER,
			allowNull: false,
			hasComment: {type: Sequelize.STRING, field: "Special Defense Rating"},
			fieldWithUnderscores: { type: Sequelize.STRING, field: "sp_def" }
		},
		speed: {
			type: Sequelize.INTEGER,
			allowNull: false,
			hasComment: {type: Sequelize.STRING, field: "Speed Rating"},
			fieldWithUnderscores: { type: Sequelize.STRING, field: "speed" }
		},
		types: {
			type: Sequelize.JSON,
			allowNull: false,
			hasComment: {type: Sequelize.STRING, field: "Types as JSON object"},
			fieldWithUnderscores: { type: Sequelize.STRING, field: "types_json" }
		}
	}, {
		paranoid: true,
		underscored: true,
		underscoredAll: true,
		deletedAt: 'deleted_at',
		tableName: 'pokemon'
	});

	//	This will force drop on the table if it exists.
	Pokemon.sync({force: true}).then(function () {
		//	Table created - Force insert a Pokemon object for testing

	});

	return Pokemon;
};