import React, { useEffect } from 'react';
import { DonutChart } from 'bizcharts';
import { Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import {
  GrayMedium,
  SecondaryMedium,
  PrimaryHard,
  GraySoft,
} from '../../../../assets/theme/colors';
import utility from '../../../../helpers/utility';
import NoData from './NoData';
const { numeral } = utility;

const useStyles = makeStyles(() => ({
  chartContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  legend: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 20,
  },
}));

const AtmDonutChart = (props) => {
  const classes = useStyles();
  const total = props.data[2].value;
  const donutData = props.data?.map((val, i, arr) => {
    const [first, second, target] = arr;
    const reducedTotal = target.value - first.value - second.value;
    return i !== 2 ? val : { status: 'Target', value: reducedTotal };
  });
  // useEffect(() => {
  //   console.log('~ props.data', props.data);
  //   console.log('~ donutData', donutData);
  // }, [props.data]);
  return (
    <div
      style={{
        borderRadius: 8,
        border: `1px solid ${GrayMedium}`,
        padding: 20,
      }}
    >
      <Typography
        style={{
          marginBottom: 26,
          fontWeight: 500,
          fontSize: '15px',
          lineHeight: '18px',
        }}
      >
        {props.title}
      </Typography>
      {props.data?.length > 0 ? (
        <div>
          <div>
            <div className={classes.chartContainer}>
              <DonutChart
                data={props.data ? donutData : []}
                height={190}
                width={190}
                // forceFit
                radius={1}
                innerRadius={0.8}
                // renderer="svg"
                label={{
                  visible: false,
                }}
                statistic={{
                  title:{
                    style:{
                      fontSize: 13,
                      lineHeight: '16px',
                      fontFamily: 'Barlow',
                      fontWeight: 400,
                    },
                  },
                  content:{
                    style:{
                      fontSize: 17,
                      lineHeight: '20px',
                      fontFamily: 'Barlow',
                      fontWeight: 600,
                    },
                  }
                }}
                legend={{
                  visible: false,
                }}
                angleField='value'
                colorField='status'
                color={[PrimaryHard, SecondaryMedium, GraySoft]}
                padding='auto'
                pieStyle={{ lineWidth: 0 }}
              />
            </div>
          </div>
          <div>
            {props.data?.map((val, i) => {
              return (
                <div key={i} className={classes.legend}>
                  <div
                    style={{
                      width: 20,
                      height: 20,
                      backgroundColor: getColor(i),
                      borderRadius: 4,
                    }}
                  >
                    &nbsp;
                  </div>
                  <Typography
                    style={{
                      fontSize: '13px',
                      lineHeight: '16px',
                      marginLeft: 10,
                    }}
                  >
                    {val.status}
                  </Typography>
                  <Typography
                    style={{
                      fontWeight: 600,
                      fontSize: '17px',
                      lineHeight: '20px',
                      marginLeft: 'auto',
                    }}
                  >
                    {formatted(val.value)}
                  </Typography>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <NoData />
      )}
    </div>
  );
};

export default AtmDonutChart;

function formatted(number) {
  return numeral(number).format('0,0');
}

function formatPercent(number) {
  return numeral(number).format('0.00');
}

function getColor(index) {
  switch (index) {
    case 0:
      return PrimaryHard;
    case 1:
      return SecondaryMedium;
    case 2:
      return GraySoft;
    default:
      return 'black';
  }
}
