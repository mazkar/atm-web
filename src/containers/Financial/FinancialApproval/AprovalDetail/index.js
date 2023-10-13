/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button, Divider, Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import PropTypes from 'prop-types';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import { ReactComponent as BackIcon } from '../../../../assets/icons/general/arrow_back_red.svg';
import { ReactComponent as PhoneIcon } from '../../../../assets/icons/general/phone_outlined.svg';
import constansts from '../../../../helpers/constants';
import { ReactComponent as FileIcon } from '../../../../assets/icons/general/paperclip.svg';
import useRupiahConverter from '../../../../helpers/useRupiahConverter';
import getFiles from '../../../../helpers/getFiles'
import ApprovalMuiButton from '../../../../components/Button/ApprovalMuiButton';
import { useDispatch, useSelector } from '../../../../helpers/Utils/react-redux-hook';
import InfinityLoading from "../../../../components/Loading/InfinityLoading";
import axios from 'axios';

const useStyles = makeStyles({
  root: { padding: '30px 20px 20px 30px', },
  backLabel: { fontSize: 17, color: constansts.color.primaryHard, marginLeft: 5, },
  backAction: {
    backgroundColor: 'unset',
    padding: 0,
    '& .MuiButton-root': { padding: 0, textTransform: 'none', backgroundColor: 'unset' },
    '& .MuiButton-root:hover': { opacity: 0.6, backgroundColor: 'unset' },
  },
  containerContent: {
    '& .MuiPaper-elevation1': {
      boxShadow: '0px 6px 6px rgba(232, 238, 255, 0.3)',
    },
  },
  content: {
    padding: 20,
  },
  subTitle: {
    fontSize: 15,
    fontWeight: 500,
    color: '#2B2F3C',
  },
  value: {
    fontSize: 15,
    fontWeight: 400,
    color: '#2B2F3C',
  },
  valueExtraBold: {
    fontSize: 22,
    fontWeight: 700,
    color: '#2B2F3C',
  },
  gridFlex: {
    display: 'flex',
    alignItems: 'center',
  },
  gridFlexSpace: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  approval: {
    fontFamily: 'Barlow, NunitoRegular',
    fontWeight: '600',
    fontSize: '15px',
    position: 'absolute',
    top: '0',
    right: '0'
  }
});

// function randomColor() {
//   const hex = Math.floor(Math.random() * 0xFFFFFF);
//   const color = `#${hex.toString(16)}`;
//   return color;
// }
const getInitials = (string) => {
  const names = string.split(' ');
  let initials = names[0].substring(0, 1).toUpperCase();
  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase();
  }
  return initials;
};

const dataDummy = {
  "noNpb": "27/NPB/ATMI&M/ABG/05/2020", "date": "27 May 2020", "inisiator": "Rita Lisdawati", "inisiatorEmail": "rita.lisdawati@cimbniaga.co.id", "initiatorTelphone": "89225",
  "initiatorDivisi": "ATMI&M / ABG", "initiatorRc": "1611470771806", "deskripsi": "Pengeluaran untuk perbaikan Cassette ATM/CDM/CRM", "lampiran": "document.docx", "availableBudget": "Rp 3.000.000.000",
  "subLedgerA": "Cadangan", "capexDescriptionA": "Perbaikan Cassette ATM/CDM/CRM", "fullYearBudgetA": "Rp 100.000.000", "requestedA": "Rp 100.000.000",
  "subLedgerB": "Cadangan", "capexDescriptionB": "Perbaikan Cassette ATM/CDM/CRM", "fullYearBudgetB": "Rp 100.000.000", "requestedB": "Rp 100.000.000",
  "subLedgerC": "Cadangan", "capexDescriptionC": "Perbaikan Cassette ATM/CDM/CRM", "fullYearBudgetC": "Rp 100.000.000", "requestedC": "Rp 100.000.000",
  "balance": "Rp 2.700.000.000",
};

const months = {
  1: "January",
  2: "February",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December"
};

const getPresentDate = () => {
  let date = new Date(),
    loc = date.toLocaleDateString(),
    today = loc.split('/');
  return today[1] + ' ' + months[parseInt(today[0])] + ' ' + today[2]
}

