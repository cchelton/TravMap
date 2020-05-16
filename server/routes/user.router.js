const express = require("express");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const encryptLib = require("../modules/encryption");
const pool = require("../modules/pool");
const userStrategy = require("../strategies/user.strategy");

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get("/", rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post("/register", (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const date_of_birth = req.body.date_of_birth;

  const queryText = `INSERT INTO "user" (username, password, first_name, last_name, date_of_birth, moderator) VALUES ($1, $2, $3, $4, $5, 'FALSE') RETURNING id`;
  const queryData = [username, password, first_name, last_name, date_of_birth];

  pool
    .query(queryText, queryData)
    .then(() => res.sendStatus(201))
    .catch((err) => {
      // console.log(err);
      res.sendStatus(500);
    });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post("/login", userStrategy.authenticate("local"), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post("/logout", (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

// get necessary user data for profile pages
router.get("/focus", rejectUnauthenticated, (req, res) => {
  try {
    const userID = req.query.userID;
    const friendID = req.query.friendID;

    if (friendID !== userID) {
      // run this query if the user isn't on their own page
      const queryData = [userID, friendID];
      // const queryText = `SELECT "username", "first_name", "last_name", "moderator", "confirmed_request" FROM "user_relationship"
      // FULL JOIN "user" ON "user"."id" = "user_relationship"."friend_id"
      // WHERE "user"."id" = $1 AND ("user_relationship"."friend_id" = $2 OR "confirmed_request" = FALSE OR "user_relationship"."friend_id" IS NULL);
      // `;
      const queryText = `SELECT "username", "first_name", "last_name", "moderator", "confirmed_request" FROM "user_relationship"
    FULL JOIN "user" ON "user"."id" = "user_relationship"."friend_id"
    WHERE ("user_id" = $1 AND "friend_id" = $2)
    UNION ALL
    SELECT "username", "first_name", "last_name", "moderator", NULL as "confirmed_request" FROM "user"
    WHERE "user"."id" = $2;
    `;
      pool
        .query(queryText, queryData)
        .then((response) => {
          res.send(response.rows);
        })
        .catch((err) => {
          res.sendStatus(500);
        });
    } else {
      // run this one if they are
      const queryText = `SELECT "username", "first_name", "last_name", "moderator" FROM "user" WHERE "id" = $1;`;
      pool
        .query(queryText, [userID])
        .then((response) => {
          res.send(response.rows);
        })
        .catch((err) => {
          res.sendStatus(500);
        });
    }
  } catch (err) {
    res.sendStatus(403);
  }
});

// search for a user by username
router.get("/search", rejectUnauthenticated, (req, res) => {
  try {
    const username = req.query.username;
    const queryText = `SELECT "id" FROM "user" WHERE "username" = $1;`;

    pool
      .query(queryText, [username])
      .then((response) => {
        if (response.rows.length) {
          // if there was a user, send that id
          res.send(response.rows[0]);
        } else {
          // no user found, send id -1 to trigger 404
          res.send({ id: -1 });
        }
      })
      .catch((err) => {
        res.sendStatus(500);
      });
  } catch (err) {
    res.sendStatus(403);
  }
});

module.exports = router;
