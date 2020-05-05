import React from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
import { withRouter } from "react-router-dom";
import {
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
} from "@material-ui/core";
import MapIcon from "@material-ui/icons/Map";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SecurityIcon from "@material-ui/icons/Security";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

function Header(props) {
  const classes = useStyles();
  const userID = props.user.id;

  const handleClick = (path) => (event) => {
    props.history.push(path);
  };

  return (
    <div className={classes.root}>
      <AppBar position="sticky">
        <Toolbar>
          <Typography className={classes.title} variant="h6" component="h6">
            TravMap
          </Typography>
          <IconButton onClick={handleClick("/moderation")}>
            <SecurityIcon />
          </IconButton>
          <IconButton onClick={handleClick("/home")}>
            <MapIcon />
          </IconButton>
          <IconButton onClick={handleClick(`/user/${userID}`)}>
            <AccountCircleIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withRouter(connect(mapStoreToProps)(Header));
