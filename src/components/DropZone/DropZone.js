import React, { useState } from "react";
import { makeStyles, Modal } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    width: 400,
  },
}));

/**
 * This is a modal, it will need open/close handlers.
 *
 * @param {*} props Needs handleOpen and handleClose funcs
 */
function DropZone(props) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();
  return (
    <div>
      <button onClick={handleOpen}>open modal</button>
      <Modal open={open} onClose={handleClose} className={classes.modal}>
        <div>
          <h2>Yeet son</h2>
        </div>
      </Modal>
    </div>
  );
}

export default DropZone;
