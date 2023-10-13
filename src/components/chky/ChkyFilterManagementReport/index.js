/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Typography } from 'antd';
import { Paper ,Grid, Tab, Tabs} from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import MuiButton from '../../Button/MuiButton';
import { ReactComponent as DropDownIcon } from '../../../assets/icons/general/dropdown_red.svg';
import constants from '../../../helpers/constants';

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

const useStyles = makeStyles ({
  paperWrapper: {},
  root: {
    padding:2,
    display:'flex',
    flexWrap:'wrap',
    justifyContent:'space-between',
    alignItems:'center'
  },
  title: {
    fontWeight: 'bold',
    marginRight: 2,
    marginLeft: 10,
  },
  col: {
    display:'flex',
    flexWrap:'wrap',
    alignItems: 'center',
  },
  row: {
    display:'flex',
    flexWrap:'wrap',
    flexDirection: 'column',
  },
  caption: {fontSize: 13,},
  select: {
    padding: 10,
    '& .MuiSelect-icon':{
      top: 'unset',
      right: 5,
    }
  },  
  captionSlider: {
    fontSize: 8,
    marginLeft: 10,
    marginRight: 10,
  },
  sliderWrapper: {
  },
  slider: {
    marginTop: 10,
    width: 200,
  },
});

const provinceSuggestions = [
  { id: 0, value: '0', name: 'DKI Jakarta' },
  { id: 1, value: '1', name: 'Sumatera Barat' },
  { id: 2, value: '2', name: 'DI Yogyakarta' },
  { id: 3, value: '3', name: 'Jawa Barat' },
  { id: 4, value: '4', name: 'Jawa Tengah' },
  { id: 5, value: '5', name: 'Sumatera Utara' },
];
  
const citySuggestions = [
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

const useTabsStyles = makeStyles({
  root: {
    minHeight: 40,
    backgroundColor: constants.color.grayUltraSoft,
    borderRadius: 10,
    color: constants.color.grayMedium,
    marginLeft: 30,
  },
  indicator: {
    display: 'none',
  },
});
const useTabItemStyles = makeStyles({
  root: {
    minHeight: 40,
    minWidth: 150,
    padding: '7px 10px',
  },
  selected: {
    backgroundColor: constants.color.primaryHard,
    color: constants.color.white,
  },
  wrapper: {
    textTransform: 'none',
  },
});

const ChkyFilterManagementReport = (props) => {
  const classes = useStyles();
  const {onFilterSubmit} = props;
  
  const [dataFilter, setDataFilter] = useState([]);
  const [provinceValue, setProvinceValue] = useState('-');
  const [cityValue, setCityValue] = useState('-');
  const [kecamatanValue, setKecamatanValue] = useState('-');
  const [selectedTab, setSelectedTab] = useState(0);
  const tabsClasses = useTabsStyles();
  const tabItemClasses = useTabItemStyles();
  const tabsStyles = {
    root: tabsClasses.root,
    indicator: tabsClasses.indicator,
  };

  const tabItemStyles = {
    root: tabItemClasses.root,
    selected: tabItemClasses.selected,
    wrapper: tabItemClasses.wrapper,
  };

  const handleSelectedTab = (event, newValue) => {
    event.preventDefault();
    setSelectedTab(newValue);
  };

  const handleProvinceChange = (event) => {
    setProvinceValue(event.target.value);
  };

  const handleCityChange = (event) => {
    setCityValue(event.target.value);
  };

  const handleKecamatanChange = (event) => {
    setKecamatanValue(event.target.value);
  };

  const changeDataFilter = () => {
    setDataFilter([{
      "province": provinceValue,
      "city": cityValue,
      "kecamatan": kecamatanValue,
    }]);
  };

  useEffect(() => { onFilterSubmit(dataFilter); } , [dataFilter]);

  return (
    <div className={classes.paperWrapper}>
      <Paper className={classes.root}>
        <div className={classes.col}>
          <Typography className={classes.title} style={{position:"relative", top:-30,}}>Filter</Typography>
          <div className={classes.row} style={{marginLeft: 25,}}>
            <div className={classes.col}>
              {/* ===> Start Select Province */}
              <div className={classes.col}>
                <div className={classes.col}>
                  <Typography className={classes.caption}>Province: </Typography>
                </div>
                <div>
                  <FormControl className={classes.select}>
                    <Select
                      id="status"
                      value={provinceValue}
                      onChange={handleProvinceChange}
                      input={<BootstrapInput />}
                      IconComponent={DropDownIcon}
                    >
                      <MenuItem value="-"><em>Select Province</em></MenuItem>
                      {provinceSuggestions.map((item)=>{
                        return (<MenuItem key = {item.id} value={item.value}>{item.name}</MenuItem>);
                      })}
                    </Select>
                  </FormControl>
                </div>
              </div>
              {/* ===< End Select Province */}

              {/* ===> Start Select City */}
              <div className={classes.col}>
                <div>
                  <Typography className={classes.caption}>City: </Typography>
                </div>
                <div item>
                  <FormControl className={classes.select}>
                    <Select
                      id="status"
                      value={cityValue}
                      onChange={handleCityChange}
                      input={<BootstrapInput />}
                      IconComponent={DropDownIcon}
                    >
                      <MenuItem value="-"><em>Select City</em></MenuItem>
                      {citySuggestions.map((item)=>{
                        return (<MenuItem key = {item.id} value={item.value}>{item.name}</MenuItem>);
                      })}
                    </Select>
                  </FormControl>
                </div>
              </div>
              {/* ===< End Select City */}

              {/* ===> Start Select Kecematan */}
              <div className={classes.col}>
                <div>
                  <Typography className={classes.caption}>Kecamatan: </Typography>
                </div>
                <div item>
                  <FormControl className={classes.select}>
                    <Select
                      id="status"
                      value={kecamatanValue}
                      onChange={handleKecamatanChange}
                      input={<BootstrapInput />}
                      IconComponent={DropDownIcon}
                    >
                      <MenuItem value="-"><em>Select Kecamatan</em></MenuItem>
                      {kecamatanSuggestions.map((item)=>{
                        return (<MenuItem key = {item.id} value={item.value}>{item.name}</MenuItem>);
                      })}
                    </Select>
                  </FormControl>
                </div>
              </div>
              {/* ===< End Select Kecamatan */}

            </div>
            <div className={classes.col}>
              <div className={classes.col}>
                <Typography className={classes.caption}>Show : </Typography>
                <Grid item>
                  <Tabs
                    classes={tabsStyles}
                    value={selectedTab}
                    onChange={handleSelectedTab}
                  >
                    <Tab classes={tabItemStyles} label="3 Months" />
                    <Tab classes={tabItemStyles} label="4 Months" />
                    <Tab classes={tabItemStyles} label="6 Months" />
                    <Tab classes={tabItemStyles} label="9 Months" />
                    <Tab classes={tabItemStyles} label="12 Months" />
                  </Tabs>
                </Grid>
              </div>
            </div>
          </div>
        </div>
        <MuiButton label="Apply" onClick={changeDataFilter} style={{position:"relative", bottom:-30,}} />
      </Paper>
    </div>
  );
};
ChkyFilterManagementReport.propTypes = {
  onFilterSubmit: PropTypes.func,
};

ChkyFilterManagementReport.defaultProps = {
  onFilterSubmit: ()=>console.log('====> JOM onFilterSubmit Clicked'),
};

export default ChkyFilterManagementReport;
