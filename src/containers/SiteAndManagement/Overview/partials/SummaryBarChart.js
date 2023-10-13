/* eslint-disable import/no-cycle */
/* eslint-disable no-use-before-define */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import { Typography, Grid } from '@material-ui/core';
import { Chart, Tooltip, Interval, Legend, Axis, Annotation } from 'bizcharts';
import numeral from 'numeral';

import {
  GrayUltrasoft,
  GrayMedium,
  SecondaryMedium,
  PrimaryHard,
  SuccessMedium,
  InfoMedium,
  PrimarySoft,
  PrimaryDark,
} from '../../../../assets/theme/colors';
import { SiteManOvContext } from '../index';
import LoadingView from '../../../../components/Loading/LoadingView';
import NoData from './NoData';
import { findElByCategory } from '../../../../helpers/siteManOver';

const SummaryBarChart = () => {
  const [data, setData] = useState();
  // const compactData = useContext(SiteManOvContext).sumData?.documentDetails;
  const context = useContext(SiteManOvContext);
  const origData = context.sumData?.documentDetails;
  const { openingType } = context;

  const pksOrFilling = openingType === 'Renewal' ? 'Filling' : 'PKS';

  const compactData = [
    {
      actual: 0,
      target: 0,
      ...findElByCategory(origData, 'LOI'),
      category: 'LOI',
    },
    { actual: 0, target: 0, ...findElByCategory(origData, 'Legalitas'), category: 'Legalitas' },
    { actual: 0, target: 0, ...findElByCategory(origData, pksOrFilling), category: pksOrFilling },
    {
      actual: 0,
      target: 0,
      ...findElByCategory(origData, 'Invoice Sewa'),
      category: 'Invoice Sewa',
    },
    {
      actual: 0,
      target: 0,
      ...findElByCategory(origData, 'Bukpot'),
      category: 'Bukti Potong',
    },
    ...(openingType !== 'Renewal'
      ? [
          {
            actual: 0,
            target: 0,
            ...findElByCategory(origData, 'Surat Izin Landlord'),
            category: 'Surat Izin Landlord',
          },
        ]
      : []),
  ];
  // const [isModalLoadingOpen, setIsModalLoadingOpen] = useState(false);

  useEffect(() => {
    // console.log('~ origData', origData);
    // console.log('~ compactData', compactData);
    // console.log('~ data', data);
    setData(
      flattenArray(
        compactData?.map(({ category, target, actual }, i) => [
          { item: category, type: 'Actual', value: actual, additionalIndex: i },
          {
            item: category,
            type: 'Target',
            value: target > actual ? target - actual : 0,
            initVal: target,
            additionalIndex: i,
          },
        ])
      )
    );
  }, [origData]);

  const values = data
    ? flattenArray(data.map(({ value, initVal }) => [value, initVal ? initVal : 0]))
    : [0, 5000];
  const max = Math.max(...values) * 1.1;

  // console.log(compactData, data, values);

  return (
    <div
      style={{
        borderRadius: 8,
        border: `1px solid ${GrayMedium}`,
        padding: 20,
        height: '100%',
      }}
    >
      {compactData == null ? (
        <LoadingView maxheight='100%' />
      ) : (
        <>
          <Typography
            style={{
              fontWeight: 500,
              fontSize: '15px',
              lineHeight: '18px',
              marginBottom: 6,
            }}
          >
            Kelengkapan Berdasarkan Jenis Dokumen
          </Typography>
          {compactData?.length > 0 ? (
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Chart
                  height={200}
                  data={data}
                  padding='auto'
                  autoFit
                  scale={{
                    value: {
                      min: 0,
                      max: max,
                      tickCount: 10,
                    },
                  }}
                >
                  <Interval
                    adjust={[
                      {
                        type: 'stack',
                      },
                    ]}
                    color={[
                      'additionalIndex',
                      (additionalIndex) => {
                        return getColor(additionalIndex);
                      },
                    ]}
                    style={[
                      'type',
                      (type) => {
                        if (type === 'Target') {
                          return { fillOpacity: 0.5 };
                        }
                      },
                    ]}
                    position='item*value'
                  />
                  <Tooltip shared />
                  <Annotation.Region
                    start={['0%', '0%']}
                    end={['100%', '100%']}
                    style={{
                      fill: GrayUltrasoft,
                      fillOpacity: 1,
                    }}
                  />
                  <Tooltip visible={false} />
                  <Legend visible={false} />
                  <Axis name='item' visible={false} />
                  <Axis
                    name='value'
                    label={{
                      style: {
                        fill: GrayMedium,
                        fontSize: 10,
                        fontWeight: 500,
                        fontFamily: 'Barlow',
                      },
                      formatter: (text, item, index) => {
                        return formatted(text);
                      },
                    }}
                    grid={{
                      line: {
                        style: {
                          stroke: GrayUltrasoft,
                          lineWidth: 1,
                          lineDash: [2, 2],
                        },
                      },
                    }}
                  />
                </Chart>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  style={{
                    fontWeight: 500,
                    fontSize: '13px',
                    lineHeight: '16px',
                  }}
                >
                  Document &amp; Legality
                </Typography>
                {compactData?.map((val, i) => {
                  return (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginTop: 14,
                      }}
                    >
                      <div
                        style={{
                          width: 16,
                          height: 16,
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
                          marginLeft: 5,
                        }}
                      >
                        {val.category}
                      </Typography>
                      <Typography
                        style={{
                          fontSize: '13px',
                          lineHeight: '16px',
                          marginLeft: 'auto',
                        }}
                      >
                        {formatted(val.actual)}/{formatted(val.target)}
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

export default SummaryBarChart;

function getColor(index) {
  switch (index) {
    case 0:
      return SuccessMedium;
    case 1:
      return InfoMedium;
    case 2:
      return PrimaryDark;
    case 3:
      return PrimaryHard;
    case 4:
      return PrimarySoft;
    case 5:
      return SecondaryMedium;
    default:
      return 'black';
  }
}

function formatted(number) {
  return numeral(number).format('0,0');
}

function flattenArray(arr) {
  return arr?.reduce((prev, cur) => [...prev, ...cur], []);
}
