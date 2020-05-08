import React, { Component } from "react";
import ReactMapGL from "react-map-gl";

class TheMapReactMap extends Component {
  state = {
    viewport: {
      width: this.props.mapWidth,
      height: this.props.mapHeight,
      latitude: 37.7577,
      longitude: -122.4376,
      zoom: 8,
    },
  };

  render() {
    return (
      <ReactMapGL
        {...this.state.viewport}
        onViewportChange={(viewport) => this.setState({ viewport })}
      />
    );
  }
}

export default TheMapReactMap;
