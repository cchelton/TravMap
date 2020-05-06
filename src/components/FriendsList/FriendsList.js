import React from "react";
import { withStyles, Menu, MenuItem } from "@material-ui/core";

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

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

const testFriends = ["john", "taco", "charlie", "toast"];

/**
 * Expandable Friends List Menu.
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

  const friendElements = testFriends.map((item, index) => (
    <StyledMenuItem key={index}>
      <p>{item}</p>
    </StyledMenuItem>
  ));
  return (
    <StyledMenu
      id="customized-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
    >
      <StyledMenuItem onClick={handleClose}>
        <h5>Friends</h5>
      </StyledMenuItem>
      <StyledMenuItem>
        <input placeholder="search" readOnly />
      </StyledMenuItem>
      {friendElements}
    </StyledMenu>
  );
}

export default FriendsList;
