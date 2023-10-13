/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Typography } from 'antd';
import { Grid, Paper } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import CloseIcon from '@material-ui/icons/Close';
import { ReactComponent as DropDownIcon } from '../../../assets/icons/general/dropdown_red.svg';
import { ChkyButtons } from '../../../components/chky';
import Axios from 'axios';
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
  paperWrapper: {
    '& .MuiPaper-elevation1': {
      boxShadow: '0px 6px 6px rgba(232, 238, 255, 0.3)',
    },
  },
  root: {
    padding: 2,
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 2,
    position: 'relative',
    borderRadius: 10,
  },
  title: {
    fontWeight: 600,
    marginRight: 10,
    marginLeft: 10,
    fontSize: 13,
  },
  col: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  caption: { fontSize: 13 },
  select: {
    padding: 10,
    '& .MuiSelect-icon': {
      top: 'unset',
      right: 5,
    },
  },
});

const provinciesSuggestions = [
  { id: 0, value: '0', name: 'DKI Jakarta' },
  { id: 1, value: '1', name: 'Sumatera Barat' },
  { id: 2, value: '2', name: 'DI Yogyakarta' },
  { id: 3, value: '3', name: 'Jawa Barat' },
  { id: 4, value: '4', name: 'Jawa Tengah' },
  { id: 5, value: '5', name: 'Sumatera Utara' },
];

const kabupatenSuggestions = [
  { id: 0, id_prov: '0', value: '0', name: 'Jakarta Pusat' },
  { id: 1, id_prov: '0', value: '1', name: 'Jakarta Selatan' },
  { id: 2, id_prov: '0', value: '2', name: 'Jakarta Utara' },
  { id: 3, id_prov: '0', value: '3', name: 'Jakarta Barat' },
  { id: 4, id_prov: '0', value: '4', name: 'Jakarta Timur' },
];

const kecamatanSuggestions = [
  { id: 0, id_city: '0', value: '0', name: 'Cempaka Putih' },
  { id: 1, id_city: '0', value: '1', name: 'Gambir' },
  { id: 2, id_city: '0', value: '2', name: 'Johar Baru' },
  { id: 3, id_city: '0', value: '3', name: 'Kemayoran' },
  { id: 4, id_city: '0', value: '4', name: 'Menteng' },
  { id: 5, id_city: '0', value: '5', name: 'Sawah Besar' },
];

