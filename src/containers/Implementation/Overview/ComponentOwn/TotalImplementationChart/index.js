/* eslint-disable no-restricted-properties */
/* eslint-disable no-plusplus */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Chart,
  Interval,
  Legend
} from "bizcharts";
import { FormControl, Grid, InputBase, MenuItem, Paper, Typography } from '@material-ui/core';
import Select from "@material-ui/core/Select";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { ReactComponent as TitleRateIcon } from "../../../../../assets/icons/general/transaction_rate_overview.svg";
import { ReactComponent as DropDownIcon } from "../../../../../assets/icons/general/dropdown_red.svg";
import LoadingView from '../../../../../components/Loading/LoadingView';

const useStyles = makeStyles({
  select: {
    padding: 10,
    "& .MuiSelect-icon": {
      top: "unset",
      right: 5,
    },
  },
});

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 8,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #BCC8E7",
    fontSize: 13,
    padding: "6px 12px 6px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    "&:focus": {
      borderRadius: 8,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}))(InputBase);

function generateArrayOfYears() {
  const max = new Date().getFullYear();
  const min = max - 5;
  const years = [];

  for (let i = max; i >= min; i--) {
    years.push(i);
  }
  // console.log("+++ years", years);
  return years;
}

const dataDummy = [
  {label: 'Jan', type: 'New', value: 280, target: 300},
  {label: 'Jan', type: 'Replace', value: 226, target: 400},
  {label: 'Jan', type: 'Termin', value: 280, target: 300},
  {label: 'Jan', type: 'Migrasi', value: 226, target: 400},
  {label: 'Feb', type: 'New', value: 180, target: 200},
  {label: 'Feb', type: 'Replace', value: 130, target: 300},
  {label: 'Feb', type: 'Termin', value: 180, target: 200},
  {label: 'Feb', type: 'Migrasi', value: 130, target: 300},
  {label: 'Mar', type: 'New', value: 500, target: 700},
  {label: 'Mar', type: 'Replace', value: 390, target: 400},
  {label: 'Mar', type: 'Termin', value: 500, target: 600},
  {label: 'Mar', type: 'Migrasi', value: 390, target: 400},
  {label: 'Apr', type: 'New', value: 170, target: 300},
  {label: 'Apr', type: 'Replace', value: 100, target: 200},
  {label: 'Apr', type: 'Termin', value: 170, target: 300},
  {label: 'Apr', type: 'Migrasi', value: 160, target: 200},
  {label: 'May'},
  {label: 'Jun'},
  {label: 'Jul'},
  {label: 'Agu'},
  {label: 'Sep'},
  {label: 'Okt'},
  {label: 'Nov'},
  {label: 'Des'},
];

const tplTooltip = '<div>{name}<div><li style="margin-bottom:12px !important;" data-index={index}>'
    + '<span style="background-color:{color};width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:8px;"></span>'
    + 'Aktual: {value}'
    + '</li>';
const legendColor = ['#3356A2', '#FA9B0C', '#DC241F', '#65D170'];
const legendName = ['New', 'Replace', 'Termin', 'Migrasi'];

function TotalImplementationChart(props) {
  const classes = useStyles();
  const {loading, selectedYear, onChangeYear, data = []} = props;

  const arrYears = generateArrayOfYears();

  function getMaxVal(){
    try{
      const maxTarget =  Math.max(...data.map(o => o.target), 0);
      const maxValue =  Math.max(...data.map(o => o.value), 0);

      const maxScale = Math.max(maxTarget, maxValue);
      const lenght = maxScale.toString().length;
      const squared = Math.pow(10, (lenght-1));

      const pembulatan = Math.ceil(maxScale/squared);
      const maxVal = pembulatan*squared;
      return maxVal;

    }catch(err){
      console.log(err);
    }
    return 0;
  }

  const scale = {
    target: {
      min: 0,
      max: getMaxVal(),
    },
    value: {
      min: 0,
      max: getMaxVal(),
    },
  };
  
  return (
    <div>
      {loading? 
        <LoadingView maxheight='100%' />: (
          <Paper style={{ padding: 20, boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)", borderRadius: 10 }}>
            <Grid container justify="space-between">
              <Grid item>
                <Grid container spacing={1} alignItems="center">
                  <Grid item style={{ display: "flex" }}>
                    <TitleRateIcon />
                  </Grid>
                  <Grid item>
                    <Typography
                      style={{ fontSize: 15, fontWeight: 500 }}
                    >
                Total Implementation
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item >
                <Grid container alignItems='center'>
                  <Grid item><Typography style={{fontWeight: 400, fontSize: 13}}>Tahun: </Typography></Grid>
                  <Grid item>
                    <FormControl className={classes.select}>
                      <Select
                        value={selectedYear}
                        onChange={(e)=> onChangeYear(e.target.value)}
                        input={<BootstrapInput />}
                        IconComponent={DropDownIcon}
                      >
                        {arrYears.map((item) => {
                          return (
                            <MenuItem key={item} value={item}>
                              {item}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <div style={{padding: 20}}>
              <Chart height={200} data={data} autoFit scale={scale}>
                <Interval
                  position="label*target"
                  adjust={[
                    {
                      type: "dodge",
                    }
                  ]}
                  tooltip = {['type*target', (type, target) => {
                    return {
                      name: 'Target',
                      value: target,
                      title: type,
                    };
                  }]}
        		color={['type', ['#95B6FF', '#FFCF87', '#FF928F', '#9FFFA9']]}
                />
                <Interval
                  position="label*value"
                  adjust={[
                    {
                      type: "dodge",
                    }
                  ]}
                  tooltip = {['type*value', (type, value) => {
                    return {
                      name: 'Aktual',
                      value,
                      title: type,
                    };
                  }]}
        		color={['type', legendColor]}
                />
                <Legend visible={false}/>
              </Chart>
            </div>
            <Grid container justify='center'>
              {legendColor.map((item, i)=>{
                return(
                  <Grid item>
                    <Grid container alignItems='center' spacing={2} style={{marginRight: 10}}>
                      <Grid item>
                        <div style={{backgroundColor: item, height: 16, width: 16, borderRadius: 4}}/>
                      </Grid>
                      <Grid item>
                        <Typography style={{fontWeight: 400, fontSize: 13}}>{legendName[i]}</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                );
              })}
            </Grid>
          </Paper>
        )}
    </div>
    
  );
}

TotalImplementationChart.propTypes = {

};

export default TotalImplementationChart;

