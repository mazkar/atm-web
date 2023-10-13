/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-undef */
/* eslint-disable react/require-default-props */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Chart, Tooltip, Interval, Legend } from 'bizcharts';
import { Paper, Grid, Typography, Tabs, Tab, IconButton, } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ChevronLeft, ChevronRight, PinDropRounded } from '@material-ui/icons';
import moment from 'moment';
import constants from '../../../helpers/constants';
import { ReactComponent as ChartIcon } from '../../../assets/icons/general/chart_line_red.svg';
import empty from '../../../assets/images/empty_data.png';
import TabsFilter from '../TabFilter';

const useSwitchStyles = makeStyles({
  cardContainer: {
    borderRadius: 10,
    padding: 15,
    boxShadow: '0px 6px 6px rgba(232, 238, 255, 0.3)',
  },
});

// --- DATA DUMMY CHART --- //

const dataDummyChart = [
  {date: "Januari", transaction: "1_000_000", type: "trend"}, {date: "Februari", transaction: "1_100_000", type: "trend"}, {date: "Maret", transaction: "1_200_000", type: "trend"},
  {date: "April", transaction: "1_300_000", type: "trend"}, {date: "Mei", transaction: "1_400_000", type: "trend"}, {date: "Juni", transaction: "1_500_000", type: "trend"},
  {date: "Juli", transaction: "1_600_000", type: "trend"}, {date: "Agustus", transaction: "1_700_000", type: "trend"}, {date: "Desember", transaction: "1_800_000", type: "trend"},
  {date: "Januari", transaction: "1_000_000", type: "forecast"}, {date: "Februari", transaction: "1_100_000", type: "forecast"}, {date: "Maret", transaction: "1_200_000", type: "forecast"},
  {date: "April", transaction: "1_300_000", type: "forecast"}, {date: "Mei", transaction: "1_400_000", type: "forecast"}, {date: "Juni", transaction: "1_500_000", type: "forecast"},
  {date: "Juli", transaction: "1_600_000", type: "forecast"}, {date: "Agustus", transaction: "1_700_000", type: "forecast"}, {date: "Desember", transaction: "1_800_000", type: "forecast"},
];

const ChartCard = ({ title, icon, children, headerControl, withControl, type, chartLegendLabel}) => {
  const { cardContainer } = useSwitchStyles();

  // console.log(`iINI CHART ${type}`);

  return (
    <Paper className={`${cardContainer}`}>
      <Grid container direction="column" spacing={3}>
        <Grid item>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
            spacing={2}
          >
            <Grid item xs={1}>
              <Grid container direction="row" alignItems="center" spacing={1}>
                <Grid item>{icon}</Grid>

                <Grid item xs={2}>
                  <Typography variant="body1" component="p" gutterBottom>
                    {title}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            {withControl ? <Grid item>{headerControl}</Grid> : null}

            <Grid item>
              <Grid container spacing={1}>
                <Grid item>
                  <Grid container spacing={1}>
                    <Grid item><div style={{height: 20, width: 20, borderRadius: 4, backgroundColor: '#DC241F'}} /></Grid>
                    <Grid item><Typography style={{fontSize: 13, fontWeight: 400}}>{chartLegendLabel[0]}</Typography></Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container spacing={1}>
                    <Grid item><div style={{height: 20, width: 20, borderRadius: 4, backgroundColor: '#749BFF'}} /></Grid>
                    <Grid item><Typography style={{fontSize: 13, fontWeight: 400}}>{chartLegendLabel[1]}</Typography></Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item>{children}</Grid>
      </Grid>
    </Paper>
  );
};

ChartCard.propTypes = {
  chartLegendLabel: PropTypes.array.isRequired,
};

