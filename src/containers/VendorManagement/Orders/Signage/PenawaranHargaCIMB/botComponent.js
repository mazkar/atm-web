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
import Divider from '@material-ui/core/Divider';
import moment from 'moment';
import { TextFormatted, TextRupiah } from '../../common/FormattedNumber';

const SmallInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
    padding: 0,
    width: '100%',
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
    height: '300px',
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
  primaryButton: {
    color: constants.color.white,
    backgroundColor: constants.color.primaryHard,
    padding: '10px 32px',
    borderRadius: 10,
    border: '1px solid',
    borderColor: `${constants.color.primaryHard}`,
    width: 'max-content',
    height: 40,
  },
  secondaryButton: {
    color: constants.color.primaryHard,
    backgroundColor: constants.color.white,
    padding: '10px 32px',
    borderRadius: 10,
    border: '1px solid',
    borderColor: `${constants.color.primaryHard}`,
    width: 'max-content',
    height: 40,
  },
});

const BottomComponent = ({
  content,
  handleMessage,
  onMessageEnter,
  onSubmit,
  onViewNotEditSurat,
}) => {
  const classes = useStyles();

  const c = content || {};

  const chatHistoryData =
    c.baseComment
      ?.map((val) => ({
        name: val.userName,
        comment: val.message,
        date: moment(val.createdDate).format("DD/MM/YYYY | HH:mm"),
      }))
      .reverse() || [];

  const dataBarang =
    c.biayaBarang?.map((val) => ({
      name: val.nama,
      qty: val.quantity,
      satuan: val.unit,
      harga: val.price,
      jumlah: val.quantity * val.price,
    })) || [];

  const dataJasa =
    c.biayaService?.map((val) => ({
      name: val.nama,
      qty: val.quantity,
      satuan: val.unit,
      harga: val.price,
      jumlah: val.quantity * val.price,
    })) || [];

  const totalHargaBarang = dataBarang.reduce((prev, cur) => {
    return cur.qty != null && cur.harga != null
      ? prev + cur.qty * cur.harga
      : prev;
  }, 0);

  const totalHargaJasa = dataJasa.reduce((prev, cur) => {
    return cur.qty != null && cur.harga != null
      ? prev + cur.qty * cur.harga
      : prev;
  }, 0);

  const subTotal = totalHargaBarang + totalHargaJasa;

  const total = subTotal * (1 + c.ppn * 0.01);

  return (
    <div>
      <Grid container direction="row" spacing={4}>
        <Grid item xs={7}>
          <Paper className={classes.rootPaper}>
            <Grid
              container
              direction="column"
              style={{ padding: "5px 30px 30px 30px" }}
            >
              <Grid item style={{ marginTop: 25 }}>
                <Typography style={{ color: "#2B2F3C", fontWeight: 500 }}>
                  Rincian Biaya Jasa
                </Typography>
              </Grid>

              <Grid item>
                <Box className={classes.boxStyle}>
                  <Grid
                    container
                    direction="row"
                    style={{ marginBottom: 15, marginTop: 10 }}
                  >
                    <Grid item xs={4} style={{ textAlign: "center" }}>
                      <Typography style={{ color: "#2B2F3C", fontWeight: 600 }}>
                        Nama Jasa
                      </Typography>
                    </Grid>
                    <Grid item xs={1} style={{ textAlign: "center" }}>
                      <Typography style={{ color: "#2B2F3C", fontWeight: 600 }}>
                        Qty
                      </Typography>
                    </Grid>
                    <Grid item xs={1} style={{ textAlign: "center" }}>
                      <Typography style={{ color: "#2B2F3C", fontWeight: 600 }}>
                        Satuan
                      </Typography>
                    </Grid>
                    <Grid item xs={3} style={{ textAlign: "center" }}>
                      <Typography style={{ color: "#2B2F3C", fontWeight: 600 }}>
                        Harga
                      </Typography>
                    </Grid>
                    <Grid item xs={3} style={{ textAlign: "center" }}>
                      <Typography style={{ color: "#2B2F3C", fontWeight: 600 }}>
                        Jumlah
                      </Typography>
                    </Grid>
                  </Grid>

                  {dataJasa.map((item) => (
                    <>
                      <Grid container direction="row">
                        <Grid item xs={4} style={{ textAlign: "center" }}>
                          <Typography
                            style={{ color: "#2B2F3C", fontWeight: 400 }}
                          >
                            {item.name}
                          </Typography>
                        </Grid>
                        <Grid item xs={1} style={{ textAlign: "center" }}>
                          <Typography
                            style={{ color: "#2B2F3C", fontWeight: 400 }}
                          >
                            <TextFormatted value={item.qty} />
                          </Typography>
                        </Grid>
                        <Grid item xs={1} style={{ textAlign: "center" }}>
                          <Typography
                            style={{ color: "#2B2F3C", fontWeight: 400 }}
                          >
                            {item.satuan}
                          </Typography>
                        </Grid>
                        <Grid item xs={3} style={{ textAlign: "center" }}>
                          <Typography
                            style={{ color: "#2B2F3C", fontWeight: 400 }}
                          >
                            <TextRupiah value={item.harga} />
                          </Typography>
                        </Grid>
                        <Grid item xs={3} style={{ textAlign: "center" }}>
                          <Typography
                            style={{ color: "#2B2F3C", fontWeight: 600 }}
                          >
                            <TextRupiah value={item.jumlah} />
                          </Typography>
                        </Grid>
                      </Grid>
                      <Divider
                        variant="fullWidth"
                        light="true"
                        style={{ marginTop: 5 }}
                      />
                    </>
                  ))}

                  <Grid
                    container
                    direction="row"
                    style={{ marginTop: 15, marginBottom: 15 }}
                  >
                    <Grid item xs={4} style={{ textAlign: "right" }}>
                      <Typography
                        style={{
                          color: "#2B2F3C",
                          fontWeight: 600,
                          paddingRight: 10,
                        }}
                      >
                        Total Biaya Jasa
                      </Typography>
                    </Grid>
                    <Grid item xs={8} style={{ textAlign: "right" }}>
                      <Typography
                        style={{
                          color: "#2B2F3C",
                          fontWeight: 600,
                          paddingRight: 45,
                        }}
                      >
                        <TextRupiah value={totalHargaJasa} />
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>

              <Grid item style={{ marginTop: 25 }}>
                <Typography style={{ color: "#2B2F3C", fontWeight: 500 }}>
                  Rincian Biaya Barang
                </Typography>
              </Grid>

              <Grid item>
                <Box className={classes.boxStyle}>
                  <Grid
                    container
                    direction="row"
                    style={{ marginBottom: 15, marginTop: 10 }}
                  >
                    <Grid item xs={4} style={{ textAlign: "center" }}>
                      <Typography style={{ color: "#2B2F3C", fontWeight: 600 }}>
                        Nama Barang
                      </Typography>
                    </Grid>
                    <Grid item xs={1} style={{ textAlign: "center" }}>
                      <Typography style={{ color: "#2B2F3C", fontWeight: 600 }}>
                        Qty
                      </Typography>
                    </Grid>
                    <Grid item xs={1} style={{ textAlign: "center" }}>
                      <Typography style={{ color: "#2B2F3C", fontWeight: 600 }}>
                        Satuan
                      </Typography>
                    </Grid>
                    <Grid item xs={3} style={{ textAlign: "center" }}>
                      <Typography style={{ color: "#2B2F3C", fontWeight: 600 }}>
                        Harga
                      </Typography>
                    </Grid>
                    <Grid item xs={3} style={{ textAlign: "center" }}>
                      <Typography style={{ color: "#2B2F3C", fontWeight: 600 }}>
                        Jumlah
                      </Typography>
                    </Grid>
                  </Grid>

                  {dataBarang.map((item) => (
                    <>
                      <Grid container direction="row">
                        <Grid item xs={4} style={{ textAlign: "center" }}>
                          <Typography
                            style={{ color: "#2B2F3C", fontWeight: 400 }}
                          >
                            {item.name}
                          </Typography>
                        </Grid>
                        <Grid item xs={1} style={{ textAlign: "center" }}>
                          <Typography
                            style={{ color: "#2B2F3C", fontWeight: 400 }}
                          >
                            <TextFormatted value={item.qty} />
                          </Typography>
                        </Grid>
                        <Grid item xs={1} style={{ textAlign: "center" }}>
                          <Typography
                            style={{ color: "#2B2F3C", fontWeight: 400 }}
                          >
                            {item.satuan}
                          </Typography>
                        </Grid>
                        <Grid item xs={3} style={{ textAlign: "center" }}>
                          <Typography
                            style={{ color: "#2B2F3C", fontWeight: 400 }}
                          >
                            <TextRupiah value={item.harga} />
                          </Typography>
                        </Grid>
                        <Grid item xs={3} style={{ textAlign: "center" }}>
                          <Typography
                            style={{ color: "#2B2F3C", fontWeight: 600 }}
                          >
                            <TextRupiah value={item.jumlah} />
                          </Typography>
                        </Grid>
                      </Grid>
                      <Divider
                        variant="fullWidth"
                        light="true"
                        style={{ marginTop: 5 }}
                      />
                    </>
                  ))}

                  <Grid
                    container
                    direction="row"
                    style={{ marginTop: 15, marginBottom: 15 }}
                  >
                    <Grid item xs={4} style={{ textAlign: "right" }}>
                      <Typography
                        style={{
                          color: "#2B2F3C",
                          fontWeight: 600,
                          paddingRight: 10,
                        }}
                      >
                        Total Biaya Barang
                      </Typography>
                    </Grid>
                    <Grid item xs={8} style={{ textAlign: "right" }}>
                      <Typography
                        style={{
                          color: "#2B2F3C",
                          fontWeight: 600,
                          paddingRight: 45,
                        }}
                      >
                        <TextRupiah value={totalHargaBarang} />
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>

                <Grid container justify="space-between">
                  <Grid item xs={3} />
                  <Grid item xs={9}>
                    <Grid
                      container
                      direction="column"
                      style={{ marginTop: 20 }}
                    >
                      <Grid item>
                        <Grid container direction="row">
                          <Grid item xs={4}>
                            <Typography
                              style={{
                                color: "#2B2F3C",
                                fontWeight: 400,
                                paddingRight: 10,
                                textAlign: "right",
                              }}
                            >
                              Total Biaya
                            </Typography>
                          </Grid>
                          <Grid item xs={1}>
                            <Typography
                              style={{ color: "#2B2F3C", fontWeight: 400 }}
                            >
                              :
                            </Typography>
                          </Grid>
                          <Grid item xs={2} />
                          <Grid item xs={5}>
                            <Typography
                              style={{
                                color: "#2B2F3C",
                                fontWeight: 600,
                                textAlign: "right",
                              }}
                            >
                              <TextRupiah value={subTotal} />
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Grid container direction="row">
                          <Grid item xs={4}>
                            <Typography
                              style={{
                                color: "#2B2F3C",
                                fontWeight: 400,
                                paddingRight: 10,
                                textAlign: "right",
                              }}
                            >
                              PPN
                            </Typography>
                          </Grid>
                          <Grid item xs={1}>
                            <Typography
                              style={{ color: "#2B2F3C", fontWeight: 400 }}
                            >
                              :
                            </Typography>
                          </Grid>
                          <Grid item xs={2}>
                            <Typography
                              style={{ color: "#2B2F3C", fontWeight: 600 }}
                            >
                              <span
                                style={{
                                  border: "1px solid #BCC8E7",
                                  borderRadius: 8,
                                  padding: 15,
                                  fontWeight: "normal",
                                  color: " #8D98B4",
                                  fontStyle: "italic",
                                }}
                              >
                                {c.ppn}
                              </span>{" "}
                              %{" "}
                            </Typography>
                          </Grid>
                          <Grid item xs={5}>
                            <Typography
                              style={{
                                color: "#2B2F3C",
                                fontWeight: 600,
                                textAlign: "right",
                              }}
                            >
                              <TextRupiah value={(c.ppn / 100) * subTotal} />
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Grid container direction="row">
                          <Grid item xs={4}>
                            <Typography
                              style={{
                                color: "#2B2F3C",
                                fontWeight: 400,
                                paddingRight: 10,
                                textAlign: "right",
                              }}
                            >
                              Total Biaya + PPN{" "}
                            </Typography>
                          </Grid>
                          <Grid item xs={1}>
                            <Typography
                              style={{ color: "#2B2F3C", fontWeight: 400 }}
                            >
                              :
                            </Typography>
                          </Grid>
                          <Grid item xs={2} />
                          <Grid item xs={5}>
                            <Typography
                              style={{
                                color: "#2B2F3C",
                                fontWeight: 600,
                                textAlign: "right",
                              }}
                            >
                              <TextRupiah value={total} />
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

                {/* <Grid container direction='row' style={{ marginTop: 15, marginBottom: 15 }}>
                  <Grid item xs={8} style={{ textAlign: 'right' }}>
                    <Typography style={{ color: '#2B2F3C', fontWeight: 400, paddingRight: 10 }}>
                      Total Biaya :
                    </Typography>
                  </Grid>
                  <Grid item xs={4} style={{ textAlign: 'right' }}>
                    <Typography style={{ color: '#2B2F3C', fontWeight: 600, paddingRight: 100 }}>
                      <TextRupiah value={subTotal} />
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container direction='row' style={{ marginTop: 15, marginBottom: 15 }}>
                  <Grid item xs={8} style={{ textAlign: 'right' }}>
                    <Typography style={{ color: '#2B2F3C', fontWeight: 400, paddingRight: 10 }}>
                      PPN :
                    </Typography>
                  </Grid>
                  <Grid item xs={4} style={{ textAlign: 'right' }}>
                    <Typography style={{ color: '#2B2F3C', fontWeight: 600, paddingRight: 100 }}>
                      <TextFormatted value={c.ppn} /> %
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container direction='row' style={{ marginTop: 15, marginBottom: 15 }}>
                  <Grid item xs={8} style={{ textAlign: 'right' }}>
                    <Typography style={{ color: '#2B2F3C', fontWeight: 400, paddingRight: 10 }}>
                      Total Biaya+PPN :
                    </Typography>
                  </Grid>
                  <Grid item xs={4} style={{ textAlign: 'right' }}>
                    <Typography style={{ color: '#2B2F3C', fontWeight: 600, paddingRight: 100 }}>
                      <TextRupiah value={total} />
                    </Typography>
                  </Grid>
                </Grid> */}
              </Grid>
            </Grid>

            <Grid item style={{ padding: 30 }}>
              <Grid container justify="space-between">
                <Grid item>
                  <Button
                    variant="contained"
                    disableElevation
                    className={classes.secondaryButton}
                    onClick={() => onViewNotEditSurat(true)}
                    style={{ textTransform: "capitalize" }}
                  >
                    View Surat
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    disableElevation
                    className={classes.primaryButton}
                    onClick={() => onSubmit(true)}
                    style={{ textTransform: "capitalize" }}
                    disabled={c?.countApproval >= 2}
                  >
                    Terima Penawaran
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={5}>
          <Paper className={classes.rootPaper}>
            <Grid
              container
              direction="column"
              style={{ padding: 20, width: "100%" }}
            >
              <Grid item>
                <SmallInput
                  style={{ height: "23px" }}
                  onChange={handleMessage}
                  onKeyUp={onMessageEnter}
                  placeholder="Masukkan Pesan Anda"
                />
              </Grid>
              <Grid item style={{ marginTop: 5 }}>
                <Box className={classes.boxStyle}>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      padding: "5px 0px",
                      alignItems: "center",
                      zIndex: 2,
                    }}
                  >
                    {chatHistoryData.map((data) => (
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

export default withRouter(
  connect(mapStateToProps)(withTranslation('translations')(BottomComponent))
);
