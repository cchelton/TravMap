import React from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
import { Button } from "@material-ui/core";

/**
 * Button to delete image. Expects imageID through props
 */
function ImageDeleteButton(props) {
  const imageID = props.imageID;
  const displayIDs = props.store.displayIDs;
  const handleClick = () => {
    props.dispatch({
      type: "DELETE_IMAGE",
      payload: {
        imageID,
        displayIDs,
      },
    });
  };
  return (
    <Button color="secondary" onClick={handleClick}>
      Delete
    </Button>
  );
}

export default connect(mapStoreToProps)(ImageDeleteButton);
