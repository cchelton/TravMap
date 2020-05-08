import React, { useState } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
import DropZoneS3Uploader from "react-dropzone-s3-uploader";
import {
  withStyles,
  Menu,
  MenuItem,
  TextField,
  Button,
} from "@material-ui/core";
import axios from "axios";

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
 * This is a modal, it will need open/close handlers and parent's state.
 *
 * The parent will need this state:
 *   const [open, setOpen] = useState(false);
 *
 * @param {*} props Needs handleOpen and handleClose funcs and "open" state
 */
function DropZone(props) {
  const [addressBox, updateAddressBox] = useState(""); //  address input field state
  const [showAddressBox, updateSAB] = useState(false); // show/hide the address input field
  const [showPostButton, updateSPB] = useState(false); //  show/hide the post button
  const [imgURL, updateImgURL] = useState("");
  const anchorEl = props.anchorEl; //  what element should this come from?

  const handleClose = (event) => {
    props.handleClose();
    updateAddressBox(""); //  clear the input field on close
    updateImgURL(""); //  reset img url
    // reset what's showing in the drop zone
    updateSAB(false);
    updateSPB(false);
  };

  const handleChange = (event) => {
    updateAddressBox(event.target.value);
    if (addressBox.length) {
      updateSPB(true);
    } else {
      updateSPB(false);
    }
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
      props.dispatch({
        type: "POST_IMAGE",
        payload: {
          img_url: imgURL,
          title: "test image",
          notes: "test upload",
          owner_id: props.user.id, //  the owner is the logged in user
          latitude: coords.lat,
          longitude: coords.lng,
        },
      });
      handleClose();
    });
  };

  const handleFinishedUpload = (info) => {
    console.log("File uploaded with filename", info.filename);
    console.log("Access it on s3 at", info.fileUrl);

    updateImgURL(info.fileUrl); //  get the image url ready to post

    // open the address bar
    updateSAB(true);
    // the user will input the address to get coordinates. This will show the post button.
  };

  //  end S3Uploader Stuff
  //

  return (
    <StyledMenu
      id="customized-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <MenuItem disableRipple>
        <DropZoneS3Uploader
          onFinish={handleFinishedUpload}
          s3Url={s3Url}
          maxSize={1024 * 1024 * 5}
          upload={uploadOptions}
        />
      </MenuItem>
      {showAddressBox && (
        <MenuItem disableRipple>
          <TextField
            label="address"
            value={addressBox}
            onChange={handleChange}
          />
        </MenuItem>
      )}
      {showPostButton && (
        <MenuItem disableRipple>
          <Button onClick={handlePost} variant="outlined">
            POST
          </Button>
        </MenuItem>
      )}
    </StyledMenu>
  );
}

export default connect(mapStoreToProps)(DropZone);
