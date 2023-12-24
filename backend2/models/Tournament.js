const { DataTypes, Model } = require('sequelize');
const sequelize = require('../src/sequelize');

class Tournament extends Model {
    
}

Tournament.init({
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  place: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  externalDocumentationLink: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'Tournament'
});

module.exports = Tournament;