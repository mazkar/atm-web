/* eslint-disable import/no-cycle */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { Grid, Typography, Paper, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { RootContext } from '../../../router';
import FloatingChat from '../../../components/GeneralComponent/FloatingChat';
import ModalLoader from '../../../components/ModalLoader';
import Constants from '../../../helpers/constants';
import LongCardSummary from './CardDetailHasilSurvey';
import Calculator from '../../../assets/images/calculator.png';
import { Row, Col } from 'antd';
import { ReactComponent as BackIcon } from '../../../assets/icons/general/arrow_back_red.svg';
import Divider from '@material-ui/core/Divider';
import KondisiMesinPhoto from '../../../assets/images/kondisi-mesin.jpg';
import KondisiRuangPhoto from '../../../assets/images/kondisi-ruang.jpg';
import KondisiBoothPhoto from '../../../assets/images/kondisi-booth.jpg';
import KondisiBelakangPhoto from '../../../assets/images/kondisi-belakang.jpg';
import KondisiMesinPhoto2 from '../../../assets/images/kondisi-mesin-2.jpg';
import KondisiRuangPhoto2 from '../../../assets/images/kondisi-ruang-2.jpg';
import KondisiBoothPhoto2 from '../../../assets/images/kondisi-booth-2.jpg';
import KondisiBelakangPhoto2 from '../../../assets/images/kondisi-belakang-2.jpg';

const useStyles = makeStyles({
    root: {
        padding: '30px 20px 20px 30px',
    },
    title: {
        fontFamily: 'Barlow',
        fontWeight: '500',
        fontSize: '36px',
        color: '#2B2F3C',
    },
    titleContainer: {
        marginBottom: 15,
    },
    tabContent: {
        paddingTop: 10,
        '& .MuiBox-root': {
        padding: 0,
        },
    },
    tableContent: {marginTop: 20,},
    containerPaper: {
        backgroundColor: Constants.color.white,
        borderRadius: 10,
        padding: 15,
        marginTop: 20,
        marginBottom: 40,
    },
    text12Normal: {
        fontSize: 12,
        fontWeight: 400,
    },
    text12Bold: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    text12Italic: {
        fontSize: 12,
        fontWeight: 400,
        fontStyle: 'italic',
    },
    filterSection: {
        padding: "10px 20px 10px 20px",
        borderRadius: 10,
        marginTop: '2%',
        marginBottom: '4%',
        zIndex: 6,
        boxShadow: '0px 6px 6px rgba(232, 238, 255, 0.3)'
    },
    shortCard: {
      border: '1px solid #FFFF',
      borderRadius: 12,
      marginTop: '10px',
      boxShadow: '0px 6px 6px rgba(232, 238, 255, 0.3)'
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
      padding: 2,
    },
    drawer: {
      '& .MuiDrawer-paper': {
        zIndex: 2,
        padding: '90px 0 0',
      },
      width: '400px',
    },
    backAction: {
        backgroundColor: 'unset',
        padding: 0,
        '& .MuiButton-root': {
          padding: 0,
          textTransform: 'none',
          backgroundColor: 'unset',
        },
        '& .MuiButton-root:hover': { opacity: 0.6, backgroundColor: 'unset' },
    },
});


// DEFAULT EXPORT
const HasilSurveyDetail = () => {
  const classes = useStyles();
  const history = useHistory();

  // =========> JOM MODAL LOADER WHER FETCHING DATA
  const [isOpenModalLoader, setModalLoader] = useState(false);

  const dataDetails = [
      {category: 'Kondisi Status ATM', status: 'Online', margin: 640},
      {category: 'Cek fascia bagian atas mesin', status: 'Baik', margin: 590},
      {category: 'Cek fascia bagian bawah mesin', status: 'Baik', margin: 578},
      {category: 'Kondisi Booth', status: 'Baik', margin: 673},
      {category: 'Kondisi Exhaust Fan (Posisi : Di bagian atas booth) ?', status: 'Berfungsi', margin: 450},
      {category: 'Celah Antara Bagian Atas Mesin Dengan Booth (Menghindari Benda Jatuh) ?', status: 'Adjuster rusak', margin: 305},
      {category: 'Kondisi Sticker Kelengkapan Mesin', status: 'Lengkap', margin: 545},
      {category: 'AC', status: 'Baik', margin: 733},
      {category: 'Kondisi AC', status: 'Nyala', margin: 685},
      {category: 'Suhu Ruangan', status: 'Sejuk', margin: 664},
      {category: 'Kondisi Lampu Ruangan', status: 'Nyala', margin: 610},
      {category: 'Informasi Lampu Flag Mounted', status: 'Nyala', margin: 572},
      {category: 'Tuliskan Sisa Token Listrik', status: '245 Kwh', margin: 588},
      {category: 'Informasi Keluhan dari Lingkungan', status: 'Tidak ada', margin: 538},
 ];

  return (
    <div className={classes.root}>
      <Grid container direction="column" spacing={1}>
          <Grid item>
            <Grid container>
                {/* BUTTON BACK */}
                <div className={classes.backAction}>
                <Button onClick={() => history.goBack()}>
                    <BackIcon />
                    <Typography className={classes.backLabel}>Back</Typography>
                </Button>
                </div>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container justify="space-between" className={classes.titleContainer}>
                <Grid item>
                <Typography className={classes.title}>Hasil Survey</Typography>
                </Grid>
            </Grid>
          </Grid>
      </Grid>

      <div>
        <Typography style={{fontSize: '20px', fontWeight: 500}}>
            Sebelum Dibersihkan
        </Typography>
      </div>

        <Row
            gutter={16}
            style={{
              padding: '0px 0 10px 0',
              justifyContent: 'space-between',
            }}
          >
            <Col className="gutter-row" span={6}>
              <div className={classes.shortCard}>
                <LongCardSummary
                    title="Kondisi mesin ATM"
                    status="Kotor"
                    image={KondisiMesinPhoto}
                />
              </div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div className={classes.shortCard}>
                <LongCardSummary
                    title="Kondisi Ruangan ATM"
                    status="Kotor"
                    image={KondisiRuangPhoto}
                />
              </div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div className={classes.shortCard}>
                <LongCardSummary
                    title="Kondisi Booth ATM"
                    status="Kotor"
                    image={KondisiBoothPhoto}
                />
              </div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div className={classes.shortCard}>
                <LongCardSummary
                    title="Kondisi Bagian Belakang ATM"
                    status="Kotor"
                    image={KondisiBelakangPhoto}
                />
              </div>
            </Col>
        </Row>

        <div style={{marginTop: 20}}>
            <Typography style={{fontSize: '20px', fontWeight: 500}}>
                Setelah Dibersihkan
            </Typography>
        </div>

        <Row 
            gutter={16}
            style={{
                padding: '0px 0 10px 0',
                justifyContent: 'space-between',
            }}
        >
            <Col className="gutter-row" span={6}>
              <div className={classes.shortCard}>
                <LongCardSummary
                    title="Kondisi mesin ATM"
                    status="Bersih"
                    image={KondisiMesinPhoto2}
                />
              </div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div className={classes.shortCard}>
                <LongCardSummary
                    title="Kondisi Ruangan ATM"
                    status="Bersih"
                    image={KondisiRuangPhoto2}
                />
              </div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div className={classes.shortCard}>
                <LongCardSummary
                    title="Kondisi Booth ATM"
                    status="Bersih"
                    image={KondisiBoothPhoto2}
                />
              </div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div className={classes.shortCard}>
                <LongCardSummary
                    title="Kondisi Bagian Belakang ATM"
                    status="Bersih"
                    image={KondisiBelakangPhoto2}
                />
              </div>
            </Col>
        </Row>

        <div style={{marginTop: 20}}>
            <Typography style={{fontSize: '20px', fontWeight: 500}}>
                Checklist Kondisi Lokasi
            </Typography>
        </div>

        <Paper elevation={3} className={classes.filterSection}>
            <Grid container direction='row'>
                <Grid item>
                    <Typography style={{fontSize: '13px', fontWeight: 600}}>
                        Kondisi
                    </Typography>
                </Grid>
                <Grid item style={{marginLeft: 705}}>
                    <Typography style={{fontSize: '13px', fontWeight: 600}}>
                        Status
                    </Typography>
                </Grid>
            </Grid>

            {dataDetails.map((item, idx)=>{
                return (
                    <>
                    <Grid container direction='row' style={{marginTop: 10}}>
                    <Grid item>
                        <Typography style={{fontSize: '13px', fontWeight: 400}}>
                            {item.category}
                        </Typography>
                    </Grid>
                    <Grid item style={{marginLeft: item.margin}}>
                        <Typography style={{fontSize: '13px', fontWeight: 400}}>
                            {item.status}
                        </Typography>
                    </Grid>
                    </Grid>
                    {idx++ === 13 || idx++ === '13' ? null : <Divider variant="fullWidth" light="true" style={{marginTop: 10}}/>}
                    </>
                );
            })}
            {/* <Grid container direction='row' style={{marginTop: 10}}>
                <Grid item>
                    <Typography style={{fontSize: '13px', fontWeight: 400}}>
                        Kondisi Status ATM
                    </Typography>
                </Grid>
                <Grid item style={{marginLeft: 640}}>
                    <Typography style={{fontSize: '13px', fontWeight: 400}}>
                        Online
                    </Typography>
                </Grid>
            </Grid>
            <Divider variant="fullWidth" light="true" style={{marginTop: 10}}/> */}

        </Paper>

        {/* <FloatingChat /> */}
        <ModalLoader isOpen={isOpenModalLoader} />
    </div>
  );
};

function mapStateToProps() {
  return {};
}

export default withRouter(
  connect(mapStateToProps)(withTranslation('translations')(HasilSurveyDetail))
);
