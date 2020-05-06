const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

/**
 * Gets all users.
 */
router.get("/users", rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT * FROM "user" ORDER BY "id" ASC;`;

  pool
    .query(queryText)
    .then((response) => {
      res.send(response.rows);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
});

/**
 * Delete a user.
 */
router.get("/user/delete/:userID", rejectUnauthenticated, (req, res) => {
  const userID = req.params.userID;
  const queryText = `DELETE FROM "user" WHERE "id" = $1;`;
  pool
    .query(queryText, [userID])
    .then((response) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
});

/**
 * This is a more secure route to get all photos for the moderation page.
 *
 * If the user is not a moderator, give them no rows -> []. This prevents the table contents from even displaying.
 */
router.get("/photos", rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT * FROM "image" WHERE "owner_id" = $1 ORDER BY "id" ASC;`;
  const userIsModerator = req.user.moderator;

  pool
    .query(queryText, [req.query.userID])
    .then((response) => {
      res.send(userIsModerator ? response.rows : []);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
});
module.exports = router;
