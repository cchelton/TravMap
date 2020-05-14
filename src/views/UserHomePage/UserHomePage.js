import React, { useEffect } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
import TheMap from "../../components/TheMap/TheMap";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  theMapContainer: {
    display: "inline-block",
    height: 500,
    width: 700,
  },
}));

function UserHomePage(props) {
  const classes = useStyles();
  useEffect(() => {
    const userID = props.store.user.id;
    props.dispatch({
      type: "GET_IMAGES",
      payload: userID,
    });
  }, [props.match.params.userID]);
  return (
    <div className={classes.theMapContainer}>
      <TheMap mapWidth={700} mapHeight={500} />
    </div>
  );
}

export default connect(mapStoreToProps)(UserHomePage);
