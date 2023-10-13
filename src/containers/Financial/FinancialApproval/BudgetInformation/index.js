import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from "react-i18next";
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography } from '@material-ui/core';
import { ReactComponent as SubtitleIcon } from '../../../../assets/icons/general/transaction_rate_overview.svg';
import constants from "../../../../helpers/constants";
import TripleGrid from '../../../../components/Grid/TripleGrid';
import OpexApexChart from "../../../../components/Financial/Chart/OpexApexChart";
import { ChkyOverviewTransaction } from "../../../../components/chky";
import { ReactComponent as Briefcase } from "../../../../assets/images/briefcase.svg";
import { ReactComponent as Payment } from "../../../../assets/images/payment.svg";
import { useDispatch, useSelector } from "../../../../helpers/Utils/react-redux-hook";
import Loading from "../../../../components/Loading/LoadingView";
import useRupiahConverter from '../../../../helpers/useRupiahConverter';

const useStyles = makeStyles({
  superRoot: {
    '& .MuiPaper-elevation1': {
      boxShadow: '0px 6px 6px rgba(232, 238, 255, 0.3)',
    },
  },
  root: {
    borderRadius: 10,
    padding: 20,
  },
  npbContainer: {
    borderRadius: '8px',
    border: '1px solid #BCC8E7',
    padding: '10px',
    width: '100%',
    height: '100%'
  },
  title: {
    fontFamily: 'Barlow',
    fontSize: '15px',
    fontWeight: '500',
    color: '#2B2F3C',
    lineHeight: '18px',
    margin: '5px 0 0 5px'
}
});

function BudgetInformation(props) {
  const { t } = useTranslation();
  const classes = useStyles();

  const [dataOpex, setDataOpex] = useState({})
  const [dataCapex, setDataCapex] = useState({})
  const [dataNPB, setDataNPB] = useState({})
  const [loading, setLoading] = useState(true)

  const dispatch = useDispatch()
  const financialApproval = useSelector(state => state.financial)

  useEffect(() => {
    dispatch.financial.budgetSummaryInfo()
  }, [])

  useEffect(() => {
    setLoading(true);
    let response = financialApproval.data
    if (response.opex !== undefined) {
      setDataOpex({
        title: 'OPEX',
        listData: [
          {
            type: 'Total Amount Budget',
            value: response.opex.totalAmountBudget,
          },
          {
            type: 'Total Amount Ending Budget',
            value: response.opex.totalAmountEndingBudget,
          }
        ],
        colors: [constants.color.primaryHard, constants.color.secondaryMedium, constants.color.grayMedium],
        npb: response.opex.npb,
        invoice: response.opex.invoice,
        paidInvoice: response.opex.invoiceTerbayar
      })
      setDataCapex({
        title: 'CAPEX',
        listData: [
          {
            type: 'Total Amount Budget',
            value: response.capex.totalAmountBudget,
          },
          {
            type: 'Total Amount Ending Budget',
            value: response.capex.totalAmountEndingBudget,
          }
        ],
        colors: [constants.color.primaryHard, constants.color.secondaryMedium, constants.color.grayMedium],
        npb: response.capex.npb,
        invoice: response.capex.invoice,
        paidInvoice: response.capex.invoiceTerbayar
      })
      setDataNPB({
        invoice: response.invoice,
        payment: response.pembayaran
      })
      setLoading(false);
    }
  }, [financialApproval])

  return (
    <div className={classes.superRoot}>
      <Paper className={classes.root}>
        <Grid container alignItems="center" spacing={1} style={{ marginBottom: 25 }}>
          <Grid item style={{ display: 'flex' }}><SubtitleIcon /></Grid>
          <Grid item><Typography style={{ fontSize: 15, fontWeight: 500 }}>Budget Information</Typography></Grid>
        </Grid>
        <TripleGrid
          container={{ className: classes.bottomContent, gutter: 20 }}
          leftComponent={{
            span: 9,
            component: (
              <OpexApexChart
                data={dataOpex}
                isLoading={loading}
              />
            )
          }}
          centerComponent={{
            span: 9,
            component: (
              <OpexApexChart
                data={dataCapex}
                isLoading={loading}
              />
            )
          }}
          rightComponent={{
            span: 6,
            component: (
              <div className={classes.npbContainer}>
                {
                  loading
                    ? <Loading maxheight='100%' />
                    : <div>
                      <div className={classes.title}>{t('differece.npb')}</div>
                      <div style={{ margin: '20px 0' }}>
                        <ChkyOverviewTransaction leftIcon={<Briefcase />} title={t('invoice')} value={useRupiahConverter(dataNPB.invoice, true)} height={90} isRupiah />
                      </div>
                      <div style={{ margin: '20px 0' }}>
                        <ChkyOverviewTransaction leftIcon={<Payment />} title={t('payment')} value={useRupiahConverter(dataNPB.payment, true)} height={90} isRupiah />
                      </div>
                    </div>
                }
              </div>
            )
          }} />
      </Paper>
    </div>
  );
}

BudgetInformation.propTypes = {

};

export default BudgetInformation;

