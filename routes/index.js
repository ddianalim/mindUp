var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'MindUp' });
});

/* GET days index. */
router.get('/days', function(req, res, next) {
  res.render('days/index');
});

/* GET days new. */
router.get('/days/new', function(req, res, next) {
  res.render('days/new');
});

module.exports = router;
