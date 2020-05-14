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
  if (req.user.moderator) {
    // check moderator status
    pool
      .query(queryText)
      .then((response) => {
        res.send(response.rows);
      })
      .catch((err) => {
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403);
  }
});

/**
 * Delete a user.
 */
router.get("/user/delete/:userID", rejectUnauthenticated, (req, res) => {
  const userID = req.params.userID;
  const queryText = `DELETE FROM "user" WHERE "id" = $1;`;
  if (req.user.moderator) {
    // check moderator status
    pool
      .query(queryText, [userID])
      .then((response) => {
        res.sendStatus(200);
      })
      .catch((err) => {
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403);
  }
});

/**
 * This is a more secure route to get all photos for the moderation page.
 */
router.get("/all-images", rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT "image"."id" as "img_id", "img_url", "title", "notes", "owner_id", "username", "reviewed" FROM "image"
  JOIN "user" on "owner_id" = "user"."id"
  ORDER BY "img_id" ASC;`;

  if (req.user.moderator) {
    // check moderator status
    pool
      .query(queryText)
      .then((response) => {
        res.send(response.rows);
      })
      .catch((err) => {
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403);
  }
});

/**
 * Toggles a photo's reviewed status.
 * Photo is selected by its "id".
 */
router.put("/review/:imageID", rejectUnauthenticated, (req, res) => {
  const imageID = req.params.imageID;
  const queryText = `UPDATE "image" SET "reviewed" = (NOT "reviewed") WHERE id=$1;`;
  if (req.user.moderator) {
    // user must be moderator to review
    pool
      .query(queryText, [imageID])
      .then((response) => {
        res.sendStatus(200);
      })
      .catch((err) => {
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403);
  }
});

module.exports = router;