const ApprovalDetail = (props) => {
  const classes = useStyles();
  const { history, data } = props;
  const dispatch = useDispatch();
  const financial = useSelector(state => state.financial);
  const financialTable = useSelector(state => state.financialTable);

  let getData = localStorage.getItem('detailApproval')
  let parseData = JSON.parse(getData)

  let totalRequested = 0
  let balance = parseData.budget.balance
  let division = parseData?.budget.info[0].division

  const [loading, setLoading] = useState(false);
  const [currentData, setCurrentData] = useState(null);
  const [user, setUser] = useState(null);

  const backButton = () => {
    history.push('/financial-approval')
    localStorage.removeItem('detailApproval')
  }

  const approveData= (status) => {
    setLoading(true);
    dispatch.financial.updateStatusTransaction({
      financialTransaction: {
        id: parseData.id,
        status: status,
        budget: {
          budgetId: parseData.budget.info[0].budgetId,
          typeGL: parseData.budget.info[0].typeGl
        },
        npbDto: {
          npbNo: parseData.npbCode,
          npbNominal: parseData.npbAmount
        }
      }
    })
  };

  useEffect(() => {
    if(financial.data.responseCode !== undefined) {
      setLoading(false);
    };
    dispatch.financialTable.listApprovalNPB({});
  }, [financial]);

  useEffect(() => {
    let response = financialTable.data.approvalNpb;
    if(response) {
      response.map(item => {
        if(item.id === parseData.id) {
          setCurrentData(item);
        }
      });
    }
  }, [financialTable]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_DOMAIN}/api/v1/users/api/v1/users/${parseData?.inisiatorId}`)
      .then(res => {
        setUser(res.data.data);
      })
  }, []);

  return (
    <div className={classes.root}>
      <Grid container direction="column" spacing={2}>
        <Grid container style={{marginBottom:'37px'}}>
          <Grid item xs={8}>
            <div className={classes.backAction} >
              <Button onClick={backButton}>
                <BackIcon />
                <Typography className={classes.backLabel}>Back</Typography>
              </Button>
            </div>
          </Grid>
          <Grid item xs={4} style={{position:'relative'}}>
            {currentData?.status === '0' ? (
              <div className={classes.approval}>
                <span style={{marginRight:'49px'}}>Status</span>
                <span>:</span>
                <span style={{margin: '0 10px'}}>
                  <ApprovalMuiButton
                    type='approve'
                    onClick={() => approveData(1)}
                  />
                </span>
                <span style={{margin: '0 10px'}}>
                  <ApprovalMuiButton
                    type='reject'
                    onClick={() => approveData(2)}
                  />
                </span>
              </div>
            ) : null}
          </Grid>
        </Grid>
        <Grid item className={classes.containerContent}>
          <Paper className={classes.content}>
            <Grid container justify="flex-end" direction="column" alignItems="flex-end">
              <Grid item>
                <Typography className={classes.subTitle}>No. NPB : {parseData.npbCode}</Typography>
              </Grid>
              <Grid item>
                <Typography style={{ color: '#8D98B4', fontSize: 15, fontWeight: 400 }}>{getPresentDate()}</Typography>
              </Grid>
            </Grid>
            <div style={{ backgroundColor: '#F4F7FB', marginTop: 10 }}>
              <div style={{ padding: 20 }}>
                <Grid container alignItems="center">
                  <Grid item xs={6}>
                    <Grid container spacing={1} alignItems="center">
                      <Grid item>
                        <Avatar style={{ backgroundColor: '#88ADFF', border: '2px solid #FFFFFF', boxShadow: '0px 6px 6px rgba(232, 238, 255, 0.3)', width: 32, height: 32, margin: 2.5, fontSize: 14 }}>
                          {user ? getInitials(user.fullName) : null}
                        </Avatar>
                      </Grid>
                      <Grid item><Typography>{user?.fullName}</Typography></Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography className={classes.subTitle}>Deskripsi :</Typography>
                    <Typography className={classes.value}>{parseData.description === null ? '-' : parseData.description}</Typography>
                  </Grid>
                </Grid>
                <Grid xs={6} style={{ marginBottom: 15, marginTop: 10 }}>
                  <Grid container justify="space-between" style={{ paddingLeft: 10, paddingRight: 45 }}>
                    <Grid item>
                      <div className={classes.gridFlex}>
                        <MailOutlineIcon style={{ color: '#BCC8E7', width: 24, marginRight: 10 }} />
                        <Typography className={classes.value}>{user?.email}</Typography>
                      </div>
                    </Grid>
                    <Grid item xs={4}>
                      <Grid container spacing={1}>
                        <Grid item xs={4}>
                          <Typography style={{ marginRight: 10 }} className={classes.value}>Division </Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography className={classes.value}>: {division ? division : '-'}</Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid xs={6}>
                    <Grid container justify="space-between" style={{ paddingLeft: 10, paddingRight: 45 }}>
                      <Grid item>
                        <div className={classes.gridFlex}>
                          <PhoneIcon style={{ color: '#BCC8E7', width: 24, marginRight: 10 }} />
                          <Typography className={classes.value}>{user?.phoneNumber}</Typography>
                        </div>
                      </Grid>
                      <Grid item xs={4}>
                        <Grid container spacing={1}>
                          <Grid item xs={4}>
                            <Typography style={{ marginRight: 10 }} className={classes.value}>RC </Typography>
                          </Grid>
                          <Grid item xs={8}>
                            <Typography className={classes.value}>: {parseData.rcCode === null ? '-' : parseData.rcCode}</Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    {parseData.document.documentList.map((doc, i)=>{
                      return(
                        <div className={classes.gridFlex}>
                          <FileIcon />
                          <Typography style={{ fontSize: 14, color: '#DC241F', marginLeft: 5, cursor: 'pointer' }}>
                            <a onClick={() => getFiles({
                              url: `${process.env.REACT_APP_API_DOMAIN}/financialservices/financialTransactionServices/v1/fileDownloadDocument`,
                              data: {
                                name: doc.name
                              },
                              fileName: doc.name,
                              loading: () => { console.log('onLoading') }
                            })}>
                              {!doc.name ? 'document.xlsx' : doc.name}
                            </a>
                          </Typography>
                        </div>
                      )
                    })}
                  </Grid>
                </Grid>
              </div>
            </div>
            <div style={{ paddingTop: 20 }}>
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <Grid container justify="space-between">
                    <Grid item>
                      <Typography style={{ color: '#8D98B4', fontSize: 20, fontWeight: 600 }}>Budget Information</Typography>
                    </Grid>
                    <Grid item style={{ width: 300 }}>
                      <div className={classes.gridFlexSpace}>
                        <Typography className={classes.value} style={{ marginRight: 5 }}>Available Budget :</Typography>
                        <Typography className={classes.valueExtraBold}>{useRupiahConverter(parseData.budget.availableBudget)}</Typography>
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
                {parseData.budget.info.map((item, index) => {
                  totalRequested = totalRequested + parseInt(item.fullYearBudget)
                  return (
                    <Grid item>
                      <Grid container justify="space-between" alignItems="center">
                        <Grid item>
                          <Typography className={classes.subTitle} style={{ marginBottom: 5 }}>Sub-Ledger :</Typography>
                          <Typography className={classes.value}>{item.subledger}</Typography>
                        </Grid>
                        <Grid item>
                          <Typography className={classes.subTitle} style={{ marginBottom: 5 }}>{`${item.typeGl==='Capex' ? 'CAPEX' : 'OPEX'} Description :`}</Typography>
                          <Typography className={classes.value}>{parseData.description === null ? '-' : parseData.description}</Typography>
                        </Grid>
                        <Grid item>
                          <Typography className={classes.subTitle} style={{ marginBottom: 5 }}>Full Year Budget :</Typography>
                          <Typography className={classes.value}>{useRupiahConverter(item.fullYearBudget)}</Typography>
                        </Grid>
                        <Grid item style={{ width: 300 }}>
                          <div className={classes.gridFlexSpace}>
                            <Typography className={classes.value} style={{ marginRight: 5 }}>Requested :</Typography>
                            <Typography className={classes.valueExtraBold}>{useRupiahConverter(item.requested)}</Typography>
                          </div>
                        </Grid>
                      </Grid>
                    </Grid>
                  )
                })}
                {/* </> */}
                <Divider style={{ marginTop: 25, marginBottom: 20, backgroundColor: '#BCC8E7' }} />
                <Grid item>
                  <Grid container justify="space-between">
                    <Grid />
                    <Grid item style={{ width: 300 }}>
                      <div className={classes.gridFlexSpace}>
                        <Typography className={classes.value} style={{ marginRight: 5 }}>Balance :</Typography>
                        <Typography className={classes.valueExtraBold}>{useRupiahConverter(balance)}</Typography>
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </Paper>
        </Grid>
        {loading ? <InfinityLoading /> : null}
      </Grid>
    </div>
  );
};
ApprovalDetail.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object,
};

ApprovalDetail.defaultProps = {
  data: dataDummy,
};

export default withRouter(ApprovalDetail);
