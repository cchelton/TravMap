import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
import {
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  Typography,
  IconButton,
  Checkbox,
  withStyles,
} from "@material-ui/core";
import DeleteSharpIcon from "@material-ui/icons/DeleteSharp";
import FlagSharpIcon from "@material-ui/icons/FlagSharp";
import OutlinedFlagSharpIcon from "@material-ui/icons/OutlinedFlagSharp";

const useStyles = (theme) => ({
  image: {
    maxHeight: 75,
    maxWidth: 75,
  },
  row: {
    height: 75,
    display: "flex",
    alignItems: "center",
  },
});

class ModerationTable extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: "MOD_GET_IMAGES",
    });
  }

  handleReviewChange = (imageID) => (event) => {
    this.props.dispatch({
      type: "MOD_REVIEW_IMAGE",
      payload: imageID,
    });
  };

  handleReviewDelete = (imageID) => (event) => {
    this.props.dispatch({
      type: "MOD_DELETE_IMAGE",
      payload: imageID,
    });
  };

  render() {
    const { classes } = this.props;
    const tableRowElements = this.props.store.moderation.map((item, index) => (
      <TableRow key={index}>
        <TableCell scope="row">{item.img_id}</TableCell>
        <TableCell scope="row">
          <div className={classes.row}>
            <img
              className={classes.image}
              src={item.img_url}
              alt={item.title}
            />
          </div>
        </TableCell>
        <TableCell scope="row">{item.title}</TableCell>
        <TableCell scope="row">{item.notes}</TableCell>
        <TableCell scope="row">{item.owner_id}</TableCell>
        <TableCell scope="row">{item.username}</TableCell>
        <TableCell scope="row">
          <Checkbox
            checked={item.reviewed}
            icon={<OutlinedFlagSharpIcon />}
            checkedIcon={<FlagSharpIcon />}
            onChange={this.handleReviewChange(item.img_id)}
            color="primary"
          />
        </TableCell>
        <TableCell scope="row">
          {item.reviewed ? null : (
            <IconButton
              color="secondary"
              onClick={this.handleReviewDelete(item.img_id)}
            >
              <DeleteSharpIcon />
            </IconButton>
          )}
        </TableCell>
      </TableRow>
    ));
    return (
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle1" component="h4">
                  ID
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" component="h4">
                  Image
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" component="h4">
                  Title
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" component="h4">
                  Notes
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" component="h4">
                  User ID
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" component="h4">
                  Username
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" component="h4">
                  Reviewed
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" component="h4">
                  Delete
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{tableRowElements}</TableBody>
        </Table>
      </TableContainer>
    );
  }
}

export default connect(mapStoreToProps)(withStyles(useStyles)(ModerationTable));
