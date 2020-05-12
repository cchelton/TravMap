import React, { useEffect } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
import TheMap from "../../components/TheMap/TheMap";
import Err404Page from "../Err404Page/Err404Page";
import { Typography } from "@material-ui/core";
import SecurityIcon from "@material-ui/icons/Security";

function UserProfilePage(props) {
  const userID = props.match.params.userID;
  const isModerator = props.store.focusedUser.moderator;
  const username = props.store.focusedUser.username;
  const first_name = props.store.focusedUser.first_name;
  const last_name = props.store.focusedUser.last_name;

  useEffect(() => {
    props.dispatch({
      type: "FOCUS_USER",
      payload: userID,
    });
  }, [props.match.params.userID]); // refocus whenever the page changes. This fixes the issue that navigating from friends list wouldn't update page info.

  try {
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
        </div>
        <div>
          <TheMap mapWidth={700} mapHeight={500} customDisplayID={userID} />
        </div>
      </div>
    );
  } catch (err) {
    return <Err404Page />;
  }
}

export default connect(mapStoreToProps)(UserProfilePage);
