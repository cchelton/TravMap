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
      <TheMap />
    </div>
  );
}

export default UserHomePage;
