/* eslint-disable array-callback-return */
/* eslint-disable no-shadow */
/* eslint-disable no-restricted-properties */
/* eslint-disable no-undef */
/* eslint-disable no-plusplus */
/* eslint-disable eqeqeq */

import React, {useState, useEffect} from 'react';
// import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Chart, Point, Legend, Axis, Tooltip, LineAdvance } from 'bizcharts';
import { Grid, Paper, Typography } from '@material-ui/core';
import moment, { months } from 'moment';
import axios from 'axios';
import { setDayOfYear } from 'date-fns';
import PropTypes from 'prop-types';
import ChkyTabsAsOption from '../../../../../components/chky/ChkyTabsAsOption';
import { ReactComponent as ChartIcon } from '../../../../../assets/icons/general/chart_line_red.svg';
// import  EmptyImg from '../../../assets/images/empty_data.png';
// import LoadingView from '../../Loading/LoadingView';
// import { GrayMedium, Dark } from '../../../assets/theme/colors';
import YearController from '../../../../../components/GeneralComponent/YearController';
import constansts from '../../../../../helpers/constants';
import LoadingView from '../../../../../components/Loading/LoadingView';

const useStyles = makeStyles(() => ({
  paperWrapper: {
    background: "#FFFFFF",
    boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
    borderRadius: "10px",
  },
}));

const dataDummy = [
  {
    time: "2018",
    revenueTotal: 173162630387,
    totalAmount: 157326289,
  },
  {
    time: "2019",
    revenueTotal: 190073212116,
    totalAmount: 174450923,
  },
  {
    time: "2020",
    revenueTotal: 190073210116,
    totalAmount: 174450923,
  },
  {
    time: "2021",
    revenueTotal: 16910579729,
    totalAmount: 17124634,
  },
];

const colors = ['#749BFF', '#DC241F', '#FFB443', '#780000', '#E6EAF3'];

