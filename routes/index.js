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

/* POST day. */
router.post('/days', (req, res) => {
  const day = new Day(req.body);

  day.save(function(err, day) {
    if (err) {
      console.log(err);
    }

    return res.redirect('/days/' + day._id);
  });
});

/* GET days by ID. */
router.get('/days/:id', (req, res) => {
  Day.findById(req.params.id, (err, day) => {
    if (err) {
      console.log(err);
    }
    res.render('days/show', {
      day: day
    });
  });
});

module.exports = router;
