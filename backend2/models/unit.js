'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Unit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Unit.hasOne(models.Result, {
        foreignKey: 'unitId',
        as: 'result'
      });
    }
  }
  Unit.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Unit',
  });
  return Unit;
};