const express = require('express');
const router = express.Router();
const trailController = require('../controllers/trailController');

router.get('/interested/:user_id', trailController.getInterests, (req, res) => {
  console.log('trail router get request');
  res.status(200).json(res.locals.trailInts);
});
// router.get('/interested', trailController.getInterests, (req, res) => {
//   console.log('trail router get request');
//   res.status(200).json(res.locals.trailInts);
// });

router.post('/interested', trailController.postInterest, trailController.postVisit, (req, res) => {
  console.log('trail router interest posted')
  res.status(200).json(res.locals.trailInts);
});

//router delete /interested

router.get('/visited/:user_id/:trail_id', trailController.getVisits, (req, res) => {
  res.status(200).json(res.locals.trailVisits)
});

router.post('/visited', trailController.postVisit, (req, res) => {
  res.status(200).json(res.locals.trailVisits);
});

router.put('/visited/:user_id/:trail_id/:visits', trailController.updateVisit, (req, res) => {
  res.status(200).json(res.locals.trailVisits);
})

//router put /visited

module.exports = router;
