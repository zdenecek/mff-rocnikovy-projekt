const request = require('supertest');
const { Tournament } = require('../../models');

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

describe('Tournament API', () => {

  describe('GET /tournaments', () => {
    it('should GET all tournaments', async () => {
      const res = await request(app)
        .get('/tournaments')
        .expect('Content-Type', /json/)
        .expect(200);
      // Add more assertions as needed
    });
  });

  describe('GET /tournaments/:id', () => {
    it('should GET a single tournament', async () => {
      const tournament = await Tournament.create({
        title: 'Test Tournament',
      });

      const res = await request(app)
        .get(`/tournaments/${tournament.id}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .expect((res) => { res.body.id = tournament.id, res.body.title = tournament.title });
    });

    it('should return 404 if tournament does not exist', async () => {
      const res = await request(app)
        .get('/tournaments/9999')
        .expect('Content-Type', /json/)
        .expect(404)
        .expect((res) => { res.body.success = false, res.body.code = 'tournament-not-found' });
    }
    );
  });

  describe("POST /tournaments", () => {
    context("with admin user", () => {
      beforeEach(() => app.setUserOnce(adminUser));

      it('should POST a new tournament', async () => {
        const res = await request(app)
          .post('/tournaments')
          .send({
            title: 'Test Tournament',
            startDate: '2021-01-01',
          })
          .expect('Content-Type', /json/)
          .expect(201);
      });
    });
  });

  describe("PATCH /tournaments/:id", () => {
    context("with admin user", () => {
      beforeEach(() => app.setUserOnce(adminUser));
      it('should PATCH an existing tournament', async () => {
        const tournament = await Tournament.create({
        });

        const res = await request(app)
          .patch(`/tournaments/${tournament.id}`)
          .send({
          })
          .expect('Content-Type', /json/)
          .expect(200);
      });

      it('should return 404 if tournament does not exist', async () => {
        const res = await request(app)
          .patch('/tournaments/9999')
          .send({
          })
          .expect('Content-Type', /json/)
          .expect(404)
          .expect((res) => { res.body.success = false, res.body.code = 'tournament-not-found' });
      });
    });

    context("with non-admin user", () => {
      beforeEach(() => app.setUserOnce(regularUser));

      it("should return 403", async () => {
        const tournament = await Tournament.create({
        });

        const res = await request(app)
          .patch(`/tournaments/${tournament.id}`)
          .send({
          })
          .expect('Content-Type', /json/)
          .expect(403)
          .expect((res) => { res.body.success = false, res.body.code = 'forbidden' });
      });
    });

    context("without user", () => {
      it("should return 401", async () => {
        const tournament = await Tournament.create({
        });

        const res = await request(app)
          .patch(`/tournaments/${tournament.id}`)
          .send({
          })
          .expect('Content-Type', /json/)
          .expect(401)
          .expect((res) => { res.body.success = false, res.body.code = 'unauthorized' });
      });
    });
  });


  describe("DELETE /tournaments/:id", () => {
    context("with admin user", () => {
      beforeEach(() => app.setUserOnce(adminUser));

      it('should DELETE an existing tournament', async () => {
        const tournament = await Tournament.create({
        });

        const res = await request(app)
          .delete(`/tournaments/${tournament.id}`)
          .expect(200);
      });
    });
  });
});