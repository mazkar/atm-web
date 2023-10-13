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
import constants from '../../helpers/constants';
import MuiButton from '../../components/Button/MuiButton';
import { ReactComponent as DropDownIcon } from '../../assets/icons/general/dropdown_red.svg';
import Axios from 'axios';
import LoadingView from '../../components/Loading/LoadingView';
import ModalLoader from '../../components/ModalLoader';
import { getStatusLabel } from '../../helpers/siteManOver';

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
    marginLeft: 20,
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
  textInput:{
    padding: 10
  },
  btnFilter: {
    marginLeft: 300,
  },
  search: {
    fontFamily: 'Barlow',
    fontSize: 13,
    borderRadius: 8,
    border: '1px solid #BCC8E7',
    outline: 'none',
    padding: '6px 12px 6px 12px',
    width: 100,
    transition: '0.25s',
    '&:focus': {
      borderColor: '#4677ff'
    }
  }
});

const dueDateShort = [
  { id: 0, value: '0', name: 'Terdekat' },
  { id: 1, value: '1', name: 'Terjauh' },
];

const FilterRBB = (props) => {
  const classes = useStyles();
  const { onFilterSubmit, dueDate, type, withMesin, withStatus, withAtmId} = props;

  const [picAreaValue, setPicAreaValue] = useState('-');
  const [cityValue, setCityValue] = useState('-');
  const [due, setDue] = useState('-');
  const [isLoadData, setModalLoader] = useState(true);
  const [dataPicArea, setDataPicArea] = useState([]);
  const [dataCityByArea, setDataCityByArea] = useState([]);
  const [mesinValue, setMesinValue] = useState(0)
  const [statusValue, setStatusValue] = useState(0)
  const [atmId, setAtmId] = useState('')

  useEffect(() => {
    getPicArea();
    // getCityByArea();
  }, []);

  let statusOptions = [
  ];

  for (let i = 1; i <= 14; i++) {
    statusOptions.push({
      id: i,
      name: getStatusLabel(i, type),
    });
  }

  if(type==='Replace'){
    statusOptions = [9, 11].map(val=>({id:val,name:getStatusLabel(val,type)}))
  }

  function sortItem(array){
    array.sort(function(a, b) {
      var item1 = a.name.toUpperCase();
      var item2 = b.name.toUpperCase();
      return (item1 < item2) ? -1 : (item1 > item2) ? 1 : 0;
    });
  }

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
      // sortItem(constructData);
      console.log('~ constructData', constructData)
      setDataPicArea(constructData);
      setModalLoader(false);
    } catch (error) {
      setModalLoader(false);
      // console.log(`Error Fetching PIC Area List : \n ${error}`);
    }
  };

  const getCityByArea = async () => {
    const constructData = [],
    dataRequest = picAreaValue.split(',');
    try {
      setModalLoader(true);
      const data = await Axios({
        // url: `${process.env.REACT_APP_API_DOMAIN}/masterrbbservices/v1/cities`,
        url: `${process.env.REACT_APP_API_DOMAIN}/masterrbbservices/v1/citiesByPicArea?picAreaId=${dataRequest[0]}`,
        method: 'GET',
      });
      const dataPre = data.data.data;
      // console.log('CITY BY AREA LIST ====> : ', dataPre);
      const newDataCity = dataPre.map((item) => {
        const newRow = {
          id: item.id,
          value: item.id,
          name: item.name,
        };
        constructData.push(newRow);
        return newRow
      });
      // sortItem(constructData);
      setDataCityByArea(newDataCity);
      setModalLoader(false);
    } catch (error) {
      setModalLoader(false);
      // console.log(`Error Fetching Get City By Area : \n ${error}`);
    }
  };

  useEffect(() => {
    if(picAreaValue !== '-'){
      getCityByArea();
    }
  }, [picAreaValue]);

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  };
  
  const handlePicAreaChange = (event) => {
    setPicAreaValue(event.target.value);
  };
  
  const handleCityChange = (event) => {
    setCityValue(event.target.value);
  };

  function handleMesinChange(e){
    setMesinValue(e.target.value)
  }

  function handleStatusChange(e){
    setStatusValue(e.target.value)
  }

  const handleDueChange = (e) => {
    setDue(e.target.value)
  }
  const changeDataFilter = () => {
    var newPicAreaValue = [];
    if (picAreaValue) {
      newPicAreaValue = picAreaValue.split(',');
    }
    onFilterSubmit({
      // areaName: newPicAreaValue[0] === '-' ? 'All' : newPicAreaValue[0].trim(),
      areaName: newPicAreaValue[1] === '-' ? 'All' : newPicAreaValue[1]?.trim() ?? 'All',
      city: cityValue === '-' ? 'All' : cityValue,
      areaId: newPicAreaValue[0] === '-' ? 'All' : newPicAreaValue[0].trim(),
      cityId: cityValue === '-' ? 'All' : cityValue + '',
      dueDate: due === '-' ? 0 : due,
      mesin: mesinValue,
      status: statusValue,
      atmId
    });
  };

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
                {withAtmId&&<Grid item>
                  {/* ===> Start Select Mesin */}
                  <div className={classes.col}>
                    <div>
                      <Typography className={classes.caption}>ATM ID : </Typography>
                    </div>
                    <div>
                      <FormControl className={classes.textInput}>
                      <input
                        type='text'
                        placeholder='Search ID'
                        className={classes.search}
                        onChange={(e) => setAtmId(e.target.value)}
                        value={atmId}
                      />
                      </FormControl>
                    </div>
                  </div>
                  {/* ===< End Select Mesin */}
                </Grid>}
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
                          getPopupContainer={(trigger) => trigger.parentNode}
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
                                // value={item.name}
                                value={`${item.id}, ${item.name}`}
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
                          getPopupContainer={(trigger) => trigger.parentNode}
                          onChange={handleCityChange}
                          input={<BootstrapInput />}
                          IconComponent={DropDownIcon}
                          disabled={picAreaValue == '-' ? true : false}
                        >
                          <MenuItem value="-">
                            <em>Pilih Kota</em>
                          </MenuItem>
                          {/* {citySuggestions.map((item) => { */}
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
                {withMesin&&<Grid item>
                  {/* ===> Start Select Mesin */}
                  <div className={classes.col}>
                    <div>
                      <Typography className={classes.caption}>Mesin : </Typography>
                    </div>
                    <div>
                      <FormControl className={classes.select}>
                        <Select
                          value={mesinValue}
                          getPopupContainer={(trigger) => trigger.parentNode}
                          onChange={handleMesinChange}
                          input={<BootstrapInput />}
                          IconComponent={DropDownIcon}
                        >
                          <MenuItem value={0}>
                            <span>All</span>
                          </MenuItem>
                          {mesinOptions.map((item) => {
                            return (
                              <MenuItem key={item.id} value={item.name}>
                                {item.name}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                  {/* ===< End Select Mesin */}
                </Grid>}
                {withStatus&&<Grid item>
                  {/* ===> Start Select Mesin */}
                  <div className={classes.col}>
                    <div>
                      <Typography className={classes.caption}>Status : </Typography>
                    </div>
                    <div>
                      <FormControl className={classes.select}>
                        <Select
                          value={statusValue}
                          getPopupContainer={(trigger) => trigger.parentNode}
                          onChange={handleStatusChange}
                          input={<BootstrapInput />}
                          IconComponent={DropDownIcon}
                        >
                          <MenuItem value={0}>
                            <span>All</span>
                          </MenuItem>
                          {statusOptions.map((item) => {
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
                  {/* ===< End Select Mesin */}
                </Grid>}
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
                            getPopupContainer={(trigger) => trigger.parentNode}
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

export default FilterRBB;

const mesinOptions = [
  { id: 'ATM', name: 'ATM' },
  { id: 'CDM', name: 'CDM' },
  { id: 'CRM', name: 'CRM' },
  { id: 'MDM', name: 'MDM' },
];
