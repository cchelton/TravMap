const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

// TODO: learn pg-promise!

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

// get a user's incoming friend requests
router.get("/requests/:userID", rejectUnauthenticated, (req, res) => {
  const userID = req.params.userID;
  const queryText = `SELECT "user_relationship"."user_id" as "friend_id", "user"."username" as "friend_name", "display_user_photos_on_friend_map" as "display_photos" FROM "user_relationship"
  JOIN "user" on "user"."id" = "user_relationship"."user_id"
  WHERE ("user_relationship"."friend_id" = $1 AND NOT "user_relationship"."confirmed_request")
  ORDER BY "friend_name" ASC;`;

  pool
    .query(queryText, [userID])
    .then((response) => {
      res.send(response.rows);
    })
    .catch((err) => {
      console.log("err getting friend requests:", err);
      res.sendStatus(500);
    });
});

// make friend request
// cole please learn how to use pg-promise. it will make your life easier
router.post("/add", (req, res) => {
  const userID = req.query.userID;
  const friendID = req.query.friendID;

  const queryData = [userID, friendID];
  let queryText = `SELECT "id" FROM "user_relationship"
  WHERE "user_id" = $2 AND "friend_id" = $1;`;

  // there are 2 possible outcomes, there is an existing friend request, or there is not.
  // this route has 2 possible res.send()'s to handle that.
  // first, check for an outstanding friend request from the friend to the user
  pool
    .query(queryText, queryData)
    .then((response) => {
      if (response.rows.length > 0) {
        queryText = `DELETE FROM "user_relationship"
        WHERE ("user_id" = $1 AND "friend_id" = $2) OR ("user_id" = $2 AND "friend_id" = $1);`;
        // if there are outstanding requests, delete them and...
        pool
          .query(queryText, queryData)
          .then((response) => {
            queryText = `INSERT INTO "user_relationship" ("user_id", "friend_id", "confirmed_request", "display_user_photos_on_friend_map")
        VALUES ($1, $2, TRUE, TRUE), ($2, $1, TRUE, TRUE);`;

            // create a confirmed relationship between both users because both users have now added each other.
            pool
              .query(queryText, queryData)
              .then((response) => {
                res.sendStatus(200); // DONE! send OK
              })
              .catch((err) => {
                console.log(
                  `Friend Request Error in: if there are outstanding requests, delete them and...:`
                );
                console.log(err);
                console.log(`queryText:`, queryText);

                res.sendStatus(500);
              });
          })
          .catch((err) => {
            // err logs
            console.log(
              `Friend Request Error in: if there are outstanding requests, delete them and...:`
            );
            console.log(err);
            console.log(`queryText:`, queryText);

            res.sendStatus(500);
          });
      } else {
        queryText = `INSERT INTO "user_relationship" ("user_id", "friend_id", "confirmed_request", "display_user_photos_on_friend_map")
        VALUES ($1, $2, FALSE, TRUE);`;

        // if there are no outstanding requests, create one from the user to the friend.
        pool
          .query(queryText, queryData)
          .then((response) => {
            res.sendStatus(200); //  DONE! send OK
          })
          .catch((err) => {
            console.log(
              `Friend Request Error in: check for outstanding request:`
            );
            console.log(err);
            console.log(`queryText:`, queryText);

            res.sendStatus(500);
          });
      }
    })
    .catch((err) => {
      // err logs
      console.log(`Friend Request Error in: check for outstanding request:`);
      console.log(err);
      console.log(`queryText:`, queryText);

      res.sendStatus(500);
    });
});

// confirms incoming friend request
router.put("/request/confirm", rejectUnauthenticated, (req, res) => {
  const userID = req.query.userID;
  const friendID = req.query.friendID;

  const queryData = [userID, friendID];
  let queryText = `DELETE FROM "user_relationship"
  WHERE ("user_id" = $1 AND "friend_id" = $2) OR ("user_id" = $2 AND "friend_id" = $1);`;

  // first delete the outstanding request
  pool
    .query(queryText, queryData)
    .then((response) => {
      queryText = `INSERT INTO "user_relationship" ("user_id", "friend_id", "confirmed_request", "display_user_photos_on_friend_map")
      VALUES ($1, $2, TRUE, TRUE), ($2, $1, TRUE, TRUE);`;

      // then create a confirmed relationship between the user and the friend
      pool
        .query(queryText, queryData)
        .then((response) => {
          res.sendStatus(200); // DONE! send OK
        })
        .catch((err) => {
          console.log(
            `Confirm Friend Request Error in: then create a confirmed relationship:`
          );
          console.log(err);
          console.log(`queryText:`, queryText);

          res.sendStatus(500);
        });
    })
    .catch((err) => {
      console.log(
        `Confirm Friend Request Error in: first delete the outstanding request:`
      );
      console.log(err);
      console.log(`queryText:`, queryText);

      res.sendStatus(500);
    });
});

// deny incoming friend request
router.put("/request/deny", rejectUnauthenticated, (req, res) => {
  const userID = req.query.userID;
  const friendID = req.query.friendID;

  const queryData = [userID, friendID];
  const queryText = `DELETE FROM "user_relationship"
  WHERE "user_id" = $2 AND "friend_id" = $1;`;

  // delete the incoming friend request. Because when requests are created relating user_id in the database
  // to the user that created the friend request, this query needs to delete the request where
  // "user_id" = friendID and "friend_id" = userID
  pool
    .query(queryText, queryData)
    .then((response) => {
      res.sendStatus(200); // DONE! send OK
    })
    .catch((err) => {
      console.log(`Deny Friend Request Error:`);
      console.log(err);
      console.log(`queryText:`, queryText);

      res.sendStatus(500);
    });
});

// cancel outgoing friend request
router.delete("/request/cancel", rejectUnauthenticated, (req, res) => {
  const userID = req.query.userID;
  const friendID = req.query.friendID;

  const queryData = [userID, friendID];
  const queryText = `DELETE FROM "user_relationship"
  WHERE "user_id" = $1 AND "friend_id" = $2;`;

  // delete the outgoing friend request.
  pool
    .query(queryText, queryData)
    .then((response) => {
      res.sendStatus(200); // DONE! send OK
    })
    .catch((err) => {
      console.log(`Cancel Friend Request Error:`);
      console.log(err);
      console.log(`queryText:`, queryText);

      res.sendStatus(500);
    });
});

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

// delete a friend
router.delete("/delete", (req, res) => {
  const userID = req.query.userID;
  const friendID = req.query.friendID;

  const queryData = [userID, friendID];
  const queryText = `DELETE FROM "user_relationship"
  WHERE ("user_id" = $1 AND "friend_id" = $2) OR ("user_id" = $2 AND "friend_id" = $1);`;

  pool
    .query(queryText, queryData)
    .then((response) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(`Deny Friend Request Error:`);
      console.log(err);
      console.log(`queryText:`, queryText);

      res.sendStatus(500);
    });
});

module.exports = router;
