const request = require('supertest');
const { Tournament } = require('../../models');

const makeApp = require('../makeApp');

const app = makeApp();
const adminUser = {
  id: 12,
  username: 'admin1',
  role: 'admin',
};

const regularUser = {
  id: 13,
  username: 'user',
  role: 'user',
};

describe('Tournament API', () => {
  const basePath = '/api/v1';

  describe('GET /tournaments', () => {

    it('should GET all tournaments', async () => {
      const res = await request(app)
        .get(`${basePath}/tournaments`)
        .expect('Content-Type', /json/)
        .expect(200)

    });
  });

  describe('GET /tournaments/:id', () => {
    it('should GET a single tournament', async () => {
      const tournament = await Tournament.create({
        title: 'Test Tournament',
      });

      const res = await request(app)
        .get(`${basePath}/tournaments/${tournament.id}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .expect((res) => { res.body.id = tournament.id, res.body.title = tournament.title });
    });

    it('should return 404 if tournament does not exist', async () => {
      const res = await request(app)
        .get(`${basePath}/tournaments/9999`)
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
          .post(`${basePath}/tournaments`)
          .send({
            title: 'Test Tournament',
            startDate: '2021-01-01',
          })
          .expect('Content-Type', /json/)
          .expect(201);

        console.log('Validation Errors:', res.body.errors);
      });

      it('should return 400 for missing title', async () => {
        const res = await request(app)
          .post(`${basePath}/tournaments`)
          .send({
            startDate: '2021-01-01',
          })
          .expect('Content-Type', /json/)
          .expect(400)
          .expect((res) => { res.body.success = false, res.body.code = 'validation-error' });
      });

      it('should return 400 for missing start date', async () => {
        const res = await request(app)
          .post(`${basePath}/tournaments`)
          .send({
            title: 'Hello world',
          })
          .expect('Content-Type', /json/)
          .expect(400)
          .expect((res) => { res.body.success = false, res.body.code = 'validation-error' });
      });
    });
  });

  describe("PUT /tournaments/:id", () => {
    context("with admin user", () => {
      beforeEach(() => app.setUserOnce(adminUser));
      it('should PUT an existing tournament', async () => {
        const tournament = await Tournament.create({
        });

        const res = await request(app)
          .put(`${basePath}/tournaments/${tournament.id}`)
          .send({})
          .expect('Content-Type', /json/)
          .expect(200);

console.log('Validation Errors:', res.body.errors);
      });

      it('should return 404 if tournament does not exist', async () => {
        const res = await request(app)
          .put(`${basePath}/tournaments/9999`)
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
          .put(`${basePath}/tournaments/${tournament.id}`)
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
          .put(`${basePath}/tournaments/${tournament.id}`)
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
          .delete(`${basePath}/tournaments/${tournament.id}`)
          .expect(200);
      });
    });
  });
});