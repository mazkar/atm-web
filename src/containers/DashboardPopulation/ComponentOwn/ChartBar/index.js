/* eslint-disable no-restricted-properties */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Legend,
  Chart,
  Tooltip,
  Interval,
  Axis
} from "bizcharts";
import { Grid, Typography } from '@material-ui/core';
import  EmptyImg from '../../../../assets/images/empty_data.png';
import {
  GrayMedium,
  Dark,
} from '../../../../assets/theme/colors';
import LoadingView from '../../../../components/Loading/LoadingView';

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
const colors2nd = ['#d8d8d8', '#8a8a8a', '#6c6c6c', '#595959', '#454545'];

function ChartBar(props) {
  const classes = useStyles(props);
  const {data, positionLine,colorField,isShowLegend,heighChart,colors, isRupiah, isLoadData, positionLineIs} = props;
  console.log("<<< data: ",JSON.stringify(data));
  function getMaxVal(){
    const maxFromArray = Math.max(...data.map(o => o.asIs), 0);
    try{
      // console.log("<< Harusnya ", maxFromArray);
      if(maxFromArray === 0){
        // console.log("<< Harusnya 10000000");
        return 1000;
      }
      const lenght = maxFromArray.toString().length;
      const squared = Math.pow(10, (lenght-1));
      const pembulatan = Math.ceil(maxFromArray/squared);
      const maxVal = pembulatan*squared;
      return maxVal;
    }catch(err){
      console.log(err);
    }
    return 1000;
  }
  
  const scale = {
    asIs: {
      type: "log",
      min:0,
      max: getMaxVal(),
      // tickCount: 4,
      formatter(val) {
        if(isRupiah) {return `Rp. ${numberWithCommas(val)}`;}
        return numberWithCommas(val);
      },
      sync: 'asIs',
    },
    value:{
      sync: 'asIs',
    }
  };

  return (
    <div className={classes.superRoot}>

      {isLoadData ?
        <LoadingView maxheight='100%' />
        :
        <div>
          {data.length > 0 ? 
            <Chart padding={[30, 20, 60, 80]} autoFit height={heighChart} data={data} scale={scale} >
              <Interval
                color={[colorField, colors2nd]}
                // colors={colors}
                position={positionLineIs}
                shape="border-radius"
                adjust={[
                  {
                    type: 'dodge',
                    marginRatio: 0,
                  },
                ]}
              />
              <Interval
                adjust={[
                  {
                    type: 'dodge',
                    marginRatio: 0,
                  },
                ]}
                color={[colorField, colors]}
                // colors={colors}
                position={positionLine}
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
                    fontSize: 12,
                    fontWeight: 500,
                    fontFamily: 'Barlow',
                  },
                }}
              />
              <Axis
                name="asIs"
                label={{
                  style: {
                    fill: GrayMedium,
                    fontSize: 12,
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
              <Axis name="value" visible={false} />

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

ChartBar.propTypes = {
  data: PropTypes.array,
  positionLine: PropTypes.string,
  colorField: PropTypes.string,
  isShowLegend: PropTypes.bool,
  heighChart: PropTypes.number,
  colors: PropTypes.array,
  isRupiah: PropTypes.bool,
  isLoadData: PropTypes.bool,
  positionLineIs: PropTypes.string,
};

ChartBar.defaultProps  = {
  data: dataDummy,
  positionLine: 'month*value',
  colorField: 'rate',
  isShowLegend: true,
  heighChart: 250,
  colors: colorsDummy,
  isRupiah: false,
  isLoadData: false,
  positionLineIs: "month*asIs",
};

export default ChartBar;

