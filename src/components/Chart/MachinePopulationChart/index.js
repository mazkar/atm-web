import React from 'react';
import PropTypes from 'prop-types';
import { Divider } from 'antd';
import { DonutChart } from 'bizcharts';

import ChartCard from '../../ChartCard';

import constants from '../../../helpers/constants';

const CalculatorIcon = () => (
  <svg width="30" height="30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="30" height="30" rx="10" fill="#FFE9E9" />
    <path
      opacity=".4"
      d="M10.75 20h-1.5c-.25 0-.5.25-.5.5V22c0 .25.25.5.5.5h1.5c.25 0 .5-.25.5-.5v-1.5c0-.25-.25-.5-.5-.5zm0-5h-1.5c-.25 0-.5.25-.5.5V17c0 .25.25.5.5.5h1.5c.25 0 .5-.25.5-.5v-1.5c0-.25-.25-.5-.5-.5zm5 5h-1.5c-.25 0-.5.25-.5.5V22c0 .25.25.5.5.5h1.5c.25 0 .5-.25.5-.5v-1.5c0-.25-.25-.5-.5-.5zm0-5h-1.5c-.25 0-.5.25-.5.5V17c0 .25.25.5.5.5h1.5c.25 0 .5-.25.5-.5v-1.5c0-.25-.25-.5-.5-.5zm5 0h-1.5c-.25 0-.5.25-.5.5V22c0 .25.25.5.5.5h1.5c.25 0 .5-.25.5-.5v-6.5c0-.25-.25-.5-.5-.5z"
      fill="#DC241F"
    />
    <path
      d="M21.875 5H8.125c-1 0-1.875.875-1.875 1.875v16.25c0 1 .875 1.875 1.875 1.875h13.75c1 0 1.875-.875 1.875-1.875V6.875c0-1-.875-1.875-1.875-1.875zM11.25 22c0 .25-.25.5-.5.5h-1.5c-.25 0-.5-.25-.5-.5v-1.5c0-.25.25-.5.5-.5h1.5c.25 0 .5.25.5.5V22zm0-5c0 .25-.25.5-.5.5h-1.5c-.25 0-.5-.25-.5-.5v-1.5c0-.25.25-.5.5-.5h1.5c.25 0 .5.25.5.5V17zm5 5c0 .25-.25.5-.5.5h-1.5c-.25 0-.5-.25-.5-.5v-1.5c0-.25.25-.5.5-.5h1.5c.25 0 .5.25.5.5V22zm0-5c0 .25-.25.5-.5.5h-1.5c-.25 0-.5-.25-.5-.5v-1.5c0-.25.25-.5.5-.5h1.5c.25 0 .5.25.5.5V17zm5 5c0 .25-.25.5-.5.5h-1.5c-.25 0-.5-.25-.5-.5v-6.5c0-.25.25-.5.5-.5h1.5c.25 0 .5.25.5.5V22zm0-10c0 .25-.25.5-.5.5H9.25c-.25 0-.5-.25-.5-.5V8c0-.25.25-.5.5-.5h11.5c.25 0 .5.25.5.5v4z"
      fill="#DC241F"
    />
  </svg>
);

const MachinePopulationChart = ({ data }) => {
  return (
    <ChartCard title="Machine Population" icon={<CalculatorIcon />}>
      <Divider orientation="left" plain style={{ fontStyle: 'italic ' }}>
        By Type
      </Divider>

      <DonutChart
        data={data}
        height={260}
        forceFit
        color={[
          constants.color.primaryHard,
          constants.color.secondaryMedium,
          constants.color.grayMedium,
        ]}
        radius={0.8}
        innerRadius={0.9}
        label={{
          visible: false,
        }}
        statistic={{
          totalLabel: 'Machines',
        }}
        legend={{
          marker: {
            symbol: 'square',
            style: {
              r: 6,
            },
          },
        }}
        padding="auto"
        angleField="value"
        colorField="type"
        pieStyle={{ lineWidth: 0 }}
      />

      <Divider orientation="left" plain style={{ fontStyle: 'italic ' }}>
        By Serial
      </Divider>

      <DonutChart
        data={data}
        height={260}
        forceFit
        color={[
          constants.color.primaryHard,
          constants.color.secondaryMedium,
          constants.color.grayMedium,
        ]}
        radius={0.8}
        innerRadius={0.9}
        label={{
          visible: false,
        }}
        statistic={{
          totalLabel: 'Machines',
        }}
        legend={{
          marker: {
            symbol: 'square',
            style: {
              r: 6,
            },
          },
        }}
        padding="auto"
        angleField="value"
        colorField="type"
        pieStyle={{ lineWidth: 0 }}
      />
    </ChartCard>
  );
};

MachinePopulationChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MachinePopulationChart;
