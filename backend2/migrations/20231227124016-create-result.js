'use strict';

const { all } = require('../routes/tournament');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Results', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      scoreAchieved: {
        type: Sequelize.NUMBER
      },
      rank: {
        type: Sequelize.NUMBER
      },
      tournamentId: {
        type: Sequelize.NUMBER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      externalDocumentationLink: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Results');
  }
};