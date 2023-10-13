import React from 'react';
import { Chart, Tooltip, LineAdvance } from 'bizcharts';
import PropTypes from 'prop-types';

import ChartCard from '../../ChartCard';

import constants from '../../../helpers/constants';

const ChartLineIcon = () => (
  <svg width="30" height="30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="30" height="30" rx="10" fill="#FFE9E9" />
    <path
      opacity=".4"
      d="M25 20.625v1.25a.624.624 0 01-.625.625H6.25A1.25 1.25 0 015 21.25V8.125a.625.625 0 01.625-.625h1.25a.625.625 0 01.625.625V20h16.875a.624.624 0 01.625.625z"
      fill="#DC241F"
    />
    <path
      d="M23.75 9.375v4.611c0 .835-1.01 1.254-1.602.664l-1.265-1.265-3.75 3.75a1.25 1.25 0 01-1.768 0L12.5 14.268l-1.8 1.8a.627.627 0 01-.883 0l-.884-.884a.625.625 0 010-.884l2.683-2.684a1.25 1.25 0 011.768 0l2.866 2.866 2.866-2.866-1.264-1.264c-.591-.591-.173-1.602.664-1.602h4.609a.625.625 0 01.625.625z"
      fill="#DC241F"
    />
  </svg>
);

const TotalTransactionChart = ({ data }) => {
  return (
    <ChartCard title="Total Transaction" icon={<ChartLineIcon />} withControl>
      <Chart
        height={250}
        data={data}
        autoFit
        scale={{
          transaction: {
            min: 1_000_000,
            max: 50_000_000,
          },
        }}
      >
        <Tooltip shared showCrosshairs />

        <LineAdvance
          point={{
            size: 8,
            style: {
              lineWidth: 3,
            },
          }}
          area
          shape="smooth"
          position="date*transaction"
          size={2}
          color={constants.color.primaryHard}
          label="transaction"
        />
      </Chart>
    </ChartCard>
  );
};

TotalTransactionChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TotalTransactionChart;
