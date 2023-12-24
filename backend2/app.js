require('./src/init');

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')

const app = express();
app.use(logger('dev'));
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const tournamentRouter = require('./routes/tournament');

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/tournaments', tournamentRouter);
require('./src/openapi')(app);

app.use(express.static(path.join(__dirname, 'public')));

app.use(function(err, req, res, next) {

    res.status(err.status || 500);
    if ( req.app.get('env') === 'development' )
      res.send(err);
    else
      res.send();
  });

module.exports = app;
