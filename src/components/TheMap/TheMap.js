import React from "react";
import { makeStyles, IconButton } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "inline-block",
    backgroundColor: "lightgrey",
    minHeight: "300px", //  I set min values to see this while I develop
    minWidth: "500px", //  also it makes the map able to be resized
    position: "relative",
  },
  addBtn: {
    position: "absolute",
    right: 0,
    bottom: 0,
  },
}));

function TheMap(props) {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <h2>
        <strong>
          <u>THE MAP</u>
        </strong>
      </h2>
      <IconButton className={classes.addBtn}>
        <AddCircleIcon />
      </IconButton>
    </div>
  );
}

export default TheMap;
