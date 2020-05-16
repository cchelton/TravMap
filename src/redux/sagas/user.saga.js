import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchUser() {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };

    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get("api/user", config);

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: "SET_USER", payload: response.data });
  } catch (error) {
    console.log("User get request failed", error);
  }
}

function* focusUser(action) {
  const friendID = action.payload.friendID;
  const config = {
    headers: { "Content-Type": "application/json" },
    params: { friendID },
    withCredentials: true,
  };

  const response = yield axios.get(`/api/user/focus/`, config);
  yield put({ type: "SET_FOCUSED_USER", payload: response.data[0] }); //  there is only one user, get it from index[0]
  yield put({ type: "GET_FOCUSED_USER_IMAGES", payload: friendID });
}

function* searchUser(action) {
  const username = action.payload.username;
  const goToUser = action.payload.goToUser;
  const config = {
    headers: { "Content-Type": "application/json" },
    params: { username },
    withCredentials: true,
  };

  const response = yield axios.get(`/api/user/search`, config);
  yield goToUser(response.data.id);
}

function* userSaga() {
  yield takeLatest("FETCH_USER", fetchUser);
  yield takeLatest("FOCUS_USER", focusUser);
  yield takeLatest("SEARCH_USER", searchUser);
}

export default userSaga;
