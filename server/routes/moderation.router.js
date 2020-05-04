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

module.exports = router;
