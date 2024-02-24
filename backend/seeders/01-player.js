'use strict';


const { faker } = require('@faker-js/faker');
const { Player } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
 async up(queryInterface, Sequelize) {
   // Generate random values

   // Create 1000 players
   for (let i = 0; i < 1000; i++) {
     await this.createPlayer();
   }
 },

 async createPlayer() {
   const firstName = faker.person.firstName();
   const lastName = faker.person.lastName();
   const federationId = Math.floor(Math.random() * 4000 + 1);
    const birthdate = faker.date.between({ from: '1950-01-01', to: '2003-12-31'});

   // Create a player
   const player = await Player.create({
     firstName,
     lastName,
     birthdate,
     federationId,
   });
 },

 async down(queryInterface, Sequelize) {
   /**
    * Add commands to revert seed here.
    *
    * Example:
    * await queryInterface.bulkDelete('People', null, {});
    */
   await Player.destroy({
     where: {},
   });
 },
};