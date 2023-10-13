import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import GoogleMap from 'google-map-react';

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
  const {center, zoom, classes} = props;
  return (
    <div className={classes.root}>
      <GoogleMap
        apiKey="AIzaSyBHuGAHCc5dxa0F7K566YRoDItjygvzt74" 
        center={center}
        zoom={zoom}>
        <div className={classes.locPin} lat={110.3776528} lng={110.3776528} >A</div>
      </GoogleMap>
    </div>
        
  );
};

index.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  center: PropTypes.array,
  zoom: PropTypes.number,
  // eslint-disable-next-line react/no-unused-prop-types
  width: PropTypes.number,
  // eslint-disable-next-line react/no-unused-prop-types
  height: PropTypes.number,
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
};

index.defaultProps = {
  center: [-3.8096338, 108.729443], 
  zoom: 9,
  width: "100%",
  height: 320,
};

export default withStyles(styles)(index);
