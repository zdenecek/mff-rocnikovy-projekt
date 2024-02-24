'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Result extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate(models) {
      Result.belongsTo(models.Tournament, {
        foreignKey: 'tournamentId',
        as: 'tournament'
      });
      Result.belongsToMany(models.Player, {
        through: models.PlayerResult,
        foreignKey: 'resultId',
        as: 'players'
      });

    }
  }
  Result.init({
    scoreAchieved: DataTypes.INTEGER,
    title: DataTypes.STRING,
    tournamentId: DataTypes.INTEGER,
    rank: DataTypes.INTEGER,
    externalDocumentationLink: DataTypes.STRING,
  
  }, {
    sequelize,
    modelName: 'Result',
    timestamps: false,
  });
  return Result;
};