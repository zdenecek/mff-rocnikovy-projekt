'use strict';
const {
  Model
} = require('sequelize');
const { categorizePlayer } = require('../src/playerCategory');


module.exports = (sequelize, DataTypes) => {
  class Player extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Player.belongsToMany(models.Result, {
        through: models.PlayerResult,
        foreignKey: 'playerId',
        as: 'results'
      });
    }
  }
  Player.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    birthdate: DataTypes.DATE,
    federationId: DataTypes.STRING,
    category: {
      type: DataTypes.VIRTUAL,
      get() {
        const birthdate = this.getDataValue('birthdate');

        return categorizePlayer(birthdate); 
      },
      set(value) {
        throw new Error('Category cannot be set');
      }
    }
  }, {
    sequelize,
    modelName: 'Player',
    scopes: {
      accessLevel(role) {
        if(role === 'admin') return {
          attributes: { exclude: ['createdAt', 'updatedAt'] },
        }
        return {
          attributes: { exclude: ['birthdate', 'createdAt', 'updatedAt'] }
        }
      },
    }
  });
  return Player;
};