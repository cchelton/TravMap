import React, { useState } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
import { Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  whiteText: {
    color: theme.palette.primary.contrastText,
  },
}));

function AddFriendButton(props) {
  const [tempMode, setTempMode] = useState(null);
  const userID = props.userID;
  const friendID = props.friendID;
  const classes = useStyles();

  const handleClick = (mode) => (event) => {
    let type = "";
    let payload = { userID, friendID };
    switch (mode) {
      case "ADD":
        type = "CREATE_FRIEND_REQUEST";
        setTempMode("CANCEL");
        break;
      case "REMOVE":
        type = "DELETE_FRIEND";
        setTempMode("ADD");
        break;
      case "CANCEL":
        type = "CANCEL_FRIEND_REQUEST";
        setTempMode("ADD");
        break;
      default:
        // console.log(`Missing AddFriendButton handler TYPE`);

        type = "MISSING TYPE";
    }
    props.dispatch({ type, payload });
  };

  // I was running into the issue where this wouldn't update it's conditional rendering on confirmed_request change.
  // TODO: Make this not depend on tempMode
  if (tempMode) {
    if (tempMode === "CANCEL") {
      return (
        <Button
          className={classes.whiteText}
          color="secondary"
          variant="contained"
          onClick={handleClick("CANCEL")}
        >
          Cancel Request
        </Button>
      );
    } else if (tempMode === "ADD") {
      return (
        <Button
          className={classes.whiteText}
          color="secondary"
          variant="contained"
          onClick={handleClick("ADD")}
        >
          Add Friend
        </Button>
      );
    } else {
      return null; // just in case
    }
  } else {
    if (props.confirmed_request === true) {
      return (
        <Button
          className={classes.whiteText}
          color="secondary"
          variant="contained"
          onClick={handleClick("REMOVE")}
        >
          Remove Friend
        </Button>
      );
    } else if (props.confirmed_request === false) {
      return (
        <Button
          className={classes.whiteText}
          color="secondary"
          variant="contained"
          onClick={handleClick("CANCEL")}
        >
          Cancel Request
        </Button>
      );
    } else if (props.confirmed_request === null) {
      return (
        <Button
          className={classes.whiteText}
          color="secondary"
          variant="contained"
          onClick={handleClick("ADD")}
        >
          Add Friend
        </Button>
      );
    } else {
      return null; // just in case
    }
  }
}

export default connect(mapStoreToProps)(AddFriendButton);
