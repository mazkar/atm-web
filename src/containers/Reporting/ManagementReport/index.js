/* eslint-disable no-undef */
/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';

import { Grid, Typography } from '@material-ui/core';
import axios from 'axios';
import { Row, Col, Card, Avatar } from 'antd';
import { ChkyDownloadButton, ChkyFilterMaster, ChkyTablePagination, ChkyFilterManagementReport } from '../../../components/chky';
import FloatingChat from '../../../components/GeneralComponent/FloatingChat';
import ModalLoader from '../../../components/ModalLoader';
import constansts from '../../../helpers/constants';
import TotalTransactionChart from '../../../components/Chart/TotalTransactionChart';
import TotalRevenueChart from '../../../components/Chart/TotalRevenueChart';
import IconGraph from '../../../assets/icons/siab/icon.png';

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
  tombolAdd: {textAlign: 'right',},
  filterContainer: {marginBottom: 15,},
  tableContent: {},
});

// init data table Fields and valueTypes
const titleTable = ['ATM ID','City','Kecamatan','Cost/Year','Transaction','Total Issue','Target Transaction','Medical','Recommendation'];
const valueType = ['string','string','string','string','string','string','string','string','string'];

const dataTable = [
  {
    atmId: '#1002912',
    City: 'Jakarta',
    Kecamatan: 'Mampang',
    Cost: 'Rp 3.000.000',
    Transaction: '1.000.000.000',
    TotalIssue: '18',
    Target: '2.000.000.000',
    Medical: 'Bad',
    Recommendation: 'Teminate',
  },
  {
    atmId: '#1002912',
    City: 'Jakarta',
    Kecamatan: 'Mampang',
    Cost: 'Rp 3.000.000',
    Transaction: '1.000.000.000',
    TotalIssue: '18',
    Target: '2.000.000.000',
    Medical: 'Bad',
    Recommendation: 'Teminate',
  },
  {
    atmId: '#1002912',
    City: 'Jakarta',
    Kecamatan: 'Mampang',
    Cost: 'Rp 3.000.000',
    Transaction: '1.000.000.000',
    TotalIssue: '18',
    Target: '2.000.000.000',
    Medical: 'Bad',
    Recommendation: 'Teminate',
  },
  {
    atmId: '#1002912',
    City: 'Jakarta',
    Kecamatan: 'Mampang',
    Cost: 'Rp 3.000.000',
    Transaction: '1.000.000.000',
    TotalIssue: '18',
    Target: '2.000.000.000',
    Medical: 'Bad',
    Recommendation: 'Teminate',
  },
  {
    atmId: '#1002912',
    City: 'Jakarta',
    Kecamatan: 'Mampang',
    Cost: 'Rp 3.000.000',
    Transaction: '1.000.000.000',
    TotalIssue: '18',
    Target: '2.000.000.000',
    Medical: 'Bad',
    Recommendation: 'Teminate',
  },
  {
    atmId: '#1002912',
    City: 'Jakarta',
    Kecamatan: 'Mampang',
    Cost: 'Rp 3.000.000',
    Transaction: '1.000.000.000',
    TotalIssue: '18',
    Target: '2.000.000.000',
    Medical: 'Bad',
    Recommendation: 'Teminate',
  },
  {
    atmId: '#1002912',
    City: 'Jakarta',
    Kecamatan: 'Mampang',
    Cost: 'Rp 3.000.000',
    Transaction: '1.000.000.000',
    TotalIssue: '18',
    Target: '2.000.000.000',
    Medical: 'Bad',
    Recommendation: 'Teminate',
  },
  {
    atmId: '#1002912',
    City: 'Jakarta',
    Kecamatan: 'Mampang',
    Cost: 'Rp 3.000.000',
    Transaction: '1.000.000.000',
    TotalIssue: '18',
    Target: '2.000.000.000',
    Medical: 'Bad',
    Recommendation: 'Teminate',
  },
  {
    atmId: '#1002912',
    City: 'Jakarta',
    Kecamatan: 'Mampang',
    Cost: 'Rp 3.000.000',
    Transaction: '1.000.000.000',
    TotalIssue: '18',
    Target: '2.000.000.000',
    Medical: 'Bad',
    Recommendation: 'Teminate',
  },
  {
    atmId: '#1002912',
    City: 'Jakarta',
    Kecamatan: 'Mampang',
    Cost: 'Rp 3.000.000',
    Transaction: '1.000.000.000',
    TotalIssue: '18',
    Target: '2.000.000.000',
    Medical: 'Bad',
    Recommendation: 'Teminate',
  },
];

