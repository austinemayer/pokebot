module.exports = function database (robot) {

    if (!global.hasOwnProperty('postgresDB')) {
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
        // the application is executed on the local machine ... use local postgres
        sequelize = new Sequelize('postgres://pokebot:oak@localhost:5432/pokebot');
    }

    global.postgresDB = {
        Sequelize: Sequelize,
        sequelize: sequelize,
        //  Define models from script files
        User:      sequelize.import(__dirname + '/user.js')
    };

    /*
    Associations
    global.db.User.hasMany(global.db.SomethingElse)
    */
    }
    console.log("index.js");
};