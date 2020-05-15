import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

/**
 * get all the photos on the network.
 */
function* getAllImages() {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };

    const response = yield axios.get(`/api/moderation/all-images`, config);
    yield put({ type: "SET_MODERATION_IMAGES", payload: response.data });
  } catch (err) {
    console.log("err getting all images", err);
  }
}

/**
 * toggle an image's reviewed status.
 */
function* reviewImage(action) {
  const imageID = action.payload;

  yield axios.put(`/api/moderation/review-image/${imageID}`);
  yield put({ type: "MOD_GET_IMAGES" });
}

function* moderationSaga() {
  yield takeLatest("MOD_REVIEW_IMAGE", reviewImage);
  yield takeLatest("MOD_GET_IMAGES", getAllImages);
}

export default moderationSaga;
