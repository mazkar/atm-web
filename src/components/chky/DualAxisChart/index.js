/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-properties */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Chart, Line, Point, Legend, Axis, Tooltip, LineAdvance, Text } from 'bizcharts';
import { Grid, Typography } from '@material-ui/core';
import  EmptyImg from '../../../assets/images/empty_data.png';
import LoadingView from '../../Loading/LoadingView';
import { GrayMedium, Dark } from '../../../assets/theme/colors';
import  TrendUp from '../../../assets/images/trend-up.png';
import  TrendDown from '../../../assets/images/trend-down.png';
import  TrendSame from '../../../assets/images/trend-same.png';

const useStyles = makeStyles({
  superRoot: {
    '& .MuiPaper-elevation1':{
      boxShadow:'0px 6px 6px rgba(232, 238, 255, 0.3)',
    },
  },
});

const dataDummy = [
  {
    time: "2018",
    revenue: 173162630387,
    frequency: 157326289,
  },
  {
    time: "2019",
    revenue: 190073212116,
    frequency: 174450923,
  },
  {
    time: "2020",
    revenue: 190073210116,
    frequency: 174450923,
  },
  {
    time: "2021",
    revenue: 16910579729,
    frequency: 17124634,
  },
];

const numberWithCommas = (x) => {
  if (x === null){return 0;}
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const colorsDummy = ['#749BFF', '#DC241F', '#FFB443', '#780000', '#E6EAF3'];

function DualAxisChart(props) {
  const classes = useStyles(props);
  const {data, heighChart,colors, isRupiah, isLoadData, isRevenueRp, showLabelPoint, istrend} = props;
  
  function getMaxVal(param){
    let maxFromArray = 0;
    if (param === 'frequency'){
      maxFromArray = Math.max(...data.map(o => o.frequency), 0);
    }else if(param === 'revenue'){
      maxFromArray = Math.max(...data.map(o => o.revenue), 0);
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
  
  const scale = {
    frequency: {
      alias: "Frequency",
      // tickCount: 5,
      min: 0,
      max: getMaxVal('frequency'),
      formatter(val) {
        if(isRupiah) {return `Rp. ${numberWithCommas(val)}`;}
        return numberWithCommas(val);
      }
    },
    revenue: {
      alias: "Revenue",
      // tickCount: 5,
      min: 0,
      max: getMaxVal('revenue'),
      formatter(val) {
        if(isRevenueRp){
          return `Rp. ${numberWithCommas(val)}`;
        }
        if(isRupiah) {return `Rp. ${numberWithCommas(val)}`;}
        return numberWithCommas(val);
      }
    },
    time: {
      alias: "Time",
      tickCount: data.length,
    },
  };
  let chartIns = null;
  const title = {
    style: { 
      fill: GrayMedium,
      fontSize: 11,
      fontWeight: 500,
      fontFamily: 'Barlow',
    },
  };
  const label = {
    style: {
      textAlign: 'end', 
      fill: GrayMedium,
      fontSize: 11,
      fontWeight: 500, 
      textBaseline: 'middle'
    },
  };
  const labelRight = {
    style: {
      textAlign: 'start', 
      fill: GrayMedium,
      fontSize: 11,
      fontWeight: 500, 
      textBaseline: 'middle'
    },
  };
  const labelBottom = {
    style: {
      textAlign: 'center', 
      fill: Dark,
      fontSize: 11,
      fontWeight: 500, 
      textBaseline: 'middle'
    },
  };
  function showLabelRevenue(bool){
    if(bool){
      return [
        "revenue",
        (value) => {
          let val = numberWithCommas(value);
          if (isRupiah){
            val = `Rp. ${val}`;
          }if (isRevenueRp){
            val = `Rp. ${val}`;
          }
          return {
            content: val,
            style: {
              fontSize: 10,
            },
          };
        }
      ];
    }return null;
  }
  function showLabelFrequency(bool){
    if(bool){
      return [
        "frequency",
        (value) => {
          let val = numberWithCommas(value);
          if (isRupiah){
            val = `Rp. ${val}`;
          }
          return {
            content: val,
            style: {
              fontSize: 10,
            },
          };
        }
      ];
    }return null;
  }

  const imageMap = {
    up: TrendUp,
    down: TrendDown,
    same: TrendSame
  };
  console.log("+++ data",data);

  return (
    <div className={classes.superRoot}>

      {isLoadData ?
        <LoadingView maxheight='100%' />
        :
        <div>
          {data.length > 0 ? 
            <Chart
              scale={scale}
              autoFit
              height={heighChart}
              data={data}
              onGetG2Instance={(chart) => {
                chartIns = chart;
              }}
            >
              <Axis 
                name="revenue" 
                title={title} 
                label={label}
                grid={{
                  line: {
                    style: {
                      stroke: GrayMedium, 
                      lineWidth: 1, 
                      lineDash: [2, 2], 
                    },
                  },
                }}/>
              <Axis 
                name="frequency" 
                title={title} 
                label={labelRight}
                grid={{
                  line: {
                    style: {
                      stroke: GrayMedium, 
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
                    value: "revenue",
                    name: "Revenue",
                    marker: {
                      style: { fill: colors[0], r: 5 },
                    },
                  },
                  {
                    value: "frequency",
                    name: "Frequency",
                    marker: {
                      style: { fill: colors[1], r: 5},
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
                position="time*revenue"
                color={colors[0]}
                size={3}
                shape="smooth"
                tooltip={[
                  "time*revenue",
                  (time, revenue) => {
                    let value = numberWithCommas(revenue);
                    if (isRupiah){
                      value = `Rp. ${value}`;
                    }
                    if (isRevenueRp){
                      value = `Rp. ${value}`;
                    }
                    return {
                      name: "Revenue",
                      value: `${value}`,
                    };
                  },
                ]}
              />
              {istrend ? (
                <Point
                  position="time*revenue"
                  color={colors[0]}
                  size={20}
                  shape={[
                    "time*revenue*trendRevenue",
                    function(time, revenue, trendRevenue) {
                      return ["image", imageMap[trendRevenue]];
                    }
                  ]}
                  tooltip={false}
                  label={showLabelRevenue(showLabelPoint)}
                />
              ): (
                <Point
                  position="time*revenue"
                  color={colors[0]}
                  size={5}
                  shape="circle"
                  tooltip={false}
                  label={showLabelRevenue(showLabelPoint)}
                />
              )}
              <LineAdvance
                area
                position="time*frequency"
                color={colors[1]}
                size={3}
                shape="smooth"
                tooltip={[
                  "time*frequency",
                  (time, frequency) => {
                    let value = numberWithCommas(frequency);
                    if (isRupiah){
                      value = `Rp. ${value}`;
                    }
                    return {
                      name: "Frequency",
                      value: `${value}`,
                    };
                  },
                ]}
              />

              {istrend ? (
                <Point
                  position="time*frequency"
                  color={colors[1]}
                  size={20}
                  shape={[
                    "time*frequency*trendFrequency",
                    function(time, frequency, trendFrequency) {
                      return ["image", imageMap[trendFrequency]];
                    }
                  ]}
                  tooltip={false}
                  label={showLabelFrequency(showLabelPoint)}
                />

              ):(
                <Point
                  position="time*frequency"
                  color={colors[1]}
                  size={5}
                  shape="circle"
                  tooltip={false}
                  label={showLabelFrequency(showLabelPoint)}
                />
              )}
            </Chart>
            : 
            <Grid container alignContent="center" justify="center" style={{height: 175}} direction="column">
              <img src={EmptyImg} alt="Empty" style={{opacity: 0.4}}/>
              <Typography style={{opacity: 0.3, textAlign: 'center', fontSize: 11, marginTop: 10}}>Empty</Typography>
            </Grid>
          }
        </div>
      }
    </div>
  );
}

DualAxisChart.propTypes = {
  data: PropTypes.array,
  heighChart: PropTypes.number,
  colors: PropTypes.array,
  isRupiah: PropTypes.bool,
  isLoadData: PropTypes.bool,
  isRevenueRp: PropTypes.bool,
  showLabelPoint: PropTypes.bool,
  istrend: PropTypes.bool,
};

DualAxisChart.defaultProps  = {
  data: dataDummy,
  heighChart: 250,
  colors: colorsDummy,
  isRupiah: false,
  isLoadData: false,
  isRevenueRp: false,
  showLabelPoint: false,
  istrend: false
};

export default DualAxisChart;

