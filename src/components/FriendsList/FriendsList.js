import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
import ExpandedFriendsList from "./ExpandedFriendsList";

class FriendsList extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: "GET_FRIENDS",
      payload: this.props.user.id,
    });
  }

  render() {
    return (
      <ExpandedFriendsList
        anchorEl={this.props.anchorEl}
        handleClose={this.props.handleClose}
      />
    );
  }
}

export default connect(mapStoreToProps)(FriendsList);
