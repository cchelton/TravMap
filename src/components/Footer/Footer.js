import React, { useState } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
import FriendsList from "../FriendsList/FriendsList";
import { makeStyles, AppBar, Typography, ButtonBase } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  appBar: {
    top: "auto",
    bottom: 0,
    minHeight: "34px",
  },
  toolbar: {
    display: "flex",
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  friendsList: {
    padding: "5px 24px",
    display: "inline-block",
    borderLeft: `solid ${theme.palette.primary.contrastText} 1px`,
  },
}));

function Footer(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles();

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    setAnchorEl(null);
  };
  return (
    <AppBar className={classes.appBar}>
      {props.user.id && (
        <div className={classes.toolbar}>
          <ButtonBase className={classes.friendsList} onClick={handleOpen}>
            <Typography component="h6">Friends</Typography>
          </ButtonBase>
          <FriendsList anchorEl={anchorEl} handleClose={handleClose} />
        </div>
      )}
    </AppBar>
  );
}

export default connect(mapStoreToProps)(Footer);
