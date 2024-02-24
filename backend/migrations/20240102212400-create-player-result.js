'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('PlayerResults', {
      playerId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Players', // name of Source model
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      resultId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Results', // name of Target model
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    });
  },
 
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('PlayerResults');
  },
 };