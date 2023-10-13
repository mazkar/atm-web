/* eslint-disable no-restricted-properties */
/* eslint-disable react/forbid-prop-types */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Chart, LineAdvance, Point, Legend, Axis, Tooltip } from 'bizcharts';
import { Grid, Typography } from '@material-ui/core';
import  EmptyImg from '../../../assets/images/empty_data.png';
import  TrendUp from '../../../assets/images/trend-up.png';
import  TrendDown from '../../../assets/images/trend-down.png';
import  TrendSame from '../../../assets/images/trend-same.png';
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

function ChartOverviewUpDown(props) {
  const classes = useStyles(props);
  const {data, positionLine,colorField,isShowLegend,heighChart,colors, isRupiah, isLoadData, chartPadding} = props;
  const [maxVal, setMaxVal] = useState(0);
  useEffect(() => {
    // eslint-disable-next-line prefer-spread
    const maxVal = Math.max.apply(Math, data.map((o) => o.value));
    console.log('<><> data', data);
    console.log('<><> maxVal', maxVal);
    const digits = maxVal.toString().split('');
    // eslint-disable-next-line radix
    const nilaiDiatas = (parseInt(digits[0])+1)*(10**(digits.length-1));
    setMaxVal(nilaiDiatas);
  }, [data]);
  const scale = {
    value: {
      min: 0,
      max: maxVal,
      formatter(val) {
        if(isRupiah) {return `Rp. ${numberWithCommas(val)}`;}
        return numberWithCommas(val);
      }
    },
  };

  const imageMap = {
    up: TrendUp,
    down: TrendDown,
    same: TrendSame
  };
  
  return (
    <div className={classes.superRoot}>

      {isLoadData ?
        <LoadingView maxheight='100%' />
        :
        <div>
          {data.length > 0 ? 
            <Chart padding={chartPadding} autoFit height={heighChart} data={data} scale={scale} >
              <LineAdvance
                shape="smooth"
                area
                position={positionLine}
                color={[colorField, colors]}
              />
              <Legend marker= {{symbol: 'circle'}}/>
              <Legend name='month' visible={false} />
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
                size={15} 
                position={positionLine}
                color={[colorField, colors]}
                shape={[
                  "month*value*trend",
                  function(month, value, trend) {
                    return ["image", imageMap[trend]];
                  }
                ]}
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

ChartOverviewUpDown.propTypes = {
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

ChartOverviewUpDown.defaultProps  = {
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

export default ChartOverviewUpDown;

