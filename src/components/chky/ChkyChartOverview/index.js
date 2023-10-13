/* eslint-disable no-restricted-properties */
/* eslint-disable react/forbid-prop-types */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Chart, LineAdvance, Point, Legend, Axis, Tooltip } from 'bizcharts';
import { Grid, Typography } from '@material-ui/core';
import  EmptyImg from '../../../assets/images/empty_data.png';
import {
  GrayMedium,
  Dark,
} from '../../../assets/theme/colors';
import LoadingView from '../../Loading/LoadingView';

const useStyles = makeStyles({
  superRoot: {
    '& .MuiPaper-elevation1':{
      boxShadow:'0px 6px 6px rgba(232, 238, 255, 0.3)',
    },
  },
});

const numberWithCommas = (x) => {
  if (x === null){return 0;}
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const dataDummy = [
  { month: "Jan", rate: "Forecast", value: 35000000 },
  { month: "Jan", rate: "Actual", value: 24000000 },
  { month: "Feb", rate: "Forecast", value: 35000000 },
  { month: "Feb", rate: "Actual", value: 22000000 },
  { month: "Mar", rate: "Forecast", value: 36500000 },
  { month: "Mar", rate: "Actual", value: 27000000 },
  { month: "Apr", rate: "Forecast", value: 35000000 },
  { month: "Apr", rate: "Actual", value: 25000000 },
  { month: "May", rate: "Forecast", value: 42000000 },
  { month: "May", rate: "Actual", value: 39000000 },
  { month: "Jun", rate: "Forecast", value: 39000000 },
  { month: "Jun", rate: "Actual", value: 25000000 },
  { month: "Jul", rate: "Forecast", value: 36000000 },
  { month: "Jul", rate: "Actual", value: 25000000 },
  { month: "Aug", rate: "Forecast", value: 35000000 },
  { month: "Aug", rate: "Actual", value: 25000000 },
  { month: "Sep", rate: "Forecast", value: 30000000 },
  { month: "Sep", rate: "Actual", value: 25000000 },
  { month: "Oct", rate: "Forecast", value: 35000000 },
  { month: "Oct", rate: "Actual", value: 23000000 },
  { month: "Nov", rate: "Forecast", value: 30000000 },
  { month: "Nov", rate: "Actual", value: 26000000 },
  { month: "Dec", rate: "Forecast", value: 29000000 },
  { month: "Dec", rate: "Actual", value: 25000000 }
];

const colorsDummy = ['#749BFF', '#DC241F', '#FFB443', '#780000', '#E6EAF3'];

function ChkyChartOverview(props) {
  const classes = useStyles(props);
  const {data, positionLine,colorField,isShowLegend,heighChart,colors, isRupiah, isLoadData, chartPadding} = props;

  const [newData, setNewData] = useState([]);

  // make forecast
  useEffect(() => {
    if(data) {
      let temp = [];
      for(let i=0; i<data.length; i++) {
        temp.push(data[i]);
        temp.push({
          month: data[i].month,
          rate: 'Forecast',
          value: Math.round(i===0 ? data[i].value : i===1 ? (data[i].value + data[i-1].value) / 2 : (data[i].value + data[i-1].value + data[i-2].value) / 3)
        });
      };
      setNewData(temp);
    }
  }, [data]);

  // function getMaxVal(){
  //   try{
  //     const maxFromArray =  Math.max(...data.map(o => o.value), 0);
  //     const lenght = maxFromArray.toString().length;
  //     const squared = Math.pow(10, (lenght-1));
  //     const pembulatan = Math.ceil(maxFromArray/squared);
  //     const maxVal = pembulatan*squared;
  //     return maxVal;
  //   }catch(err){
  //     console.log(err);
  //   }
  //   return 0;
  // }
  const scale = {
    value: {
      min: 0,
      max: 900000000,
      formatter(val) {
        if(isRupiah) {return `Rp. ${numberWithCommas(val)}`;}
        return numberWithCommas(val);
      }
    },
  };

  return (
    <div className={classes.superRoot}>

      {isLoadData ?
        <LoadingView maxheight='100%' />
        :
        <div>
          {newData.length > 0 ? 
            <Chart padding={chartPadding} autoFit height={heighChart} data={newData} scale={scale} >
              <LineAdvance
                shape="smooth"
                point
                area
                position={positionLine}
                color={[colorField, colors]}
              />
              <Legend visible={isShowLegend} marker= {{symbol: 'circle'}}/>
              <Axis
                name="month"
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
                name="value"
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
              <Point 
                size={5} 
                position={positionLine}
                style={{lineWidth:2}}
                color={[colorField, colors]}
              />
              <Tooltip shared showCrosshairs />
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

ChkyChartOverview.propTypes = {
  data: PropTypes.array,
  positionLine: PropTypes.string,
  colorField: PropTypes.string,
  isShowLegend: PropTypes.bool,
  heighChart: PropTypes.number,
  colors: PropTypes.array,
  isRupiah: PropTypes.bool,
  isLoadData: PropTypes.bool,
  chartPadding: PropTypes.array,
};

ChkyChartOverview.defaultProps  = {
  data: dataDummy,
  positionLine: 'month*value',
  colorField: 'rate',
  isShowLegend: true,
  heighChart: 250,
  colors: colorsDummy,
  isRupiah: false,
  isLoadData: false,
  chartPadding: [30, 20, 60, 80],
};

export default ChkyChartOverview;

