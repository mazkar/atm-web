import React, { useContext } from 'react';
import {
  Chart,
  Tooltip,
  Legend,
  Axis,
  Annotation,
  LineAdvance,
} from 'bizcharts';
import util from '../../../../helpers/utility';

import {
  Dark,
  GrayUltrasoft,
  GrayMedium,
  SecondaryMedium,
  PrimaryHard,
  SuccessMedium,
  InfoMedium,
} from '../../../../assets/theme/colors';
import { SiteManOvContext } from '../index';
import NoData from './NoData';
import LoadingView from '../../../../components/Loading/LoadingView';
import LoadingOverlayWrapper from './LoadingOverlayWrapper';
import { Typography } from '@material-ui/core';

const { numeral } = util;

const AchievementChart = () => {
  const { achData, isAchLoading } = useContext(SiteManOvContext);
  const monAchDoc = achData;
  // console.log('~ achData', achData);
  const { dataTarget, dataAchievement, dataOnline } = monAchDoc || {};
  const data = dataAchievement
    ? dataAchievement
        .map((val, i) => [dataTarget[i], val])
        .reduce((prev, cur) => [...prev, ...cur], [])
    : [];
  // console.log('~ data', data);
  const values = data.map((val) => val.value);
  const arrMax = Math.max(...values);
  const maxValue = arrMax * 1.1;

  const color = [
    'type',
    (type) => {
      switch (type) {
        case 'online':
          return PrimaryHard;
        case 'target':
          return SecondaryMedium;
        case 'rbb':
          return PrimaryHard;
        case 'achievement':
          return PrimaryHard;
        default:
          return 'black';
      }
    },
  ];

  return (
    <div
      style={{
        borderRadius: 8,
        border: `1px solid ${GrayMedium}`,
        height: '100%',
      }}
    >
      {isAchLoading ? (
        <LoadingView maxheight='100%' />
      ) : (
        <>
          <LoadingOverlayWrapper open={isAchLoading}>
            <div style={{ padding: 20 }}>
              {data.length > 0 ? (
                <>
                  <Chart
                    padding='auto'
                    autoFit
                    height={200}
                    data={data}
                    scale={{
                      value: {
                        tickCount: 5,
                        type: 'linear',
                        min: 0,
                        max: maxValue,
                        formatter: (text, item, index) => {
                          return numeral(text).format('0,0');
                        },
                      },
                    }}
                  >
                    <LineAdvance
                      point={{
                        size: 5,
                        style: {
                          lineWidth: 2,
                          shadowColor: 'rgba(71, 71, 71, 0.24)',
                          shadowOffsetX: 0,
                          shadowOffsetY: 3,
                          shadowBlur: 6,
                        },
                      }}
                      area
                      shape='smooth'
                      position='month*value'
                      size={2}
                      color={color}
                    />
                    <Annotation.Region
                      start={['0%', '0%']}
                      end={['100%', '100%']}
                      style={{
                        fill: GrayUltrasoft,
                        fillOpacity: 1,
                      }}
                    />
                    <Legend visible={false} />
                    <Axis
                      name='month'
                      line={{
                        style: {
                          lineWidth: 0,
                        },
                      }}
                      tickLine={null}
                      label={{
                        style: {
                          fill: Dark,
                          fontSize: 10,
                          fontWeight: 500,
                          fontFamily: 'Barlow',
                          lineHeight: '12px',
                        },
                      }}
                    />
                    <Axis
                      name='value'
                      label={{
                        style: {
                          fill: Dark,
                          fontSize: 10,
                          fontWeight: 500,
                          fontFamily: 'Barlow',
                          lineHeight: '12px',
                        },
                        formatter: (text, item, index) => {
                          return numeral(text).format('0,0');
                        },
                      }}
                      grid={{
                        line: {
                          style: {
                            stroke: GrayMedium, // 网格线的颜色
                            lineWidth: 1, // 网格线的宽度复制代码
                            lineDash: [2, 2], // 网格线的虚线配置，第一个参数描述虚线的实部占多少像素，第二个参数描述虚线的虚部占多少像素
                          },
                        },
                      }}
                    />
                    <Tooltip shared showCrosshairs />
                  </Chart>
                  <div
                    style={{ display: 'flex', marginTop: 30, paddingLeft: 16 }}
                  >
                    {legends.map((val, i) => {
                      return (
                        <div
                          style={{ marginRight: 30, display: 'flex' }}
                          key={i}
                        >
                          <div
                            style={{
                              width: 16,
                              height: 16,
                              borderRadius: 4,
                              backgroundColor: val.color,
                              marginRight: 5,
                            }}
                          >
                            &nbsp;
                          </div>
                          <Typography
                            style={{ fontSize: '13px', lineHeight: '16px' }}
                          >
                            {val.label}
                          </Typography>
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : (
                <NoData />
              )}
            </div>
          </LoadingOverlayWrapper>
        </>
      )}
    </div>
  );
};

export default AchievementChart;

const legends = [
  {
    label: 'Target',
    color: SecondaryMedium,
  },
  {
    label: 'Achievement',
    color: PrimaryHard,
  },
];
