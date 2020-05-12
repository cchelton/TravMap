const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

/**
 * Get photos from the database.
 *
 */
router.get("/", rejectUnauthenticated, (req, res) => {
  let queryText = "";

  if (typeof req.query.ids === "string") {
    // if one id is given, get that user's images
    queryText = `SELECT * FROM "image" WHERE "owner_id" = $1 ORDER BY "id" ASC;`;

    pool
      .query(queryText, [req.query.ids])
      .then((response) => {
        res.send(response.rows);
      })
      .catch((err) => {
        res.sendStatus(500);
      });
  } else if (typeof req.query.ids === "object") {
    // if multiple ids are given, build queryText and queryData
    // start and open the parenthesis
    let queryData = [];
    queryText = `SELECT * FROM "image" WHERE (`;

    let queryFrags = req.query.ids.map((id, index) => {
      queryData.push(id);
      return `"owner_id" = $${index + 1}`;
    });

    // join the fragments with an OR and add to queryText
    queryText = `${queryText}${queryFrags.join(` OR `)}`;

    // close the parenthesis and add ORDER BY clause
    queryText = `${queryText}) ORDER BY "id" ASC;`;
    pool
      .query(queryText, queryData)
      .then((response) => {
        res.send(response.rows);
      })
      .catch((err) => {
        console.log(err);

        res.sendStatus(500);
      });
  } else {
    // if no ids were specified, get all the images
    queryText = `SELECT * FROM "image" ORDER BY "id" ASC;`;

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
