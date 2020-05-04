const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

/**
 * Get photos from the database.
 */
router.get("/", rejectUnauthenticated, (req, res) => {
  // check for a userID
  if (req.query.userID) {
    // if there is an id, get the images from that user
    const queryText = `SELECT * FROM "image" WHERE "owner_id" = $1 ORDER BY "id" ASC;`;

    pool
      .query(queryText, [req.query.userID])
      .then((response) => {
        res.send(response.rows);
      })
      .catch((err) => {
        res.sendStatus(500);
      });
  } else {
    // if no userID was specified, get all the images
    const queryText = `SELECT * FROM "image" ORDER BY "id" ASC;`;

    pool
      .query(queryText)
      .then((response) => {
        res.send(response.rows);
      })
      .catch((err) => {
        res.sendStatus(500);
      });
  }
});

/**
 * Adds a photo to the database
 */
router.post("/add", rejectUnauthenticated, (req, res) => {
  const img_url = req.body.img_url;
  const title = req.body.title;
  const notes = req.body.notes;
  const owner_id = req.body.owner_id;
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;
  const reviewed = false; //   default a photo's reviewed status to false

  const queryText = `INSERT INTO "image" ("img_url", "title", "notes", "owner_id", "latitude", "longitude", "reviewed") VALUES ($1, $2, $3, $4, $5, $6, $7);`;
  const queryData = [
    img_url,
    title,
    notes,
    owner_id,
    latitude,
    longitude,
    reviewed,
  ];

  pool
    .query(queryText, queryData)
    .then((response) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
});

/**
 * Toggles a photo's reviewed status.
 * Photo is selected by its "id".
 */
router.put("/review/:imageID", rejectUnauthenticated, (req, res) => {
  const imageID = req.params.imageID;
  const queryText = `UPDATE "image" SET "reviewed" = (NOT "reviewed") WHERE id=$1;`;

  pool
    .query(queryText, [imageID])
    .then((response) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
});

/**
 * Deletes a photo.
 * Photo is selected by its "id".
 */
router.delete("/delete/:imageID", rejectUnauthenticated, (req, res) => {
  const imageID = req.params.imageID;
  const queryText = `DELETE FROM "image" WHERE id = $1;`;

  pool
    .query(queryText, [imageID])
    .then((response) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
});

module.exports = router;
