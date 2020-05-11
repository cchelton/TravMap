import React, { useState } from "react";
import {
  makeStyles,
  withStyles,
  ButtonBase,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";
import { Marker } from "react-map-gl";

const useStyles = makeStyles({
  img: {
    width: 50,
    height: 50,
    borderRadius: "50%",
  },
  circle: {
    borderRadius: "50%",
  },
});

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "center",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "center",
      horizontal: "center",
    }}
    {...props}
  />
));

/**
 * Circular image map marker.
 * Shows full image & details on click.
 *
 * Needs image prop.
 */
function ImageMarker(props) {
  const latitude = Number(props.image.latitude);
  const longitude = Number(props.image.longitude);
  const offsetLeft = -25;
  const offsetTop = -25;
  const img_url = props.image.img_url;
  const title = props.image.title;
  const notes = props.image.notes;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null); //  null hides menu

  //  open image menu
  const handleOpen = (event) => {
    console.log(event.currentTarget);
    setAnchorEl(document.getElementById("mapDiv"));
  };

  //  close image menu
  const handleClose = (event) => {
    setAnchorEl(null);
  };

  return (
    <Marker
      latitude={latitude}
      longitude={longitude}
      offsetLeft={offsetLeft}
      offsetTop={offsetTop}
    >
      <ButtonBase className={classes.circle} onClick={handleOpen}>
        <img className={classes.img} src={img_url} alt={title} />
      </ButtonBase>
      <StyledMenu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem disableRipple>
          <img src={img_url} alt={title} />
        </MenuItem>
        <MenuItem disableRipple>
          <Typography variant="caption" component="p">
            {notes}
          </Typography>
        </MenuItem>
      </StyledMenu>
    </Marker>
  );
}

export default ImageMarker;