const PopulationFilter = (props) => {
  const classes = useStyles();
  const { onFilterSubmit } = props;

  const [dataFilter, setDataFilter] = useState(null);
  const [provinceValue, setProvinceValue] = useState(' ');
  const [kabupatenValue, setKabupatenValue] = useState(' ');
  const [kecamatanValue, setKecamatanValue] = useState(' ');

  const [provinceResponse, setProvinceResponse] = useState(null);
  const [citiesResponse, setCitiesResponse] = useState(null);
  const [districtResponse, setDistrictResponse] = useState(null);

  const [isOpenModalLoader, setModalLoader] = useState(false);

  const [isDisableKabupaten, setIsDisableKabupaten] = useState(true);
  const [isDisableKecamatan, setIsDisableKecamatan] = useState(true);

  const handleProvinceChange = (event) => {
    setProvinceValue(event.target.value);
    setKabupatenValue(' ');
    setKecamatanValue(' ');
    getCity(event.target.value);
    if (event.target.value !== ' ') {
      setIsDisableKabupaten(false);
    } else {
      setIsDisableKabupaten(true);
      setIsDisableKecamatan(true);
    }
  };

  const handlePremisesChange = (event) => {
    setKabupatenValue(event.target.value);
    setKecamatanValue(' ');
    if (event.target.value !== ' ') {
      setIsDisableKecamatan(false);
    } else {
      setIsDisableKecamatan(true);
    }
    getDistrict(event.target.value);
  };

  const handleBrandChange = (event) => {
    setKecamatanValue(event.target.value);
  };

  const changeDataFilter = () => {
    setDataFilter({
      provinceId: provinceValue === ' ' ? '' : provinceValue,
      cityId: kabupatenValue === ' ' ? '' : kabupatenValue,
      districtId: kecamatanValue === ' ' ? '' : kecamatanValue,
    });
  };

  const resetDataFilter = () => {
    setProvinceValue(' ');
    setKabupatenValue(' ');
    setKecamatanValue(' ');
    setIsDisableKabupaten(true);
    setIsDisableKecamatan(true);
    setDataFilter(null);
  };

  useEffect(() => {
    onFilterSubmit(dataFilter);
    console.log('INI DATA FILTER', JSON.stringify(dataFilter));
  }, [dataFilter]);

  useEffect(() => {
    getProvince();
  }, []);

  const getProvince = async () => {
    const constructData = [];
    try {
      setModalLoader(true);
      const data = await Axios({
        url: `${process.env.REACT_APP_API_DOMAIN}/masterrbbservices/v1/getProvince`,
        method: 'GET',
      });
      const dataPre = data.data.data;
    // console.log('PROVINCE LIST ====> : ', dataPre);
      dataPre.map((item) => {
        const newRow = {
          id: item.id,
          value: item.id,
          name: item.name,
        };
        constructData.push(newRow);
      });
      setProvinceResponse(constructData);
      setModalLoader(false);
    } catch (error) {
      setModalLoader(false);
      console.log(`Error Fetching Get Province List : \n ${error}`);
    }
  };

  const getCity = async (value) => {
    const constructData = [];
    try {
      setModalLoader(true);
      const data = await Axios({
        url: `${process.env.REACT_APP_API_DOMAIN}/masterrbbservices/v1/citiesByProvince?provinceId=${value}`,
        method: 'GET',
      });
      const dataPre = data.data.data;
    // console.log('PROVINCE LIST ====> : ', dataPre);
      dataPre.map((item) => {
        const newRow = {
          id: item.id,
          value: item.id,
          name: item.name,
        };
        constructData.push(newRow);
      });
      setCitiesResponse(constructData);
      setModalLoader(false);
    } catch (error) {
      setModalLoader(false);
      console.log(`Error Fetching Get Province List : \n ${error}`);
    }
  };

  const getDistrict = async (value) => {
    const constructData = [];
    try {
      setModalLoader(true);
      const data = await Axios({
        url: `${process.env.REACT_APP_API_DOMAIN}/masterrbbservices/v1/districtByCity?cityId=${value}`,
        method: 'GET',
      });
      const dataPre = data.data.data;
    // console.log('PROVINCE LIST ====> : ', dataPre);
      dataPre.map((item) => {
        const newRow = {
          id: item.id,
          value: item.id,
          name: item.name,
        };
        constructData.push(newRow);
      });
      setDistrictResponse(constructData);
      setModalLoader(false);
    } catch (error) {
      setModalLoader(false);
      console.log(`Error Fetching Get Province List : \n ${error}`);
    }
  };

  return (
    <div className={classes.paperWrapper}>
      <Paper className={classes.root}>
        <Grid container spacing={1} alignItems="center" justify="space-between">
          <Grid item>
            <Grid container alignItems="center">
              <Grid item>
                <Typography className={classes.title}>Showing : </Typography>
              </Grid>
              <Grid item>
                {/* ===> Start Select Population */}
                <div className={classes.col}>
                  <div>
                    <Typography className={classes.caption}>
                      Provinsi :{' '}
                    </Typography>
                  </div>
                  <div item>
                    <FormControl className={classes.select}>
                      <Select
                        id="status"
                        value={provinceValue}
                        onChange={handleProvinceChange}
                        getPopupContainer={(trigger) => trigger.parentNode}
                        input={<BootstrapInput />}
                        IconComponent={DropDownIcon}
                      >
                        <MenuItem value=" ">Semua Provinsi</MenuItem>
                        {provinceResponse &&
                          provinceResponse.map((item) => {
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
                {/* ===< End Select Population */}
              </Grid>
              <Grid item>
                {/* ===> Start Select Premises */}
                <div className={classes.col}>
                  <div>
                    <Typography className={classes.caption}>
                      Kabupaten :{' '}
                    </Typography>
                  </div>
                  <div item>
                    <FormControl className={classes.select}>
                      <Select
                        value={kabupatenValue}
                        onChange={handlePremisesChange}
                        getPopupContainer={(trigger) => trigger.parentNode}
                        input={<BootstrapInput />}
                        IconComponent={DropDownIcon}
                        disabled={isDisableKabupaten}
                      >
                        <MenuItem value=" ">Semua Kabupaten</MenuItem>
                        {citiesResponse &&
                          citiesResponse.map((item) => {
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
                {/* ===< End Select Premises */}
              </Grid>
              <Grid item>
                {/* ===> Start Select Brand */}
                <div className={classes.col}>
                  <div>
                    <Typography className={classes.caption}>
                      Kecamatan :{' '}
                    </Typography>
                  </div>
                  <div item>
                    <FormControl className={classes.select}>
                      <Select
                        value={kecamatanValue}
                        onChange={handleBrandChange}
                        getPopupContainer={(trigger) => trigger.parentNode}
                        input={<BootstrapInput />}
                        IconComponent={DropDownIcon}
                        disabled={isDisableKecamatan}
                      >
                        <MenuItem value=" ">Semua Kecamatan</MenuItem>
                        {districtResponse &&
                          districtResponse.map((item) => {
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
                {/* ===< End Select Brand */}
              </Grid>
            </Grid>
          </Grid>
          <Grid item style={{ margin: 15 }}>
            <Grid container spacing={2}>
              <Grid item>
                {dataFilter !== null && provinceValue !== ' ' ? (
                  <ChkyButtons
                    startIcon={<CloseIcon />}
                    buttonType="redOutlined"
                    onClick={resetDataFilter}
                    height={40}
                    style={{ textTransform: 'capitalize' }}
                  >
                    Reset
                  </ChkyButtons>
                ) : null}
              </Grid>
              <Grid item>
                <ChkyButtons
                  onClick={changeDataFilter}
                  height={40}
                  style={{ textTransform: 'capitalize' }}
                >
                  Apply Filter
                </ChkyButtons>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      {/* <ModalLoader isOpen={isOpenModalLoader} /> */}
    </div>
  );
};
PopulationFilter.propTypes = {
  onFilterSubmit: PropTypes.func,
};

PopulationFilter.defaultProps = {
  onFilterSubmit: () => console.log('====> JOM onFilterSubmit Clicked'),
};

export default PopulationFilter;
