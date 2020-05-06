import React, { useState } from "react";
import { makeStyles, AppBar, Typography, ButtonBase } from "@material-ui/core";
import FriendsList from "../FriendsList/FriendsList";

const useStyles = makeStyles((theme) => ({
  appBar: {
    top: "auto",
    bottom: 0,
  },
  toolbar: {
    display: "flex",
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  friendsList: {
    padding: "5px 24px",
    display: "inline-block",
    borderLeft: "solid rgba(0, 0, 0, 0.54) 1px",
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
      <FriendsList anchorEl={anchorEl} handleClose={handleClose} />
      <div className={classes.toolbar}>
        <ButtonBase className={classes.friendsList} onClick={handleOpen}>
          <Typography component="h6">Friends</Typography>
        </ButtonBase>
      </div>
    </AppBar>
  );
}

export default Footer;
