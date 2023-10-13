/* eslint-disable react/prop-types */
/* eslint-disable import/no-cycle */
import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Grid, Typography, Button, Paper, InputBase, Box } from "@material-ui/core";
import { useHistory, useParams, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { PrimaryHard } from '../../../../../assets/theme/colors';
import constants from "../../../../../helpers/constants";
import ChatHistory from '../../common/chatHistory';
import { thousandFormat } from "../../../../../helpers/useFormatter";
import useTimestampConverter from "../../../../../helpers/useTimestampConverter";
import moment from 'moment'

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
    backgroundColor: (props) => props.backgroundColor, // theme.palette.common.white,
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
    height: "100%",
    borderRadius: 10,
    boxShadow: '0px 6px 6px rgba(232, 238, 255, 0.3)'
  },
  boxStyle: {
    padding: "15px 15px",
    position: "relative",
    borderRadius: 10,
    marginTop: 20,
    border: "1px solid #BCC8E7",
    backgroundColor: "#fff",
    width: "96%",
    "&::after": {
      content: '""',
      position: "absolute",
      width: 20,
      height: "125%",
      left: -37,
      backgroundColor: "#fff",
      top: -100,
      zIndex: 1,
    },
    height: "370px",
    overflow: "auto",
    overflowX: "hidden",
    "&::-webkit-scrollbar": {
      width: "5px",
    },
    "&::-webkit-scrollbar-track": {
      background: "#F4F7FB",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#BCC8E7",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: "#9AC2FF",
    },
  },
  primaryButton: {
    color: constants.color.white,
    backgroundColor: '#65D170',
    padding: "10px 32px",
    borderRadius: 10,
    border: "1px solid",
    borderColor: '#65D170',
    width: 'max-content',
    height: 40,
    marginRight: 65,
  },
  secondaryButton: {
    color: constants.color.white,
    backgroundColor: constants.color.primaryHard,
    padding: "10px 32px",
    borderRadius: 10,
    border: "1px solid",
    borderColor: `${constants.color.primaryHard}`,
    width: 'max-content',
    height: 40,
    marginLeft: 35,
  },
  textButton: {
    color: constants.color.primaryHard,
    backgroundColor: constants.color.white,
    padding: "10px 32px",
    borderRadius: 10,
    width: 'max-content',
    height: 40,
    marginLeft: 35,
  },
});

const chatHistoryData = [
  {name:'Deden Hidayat', comment: 'Untuk pesanannya warnanya kurang sesuai', date:'10/12/2020 | 16:18'},
  {name:'Adam Rizananda', comment: 'Ada perubahan ukuran dari requirement awalnya', date:'05/12/2020 | 16:18'},
  {name:'Ghefira FS', comment: 'Ada perubahan ukuran dari requirement awalnya', date:'01/12/2020 | 16:18'},
  {name:'Deden Hidayat', comment: 'Ada perubahan ukuran dari requirement awalnya', date:'10/12/2020 | 16:18'},
  {name:'Deden Hidayat', comment: 'Ada perubahan ukuran dari requirement awalnya', date:'10/12/2020 | 16:18'},
  {name:'Deden Hidayat', comment: 'Ada perubahan ukuran dari requirement awalnya', date:'10/12/2020 | 16:18'},
];

const dataJasa = [
  {id: 1, name: 'Biaya Pemasangan AC dan Perawatan AC :', qty: '1', satuan: 'Jam', harga: 'Rp.500.000.000', jumlah: 'Rp.500.000.000'},
  {id: 2, name: 'Biaya Pemasangan AC dan Perawatan AC :', qty: '1', satuan: 'Jam', harga: 'Rp.500.000.000', jumlah: 'Rp.500.000.000'},
  {id: 3, name: 'Biaya Pemasangan AC dan Perawatan AC :', qty: '1', satuan: 'Jam', harga: 'Rp.500.000.000', jumlah: 'Rp.500.000.000'},
];

