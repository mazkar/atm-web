/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Chart,
  Interval
} from "bizcharts";

const dataDummy = [{"time":"2018","legend":"ATM","val":470,"type":"atm"},
  {"time":"2018","legend":"Current ATM","val":3438,"type":"atm"},
  {"time":"2018","legend":"CRM","val":32,"type":"cdm"},
  {"time":"2018","legend":"Current CRM","val":642,"type":"cdm"},
  {"time":"2018","legend":"CDM","val":9,"type":"crm"},
  {"time":"2018","legend":"Current CDM","val":156,"type":"crm"},
  {"time":"2019","legend":"ATM","val":327,"type":"atm"},
  {"time":"2019","legend":"Current ATM","val":3908,"type":"atm"},
  {"time":"2019","legend":"CRM","val":55,"type":"crm"},
  {"time":"2019","legend":"Current CRM","val":674,"type":"crm"},
  {"time":"2019","legend":"CDM","val":2,"type":"cdm"},
  {"time":"2019","legend":"Current CDM","val":165,"type":"cdm"},
];

const colorMap = {
  'ATM': '#749BFF',
  'Current ATM': '#d8d8d8',
  'CRM': '#DC241F',
  'Current CRM': '#8a8a8a',
  'CDM': '#FFB443',
  'Current CDM': '#6c6c6c',
};

const numberWithCommas = (x) => {
  if (x === null){return 0;}
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

function ClusteredStackBar({data, heighChart}) {
  
  const scale = {
    val: {
      tickCount: 4,
      formatter(val) {
        return numberWithCommas(val);
      },
    },
  };
  console.log(">>>DATA chart:",JSON.stringify(data));
  return (
    <Chart padding={[30, 20, 60, 80]} autoFit height={heighChart} data={data} scale={scale} >
      <Interval
        position='time*val'
        color= {['legend', (legend) => {
          return colorMap[legend];
        }]}
        tooltip = {['legend*val', (legend, val) => {
          return {
            name: legend,
            value: val,
          };
        }]}
        adjust= {[
          {
            type: 'dodge',
            dodgeBy: 'type', 
            marginRatio: 0, 
          },
          {
            type: 'stack',
          },
        ]}
      />
    </Chart>
  );
}

ClusteredStackBar.propTypes = {
  data: PropTypes.array,
  heighChart: PropTypes.number,
};
ClusteredStackBar.defaultProps = {
  data: dataDummy,
  heighChart: 250,
};

export default ClusteredStackBar;

