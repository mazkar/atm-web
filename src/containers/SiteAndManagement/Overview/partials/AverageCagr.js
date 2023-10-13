import React, { useContext, useEffect, useState } from 'react';
import {
  Paper,
  Typography,
  ButtonGroup,
  TextField,
  InputAdornment,
  IconButton,
  Grid,
} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { makeStyles } from '@material-ui/styles';
import { Chart, Tooltip, Legend, Axis, Annotation, LineAdvance } from 'bizcharts';

import { ReactComponent as TitleRateIcon } from '../../../../assets/icons/general/transaction_rate_overview.svg';
import BtnGroupItem from './BtnGroupItem';
import {
  Dark,
  GrayMedium,
  GraySoft,
  GrayUltrasoft,
  InfoMedium,
  PrimaryHard,
  GrayHardDarker,
} from '../../../../assets/theme/colors';
import { CustomSelect } from './FilterBar';
import { SiteManOvContext, thisYear } from '../index';
import NoData from './NoData';
import LoadingOverlayWrapper from './LoadingOverlayWrapper';
import Axios from 'axios';
import constants from '../../../../helpers/constants';
import secureStorage from '../../../../helpers/secureStorage';

const useStyles = makeStyles(() => ({
  yearBtn: {
    '&.Mui-disabled .MuiOutlinedInput-notchedOutline': {
      border: `1px solid ${GraySoft}`,
      borderRadius: '8px',
    },
  },
  customSelect: {
    flex: '1 0 0px',
    width: '100%',
  },
}));

const AverageCagr = () => {
  const classes = useStyles();
  const { apiHost } = constants;
  const access_token = secureStorage.getItem('access_token');
  const { cagrData, isCagrLoading, handleStateChangeCagr, selectedArea } = useContext(
    SiteManOvContext
  );
  const [range, setRange] = useState('');
  const [year, setYear] = useState(thisYear);
  const [area, setArea] = useState('All');
  const [areaOptions, setAreaOptions] = useState([]);
  const [isSelectDisabled, setIsSelectDisabled] = useState(true);

  function incYear() {
    setYear(year + 1);
  }
  function decYear() {
    setYear(year - 1);
  }

  useEffect(() => {
    if (selectedArea) {
      handleStateChangeCagr({ range, year, area });
    }
  }, [range, year, area, selectedArea]);

  const max = Math.max(...cagrData.map(({ percent }) => (percent ? percent : 0))) * 1.1;
  const percentMin = Math.min(...cagrData.map(({ percent }) => (percent ? percent : 0)));
  const min = percentMin && percentMin < 0 ? percentMin * 1.1 : 0

  // const data = cagrData.map((val) => ({ ...val, target: 4 }));
  const data = cagrData.reduce((prev,cur) => {
    const {month, percent} = cur
    return [
      ...prev,
      {
        month,
        label: "Percent",
        value: percent
      },
      {
        month,
        label: "Target",
        value: 4
      }
    ]
  },[]);

  useEffect(() => {
    console.log('~ data', data)
  }, [data])

  return (
    <div style={{ padding: 30, paddingTop: 0 }}>
      <Paper
        style={{
          boxShadow: '0px 6px 6px rgba(232, 238, 255, 0.3)',
          borderRadius: '10px',
          padding: 20,
        }}
      >
        <Grid container style={{ marginBottom: 10 }}>
          <Grid item xs={3} style={{ display: 'flex', alignItems: 'center' }}>
            <TitleRateIcon />
            <Typography
              style={{
                fontWeight: 500,
                fontSize: '15px',
                lineHeight: '18px',
                marginLeft: 10,
                whiteSpace: 'nowrap',
                marginRight: 10,
              }}
            >
              Average CAGR Renewal
            </Typography>
          </Grid>
          <Grid
            item
            xs={6}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <ButtonGroup
              variant='contained'
              disableElevation
              style={{ margin: '0', marginRight: 10 }}
            >
              {timeRanges.map(({ label, value }, i) => (
                <BtnGroupItem key={i} disabled={value === range} onClick={() => setRange(value)}>
                  {label}
                </BtnGroupItem>
              ))}
            </ButtonGroup>
            <TextField
              variant='outlined'
              value={year}
              disabled
              inputProps={{
                style: {
                  padding: '7px 0',
                  fontSize: 13,
                  lineHeight: '16px',
                  width: 30,
                  minWidth: 30,
                  color: Dark,
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start' style={{ marginRight: 0 }}>
                    <IconButton style={{ padding: 0 }} onClick={() => decYear()}>
                      <ChevronLeftIcon style={{ color: PrimaryHard }} />
                    </IconButton>
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position='end' style={{ marginLeft: 0 }}>
                    <IconButton style={{ padding: 0 }} onClick={() => incYear()}>
                      <ChevronRightIcon style={{ color: PrimaryHard }} />
                    </IconButton>
                  </InputAdornment>
                ),
                className: classes.yearBtn,
                style: { padding: 0 },
              }}
            />
          </Grid>
        </Grid>
        <LoadingOverlayWrapper open={isCagrLoading}>
          {cagrData.length > 0 ? (
            <Chart
              padding='auto'
              autoFit
              height={200}
              data={data}
              scale={{
                value: { // sesuaikan dengan nama key/props
                  tickCount: 5,
                  type: 'linear',
                  min: min,
                  max: max,
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
                color={['label', (label) => {
                  if (label === 'Percent') {
                    return PrimaryHard;
                  }
                  return InfoMedium;
                }]}
              />
              {/* <LineAdvance
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
                position='month*target'
                size={2}
                color={InfoMedium}
              /> */}
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
                name='percent'
                label={{
                  style: {
                    fill: GrayHardDarker,
                    fontSize: 11,
                    fontWeight: 500,
                    fontFamily: 'Barlow',
                  },
                  formatter: (text, item, index) => {
                    return text + '%';
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
              <Tooltip
                shared
                showCrosshairs
                itemTpl={
                  '<li data-index={index} class="g2-tooltip-list-item" style="list-style-type: none; padding: 0px; margin: 12px 0px;">' +
                  '<span class="g2-tooltip-marker" style="background-color:{color};width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:8px;"></span>' +
                  '<span class="g2-tooltip-name" style="text-transform:capitalize">{name}</span> : ' +
                  '<span class="g2-tooltip-value" style="display: inline-block; float: right; margin-left: 30px;">{value}%</span>' +
                  '</li>'
                }
              />
            </Chart>
          ) : (
            <NoData />
          )}
        </LoadingOverlayWrapper>
      </Paper>
    </div>
  );
};

export default AverageCagr;

const timeRanges = [
  { label: 'Yearly', value: '' },
  { label: '3 Month', value: '3' },
  { label: '6 Month', value: '6' },
  { label: '9 Month', value: '9' },
  { label: '12 Month', value: '12' },
];
