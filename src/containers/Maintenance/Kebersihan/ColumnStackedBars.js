/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Paper
} from '@material-ui/core';
import { ChkyButtons } from '../../../components/chky';
import { Select, InputNumber } from 'antd';
import {
    Chart,
    ArgumentAxis,
    ValueAxis,
    BarSeries,
    Title,
    Legend
} from "@devexpress/dx-react-chart-material-ui";
import { Stack, Animation } from "@devexpress/dx-react-chart";
import { stackOffsetExpand } from "d3-shape";

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
  select: {
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
  inputNumber: {
    top: 10,
    borderRadius: 8,
    width: 140,
    height: 33,
    padding: 5,
  },
});

const kebersihan = [
    {
      year: '1', saudiArabia: 241.142, usa: 482.150, iran: 230.174, price: 17, consumption: 570,
    }, {
      year: '2', saudiArabia: 511.334, usa: 437.343, iran: 75.097, price: 104, consumption: 630,
    }, {
      year: '3', saudiArabia: 324.359, usa: 374.867, price: 23.7, consumption: 590,
    }, {
      year: '4', saudiArabia: 410.060, usa: 297.513, price: 28.3, consumption: 680,
    }, {
      year: '5', saudiArabia: 413.505, price: 79.6, consumption: 640,
    }, {
      year: '6', saudiArabia: 516.157, price: 52.4, consumption: 790,
    },{
      year: '7', saudiArabia: 241.142, price: 17, consumption: 570,
    },{
      year: '8', saudiArabia: 241.142, price: 17, consumption: 570,
    },{
      year: '9', saudiArabia: 241.142,
    },{
      year: '10', saudiArabia: 241.142,
    },{
        year: '11', saudiArabia: 241.142,
    },{
        year: '12', saudiArabia: 241.142,
    },{
        year: '13', saudiArabia: 241.142,
    },{
        year: '14', saudiArabia: 241.142,
    },{
        year: '15', saudiArabia: 241.142,
    },{
        year: '16', saudiArabia: 241.142,
    },{
        year: '17', saudiArabia: 241.142,
    },{
        year: '18', saudiArabia: 241.142,
    },{
        year: '19', saudiArabia: 241.142,
    },{
        year: '20', saudiArabia: 241.142,
    },
];

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

const today = new Date();
const year = today.getFullYear();

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

const typeVendorSuggestions = [
    { id: 1, value: 'All' },
    { id: 2, value: 'Nama Vendor' },
    { id: 3, value: 'Nama Vendor' },
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

function ColumnStackedBar(props) {
  const classes = useStyles();
  const {} = props;

const changeDataFilter = () => {
    alert("Button Apply Clicked");
};

const handleShowingOnChange = (value, defaultValue) => {
    console.log('changed year', value);
};

const format = (scale) => scale.tickFormat(null, "%");

return (
    <div className={classes.superRoot}>
      <Paper elevation={3} className={classes.filterSection}>
          <Grid container direction='row' justify='space-between'>
            <Grid item>
                <Grid container spacing={1}>
                    <Grid item style={{marginTop: '13px'}}>
                        <label style={{fontSize:'13px', fontWeight: 500}}>ATM ID :</label>
                    </Grid>
                    <Grid item>
                        <Select
                            className={classes.select}
                            getPopupContainer={(trigger) => trigger.parentNode}
                            size="medium"
                            defaultValue="All"
                            onChange={handleMonthChange}
                            options={typeVendorSuggestions}
                        />
                    </Grid>

                    <Grid item style={{marginTop: '13px'}}>
                        <label style={{fontSize:'13px', fontWeight: 500}}>Nama Vendor :</label>
                    </Grid>
                    <Grid item>
                        <Select
                            className={classes.select}
                            getPopupContainer={(trigger) => trigger.parentNode}
                            size="medium"
                            defaultValue="All"
                            onChange={handleMonthChange}
                            options={typeVendorSuggestions}
                        />
                    </Grid>

                    <Grid item style={{marginTop: '13px'}}>
                        <label style={{fontSize:'13px', fontWeight: 500}}>Periode Bulan :</label>
                    </Grid>
                    <Grid item style={{marginBottom: '15px'}}>
                        <Select
                            className={classes.select}
                            getPopupContainer={(trigger) => trigger.parentNode}
                            size="medium"
                            defaultValue="Januari"
                            onChange={handleMonthChange}
                            options={typeSuggestions}
                        />
                    </Grid>
                    <Grid item>
                        <InputNumber
                            className={classes.inputNumber}
                            min={year - 10}
                            max={year + 1}
                            defaultValue={year}
                            size="small"
                            onChange={handleShowingOnChange}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item style={{marginTop: '5px'}}>
                <ChkyButtons onClick={changeDataFilter} height={40} style={{textTransform: 'capitalize' }}>Apply</ChkyButtons>
            </Grid>
          </Grid>

            <Chart data={kebersihan} height={300}>
                <ArgumentAxis />
                {/* <ValueAxis tickFormat={format} /> */}

                <BarSeries name="Saudi Arabia" valueField="saudiArabia" argumentField="year"/>
                <BarSeries name="USA" valueField="usa" argumentField="year" />
                <BarSeries name="Iran" valueField="iran" argumentField="year" />
                <BarSeries name="Mexico" valueField="mexico" argumentField="year" />
                <BarSeries name="Russia" valueField="russia" argumentField="year" />
                <Animation />
                {/* <Legend
                    position="bottom"
                    rootComponent={Root}
                    labelComponent={Label}
                /> */}
                {/* <Title text="Oil Production" /> */}
                <Stack
                    stacks={[
                    { series: ["Saudi Arabia", "USA", "Iran", "Mexico", "Russia"] }
                    ]}
                    offset={stackOffsetExpand}
                />
            </Chart>

      </Paper>
    </div>
  );
}

ColumnStackedBar.propTypes = {
  dataPopulationByGroup: PropTypes.object,
  dataPopulationByPremises: PropTypes.object,
  dataPopulationByBrand: PropTypes.object,
};

ColumnStackedBar.defaultProps = {
  dataPopulationByGroup: dataGroup,
  dataPopulationByPremises: dataPremises,
  dataPopulationByBrand: dataBrand,
};

export default ColumnStackedBar;
