/* eslint-disable no-alert */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { ReactComponent as TitleIcon } from "../../../assets/icons/general/money_overview.svg";
import { ChkyOverviewTransaction, ChkyTabsAsOption } from "../../../components";
import { ReactComponent as IconTotalAmount } from "../../../assets/icons/general/overview_total_amount.svg";
import { ReactComponent as IconTotalRevenue } from "../../../assets/icons/general/overview_total_revenue.svg";
import { ReactComponent as IconTotalTransactionPerAtm } from "../../../assets/icons/general/overview_total_transaction_perAtm.svg";
import ModalLoader from "../../../components/ModalLoader";
import EmptyImg from "../../../assets/images/empty_data.png";
import LoadingView from "../../../components/Loading/LoadingView";
import ConvertUang from "../../../helpers/Utils/convertUang";
import { values } from "lodash";
import { LensTwoTone } from "@material-ui/icons";

const useStyles = makeStyles({
  superRoot: {
    "& .MuiPaper-elevation1": {
      boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
    },
  },
  root: {
    position: "relative",
  },
  tabs: {
    position: "absolute",
    top: 15,
    left: "40%",
  },
});

// const dataDummy = {
//   calculateTransactionsMonthly: [
//     {
//       totalAlltransaction: 19226,
//       totalAmountTransaction: 10815074978,
//       totalRevenue: 21612931,
//       totalAvgTransactionPerAtm: 4600,
//     },
//   ],
//   calculateTransactionsYearly: [
//     {
//       totalAlltransaction: 127069,
//       totalAmountTransaction: 80903338544,
//       totalRevenue: 170947868,
//       totalAvgTransactionPerAtm: 3988,
//     },
//   ],
// };

function OverviewTransaction(props) {
  const classes = useStyles();
  const { data, loading } = props;
  const [currentTab, setCurrentTab] = useState(0);
  // console.log(`<<<< DATA Transaction`, data);

  function handleChangeTab(newValue) {
    setCurrentTab(newValue);
  }

  const convertNumber = (x) => {
    if (x === null) {
      return 0;
    }
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <div className={classes.superRoot}>
      <Accordion
        defaultExpanded
        className={classes.root}
        style={{ borderRadius: 10 }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon style={{ color: "#DC241F" }} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Grid container spacing={1} alignItems="center">
            <Grid item style={{ display: "flex" }}>
              <TitleIcon />
            </Grid>
            <Grid item>
              <Typography style={{ fontSize: 15, fontWeight: 500 }}>
                Total Transaction
              </Typography>
            </Grid>
          </Grid>
        </AccordionSummary>

        {!loading && (
          <AccordionDetails>
            {data !== null ? (
              <Grid container spacing={2}>
                <Grid item xs={6} md={4} lg={3}>
                  <ChkyOverviewTransaction
                    isRupiah={false}
                    title="All Transaction (Qty)"
                    value={
                      currentTab === 0
                        ? convertNumber(
                            data.calculateTransactionsYearly[0]
                              .totalAlltransaction
                          )
                        : convertNumber(
                            data.calculateTransactionsMonthly[0]
                              .totalAlltransaction
                          )
                    }
                  />
                </Grid>
                <Grid item xs={6} md={4} lg={3}>
                  <ChkyOverviewTransaction
                    isRupiah
                    leftIcon={<IconTotalAmount />}
                    title="Amount Transaction (Million)"
                    value={
                      currentTab === 0
                        ? ConvertUang(
                            data.calculateTransactionsYearly[0]
                              .totalAmountTransaction
                          )
                        : ConvertUang(
                            data.calculateTransactionsMonthly[0]
                              .totalAmountTransaction
                          )
                    }
                  />
                </Grid>
                <Grid item xs={6} md={4} lg={3}>
                  <ChkyOverviewTransaction
                    isRupiah
                    leftIcon={<IconTotalRevenue />}
                    title="Revenue (Million)"
                    value={
                      currentTab === 0
                        ? ConvertUang(
                            data.calculateTransactionsYearly[0].totalRevenue
                          )
                        : ConvertUang(
                            data.calculateTransactionsMonthly[0].totalRevenue
                          )
                    }
                  />
                </Grid>
                <Grid item xs={6} md={4} lg={3}>
                  <ChkyOverviewTransaction
                    isRupiah={false}
                    leftIcon={<IconTotalTransactionPerAtm />}
                    title="Avg Transaction Per ATM (Qty)"
                    value={
                      currentTab === 0
                        ? convertNumber(
                            data.calculateTransactionsYearly[0]
                              .totalAvgTransactionPerAtm
                          )
                        : convertNumber(
                            data.calculateTransactionsMonthly[0]
                              .totalAvgTransactionPerAtm
                          )
                    }
                  />
                </Grid>
              </Grid>
            ) : (
              <Grid
                container
                alignContent="center"
                justify="center"
                style={{ height: 175 }}
                direction="column"
              >
                <img src={EmptyImg} alt="Empty" style={{ opacity: 0.4 }} />
                <Typography
                  style={{
                    opacity: 0.3,
                    textAlign: "center",
                    fontSize: 11,
                    marginTop: 10,
                  }}
                >
                  Empty
                </Typography>
              </Grid>
            )}
          </AccordionDetails>
        )}

        <div className={classes.tabs}>
          <ChkyTabsAsOption
            currentTab={currentTab}
            dataTab={["Yearly", "Monthly"]}
            handleChangeTab={handleChangeTab}
            minWidth={100}
          />
        </div>
        {loading && <LoadingView maxheight="100%" />}
      </Accordion>
    </div>
  );
}

OverviewTransaction.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object,
};
// OverviewTransaction.defaultProps = {
//   data: dataDummy,
// };
export default OverviewTransaction;
