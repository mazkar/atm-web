/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/require-default-props */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useParams, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/styles';
import { Paper, Grid, Typography, Table, TableRow, TableCell } from '@material-ui/core';
import axios from 'axios';
import moment from 'moment';
import { ReactComponent as LocIcon } from '../../../../assets/icons/siab/location-icon.svg';
import constants from '../../../../helpers/constants';
import ChkyLeafletMaps from '../../../../components/chky/ChkyLeafletMaps';
import ModalLoader from '../../../../components/ModalLoader';
import LocationMaps from './LocationMaps';

const useLocationStyles = makeStyles({
  tableCell: {
    paddingLeft: 0,
    fontSize: 10,
    borderBottom: 'unset',
  },
  detail: {
    padding: 10,
    border: '1px solid #E6EAF3',
    borderRadius: 10,
  },
  type: {
    fontSize: 11,
    fontWeight: 400,
    color: constants.color.primaryHard,
  },
  address: {
    fontSize: 10,
    color: constants.color.grayMedium
  },
  status: {
    background: '#DEFFE1',
    color: '#65D170',
    border: '1px solid #65D170',
    borderRadius: 30,
    padding: '4px 10px 4px 10px',
    fontSize: 10,
  },
  content: {
    border: '1px solid #E6EAF3',
    borderRadius: 10,
    padding: 10,
    margin: '10px 0px 10px 0px',
  },
  amount: {
    fontSize: 12,
    color: '#DC241F',
    fontWeight: 600,
  }
});

const ContentLocation = (props) => {
  const classes = useLocationStyles();
  const { location } = props;
  // console.log(`====> From Komponen : ${JSON.stringify(location)}`);

  return(
    <div className={classes.content}>
      <Grid container direction="column">
        <Grid item>
          <Grid container direction="row" justify="space-between">
            <Grid item>
              <Typography style={{fontSize: 13, fontWeight: 600}}> 
                {location.locationName}
              </Typography>
            </Grid>
            <Grid item className={classes.status}>
              <Typography style={{fontSize: 10}}>
                {location.condition}
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <Grid container direction="row" justify="flex-start" spacing={2}>
            <Grid item>
              <Typography style={{fontSize: 11}}> 
                {location.atmId}
              </Typography>
            </Grid>
            <Grid item>
              <Typography className={classes.type}>
                {location.openingType}
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <Grid container direction="row" justify="flex-start" spacing={2}>
            <Grid item>
              <Typography className={classes.address}> 
                {location.locationType}
              </Typography>
            </Grid>
            <Grid item>
              <Typography className={classes.address}> 
                {location.locationAddress}
              </Typography>
            </Grid>
            <Grid item>
              <Typography className={classes.address}> 
                {location.distanceInMeter / 1000}Km
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <Grid container direction="row" justify="space-between" alignItems="center">
            <Grid item xs={4}>
              <Table size="small">
                <TableRow className={classes.tableRow}>
                  <TableCell width="50%" className={classes.tableCell}>Periode Sewa</TableCell>
                  <TableCell className={classes.tableCell}>: 
                    {location.rentPeriod} Tahun
                  </TableCell>
                </TableRow>
                <TableRow className={classes.tableRow}>
                  <TableCell width="40%" className={classes.tableCell}>Due Date</TableCell>
                  <TableCell className={classes.tableCell}>: 
                    {moment(location.endRentDate).format('YYYY MM DD')}
                  </TableCell>
                </TableRow>
                <TableRow className={classes.tableRow}>
                  <TableCell width="40%" className={classes.tableCell}>Status</TableCell>
                  <TableCell className={classes.tableCell}>:  
                    {location.openingType}
                  </TableCell>
                </TableRow>
              </Table>
            </Grid>

            <Grid item xs={8}>
              <Grid container direction="row" alignItems="center" justify="space-between" style={{textAlign: 'center'}}>
                <Grid item>
                  <Typography style={{fontSize: 12}}>Average Transaction</Typography>
                  <Typography className={classes.amount}> 
                    {location.averageTransaction}
                  </Typography>
                </Grid> 
                <Grid item>
                  <Typography style={{fontSize: 12}}> CASA </Typography>
                  <Typography className={classes.amount}>
                    {location.cassaAmount}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography style={{fontSize: 12}}>Revenue </Typography>
                  <Typography className={classes.amount}>
                    {location.revenueAmount}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

ContentLocation.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  location: PropTypes.object,
};

const useStyles = makeStyles({
  container: {
    padding: 20
  },
  listLoc: {
    overflowY: 'scroll',
    maxHeight: 500,
    scrollable: 'true',
    marginTop: 5,
    display: 'flex',
    flexDirection: 'column',
  },
});

const PaperLocation = (props) => {
  const classes = useStyles();
  const {dataLocation, position, view} = props;
  const [isOpenModalLoader, setModalLoader] = useState(false);

  // GET ID from URL
  const {id} = useParams();
  const rowID = { "atmId" : id.toString() };
  // alert(`ini${id}`);

  return(
    <Paper className={classes.container}>
      <Grid container direction="row" spacing={2} justify="flex-start">
        <Grid item style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          width: 30, 
          height: 30, 
          backgroundColor: '#FFE9E9', 
          borderRadius: 10}}><LocIcon/></Grid>
        <Grid item>
          <Typography variant="body1" component="h6" style={{fontWeight: 500}}>Location</Typography>
        </Grid>
      </Grid>

      <Grid container direction="row" spacing={3}>
        <Grid item xs={12} md={6} >
          <LocationMaps position={position} view={view}/>
        </Grid>

        <Grid item xs={12} md={6} >
          <Typography variant="body1" component="h6" style={{fontWeight: 500}}>Top 10 Lokasi Terdekat dari ATM ini</Typography>
          <div className={classes.listLoc}>
            {dataLocation.map((item) => (
              <ContentLocation location={item}/>
            ))}
          </div>
          
        </Grid>
      </Grid>
      <ModalLoader isOpen={isOpenModalLoader} />
    </Paper>
  );
};

export default withRouter(PaperLocation);