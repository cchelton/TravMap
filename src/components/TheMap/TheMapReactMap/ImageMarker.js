import React, { useState } from "react";
import {
  makeStyles,
  ButtonBase,
  Typography,
  Popover,
  Card,
  CardMedia,
  CardContent,
  CardActions,
} from "@material-ui/core";
import { Marker } from "react-map-gl";
import ImageDeleteButton from "../../ImageDeleteButton/ImageDeleteButton";

const useStyles = makeStyles({
  img: {
    width: 50,
    height: 50,
    borderRadius: "50%",
  },
  circle: {
    borderRadius: "50%",
  },
  expandedImg: {
    maxHeight: "70vh",
    maxWidth: "100vw",
  },
  media: {
    width: "auto",
  },
});

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
  const userID = props.userID;
  const ownerID = props.image.owner_id;
  const imageID = props.image.id;
  const img_url = props.image.img_url;
  const title = props.image.title;
  const notes = props.image.notes;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null); //  null hides menu

  //  open image menu
  const handleOpen = (event) => {
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
      <Popover
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
      >
        <Card>
          <CardMedia
            className={classes.expandedImg}
            component="img"
            image={img_url}
            alt={title}
            classes={{
              media: classes.media,
            }}
          />
          <CardContent>
            <Typography variant="h6" component="h6">
              {title}
            </Typography>

            <Typography variant="caption" component="p">
              {notes}
            </Typography>
          </CardContent>
          {userID === ownerID && (
            <CardActions>
              <ImageDeleteButton imageID={imageID} />
            </CardActions>
          )}
        </Card>
      </Popover>
    </Marker>
  );
}

export default ImageMarker;
