import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import mapStoreToProps from "../../../redux/mapStoreToProps";
import ReactMapGL, { Marker } from "react-map-gl";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  img: {
    maxWidth: 100,
  },
});

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
    const { classes } = this.props;
    const imageMarkers = this.props.store.image.map((image, index) => (
      <Marker
        latitude={Number(image.latitude)}
        longitude={Number(image.longitude)}
        offsetLeft={-20}
        offsetTop={-10}
        key={index}
      >
        <img className={classes.img} src={image.img_url} alt={image.title} />
      </Marker>
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

export default connect(mapStoreToProps)(withStyles(styles)(TheMapReactMap));
