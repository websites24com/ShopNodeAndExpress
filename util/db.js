const Sequelize = require('sequelize');

const sequelize = new Sequelize('Node_shop', 'root', '',
     {dialect: 'mysql',
      host: 'localhost'
    });


module.exports = sequelize;

