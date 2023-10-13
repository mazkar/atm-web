/* eslint-disable react/require-default-props */
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
import { ReactComponent as DropDownIcon } from '../../../../assets/icons/general/dropdown_red.svg';
import { ChkyButtons } from '../../../../components/chky';
import axios from 'axios';

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
  paperWrapper: {
    '& .MuiPaper-elevation1':{
      boxShadow:'0px 6px 6px rgba(232, 238, 255, 0.3)',
    },
    marginBottom: 30,
  },
  root: {
    padding:2,
    justifyContent:'space-between',
    alignItems:'center',
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
    display:'flex',
    flexWrap:'wrap',
    alignItems: 'center',
    marginRight: 50,
  },
  caption: {fontSize: 13,},
  select: {
    padding: 10,
    '& .MuiSelect-icon':{
      top: 'unset',
      right: 7,
    }
  },
  textInput:{
    padding: 10
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

const cagrSuggestions = [
  { id: '0', name: '< 0%' },
  { id: '50', name: '> 50%' },
  { id: '75', name: '> 75%' },
];
  
const statusSuggestions = [
  { id: 1, name: 'Need Approval' },
  { id: 2, name: 'Approved' },
  { id: 3, name: 'Rejected' },
];
  

const categories = [
  { id: 0, name: 'Prominent' },
  { id: 1, name: 'Branding' },
  { id: 2, name: 'High SA' },
  { id: 3, name: 'Medium SA' },
  { id: 4, name: 'High Usage' },
  { id: 5, name: 'Medium Usage' },
  { id: 6, name: 'High Revenue' },
  { id: 7, name: 'Medium Revenue' },
  { id: 8, name: 'Low Performance' },
  { id: 9, name: 'Unrated' },
  { id: 10, name: 'Conventional' },
  { id: 11, name: 'Syariah' },
];

const OverviewFilter = (props) => {
  const classes = useStyles();
  const {onFilterSubmit, valueTab} = props;
  
  const [dataFilter, setDataFilter] = useState(null);
  const [cagrValue, setCagrValue] = useState('All');
  const [statusValue, setStatusValue] = useState(' ');
  const [categoryValue, setCategoryValue] = useState(' ');
  const [areaOptions, setAreaOptions] = useState([])
  const [areaId, setAreaId] = useState('All')
  const [cityOptions, setCityOptions] = useState([])
  const [cityId, setCityId] = useState('All')
  const [isCityDisabled, setIsCityDisabled] = useState(true)
  const [atmId, setAtmId] = useState('')

  const handleCagrChange = (event) => {
    setCagrValue(event.target.value);
  };

  const handleAreaChange = (event) => {
    setAreaId(event.target.value);
  };

  const handleCityChange = (event) => {
    setCityId(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatusValue(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategoryValue(event.target.value);
  };

  const changeDataFilter = () => {
    setDataFilter({
      // cagr: cagrValue,
      approvalStatus: statusValue  === ' ' ? 'All' : statusValue,
      modelTeam: categoryValue  === ' ' ? 'All' : categoryValue,
      areaId: areaId + '',
      cityId: cityId + '',
      ...(atmId && {atmId})
    });
  };
  const resetDataFilter = () => {
    setCagrValue('All');
    setStatusValue(' ');
    setCategoryValue(' ');
    setAreaId('All')
    setCityId('All')
    setAtmId('')
    setDataFilter(null);
  };

  useEffect(() => { 
    onFilterSubmit(dataFilter); 
    // console.log(`==> dari Filter Component ${JSON.stringify(dataFilter)}`);
  },[dataFilter]);

  useEffect(() => {
    axios({
      url: `${process.env.REACT_APP_API_DOMAIN}/masterrbbservices/v1/getAreas`,
      method: "POST",
      data: { openingType: 'All' },
    })
    .then(res=>{
      setAreaOptions(res.data.data)
    })
    .catch(e=>console.log(e))
  }, [])

  useEffect(() => {
    setIsCityDisabled(true)
    if(areaId !== 'All'){
      axios({
        url: `${process.env.REACT_APP_API_DOMAIN}/masterrbbservices/v1/citiesByPicArea?picAreaId=${areaId}`,
        method: "GET",
      })
      .then(res=>{
        setCityOptions(res.data.data)
        setIsCityDisabled(false)
        setCityId('All')
      })
      .catch(err=>console.log(err))
    } else {
      setCityOptions([])
      setIsCityDisabled(true)
    }
  }, [areaId])

  return (
    <div className={classes.paperWrapper}>
      <Paper className={classes.root}>
        <Grid container spacing={1} alignItems="center" justify="space-between">
          <Grid item >
            <Grid container alignItems="center" >
              <Grid item>
                <Typography className={classes.title}>Showing :</Typography>
              </Grid>
              {(valueTab === 1 || valueTab === 3) &&
                <Grid item>
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
                </Grid>
                }
              { 
                valueTab === 10 &&
                <Grid item>
                  <div className={classes.col}>
                    <div>
                      <Typography className={classes.caption}>Renewal CAGR : </Typography>
                    </div>
                    <div item>
                      <FormControl className={classes.select}>
                        <Select
                          id="status"
                          value={cagrValue}
                          onChange={handleCagrChange}
                          input={<BootstrapInput />}
                          IconComponent={DropDownIcon}
                        >
                          <MenuItem value='All'>All</MenuItem>
                          {cagrSuggestions.map((item)=>{
                            return (<MenuItem key = {item.id} value={item.id}>{item.name}</MenuItem>);
                          })}
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                </Grid>
              }
              <Grid item>
                <div className={classes.col}>
                  <div>
                    <Typography className={classes.caption}>Area :</Typography>
                  </div>
                  <div item>
                    <FormControl className={classes.select}>
                      <Select
                        id="status"
                        value={areaId}
                        onChange={handleAreaChange}
                        input={<BootstrapInput />}
                        IconComponent={DropDownIcon}
                      >
                        <MenuItem value='All'>All</MenuItem>
                        {areaOptions.map((item)=>{
                          return (<MenuItem key = {item.id} value={item.id}>{item.name}</MenuItem>);
                        })}
                      </Select>
                    </FormControl>
                  </div>
                </div>
              </Grid>
              <Grid item>
                <div className={classes.col}>
                  <div>
                    <Typography className={classes.caption}>City :</Typography>
                  </div>
                  <div item>
                    <FormControl className={classes.select}>
                      <Select
                        id="status"
                        value={cityId}
                        onChange={handleCityChange}
                        input={<BootstrapInput />}
                        IconComponent={DropDownIcon}
                        disabled={isCityDisabled}
                      >
                        <MenuItem value='All'>All</MenuItem>
                        {cityOptions.map((item)=>{
                          return (<MenuItem key = {item.id} value={item.id}>{item.name}</MenuItem>);
                        })}
                      </Select>
                    </FormControl>
                  </div>
                </div>
              </Grid>
              <Grid item>
                {/* ===> Start Select Status */}
                <div className={classes.col}>
                  <div>
                    <Typography className={classes.caption}>Status : </Typography>
                  </div>
                  <div item>
                    <FormControl className={classes.select}>
                      <Select
                        value={statusValue}
                        onChange={handleStatusChange}
                        input={<BootstrapInput />}
                        IconComponent={DropDownIcon}
                      >
                        <MenuItem value=' '>All</MenuItem>
                        {statusSuggestions.map((item)=>{
                          return (<MenuItem key = {item.id} value={item.id}>{item.name}</MenuItem>);
                        })}
                      </Select>
                    </FormControl>
                  </div>
                </div>
                {/* ===< End Select Status */}
              </Grid>
              <Grid item>
                {/* ===> Start Select Category */}
                <div className={classes.col}>
                  <div>
                    <Typography className={classes.caption}>Category : </Typography>
                  </div>
                  <div item>
                    <FormControl className={classes.select}>
                      <Select
                        value={categoryValue}
                        onChange={handleCategoryChange}
                        input={<BootstrapInput />}
                        IconComponent={DropDownIcon}
                      >
                        <MenuItem value=' '>All</MenuItem>
                        {categories.map((item)=>{
                          return (<MenuItem key = {item.id} value={item.name}>{item.name}</MenuItem>);
                        })}
                      </Select>
                    </FormControl>
                  </div>
                </div>
                {/* ===< End Select Category */}
              </Grid>
            </Grid>
          </Grid>
          <Grid item style={{margin:15}}>
            <Grid container justify="space-between" spacing={2}>
              <Grid item >
                {dataFilter !== null ? 
                  <ChkyButtons 
                    startIcon={<CloseIcon />}
                    buttonType="redOutlined" 
                    onClick={resetDataFilter} 
                    height={40} 
                    style={{textTransform: 'capitalize'}}>
                      Reset
                  </ChkyButtons>
                  : null }
              </Grid>
              <Grid item >
                <ChkyButtons onClick={changeDataFilter} height={40} style={{textTransform: 'capitalize'}}>Apply Filter</ChkyButtons>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

      </Paper>
    </div>
  );
};
OverviewFilter.propTypes = {
  onFilterSubmit: PropTypes.func,
};

OverviewFilter.defaultProps = {
  onFilterSubmit: ()=>console.log('====> JOM onFilterSubmit Clicked'),
};

export default OverviewFilter;
