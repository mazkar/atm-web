/* eslint-disable react/no-danger */
/* eslint-disable react/forbid-prop-types */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { DonutChart } from 'bizcharts';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, Link } from '@material-ui/core';
import  EmptyImg from '../../../assets/images/empty_data.png';
import { ColorsHexCollection } from '../../../assets/theme/colors';
import axios from 'axios';
import { DashboardPopulationContext } from '../../../containers/DashboardPopulation';
import qs from 'qs'
import ModalLoader from '../../ModalLoader';
import { useState } from 'react';

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
    padding: 10,
  },
});

function ChkyDonutChart(props) {
  const classes = useStyles();
  const [isLoaderOpen, setIsLoaderOpen] = useState(false)
  const DashPopCtxVal = useContext(DashboardPopulationContext)
  const { dataFilter } = DashPopCtxVal || {}
  const {data, totalLabels, colors, titleChart, category} = props;
  const numberWithCommas = (x) => {
    return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
  
  const handleClick = (item) => (e) => {
    setIsLoaderOpen(true)
    const {type} = item
    const urlParam = qs.stringify({...dataFilter, category, type})
    axios({
      url: `${process.env.REACT_APP_API_DOMAIN}/analysismodelingservice/v1/population/fileDownloadMachinePopulation?${urlParam}`,
      responseType: "blob", // important
      method: 'POST'
    })
    .then(res=>{
      console.log(res.data);
      setIsLoaderOpen(false)
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `data_ATM.xlsx`);
      document.body.appendChild(link);
      link.addEventListener('click', function(){
        setTimeout(() => {
          URL.revokeObjectURL(url);
          link.removeEventListener('click', this);
        }, 150);
      }, false);
      link.click();
      document.body.removeChild(link)
    })
    .catch(err=>{
      setIsLoaderOpen(false)
      console.log(err);
    })
  }
  return (
    <div className={classes.root}>
      <Typography style={{fontSize: 15, fill: 'black', fontWeight: 500,}}>
        {titleChart}
      </Typography>
      {data.length > 0 ? 
        <Grid container alignItems="center" >
          <Grid item xs={6} style={{position:'relative', left: -15}}>
            <DonutChart
              data={data}
              height={155}
              width={155}
              padding={0}
              color={colors}
              innerRadius={0.7}
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
                  formatter: ()=>(totalLabels)
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
              angleField="value"
              colorField="type"
              pieStyle={{ lineWidth: 0 }}
            />
          </Grid>
          <Grid item xs={6}>
            {data.map((item, index)=>{
              const LegendItem = () => (
                <Grid key={index} container spacing={1} justify="space-between" wrap="nowrap" alignItems="center">
                  <Grid item style={{flex: 1, minWidth: 0}}>
                    <Grid container spacing={1} alignItems="center" wrap='nowrap'>
                      <Grid item>
                        <div style={{height: 20, width: 20, borderRadius: 4, backgroundColor: colors[index]}} />
                      </Grid>
                      <Grid item style={{flex: 1, minWidth: 0}}>
                        <Typography 
                          style={{fontSize: 12, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}} 
                          title={item.type}
                        >
                          {item.type}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Typography style={{fontSize: 14, fontWeight: 600}}>{numberWithCommas(item.value)}</Typography>
                  </Grid>
                </Grid>
              )
              return ( DashPopCtxVal ?
                <Link onClick={handleClick(item)} color='textPrimary'>
                  <LegendItem />
                </Link>
                :
                <LegendItem />
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
      <ModalLoader isOpen={isLoaderOpen} />
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
  totalLabels: 'Machines',
  colors: ColorsHexCollection,
  titleChart: "By Group",
};

export default ChkyDonutChart;