const TrxDetailChart = ({ data, year, onChangeYear, type, chartLegendLabel}) => {
  // const { data, year} = props
  const [selectedTab, setSelectedTab] = useState(0);
  const handleSelectedTab = (event, newValue) => {
    event.preventDefault();
    setSelectedTab(newValue);
    // console.log(newValue);
  };

  ChartCard.defaultProps = {
    headerControl: <TabsFilter
      onChangeYear = {onChangeYear}
      handleSelectedTabFilter={handleSelectedTab}
      selectedTab={selectedTab} />,
    withControl: false,
  };

  // console.log(JSON.stringify(dataDummyChart));

  const colors = ['#DC241F', '#749BFF'];
  function numberWithCommas(x) {
    const parts = x.toString().split(".");
    parts[0]=parts[0].replace(/\B(?=(\d{3})+(?!\d))/g,".");
    return parts.join(",");
  }

  const threeMonth = data.slice(-6);
  const fourMonth = data.slice(-8);
  const sixMonth = data.slice(-12);
  const nineMonth = data.slice(-18);
  const twelveMonth = data.slice(-24);

  if (selectedTab === 0)
  {
    return (
      <ChartCard title="Transaction" icon={<ChartIcon />} withControl type={type} chartLegendLabel={chartLegendLabel}>
        <Chart
          height={250}
          data={year}
          autoFit
          padding="auto"
          scale={{
            transaction: {
              type: "log",
              base: 1000,
              tickCount: 4,   // 指定坐标轴刻度的个数。
              formatter: d => numberWithCommas(`Rp ${d}`),
            },
          }}
        >
          <Interval 
            adjust={[
              {
                type: 'dodge',
                marginRatio: 0.2,
  
              },
            ]}
            position="date*transaction" 
            color={["type", colors]}
          />
          <Tooltip shared />
          <Legend visible={false} />
        </Chart>
      </ChartCard>
    );
  }  if(selectedTab === 1){
    
    // console.log(threeMonth);
    if ( data.length === 0){
      // console.log(data);
      return(
        <ChartCard title="Transaction" icon={<ChartIcon />} withControl type={type} chartLegendLabel={chartLegendLabel}>
          <center><img src={empty} alt="Empty" style={{opacity: 0.4}} /></center>
          <center><Typography variant="p" style={{opacity: 0.4}}>Data not available!</Typography></center>
        </ChartCard>
      );
    }
    
    return (
      <ChartCard title="Transaction" icon={<ChartIcon />} withControl type={type} chartLegendLabel={chartLegendLabel}>
        <Chart
          height={250}
          data={threeMonth}
          autoFit
          padding="auto"
          scale={{
            transaction: {
              type: "log",
              base: 1000,
              tickCount: 5,   // 指定坐标轴刻度的个数。
              formatter: d => numberWithCommas(`Rp ${d}`),
            },
          }}
        >
          <Interval 
            adjust={[
              {
                type: 'dodge',
                marginRatio: 0.2,
            
              },
            ]}
            position="date*transaction" 
            color={["type", colors]}
          />
          <Tooltip shared />
          <Legend visible={false} />
        </Chart>
      </ChartCard>
    );
    
  } if(selectedTab === 2){
    
    // console.log(fourMonth);
    if ( data.length === 0){
      // console.log(data);
      return(
        <ChartCard title="Transaction" icon={<ChartIcon />} withControl type={type} chartLegendLabel={chartLegendLabel}>
          <center><img src={empty} alt="Empty" style={{opacity: 0.4}} /></center>
          <center><Typography variant="p" style={{opacity: 0.4}}>Data not available!</Typography></center>
        </ChartCard>
      );
    }
    
    return (
      <ChartCard title="Transaction" icon={<ChartIcon />} withControl type={type} chartLegendLabel={chartLegendLabel}>
        <Chart
          height={250}
          data={fourMonth}
          autoFit
          padding="auto"
          scale={{
            transaction: {
              type: "log",
              base: 1000,
              tickCount: 5,   // 指定坐标轴刻度的个数。
              formatter: d => numberWithCommas(`Rp ${d}`),
            },
          }}
        >
          <Interval 
            adjust={[
              {
                type: 'dodge',
                marginRatio: 0.2,
            
              },
            ]}
            position="date*transaction" 
            color={["type", colors]}
          />
          <Tooltip shared />
          <Legend visible={false} />
        </Chart>
      </ChartCard>
    );
    
  }
  if(selectedTab === 3){
   
    // console.log(fourMonth);
    if ( data.length === 0){
      // console.log(data);
      return(
        <ChartCard title="Transaction" icon={<ChartIcon />} withControl type={type} chartLegendLabel={chartLegendLabel}>
          <center><img src={empty} alt="Empty" style={{opacity: 0.4}} /></center>
          <center><Typography variant="p" style={{opacity: 0.4}}>Data not available!</Typography></center>
        </ChartCard>
      );
    }
    
    return (
      <ChartCard title="Transaction" icon={<ChartIcon />} withControl type={type} chartLegendLabel={chartLegendLabel}>
        <Chart
          height={250}
          data={sixMonth}
          autoFit
          padding="auto"
          scale={{
            transaction: {
              type: "log",
              base: 1000,
              tickCount: 5,   // 指定坐标轴刻度的个数。
              formatter: d => numberWithCommas(`Rp ${d}`),
            },
          }}
        >
          <Interval 
            adjust={[
              {
                type: 'dodge',
                marginRatio: 0.2,
            
              },
            ]}
            position="date*transaction" 
            color={["type", colors]}
          />
          <Tooltip shared />
          <Legend visible={false} />
        </Chart>
      </ChartCard>
    );
    
  }
  if(selectedTab === 4){
    
    // console.log(fourMonth);
    if ( data.length === 0){
      // console.log(data);
      return(
        <ChartCard title="Transaction" icon={<ChartIcon />} withControl type={type} chartLegendLabel={chartLegendLabel}>
          <center><img src={empty} alt="Empty" style={{opacity: 0.4}} /></center>
          <center><Typography variant="p" style={{opacity: 0.4}}>Data not available!</Typography></center>
        </ChartCard>
      );
    }
    return (
      <ChartCard title="Transaction" icon={<ChartIcon />} withControl type={type} chartLegendLabel={chartLegendLabel}>
        <Chart
          height={250}
          data={nineMonth}
          autoFit
          padding="auto"
          scale={{
            transaction: {
              type: "log",
              base: 1000,
              tickCount: 5,   // 指定坐标轴刻度的个数。
              formatter: d => numberWithCommas(`Rp ${d}`),
            },
          }}
        >
          <Interval 
            adjust={[
              {
                type: 'dodge',
                marginRatio: 0.2,
          
              },
            ]}
            position="date*transaction" 
            color={["type", colors]}
          />
          <Tooltip shared />
          <Legend visible={false} />
        </Chart>
      </ChartCard>
    );
  }
  if(selectedTab === 5){
    // console.log(fourMonth);
    if ( data.length === 0){
      // console.log(data);
      return(
        <ChartCard title="Transaction" icon={<ChartIcon />} withControl type={type} chartLegendLabel={chartLegendLabel}>
          <center><img src={empty} alt="Empty" style={{opacity: 0.4}} /></center>
          <center><Typography variant="p" style={{opacity: 0.4}}>Data not available!</Typography></center>
        </ChartCard>
      );
    }
    
    return (
      <ChartCard title="Transaction" icon={<ChartIcon />} withControl type={type} chartLegendLabel={chartLegendLabel}>
        <Chart
          height={250}
          data={twelveMonth}
          autoFit
          padding="auto"
          scale={{
            transaction: {
              type: "log",
              base: 1000,
              tickCount: 5,   // 指定坐标轴刻度的个数。
              formatter: d => numberWithCommas(`Rp ${d}`),
            },
          }}
        >
          <Interval 
            adjust={[
              {
                type: 'dodge',
                marginRatio: 0.2,
            
              },
            ]}
            position="date*transaction" 
            color={["type", colors]}
          />
          <Tooltip shared />
          <Legend visible={false} />
        </Chart>
      </ChartCard>
    );
    
  }
  
};

TrxDetailChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  year: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChangeYear: PropTypes.func, 
  chartLegendLabel: PropTypes.array,
};

TrxDetailChart.defaultProps ={
  data: dataDummyChart,
  chartLegendLabel: ["Trend Transaction","Forecast"]
};

export default TrxDetailChart;