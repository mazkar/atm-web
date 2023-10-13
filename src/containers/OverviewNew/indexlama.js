/* eslint-disable no-unused-vars */
import React from 'react';
import { Typography, Grid, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Map, TileLayer, Marker, ZoomControl } from 'react-leaflet';
import { Row, Col, Card, Avatar } from 'antd';

import SearchBar from '../../components/SearchBar';
import TotalTransactionChart from '../../components/Chart/TotalTransactionChart';
import TotalRevenueChart from '../../components/Chart/TotalRevenueChart';
import MachinePopulationChart from '../../components/Chart/MachinePopulationChart';
import FloatingChat from '../../components/GeneralComponent/FloatingChat';

import ModalLogout from './ModalLogout';

import IconGraph from '../../assets/icons/siab/icon.png';

import constants from '../../helpers/constants';

const { Meta } = Card;

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
  machineTypeData: [
    {
      type: 'Withdraw',
      value: 450,
    },
    {
      type: 'Withdraw and Deposit',
      value: 200,
    },
    {
      type: 'E-Banking',
      value: 120,
    },
  ],
};

const useStyles = makeStyles({
  contentHeader: {
    padding: 30,
  },
  contentBody: {
    margin: '0 30px 30px',
    // backgroundColor: 'red',
    height: 'calc(80vh - 10px)',
    zIndex: 1000,
    position: 'relative',
    overflowY: 'scroll',
  },
  title: {
    fontWeight: 500,
    fontSize: 36,
    color: constants.color.dark,
    textShadow: '0px 6px 10px rgba(0, 0, 0, 0.08)',
  },
  maps: {
    width: '100%',
    backgroundColor: constants.color.graySoft,
  },
});

const OverviewNew = () => {
  const { contentHeader, contentBody, title, maps } = useStyles();
  const [showModalLogout, setShowModalLogout] = React.useState(false);

  const { totalTransactionData, totalRevenueData, machineTypeData } = dataset;

  const position = [-7.8289648, 110.3754588];
  return (
    <>
      <Box className={contentHeader}>
        <ModalLogout
          isOpen={showModalLogout}
          onClose={() => setShowModalLogout(false)}
          onLeave={() => window.location.assign('/login')}
        />
        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            <Typography className={title} variant="h1" component="h1">
              Overview
            </Typography>
          </Grid>

          <Grid item>
            <SearchBar
              placeholder="Pencarian berdasarkan lokasi atau ATM ID"
              width={340}
            />
          </Grid>
        </Grid>
      </Box>

      <Box
        className={maps}
        style={{
          height: 'calc(80vh + 18px)',
          marginBottom: `calc(-80vh + 18px)`,
        }}
      >
        <Map
          center={position}
          zoom={7}
          style={{ height: 'calc(80vh + 18px)', width: '100%' }}
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
          />
          <Marker position={position} />
          <ZoomControl position="topright" />
        </Map>
      </Box>

      <Box className={contentBody} id="overview-content-body">
        <Row gutter={16} style={{ marginBottom: '10%' }}>
          <Col className="gutter-row" span={6}>
            <Card style={{ borderRadius: 10 }}>
              <Meta
                avatar={<Avatar src={IconGraph} />}
                title="Total Transaction"
                description="Rp 32.029.291.201"
              />
            </Card>
          </Col>
          <Col className="gutter-row" span={6}>
            <Card style={{ borderRadius: 10 }}>
              <Meta
                avatar={<Avatar src={IconGraph} />}
                title="Total Issue"
                description="Rp 32.029.291.201"
              />
            </Card>
          </Col>
          <Col className="gutter-row" span={6}>
            <Card style={{ borderRadius: 10 }}>
              <Meta
                avatar={<Avatar src={IconGraph} />}
                title="Total Transaction"
                description="Rp 32.029.291.201"
              />
            </Card>
          </Col>
          <Col className="gutter-row" span={6}>
            <Card style={{ borderRadius: 10 }}>
              <Meta
                avatar={<Avatar src={IconGraph} />}
                title="Total Transaction"
                description="Rp 32.029.291.201"
              />
            </Card>
          </Col>
        </Row>
        <Grid container direction="row" spacing={4}>
          <Grid item xs={8}>
            <Grid container direction="column" spacing={4}>
              <Grid item>
                <TotalTransactionChart data={totalTransactionData} />
              </Grid>

              <Grid item>
                <TotalRevenueChart data={totalRevenueData} />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={4}>
            <MachinePopulationChart data={machineTypeData} />
          </Grid>
        </Grid>

        {/* <FloatingChat /> */}
      </Box>
    </>
  );
};

export default OverviewNew;
