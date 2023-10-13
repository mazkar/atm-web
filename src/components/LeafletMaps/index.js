import React from 'react';
// eslint-disable-next-line no-unused-vars
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = () => ({
  root:{
    width: (props) => props.width,
    height: (props) => props.height,
  },
  locPin:{
    position: 'absolute',
    width: 40,
    height: 40,
    left: -40 / 2,
    top: -40 / 2,

    border: '5px solid #f44336',
    borderRadius: 40,
    backgroundColor: 'white',
    textAlign: 'center',
    color: '#3f51b5',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 4
  },
});

const index = (props) => {
  const {position, zoom, classes} = props;
  const pinA = [110.3776528, 110.3776528];
  return (
    <div className={classes.root}>
      <Map center={position} zoom={zoom}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={pinA}>
          <Popup>
            <div className={classes.locPin}>A</div>
          </Popup>
        </Marker>
      </Map>
    </div>
  );
};

index.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  position: PropTypes.array,
  zoom: PropTypes.number,
  // eslint-disable-next-line react/no-unused-prop-types
  width: PropTypes.string,
  // eslint-disable-next-line react/no-unused-prop-types
  height: PropTypes.number,
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
};

index.defaultProps = {
  position: [-3.8096338, 108.729443],
  zoom: 13,
  width: "100%",
  height: 320,
};

export default withStyles(styles)(index);
