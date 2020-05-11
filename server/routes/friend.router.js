const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

// gets a user's friends list
router.get("/:userID", rejectUnauthenticated, (req, res) => {
  const userID = req.params.userID;
  const queryText = `SELECT "user_relationship"."user_id" as "friend_id", "user"."username" as "friend_name", "display_user_photos_on_friend_map" as "display_photos" FROM "user_relationship"
  JOIN "user" on "user"."id" = "user_relationship"."user_id"
  WHERE ("user_relationship"."friend_id" = $1 AND "user_relationship"."confirmed_request")
  ORDER BY "friend_name" ASC;`;

  pool
    .query(queryText, [userID])
    .then((response) => {
      res.send(response.rows); //  send the friends list
    })
    .catch((err) => {
      console.log("err getting friends list:", err);
      res.sendStatus(500);
    });
});

// check friend status. Possible outcomes: "FRIEND", "REQUESTED", false
// 2 required query params: userID and checkingID
router.get("/checkStatus", rejectUnauthenticated, (req, res) => {
  const userID = req.query.userID;
  const checkingID = req.query.checkingID;
});

// make friend request

// confirms incoming friend request
router.put("/confirm/:incomingID");

// deny incoming friend request

// toggle display of friend's photos
router.put("/toggleDisplay/:id", rejectUnauthenticated, (req, res) => {
  const id = req.params.id;
  const queryText = `UPDATE "user_relationship"
  SET "display_user_photos_on_friend_map" = NOT "display_user_photos_on_friend_map"
  WHERE "user_id" = $1;`;

  pool
    .query(queryText, [id])
    .then((response) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("err toggling friend photo display:", err);
      res.sendStatus(500);
    });
});

module.exports = router;
