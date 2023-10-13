/* eslint-disable import/no-cycle */
import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Grid, Typography, Button, Paper, InputBase, Box } from '@material-ui/core';
import { useHistory, useParams, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { PrimaryHard } from '../../../../../assets/theme/colors';
import constants from '../../../../../helpers/constants';
import ChatHistory from '../../common/chatHistory';
import moment from 'moment';

const SmallInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
    padding: 0,
  },
  input: {
    borderRadius: 6,
    position: 'relative',
    backgroundColor: (props) => props.backgroundColor, //theme.palette.common.white,
    fontSize: 15,
    width: '100%',
    height: '100%',
    padding: '7px 9px',
    border: '1px solid #BCC8E7',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderColor: PrimaryHard,
    },
  },
}))(InputBase);

const useStyles = makeStyles({
  rootPaper: {
    width: '100%',
    minHeight: '550px',
    height: '100%',
    borderRadius: 10,
    boxShadow: '0px 6px 6px rgba(232, 238, 255, 0.3)',
  },
  boxStyle: {
    padding: '15px 15px',
    position: 'relative',
    borderRadius: 10,
    marginTop: 20,
    border: '1px solid #BCC8E7',
    backgroundColor: '#fff',
    width: '96%',
    '&::after': {
      content: '""',
      position: 'absolute',
      width: 20,
      height: '125%',
      left: -37,
      backgroundColor: '#fff',
      top: -100,
      zIndex: 1,
    },
    height: '370px',
    overflow: 'auto',
    overflowX: 'hidden',
    '&::-webkit-scrollbar': {
      width: '5px',
    },
    '&::-webkit-scrollbar-track': {
      background: '#F4F7FB',
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#BCC8E7',
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: '#9AC2FF',
    },
  },
});

const TopComponent = ({ content, messageHandler, onMessageEnter }) => {
  const classes = useStyles();

  const c = content || {};

  const coordArr = c.latLong?.split(',') || [];

  const fieldInformasiPenawaran = [
    { label1: 'No Ticket', value1: c.ticket, label2: 'PIC / Vendor', value2: c.namaVendor },
    {
      label1: 'Tgl Request',
      value1: c.requestDate ? moment(c.requestDate).format('DD/MM/YYYY') : '-',
      label2: 'ID Location',
      value2: c.locationId,
    },
    {
      label1: 'User Request',
      value1: c.userRequest,
      label2: 'Nama Lokasi',
      value2: c.locationName,
    },
    { label1: 'Jenis Pekerjaan', value1: c.jenisPekerjaan, label2: 'Alamat', value2: c.address },
    {
      label1: 'Due Date',
      value1: c.dueDate ? moment(c.dueDate).format('DD/MM/YYYY') : '-',
      label2: 'Area',
      value2: c.area,
    },
    { label1: 'ID Mesin', value1: c.idMesin, label2: 'City', value2: c.city },
    {
      label1: 'Notes & Desc',
      value1: c.noteDesc,
      label2: 'Lat Long',
      value2: `Lat ${coordArr[0]}\nLong ${coordArr[1]}`,
    },
  ];

  const chatHistoryData = c?.baseComment
    ?.map((val) => ({
      name: val.userName,
      comment: val.message,
      date: moment(val.createdDate).format('DD/MM/YYYY | HH:mm'),
    }))
    .reverse();

  return (
    <div>
      <Grid container direction='row' spacing={4}>
        <Grid item xs={7}>
          <Paper className={classes.rootPaper}>
            {fieldInformasiPenawaran.map((data) => {
              return (
                <Grid item style={{ paddingTop: 20, paddingLeft: '20px', width: '100%' }}>
                  <Grid container direction='row'>
                    <Grid item xs={6}>
                      <Grid container direction='row'>
                        <Grid item style={{ width: '100%' }}>
                          <Grid container direction='row'>
                            <Grid item xs={4}>
                              <Typography style={{ fontWeight: 400, color: '#2B2F3C' }}>
                                {data.label1}
                              </Typography>
                            </Grid>
                            <Grid item xs={1}>
                              <Typography style={{ paddingLeft: 10 }}>{`:`}</Typography>
                            </Grid>
                            <Grid item xs={5} justify='flex-start'>
                              <Typography
                                style={{
                                  fontWeight: 600,
                                  color: '#2B2F3C',
                                  wordWrap: 'break-word',
                                }}
                              >
                                {data.value1}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={5}>
                      <Grid container direction='row'>
                        <Grid item xs={5}>
                          <Typography style={{ fontWeight: 400, color: '#2B2F3C' }}>
                            {data.label2}
                          </Typography>
                        </Grid>
                        <Grid item xs={1}>
                          <Typography style={{ paddingLeft: 10 }}>{`:`}</Typography>
                        </Grid>
                        <Grid item xs={6} justify='flex-start'>
                          <Typography
                            style={{ fontWeight: 600, color: '#2B2F3C', wordWrap: 'break-word' }}
                          >
                            {data.value2}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              );
            })}
          </Paper>
        </Grid>

        <Grid item xs={5}>
          <Paper className={classes.rootPaper}>
            <Grid
              container
              direction='column'
              style={{ paddingTop: 25, paddingLeft: '20px', width: '100%' }}
            >
              <Grid item>
                <SmallInput
                  style={{ width: '96%', height: '23px' }}
                  onChange={(e) => messageHandler(e.target.value)}
                  onKeyUp={onMessageEnter}
                  placeholder='Masukkan Pesan Anda'
                />
              </Grid>
              <Grid item>
                <Box className={classes.boxStyle}>
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      padding: '5px 0px',
                      alignItems: 'center',
                      zIndex: 2,
                    }}
                  >
                    {chatHistoryData?.map((data) => (
                      <ChatHistory
                        name={data.name}
                        comment={data.comment}
                        date={data.date}
                        showName
                      />
                    ))}
                  </div>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

function mapStateToProps() {
  return {};
}

export default withRouter(connect(mapStateToProps)(withTranslation('translations')(TopComponent)));
