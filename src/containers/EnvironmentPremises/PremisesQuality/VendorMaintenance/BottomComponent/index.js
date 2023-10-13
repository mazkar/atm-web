import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  Button,
  Paper,
  InputBase,
  Box,
  Tabs,
  Tab,
} from "@material-ui/core";
// import LeftIcon from "../../../../../assets/icons/siab/chevron-left.svg";
// import RightIcon from "../../../../../assets/icons/siab/chevron-right.svg";
import Pagination from "@material-ui/lab/Pagination";
import { Menu } from "antd";
import { withTranslation } from "react-i18next";
import { useHistory, useParams, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Divider from "@material-ui/core/Divider";

import ATM1 from "../../../../../assets/images/atm-1.png";


import constants from "../../../../../helpers/constants";



import { ReactComponent as RightIcon } from "../../../../../assets/icons/siab/chevron-right.svg";
import { ReactComponent as LeftIcon } from "../../../../../assets/icons/siab/chevron-left.svg";




import SideBar from "../../../../VendorManagement/Digitalisasi/CheclistResult/common/SideBar";


import { TabPanel } from "../../../../../components/TabsMui";

import {VendorMaintenance} from "../../../../VendorManagement/Digitalisasi/CheclistResult/common/DataDummy";
import QnAItem from "../../../../VendorManagement/Digitalisasi/CheclistResult/common/QnAItem";

const useStyles = makeStyles({
  root: {
    width: "100%",
    "& .MuiPaper-elevation1": {
      boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
    },
  },
  paper: { 
    padding: 10,
    borderRadius: 10, 
  },
  rootTabs: {
    minHeight: 40,
    color: constants.color.primaryHard,
  },
  tabsIndicator: {
    display: "none",
  },
  backAction: {
    backgroundColor: "unset",
    padding: 0,
    borderRadius: 10,
    "& .MuiButton-root": {
      padding: 0,
      textTransform: "none",
      backgroundColor: constants.color.primaryUltaSoft,
    },
    "& .MuiButton-root:hover": {
      opacity: 0.6,
      backgroundColor: constants.color.primaryUltaSoft,
    },
  },
  rootItemTabs: {
    minHeight: 40,
    minWidth: 72,
    fontSize: 13,
    textAlign: "left",
    justifyContent: "left",
    justifyItems: "left",
  },
  pagination: {
    padding: 5,
    borderRadius: 10,
    "& .Mui-selected": {
      backgroundColor: constants.color.primaryUltaSoft,
    },
    "& .MuiPaginationItem-root": {
      color: constants.color.primaryHard,
    },
  },
  selectedTabItem: {
    backgroundColor: constants.color.primaryHard,
    color: constants.color.white,
  },
  wrapperTabItem: {
    textTransform: "none",
  },
  textStyle: {
    fontWeight: 600,
    color: "#2B2F3C",
    fontSize: "13px",
  },
  textValue: {
    fontWeight: 400,
    color: "#2B2F3C",
    fontSize: "13px",
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
});


const BottomComponent = (props) => {
  const classes = useStyles();
  const [isClicked, setIsClicked] = useState(false);
  const [activeMenu, setActiveMenu] = useState(0);
  const { data, dataResponse, handleChangeStates, isLoadData } = props;

  return (
    <div className={classes.root}>
      <Grid container direction="row" spacing={4}>
        <Grid item xs={3}>
          <SideBar
            title="Vendor Maintenance Premises"
            items={[
              {
                label: "Maintenance Premises",
                count: 9,
                value: 0,
              },
              {
                label: "Potensi Modus Kejahatan",
                count: 8,
                value: 1,
              },
              {
                label: "Cek Media Promosi",
                count: 11,
                value: 2,
              },
              {
                label: "Cek Kondisi Ruangan",
                count: 11,
                value: 3,
              },
            
            
            
            ]}
            value={activeMenu}
            onValueChange={(newVal) => setActiveMenu(newVal)}
          />
        </Grid>
        <Grid item xs={9}>
          <Paper className={classes.paper}>
            <Grid container direction="row" style={{ paddingLeft: 20 }}>
              <Grid item xs={4}>
                <Typography style={{ fontWeight: 600, color: "#2B2F3C" }}>
                  Question
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography style={{ fontWeight: 600, color: "#2B2F3C" }}>
                  Answer
                </Typography>
              </Grid>
            </Grid>
            <Divider
              variant="fullWidth"
              style={{
                height: "2px",
                backgroundColor: "#BCC8E7",
                marginTop: 10,
                marginBottom: 10
              }}
            />
            <TabPanel value={activeMenu} index={0} className={classes.tabContent}>
              <QnAItem data={data.maintenanceSurvei}/>
            </TabPanel>
            <TabPanel value={activeMenu} index={1} className={classes.tabContent}>
              <QnAItem data={data.modusKejahatan}/>
            </TabPanel>
            <TabPanel value={activeMenu} index={2} className={classes.tabContent}>
              <QnAItem data={data.mediaPromosi}/>
            </TabPanel>
            <TabPanel value={activeMenu} index={3} className={classes.tabContent}>
              <QnAItem data={data.kondisiRuangan}/>
            </TabPanel>
            
            
          </Paper>
          <Grid item style={{ marginTop: 20 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                margin: 20,
              }}
            >
              <Button variant="outlined" className={classes.backAction}>
                <LeftIcon />
              </Button>
              <Typography style={{ fontWeight: 600, margin: 5, fontSize: 20 }}>
                Ticket T123
              </Typography>
              <Button variant="outlined" className={classes.backAction}>
                <RightIcon />
              </Button>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default BottomComponent;
