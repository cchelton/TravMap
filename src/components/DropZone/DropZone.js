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
      horizontal: "left",
    }}
    transformOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    {...props}
  />
));

/**
 * This is a modal, it will need open/close handlers and parent's state.
 *
 * The parent will need this state:
 *   const [open, setOpen] = useState(false);
 *
 * @param {*} props Needs handleOpen and handleClose funcs and "open" state
 */
function DropZone(props) {
  const anchorEl = props.anchorEl;
  const handleClose = props.handleClose;

  return (
    <StyledMenu
      id="customized-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <MenuItem>
        <h2>DROP ZONE</h2>
      </MenuItem>
    </StyledMenu>
  );
}

export default DropZone;
