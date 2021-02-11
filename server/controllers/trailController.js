const db = require('../../models/TrailModel');

module.exports = {
  //define functions below
  getInterests: function (req, res, next) {
    // const postManId = sessionStorage.getItem('user_id') ? || 1;
    const { user_id } = req.params;
    console.log('get this:', user_id)
    const text = `SELECT * FROM Interested WHERE (user_id=$1)`;
    db.query(text, [user_id])
      .then(trailInts => {
        console.log('ALL interested trails', trailInts.rows);
        res.locals.trailInts = trailInts.rows;
        return next();
      })
      .catch(err => {
        console.log('reach catch', err);
        next({ error: err });
      })
  },

  //add an interested trail
  postInterest: function (req, res, next) {
    const { user_id, trail_id } = req.body;
    const text = `INSERT INTO Interested (user_id, trail_id) VALUES ($1, $2) RETURNING *`;
    console.log(user_id)
    db.query(text, [user_id, trail_id])
      .then(trailInts => {
        console.log('Interested trails:',trailInts);
        res.locals.trailInts = trailInts.rows;
        return next();
      })
      .catch(err => {
        console.log(err);
        next({ error: 'post interest ' + err });
      });
  },

  getVisits: function (req, res, next) {
    const { user_id, trail_id } = req.params;
    const text = `SELECT * FROM Visited WHERE (user_id=$1 AND trail_id=$2)`;
    db.query(text, [user_id, trail_id])
      .then(trailVisits => {
        console.log('ALL visited trails', trailVisits);
        res.locals.trailVisits = trailVisits.rows;
        return next();
      })
      .catch(err => {
        console.log('reach catch', err);
        next({ error: err });
      })
  },

  //add a visited trail
  postVisit: function (req, res, next) {
    const { user_id, trail_id } = req.body;
    const text = `INSERT INTO Visited (user_id, trail_id) VALUES ($1, $2) RETURNING *`;

    db.query(text, [user_id, trail_id])
      .then(trailVisits => {
        console.log('Visited trails:', trailVisits);
        res.locals.trailVisits = trailVisits.rows;
        return next();
      })
      .catch(err => {
        console.log(err)
        next({ error: err });
      });
  },

  //increment number of times visited
  updateVisit: function (req, res, next) {
    const { user_id, trail_id, visits } = req.params;
    console.log('userid, trail_id, visits', user_id, trail_id, visits);
    const text = `UPDATE Visited SET visits = $3
    WHERE user_id = $1 AND trail_id = $2`;

    db.query(text, [user_id, trail_id, visits])
      .then(() => {
        console.log('Updated trail');
        return next();
      })
      .catch(err => {
        next({ error: err })
      });
  },

  //remove related entries from tables Interested and Visited
  deleteInterest: function (req, res, next) {
    const { user_id, trail_id } = req.params;
    console.log('delete interest', user_id, trail_id);
    const text = `DELETE FROM Interested
    WHERE user_id = $1 AND trail_id = $2`;

    db.query(text, [user_id, trail_id])
      .then(() => {
        console.log('Updated Interested Table');
        return next();
      })
      .catch(err => {
        next({ error: err })
      });
  },

  deleteVisit: function (req, res, next) {
    const { user_id, trail_id } = req.params;
    console.log('delete visit', user_id, trail_id);
    const text = `DELETE FROM Visited
    WHERE user_id = $1 AND trail_id = $2`;

    db.query(text, [user_id, trail_id])
      .then(() => {
        console.log('Updated Visited Table');
        return next();
      })
      .catch(err => {
        next({ error: err })
      });

  },
  
};
