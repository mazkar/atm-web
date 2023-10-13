/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Grid, Paper } from '@material-ui/core';
import { Typography } from 'antd';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import Axios from 'axios';
import constants from '../../../helpers/constants';
import MuiButton from '../../../components/Button/MuiButton';
import { ReactComponent as DropDownIcon } from '../../../assets/icons/general/dropdown_red.svg';
import LoadingView from '../../../components/Loading/LoadingView';
import ModalLoader from '../../../components/ModalLoader';

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 8,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #BCC8E7',
    fontSize: 13,
    padding: '6px 12px 6px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    '&:focus': {
      borderRadius: 8,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const useStyles = makeStyles({
  paperWrapper: {},
  root: {
    padding: 2,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0px 6px 6px rgba(232, 238, 255, 0.3)',
    zIndex: 2,
    position: 'relative',
    borderRadius: 10,
  },
  title: {
    fontSize: 13,
    fontWeight: 600,
    marginRight: 2,
    marginLeft: 10,
  },
  col: {
    marginLeft: 5,
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  caption: { fontSize: 13, fontWeight: 400 },
  select: {
    padding: 10,
    '& .MuiSelect-icon': {
      top: 'unset',
      right: 5,
    },
  },
  btnFilter: {
    marginLeft: 300,
  },
  input: {
    marginTop: '12px',
    marginLeft: '7px',
    marginRight: '7px',
    borderRadius: 8,
    border: '1px solid #BCC8E7',
    fontSize: 13,
    position: 'relative',
    padding: '2px 0px 0px 12px',
    width: '120px'
  }
});

const picAreaSuggestions = [
  { id: 0, value: '0', name: 'Dharma' },
  { id: 1, value: '1', name: 'Suwandi' },
];

const dueDateShort = [
  { id: 0, value: '0', name: 'Terdekat' },
  { id: 1, value: '1', name: 'Terjauh' },
];

const dateSubmissions = [
  { id: 0, value: '0', name: 'Ascending' },
  { id: 1, value: '1', name: 'Descending' },
];

const statusOptions = [
  { id: 1, value: '1', name: 'Profiling 1' },
  { id: 2, value: '2', name: 'Profiling 2' },
  { id: 3, value: '3', name: 'Negotiation' },
  { id: 4, value: '4', name: 'Procurement' },
  { id: 5, value: '5', name: 'Approval' },
  { id: 6, value: '6', name: 'Submission' },
  { id: 7, value: '7', name: 'Konfirmasi Perpanjangan' },
  { id: 8, value: '8', name: 'Konfirmasi Termin' },
  { id: 9, value: '9', name: 'Izin / Jadwal penarikan' },
  { id: 10, value: '10', name: 'Terminated' },
  { id: 11, value: '11', name: 'Replace' },
  { id: 12, value: '12', name: 'Implementation' },
];

const statusNewAtm = [
  { id: 6, value: '6', name: 'Submission' },
  { id: 12, value: '12', name: 'Implementation' },
  { id: 14, value: '14', name: 'Document & Legality' },
];

const statusRenewal = [
  { id: 3, value: '3', name: 'Negotiation' },
  { id: 4, value: '4', name: 'Procurement' },
  { id: 5, value: '5', name: 'Approval' },
  { id: 14, value: '14', name: 'Document & Legality' },
];

const statusReplace = [
  { id: 6, value: '6', name: 'Submission' },
  { id: 12, value: '12', name: 'Implementation' },
  { id: 14, value: '14', name: 'Document & Legality' },
];

const statusTermin = [
  { id: 5, value: '5', name: 'Approval' },
  { id: 6, value: '6', name: 'Submission' },
  { id: 12, value: '12', name: 'Implementation' },
  { id: 14, value: '14', name: 'Document & Legality' },
];

const machineList = [
  { id: 0, value: 'ATM', name: 'ATM' },
  { id: 1, value: 'CRM', name: 'CRM' },
  { id: 2, value: 'MDM', name: 'MDM' },
  { id: 3, value: 'CDM', name: 'CDM' },
];

const FilterRBB = (props) => {
  const classes = useStyles();
  const { onFilterSubmit, dueDate, type, showStatus, showDateSubmission, showATMID, showProgress, showMachine, showPicSite, showModel} = props;

  const [dataFilter, setDataFilter] = useState([]);
  const [picAreaValue, setPicAreaValue] = useState('-');
  const [cityValue, setCityValue] = useState('-');
  const [due, setDue] = useState('-');
  const [submission, setSubmission] = useState('-');
  const [status, setStatus] = useState('-');
  const [isLoadData, setModalLoader] = useState(true);
  const [dataPicArea, setDataPicArea] = useState(null);
  const [dataCityByArea, setDataCityByArea] = useState(null);
  const [atmId, setAtmId] = useState('');
  const [progress, setProgress] = useState('-');
  const [machine, setMachine] = useState('-');
  const [picSite, setPicSite] = useState(0);
  const [dataPicSite, setDataPicSite] = useState(null);
  const [model, setModel] = useState(modelSuggestions[10].id);

  const [isDisableCity, setIsDisableCity] = useState(true);

  useEffect(() => {
    getPicArea();
    getCityByArea();
  }, []);

  useEffect(() => {
    console.log(">>> type",type);
  }, [type]);

  const getPicArea = async () => {
    const constructData = [];
    try {
      setModalLoader(true);
      const data = await Axios({
        url: `${process.env.REACT_APP_API_DOMAIN}/masterrbbservices/v1/getAreas`,
        method: 'POST',
        data: {openingType: type}
      });
      const dataPre = data.data.data;
      // console.log('PIC AREA LIST ====> : ', dataPre);
      dataPre.map((item) => {
        const newRow = {
          id: item.id,
          value: item.id,
          name: item.name,
        };
        constructData.push(newRow);
      });
      setDataPicArea(constructData);
      setDataPicSite(constructData);
      setModalLoader(false);
    } catch (error) {
      setModalLoader(false);
    // console.log(`Error Fetching PIC Area List : \n ${error}`);
    }
  };

  const getCityByArea = async () => {
    const constructData = [];
    try {
      setModalLoader(true);
      const data = await Axios({
        url: `${process.env.REACT_APP_API_DOMAIN}/masterrbbservices/v1/cities`,
        method: 'POST',
        data: {openingType: type}
      });
      const dataPre = data.data.data;
      // console.log('CITY BY AREA LIST ====> : ', dataPre);
      dataPre.map((item) => {
        const newRow = {
          id: item.id,
          value: item.id,
          name: item.name,
        };
        constructData.push(newRow);
      });
      setDataCityByArea(constructData);
      setModalLoader(false);
    } catch (error) {
      setModalLoader(false);
    // console.log(`Error Fetching Get City By Area : \n ${error}`);
    }
  };

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  };

  const handlePicAreaChange = (event) => {
    setPicAreaValue(event.target.value);
  };
  const handlePicSiteChange = e => {
    setPicSite(e.target.value);
  };
  const handleCityChange = (event) => {
    setCityValue(event.target.value);
  };
  const handleDueChange = (e) => {
    setDue(e.target.value);
  };
  const handleSubmissionChange = (e) =>{
    setSubmission(e.target.value);
  };
  const handleStatusChange = (e) =>{
    setStatus(e.target.value);
  };
  const handleProgressChange = (e) =>{
    setProgress(e.target.value);
  };
  const handleAtmIdChange = (e) => {
    setAtmId(e.target.value);
  };
  const handleMachineChange = (e) => {
    setMachine(e.target.value);
  };
  const handleModelChange = (e) => {
    setModel(e.target.value);
  };
  const changeDataFilter = () => {
    let newPicAreaValue = [];
    if (picAreaValue) {
      newPicAreaValue = picAreaValue.split(/\s(\d+)/);
    }
    setDataFilter({
      areaName: newPicAreaValue[0] === '-' ? 'All' : newPicAreaValue[0].trim(),
      picSiteId: picSite ? `${picSite  }` : 'All',
      city: cityValue === '-' ? 'All' : cityValue,
      dueDate: due === '-' ? 'All' : due,
      status: status === '-' ? 'All' : status,
      submission: submission === '-' ? '' : submission,
      atmId: atmId === '' ? 'All' : atmId,
      progress: progress === '-' ? 'All' : progress,
      machine: machine === '-' ? 'All' : machine,
      model: modelSuggestions[model].nameEn
    });
  };

  const renderProgress = () => {
    if(type === "New"){
      return statusNewAtm;
    }if(type === "Renewal"){
      return statusRenewal;
    }if(type === "Replace"){
      return statusReplace;
    }
    return statusTermin;
    
  };

  useEffect(() => {
    onFilterSubmit(dataFilter);
  }, [dataFilter]);

  return (
    <div className={classes.paperWrapper}>
      {isLoadData ?
        <LoadingView maxheight='100%' />
        :
        <Paper className={classes.root}>
          <Grid container spacing={1} alignItems="center" justify="space-between">
            <Grid item xs={1}>
              <Typography className={classes.title}>Showing : </Typography>
            </Grid>
            <Grid item xs={9}>
              <Grid container>
                {showATMID ? 
                  <Grid item>
                    <div className={classes.col}>
                      <div style={{marginTop: '10px'}}>
                        <Typography className={classes.caption}>
                    ATM ID :{' '}
                        </Typography>
                      </div>
                      <div>
                        <InputBase className={classes.input} 
                          placeholder="Search ID"
                          onChange={handleAtmIdChange}
                        />
                      </div>
                    </div>
                  </Grid>
                  : null}
                <Grid item>
                  {/* ===> Start Select PIC Area */}
                  <div className={classes.col}>
                    <div>
                      <Typography className={classes.caption}>
                      Area :{' '}
                      </Typography>
                    </div>
                    <div>
                      <FormControl className={classes.select}>
                        <Select
                          id="status"
                          value={picAreaValue}
                          onChange={handlePicAreaChange}
                          // getPopupContainer={(trigger) => trigger.parentNode}
                          input={<BootstrapInput />}
                          IconComponent={DropDownIcon}
                        >
                          <MenuItem value="-">
                            <em>Pilih nama Area</em>
                          </MenuItem>
                          {/* {picAreaSuggestions.map((item) => { */}
                          {dataPicArea &&
                          dataPicArea.map((item) => {
                            return (
                              <MenuItem
                                key={item.id}
                                value={`${item.value} ${item.id}`}
                                id={item.id}
                              >
                                {item.name}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                  {/* ===< End Select PIC Area */}
                </Grid>
                {showPicSite ?
                  <Grid item>
                    <div className={classes.col}>
                      <div>
                        <Typography className={classes.caption}>PIC Site : </Typography>
                      </div>
                      <div>
                        <FormControl className={classes.select}>
                          <Select
                            value={picSite}
                            onChange={handlePicSiteChange}
                            input={<BootstrapInput />}
                            IconComponent={DropDownIcon}
                          >
                            <MenuItem value={0}>
                              All Area
                            </MenuItem>
                            {dataPicSite &&
                              dataPicSite.map((item) => {
                                return (
                                  <MenuItem key={item.id} value={item.id}>
                                    {item.name}
                                  </MenuItem>
                                );
                              })}
                          </Select>
                        </FormControl>
                      </div>
                    </div>
                  </Grid>:
                  null
                }
                <Grid item>
                  {/* ===> Start Select City */}
                  <div className={classes.col}>
                    <div>
                      <Typography className={classes.caption}>City : </Typography>
                    </div>
                    <div>
                      <FormControl className={classes.select}>
                        <Select
                          id="status"
                          value={cityValue}
                          // getPopupContainer={(trigger) => trigger.parentNode}
                          onChange={handleCityChange}
                          input={<BootstrapInput />}
                          IconComponent={DropDownIcon}
                          // disabled={isDisableCity}
                        >
                          <MenuItem value="-">
                            <em>Pilih Kota</em>
                          </MenuItem>
                          {dataCityByArea &&
                            dataCityByArea.map((item) => {
                              return (
                                <MenuItem key={item.id} value={item.id}>
                                  {item.name}
                                </MenuItem>
                              );
                            })}
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                  {/* ===< End Select City */}
                </Grid>
                {dueDate == true?
                  <Grid item>
                    {/* ===> Start Select Due */}
                    <div className={classes.col}>
                      <div>
                        <Typography className={classes.caption}>Due Date : </Typography>
                      </div>
                      <div>
                        <FormControl className={classes.select}>
                          <Select
                            id="status"
                            value={due}
                            // getPopupContainer={(trigger) => trigger.parentNode}
                            onChange={handleDueChange}
                            input={<BootstrapInput />}
                            IconComponent={DropDownIcon}
                            // disabled={isDisableCity}
                          >
                            <MenuItem value="-">
                              <em>Pilih Jatuh Tempo</em>
                            </MenuItem>
                            {/* {citySuggestions.map((item) => { */}
                            {dueDateShort &&
                              dueDateShort.map((item) => {
                                return (
                                  <MenuItem key={item.id} value={item.id}>
                                    {item.name}
                                  </MenuItem>
                                );
                              })}
                          </Select>
                        </FormControl>
                      </div>
                    </div>
                    {/* ===< End Select City */}
                  </Grid>:
                  null}
                {showStatus?
                  <Grid item>
                    {/* ===> Start Select Due */}
                    <div className={classes.col}>
                      <div>
                        <Typography className={classes.caption}>Status : </Typography>
                      </div>
                      <div>
                        <FormControl className={classes.select}>
                          <Select
                            id="status"
                            value={status}
                            // getPopupContainer={(trigger) => trigger.parentNode}
                            onChange={handleStatusChange}
                            input={<BootstrapInput />}
                            IconComponent={DropDownIcon}
                            // disabled={isDisableCity}
                          >
                            <MenuItem value="-">
                              <em>Please Select</em>
                            </MenuItem>
                            {/* {citySuggestions.map((item) => { */}
                            {type === "Replace" ? 
                              statusReplace.map((item) => {
                                return (
                                  <MenuItem key={item.id} value={item.id}>
                                    {item.name}
                                  </MenuItem>
                                );
                              }): 
                              statusOptions.map((item) => {
                                return (
                                  <MenuItem key={item.id} value={item.id}>
                                    {item.name}
                                  </MenuItem>
                                );
                              })}
                          </Select>
                        </FormControl>
                      </div>
                    </div>
                    {/* ===< End Select City */}
                  </Grid>:
                  null}
                {showProgress?
                  <Grid item>
                    {/* ===> Start Select Due */}
                    <div className={classes.col}>
                      <div>
                        <Typography className={classes.caption}>{type === "New" ? "Progress : " : "Status : "}</Typography>
                      </div>
                      <div>
                        <FormControl className={classes.select}>
                          <Select
                            id="status"
                            value={progress}
                            // getPopupContainer={(trigger) => trigger.parentNode}
                            onChange={handleProgressChange}
                            input={<BootstrapInput />}
                            IconComponent={DropDownIcon}
                            // disabled={isDisableCity}
                          >
                            <MenuItem value="-">
                              <em>Please Select</em>
                            </MenuItem>
                            {renderProgress().map((item) => {
                              return (
                                <MenuItem key={item.id} value={item.id}>
                                  {item.name}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                      </div>
                    </div>
                    {/* ===< End Select City */}
                  </Grid>:
                  null}
                {showModel ?
                  <Grid item>
                    <div className={classes.col}>
                      <div>
                        <Typography className={classes.caption}>Model : </Typography>
                      </div>
                      <div>
                        <FormControl className={classes.select}>
                          <Select
                            value={model}
                            onChange={handleModelChange}
                            input={<BootstrapInput />}
                            IconComponent={DropDownIcon}
                          >
                            {modelSuggestions.map((item) => {
                              return (
                                <MenuItem key={item.id} value={item.id}>
                                  {item.nameEn}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                      </div>
                    </div>
                  </Grid>:
                  null}
                {showMachine?
                  <Grid item>
                    {/* ===> Start Select Due */}
                    <div className={classes.col}>
                      <div>
                        <Typography className={classes.caption}>Machine : </Typography>
                      </div>
                      <div>
                        <FormControl className={classes.select}>
                          <Select
                            id="status"
                            value={machine}
                            // getPopupContainer={(trigger) => trigger.parentNode}
                            onChange={handleMachineChange}
                            input={<BootstrapInput />}
                            IconComponent={DropDownIcon}
                            // disabled={isDisableCity}
                          >
                            <MenuItem value="-">
                              <em>Please Select</em>
                            </MenuItem>
                            {/* {citySuggestions.map((item) => { */}
                            {machineList &&
                              machineList.map((item) => {
                                return (
                                  <MenuItem key={item.id} value={item.value}>
                                    {item.name}
                                  </MenuItem>
                                );
                              })}
                          </Select>
                        </FormControl>
                      </div>
                    </div>
                    {/* ===< End Select City */}
                  </Grid>:
                  null}
                {showDateSubmission?
                  <Grid item>
                    {/* ===> Start Select Due */}
                    <div className={classes.col}>
                      <div>
                        <Typography className={classes.caption}>Date Submission : </Typography>
                      </div>
                      <div>
                        <FormControl className={classes.select}>
                          <Select
                            id="status"
                            value={submission}
                            // getPopupContainer={(trigger) => trigger.parentNode}
                            onChange={handleSubmissionChange}
                            input={<BootstrapInput />}
                            IconComponent={DropDownIcon}
                            // disabled={isDisableCity}
                          >
                            <MenuItem value="-">
                              <em>Please Select</em>
                            </MenuItem>
                            {/* {citySuggestions.map((item) => { */}
                            {dateSubmissions &&
                              dateSubmissions.map((item) => {
                                return (
                                  <MenuItem key={item.id} value={item.id}>
                                    {item.name}
                                  </MenuItem>
                                );
                              })}
                          </Select>
                        </FormControl>
                      </div>
                    </div>
                    {/* ===< End Select City */}
                  </Grid>:
                  null}
              </Grid>
            </Grid>
            <Grid item xs={2}>
              <Grid container justify="flex-end">
                <Grid item style={{ marginRight: 15 }}>
                  <MuiButton label="Apply Filter" onClick={changeDataFilter} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>}
      {/* <ModalLoader isOpen={isOpenModalLoader} /> */}
    </div>
  );
};

FilterRBB.propTypes = {
  onFilterSubmit: PropTypes.func,
  dueDate: PropTypes.bool,
  showStatus: PropTypes.bool,
  showDateSubmission: PropTypes.bool,
  showATMID: PropTypes.bool,
  showProgress: PropTypes.bool,
  showMachine: PropTypes.bool
};

FilterRBB.defaultProps = {
  onFilterSubmit: () => console.log('====> JOM onFilterSubmit Clicked'),
  dueDate: false,
  showStatus: false,
  showDateSubmission: false,
  showATMID: false,
  showProgress: false,
  showMachine: false
};

export default FilterRBB;

const modelSuggestions = [
  { id: 0, value: 0, nameEn: "High SA", nameId: "High SA" },
  { id: 1, value: 1, nameEn: "Medium SA", nameId: "Medium SA" },
  { id: 2, value: 2, nameEn: "High Usage", nameId: "High Usage" },
  { id: 3, value: 3, nameEn: "Medium Usage", nameId: "Medium Usage" },
  { id: 4, value: 4, nameEn: "High Revenue", nameId: "High Revenue" },
  { id: 5, value: 5, nameEn: "Medium Revenue", nameId: "Medium Revenue" },
  { id: 6, value: 6, nameEn: "Low Performance", nameId: "Low Performance" },
  { id: 7, value: 7, nameEn: "Branding", nameId: "Branding" },
  { id: 8, value: 8, nameEn: "Prominent", nameId: "Prominent" },
  { id: 9, value: 9, nameEn: "Unrated", nameId: "Unrated" },
  { id: 10, value: 10, nameEn: "All", nameId: "All" },
];