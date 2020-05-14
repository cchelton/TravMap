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
} from "@material-ui/core";
import {} from "@material-ui/icons";

class ModerationTable extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: "MOD_GET_IMAGES",
    });
  }
  render() {
    const tableRowElements = this.props.store.moderation.map((item, index) => (
      <TableRow key={index}>
        <TableCell scope="row">{item.img_id}</TableCell>
        <TableCell scope="row">{item.img_url}</TableCell>
        <TableCell scope="row">{item.title}</TableCell>
        <TableCell scope="row">{item.notes}</TableCell>
        <TableCell scope="row">{item.owner_id}</TableCell>
        <TableCell scope="row">{item.username}</TableCell>
        <TableCell scope="row">{String(item.reviewed)}</TableCell>
        <TableCell scope="row">Delete</TableCell>
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

export default connect(mapStoreToProps)(ModerationTable);
