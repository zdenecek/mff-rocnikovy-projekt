const { DataTypes, Model } = require('sequelize');
const sequelize = require('../src/sequelize');

class Player extends Model {}

Player.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  birthdate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  federationId: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'Player'
});

module.exports = Player;