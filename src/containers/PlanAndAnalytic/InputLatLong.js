import React, {useState, useEffect} from 'react';
import {
  TextField,
  ButtonGroup,
  Button,
  Select,
  Grid,
} from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 0,
    marginTop: 10,
  },
  label: {
    fontSize: '13px',
    fontWeight: 400
  }
});

const InputLatLong = (props) => {
  const { captionLat, captionLong, inputPosition } = props;
  const { root, label } = useStyles();
  const [longitude, setLongitude] = useState(inputPosition.lng);
  const [latitude, setLatitude] = useState(inputPosition.lat);
  useEffect(() => {
    if (inputPosition.lng !== null || inputPosition.lat !== null) {
      setLongitude(inputPosition.lng);
      setLatitude(inputPosition.lat);
    }
  }, [inputPosition]);

  return (
    <div className={root}>
      <Grid container xs={12} spacing={2}>
        <Grid item xs={6}>
          <label className={label}>{captionLat} :</label>
          <TextField
            variant="outlined"
            id="latitude"
            placeholder="Latitude"
            type="number"
            InputLabelProps={{
              shrink: false,
            }}
            fullWidth
            size="small"
            value={latitude}
          />
        </Grid>
        <Grid item xs={6}>
          <label className={label}>{captionLong} :</label>
          <TextField
            variant="outlined"
            id="longitude"
            placeholder="Longitude"
            type="number"
            InputLabelProps={{
              shrink: false,
            }}
            fullWidth
            size="small"
            value={longitude}
          />
        </Grid>
      </Grid>
    </div>
  );
};

InputLatLong.propTypes = {
  captionLat: PropTypes.string,
  captionLong: PropTypes.string,
};

InputLatLong.defaultProps = {
  captionLat: 'Latitude',
  captionLong: 'Longitude',
};

export default InputLatLong;
