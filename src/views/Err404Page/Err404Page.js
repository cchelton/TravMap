import React from "react";
import { Typography, makeStyles, Divider } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 15,
  },
}));

function Err404Page(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="h3" component="h1">
        404 Not Found
      </Typography>
      <Divider />
      <Typography variant="h5" component="h2">
        Sorry, the page or user you are looking for does not exist.
      </Typography>
    </div>
  );
}

export default Err404Page;
