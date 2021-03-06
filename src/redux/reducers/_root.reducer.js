import { combineReducers } from "redux";
import errors from "./errors.reducer";
import loginMode from "./loginMode.reducer";
import user from "./user.reducer";
import image from "./image.reducer";
import friend from "./friend.reducer";
import displayIDs from "./displayIDs.reducer";
import focusedUser from "./focusedUser.reducer";
import focusedUserImage from "./focusedUserImage.reducer";
import request from "./request.reducer";
import moderation from "./moderation.reducer";

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  loginMode, // will have a value of 'login' or 'registration' to control which screen is shown
  user, // will have an id and username if someone is logged in
  image, // will have an array of images to show
  friend, // will have an array of user's friends
  displayIDs, // whose images are displayed when not on a user page
  focusedUser, // user to display on UserProfilePage based on user_id
  focusedUserImage, // images to display on customDisplayID map
  request, //  incoming friend requests
  moderation, // all images for moderation table
});

export default rootReducer;
