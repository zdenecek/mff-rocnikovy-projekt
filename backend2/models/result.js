'use strict';
const {
  Model
} = require('sequelize');
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
      Result.belongsTo(models.Unit, {
        foreignKey: 'unitId',
        as: 'unit'
      });
    }
  }
  Result.init({
    scoreAchieved: DataTypes.NUMBER,
    unitId: DataTypes.NUMBER,
    tournamentId: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'Result',
  });
  return Result;
};