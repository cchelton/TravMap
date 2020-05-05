import React, { useState } from "react";
import { makeStyles, Modal } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    width: 400,
  },
  testWords: {
    color: "#fff",
  },
}));

/**
 * This is a modal, it will need open/close handlers and parent's state.
 *
 * The parent will need this state:
 *   const [open, setOpen] = useState(false);
 *
 * @param {*} props Needs handleOpen and handleClose funcs and "open" state
 */
function DropZone(props) {
  const classes = useStyles();
  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      className={classes.modal}
    >
      <div>
        <h2 className={classes.testWords}>DROP ZONE</h2>
      </div>
    </Modal>
  );
}

export default DropZone;
