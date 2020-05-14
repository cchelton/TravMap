import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import mapStoreToProps from "../../redux/mapStoreToProps";
import {
  withStyles,
  Menu,
  MenuItem,
  Typography,
  TextField,
  Checkbox,
  IconButton,
} from "@material-ui/core";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    {...props}
  />
));

/**
 * Expanded Friends List Menu.
 * Open state managed by parent component.
 *
 * state line for parent:
 * const [anchorEl, setAnchorEl] = React.useState(null);
 *
 * event handler to open:
 * const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
 *
 * event handler to close:
 * const handleClose = () => {
    setAnchorEl(null);
  };
 */
class FriendsList extends Component {
  handleChange = (id) => (event) => {
    event.stopPropagation();
    const userID = this.props.store.user.id;
    const friendID = id;
    let displayIDs = this.props.store.friend.filter((friend) =>
      friend.display_photos ? id !== friend.friend_id : id === friend.friend_id
    );

    // add friend IDs
    displayIDs = displayIDs.map((friend) => friend.friend_id);
    this.props.dispatch({
      type: "TOGGLE_FRIEND_PHOTO_DISPLAY",
      payload: {
        userID,
        friendID,
        displayIDs,
      },
    });
  };

  // link to friend page
  handleFriendClick = (friendID) => (event) => {
    this.props.history.push(`/user/${friendID}`);
  };

  // accept a request
  handleAcceptClick = (friendID) => (event) => {
    event.stopPropagation();
    const userID = this.props.store.user.id;

    this.props.dispatch({
      type: "CONFIRM_FRIEND_REQUEST",
      payload: {
        userID,
        friendID,
      },
    });
  };

  // deny a request
  handleDenyClick = (friendID) => (event) => {
    event.stopPropagation();
    const userID = this.props.store.user.id;

    this.props.dispatch({
      type: "DENY_FRIEND_REQUEST",
      payload: {
        userID,
        friendID,
      },
    });
  };

  render() {
    const anchorEl = this.props.anchorEl;
    const handleClose = this.props.handleClose;

    const friendElements = this.props.store.friend.map((friend, index) => (
      <MenuItem key={index} onClick={this.handleFriendClick(friend.friend_id)}>
        <Checkbox
          checked={friend.display_photos}
          onClickCapture={this.handleChange(friend.friend_id)}
        />
        <Typography variant="body1" component="p">
          {friend.friend_name}
        </Typography>
      </MenuItem>
    ));

    const requestElements = this.props.store.request.map((person, index) => (
      <MenuItem key={index} onClick={this.handleFriendClick(person.friend_id)}>
        <IconButton
          color="primary"
          onClickCapture={this.handleAcceptClick(person.friend_id)}
        >
          <AddCircleOutlineOutlinedIcon />
        </IconButton>
        <Typography variant="body1" component="p">
          {person.friend_name}
        </Typography>
        <IconButton
          color="primary"
          onClickCapture={this.handleDenyClick(person.friend_id)}
        >
          <DeleteForeverOutlinedIcon />
        </IconButton>
      </MenuItem>
    ));
    return (
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <Typography variant="subtitle1" component="p">
            Friends
          </Typography>
        </MenuItem>
        <MenuItem>
          <TextField margin="dense" placeholder="search" disabled />
        </MenuItem>
        {friendElements}
        {requestElements.length !== 0 && (
          <MenuItem>
            <Typography variant="subtitle1" component="p">
              Requests
            </Typography>
          </MenuItem>
        )}
        {requestElements}
      </StyledMenu>
    );
  }
}

export default withRouter(connect(mapStoreToProps)(FriendsList));
