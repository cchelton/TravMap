import React, { useState } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
import { withRouter } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import {
  makeStyles,
  withStyles,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from "@material-ui/core";
import MapIcon from "@material-ui/icons/Map";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SecurityIcon from "@material-ui/icons/Security";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

function Header(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles();
  const userID = props.user.id;

  const handleClick = (path) => (event) => {
    props.history.push(path);
  };

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="sticky">
        <Toolbar>
          <Typography className={classes.title} variant="h6" component="h6">
            TravMap
          </Typography>
          {/* hide the buttons when logged out */}
          {props.user.id && (
            <div>
              {/* only show the moderator button to moderators. Keep users away if possible. */}
              {props.user.moderator && (
                <IconButton onClick={handleClick("/moderation")}>
                  <SecurityIcon />
                </IconButton>
              )}
              <IconButton onClick={handleClick("/home")}>
                <MapIcon />
              </IconButton>
              <IconButton onClick={handleOpen}>
                <AccountCircleIcon />
              </IconButton>
              <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem
                  onClick={() => {
                    handleClick(`/user/${userID}`)();
                    handleClose();
                  }}
                >
                  Profile
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <LogOutButton />
                </MenuItem>
              </StyledMenu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withRouter(connect(mapStoreToProps)(Header));
