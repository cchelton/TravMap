import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import mapStoreToProps from "../../../redux/mapStoreToProps";
import ReactMapGL from "react-map-gl";
import ImageMarker from "../ImageMarker";

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
    this.props.dispatch({
      type: "GET_IMAGES",
      payload: this.props.user.id,
    });
  }

  render() {
    const imageMarkers = this.props.store.image.map((image, index) => (
      <ImageMarker image={image} key={index}>
        <img src={image.img_url} alt={image.title} />
      </ImageMarker>
    ));

    return (
      <ReactMapGL
        mapStyle="mapbox://styles/mapbox/outdoors-v11"
        {...this.state.viewport}
        onViewportChange={(viewport) => this.setState({ viewport })}
      >
        {imageMarkers}
      </ReactMapGL>
    );
  }
}

TheMapReactMap.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStoreToProps)(TheMapReactMap);
