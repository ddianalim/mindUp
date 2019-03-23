var express = require('express');
var router = express.Router();
const auth = require('./helpers/auth');
const Day = require('../models/day');
const User = require('../models/user');

// Delete Days
router.delete('/:id', auth.requireLogin, (req, res, next) => {
  Day.findByIdAndDelete(req.params.id).then(() => {
    return res.redirect('/days');
  }).catch((err) => {
    console.log(err.message);
  });

  console.log(req.params.id);
})

// Posts index
router.get('/', auth.requireLogin, (req, res, next) => {
  Day.find({users: res.locals.currentUserId}).sort({ date: -1 }).exec(function(err, days) {
    if(err) {
      console.error(err);
    } else {
      res.render('days/index', { days: days });
    }
  });
});

/* POST day. */
router.post('/', auth.requireLogin, (req, res, next) => {
  const day = new Day(req.body);
  // day.users.push(req.session.userId);

  Day.create(day).then(() => {
    return res.redirect('/days');
  }).catch((err) => {
    console.log(err.message);
  });

  // day.save(function(err, day) {
  //   if (err) {
  //     console.log(err);
  //   }
  //   //eslint-disable-next-line no-underscore-dangle
  //   return res.redirect(`/days/${day._id}`);
  //   // return res.redirect('/days/' + day._id);
  // });
});

// Days new
router.get('/new', auth.requireLogin, (req, res, next) =>{
  User.findById(req.params.userId, function(err, day) {
    if(err) { console.error(err);}

    res.render('days/new');
  });
});

// /* GET days by ID. */
// router.get('/:id', auth.requireLogin, (req, res, next) => {
//   Day.findById(req.params.id, (err, day) => {
//     if (err) {
//       console.log(err);
//     }
//     res.render('days/show', { day: day  });
//   });
// });

// Posts show
router.get('/:id', auth.requireLogin, (req, res, next) => {
  Day.findById(req.params.id, function(err, post) {
    if(err) { console.error(err) };

    res.render('days/show', { day: day });
  });
});

module.exports = router;
