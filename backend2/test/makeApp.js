const sinon = require('sinon');
const auth = require('../src/auth');
const makeApp = require('../src/makeApp');


function getApp({
  user = null,
  keepAuth = false,
} = {}) {

  if (!keepAuth) {
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
  
  if (!keepAuth) {
    auth.init.restore();

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
  }

  return app;
}


module.exports = getApp;
