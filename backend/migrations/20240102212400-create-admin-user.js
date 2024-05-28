'use strict';

const User = require('../models/User');
const { registerUser } = require('../src/auth');

/** @type {import('sequelize-cli').Migration} */

const mongoose = require('../src/mongoose');


module.exports = {
  up: async (queryInterface, Sequelize) => {
    await mongoose.init();
    await registerUser('admin', 'admin', 'admin', 'admin', 'admin');
  },
 
  down: async (queryInterface, Sequelize) => {
    User.destroy({ where: { email: 'admin' } });
  },
 };