/* external import */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/styles";
import { Grid, Typography, Tabs, Tab, Box, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

/* internal import */
import { PrimaryHard } from "../../../assets/theme/colors";
import { ReactComponent as NewLoc } from "../../../assets/icons/duotone-red/newLoc.svg";
import { ReactComponent as Terminasi } from "../../../assets/icons/duotone-red/terminasi.svg";
import { ReactComponent as Replace } from "../../../assets/icons/duotone-red/replace.svg";
import { ReactComponent as Migrasi } from "../../../assets/icons/duotone-red/migrasi.svg";
import Constants from "../../../helpers/constants";
import FloatingChat from "../../../components/GeneralComponent/FloatingChat";
import { doGetSummaryDocBast } from "../serviceFileManagement";
import TabNew from "./common/TabNew";
import TabTerminasi from "./common/TabTerminasi";
import TabReplace from "./common/TabReplace";
import TabMigrasi from "./common/TabMigrasi";
import LoadingView from "../../../components/Loading/LoadingView";
/* style */
const useStyles = makeStyles({
  root: {
    // trbl
    padding: "30px 20px 20px 30px",
  },
  title: {
    fontFamily: "Barlow",
    fontWeight: 500,
    fontSize: 36,
    color: "#2B2F3C",
    margin: "0px 20px 32px 10px",
  },
  wrapper: {
    background: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0px, 6px rgba(232, 238, 255, 0.3)",
    padding: "20px",
    margin: "0px 10px",
  },
  textButton: {
    color: PrimaryHard,
    textTransform: "capitalize",
  },
  tabContent: {
    margin: "0px 10px",
    paddingTop: 10,
    "& .MuiBox-root": {
      padding: 0,
    },
  },
  filterContainer: { margin: "0px 10px" },
});

// TABS PANEL COMPONENT
const ContentTabs = withStyles({
  indicator: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
    height: 3,
    "& > span": {
      width: "100%",
      backgroundColor: Constants.color.primaryHard,
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
      id={`content-tabpanel-${index}`}
      aria-labelledby={`content-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

// END TABS PANEL COMPONENT

function index() {
  const classes = useStyles();
  const history = useHistory();
  // Init TABS Value
  const [isLoading, setIsLoading] = useState(true); /* <------- loading Table */
  const [titleInfo, setTitleInfo] = useState();
  const [valueTab, setValueTab] = useState(0);
  const [dataSummary, setDataSummary] = useState([]);
  // Load Data

  function loadDataHandler(loaderValue) {
    setIsLoading(loaderValue);
  }
  useEffect(() => {
    doGetSummaryDocBast(loadDataHandler).then((response) => {
      if (response) {
        console.log("response summmary", response);
        const dummyData = [
          {
            id: 1,
            label: "New Loc",
            icon: <NewLoc />,
            description: "Jumlah BAST",
            bastAmount: response.data.newLocation,
          },
          {
            id: 2,
            label: "Terminasi",
            icon: <Terminasi />,
            description: "Jumlah BAST",
            bastAmount: response.data.termin,
          },
          {
            id: 3,
            label: "Replace",
            icon: <Replace />,
            description: "Jumlah BAST",
            bastAmount: response.data.replace,
          },
          {
            id: 4,
            label: "Migrasi",
            icon: <Migrasi />,
            description: "Jumlah BAST",
            bastAmount: response.data.migrasi,
          },
        ];
        setDataSummary(dummyData);
      }
    });
  }, []);

  /* Change Tab */
  const handleChangeTab = (event, newValueTab) => {
    setValueTab(newValueTab);
    let hashTab = "";
    if (newValueTab === 0) {
      hashTab = "new";
    }
    if (newValueTab === 1) {
      hashTab = "termin";
    }
    if (newValueTab === 2) {
      hashTab = "replace";
    }
    if (newValueTab === 3) {
      hashTab = "migrasi";
    }
    history.replace(`#${hashTab}`);
  };
  // check url hash
  useEffect(() => {
    const windowsHash = window.location.hash;
    if (windowsHash) {
      console.log("info", titleInfo);
      switch (windowsHash) {
        case "#new":
          setValueTab(0);
          break;
        case "#termin":
          setValueTab(1);

          break;
        case "#replace":
          setValueTab(2);

          break;
        case "#migrasi":
          setValueTab(3);

          break;
        default:
          setValueTab(0);
      }
    } else {
      setValueTab(0);
    }
  }, []);

  function a11yProps(index) {
    return {
      id: `content-tab-${index}`,
      "aria-controls": `content-tabpanel-${index}`,
    };
  }

  /* For Row */
  const RowData = (props) => {
    const { label, icon, description, bastAmount, isLoad } = props;
    return (
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        style={{ marginBottom: "10px" }}
      >
        <Grid
          container
          alignItems="center"
          direction="row"
          style={{ marginBottom: 10 }}
        >
          <Grid item>
            <div
              style={{
                marginRight: "8px",
                display: "flex",
                alignItems: "center",
              }}
            >
              {icon}
            </div>
          </Grid>
          <Grid item>
            <Typography style={{ fontSize: 15, fontWeight: 500 }}>
              {label}
            </Typography>
          </Grid>
        </Grid>
        <Grid container direction="row" justifyContent="space-between">
          <Grid item xs={7}>
            <Typography style={{ fontSize: 12, fontWeight: 500 }}>
              {description}
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography style={{ fontSize: 12, fontWeight: 500 }}>
              {bastAmount}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    );
  };
  RowData.propTypes = {
    // label: PropTypes.string.isRequired,
    label: PropTypes.string,
    description: PropTypes.string,
    bastAmount: PropTypes.string,
  };
  return (
    <div className={classes.root}>
      <Typography className={classes.title}>Document BAST</Typography>
      <Grid
        container
        alignItems="start"
        style={{ flexWrap: "nowrap", marginBottom: "24px" }}
      >
        {dataSummary.map((item) => {
          return (
            <>
              <Grid item xs={3} className={classes.wrapper}>
                <RowData
                  label={item.label}
                  icon={item.icon}
                  description={item.description}
                  bastAmount={item.bastAmount}
                  isLoad={isLoading}
                />
              </Grid>
            </>
          );
        })}
      </Grid>
      <div>
        <Grid container direction="column" spacing={1}>
          <Grid item>
            <ContentTabs
              value={valueTab}
              onChange={handleChangeTab}
              aria-label="content tabs"
            >
              <ContentTab
                label="New"
                {...a11yProps(0)}
                style={{ minWidth: 100 }}
              />
              <ContentTab
                label="Termin"
                {...a11yProps(1)}
                style={{ minWidth: 100 }}
              />
              <ContentTab
                label="Replace"
                {...a11yProps(2)}
                style={{ minWidth: 100 }}
              />
              <ContentTab
                label="Migrasi"
                {...a11yProps(3)}
                style={{ minWidth: 100 }}
              />
            </ContentTabs>
          </Grid>
          <Grid item style={{ width: "-webkit-fill-available" }}>
            <TabPanel value={valueTab} index={0} className={classes.tabContent}>
              <TabNew />
            </TabPanel>
            <TabPanel value={valueTab} index={1} className={classes.tabContent}>
              <TabTerminasi />
            </TabPanel>
            <TabPanel value={valueTab} index={2} className={classes.tabContent}>
              <TabReplace />
            </TabPanel>
            <TabPanel value={valueTab} index={3} className={classes.tabContent}>
              <TabMigrasi />
            </TabPanel>
          </Grid>
        </Grid>
        {/* <FloatingChat /> */}
      </div>
    </div>
  );
}

index.propTypes = {};

export default index;
