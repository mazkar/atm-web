/* eslint-disable no-nested-ternary */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-sequences */
/* eslint-disable no-undef */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-const-assign */
/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Box, Grid, Tab, Tabs, Typography, Paper } from "@material-ui/core";
import * as ThemeColor from "../../assets/theme/colors";

import FloatingChat from "../../components/GeneralComponent/FloatingChat";
import { ChkySearchBar } from "../../components/chky";
import { ChkyTrendChart } from "../../components";
import LoadingView from "../../components/Loading/LoadingView";
import Constants from "../../helpers/constants";
import TrendTabContent from './TrendTabContent';
import ForecastTabContent from './ForecastTabContent';

const useStyles = makeStyles({
  root: {
    padding: "30px 20px 20px 30px",
    backgroundColor: ThemeColor.GrayUltrasoft,
    minHeight: 'calc(100vh - 64px)',
  },
  title: {
    fontFamily: "Barlow",
    fontWeight: "500",
    fontSize: "36px",
    color: "#2B2F3C",
  },
  titleContainer: {
    marginBottom: 25,
  },
  tabContent: {
    paddingTop: 10,
  },
  tableContent: { marginTop: 20 },
});
const ContentTabs = withStyles({
  indicator: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
    "& > span": {
      width: "100%",
      backgroundColor: ThemeColor.PrimaryHard,
    },
  },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const ContentTab = withStyles((theme) => ({
  root: {
    textTransform: "none",
    fontSize: 17,
    fontWeight: 600,
    marginRight: theme.spacing(1),
    color: Constants.color.grayMedium,
    "&:hover": {
      color: Constants.color.dark,
      opacity: 1,
    },
    "&$selected": {
      color: Constants.color.dark,
    },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3} style={{ padding: "24px 0px 0px 0px" }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function AnalyticData() {
  const classes = useStyles();
  const [tabValue, setTabValue] = useState(0);
  const [openModalLoader, setOpentModalLoader] = useState(false);
  const [dataChart, setDataChart] = useState([]); // <--- init Data Chart
  const [dataHitChart, setDataHitChart] = useState("yearly");
  const [idAtm, setIdAtm] = useState("");

  function handleKeyword(newValue) {
    setIdAtm(newValue);
  // console.log("---ID ATM", newValue);
  }

  const handleChange = (event, newTabValue) => {
    event.preventDefault();
    setTabValue(newTabValue);
    setIdAtm('')
  };

  function filterAnalityc(e) {
  // console.log("INI ADALAH DATA", e);
    setDataHitChart(e.target.value);
  }


  useEffect(() => {
    const dataOnChart = [];

    const fetchDataYearly = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      };

      try {
        setOpentModalLoader(true);
        const result = await axios.get(
          `${process.env.REACT_APP_API_DOMAIN}/analysismodelingservice/v1/analyticData/trendTransactionChart?frequently=yearly`,
          config
        );
      // console.log(result);
        // reconstruct data from DB to dataTrend
        try {
          const dataNewForecast = result.data.data.forecastDetail;
          dataNewForecast.map((item) => {
            const newForecast = {
              date: item.period,
              transaction: item.forecastAmount,
              type: item.type,
            };
            return dataOnChart.push(newForecast);
          });

          const dataNewAvg = result.data.data.averageList;
          // eslint-disable-next-line array-callback-return
          dataNewAvg.map((item) => {
            const newAvg = {
              date: item.year.toString(),
              transaction: item.averageTotalAmount,
              type: item.type,
            };
            dataOnChart.push(newAvg);
          });
        } catch (error) {
          setOpentModalLoader(false);
          alert(`Error Refactor Data...! \n ${error}`);
        }
        setDataChart(
          dataOnChart.sort((a, b) =>
            a.date > b.date ? 1 : a.date < b.date ? -1 : 0
          )
        );
        setOpentModalLoader(false);
      } catch (err) {
        setOpentModalLoader(false);
        alert(`Error Fetching Data...! \n${err}`);
      }
    };

    const fetchDataMonthly = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      };

      try {
        setOpentModalLoader(true);
        const result = await axios.get(
          `${process.env.REACT_APP_API_DOMAIN}/analysismodelingservice/v1/analyticData/trendTransactionChart?frequently=monthly`,
          config
        );
      // console.log(result);
        // reconstruct data from DB to dataTrend
        try {
          const dataNewAvg = result.data.data.averageList;
          // eslint-disable-next-line array-callback-return
          dataNewAvg.map((item) => {
            const newAvg = {
              date: item.month,
              transaction: item.averageTotalAmount,
              type: item.type,
            };
            dataOnChart.push(newAvg);
          });

          const dataNewForecast = result.data.data.forecastDetail;
          dataNewForecast.map((item) => {
            const newForecast = {
              date: item.period,
              transaction: item.forecastAmount,
              type: item.type,
            };
            return dataOnChart.push(newForecast);
          });
        } catch (error) {
          alert(`Error Refactor Data...! \n ${error}`);
          setOpentModalLoader(false);
        }
        setOpentModalLoader(false);
        setDataChart(
          dataOnChart.sort((a, b) =>
            a.date > b.date ? 1 : a.date < b.date ? -1 : 0
          )
        );
        
      } catch (err) {
        alert(`Error Fetching Data...! \n${err}`);
        setOpentModalLoader(false);
      }
    };

    if (dataHitChart === "yearly") {
      fetchDataYearly();
    }
    if (dataHitChart === "monthly") {
      fetchDataMonthly();
    }
    // setDataChart(
    //   dataOnChart.sort((a, b) =>
    //     a.date > b.date ? 1 : a.date < b.date ? -1 : 0
    //   )
    // );
  }, [dataHitChart]);

  useEffect(() => {
  // console.log(`==> CHART${JSON.stringify(dataChart)}`);
  }, [dataChart]);


  return (
    <div className={classes.root}>
      <Grid
        container
        justify="space-between"
        className={classes.titleContainer}
      >
        <Grid item>
          <Typography className={classes.title}>
            Analytic Data Transaksi
          </Typography>
        </Grid>
        <Grid item>
          <ChkySearchBar
            placeholder="Search ATM ID"
            onKeywordChange={handleKeyword}
            width={310}
            value={idAtm}
          />
        </Grid>
      </Grid>

      <div className={classes.container}>
        <div>
          {openModalLoader ? (
            <LoadingView maxheight="100%" />
          ) : (
            <ChkyTrendChart
              data={dataChart}
              title="Trend Transaction"
              onFilterChange={filterAnalityc}
              legendName={["Average Transaction","Forecast"]}
              value={dataHitChart}
            />
          )}
        </div>

        <div className={classes.panelTab}>
          <ContentTabs
            value={tabValue}
            onChange={handleChange}
            aria-label="simple tabs example"
            style={{marginTop: 20}}
          >
            <ContentTab label="Trend" {...a11yProps(0)} />
            <ContentTab label="Forecast" {...a11yProps(1)} />
          </ContentTabs>
          <TabPanel value={tabValue} index={0}>
            <TrendTabContent atmId={idAtm} />
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <ForecastTabContent atmId={idAtm} />
          </TabPanel>
        </div>
      </div>
      {/* <FloatingChat /> */}
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default withRouter(
  connect(mapStateToProps)(withTranslation("translations")(AnalyticData))
);
