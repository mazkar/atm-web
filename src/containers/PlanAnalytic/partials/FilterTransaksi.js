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
import MuiButton from '../../../components/Button/MuiButton';
import { ReactComponent as DropDownIcon } from '../../../assets/icons/general/dropdown_red.svg';
import LoadingView from '../../../components/Loading/LoadingView';

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    width: 100,
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
  const { setDataFilter, setCurrentPages } = props;

  const [picAreaValue, setPicAreaValue] = useState('-');
  const [cityValue, setCityValue] = useState('-');
  const [isLoadData, setModalLoader] = useState(true);
  const [dataPicArea, setDataPicArea] = useState(null);
  const [dataCityByArea, setDataCityByArea] = useState(null);
  const [search, setSearch] = useState('');

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
        data: {openingType: 'All'}
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
      atmId: search==='' ? 'All' : search,
      areaId: picAreaValue === '-' ? 'All' : picAreaValue,
      cityId: cityValue === '-' ? 'All' : cityValue
    });
    setCurrentPages(0);
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
                <Grid item>
                  <div className={classes.col} style={{height:'100%'}}>
                    <div>
                      <Typography className={classes.caption}>ATM ID : </Typography>
                    </div>
                    <div>
                      <FormControl className={classes.select}>
                        <input type='text' placeholder='Search ID' className={classes.search} onChange={(e) => setSearch(e.target.value)} value={search}/>
                      </FormControl>
                    </div>
                  </div>
                </Grid>
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
                            <em>Area</em>
                          </MenuItem>
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
                          disabled={picAreaValue==='-' ? true : false}
                          value={cityValue}
                          // getPopupContainer={(trigger) => trigger.parentNode}
                          onChange={handleCityChange}
                          input={<BootstrapInput />}
                          IconComponent={DropDownIcon}
                        >
                          <MenuItem value="-">
                            <em>City</em>
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
              </Grid>
            </Grid>
            <Grid item xs={2}>
              <Grid container justify="flex-end">
                <Grid item style={{ marginRight: 15 }}>
                  <MuiButton label="Apply" onClick={changeDataFilter} style={{boxShadow:'0px 6px 6px rgba(220, 36, 31, 0.1)'}}/>
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
  setDataFilter: PropTypes.func,
  setCurrentPages: PropTypes.func
};

FilterTransaksi.defaultProps = {

};

export default FilterTransaksi;
