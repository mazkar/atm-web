import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Paper, Grid, Table, TableCell, TableRow, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import constants from '../../../helpers/constants';
import LoadingView from '../../../components/Loading/LoadingView';

const useStyles = makeStyles({
  rootPaper: {
    // backgroundColor: constants.color.white,
    width: '100%',
    minHeight: '550px',
    borderRadius: 10,
    boxShadow: '0px 6px 6px rgba(232, 238, 255, 0.3)'
  },
  tableRow: {
    "& .MuiTableCell-sizeSmall": { padding: 2, },
  },
  gridContent: {
    padding: 10
  },
  containerContent: {
    padding: 2
  },
  tableTitle: {
    // borderBottom: "unset",
    fontFamily: 'Barlow',
    fontSize: 24,
    fontWeight: 500,
    // margin: 20

  },
  textTitle: {
    fontFamily: 'Barlow',
    fontSize: 15,
    fontWeight: 600,
    borderBottom: "unset",
  },
  textBody: {
    fontFamily: 'Barlow',
    fontWeight: 400,
    fontSize: 12,
    borderBottom: "unset",
  },
  textTotal: {
    fontFamily: 'Barlow',
    fontWeight: 700,
    fontSize: 13,
    borderBottom: "unset",
  },
  statusView: {
    // padding: 5,
    borderRadius: 10,
    border: '1px solid #7ABFFF',
    backgroundColor: '#EFF4FF',
    color: '#88ADFF',
    fontSize: 13,
  }
});

