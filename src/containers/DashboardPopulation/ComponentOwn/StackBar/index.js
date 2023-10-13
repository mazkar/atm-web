/* eslint-disable no-restricted-properties */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Chart,
  Tooltip,
  Interval,
  Axis,
  Legend,
  Line,
  Point,
  Geom
} from "bizcharts";
import {
  GrayMedium,
  Dark,
} from '../../../../assets/theme/colors';

const dataDummy = [
  { atmType: 'CRM', time: 'Jan.', val: 124, total: 1000  },
  { atmType: 'CRM', time: 'Feb.', val: 232, total: 1000  },
  { atmType: 'CRM', time: 'Mar.', val: 345, total: 1000  },
  { atmType: 'CRM', time: 'Apr.', val: 997, total: 1000  },
  { atmType: 'CRM', time: 'May', val: 526, total: 1000  },
  { atmType: 'CRM', time: 'Jun.', val: 355, total: 1000  },
  { atmType: 'CRM', time: 'Jul.', val: 374, total: 1000  },
  { atmType: 'CRM', time: 'Aug.', val: 424, total: 1000  },
  { atmType: 'ATM', time: 'Jan.', val: 189, total: 1000  },
  { atmType: 'ATM', time: 'Feb.', val: 288, total: 1000  },
  { atmType: 'ATM', time: 'Mar.', val: 393, total: 1000  },
  { atmType: 'ATM', time: 'Apr.', val: 814, total: 1000  },
  { atmType: 'ATM', time: 'May', val: 470, total: 1000  },
  { atmType: 'ATM', time: 'Jun.', val: 203, total: 1000  },
  { atmType: 'ATM', time: 'Jul.', val: 240, total: 1000  },
  { atmType: 'ATM', time: 'Aug.', val: 356, total: 1000  },
  { atmType: 'CDM', time: 'Jan.', val: 124, total: 1000  },
  { atmType: 'CDM', time: 'Feb.', val: 232, total: 1000  },
  { atmType: 'CDM', time: 'Mar.', val: 345, total: 1000  },
  { atmType: 'CDM', time: 'Apr.', val: 997, total: 1000  },
  { atmType: 'CDM', time: 'May', val: 526, total: 1000  },
  { atmType: 'CDM', time: 'Jun.', val: 355, total: 1000  },
  { atmType: 'CDM', time: 'Jul.', val: 374, total: 1000  },
  { atmType: 'CDM', time: 'Aug.', val: 424, total: 1000  },
];

const numberWithCommas = (x) => {
  if (x === null){return 0;}
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const colorsDummy = [  '#749BFF', '#FFB443', '#DC241F', '#780000', '#E6EAF3'];

function StackBar({data, heighChart, colors, isMonthly}) {
  let dataToShow = data; 
  if(isMonthly === false){
    dataToShow =  data.sort(function (a, b) {
      return a.time.localeCompare(b.time) || a.val - b.val;
    });
  }
// console.log("<< DATA dataToShow:", JSON.stringify(dataToShow));

  function getMaxVal(){
    const maxFromArray = Math.max(...data.map(o => o.val), 0);
    try{
    // console.log("<< Harusnya ", maxFromArray);
      if(maxFromArray === 0){
      // console.log("<< Harusnya 10000000");
        return 1000;
      }
      const lenght = maxFromArray.toString().length;
      const squared = Math.pow(10, (lenght-1));
      const pembulatan = Math.ceil(maxFromArray/squared);
      const maxVal = (pembulatan*squared)+((pembulatan*squared)*0.5);
      return maxVal;
    }catch(err){
      console.log(err);
    }
    return 1000;
  }
  const scale = {
    val: {
      min:0,
      tickCount: 6,
      max: getMaxVal(),
      formatter(val) {
        return numberWithCommas(val);
      },
    },
    total: {
      min:0,
      tickCount: 6,
      max: getMaxVal(),
      formatter(val) {
        return numberWithCommas(val);
      },
    },
  };
  return (
    <Chart padding="auto" data={dataToShow} height={heighChart} autoFit scale={scale}>
      <Interval
        position="time*val"
        tooltip={false}
        adjust={[
          {
            type: 'stack',
          },
        ]}
        color="#00000020"
        label={[
          'total',
          (val) => {
            return {
              content: `Total: ${numberWithCommas(val)}`,
              style: {
                fill: Dark,
                fontSize: 10,
                fontWeight: 'bold',
              },
            };
          },
        ]}
      />
      <Legend visible={false}/>
      <Interval
        adjust={[
          {
            type: 'stack',
          },
        ]}
        color={["atmType", colors]}
        position="time*val"
      />
      <Axis
        name="time"
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
        name="val"
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
      {/* LINE */}
      <Line
        position="time*total"
        tooltip={false}
        color="#DC241F"
        shape="smooth"
        size={3}
      />
      <Point
        position="time*total"
        tooltip={false}
        size={5}
        style={{
    			stroke: '#FFF',
        	fill: "#DC241F",
    			lineWidth:2,
          shadowColor: "rgba(71, 71, 71, 0.24)",
          shadowBlur: 5,
        }} 
      />
      <Axis
        name="total"
        visible={false}
      />
      <Tooltip shared />
    </Chart>
  );
}

StackBar.propTypes = {
  data: PropTypes.array,
  heighChart: PropTypes.number,
  colors: PropTypes.array,
  isMonthly: PropTypes.bool,
};
StackBar.defaultProps = {
  data: dataDummy,
  heighChart: 200,
  colors: colorsDummy,
  isMonthly: false,
};

export default StackBar;

