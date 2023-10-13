/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { ReactComponent as MachineIcon } from '../../../assets/icons/siab/vendor.svg';
import ChkyDonutChart from './ChkyDonutChart';
import LoadingView from '../../../components/Loading/LoadingView';
import { ChkyButtons } from '../../../components/chky';
import { Select } from 'antd';

const useStyles = makeStyles({
  superRoot: {
    '& .MuiPaper-elevation1': {
      boxShadow: '0px 6px 6px rgba(232, 238, 255, 0.3)',
    },
    marginTop: '20px',
    marginBottom: '40px'
  },
  root: {
    borderRadius: 10,
  },
  filterSection: {
    padding: "10px 20px 10px 20px",
    borderRadius: 8,
    marginTop: '2%',
    marginBottom: '2%',
    zIndex: 6,
  },
  inputNumber: {
    top: 10,
      borderRadius: 8,
      width: 140,
      '& .ant-input-number-handler-wrap': {
        borderRadius: '0px 8px 8px 0px',
      },
      '& .ant-input-number-input': {
        height: 35,
        fontSize: 'medium',
      },
  },
});

const dataGroup = {
  data: [
    { type: 'Done', value: 20201 },
    { type: 'Open', value: 3329 },
    { type: 'Delay', value: 14257 },
    { type: 'Manual', value: 14257 },
  ],
  colors: ['#DC241F',
  '#FFB443',
  '#780000',
  '#E6EAF3',],
};

const dataPremises = {
  data: [
    { type: 'Done', value: 20201 },
    { type: 'Open', value: 3329 },
    { type: 'Delay', value: 14257 },
    { type: 'Manual', value: 14257 },
  ],
  colors: ['#DC241F',
  '#FFB443',
  '#780000',
  '#E6EAF3',],
};

const dataBrand = {
  data: [
    { type: 'Done', value: 20201 },
    { type: 'Open', value: 3329 },
    { type: 'Delay', value: 14257 },
    { type: 'Manual', value: 14257 },
  ],
  colors: [
    '#DC241F',
    '#FFB443',
    '#780000',
    '#E6EAF3',
  ],
};

const typeSuggestions = [
    { id: 1, value: 'Januari' },
    { id: 2, value: 'Februari' },
    { id: 3, value: 'Maret' },
    { id: 4, value: 'April' },
    { id: 5, value: 'Mei' },
    { id: 6, value: 'Juni' },
    { id: 7, value: 'Juli' },
    { id: 8, value: 'Agustus' },
    { id: 9, value: 'September' },
    { id: 10, value: 'Oktober' },
    { id: 11, value: 'November' },
    { id: 12, value: 'Desember' },
];

const monthsInd = {
    Januari: '01',
    Februari: '02',
    Maret: '03',
    April: '04',
    Mei: '05',
    Juni: '06',
    Juli: '07',
    Agustus: '08',
    September: '09',
    Oktober: '10',
    November: '11',
    Desember: '12',
};

function getMonthMM(m) {
    return monthsInd[m];
};

function handleMonthChange(e) {
    var getM = getMonthMM(e);
    console.log('changed month', getM);
};

function ReportPerformanceVendor(props) {
  const classes = useStyles();
  const {
    dataPopulationByGroup,
    dataPopulationByPremises,
    dataPopulationByBrand,
    loading,
  } = props;

  const changeDataFilter = () => {
    alert("Button Apply Clicked");
  };

  return (
    <div className={classes.superRoot}>
      <Paper elevation={3} className={classes.filterSection}>
          <Grid container direction='row' justify='space-between'>
            <Grid item>
                <Grid container spacing={1}>
                    <Grid item style={{marginTop: '13px'}}>
                        <label style={{fontSize:'13px', fontWeight: 500}}>Bulan :</label>
                    </Grid>
                    <Grid item style={{marginBottom: '15px'}}>
                        <Select
                            className={classes.inputNumber}
                            getPopupContainer={(trigger) => trigger.parentNode}
                            size="large"
                            defaultValue="Januari"
                            size='medium'
                            onChange={handleMonthChange}
                            options={typeSuggestions}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item style={{marginTop: '5px'}}>
                <ChkyButtons onClick={changeDataFilter} height={40} style={{textTransform: 'capitalize' }}>Apply</ChkyButtons>
            </Grid>
          </Grid>
      </Paper>
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
                Nama Vendor
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
                  titleChart="Royal"
                />
              </Grid>
              <Grid item md={4} xs={12}>
                <ChkyDonutChart
                  data={dataPopulationByPremises.data}
                  colors={dataPopulationByPremises.colors}
                  titleChart="Labitrans"
                />
              </Grid>
              <Grid item md={4} xs={12}>
                <ChkyDonutChart
                  data={dataPopulationByBrand.data}
                  colors={dataPopulationByBrand.colors}
                  titleChart="TAM"
                />
              </Grid>
              <Grid item md={4} xs={12}>
                <ChkyDonutChart
                  data={dataPopulationByBrand.data}
                  colors={dataPopulationByBrand.colors}
                  titleChart="HKMA"
                />
              </Grid>
              <Grid item md={4} xs={12}>
                <ChkyDonutChart
                  data={dataPopulationByBrand.data}
                  colors={dataPopulationByBrand.colors}
                  titleChart="Vendor Lain"
                />
              </Grid>
              <Grid item md={4} xs={12}>
                <ChkyDonutChart
                  data={dataPopulationByBrand.data}
                  colors={dataPopulationByBrand.colors}
                  titleChart="Vendor Lain"
                />
              </Grid>
            </Grid>
          )}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

ReportPerformanceVendor.propTypes = {
  dataPopulationByGroup: PropTypes.object,
  dataPopulationByPremises: PropTypes.object,
  dataPopulationByBrand: PropTypes.object,
};

ReportPerformanceVendor.defaultProps = {
  dataPopulationByGroup: dataGroup,
  dataPopulationByPremises: dataPremises,
  dataPopulationByBrand: dataBrand,
};

export default ReportPerformanceVendor;
