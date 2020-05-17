import React from "react";
import { Typography, Divider, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 15,
  },
}));

function Err403Page() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="h3" component="h1">
        403 Forbidden
      </Typography>
      <Divider />
      <Typography variant="h5" component="h2">
        You do not have the necessary permissions to view this page.
      </Typography>
    </div>
  );
}

export default Err403Page;
