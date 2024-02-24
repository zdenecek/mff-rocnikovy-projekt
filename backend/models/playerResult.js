'use strict';
const {
 Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
 class PlayerResult extends Model {
  static associate(models) {
    PlayerResult.belongsTo(models.Player, {
      foreignKey: 'playerId',
      as: 'player'
    });
    PlayerResult.belongsTo(models.Result, {
      foreignKey: 'resultId',
      as: 'result'
    });
  }
 }
 PlayerResult.init({
  playerId: DataTypes.INTEGER,
  resultId: DataTypes.INTEGER
 }, {
  sequelize,
  modelName: 'PlayerResult',
  timestamps: false,
 });
 return PlayerResult;
};