const dataBarang = [
  {id: 1, name: 'Biaya Pemasangan AC dan Perawatan AC :', qty: '1', satuan: 'Jam', harga: 'Rp.500.000.000', jumlah: 'Rp.500.000.000'},
  {id: 2, name: 'Biaya Pemasangan AC dan Perawatan AC :', qty: '1', satuan: 'Jam', harga: 'Rp.500.000.000', jumlah: 'Rp.500.000.000'},
  {id: 3, name: 'Biaya Pemasangan AC dan Perawatan AC :', qty: '1', satuan: 'Jam', harga: 'Rp.500.000.000', jumlah: 'Rp.500.000.000'},
];

const BottomComponent = ({onViewSurat, onSubmit, onReject, data, handleMessage, onMessageEnter}) => {
  const classes = useStyles();
  const { id } = useParams();

  //   useEffect(() => {
  //     console.log("Data Bot: ", data && data.comments);
  //   }, [data]);

  return (
    <div>
      <Grid container direction='row' spacing={4}>

        <Grid item xs={7}>
          <Paper className={classes.rootPaper}>
            <Grid container direction="column" style={{padding: '5px 30px 30px 30px'}}>
              
              <Grid item style={{marginTop: 25}}>
                <Grid container justifyContent="space-between">
                  <Grid item>
                    <Typography style={{ color: "#2B2F3C", fontWeight: 500 }}>Rincian Biaya Jasa</Typography>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="text"
                      disableElevation
                      className={classes.textButton}
                      onClick={()=>onViewSurat(true)}
                      style={{ textTransform: "capitalize" }}
                    >
                      View Surat
                    </Button>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item>
                <Box className={classes.boxStyle}>
                  {data && data.serviceFeeList.map((item) => (
                    <Grid container direction='row'>
                      <Grid item xs={6} style={{textAlign: 'left'}}>
                        <Typography style={{ color: "#2B2F3C", fontWeight: 400, paddingTop: 10, paddingRight: 10 }}>{item.name && item.name !== ""? item.name : 'N/A'}</Typography>
                      </Grid>
                      <Grid item xs={1} style={{textAlign: 'left'}}>
                        <Typography style={{ color: "#2B2F3C", fontWeight: 400, paddingTop: 10 }}>: </Typography>
                      </Grid>
                      <Grid item xs={5} style={{textAlign: 'right', marginTop: 15}}>
                        <Typography style={{ color: "#2B2F3C", fontWeight: 600 }}>{item.price ? `Rp. ${thousandFormat(item.price)}` : '-'}</Typography>
                      </Grid>
                    </Grid>
                  ))}

                  <Grid container direction='row' style={{marginTop: 15, marginBottom: 15}}>
                    <Grid item xs={6} style={{textAlign: 'right'}}>
                      <Typography style={{ color: "#2B2F3C", fontWeight: 600, paddingRight: 10 }}>Total Biaya Jasa</Typography>
                    </Grid>
                    <Grid item xs={1} style={{textAlign: 'left'}}>
                      <Typography style={{ color: "#2B2F3C", fontWeight: 600}}>: </Typography>
                    </Grid>
                    <Grid item xs={5} style={{textAlign: 'right'}}>
                      <Typography style={{ color: "#2B2F3C", fontWeight: 600, paddingRight: 0 }}>{data && data.totalServiceFee  ? `Rp. ${thousandFormat(data.totalServiceFee )}` : '-'}</Typography>
                    </Grid>
                  </Grid>

                </Box>
              </Grid>

              <Grid item style={{marginTop: 25}}>
                <Grid container justifyContent="space-between">
                  <Grid item>
                    <Typography style={{ color: "#2B2F3C", fontWeight: 500 }}>Rincian Biaya Barang</Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item>
                <Box className={classes.boxStyle}>
                  {data && data.goodsCostList.map((item) => (
                    <>
                      <Grid container direction='row'>
                        <Grid item xs={6} style={{textAlign: 'left'}}>
                          <Typography style={{ color: "#2B2F3C", fontWeight: 400, paddingTop: 10, paddingRight: 10  }}>{item.name && item.name !== ""? item.name : 'N/A'}</Typography>
                        </Grid>
                        <Grid item xs={1} style={{textAlign: 'left'}}>
                          <Typography style={{ color: "#2B2F3C", fontWeight: 400, paddingTop: 10 }}>: </Typography>
                        </Grid>
                        <Grid item xs={5} style={{textAlign: 'right', marginTop: 15}}>
                          <Typography style={{ color: "#2B2F3C", fontWeight: 600 }}>{item.price ? `Rp. ${thousandFormat(item.price)}` : '-'}</Typography>
                        </Grid>
                      </Grid>
                    </>
                  ))}

                  <Grid container direction='row' style={{marginTop: 15, marginBottom: 15}}>
                    <Grid item xs={6} style={{textAlign: 'right'}}>
                      <Typography style={{ color: "#2B2F3C", fontWeight: 600, paddingRight: 10 }}>Total Biaya Barang</Typography>
                    </Grid>
                    <Grid item xs={1} style={{textAlign: 'left'}}>
                      <Typography style={{ color: "#2B2F3C", fontWeight: 600}}>: </Typography>
                    </Grid>
                    <Grid item xs={5} style={{textAlign: 'right'}}>
                      <Typography style={{ color: "#2B2F3C", fontWeight: 600, paddingRight: 0 }}>{data && data.totalGoodsCost  ? `Rp. ${thousandFormat(data.totalGoodsCost )}` : '-'}</Typography>
                    </Grid>
                  </Grid>

                </Box>
                <Grid container justify="space-between" style={{width: "96%"}}>
                  <Grid item xs={3}/>
                  <Grid item xs={9}>
                    <Grid container direction="column" style={{marginTop: 20}}>
                      <Grid item>
                        <Grid container direction="row">
                          <Grid item xs={4}><Typography style={{ color: "#2B2F3C", fontWeight: 400, paddingRight: 10, textAlign: 'right' }}>Total Biaya</Typography></Grid>
                          <Grid item xs={1}><Typography style={{ color: "#2B2F3C", fontWeight: 400}}>:</Typography></Grid>
                          <Grid item xs={2}/>
                          <Grid item xs={5}><Typography style={{ color: "#2B2F3C", fontWeight: 600, textAlign: 'right'}}>{data && data.totalCost  ? `Rp. ${thousandFormat(data.totalCost )}` : '-'}</Typography></Grid>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Grid container direction="row" alignItems="center">
                          <Grid item xs={4}><Typography style={{ color: "#2B2F3C", fontWeight: 400, paddingRight: 10, textAlign: 'right' }}>PPN</Typography></Grid>
                          <Grid item xs={1}><Typography style={{ color: "#2B2F3C", fontWeight: 400}}>:</Typography></Grid>
                          <Grid item xs={2}>
                            <Grid container direction="row" style={{ color: "#2B2F3C", fontWeight: 600}} spacing={1} alignItems="center">
                              <Grid item style={{border: "1px solid #BCC8E7", borderRadius: 8, padding: 15, fontWeight: "normal", color:" #8D98B4", fontStyle: "italic"}}>{data && data.ppn}</Grid> 
                              <Grid item>%</Grid> 
                            </Grid>
                          </Grid>
                          <Grid item xs={5}><Typography style={{ color: "#2B2F3C", fontWeight: 600, textAlign: 'right'}}>{data && data.ppn  ? `Rp. ${thousandFormat((data.ppn/100) * data.totalCost)}`: '-' }</Typography></Grid>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Grid container direction="row">
                          <Grid item xs={4}><Typography style={{ color: "#2B2F3C", fontWeight: 400, paddingRight: 10, textAlign: 'right' }}>Total Biaya + PPN </Typography></Grid>
                          <Grid item xs={1}><Typography style={{ color: "#2B2F3C", fontWeight: 400}}>:</Typography></Grid>
                          <Grid item xs={2}/>
                          <Grid item xs={5}><Typography style={{ color: "#2B2F3C", fontWeight: 600, textAlign: 'right'}}>{data && data.totalCostWithPpn  ? `Rp. ${thousandFormat(data.totalCostWithPpn )}` : '-'}</Typography></Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

                {/* <Grid container direction='row' style={{marginTop: 15, marginBottom: 15}}>
                  <Grid item xs={2} style={{textAlign: 'left'}}>
                    <Typography style={{ color: "#2B2F3C", fontWeight: 400, paddingRight: 10 }}>Total Biaya :</Typography>
                  </Grid>
                  <Grid item xs={2} style={{textAlign: 'right'}}>
                    <Typography style={{ color: "#2B2F3C", fontWeight: 600, paddingRight: 0 }}>{data && data.totalCost  ? `Rp. ${thousandFormat(data.totalCost )}` : '-'}</Typography>
                  </Grid>
                </Grid>
                <Grid container direction='row' style={{marginTop: 15, marginBottom: 15}}>
                  <Grid item xs={2} style={{textAlign: 'left'}}>
                    <Typography style={{ color: "#2B2F3C", fontWeight: 400, paddingRight: 10 }}>PPN :</Typography>
                  </Grid>
                  <Grid item xs={2} style={{textAlign: 'right'}}>
                    <Typography style={{ color: "#2B2F3C", fontWeight: 600, paddingRight: 0 }}>{data && data.ppn}%</Typography>
                  </Grid>
                </Grid>
                <Grid container direction='row' style={{marginTop: 15, marginBottom: 15}}>
                  <Grid item xs={2} style={{textAlign: 'left'}}>
                    <Typography style={{ color: "#2B2F3C", fontWeight: 400, paddingRight: 10 }}>Total Biaya+PPN :</Typography>
                  </Grid>
                  <Grid item xs={2} style={{textAlign: 'right'}}>
                    <Typography style={{ color: "#2B2F3C", fontWeight: 600, paddingRight: 0 }}>{data && data.totalCostWithPpn  ? `Rp. ${thousandFormat(data.totalCostWithPpn )}` : '-'}</Typography>
                  </Grid>
                </Grid> */}

              </Grid>
            </Grid>

            <Grid item style={{marginTop: 20, marginBottom: 100}}>
              <Grid container style={{ marginTop: 20 }} justify='space-between'>
                <Grid item>
                  <Button
                    variant="contained"
                    disableElevation
                    className={classes.secondaryButton}
                    onClick={()=>onSubmit('Reject')}
                    style={{ textTransform: "capitalize" }}
                  >
                    Reject
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    disableElevation
                    className={classes.primaryButton}
                    onClick={()=>onSubmit('Approve')}
                    style={{ textTransform: "capitalize" }}
                  >
                    Approve
                  </Button>
                </Grid>
              </Grid>
            </Grid>

          </Paper>
        </Grid>

        <Grid item xs={5}>
          <Paper className={classes.rootPaper}>
            <Grid container direction='column' style={{paddingTop: 30, paddingLeft: '20px', width: '100%'}}>
              <Grid item>
                <Typography style={{ color: "#2B2F3C", fontWeight: 500 }}>Chat History</Typography>
              </Grid>
              <Grid item style={{marginTop: 25}}>
                <SmallInput
                  style={{ width: '96%', height: '23px' }}
                  onChange={handleMessage}
                  onKeyUp={onMessageEnter}
                  placeholder='Masukkan Pesan Anda'
                />
              </Grid>
              <Grid item style={{marginTop: 5}}>
                <Box className={classes.boxStyle}>
                  <div style={{
                    display: "flex",
                    flexWrap: "wrap",
                    padding: "5px 0px",
                    alignItems: "center",
                    zIndex: 2
                  }}>
                    {data?.comments.sort(function (a, b) { return b.id - a.id; }).map((item) =>
                      (
                        <ChatHistory name={item.userName} comment={item.message} date={moment(item.createdDate).format("DD/MM/YYYY | HH:mm")} showName/>
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
  connect(mapStateToProps)(withTranslation("translations")(BottomComponent))
);