import React from "react";
import TheMap from "../../components/TheMap/TheMap";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  theMapContainer: {
    display: "inline-block",
    height: 500,
    width: 700,
  },
}));

function UserHomePage() {
  const classes = useStyles();
  return (
    <div className={classes.theMapContainer}>
      <TheMap mapWidth={700} mapHeight={500} />
    </div>
  );
}

export default UserHomePage;
