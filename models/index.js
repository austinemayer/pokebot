if (!global.hasOwnProperty('db')) {
  var Sequelize = require('sequelize'), sequelize = null;

  if (process.env.DATABASE_URL) { // Create a global ref for the database
    sequelize = new Sequelize(process.env.DATABASE_URL, {
      dialect:  'postgres',
      protocol: 'postgres',
      port:     match[4],
      host:     match[3],
      logging:  true //false
    });
  } else {
    // the application is executed on the local machine ... use mysql
    sequelize = new Sequelize('postgres://pokebot@localhost:5432/pokebot');
  }

  global.db = {
    Sequelize: Sequelize,
    sequelize: sequelize,
    //  Define models from script files
    User:      sequelize.import(__dirname + '/user')
  };

  /*
    Associations
    global.db.User.hasMany(global.db.SomethingElse)
  */
}

module.exports = global.db;