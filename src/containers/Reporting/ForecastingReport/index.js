/* eslint-disable no-undef */
/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import { Row, Col, Card, Avatar } from 'antd';

import axios from 'axios';
import TotalTransactionForecastingChart from '../../../components/Chart/TotalTransactionForecastingChart';
import ChkyTablePagination from '../../../components/chky/ChkyTablePagination';
import FloatingChat from '../../../components/GeneralComponent/FloatingChat';
import ModalLoader from '../../../components/ModalLoader';
import IconGraph from '../../../assets/icons/siab/icon.png';

import constansts from '../../../helpers/constants';

const useStyles = makeStyles({
  root: {
    padding: '30px 20px 20px 30px',
  },
  titleContainer: {
    marginBottom: 15,
  },
  title: {
    fontFamily: 'Barlow',
    fontWeight: '500',
    fontSize: '36px',
    color: constansts.color.dark,
  },
  tableReport: {
    '& .makeStyles-rootTable-54': {
      marginTop: 20,
    }
  },
  tombolAdd: {textAlign: 'right',},
  filterContainer: {marginBottom: 15,},
  tableContent: {},
});

const { Meta } = Card;
const today = new Date().toLocaleString();

function ForecastingReport() {
  const classes = useStyles();
  // =========> FETCHING DATA
  // modalLoader
  const [isOpenModalLoader, setModalLoader] = useState(false);

  const totalTransactionData = [
    { date: 'Jan', transaction: 10_000_000, type: 'real' },
    { date: 'Feb', transaction: 12_000_000, type: 'real' },
    { date: 'Mar', transaction: 24_500_000, type: 'real' },
    { date: 'Apr', transaction: 13_800_000, type: 'real' },
    { date: 'May', transaction: 34_200_000, type: 'real' },
    { date: 'Jun', transaction: 19_100_000, type: 'real' },
    { date: 'Jul', transaction: 20_000_000, type: 'real' },
    { date: 'Aug', transaction: 25_000_000, type: 'real' },
    { date: 'Sep', transaction: 34_000_000, type: 'real' },
    { date: 'Oct', transaction: 19_000_000, type: 'real' },
    { date: 'Nov', transaction: 20_000_000, type: 'real' },
    { date: 'Des', transaction: 35_000_000, type: 'real' },
    { date: 'Jan', transaction: 16_000_000, type: 'forecast' },
    { date: 'Feb', transaction: 20_000_000, type: 'forecast' },
    { date: 'Mar', transaction: 26_000_000, type: 'forecast' },
    { date: 'Apr', transaction: 14_000_000, type: 'forecast' },
    { date: 'May', transaction: 36_200_000, type: 'forecast' },
    { date: 'Jun', transaction: 21_100_000, type: 'forecast' },
    { date: 'Jul', transaction: 22_000_000, type: 'forecast' },
    { date: 'Aug', transaction: 27_000_000, type: 'forecast' },
    { date: 'Sep', transaction: 34_000_000, type: 'forecast' },
    { date: 'Oct', transaction: 13_000_000, type: 'forecast' },
    { date: 'Nov', transaction: 23_000_000, type: 'forecast' },
    { date: 'Des', transaction: 29_000_000, type: 'forecast' },
  ];  

  const handleYearData = (prevValue) => {
    console.log('year data', prevValue);
  };

  const [monthFilter, setMonthFilter] = useState(totalTransactionData);

  const handleSelectMonth = (newValue) => {
    console.log('month data', newValue);
    if (newValue === 0) {
      setMonthFilter(totalTransactionData.slice(0, 3));
      console.log('3 Months Data');
    } else if (newValue === 1) {
      setMonthFilter(totalTransactionData.slice(0, 4));
      console.log('4 Months Data');
    } else if (newValue === 2) {
      setMonthFilter(totalTransactionData.slice(0, 6));
      console.log('6 Months Data');
    } else if (newValue === 3) {
      setMonthFilter(totalTransactionData.slice(0, 9));
      console.log('9 Months Data');
    } else {
      setMonthFilter(totalTransactionData);
      console.log('A Year Data');
    }
  };

  const titleTable = ['ATM ID','Province','Kecamatan','Jumlah/Quantity','Target Transaction','Forecast/Year'];
  const valueType = ['string','string','string','string','string','forecast'];

  const rowsPerPage = 10;
  const totalPages = '2';
  const totalRows = '20';
  // const [totalPages, setTotalPages] = useState(0); // <--- init default totalPages
  // const [totalRows, setTotalRows] = useState(0);

  const dataTable = [
    { id: '#10029122', province: 'DKI Jakarta', kecamatan: 'Mampang', jumlah: '1.000.000.000', target: '2.000.000.000', forecastTable: '20%' },
    { id: '#10029122', province: 'DKI Jakarta', kecamatan: 'Mampang', jumlah: '1.000.000.000', target: '2.000.000.000', forecastTable: '18%' },
    { id: '#10029122', province: 'DKI Jakarta', kecamatan: 'Mampang', jumlah: '1.000.000.000', target: '2.000.000.000', forecastTable: '32%' },
    { id: '#10029122', province: 'DKI Jakarta', kecamatan: 'Mampang', jumlah: '1.000.000.000', target: '2.000.000.000', forecastTable: '12%' },
    { id: '#10029122', province: 'DKI Jakarta', kecamatan: 'Mampang', jumlah: '1.000.000.000', target: '2.000.000.000', forecastTable: '24%' },
    { id: '#10029122', province: 'DKI Jakarta', kecamatan: 'Mampang', jumlah: '1.000.000.000', target: '2.000.000.000', forecastTable: '14%' },
    { id: '#10029122', province: 'DKI Jakarta', kecamatan: 'Mampang', jumlah: '1.000.000.000', target: '2.000.000.000', forecastTable: '16%' },
    { id: '#10029122', province: 'DKI Jakarta', kecamatan: 'Mampang', jumlah: '1.000.000.000', target: '2.000.000.000', forecastTable: '20%' },
    { id: '#10029122', province: 'DKI Jakarta', kecamatan: 'Mampang', jumlah: '1.000.000.000', target: '2.000.000.000', forecastTable: '20%' },
    { id: '#10029122', province: 'DKI Jakarta', kecamatan: 'Mampang', jumlah: '1.000.000.000', target: '2.000.000.000', forecastTable: '20%' },
  ];

  const handleChangePageValue = () => {
    console.log("change page")
  }

  return (
    <div className={classes.root}>
      <Grid container justify="space-between" className={classes.titleContainer} alignItems="center">
        <Grid item>
          <Typography  className={classes.title}>Forecasting Report</Typography>
        </Grid>
        <Grid item>
          <Typography style={{fontSize: 16, fontWeight: 'bold'}}>Last Update {today} </Typography>
        </Grid>
      </Grid>
      <div className={classes.container}>
        <Row gutter={16} style={{ marginBottom: 20 }}>
          <Col className="gutter-row" span={12}>
            <Card style={{ borderRadius: 10 }}>
              <Meta
                avatar={<Avatar src={IconGraph} />}
                title="Total Transaction"
                description="Rp 32.029.291.201"
              />
            </Card>
          </Col>
          <Col className="gutter-row" span={12}>
            <Card style={{ borderRadius: 10 }}>
              <Meta
                avatar={<Avatar src={IconGraph} />}
                title="Total Penambahan ATM "
                description="24 ATM Baru"
              />
            </Card>
          </Col>
        </Row>

        <TotalTransactionForecastingChart
          data={monthFilter} 
          title= "Total Transaction"
          handleYearData={handleYearData}
          handleSelectMonth={handleSelectMonth}
        />

        <div className={classes.tableReport}>
          <ChkyTablePagination
            data={dataTable}
            fields={titleTable}
            cellOption={valueType}
            totalPages={totalPages}
            rowsPerPage={rowsPerPage}
            totalRows={totalRows}
            changePage={handleChangePageValue}
          />
        </div>
        <div/>
      </div>
      {/* <FloatingChat /> */}
      <ModalLoader isOpen={isOpenModalLoader} />
    
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default withRouter(
  connect(mapStateToProps)(withTranslation('translations')(ForecastingReport))
);