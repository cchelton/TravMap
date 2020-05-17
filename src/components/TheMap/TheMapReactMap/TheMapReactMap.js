import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../../redux/mapStoreToProps";
import ReactMapGL from "react-map-gl";
import ImageMarker from "./ImageMarker";

class TheMapReactMap extends Component {
  state = {
    viewport: {
      width: this.props.mapWidth,
      height: this.props.mapHeight,
      latitude: 39.0997,
      longitude: -94.5786,
      zoom: 1,
    },
  };

  render() {
    const useCustomID = this.props.customDisplayID ? true : false; // which display mode to use? User's Home Map or single user map
    const userID = this.props.store.user.id; // used to show/hide delete image button. deletion is secured server-side so no worries if another user clicks delete. Hide for design.

    let MarkerElements = [];
    if (useCustomID) {
      MarkerElements = this.props.store.focusedUserImage.map((image, index) => (
        <ImageMarker image={image} key={index} userID={userID}>
          <img src={image.img_url} alt={image.title} />
        </ImageMarker>
      ));
    } else {
      MarkerElements = this.props.store.image.map((image, index) => (
        <ImageMarker image={image} key={index} userID={userID}>
          <img src={image.img_url} alt={image.title} />
        </ImageMarker>
      ));
    }
    return (
      <ReactMapGL
        mapStyle="mapbox://styles/mapbox/outdoors-v11"
        {...this.state.viewport}
        onViewportChange={(viewport) => this.setState({ viewport })}
      >
        {MarkerElements}
      </ReactMapGL>
    );
  }
}

export default connect(mapStoreToProps)(TheMapReactMap);
