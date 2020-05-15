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
  Card,
  CardMedia,
  Popover,
  CardActionArea,
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
  popover: {
    minWidth: "80vw",
    maxHeight: "80vh",
    maxWidth: "80vw",
  },
});

class ModerationTable extends Component {
  state = {
    anchorEl: null,
    popoverID: null,
  };

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

  handlePopoverOpen = (anchorElID, reviewID) => (event) => {
    const element = document.getElementById(anchorElID);
    this.setState({
      anchorEl: element,
      popoverID: reviewID,
    });
  };

  handlePopoverClose = (event) => {
    this.setState({
      anchorEl: null,
    });
  };

  render() {
    const tableID = "ModerationTable";
    const { classes } = this.props;
    const tableRowElements = this.props.store.moderation.map((item, index) => (
      <TableRow key={index}>
        <TableCell scope="row">
          <Typography variant="body2" component="p">
            {item.img_id}
          </Typography>
        </TableCell>

        <TableCell scope="row">
          <div className={classes.row}>
            <Card>
              <CardActionArea
                onClick={this.handlePopoverOpen(tableID, item.img_id)}
              >
                <CardMedia
                  className={classes.image}
                  component="img"
                  image={item.img_url}
                  alt={item.title}
                />
              </CardActionArea>
            </Card>
            <Popover
              className={classes.popover}
              open={
                Boolean(this.state.anchorEl) && //  this determines open/close
                this.state.popoverID === item.img_id // this determines which row's popover to bring up
              }
              anchorEl={this.state.anchorEl}
              onClose={this.handlePopoverClose}
              anchorOrigin={{
                vertical: "center",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "center",
                horizontal: "center",
              }}
            >
              <Card>
                <CardMedia
                  component="img"
                  image={item.img_url}
                  alt={item.title}
                />
              </Card>
            </Popover>
          </div>
        </TableCell>

        <TableCell scope="row">
          <Typography variant="body2" component="p">
            {item.title}
          </Typography>
        </TableCell>

        <TableCell scope="row">
          <Typography variant="body2" component="p">
            {item.notes}
          </Typography>
        </TableCell>

        <TableCell scope="row">
          <Typography variant="body2" component="p">
            {item.owner_id}
          </Typography>
        </TableCell>

        <TableCell scope="row">
          <Typography variant="body2" component="p">
            {item.username}
          </Typography>
        </TableCell>

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
      <TableContainer id={tableID}>
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
