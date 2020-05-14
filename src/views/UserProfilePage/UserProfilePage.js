import React, { useEffect } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
import TheMap from "../../components/TheMap/TheMap";
import AddFriendButton from "../../components/AddFriendButton/AddFriendButton";
import Err404Page from "../Err404Page/Err404Page";
import { Typography } from "@material-ui/core";
import SecurityIcon from "@material-ui/icons/Security";

function UserProfilePage(props) {
  const userPageID = Number(props.match.params.userID); //  comes as string. React doesn't like != so this needs to be num for comparison.
  const currentUserID = props.store.user.id;
  const {
    username,
    first_name,
    last_name,
    confirmed_request,
    isModerator,
  } = props.store.focusedUser; //  get info from reducer
  useEffect(() => {
    props.dispatch({
      type: "FOCUS_USER",
      payload: {
        userPageID,
        currentUserID,
      },
    });
  }, [props.match.params.userID]); // refocus whenever the page changes. This fixes the issue that navigating from friends list wouldn't update page info.
  if (username) {
    return (
      <div>
        <div>
          <Typography variant="h5" component="h5">
            {first_name} {last_name}
          </Typography>
          <Typography variant="h5" component="h5">
            {username}
          </Typography>
          {isModerator && (
            <Typography variant="body1" component="h6">
              <SecurityIcon />
              Moderator
            </Typography>
          )}
          {userPageID !== currentUserID && (
            <AddFriendButton
              confirmed_request={confirmed_request}
              userID={currentUserID}
              friendID={userPageID}
            />
          )}
        </div>
        <div>
          <TheMap mapWidth={700} mapHeight={500} customDisplayID={userPageID} />
        </div>
      </div>
    );
  } else {
    return <Err404Page />;
  }
}

export default connect(mapStoreToProps)(UserProfilePage);
