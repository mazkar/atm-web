import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/styles";
import { Typography, Grid, Tabs, Tab, Box, Button } from "@material-ui/core";
import Constants from "../../../helpers/constants";
import * as ThemeColor from "../../../assets/theme/colors";
import { useHistory } from "react-router-dom";
import ConfigurationDocProject from "./DocProject";
import ConfigurationDocControl from "./DocControl";
import ConfigurationKnowledgeBase from "./KnowledgeBase";

const UseStyles = makeStyles({
  root: {
    "&$selected": {
      backgroundColor: "#FFF5F4",
    },
  },
  selected: {},
  rootPage: {
    padding: "30px 20px 20px 30px",
  },
  title: {
    fontFamily: "Barlow",
    fontWeight: 500,
    fontSize: 36,
    color: "#2B2F3C",
  },
  titleContainer: {
    marginBottom: 25,
  },
  folderBox: {
    borderRadius: "10px 10px 0px 0px",
    height: 550,
  },
  allFolder: {
    fontFamily: "Barlow",
    fontSize: 17,
    fontWeight: 600,
    color: "#2B2F3C",
    marginBottom: 25,
    padding: "20px 20px 0px 20px",
  },
  addButton: {
    padding: 20,
    borderRadius: "0px 0px 10px 10px",
  },
});

function Configuration(props) {
  const history = useHistory();
  const {
    location: { hash },
  } = history;
  const classes = UseStyles();

  // CONTENT TABS
  const hashValues = ["docControl", "docProject", "knowledgeBase"];
  const index = hashValues.indexOf(hash.replace("#", ""));
  const tabValue = index >= 0 ? index : 0;
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

  const handleChange = (event, newTabValue) => {
    event.preventDefault();
    history.push(`#${hashValues[newTabValue]}`);
  };

  //END CONTENT TABS

  return (
    <div className={classes.rootPage}>
      <Grid container className={classes.title}>
        <Grid item>
          <Typography className={classes.title}>Configuration</Typography>
        </Grid>
      </Grid>

      {/* tab */}
      <Grid
        container
        direction="column"
        className={classes.titleContainer}
        style={{ marginTop: 25 }}
      >
        <Grid item xs={12}>
          <ContentTabs
            value={tabValue}
            onChange={handleChange}
            aria-label="simple tabs example"
          >
            <ContentTab label="Doc Control" {...a11yProps(0)} />
            <ContentTab label="Doc Project" {...a11yProps(1)} />
            <ContentTab label="Knowledge Base" {...a11yProps(2)} />
          </ContentTabs>
        </Grid>

        <TabPanel value={tabValue} index={0}>
          <ConfigurationDocControl />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <ConfigurationDocProject />
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <ConfigurationKnowledgeBase />
        </TabPanel>
      </Grid>
      {/* end tab */}
    </div>
  );
}

export default Configuration;
