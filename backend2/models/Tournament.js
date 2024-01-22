'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tournament extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Tournament.hasMany(models.Result, {
        foreignKey: 'tournamentId',
        as: 'results'
      });
    }
  }
  Tournament.init({
    title: DataTypes.STRING,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    place: DataTypes.STRING,
    description: DataTypes.STRING,
    externalDocumentationLink: DataTypes.STRING,
    type: {
      type:   DataTypes.ENUM,
      values: ['individual', 'pair', 'team']
    }
  }, {
    sequelize,
    modelName: 'Tournament',
  });
  return Tournament;
};