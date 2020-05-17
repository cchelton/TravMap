import React, { useState } from "react";
import { makeStyles, IconButton, Tooltip } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import DropZone from "../DropZone/DropZone";
import TheMapReactMap from "./TheMapReactMap/TheMapReactMap";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "inline-block",
    backgroundColor: "lightgrey",
    height: "inherit",
    width: "inherit",
    minHeight: "300px", //  I set min values to see this while I develop
    minWidth: "500px", //  also it makes the map able to be resized
    position: "relative",
  },
  addBtn: {
    position: "absolute",
    right: 10,
    bottom: 10,
  },
  btnIcon: {
    height: 45,
    width: 45,
  },
}));

function TheMap(props) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (event) => {
    setAnchorEl(document.getElementById("mapDiv"));
  };

  const handleClose = (event) => {
    setAnchorEl(null);
  };

  const classes = useStyles();
  return (
    <div id="mapDiv" className={classes.container}>
      <TheMapReactMap
        mapWidth={props.mapWidth}
        mapHeight={props.mapHeight}
        customDisplayID={props.customDisplayID ? props.customDisplayID : null} // send a customDisplayID if it exists
      />
      {props.showAddBtn && (
        <Tooltip title="Post an image" placement="left" arrow>
          <IconButton
            color="secondary"
            className={classes.addBtn}
            onClick={handleOpen}
          >
            <AddCircleIcon className={classes.btnIcon} />
          </IconButton>
        </Tooltip>
      )}
      <DropZone anchorEl={anchorEl} handleClose={handleClose} />
    </div>
  );
}

export default TheMap;
