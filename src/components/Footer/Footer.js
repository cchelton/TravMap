import React from "react";
import { makeStyles, AppBar, Typography, ButtonBase } from "@material-ui/core";

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
  const classes = useStyles();
  return (
    <AppBar className={classes.appBar}>
      <div className={classes.toolbar}>
        <ButtonBase className={classes.friendsList}>
          <Typography component="h6">Friends</Typography>
        </ButtonBase>
      </div>
    </AppBar>
  );
}

export default Footer;
