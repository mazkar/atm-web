/* eslint-disable array-callback-return */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import {
  Paper,
  Grid,
  Typography,
  Tabs,
  Tab,
  IconButton,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import PropTypes from 'prop-types';
import moment from 'moment';
import Axios from 'axios';
import {
  Chart,
  Tooltip,
  Legend,
  Interval,
} from "bizcharts";
import {ReactComponent as IconTrx} from '../../../../assets/icons/duotone-red/chart-line.svg';

import constants from '../../../../helpers/constants';

const useStyles = makeStyles({
  cardContainer: {
    borderRadius: 10,
    padding: 20,
    boxShadow: '0px 6px 6px rgba(232, 238, 255, 0.3)',
  },
  chartContainer: {
    height: 280,
  },
  yearControllerContainer: {
    border: '1px solid #E6EAF3',
    borderRadius: 8,
  },
  yearControllerButton: {
    padding: '7px 10px',
    color: constants.color.primaryHard,
  },
});

const useTabsStyles = makeStyles({
  root: {
    minHeight: 40,
    backgroundColor: constants.color.grayUltraSoft,
    borderRadius: 10,
    color: constants.color.grayMedium,
  },
  indicator: {
    display: 'none',
  },
});

const useTabItemStyles = makeStyles({
  root: {
    minHeight: 40,
    minWidth: 72,
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

const YearController = ({onChangeYear, yearValue}) => {
  const [year, setYear] = useState(yearValue);
  const { yearControllerContainer, yearControllerButton } = useStyles();

  const handleDecreaseYear = () => setYear((prevValue) => prevValue - 1);
  const handleIncreaseYear = () => setYear((prevValue) => prevValue + 1);

  // GET YEAR VALUE TO PARENT
  useEffect(() => {
    onChangeYear(year);
  }, [year]);

  return (
    <Grid container alignItems="center" className={yearControllerContainer}>
      <Grid item>
        <IconButton
          className={yearControllerButton}
          onClick={handleDecreaseYear}
        >
          <ChevronLeft />
        </IconButton>
      </Grid>
      <Grid item>
        <Typography variant="body1" component="p">
          {year}
        </Typography>
      </Grid>
      <Grid item>
        <IconButton
          className={yearControllerButton}
          onClick={handleIncreaseYear}
        >
          <ChevronRight />
        </IconButton>
      </Grid>
    </Grid>
  );
};

const numberWithCommas = (x) => {
  if (x === null){return 0;}
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const ChartCost = ({idAtm, dataLegend}) => {
  const classes = useStyles();
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

  // INIT STATE

  const [selectedTab, setSelectedTab] = useState(0);
  const [year, setYear] = useState(moment().year());
  const [colors, setColors] = useState([]);
  const [dataChart, setDataChart] = useState([]);
  const [dataChartToShow, setDataChartToShow] = useState([]);
  const [isLoadData, setLoadData] = useState(false);
  const [maxVal, setMaxVal] = useState(0);

  const handleSelectedTab = (event, newValue) => {
    event.preventDefault();
    setSelectedTab(newValue);
  };

  useEffect(() => {
    setLoadData(true);
    Axios
      .get(
        `${process.env.REACT_APP_API_DOMAIN}/analysismodelingservice/v1/analyticData/detailCostChart?year=${year}&atmId=${idAtm}`,
      )
      .then((res) => {
        const resData = res.data.data.monthlyData;
        // console.log("+++ resData", resData);
        const newArrayCost = [];
        const newArrayRevenue = [];
        resData.map((item)=>{
          const newRowCost = {
            name: "Cost",
            month: item.month,
            value: item.costTotal,
          };
          const newRowRevenue = {
            name: "Revenue",
            month: item.month,
            value: item.revenueTotal,
          };
          newArrayCost.push(newRowCost);
          newArrayRevenue.push(newRowRevenue);
        });
        const joinArray = newArrayCost.concat(newArrayRevenue); 
        setDataChart(joinArray);
        setLoadData(false);
      })
      .catch((err) => {
        setLoadData(false);
      });
  }, [year]);

  useEffect(() => {
    const colArray = [];
    dataLegend.map((item)=>colArray.push(item.bgColor));
    setColors(colArray);
  }, []);

  function handleTabChange(tabVal,chartData){
    const dataPreCost = [];
    const threeMonth = ["January","February","March"];
    const sixMonth = ["January","February","March","April","May","June"];
    const nineMonth = ["January","February","March","April","May","June","July","August","September"];
    switch (tabVal) {
    case 0:
      return chartData;
    case 1:
      threeMonth.map((item)=>{
        chartData.map((itemChart)=>{
          if(item===itemChart.month){
            dataPreCost.push(itemChart);
          }
        });
      });
      return dataPreCost;
    case 2:
      sixMonth.map((item)=>{
        chartData.map((itemChart)=>{
          if(item===itemChart.month){
            dataPreCost.push(itemChart);
          }
        });
      });
      return dataPreCost;
    case 3:
      nineMonth.map((item)=>{
        chartData.map((itemChart)=>{
          if(item===itemChart.month){
            dataPreCost.push(itemChart);
          }
        });
      });
      return dataPreCost;
    default:
      return chartData;
    }
  }
  useEffect(() => {
    if(dataChart.length>0){
      // console.log("+++ dataChart",dataChart);
      // console.log("+++ selectedTab",selectedTab);
      // FILTER dataChart by selectedTab value

      const dataByTabs = handleTabChange(selectedTab, dataChart); 
      // console.log("+++ dataTabs",dataByTabs);
      setDataChartToShow(dataByTabs);
      // eslint-disable-next-line prefer-spread
      const maxValue = Math.max.apply(Math, dataByTabs.map((o) => o.value));
      const digits = maxValue.toString().split('');
      // eslint-disable-next-line radix
      const nilaiDiatas = (parseInt(digits[0])+1)*(10**(digits.length-1));
      // console.log("+++ nilaiDiatas",nilaiDiatas);
      setMaxVal(nilaiDiatas);
    }
  }, [dataChart, selectedTab]);
  const scale = {
    value: {
      min: 0,
      max: maxVal,
      formatter(val) {
        return `Rp. ${numberWithCommas(val)}`;
      }
    },
  };

  return (
    <Paper className={classes.cardContainer}>
      <Grid container direction="column" spacing={3}>
        <Grid item>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid item>
              <Grid container direction="row" alignItems="center" spacing={1}>
                <Grid item>
                  <IconTrx width={35} height={35} style={{padding: "7.5px 5px", borderRadius: 10, backgroundColor: "#FFF5F4"}}/>
                </Grid>

                <Grid item>
                  <Typography variant="body1" component="p" gutterBottom>
                    Transaction
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Tabs
                classes={tabsStyles}
                value={selectedTab}
                onChange={handleSelectedTab}
              >
                <Tab classes={tabItemStyles} label="Yearly" />
                <Tab classes={tabItemStyles} label="3 Month" />
                <Tab classes={tabItemStyles} label="6 Month" />
                <Tab classes={tabItemStyles} label="9 Month" />
              </Tabs>
            </Grid>
            <Grid item>
              <YearController onChangeYear={(val)=> setYear(val)} yearValue={year} />
            </Grid>
            <Grid item>
              <Grid container direction="row" alignItems="center" spacing={2}>
                {dataLegend.map((item)=>{
                  return (
                    <Grid item>
                      <Grid container direction="row" alignItems="center" spacing={1}>
                        <Grid item><div style={{height: 20, width: 20, borderRadius: 6, backgroundColor: item.bgColor}}/></Grid>
                        <Grid item style={{fontSize: 13, color: "#2B2F3C"}}>{item.label}</Grid>
                      </Grid>
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Chart height={400} padding={[20, 20, 60, 100]} data={dataChartToShow} autoFit scale={scale}>
            <Interval
              adjust={[
                {
                  type: 'dodge',
                  marginRatio: 0,
                },
              ]}
              color={["name", colors]}
              position="month*value"
            />
            <Tooltip shared />
            <Legend  visible = {false}/>
          </Chart>  
        </Grid>

      </Grid>
    </Paper>
  );
};

ChartCost.propTypes = {
  dataLegend: PropTypes.array,
};

ChartCost.defaultProps = {
  dataLegend: [{bgColor: "#FFB443", label: "Cost"}, {bgColor: "#65D170", label: "Revenue"}]
};

export default ChartCost;
