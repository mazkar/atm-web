/* eslint-disable no-unused-expressions */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-restricted-properties */
/* eslint-disable prefer-spread */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/require-default-props */
import React, { useState, useEffect } from 'react';
import { Chart, Tooltip, LineAdvance, Legend, Axis } from 'bizcharts';
import PropTypes from 'prop-types';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';

import MenuItem from '@material-ui/core/MenuItem';
import { Grid, IconButton, Paper, Typography } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/styles';
import moment from 'moment';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import {
  GrayMedium,
  Dark,
} from '../../../assets/theme/colors';
import constants from '../../../helpers/constants';
import { ReactComponent as ChartIcon } from '../../../assets/icons/general/chart_line_red.svg';
import { ReactComponent as DropDownIcon } from '../../../assets/icons/general/dropdown_red.svg';

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
  cardContainer: {
    borderRadius: 10,
    padding: 20,
    boxShadow: '0px 6px 6px rgba(232, 238, 255, 0.3)',
    width: '100%'
  },
  chartContainer: {
    height: 280,
  },
  select: {
    // padding: 10,
    left: '15%',
    '& .MuiSelect-icon':{
      top: 'unset',
      right: 5,
    }
  },
  yearControllerContainer: {
    border: '1px solid #BCC8E7',
    fontSize: 13,
    borderRadius: 8,
    padding: 3,
  },
  yearControllerButton: {
    padding:0,
    color: constants.color.primaryHard,
  },
  filter: {
    '& .MuiGrid-container': {
      // display: "flex" ,
      justifyContent: "space-around"
    },
  },
});
const colorsDummy = ['#DC241F', '#749BFF', '#E6EAF3'];

const colorsAvg = ['#DC241F', '#749BFF'];
const colorsForecast = ['#749BFF', '#DC241F'];
// props nya bisa kedefine ta mas klo disitu? nggak hehe....
// ini udah aku sesuain warna chartnya sama UI nya mas kalo forecast biru karo transaction merah
// variable colors aku masukin kedalam const CHKYtrend gk masalah? nggapapa mas harusnya

