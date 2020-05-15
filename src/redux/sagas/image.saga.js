import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

/**
 * Gets images from database.
 *
 * Has optional action.payload. Payload should be a user's id, or an array of ids.
 * If there is a payload, results will be filtered by the ID given.
 */
function* getImages(action) {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };

    // if any ids were given, send them as query params.
    if (action.payload) {
      config.params = {
        ids: action.payload,
      };
    }

    const response = yield axios.get(`/api/image`, config);
    // set those images to the image reducer.
    yield put({ type: "SET_IMAGES", payload: response.data });
  } catch (err) {
    console.log("Image get request failed", err);
  }
}

/**
 * Gets only one user's images from database, and stores them in focusedUserImage reducer to display customDisplayID Maps.
 */
function* getFocusedUserImages(action) {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };

    // if any ids were given, send them as query params.
    if (action.payload) {
      config.params = {
        ids: action.payload,
      };
    }

    const response = yield axios.get(`/api/image`, config);
    // set those images to the image reducer.
    yield put({ type: "SET_FOCUSED_USER_IMAGES", payload: response.data });
  } catch (err) {
    console.log("Image get request failed", err);
  }
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
  const postData = action.payload.image;
  const displayIDs = action.payload.displayIDs;
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    yield axios.post("/api/image/add", postData, config);
    yield put({ type: "GET_IMAGES", payload: displayIDs }); // I may need to put an id here if a user's map breaks on upload and displays all images.
  } catch (err) {
    console.log("Image post request failed", err);
  }
}

/**
 * Delete an image.
 */
function* deleteImage(action) {
  try {
    const imageID = action.payload.imageID;
    const displayIDs = action.payload.displayIDs;
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    yield axios.delete(`/api/image/delete/${imageID}`, config);
    yield put({ type: "GET_IMAGES", payload: displayIDs }); //  refresh images after delete
  } catch (err) {
    console.log("Image delete request failed", err);
  }
}

function* imageSaga() {
  yield takeLatest("POST_IMAGE", postImage);
  yield takeLatest("GET_IMAGES", getImages);
  yield takeLatest("GET_FOCUSED_USER_IMAGES", getFocusedUserImages);
  yield takeLatest("DELETE_IMAGE", deleteImage);
}

export default imageSaga;
