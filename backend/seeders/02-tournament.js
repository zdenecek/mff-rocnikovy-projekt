'use strict';

const { faker } = require('@faker-js/faker');
const { Tournament, Result, Player } = require('../models');
const { choose } = require("../src/utils");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Generate random values

    // Create 10 tournaments
    for (let i = 0; i < 10; i++) {
      await this.createTournament();
    }
  },

  async createTournament() {
    const title = faker.music.songName();
    const startDate = faker.date.past();
    const endDate = faker.date.future();
    const place = faker.location.city();
    const description = faker.lorem.paragraph();

    const type = choose(['individual', 'pair', 'team']);
    const numPlayers = {
      individual: 1,
      pair: 2,
      team: 5,
    }[type];

    // Create a tournament
    const tournament = await Tournament.create({
      title,
      startDate,
      endDate,
      place,
      description,
      externalDocumentationLink: 'http://example.com',
      type,
    });

    const numResults = Math.max(10, Math.floor(Math.random() * 25));
    const players = await Player.findAll();
    const selectedPlayers = players.sort(() => 0.5 - Math.random()).slice(0, numPlayers * numResults);

    let lastRankShared = false;
    for (let i = 0; i < numResults; i++) {

      const title = tournament.type === 'individual' ? undefined : faker.lorem.words(3);

      let rank;
      if (lastRankShared) {
        lastRankShared = false;
        rank = i + 1;
      } else {
        lastRankShared = Math.random() < 0.1;
        rank = lastRankShared ? i : i + 1;
      }

      const result = await Result.create({
        rank,
        title,
        scoreAchieved: Math.floor(Math.random() * 100),
        tournamentId: tournament.id,
      });

      // Associate the tournament with the result
      await tournament.addResult(result);

      // Assign players to the result
      for (const player of selectedPlayers.slice(i * numPlayers, (i + 1) * numPlayers)) {
        await result.addPlayer(player);
      }
    }
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await Tournament.destroy({
      where: {}
    });
  }
};
