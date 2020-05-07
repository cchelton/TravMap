import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

/**
 * Gets images from database.
 *
 * Has optional action.payload. Payload should be a user's id.
 * If there is a payload, results will be filtered by the ID given.
 */
function* getImages(action) {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };

    // if there was a userID, send it as query params.
    const axiosURL = action.payload
      ? `/api/image/?userID=${action.payload}`
      : `/api/image`;

    const response = yield axios.get(axiosURL, config);
    // set those images to the image reducer.
    yield put({ type: "SET_IMAGES", payload: response.data });
  } catch (error) {}
}

/**
 * Adds an image to database.
 *
 * expected action.payload = {
                            img_url: "",
                            title: "",
                            notes: "",
                            owner_id: Integer,
                            latitude: Number,
                            longitude: Number,
                            }
 */
function* postImage(action) {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    yield axios.post("/api/image/add", action.payload, config);
    yield put({ type: "GET_IMAGES" }); // I may need to put an id here if a user's map breaks on upload and displays all images.
  } catch (err) {
    console.log("Image post request failed", err);
  }
}

function* imageSaga() {
  yield takeLatest("POST_IMAGE", postImage);
  yield takeLatest("GET_IMAGES", getImages);
}

export default imageSaga;
