var User = sequelize.define('users', {
    slack_id: {
        type: Sequelize.CHAR
    },
    slack_name: {
        type: Sequelize.CHAR
    }
},
{
    freezeTableName: true
}
);

User.sync().then(function () {
  // Table created

});