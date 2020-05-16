import React, { useState } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
import DropZoneS3Uploader from "react-dropzone-s3-uploader";
import {
  makeStyles,
  TextField,
  Button,
  Popover,
  Typography,
  Tooltip,
} from "@material-ui/core";
import axios from "axios";

// import css last, we're overriding the image preview styling of the drop zone
import "./styleImagePreview.css";
const dropzoneStyle = {
  position: "relative",
  width: "400px",
  height: "300px",
  border: "2px dashed rgb(153, 153, 153)",
  borderRadius: "5px",
  cursor: "pointer",
  overflow: "hidden",
};

const useStyles = makeStyles((theme) => ({
  popoverWrapper: {
    padding: 10,
  },
  maxWidth130: {
    maxWidth: 130,
  },
}));

/**
 * This is a modal, it will need an anchorEl state from parent.
 *
 * The parent will need this state:
 *   const [anchorEl, setAnchorEl] = useState(null);
 *
 * @param {*} props Needs anchorEl state
 */
function DropZone(props) {
  const [showAddressBox, updateSAB] = useState(false); // show/hide the address input field
  const [addressBox, updateAddressBox] = useState(""); //  address input field state
  const [imgURL, updateImgURL] = useState("");
  const [imgNotesBox, updateImgNotes] = useState("");
  const [imgTitleBox, updateImgTitle] = useState("");
  const anchorEl = props.anchorEl; //  what element should this come from?

  const handleClose = (event) => {
    props.handleClose();
    updateAddressBox(""); //  clear the input field on close
    updateImgURL(""); //  reset img url
    // reset what's showing in the drop zone
    updateSAB(false);
  };

  const handleAddressChange = (event) => {
    updateAddressBox(event.target.value);
  };

  const handleTitleChange = (event) => {
    updateImgTitle(event.target.value);
  };

  const handleNotesChange = (event) => {
    updateImgNotes(event.target.value);
  };

  //
  // S3Uploader Stuff

  const uploadOptions = {
    server: "http://localhost:5000",
    signingUrlQueryParams: { uploadType: "avatar" },
  };
  const s3Url = "https://travmap-bucket.s3.amazonaws.com";

  const handlePost = (event) => {
    const openCageURL = `https://api.opencagedata.com/geocode/v1/json?q=${addressBox}&key=${process.env.REACT_APP_OPENCAGE_API_KEY}&language=en&pretty=1`;
    axios.get(openCageURL).then((response) => {
      const coords = response.data.results[0].geometry;

      //  this is how we post to our backend after the image is hosted on s3
      const displayIDs = props.store.displayIDs; //  get the current displayIDs for image refresh
      props.dispatch({
        type: "POST_IMAGE",
        payload: {
          image: {
            img_url: imgURL,
            title: imgTitleBox,
            notes: imgNotesBox,
            owner_id: props.user.id, //  the owner is the logged in user
            latitude: coords.lat,
            longitude: coords.lng,
          },
          displayIDs,
        },
      });

      handleClose();
    });
  };

  const handleFinishedUpload = (info) => {
    updateImgURL(info.fileUrl); //  get the image url ready to post

    // open the address bar and other text fields
    updateSAB(true);
    // the user will input the address to get coordinates. This will show the post button.
  };

  //  end S3Uploader Stuff
  //

  const classes = useStyles();
  return (
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
      <div className={classes.popoverWrapper}>
        <div className={classes.popoverHeader}>
          <Typography variant="h6" component="h6">
            Add an image here
          </Typography>
        </div>
        <div className={classes.popoverContents}>
          <Tooltip
            classes={{ tooltip: classes.maxWidth130 }}
            title="Drag and drop an image here, or click to add an image from your device"
            placement="left"
            arrow
          >
            <DropZoneS3Uploader
              onFinish={handleFinishedUpload}
              s3Url={s3Url}
              maxSize={1024 * 1024 * 5}
              upload={uploadOptions}
              style={dropzoneStyle}
            />
          </Tooltip>
          <div>
            {showAddressBox && (
              <Tooltip
                classes={{ tooltip: classes.maxWidth130 }}
                title="Enter the address where this picture was taken"
                placement="left"
                arrow
              >
                <TextField
                  label="address"
                  value={addressBox}
                  onChange={handleAddressChange}
                />
              </Tooltip>
            )}
          </div>
          <div>
            {showAddressBox && (
              <Tooltip
                classes={{ tooltip: classes.maxWidth130 }}
                title="Enter a title for the photo"
                placement="left"
              >
                <TextField
                  label="title"
                  value={imgTitleBox}
                  onChange={handleTitleChange}
                />
              </Tooltip>
            )}
          </div>
          <div>
            {showAddressBox && (
              <Tooltip
                classes={{ tooltip: classes.maxWidth130 }}
                title="Add any notes about this photo"
                placement="left"
              >
                <TextField
                  label="notes"
                  value={imgNotesBox}
                  onChange={handleNotesChange}
                />
              </Tooltip>
            )}
          </div>
          <div>
            {addressBox && imgNotesBox && imgTitleBox && (
              <Button onClick={handlePost} variant="outlined">
                POST
              </Button>
            )}
          </div>
        </div>
      </div>
    </Popover>
  );
}

export default connect(mapStoreToProps)(DropZone);
