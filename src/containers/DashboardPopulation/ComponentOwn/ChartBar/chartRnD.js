import React from "react";
import {
  Legend,
  Chart,
  Tooltip,
  Interval
} from "bizcharts";

const data = [{"time":"2018","legend":"ATM","val":470,"type":"atm"},
  {"time":"2018","legend":"ATMIS","val":3438,"type":"atm"},
  {"time":"2018","legend":"CRM","val":32,"type":"cdm"},
  {"time":"2018","legend":"CRMIS","val":642,"type":"cdm"},
  {"time":"2018","legend":"CDM","val":9,"type":"crm"},
  {"time":"2018","legend":"CDMIS","val":156,"type":"crm"},
  {"time":"2019","legend":"ATM","val":327,"type":"atm"},
  {"time":"2019","legend":"ATMIS","val":3908,"type":"atm"},
  {"time":"2019","legend":"CRM","val":55,"type":"crm"},
  {"time":"2019","legend":"CRMIS","val":674,"type":"crm"},
  {"time":"2019","legend":"CDM","val":2,"type":"cdm"},
  {"time":"2019","legend":"CDMIS","val":165,"type":"cdm"},
];

const colorMap = {
  'ATM': '#749BFF',
  'ATMIS': '#d8d8d8',
  'CRM': '#DC241F',
  'CRMIS': '#8a8a8a',
  'CDM': '#FFB443',
  'CDMIS': '#6c6c6c',
};

function Grouped() {
  
  const scale = {
    val: {
      tickCount: 4,
    },
  };
  return (
    <Chart padding={[30, 20, 60, 80]} autoFit data={data} scale={scale} >
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
            dodgeBy: 'type', // 按照 type 字段进行分组
            marginRatio: 0, // 分组中各个柱子之间不留空隙
          },
          {
            type: 'stack',
          },
        ]}
      />
    </Chart>
  );
}
export default Grouped;