const chartTrx = (props) =>{
  const classes = useStyles();
  const {id} = props;
  const [currentTabTrx, setCurrentTabTrx] = useState(0);
  const [isLoadData, setIsLoadData] = useState(false);
  // const [dataMonthly, setDataMonthly] = useState([]);
  // const [dataYerly, setDataYerly] = useState([]);
  // INIT DATA TO SHOW ON CHART
  const [dataChart, setDataChart] = useState([]);
  const [selectedYear, setSelectedYear] = useState(moment().year());
  const handleDecreaseYear = () => setSelectedYear((prevValue) => prevValue - 1 );
  const handleIncreaseYear = () => setSelectedYear((prevValue) => prevValue + 1);

  useEffect(() => {
    setIsLoadData(true);
    const initDataMonthly = [];
    const initDataYearly = [];
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      data: {},
    };
    axios
      .get(
        `${process.env.REACT_APP_API_DOMAIN}/analysismodelingservice/v1/analyticData/detailTransactionChart?year=${selectedYear}&atmId=${id}`,
        config
      )
      .then(async (res) => {
        if(res.data.data !== null){
          // REFORMAT DATA 
          try {
            if(currentTabTrx === 0){
              // DATA YEARLY
              const resDataYearly = res.data.data.yearlyData;
              await resDataYearly.map((item) => {
                const newRowData = {
                  time: item.year,
                  totalAmount: item.totalAmount,
                  revenueTotal: item.revenueTotal
                };
                console.log("+++ newRowData: ", newRowData);
                initDataYearly.push(newRowData);
              });
              setDataChart(initDataYearly);
            }else{
              // DATA Monthly
              const resDataMonthly = res.data.data.monthlyData;
              await resDataMonthly.map((item) => {
                const newRowData = {
                  time: item.month,
                  totalAmount: item.totalAmount,
                  revenueTotal: item.revenueTotal
                };
                initDataMonthly.push(newRowData);
              });
              switch (currentTabTrx) {
              case 1:
                setDataChart(initDataMonthly.slice(-3));
                break;
              case 2:
                setDataChart(initDataMonthly.slice(-4));
                break;
              case 3:
                setDataChart(initDataMonthly.slice(-6));
                break;
              case 4:
                setDataChart(initDataMonthly.slice(-9));
                break;
              case 5:
                setDataChart(initDataMonthly);
                break;
              default:
                setDataChart(initDataMonthly.slice(-9));
                break;
              }
            }
          } catch (error) {
            alert("Error reformat data", error);
          }
          // setDataToShow(initDataYearly);
          setIsLoadData(false);
        }
        else{
          setIsLoadData(false);
          alert("Data transaction chart empty");
        }
        setIsLoadData(false);
      })
      .catch((err) => {
        setIsLoadData(false);
        alert(`Error When Fetch Data Chart ${err}`);
      });
  }, [selectedYear, currentTabTrx]);

  useEffect(() => {
    console.log("+++ dataChart: ",dataChart);
  }, [dataChart]);

  // handle Tab
  function handleChangeTabTrx(newValue) {
    console.log(`===> TabVal : ${newValue}`);
    setCurrentTabTrx(newValue);
  }

  // chart
  const numberWithCommas = (x) => {
    if (x === null){return 0;}
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
  function getMaxVal(param){
    let maxFromArray = 0;
    if (param === 'totalAmount'){
      maxFromArray = Math.max(...dataChart.map(o => o.totalAmount), 0);
    }else if(param === 'revenueTotal'){
      maxFromArray = Math.max(...dataChart.map(o => o.revenueTotal), 0);
    }
    try{
      // console.log("<< Harusnya ", maxFromArray);
      if(maxFromArray === 0){
        // console.log("<< Harusnya 10000000");
        return 10000000;
      }
      const lenght = maxFromArray.toString().length;
      const squared = Math.pow(10, (lenght-1));
      const pembulatan = Math.ceil(maxFromArray/squared);
      const maxVal = pembulatan*squared;
      return maxVal;
    }catch(err){
      console.log(err);
    }
    return 10000000;
  }
  let chartIns = null;
  const scale = {
    totalAmount: {
      alias: "Transaction",
      // tickCount: 4,
      min: 0,
      max: getMaxVal('totalAmount'),
      formatter(val) {
        return numberWithCommas(val);
      }
    },
    revenueTotal: {
      alias: "Revenue",
      // tickCount: 4,
      min: 0,
      max: getMaxVal('revenueTotal'),
      formatter(val) {
        return `Rp. ${numberWithCommas(val)}`;
      }
    },
    time: {
      alias: "Time",
    },
  };
  const title = {
    style: { 
      fill: constansts.color.grayMedium,
      fontSize: 11,
      fontWeight: 500,
      fontFamily: 'Barlow',
    },
  };
  const label = {
    style: {
      textAlign: 'end', 
      fill: constansts.color.grayMedium,
      fontSize: 11,
      fontWeight: 500, 
      textBaseline: 'middle'
    },
  };
  const labelRight = {
    style: {
      textAlign: 'start', 
      fill: constansts.color.grayMedium,
      fontSize: 11,
      fontWeight: 500, 
      textBaseline: 'middle'
    },
  };
  const labelBottom = {
    style: {
      textAlign: 'center', 
      fill: constansts.color.dark,
      fontSize: 11,
      fontWeight: 500, 
      textBaseline: 'middle'
    },
  };

  return(
    <Paper style={{ padding: 20 }} className={classes.paperWrapper}>
      <Grid container justify="space-between" style={{marginBottom: 30}}>
        <Grid item>
          <Grid container spacing={1} alignItems="center">
            <Grid item style={{ display: "flex" }}>
              <ChartIcon />
            </Grid>
            <Grid item>
              <Typography style={{ fontSize: 15, fontWeight: 500 }}>
                 Transaction
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction="row" alignItems="center" spacing={1}>
            <Grid item>
              <ChkyTabsAsOption
                currentTab={currentTabTrx}
                dataTab={["Yearly", "3 Month", "6 Month", "9 Month", "12 Month"]}
                handleChangeTab={handleChangeTabTrx}
                // resetCounter={resetTabCounter}
                minWidth={100}
              />
            </Grid>
            {currentTabTrx == 0 ? null:
              <Grid item>
                <YearController 
                  selectedYear={selectedYear}
                  handleIncreaseYear={handleIncreaseYear}
                  handleDecreaseYear={handleDecreaseYear}/>
              </Grid>
            }       
          </Grid>
        </Grid>
        {/* <Grid>
          <Grid item>
            <Grid container spacing={1}>
              <Grid item>
                <Grid container spacing={1}>
                  <Grid item><div style={{height: 20, width: 20, borderRadius: 4, backgroundColor: '#DC241F'}} /></Grid>
                  <Grid item><Typography style={{fontSize: 13, fontWeight: 400}}>Transaction</Typography></Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container spacing={1}>
                  <Grid item><div style={{height: 20, width: 20, borderRadius: 4, backgroundColor: '#749BFF'}} /></Grid>
                  <Grid item><Typography style={{fontSize: 13, fontWeight: 400}}>Revenue</Typography></Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid> */}
      </Grid>
      <Grid>
        {isLoadData? <LoadingView/>:
          <Chart
            scale={scale}
            autoFit
            height={300}
            data={dataChart}
            onGetG2Instance={(chart) => {
              chartIns = chart;
            }}
          >
            <Axis 
              name="revenueTotal" 
              title={title} 
              label={label}
              grid={{
                line: {
                  style: {
                    stroke: constansts.color.grayMedium, 
                    lineWidth: 1, 
                    lineDash: [2, 2], 
                  },
                },
              }}/>
            <Axis 
              name="totalAmount" 
              title={title} 
              label={labelRight}
              grid={{
                line: {
                  style: {
                    stroke: constansts.color.grayMedium, 
                    lineWidth: 1, 
                    lineDash: [2, 2], 
                  },
                },
              }}/>
            <Axis name="time" 
              label={labelBottom}/>
            <Legend
              custom
              allowAllCanceled
              items={[
                {
                  value: "revenueTotal",
                  name: "Revenue",
                  marker: {
                    symbol: "square",
                    style: { fill: colors[0], r: 8 },
                  },
                },
                {
                  value: "totalAmount",
                  name: "Transaction",
                  marker: {
                    symbol: "square",
                    style: { fill: colors[1], r: 8 },
                  },
                },
              ]}
              onChange={(ev) => {
                console.log("ev", ev);
                const {item} = ev;
                const {value} = item;
                const checked = !item.unchecked;
                const geoms = chartIns.geometries;

                for (let i = 0; i < geoms.length; i++) {
                  const geom = geoms[i];

                  if (geom.getYScale().field === value) {
                    if (checked) {
                      geom.show();
                    } else {
                      geom.hide();
                    }
                  }
                }
              }}
            />
            <Tooltip shared showCrosshairs />
            <LineAdvance
              area
              position="time*revenueTotal"
              color={colors[0]}
              size={3}
              shape="smooth"
              tooltip={[
                "time*revenueTotal",
                (time, revenueTotal) => {
                  const value = numberWithCommas(revenueTotal);
                  return {
                    name: "Revenue",
                    value: `Rp. ${value}`,
                  };
                },
              ]}
            />
            <Point
              position="time*revenueTotal"
              color={colors[0]}
              size={5}
              shape="circle"
              tooltip={false}
            />
            <LineAdvance
              area
              position="time*totalAmount"
              color={colors[1]}
              size={3}
              shape="smooth"
              tooltip={[
                "time*totalAmount",
                (time, totalAmount) => {
                  const value = numberWithCommas(totalAmount);
                  return {
                    name: "Transaction",
                    value: `${value}`,
                  };
                },
              ]}
            />
            <Point
              position="time*totalAmount"
              color={colors[1]}
              size={5}
              shape="circle"
              tooltip={false}
            />
          </Chart> 
        }
      </Grid>
    </Paper>
  );
};

chartTrx.propTypes = {
  id: PropTypes.number.isRequired,
  // isRupiah: PropTypes.bool,
};

chartTrx.defaultProps  = {
  // isRupiah: false,
};

export default chartTrx;