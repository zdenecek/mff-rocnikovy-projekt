'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Players', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      birthdate: {
        type: Sequelize.DATE
      },
      federationId: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    });
    await queryInterface.sequelize.query(`
    ALTER TABLE Players
    ADD COLUMN fullName VARCHAR(255) AS (CONCAT(firstName, ' ', lastName))
  `);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Players');
  }
};