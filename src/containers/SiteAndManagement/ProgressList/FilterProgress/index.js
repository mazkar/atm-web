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
import MuiButton from '../../../../components/Button/MuiButton';
import { ReactComponent as DropDownIcon } from '../../../../assets/icons/general/dropdown_red.svg';
import LoadingView from '../../../../components/Loading/LoadingView';
import ChkyButtons from '../../../../components/chky/ChkyButtons';

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    width: 62,
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
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  caption: { fontSize: 13, fontWeight: 400 },
  select: {
    paddingLeft: 10,
    '& .MuiSelect-icon': {
      top: 'unset',
      right: 5,
    },
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

const FilterTransaksi = (props) => {
  const classes = useStyles();
  const { setCurrentPage, setDataFilter } = props;

  const [isLoadData, setModalLoader] = useState(true);
  const [dataPicArea, setDataPicArea] = useState(null);
  const [dataCityByArea, setDataCityByArea] = useState(null);
  const [atmId, setAtmId] = useState('');
  const [picAreaValue, setPicAreaValue] = useState('-');
  const [cityValue, setCityValue] = useState('-');
  const [typeValue, setTypeValue] = useState('-');
  const [progressValue, setProgressValue] = useState('-');
  const [isFilterActive, setIsFilterActive] = useState(false)

  useEffect(() => {
    getPicArea();
  }, []);

  useEffect(() => {
    if(picAreaValue!=='-') {
      getCityByArea();
    };
  }, [picAreaValue]);

  const getPicArea = async () => {
    const constructData = [];
    try {
      setModalLoader(true);
      const data = await Axios({
        url: `${process.env.REACT_APP_API_DOMAIN}/masterrbbservices/v1/getAreas`,
        method: 'POST',
        data: {openingType: 'New'}
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
        url: `${process.env.REACT_APP_API_DOMAIN}/masterrbbservices/v1/citiesByPicArea?picAreaId=${picAreaValue}`,
        method: 'GET'
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

  const handlePicAreaChange = (event) => {
    setPicAreaValue(event.target.value);
    setCityValue('-');
  };

  const handleCityChange = (event) => {
    setCityValue(event.target.value);
  };

  const changeDataFilter = () => {
    setDataFilter({
      area: picAreaValue === '-' ? 'All' : picAreaValue.toString(),
      city: cityValue === '-' ? 'All' : cityValue.toString(),
      atmId: atmId === '' ? 'All' : atmId,
      type: typeValue === '-' ? 'All' : typeValue,
      progress: progressValue === '-' || progressValue === 'Approved' || progressValue === 'Document & Legality' ? 'All' : progressValue,
      approval: progressValue === 'Approved' ? '2' : 'All',
      docLegal: progressValue === 'Document & Legality' ? '2' : 'All'
    });
    setCurrentPage(0);
  };

  const resetDataFilter = () => {
    setPicAreaValue('-');
    setCityValue('-');
    setAtmId('');
    setTypeValue('-');
    setProgressValue('-');
    setDataFilter({
      area: 'All',
      city: 'All',
      atmId: 'All',
      progress: 'All',
      approval: 'All',
      docLegal: 'All'
    });
    setIsFilterActive(false)
    setCurrentPage(0);
  };

  return (
    <div className={classes.paperWrapper}>
      {isLoadData ?
        <LoadingView maxheight='100%' />
        :
        <Paper className={classes.root}>
          <Grid container spacing={1} alignItems="center">
            <Grid item>
              <Typography className={classes.title}>Showing : </Typography>
            </Grid>
            <Grid item>
              <div className={classes.col} style={{height:'100%'}}>
                <div>
                  <Typography className={classes.caption}>ATM ID : </Typography>
                </div>
                <div>
                  <FormControl className={classes.select}>
                    <input type='text' placeholder='Search ID' className={classes.search} onChange={(e) => setAtmId(e.target.value)} value={atmId}/>
                  </FormControl>
                </div>
              </div>
            </Grid>
            <Grid item>
              <div className={classes.col}>
                <div>
                  <Typography className={classes.caption}>
                  Area :{' '}
                  </Typography>
                </div>
                <div>
                  <FormControl className={classes.select}>
                    <Select
                      id="area"
                      value={picAreaValue}
                      onChange={handlePicAreaChange}
                      // getPopupContainer={(trigger) => trigger.parentNode}
                      input={<BootstrapInput />}
                      IconComponent={DropDownIcon}
                    >
                      <MenuItem value="-"><em>Area</em></MenuItem>
                      {/* {picAreaSuggestions.map((item) => { */}
                      {dataPicArea &&
                      dataPicArea.map((item) => {
                        return (
                          <MenuItem
                            key={item.id}
                            value={item.value}
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
            </Grid>
            <Grid item>
              <div className={classes.col}>
                <div>
                  <Typography className={classes.caption}>City : </Typography>
                </div>
                <div>
                  <FormControl className={classes.select}>
                    <Select
                      id="city"
                      disabled={picAreaValue==='-' ? true : false}
                      value={cityValue}
                      // getPopupContainer={(trigger) => trigger.parentNode}
                      onChange={handleCityChange}
                      input={<BootstrapInput />}
                      IconComponent={DropDownIcon}
                    >
                      <MenuItem value="-"><em>City</em></MenuItem>
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
            </Grid>
            <Grid item>
              <div className={classes.col}>
                <div>
                  <Typography className={classes.caption}>Type : </Typography>
                </div>
                <div>
                  <FormControl className={classes.select}>
                    <Select
                      id="type"
                      value={typeValue}
                      // getPopupContainer={(trigger) => trigger.parentNode}
                      onChange={(e) => setTypeValue(e.target.value)}
                      input={<BootstrapInput />}
                      IconComponent={DropDownIcon}
                    >
                      <MenuItem value="-"><em>Type</em></MenuItem>
                      <MenuItem value="New ATM">New ATM</MenuItem>
                      <MenuItem value="New Location">New Location</MenuItem>
                      <MenuItem value="Renewal">Renewal</MenuItem>
                      <MenuItem value="Reopen">Reopen</MenuItem>
                      <MenuItem value="Termin">Termin</MenuItem>
                      <MenuItem value="Replace">Replace</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
            </Grid>
            <Grid item>
              <div className={classes.col}>
                <div>
                  <Typography className={classes.caption}>Progress : </Typography>
                </div>
                <div>
                  <FormControl className={classes.select}>
                    <Select
                      id="progress"
                      value={progressValue}
                      // getPopupContainer={(trigger) => trigger.parentNode}
                      onChange={(e) => setProgressValue(e.target.value)}
                      input={<BootstrapInput />}
                      IconComponent={DropDownIcon}
                    >
                      <MenuItem value="-"><em>Progress</em></MenuItem>
                      <MenuItem value="3">Negotiation</MenuItem>
                      <MenuItem value="4">Procurement</MenuItem>
                      <MenuItem value="5">Approval</MenuItem>
                      <MenuItem value="Approved">Approved</MenuItem>
                      <MenuItem value="6">Submission</MenuItem>
                      <MenuItem value="12">Implementation</MenuItem>
                      <MenuItem value="Document & Legality">Document & Legality</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
            </Grid>
            <Grid item style={{marginLeft:'auto'}}>
              <Grid container justify="flex-end">
                <Grid item style={{ marginRight: 15, paddingTop: 11, paddingBottom: 11 }}>
                  <ChkyButtons
                    onClick={resetDataFilter}
                    height={30}
                    buttonType='redOutlined'
                    style={{ textTransform: "capitalize", visibility: isFilterActive ? 'visible' : 'hidden' }}
                  >
                    Reset
                  </ChkyButtons>
                </Grid>
                <Grid item style={{ marginRight: 15 }}>
                  <MuiButton label="Apply" onClick={() => {changeDataFilter(); setIsFilterActive(true)}} style={{boxShadow:'0px 6px 6px rgba(220, 36, 31, 0.1)'}}/>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>}
      {/* <ModalLoader isOpen={isOpenModalLoader} /> */}
    </div>
  );
};

FilterTransaksi.propTypes = {
  onFilterSubmit: PropTypes.func,
  setCurrentPage: PropTypes.func,
  setDataFilter: PropTypes.func
};

FilterTransaksi.defaultProps = {
  onFilterSubmit: () => console.log('====> JOM onFilterSubmit Clicked'),
};

export default FilterTransaksi;
