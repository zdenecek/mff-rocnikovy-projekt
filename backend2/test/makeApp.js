const sinon = require('sinon');
const auth = require('../src/auth');
const makeApp = require('../src/makeApp');


function getApp({
  user = null,
} = {}) {

  if (user !== undefined) {
    sinon.stub(auth, 'init').callsFake((app) => {
      app.use((req, res, next) => {
        if (app.user) {
          req.user = app.user;
          req.isAuthenticated = true;
        } 
        if (app.userOnce) {
          app.user = null;
          app.userOnce = false;
        }
        next();
      });
    })
  }

  const app = makeApp();

  app.setUser = (user) => {
    app.user = user;
  }
  app.setUserOnce = (user) => {
    app.setUser(user);
    app.userOnce = true;
  }

  if (user !== null) {
    app.setUser(user);
  }

  if (user !== undefined) {
    auth.init.restore();
  }

  return app;
}


module.exports =  getApp ;
