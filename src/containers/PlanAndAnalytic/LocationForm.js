import React, { useEffect } from 'react';
import { Typography, Grid, Button, Paper, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import constants from '../../helpers/constants';
import { tuple } from 'antd/lib/_util/type';

const useStyles = makeStyles({
  formContainer: {
    marginTop: '100px',
    position: 'relative',
    width: 320,
    boxShadow: '0px 6px 6px rgba(232, 238, 255, 0.3)',
    padding: 15,
    borderRadius: 10,
  },
  formInput: {
    width: '100%',
    borderRadius: 8,
    backgroundColor: constants.color.grayUltraSoft,
    border: `1px solid ${constants.color.grayMedium}`,
    margin: 0,
  },
  formButtonContainer: {
    marginTop: 32,
  },
  formButton: {
    backgroundColor: constants.color.primaryHard,
    boxShadow: '0px 6px 6px rgba(220, 36, 31, 0.1)',
    borderRadius: 10,
    color: constants.color.white,
    textTransform: 'none',
  },
  errorText: {
    fontWeight: 400,
    fontSize: 12,
    color: constants.color.primaryHard,
  },
});

const LocationIcon = () => (
  <svg width="30" height="30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="30" height="30" rx="10" fill="#FFE9E9" />
    <g clipPath="url(#clip0)" fill="#DC241F">
      <path
        opacity=".4"
        d="M15 5c-4.14 0-7.5 3.36-7.5 7.5 0 3.024 1.055 3.867 6.73 12.096a.938.938 0 001.54 0c5.675-8.229 6.73-9.072 6.73-12.096C22.5 8.36 19.14 5 15 5zm0 11.25a3.75 3.75 0 110-7.501 3.75 3.75 0 010 7.5z"
      />
      <path d="M15 15a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
    </g>
    <defs>
      <clipPath id="clip0">
        <path fill="#fff" transform="translate(5 5)" d="M0 0h20v20H0z" />
      </clipPath>
    </defs>
  </svg>
);

const LocationForm = ({ onClick, scatMan, inputPosition }) => {
  const {
    formContainer,
    formInput,
    formButtonContainer,
    formButton,
    errorText,
  } = useStyles();
  const [longitude, setLongitude] = React.useState(inputPosition.lng);
  const [latitude, setLatitude] = React.useState(inputPosition.lat);
  const [disable, setDisable] = React.useState(false);
  const [errorValue, setErrorValue] = React.useState(false);
  const [items, setItems] = React.useState('Items');
  const regexVar = /-?\d+(\.\d+)?/;

  const [myWord, setMyWord] = React.useState('Any');
  const karlFranz = (word) => alert(word);

  useEffect(() => {
    if (latitude === null || longitude === null) {
      setDisable(true);
      setErrorValue(false);
    } else if (!regexVar.test(latitude) || !regexVar.test(longitude)) {
      setDisable(true);
      setErrorValue(true);
    } else {
      setDisable(false);
      setErrorValue(false);
    }

    console.log(regexVar);
    // console.log(setDisable);
    console.log(latitude);
    console.log(longitude);
  }, [latitude, longitude]);

  useEffect(() => {
    if (inputPosition.lng !== null || inputPosition.lat !== null) {
      let lat = inputPosition.lat.toString;
      let lng = inputPosition.lng.toString;
      setLongitude(inputPosition.lng);
      setLatitude(inputPosition.lat);
    }
  }, [inputPosition]);

  return (
    <Paper className={formContainer}>
      <Grid container alignItems="center" spacing={2}>
        <Grid item>
          <LocationIcon />
        </Grid>
        <Grid item>
          <Typography
            variant="body1"
            component="p"
            gutterBottom
            style={{ fontWeight: 500 }}
          >
            Input Location
          </Typography>
        </Grid>
      </Grid>

      <Grid container direction="column" spacing={2}>
        <Grid item>
          <TextField
            className={formInput}
            id="latitude"
            placeholder="Latitude"
            type="number"
            variant="outlined"
            InputLabelProps={{
              shrink: false,
            }}
            value={latitude}
            onChange={(e) => {
              if (e.target.value.match(regexVar) || e.target.value === '') {
                setLatitude(e.target.value);
              }
            }}
            error={errorValue}
          />
        </Grid>

        <Grid item>
          <TextField
            className={formInput}
            id="longitude"
            placeholder="Longitude"
            type="number"
            variant="outlined"
            InputLabelProps={{
              shrink: false,
            }}
            value={longitude}
            onChange={(e) => {
              if (e.target.value.match(regexVar) || e.target.value === '') {
                setLongitude(e.target.value);
              }
            }}
            error={errorValue}
          />
        </Grid>

        <Grid item>
          {errorValue ? (
            <Typography className={errorText}>
              *location not found. Please try another
            </Typography>
          ) : null}
        </Grid>
      </Grid>

      <Grid className={formButtonContainer} container justify="flex-end">
        <Grid item>
          <Button
            className={formButton}
            variant="contained"
            disabled={disable}
            size="large"
            onClick={() => {
              console.log('longitude ' + longitude + ' latitude ' + latitude);
              var position = [longitude, latitude];
              onClick(position);
            }}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

LocationForm.propTypes = {
  onClick: PropTypes.func.isRequired,
  scatMan: PropTypes.func.isRequired,
  inputPosition: PropTypes.any,
};

export default LocationForm;
