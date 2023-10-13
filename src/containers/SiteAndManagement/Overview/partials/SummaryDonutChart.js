import React, { useContext } from 'react';
import { Typography, Grid } from '@material-ui/core';
import {
  Chart,
  Tooltip,
  Interval,
  Legend,
  Axis,
  Annotation,
  Coordinate,
} from 'bizcharts';
import numeral from 'numeral';
import { makeStyles } from '@material-ui/styles';

import {
  GrayMedium,
  SecondaryMedium,
  PrimaryHard,
  Dark,
} from '../../../../assets/theme/colors';
import { SiteManOvContext } from '../index';
import LoadingView from '../../../../components/Loading/LoadingView';
import NoData from './NoData';

const useStyles = makeStyles(() => ({
  legend: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 14,
    '&:last-child': {
      marginBottom: 0,
    },
  },
}));

const SummaryDonutChart = () => {
  const classes = useStyles();
  const completeData = useContext(SiteManOvContext).sumData
    ?.completedLocationDetail;

  const { completedLocation, uncompletedLocation, total } = completeData
    ? completeData
    : {};

  const data = completeData
    ? [
        {
          label: 'Lokasi Sudah Lengkap',
          value: completedLocation,
        },
        {
          label: 'Lokasi Belum Lengkap',
          value: uncompletedLocation,
        },
      ]
    : [];

  const donutData = [data[1], data[0]];

  const tplTooltip = '<li style="margin-bottom:12px !important;" data-index={index}>'
    + '<span style="background-color:{color};width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:8px;"></span>'
    + '{name}: {value}'
    + '</li>'

  // console.log(data,donutData);

  return (
    <div
      style={{
        borderRadius: 8,
        border: `1px solid ${GrayMedium}`,
        padding: 20,
        height: '100%',
      }}
    >
      {completeData == null ? (
        <LoadingView maxheight='100%' />
      ) : (
        <>
          <Typography
            style={{
              fontWeight: 500,
              fontSize: '15px',
              lineHeight: '18px',
              marginBottom: 12,
            }}
          >
            Kelengkapan Seluruh Lokasi
          </Typography>
          {data?.length > 0 ? (
            <Grid container spacing={2} alignItems='center'>
              <Grid item xs={6} md={6}>
                <Chart data={donutData} height={180} width={180} autoFit>
                  <Coordinate type='theta' radius={1} innerRadius={0.8} />
                  <Interval
                    adjust='stack'
                    position='value'
                    color={[
                      'label',
                      (label) => {
                        return getColor(label);
                      },
                    ]}
                    shape='sliceShape'
                  />
                  <Annotation.Text
                    position={['50%', '50%']}
                    content={formatted(total)}
                    style={{
                      fontFamily: 'Barlow',
                      fontWeight: 600,
                      fontSize: 17,
                      lineHeight: '20px',
                      textAlign: 'center',
                      fill: Dark,
                    }}
                  />
                  <Axis visible={false} />
                  <Tooltip itemTpl={tplTooltip} showTitle={false} />
                  <Legend visible={false} />
                </Chart>
              </Grid>
              <Grid item xs={6} md={6}>
                {data?.map((val, i) => {
                  return (
                    <div key={i} className={classes.legend}>
                      <div
                        style={{
                          width: 16,
                          height: 16,
                          backgroundColor: getColor(val.label),
                          borderRadius: 4,
                        }}
                      >
                        &nbsp;
                      </div>
                      <Typography
                        style={{
                          fontSize: '13px',
                          lineHeight: '16px',
                          marginLeft: 5,
                        }}
                      >
                        {val.label}
                      </Typography>
                      <Typography
                        style={{
                          fontSize: '13px',
                          lineHeight: '16px',
                          marginLeft: 'auto',
                        }}
                      >
                        {formatted(val.value)}
                      </Typography>
                    </div>
                  );
                })}
              </Grid>
            </Grid>
          ) : (
            <NoData />
          )}
        </>
      )}
    </div>
  );
};

export default SummaryDonutChart;

function formatted(number) {
  return numeral(number).format('0,0');
}

function getColor(item) {
  switch (item) {
    case 'Lokasi Sudah Lengkap':
      return PrimaryHard;
    case 'Lokasi Belum Lengkap':
      return SecondaryMedium;
    default:
      return 'black';
  }
}