const dataset = {
  totalTransactionData: [
    { date: 'Jan', transaction: 10_000_000 },
    { date: 'Feb', transaction: 12_000_000 },
    { date: 'Mar', transaction: 24_500_000 },
    { date: 'Apr', transaction: 13_800_000 },
    { date: 'May', transaction: 34_200_000 },
    { date: 'Jun', transaction: 19_100_000 },
    { date: 'Jul', transaction: 20_000_000 },
  ],
  totalRevenueData: [
    { date: 'Jan', revenue: 10_000_000 },
    { date: 'Feb', revenue: 12_000_000 },
    { date: 'Mar', revenue: 24_500_000 },
    { date: 'Apr', revenue: 13_800_000 },
    { date: 'May', revenue: 34_200_000 },
    { date: 'Jun', revenue: 19_100_000 },
    { date: 'Jul', revenue: 20_000_000 },
    { date: 'Aug', revenue: 13_000_000 },
    { date: 'Sep', revenue: 12_420_000 },
    { date: 'Oct', revenue: 7_800_000 },
    { date: 'Nov', revenue: 21_920_000 },
    { date: 'Dec', revenue: 12_830_000 },
  ],
};

const { Meta } = Card;

function ManagementReport() {
  const classes = useStyles();
  // =========> FETCHING DATA
  // modalLoader
  const [isOpenModalLoader, setModalLoader] = useState(false);
  const { totalTransactionData, totalRevenueData} = dataset;

  return (
    <div className={classes.root}>
      <Grid container justify="space-between" className={classes.titleContainer} alignItems="center">
        <Grid item>
          <Typography  className={classes.title}>Management Report</Typography>
        </Grid>
      </Grid>
      <div className={classes.container}>
        <div className={classes.filterContainer}>
          <ChkyFilterManagementReport />
        </div>
        <Row gutter={16} style={{ marginBottom: '3%' }}>
          <Col className="gutter-row" span={8}>
            <Card style={{ borderRadius: 10 }}>
              <Meta
                avatar={<Avatar src={IconGraph} />}
                title="Total Transaction"
                description="Rp 32.029.291.201"
              />
            </Card>
          </Col>
          <Col className="gutter-row" span={8}>
            <Card style={{ borderRadius: 10 }}>
              <Meta
                avatar={<Avatar src={IconGraph} />}
                title="Total Issue"
                description="Rp 32.029.291.201"
              />
            </Card>
          </Col>
          <Col className="gutter-row" span={8}>
            <Card style={{ borderRadius: 10 }}>
              <Meta
                avatar={<Avatar src={IconGraph} />}
                title="Total Transaction"
                description="Rp 32.029.291.201"
              />
            </Card>
          </Col>
        </Row>
        <Grid item xs={12} style={{marginBottom: '3%'}}>
          <Grid container direction="column" spacing={4}>
            <Grid item>
              <TotalTransactionChart data={totalTransactionData} />
            </Grid>

            <Grid item>
              <TotalRevenueChart data={totalRevenueData} />
            </Grid>
          </Grid>
        </Grid>
        <div item className={classes.tableContent}>
          <ChkyTablePagination
            data={dataTable}
            fields={titleTable}
            cellOption={valueType}
            // totalPages={totalPages}
            // rowsPerPage={rowsPerPage}
            // totalRows={totalRows}
            // changePage={handleChangePageValue}
          />
        </div>
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
  connect(mapStateToProps)(withTranslation('translations')(ManagementReport))
);