import React from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
import { Button } from "@material-ui/core";

function AddFriendButton(props) {
  switch (props.confirmed_request) {
    case true:
      return <Button color="secondary">Remove Friend</Button>;
    case false:
      return <Button color="default">Cancel Request</Button>;
    default:
      return <Button color="primary">Add Friend</Button>;
  }
}

export default connect(mapStoreToProps)(AddFriendButton);
