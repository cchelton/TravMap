import React from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
import {
  withStyles,
  Menu,
  MenuItem,
  Typography,
  TextField,
  Checkbox,
} from "@material-ui/core";

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
function FriendsList(props) {
  const anchorEl = props.anchorEl;
  const handleClose = props.handleClose;

  const handleChange = (id) => (event) => {
    const userID = props.store.user.id;
    const friendID = id;
    let displayIDs = props.store.friend
      .map((friend) => friend.friend_id)
      .filter((friend) => friend.friend_id !== id);

    props.dispatch({
      type: "TOGGLE_FRIEND_PHOTO_DISPLAY",
      payload: {
        userID,
        friendID,
        displayIDs,
      },
    });
  };

  const friendElements = props.store.friend.map((friend, index) => (
    <MenuItem key={index}>
      <Checkbox
        checked={friend.display_photos}
        onChangeCapture={handleChange(friend.friend_id)}
      />
      <Typography variant="body1" component="p">
        {friend.friend_name}
      </Typography>
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
    </StyledMenu>
  );
}

export default connect(mapStoreToProps)(FriendsList);
