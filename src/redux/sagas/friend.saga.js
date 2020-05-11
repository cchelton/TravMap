import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

/**
 * Gets friends list from database.
 *
 * Expects userID as action.payload.
 */
function* getFriends(action) {
  try {
    const userID = action.payload;
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };

    const response = yield axios.get(`/api/friend/${userID}`, config);
    yield put({ type: "SET_FRIENDS", payload: response.data });
  } catch (err) {
    console.log("Friend get request failed", err);
  }
}

function* friendSaga() {
  yield takeLatest("GET_FRIENDS", getFriends);
}

export default friendSaga;
