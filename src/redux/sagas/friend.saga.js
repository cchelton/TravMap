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

    // keep the map display ids current whenever friends are updated
    let displayIDs = response.data
      .filter((friend) => friend.display_photos)
      .map((friend) => friend.friend_id);

    yield put({ type: "SET_DISPLAY_IDS", payload: [userID, ...displayIDs] });
    yield put({ type: "GET_IMAGES", payload: [userID, ...displayIDs] }); //  Do this here so the initial GET_FRIENDS request loads the initial map
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
 *
 * displayIDs are the friends toggled on. (remove the friendID)
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
    yield put({ type: "GET_IMAGES", payload: [userID, ...displayIDs] });
  } catch (err) {
    console.log("Friend photo display toggle failed:", err);
  }
}

/**
 * Create a friend request.
 */
function* createFriendRequest(action) {
  const userID = action.payload.userID;
  const friendID = action.payload.friendID;

  const config = {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
    params: {
      userID: userID,
      friendID: friendID,
    },
  };

  yield axios.post(`/api/friend/add`, null, config);
  yield put({ type: "GET_FRIENDS", payload: userID });
}

/**
 * Cancel a friend request.
 */
function* cancelFriendRequest(action) {
  const userID = action.payload.userID;
  const friendID = action.payload.friendID;

  const config = {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
    params: {
      userID: userID,
      friendID: friendID,
    },
  };

  yield axios.delete(`/api/friend/request/cancel`, config);
  yield put({ type: "GET_FRIENDS", payload: userID });
}

/**
 * Accept an incoming friend request.
 */
function* acceptFriendRequest(action) {
  const userID = action.payload.userID;
  const friendID = action.payload.friendID;

  const config = {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
    params: {
      userID: userID,
      friendID: friendID,
    },
  };

  yield axios.put(`/api/friend/request/accept`, config);
  yield put({ type: `GET_FRIENDS`, payload: userID });
}

/**
 * Deny an incoming friend request.
 */
function* denyFriendRequest(action) {
  const userID = action.payload.userID;
  const friendID = action.payload.friendID;

  const config = {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
    params: {
      userID: userID,
      friendID: friendID,
    },
  };

  yield axios.put(`/api/friend/request/deny`, config);
  yield put({ type: `GET_FRIENDS`, payload: userID });
}

/**
 * Delete a friend.
 */
function* deleteFriend(action) {
  const userID = action.payload.userID;
  const friendID = action.payload.friendID;

  const config = {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
    params: {
      userID: userID,
      friendID: friendID,
    },
  };

  yield axios.delete(`/api/friend/delete`, config);
  yield put({ type: `GET_FRIENDS`, payload: userID });
}

/**
 * Get a user's incoming friend requests.
 */
function* getFriendRequests(action) {
  const userID = action.payload;
  const config = {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  };

  const response = yield axios.get(`/api/friend/requests/${userID}`, config);
  yield put({ type: "SET_FRIEND_REQUESTS", payload: response.data });
}

function* friendSaga() {
  yield takeLatest("GET_FRIENDS", getFriends);
  yield takeLatest("TOGGLE_FRIEND_PHOTO_DISPLAY", toggleFriendPhotoDisplay);
  yield takeLatest("CREATE_FRIEND_REQUEST", createFriendRequest);
  yield takeLatest("CANCEL_FRIEND_REQUEST", cancelFriendRequest);
  yield takeLatest("ACCEPT_FRIEND_REQUEST", acceptFriendRequest);
  yield takeLatest("DENY_FRIEND_REQUEST", denyFriendRequest);
  yield takeLatest("DELETE_FRIEND", deleteFriend);
  yield takeLatest("GET_FRIEND_REQUESTS", getFriendRequests);
}

export default friendSaga;
