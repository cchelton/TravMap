import React, { useEffect } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
import TheMap from "../../components/TheMap/TheMap";
import { makeStyles } from "@material-ui/core";
import { SizeMe } from "react-sizeme";

const useStyles = makeStyles((theme) => ({
  pageContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  theMapContainer: {
    display: "inline-block",
    height: 722, //  macbook pro 13" chrome browser fill. Need to auto size height from appBodyContainer
    width: "100%",
  },
}));

function UserHomePage(props) {
  const classes = useStyles();
  useEffect(() => {
    const userID = props.store.user.id;
    const displayIDs = props.store.displayIDs;
    props.dispatch({
      type: "GET_IMAGES",
      payload: [userID, ...displayIDs],
    });
  }, [props.match.params.userID]);
  return (
    <div className={classes.pageContainer}>
      <SizeMe
        render={({ size }) => {
          return (
            <div className={classes.theMapContainer}>
              <TheMap
                mapWidth={size.width}
                mapHeight={722} // set as 722px for now
              />
            </div>
          );
        }}
      />
    </div>
  );
}

export default connect(mapStoreToProps)(UserHomePage);
