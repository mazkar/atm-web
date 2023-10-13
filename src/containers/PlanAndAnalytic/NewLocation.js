import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Grid, TextField } from '@material-ui/core';
import InputLatLong from './InputLatLong';
import Requester from './Requester';
import Location from './Location';
import MachineType from './MachineType';
import CategoryAtm from './CategoryAtm';
import Button from '../../components/Button/MuiButton';
import TextButton from '../../components/Button/TextButton';
import ModalLocationNotFound from './ModalLocationNotFound';
import PropTypes from 'prop-types';
import ComonSelect from '../../components/Selects/CommonSelect';
import { Radio } from 'antd';

const useStyles = makeStyles({
  label: {
    fontSize: '13px',
    fontWeight: 400
  },
  col: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: 10,
    marginLeft: 5,
  },
  col2: {
    padding: 2,
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    marginTop: 10,
    marginLeft: 10,
  },
});

const typeSugestions = [
  { id: 0, value: 'ATM', nameId: 'ATM', nameEn: 'ATM' },
  { id: 1, value: 'CRM', nameId: 'CRM', nameEn: 'CRM' },
  { id: 2, value: 'MDM', nameId: 'MDM', nameEn: 'MDM' },
  { id: 3, value: 'CDM', nameId: 'CDM', nameEn: 'CDM' },
];

const NewLocation = (props) => {
  const { label, col, col2 } = useStyles();
  const { onClick, inputPosition, onChangeReq, onChangeLocationMode, onChangeMachineType,
    onChangeModelType, onChangeConven, locationMode, modelType } = props;
  const [show, setShow] = useState(false);
  const [longitude, setLongitude] = useState(inputPosition.lng);
  const [latitude, setLatitude] = useState(inputPosition.lat);
  const [disable, setDisable] = useState(false);
  const [errorValue, setErrorValue] = useState(false);
  const regexVar = /-?\d+(\.\d+)?/;

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

    // console.log(regexVar);
    // console.log(setDisable);
    // console.log(latitude);
    // console.log(longitude);
  }, [latitude, longitude]);

  useEffect(() => {
    if (inputPosition.lng !== null || inputPosition.lat !== null) {
      // let lat = inputPosition.lat.toString;
      // let lng = inputPosition.lng.toString;
      setLongitude(inputPosition.lng);
      setLatitude(inputPosition.lat);
    }
  }, [inputPosition]);

  const handleSubmit = () => {
    // console.log('handle submit click');
    setShow(true);
  };

  const handleCloseSubmit = () => {
    setShow(false);
  };

  function handleChange(e) {
    setMachineTypeValue(e);
    onChangeMachineType(e);
    // console.log("RAW", e);
  }

  const [radioValue, setRadioValue] = useState(true);
  const [MachineTypeValue, setMachineTypeValue] = useState("ATM");
  useEffect(() => {
    var useGetDraft = localStorage.getItem("useGetDraft");
    if (useGetDraft) {
      var getItem = localStorage.getItem("dataGetDraftDetail");
      if (getItem) {
        var parseItem = JSON.parse(getItem);
        // if(parseItem.checkStatus){
        setRadioValue(parseItem.conven !== null ? parseItem.conven : true);
        setMachineTypeValue(
          parseItem.machineType !== null ? parseItem.machineType : "ATM"
        );
        // parseItem.checkStatus = false;
        localStorage.setItem("dataGetDraftDetail", JSON.stringify(parseItem));
        // };
      }
    }
  }, []);

  const onSelectType = (e) => {
    // console.log('Radio : ', e.target.value);
    setRadioValue(e.target.value);
    onChangeConven(e.target.value);
  };

  return (
    <div>
      <div>
        <Grid container xs={12} spacing={2} style={{ marginLeft: 1 }}>
          <Grid item xs={6}>
            <label className={label}>Latitude :</label>
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
              onChange={(e) => {
                if (e.target.value.match(regexVar) || e.target.value === "") {
                  setLatitude(e.target.value);
                }
              }}
              error={errorValue}
            />
          </Grid>
          <Grid item xs={6}>
            <label className={label}>Longitude :</label>
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
              onChange={(e) => {
                if (e.target.value.match(regexVar) || e.target.value === "") {
                  setLongitude(e.target.value);
                }
              }}
              error={errorValue}
            />
          </Grid>
        </Grid>
        <Requester onChangeRequester={onChangeReq} />
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Location onChangeLocationMode={onChangeLocationMode} />
          <div className={col2}>
            <label style={{ fontSize: "13px", fontWeight: 400, marginLeft: 5 }}>
              Machine Type :
            </label>
            <div className={col}>
              <ComonSelect
                suggestions={typeSugestions}
                defaultValue={MachineTypeValue}
                width="215px"
                bordered
                handleChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <CategoryAtm
            locationMode={locationMode}
            onChangeModelType={onChangeModelType}
            modelType={modelType}
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <Button
          label="Process"
          height={40}
          onClick={() => {
            // console.log('longitude ' + longitude + ' latitude ' + latitude);
            var position = [longitude, latitude];
            onClick(position);
          }}
        />
      </div>
      <ModalLocationNotFound isOpen={show} onClose={handleCloseSubmit} />
    </div>
  );
};

NewLocation.propTypes = {
  onClick: PropTypes.func.isRequired,
  inputPosition: PropTypes.any,
};

export default NewLocation;
