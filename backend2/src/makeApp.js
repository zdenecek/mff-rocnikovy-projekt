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


function makeApp() {

  const app = express();
  app.use(logger('dev', { skip: (req, res) => process.env.NODE_ENV === 'test' }));
  app.use(cors())
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  
  
  auth.init(app);
  mongoose.init(app);
  openapi.init(app);

  app.use('/', indexRouter);
  app.use('/users', usersRouter);
  app.use('/players', playersRouter);
  app.use('/tournaments', tournamentRouter);
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(function (err, req, res, next) {

    res.status(err.status || 500);
    if (req.app.get('env') === 'development')
      res.send(err);
    else
      res.send();
  });

  return app;
}

module.exports =   makeApp ; 