const ChkyTrendChart = (props) => {
  const classes = useStyles();
  const { data, title, onFilterChange, isRupiah, legendName, colors, value} = props;

  const [filterByValue, setFilterByValue] = useState("yearly");
  // const handleFilterByChange = (event) => {
  //   setFilterByValue(event.target.value);
  // };
  
  const [chartWidth, setChartWidth] = useState(window.innerWidth - 300);

  useEffect(() => {
    
    const listener = () => {
      setChartWidth(window.innerWidth - 300);
    };
    window.addEventListener("resize", listener);
    return () => {
      window.removeEventListener("resize", listener);
    };
  }, [chartWidth]);

  // if(data[0]){
  //   console.log(data[0]["type"], 'chkytrend');
  //   console.log(data[0].type, 'chkytrend2');
  // }

  // function changeValue(value) {
  //   console.log(value);
  //   setFilterByValue(value);
  // }
  const numberWithCommas = (x) => {
    if (x === null){return 0;}
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
  function getMaxVal(){
    try{
      const maxFromArray =  Math.max(...data.map(o => o.transaction), 0);
      const lenght = maxFromArray.toString().length;
      const squared = Math.pow(10, (lenght-1));
      const pembulatan = Math.ceil(maxFromArray/squared);
      const maxVal = pembulatan*squared;
      return maxVal;
    }catch(err){
      console.log(err);
    }
    return 0;
  }
  
  // console.log(">>> maxVal",maxVal);
  const scale = {
    transaction: {
      min:0,
      max: getMaxVal(),
      formatter(val) {
        if(isRupiah) {return `Rp. ${numberWithCommas(val)}`;}
        return numberWithCommas(val);
      }
    },
  };

  return (
    <Paper className={classes.cardContainer}>
      <Grid container direction="column" spacing={3}>
        <Grid item>

          <Grid container justify="space-between">
            <Grid item xs={4}>
              <Grid container spacing={1} alignItems="center">
                <Grid item style={{display: 'flex'}}><ChartIcon /></Grid>
                <Grid item><Typography style={{fontSize: 15, fontWeight: 500}}>{title}</Typography></Grid>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              {/* ===> Start Select FilterBy */}
              <FormControl className={classes.select}>
                <Select
                  id="filterBy"
                  //value={filterByValue}
                  value={value}
                  onChange={e => {
                    onFilterChange(e);
                    setFilterByValue(e.target.value);
                  }}
                  input={<BootstrapInput />}
                  IconComponent={DropDownIcon}
                >
                  <MenuItem value="yearly">Yearly</MenuItem>
                  <MenuItem value="monthly">Monthly</MenuItem>
                </Select>
              </FormControl>
              {/* ===< End Select FilterBy */}
            </Grid>
            <Grid item xs={4}>
              
              { legendName !== undefined ? 
                <Grid container spacing={1} justify="center">
                  {legendName.map((itemData, index) =>{
                    return (
                      <Grid item><Grid container spacing={1}>
                        <Grid item><div style={{height: 20, width: 20, borderRadius: 4, backgroundColor: `${colors[index]}`}} /></Grid>
                        <Grid item><Typography style={{fontSize: 13, fontWeight: 400}}>{itemData}</Typography></Grid>
                      </Grid></Grid>
                    );
                  })
                  }
                </Grid>
                : 
                <Grid container spacing={1} justify="center">
                  <Grid item><Grid container spacing={1}>
                    <Grid item><div style={{height: 20, width: 20, borderRadius: 4, backgroundColor: '#DC241F'}} /></Grid>
                    <Grid item><Typography style={{fontSize: 13, fontWeight: 400}}>Trend Transaction</Typography></Grid>
                  </Grid></Grid>
                  <Grid item><Grid container spacing={1}>
                    <Grid item><div style={{height: 20, width: 20, borderRadius: 4, backgroundColor: '#749BFF'}} /></Grid>
                    <Grid item><Typography style={{fontSize: 13, fontWeight: 400}}>Forecast</Typography></Grid>
                  </Grid></Grid>
                </Grid>
              }
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Chart
            padding={[30, 20, 60, 80]}
            height={250}
            width={chartWidth}
            data={data}
            autoFit
            scale={scale}
          >
            <Tooltip shared showCrosshairs />
            <Legend visible={false} />
            <Axis
              name="date"
              line={{
                style: {
                  lineWidth: 0,
                },
              }}
              tickLine={null}
              label={{
                style: {
                  fill: Dark,
                  fontSize: 10,
                  fontWeight: 500,
                  fontFamily: 'Barlow',
                },
              }}
            />
            <Axis
              name="transaction"
              label={{
                style: {
                  fill: GrayMedium,
                  fontSize: 10,
                  fontWeight: 500,
                  fontFamily: 'Barlow',
                },
              }}
              grid={{
                line: {
                  style: {
                    stroke: GrayMedium, 
                    lineWidth: 1, 
                    lineDash: [2, 2], 
                  },
                },
              }}
            />
            <LineAdvance
              point={{
                size: 8,
                style: {
                  lineWidth: 3,
                },
              }}
              area
              shape="smooth"
              position="date*transaction"
              size={2}
              color={data[0] ? (data[0].type === "Forecast" ? ["type", colorsForecast] : ["type", colorsAvg]) : ["type", ["#ffffff", "000000"]]}
              // color={colors}
              // label="transaction"
            />
          </Chart>    
        </Grid>
      </Grid>
    </Paper>
  );
};

ChkyTrendChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string,
  onFilterChange: PropTypes.func,
  isRupiah: PropTypes.bool,
  legendName: PropTypes.array.isRequired,
  colors: PropTypes.array,
};

ChkyTrendChart.defaultProps  = {
  title: 'Title',
  isRupiah: false,
  colors: colorsDummy,
};

export default ChkyTrendChart;