import React from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
import DropZoneS3Uploader from "react-dropzone-s3-uploader";
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

  //
  // S3Uploader Stuff

  const handleFinishedUpload = (info) => {
    console.log("File uploaded with filename", info.filename);
    console.log("Access it on s3 at", info.fileUrl);
    console.log(info);

    props.dispatch({
      type: "POST_IMAGE",
      payload: {
        img_url: info.fileUrl,
        title: "test image",
        notes: "test upload",
        owner_id: props.user.id, //  the owner is the logged in user
        latitude: 0,
        longitude: 0,
      },
    });
  };

  const uploadOptions = {
    server: "http://localhost:5000",
    signingUrlQueryParams: { uploadType: "avatar" },
  };
  const s3Url = "https://travmap-bucket.s3.amazonaws.com";

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
      <MenuItem>
        <DropZoneS3Uploader
          onFinish={handleFinishedUpload}
          s3Url={s3Url}
          maxSize={1024 * 1024 * 5}
          upload={uploadOptions}
        />
      </MenuItem>
    </StyledMenu>
  );
}

export default connect(mapStoreToProps)(DropZone);
