/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Paper,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { ReactComponent as MachineIcon } from '../../../assets/icons/general/calculator_overview.svg';
import { ChkyDonutChart } from '../../../components';
import LoadingView from '../../../components/Loading/LoadingView';

const useStyles = makeStyles({
  superRoot: {
    '& .MuiPaper-elevation1': {
      boxShadow: '0px 6px 6px rgba(232, 238, 255, 0.3)',
    },
  },
  root: {
    borderRadius: 10,
  },
});

const dataGroup = {
  data: [
    { type: 'ATM', value: 20201 },
    { type: 'CRM', value: 3329 },
    { type: 'CDM', value: 14257 },
  ],
  colors: ['#FFB443', '#DC241F'],
};

const dataPremises = {
  data: [
    { type: 'Off Premises', value: 20201 },
    { type: 'On Premises', value: 30529 },
  ],
  colors: ['#FFB443', '#DC241F'],
};

const dataBrand = {
  data: [
    { type: 'NCR', value: 20201 },
    { type: 'DieBold', value: 3329 },
    { type: 'CRM', value: 14257 },
    { type: 'CDM', value: 14257 },
  ],
  colors: [
    '#DC241F',
    '#FFB443',
    '#780000',
    '#d6847f',
    '#E9967A',
    '#FF6347',
    '#FFD700',
    '#FF8C00',
    '#F0E68C',
    '#3b3838',
    '#7fd1d6',
    '#00a3ad',
    '#ff3800',
    '#b5bf50',
    '#36648b',
    '#c1cdc1',
    '#e0eee0',
    '#b0c4de',
    '#000080',
    '#32d9cb',
    '#51828d',
    '#2f1431',
    '#94a7b1',
    '#96ad29',
    '#7f6f9f',
    '#75bbca',
    '#548bac',
    '#a6cfe8',
    '#7553bb',
  ],
};

function OverviewMachinePopulation(props) {
  const classes = useStyles();
  const {
    dataPopulationByGroup,
    dataPopulationByPremises,
    dataPopulationByBrand,
    loading,
  } = props;
  return (
    <div className={classes.superRoot}>
      <Accordion
        defaultExpanded
        className={classes.root}
        style={{ borderRadius: 10 }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon style={{ color: '#DC241F' }} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Grid container alignItems="center" spacing={1}>
            <Grid item style={{ display: 'flex' }}>
              <MachineIcon />
            </Grid>
            <Grid item>
              <Typography style={{ fontSize: 15, fontWeight: 500 }}>
                Machine Population
              </Typography>
            </Grid>
          </Grid>
        </AccordionSummary>

        <AccordionDetails>
          {loading ? (
            <Grid container spacing={2}>
              <Grid item md={4} xs={12}>
                <LoadingView maxheight="100%" />
              </Grid>
              <Grid item md={4} xs={12}>
                <LoadingView maxheight="100%" />
              </Grid>
              <Grid item md={4} xs={12}>
                <LoadingView maxheight="100%" />
              </Grid>
            </Grid>
          ) : (
            <Grid container spacing={2}>
              <Grid item md={4} xs={12}>
                <ChkyDonutChart
                  data={dataPopulationByGroup.data}
                  colors={dataPopulationByGroup.colors}
                />
              </Grid>
              <Grid item md={4} xs={12}>
                <ChkyDonutChart
                  data={dataPopulationByPremises.data}
                  colors={dataPopulationByPremises.colors}
                  titleChart="By Premises"
                />
              </Grid>
              <Grid item md={4} xs={12}>
                <ChkyDonutChart
                  data={dataPopulationByBrand.data}
                  colors={dataPopulationByBrand.colors}
                  titleChart="By Brand"
                />
              </Grid>
            </Grid>
          )}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

OverviewMachinePopulation.propTypes = {
  dataPopulationByGroup: PropTypes.object,
  dataPopulationByPremises: PropTypes.object,
  dataPopulationByBrand: PropTypes.object,
};
OverviewMachinePopulation.defaultProps = {
  dataPopulationByGroup: dataGroup,
  dataPopulationByPremises: dataPremises,
  dataPopulationByBrand: dataBrand,
};

export default OverviewMachinePopulation;
