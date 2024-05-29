require("dotenv").config();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
const auth = require('./auth');
const mongoose = require('./mongoose');
const openapi = require('./openapi');
const indexRouter = require('../routes/index');
const usersRouter = require('../routes/users');
const tournamentRouter = require('../routes/tournament');
const playersRouter = require('../routes/player');
const authRouter = require('../routes/auth');


function makeApp() {

  const app = express();
  app.use(logger('dev', { skip: (req, res) => process.env.NODE_ENV === 'test' }));
  app.use(cors(
    {
      origin: true,
      credentials: true
    }
  ))
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  
  
  auth.init(app);
  mongoose.init();
  openapi.init(app);

  const prefix = "/api/v1"

  app.use('/', indexRouter);
  app.use(prefix + '/', indexRouter);
  app.use(prefix + '/users', usersRouter);
  app.use(prefix + '/players', playersRouter);
  app.use(prefix + '/tournaments', tournamentRouter);
  app.use(prefix + '/', authRouter);
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(function (err, req, res, next) {

    res.status(err.status || 500);
    console.error(err);
    if (process.env["ENV"] === 'development')
      res.send({error: err.message, stack: err.stack});
    else
      res.send({status: "error", message: "Internal Server Error"});
  });

  return app;
}

module.exports =   makeApp ; 
