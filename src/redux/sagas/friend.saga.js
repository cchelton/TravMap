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
    console.log("Friend get request failed:", err);
  }
}

/**
 * Toggles display of a friend's photos.
 *
 * Expected payload: { userID: num, friendID: num, displayIDs: arr }
 *
 * friendID is the one toggled.
 */
function* toggleFriendPhotoDisplay(action) {
  try {
    const userID = action.payload.userID;
    const friendID = action.payload.friendID;
    const displayIDs = action.payload.displayIDs;
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };

    yield axios.put(`/api/friend/toggleDisplay/${friendID}`, config);
    yield put({ type: "GET_FRIENDS", payload: userID });
    yield put({ type: "GET_IMAGES", payload: displayIDs });
  } catch (err) {
    console.log("Friend photo display toggle failed:", err);
  }
}

function* friendSaga() {
  yield takeLatest("GET_FRIENDS", getFriends);
  yield takeLatest("TOGGLE_FRIEND_PHOTO_DISPLAY", toggleFriendPhotoDisplay);
}

export default friendSaga;
