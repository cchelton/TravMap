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
      zoom: 8,
    },
  };

  componentDidMount() {
    const dispatchType = this.props.customDisplayID
      ? "GET_FOCUSED_USER_IMAGES"
      : "GET_IMAGES";
    this.props.dispatch({
      type: dispatchType,
      payload: this.props.customDisplayID || this.props.store.displayIDs, // display the ids from friends list or custom id for user pages
    });
  }

  render() {
    const useCustomID = this.props.customDisplayID ? true : false; // which display mode to use? User's Home Map or single user map

    let MarkerElements = [];
    if (useCustomID) {
      MarkerElements = this.props.store.focusedUserImage.map((image, index) => (
        <ImageMarker image={image} key={index}>
          <img src={image.img_url} alt={image.title} />
        </ImageMarker>
      ));
    } else {
      MarkerElements = this.props.store.image.map((image, index) => (
        <ImageMarker image={image} key={index}>
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
