/* eslint-disable react/forbid-prop-types */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {ReactComponent as MachineIcon} from '../../../assets/icons/general/calculator_overview.svg';
import GetColorChart from '../../../helpers/getColorBarChart';
import LoadingView from '../../../components/Loading/LoadingView';
import { ChkyDonutChart } from '../../../components/chky';

const useStyles = makeStyles({
  superRoot: {
    '& .MuiPaper-elevation1':{
      boxShadow:'0px 6px 6px rgba(232, 238, 255, 0.3)',
    },
  },
  root: {
    borderRadius: 10,
  },
});

const dataColors = {
  colors: ['#FFB443', '#DC241F'],
  colors1: ['#DC241F', '#FFB443', '#780000'],
  colors2:['#DC241F', '#FFB443', '#780000', '#E6EAF3']
};

function PopulationMachines(props) {
  const classes = useStyles();
  const { dataProps, isLoadData } = props;
  
  return (
    <div className={classes.superRoot}>
      <Accordion defaultExpanded className={classes.root} style={{borderRadius: 10,}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon style={{color:'#DC241F'}} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Grid container alignItems="center" spacing={1}>
            <Grid item style={{display: 'flex'}}><MachineIcon /></Grid>
            <Grid item><Typography style={{fontSize: 15, fontWeight: 500}}>Machine Population</Typography></Grid>
          </Grid>
        </AccordionSummary>
        {isLoadData ?
          <LoadingView maxheight='100%' />
          :
          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <ChkyDonutChart 
                  titleChart="By Machine Type" data={dataProps.byMachineType} category='MachineType'/>
              </Grid>
              <Grid item xs={4}>
                <ChkyDonutChart 
                  titleChart="By Premises" data={dataProps.byPremises} category='Premises' />
              </Grid>
              <Grid item xs={4}>
                <ChkyDonutChart 
                  titleChart="By Brand" data={dataProps.byBrand} category='Brand' />
              </Grid>
              <Grid item xs={4}>
                <ChkyDonutChart 
                  titleChart="By FLM" data={dataProps.byFLM} category='FLM' />
              </Grid>
              <Grid item xs={4}>
                <ChkyDonutChart 
                  titleChart="By SLM" data={dataProps.bySLM} category='SLM' />
              </Grid>
              <Grid item xs={4}>
                <ChkyDonutChart 
                  titleChart="By Tipe Lokasi" data={dataProps.byProvider} category='TypeLocation' />
              </Grid>
              <Grid item xs={4}>
                <ChkyDonutChart 
                  titleChart="By Vendor Kebersihan" data={dataProps.byJanitor} category='VendorKebersihan' />
              </Grid>
              <Grid item xs={4}>
                <ChkyDonutChart 
                  titleChart="By Vendor CCTV" data={dataProps.byCCTV} category='VendorCCTV' />
              </Grid>
              <Grid item xs={4}>
                <ChkyDonutChart 
                  titleChart="By Vendor Pajak" data={dataProps.byTax} category='VendorPajak' />
              </Grid>
            </Grid>
          </AccordionDetails>
        }
      </Accordion>
    </div>
  );
}

PopulationMachines.propTypes = {
  isLoadData: PropTypes.bool,
  dataProps: PropTypes.any.isRequired,
};
PopulationMachines.defaultProps = {
  isLoadData: false,
};
export default PopulationMachines;

