const express = require('express');
const router = express.Router();
const User = require('../models/user');

// set layout variables
router.use(function(req, res, next) {
  res.locals.title = "Mind Up";
  res.locals.currentUserId = req.session.userId;
  res.locals.username = req.session.username;

  next();
});

// home page
router.get('/', (req, res, next) => {
  res.render('index');
});

// login
router.get('/login', (req, res, next) => {
  res.render('login');
});

// POST login
router.post('/login', (req, res, next) => {
  User.authenticate(req.body.username, req.body.password, (err, user) => {
    if (err || !user) {
      const next_error = new Error("Username or password incorrect");
      next_error.status = 401;

      return next(next_error);
    } else {
      req.session.userId = user._id;
      req.session.username = user.username;

      return res.redirect('/');
    }
  });
});

// logout
router.get('/logout', (req, res, next) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) return next(err);
    });
  }

  return res.redirect('/');
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
