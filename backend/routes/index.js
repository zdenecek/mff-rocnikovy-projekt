var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("Welcome to the api. See <a href='/api-docs'>/api-docs</a> for documentation.");
});

module.exports = router;