const idrCurrencyFormat = (value) => {
  if (value === null) {
    return '-';
  }
  return `Rp ${`${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
};

function isEmpty(obj) {
  for (const x in obj) { if (obj.hasOwnProperty(x)) return false; }
  return true;
}

function renderNegoStatus(value) {
  // console.log(">>>> value nego status",value);
  switch (value) {
    case '1':
      return <Typography style={{ padding: '4px 14px', borderRadius: 20, border: '1px solid #65D170', color: '#65D170', fontSize: 13, fontWeight: 500, backgroundColor: '#DEFFE1' }}>
        Negotiation
    </Typography>;
    case '2':
      return <Typography style={{ padding: '4px 14px', borderRadius: 20, border: '1px solid #88ADFF', color: '#88ADFF', fontSize: 13, fontWeight: 500, backgroundColor: '#EFF4FF' }}>
        On Review
    </Typography>;
    case '3':
      return <Typography style={{ padding: '4px 14px', borderRadius: 20, border: '1px solid #FF7A76', color: '#FF7A76', fontSize: 13, fontWeight: 500, backgroundColor: '#FFE9E9' }}>
        Rejected
    </Typography>;
    case '4':
      return <Typography style={{ padding: '4px 14px', borderRadius: 20, border: '1px solid #CB88FF', color: '#CB88FF', fontSize: 13, fontWeight: 500, backgroundColor: '#F3E3FF' }}>
        Approve
    </Typography>;
    case '5':
      return <Typography style={{ padding: '4px 14px', borderRadius: 20, border: '1px solid #FFB443', color: '#FFB443', fontSize: 13, fontWeight: 500, backgroundColor: '#FFF9F0' }}>
        Terminate
    </Typography>;
    case '7':
      return <Typography style={{ padding: '4px 14px', borderRadius: 20, border: '1px solid #749BFF', color: '#749BFF', fontSize: 13, fontWeight: 500, backgroundColor: '#EBF0FF' }}>
        Profiling 2
    </Typography>;
    default:
      return '-';
  }
}

function NegoBiaya(props) {
  const classes = useStyles();
  const { data, isLoadData } = props;
  const [flatCost, setFlatCost] = useState(true);
  const [yearlyRentCosts, setYearlyRentCosts] = useState([]);
  useEffect(() => {
    setYearlyRentCosts(data.rent?.yearlyRentCosts);
  }, [data]);
  return (
    <div>
      <Grid container
      // style={{ background: '#f26f66' }}
      >

        <Paper className={classes.rootPaper}>
          {isLoadData ?
            <LoadingView maxheight='100%' />
            :
            <div>
              <Grid item xs={12} className={classes.gridContent}>
                <Grid container justify="space-between" alignItems="center">
                  <Grid item>
                    <Typography className={classes.tableTitle}>
                      Detail
                    </Typography>
                  </Grid>
                  <Grid item>
                    {isEmpty(data) ? '-' : renderNegoStatus(data.rent.negotiationStatus)}
                  </Grid>
                  {/* <Typography className={classes.statusView}>Preparation</Typography> */}
                </Grid>
                <Table size="small" style={{ marginTop: 10 }}>
                  <TableRow className={classes.tableRow}>
                    <TableCell colSpan={2} className={classes.textTitle} width="40%" >Biaya Sewa</TableCell>
                  </TableRow>
                        {
                          yearlyRentCosts?.map((row, index) => {
                            return (
                              <TableRow className={classes.tableRow}>
                                <TableCell width="40%" className={classes.textBody}>Tahun ke {(index + 1)}</TableCell>
                                <TableCell className={classes.textBody}>
                                  : {row === null ? '-' : idrCurrencyFormat(row)}
                                </TableCell>
                              </TableRow>
                            )
                          })
                        }
                  <TableRow className={classes.tableRow}>
                    <TableCell width="40%" className={classes.textTotal}>Total</TableCell>
                    <TableCell className={classes.textTotal}>
                      : {isEmpty(data) ? '-' : idrCurrencyFormat(data.rent.totalRent)}
                    </TableCell>
                  </TableRow>
                </Table>
              </Grid>

              <Grid item xs={12} className={classes.gridContent}>
                <Table size="small">
                  <TableRow className={classes.tableRow}>
                    <TableCell colSpan={2} className={classes.textTitle} width="40%" >Biaya Lain-Lain</TableCell>
                  </TableRow>
                      <TableRow className={classes.tableRow}>
                        <TableCell width="40%" className={classes.textBody}>Listrik per tahun</TableCell>
                        <TableCell className={classes.textBody}>
                          : {isEmpty(data) ? '-' : idrCurrencyFormat(data.rent.yearlyElectricityCost)}
                        </TableCell>
                      </TableRow>
                      <TableRow className={classes.tableRow}>
                        <TableCell width="40%" className={classes.textBody}>Lahan Antena Vsat</TableCell>
                        <TableCell className={classes.textBody}>
                          : {isEmpty(data) ? '-' : idrCurrencyFormat(data.rent.antenaLandCost)}
                        </TableCell>
                      </TableRow>
                  <TableRow className={classes.tableRow}>
                    <TableCell width="40%" className={classes.textBody}>Deposit Service Charge</TableCell>
                    <TableCell className={classes.textBody}>
                      : {isEmpty(data) ? '-' : idrCurrencyFormat(data.rent.depositServiceCharge)}
                    </TableCell>
                  </TableRow>
                  <TableRow className={classes.tableRow}>
                    <TableCell width="40%" className={classes.textBody}>Sewa Lahan Signage / Pole Sign</TableCell>
                    <TableCell className={classes.textBody}>
                      : {isEmpty(data) ? '-' : idrCurrencyFormat(data.rent.yearlySignageCost)}
                    </TableCell>
                  </TableRow>
                  <TableRow className={classes.tableRow}>
                    <TableCell width="40%" className={classes.textBody}>Biaya Notaris</TableCell>
                    <TableCell className={classes.textBody}>
                      : {isEmpty(data) ? '-' : idrCurrencyFormat(data.rent.notaryCost)}
                    </TableCell>
                  </TableRow>
                  <TableRow className={classes.tableRow}>
                    <TableCell width="40%" className={classes.textBody}>Biaya Promosi</TableCell>
                    <TableCell className={classes.textBody}>
                      : {isEmpty(data) ? '-' : idrCurrencyFormat(data.rent.promotionCost)}
                    </TableCell>
                  </TableRow>
                  <TableRow className={classes.tableRow}>
                    <TableCell width="40%" className={classes.textBody}>Biaya Konsesi</TableCell>
                    <TableCell className={classes.textBody}>
                      : {isEmpty(data) ? '-' : idrCurrencyFormat(data.rent.consessionCost)}
                    </TableCell>
                  </TableRow>
                  <TableRow className={classes.tableRow}>
                    <TableCell width="40%" className={classes.textBody}>Other</TableCell>
                    <TableCell className={classes.textBody}>
                      : {isEmpty(data) ? '-' : idrCurrencyFormat(data.rent.otherCost)}
                    </TableCell>
                  </TableRow>
                </Table>
              </Grid>

              <Grid item xs={12} className={classes.gridContent}>
                <Table size="small">
                  <TableRow className={classes.tableRow}>
                    <TableCell colSpan={2} className={classes.textTitle} width="40%" >Perkiraan Harga Dari Lokasi Setipe</TableCell>
                  </TableRow>
                  <TableRow className={classes.tableRow}>
                    <TableCell width="40%" className={classes.textBody}>Nilai Terendah</TableCell>
                    <TableCell className={classes.textBody}>
                      : {isEmpty(data) ? '-' : idrCurrencyFormat(data.informasiNegotiation.minOffering)}
                    </TableCell>
                  </TableRow>
                  <TableRow className={classes.tableRow}>
                    <TableCell width="40%" className={classes.textBody}>Nilai Tengah</TableCell>
                    <TableCell className={classes.textBody}>
                      : {isEmpty(data) ? '-' : idrCurrencyFormat(data.informasiNegotiation.averageOffering)}
                    </TableCell>
                  </TableRow>
                  <TableRow className={classes.tableRow}>
                    <TableCell width="40%" className={classes.textBody}>Nilai Tertinggi</TableCell>
                    <TableCell className={classes.textBody}>
                      : {isEmpty(data) ? '-' : idrCurrencyFormat(data.informasiNegotiation.maxOffering)}
                    </TableCell>
                  </TableRow>
                </Table>
              </Grid>
            </div>
          }
        </Paper>
      </Grid>
    </div>
  );
}

NegoBiaya.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired,
  isLoadData: PropTypes.bool,
};
NegoBiaya.defaultProps = {
  isLoadData: false,
};
function mapStateToProps() {
  return {};
};

export default withRouter(
  connect(mapStateToProps)(withTranslation('translations')(NegoBiaya))
);