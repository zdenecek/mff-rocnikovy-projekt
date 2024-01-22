const request = require('supertest');
const { Player } = require('../../models');

const makeApp = require('../makeApp');

const app = makeApp();
const adminUser = {
  id: 12,
  username: 'admin',
  role: 'admin',
};

const regularUser = {
  id: 12,
  username: 'user',
  role: 'user',
};

describe('Player API', () => {

  describe('GET /players', () => {
    it('should GET all players', async () => {
      const res = await request(app)
        .get('/players')
        .expect('Content-Type', /json/)
        .expect(200);
      // Add more assertions as needed
    });
  });

  describe('GET /players/:id', () => {
    it('should GET a single player', async () => {
      const player = await Player.create({
        firstName: 'Test',
        lastName: 'Player',
        birthdate: '2000-01-01',
        federationId: 12345
      });

      const res = await request(app)
        .get(`/players/${player.id}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .expect((res) => { res.body.id = player.id, res.body.firstName = player.firstName });
    });

    it('should return 404 if player does not exist', async () => {
      const res = await request(app)
        .get('/players/9999')
        .expect('Content-Type', /json/)
        .expect(404)
        .expect((res) => { res.body.success = false, res.body.code = 'player-not-found' });
    });
  });

  describe("POST /players", () => {
    context("with admin user", () => {
      beforeEach(() => app.setUserOnce(adminUser));

      it('should POST a new player', async () => {
        const res = await request(app)
          .post('/players')
          .send({
            firstName: 'Test',
            lastName: 'Player',
            birthdate: '2000-01-01',
            federationId: 12345
          })
          .expect('Content-Type', /json/)
          .expect(201);
      });

      it('should return 400 for missing ;ast name', async () => {
        const res = await request(app)
          .post('/players')
          .send({
            firstName: 'Player',
            birthdate: '2000-01-01',
            federationId: 12345
          })
          .expect('Content-Type', /json/)
          .expect(400)
          .expect((res) => { res.body.success = false, res.body.code = 'validation-error' });
      });

      // Add more validation tests as needed
    });
  });

  describe("PATCH /players/:id", () => {
    context("with admin user", () => {
      beforeEach(() => app.setUserOnce(adminUser));

      it('should PATCH an existing player', async () => {
        const player = await Player.create({
          firstName: 'Test',
          lastName: 'Player',
          birthdate: '2000-01-01',
          federationId: 12345
        });

        const res = await request(app)
          .patch(`/players/${player.id}`)
          .send({
            firstName: 'Updated',
            lastName: 'Player',
            birthdate: '2000-01-01',
            federationId: 12345
          })
          .expect('Content-Type', /json/)
          .expect(200);
      });

      it('should return 404 if player does not exist', async () => {
        const res = await request(app)
          .patch('/players/9999')
          .send({
            firstName: 'Updated',
            lastName: 'Player',
            birthdate: '2000-01-01',
            federationId: 12345
          })
          .expect('Content-Type', /json/)
          .expect(404)
          .expect((res) => { res.body.success = false, res.body.code = 'player-not-found' });
      });
    });
  });

  describe("DELETE /players/:id", () => {
    context("with admin user", () => {
      beforeEach(() => app.setUserOnce(adminUser));

      it('should DELETE an existing player', async () => {
        const player = await Player.create({
          firstName: 'Test',
          lastName: 'Player',
          birthdate: '2000-01-01',
          federationId: 12345
        });

        const res = await request(app)
          .delete(`/players/${player.id}`)
          .expect(200);
      });

      // Add more tests as needed
    });
  });
});
