module.exports = function(sequelize, DataTypes) {
	var User;
	User = sequelize.define('User', {
		slack_id: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		slack_name: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		slack_role: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, {
		paranoid: true,
		underscored: true,
		underscoredAll: true,
		deletedAt: 'deleted_at',
		tableName: 'users'
	});

	//	This will force drop on the table if it exists.
	User.sync({force: true}).then(function () {
		//	Table created - Force insert my user object for testing
		return User.create({
			slack_id: 'U09EUDR7G',
			slack_name: 'Studnicky',
			slack_role: 'admin'
		});
	});

	return User;
};