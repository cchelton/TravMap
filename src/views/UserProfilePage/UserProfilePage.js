import React, { useEffect } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
import Err404Page from "../Err404Page/Err404Page";

function UserProfilePage(props) {
  useEffect(() => {
    const userID = props.match.params.userID;
    props.dispatch({
      type: "FOCUS_USER",
      payload: userID,
    });
  }, [props.match.params.userID]);

  try {
    return (
      <div>
        <h2>{props.match.params.userID}</h2>
      </div>
    );
  } catch (err) {
    return <Err404Page />;
  }
}

export default connect(mapStoreToProps)(UserProfilePage);
