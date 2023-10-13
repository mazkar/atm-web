import React from 'react';
import PropTypes from 'prop-types';
import { 
  Chart,
  Interval,
  Axis,
  Tooltip,
  Coordinate,
  Legend, } from 'bizcharts';
import DataSet from "@antv/data-set";
import ChartCard from '../../ChartCard';

const MoneyIcon = () => (
  <svg width="30" height="30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="30" height="30" rx="10" fill="#FFE9E9" />
    <path
      opacity=".4"
      d="M8.163 11A3.516 3.516 0 016.5 12.663v5.674A3.516 3.516 0 018.163 20h13.674a3.516 3.516 0 011.663-1.663v-5.674A3.516 3.516 0 0121.837 11H8.163zM15 19c-1.656 0-3-1.567-3-3.5 0-1.932 1.344-3.5 3-3.5s3 1.567 3 3.5-1.344 3.5-3 3.5z"
      fill="#DC241F"
    />
    <path
      d="M24.25 9.5H5.75a.75.75 0 00-.75.75v10.5a.75.75 0 00.75.75h18.5a.75.75 0 00.75-.75v-10.5a.75.75 0 00-.75-.75zm-.75 8.837A3.515 3.515 0 0021.837 20H8.163A3.516 3.516 0 006.5 18.337v-5.674A3.516 3.516 0 008.163 11h13.674a3.515 3.515 0 001.663 1.663v5.674zM16 16.5h-.5v-2.75a.25.25 0 00-.25-.25h-.424a.75.75 0 00-.416.125l-.48.32a.25.25 0 00-.069.346l.278.416a.25.25 0 00.346.069l.015-.01V16.5H14a.25.25 0 00-.25.25v.5a.25.25 0 00.25.25h2a.25.25 0 00.25-.25v-.5a.25.25 0 00-.25-.25z"
      fill="#DC241F"
    />
  </svg>
);

const PopulationMachineBarChart = ({ data }) => {
  const ds = new DataSet();
  const dv = ds.createView().source(data);
  dv.transform({
    type: "fold",
    fields: ["offline", "online"],
    // 展开字段集
    key: "type",
    // key字段
    value: "value" // value字段
  });
  return (
    <ChartCard title="Machine Population" icon={<MoneyIcon />} withControl>
      <Chart
        height={800}
        data={dv}
        autoFit
        position="right"
        scale={{
          value: {
            min: 10,
            max: 1000,
          },
        }}
      >
        <Legend />
        <Coordinate transpose scale={[1, -1]} />
        <Axis
          name="provinsi"
          label={{
            offset: 12
          }}
        />
        <Axis name="value" position="right" />
        <Tooltip />
        <Interval
          position="provinsi*value"
          color={['type', ['#DC241F','#65D170']]}
          adjust={[
            {
              type: "dodge",
              marginRatio: 1 / 32
            }
          ]}
        />
      </Chart>
    </ChartCard>
  );
};
PopulationMachineBarChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PopulationMachineBarChart;
