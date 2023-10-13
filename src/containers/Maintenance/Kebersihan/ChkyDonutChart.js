/* eslint-disable react/no-danger */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { DonutChart, Legend } from 'bizcharts';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid } from '@material-ui/core';
import constants from '../../../helpers/constants';
import  EmptyImg from '../../../assets/images/empty_data.png';

const dataDummy =  [
  {
    type: 'ATM',
    value: 20201,
  },
  {
    type: 'CRM',
    value: 3329,
  },
  {
    type: 'CDM',
    value: 14257,
  },
];

const useStyles = makeStyles({
  root: {
    borderRadius: 8,
    border: '1px solid #BCC8E7',
    position: 'relative',
    padding: 5,
  },
});

function ChkyDonutChart(props) {
  const classes = useStyles();
  const {data, totalLabels, colors, titleChart} = props;
  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
  return (
    <div className={classes.root}>
      <Typography style={{position: 'relative', left: 20, top: 20, fontSize: 15, fill: 'black', fontWeight: 500,}}>
        {titleChart}
      </Typography>
      {data.length > 0 ? 
        <Grid container spacing={1} alignItems="center" justify="space-between">
          <Grid item xs={5} style={{position:'relative', left:-30}}>
            <DonutChart
              // title={{
              //   text: titleChart,
              //   style: {fontSize: 15, fill: 'black', fontWeight: 500, fontFamily:'Barlow',},
              // }}
              data={data}
              height={225}
              width={225}
              padding={0}
              color={colors}
              innerRadius={0.7}
              label={{
                visible: false,
              }}
              statistic={{
                totalLabel: totalLabels,
                htmlContent: (item)=>{
                  return (
                    `<div style="text-align: center;">
                    <span style="font-size: 16px;"><b></b></span><br/>
                    <span style="font-size: 13px;"></span>
                    </div>`
                  );
                },
              }}
              legend={{
                visible: false,
                //   text: {
                //     formatter:(v)=>{return `${v}`;}
                //   },
                //   marker: {
                //     symbol: "square",
                //     style: {
                //       r: 7,
                //     },
                //   },
              }}
              angleField="value"
              colorField="type"
              pieStyle={{ lineWidth: 0 }}
            />
          </Grid>
          <Grid item xs={6} style={{paddingRight: 10,paddingTop: 20,}}>
            {data.map((item, index)=>{
              return (
                <Grid container spacing={1} justify="space-between"  alignItems="center">
                  <Grid item>
                    <Grid container spacing={1} alignItems="center">
                      <Grid item>
                        <div style={{height: 20, width: 20, borderRadius: 4, backgroundColor: colors[index]}} />
                      </Grid>
                      <Grid item>
                        <Typography style={{fontSize: 12,}}>{item.type}</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Typography style={{fontSize: 14, fontWeight: 600}}>{numberWithCommas(item.value)}</Typography>
                  </Grid>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
        : 
        <Grid container alignContent="center" justify="center" style={{height: 175}} direction="column">
          <img src={EmptyImg} alt="Empty" style={{opacity: 0.4}}/>
          <Typography style={{opacity: 0.3, textAlign: 'center', fontSize: 11, marginTop: 10}}>Empty</Typography>
        </Grid>
      }
    </div>
  );
}

ChkyDonutChart.propTypes = {
  data: PropTypes.array,
  totalLabels: PropTypes.string,
  colors: PropTypes.array,
  titleChart: PropTypes.string,
};

ChkyDonutChart.defaultProps = {
  data: dataDummy,
  totalLabels: '',
  colors: [constants.color.primaryHard,constants.color.secondaryMedium,constants.color.grayMedium],
  titleChart: "By Group",
};

export default ChkyDonutChart;