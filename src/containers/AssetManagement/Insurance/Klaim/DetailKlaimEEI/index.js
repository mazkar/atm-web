import { Box, Button, Grid, makeStyles, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import React, { useState } from "react";
import HistoryList from "./HistoryList/HistoryList";
import MuiIconLabelButton from "../../../../../components/Button/MuiIconLabelButton";
import { ReactComponent as LeftArrowIcon } from "../../../../../assets/icons/siab/arrow-left.svg";
import DetailKlaimNonAsuransi from "./DetailKlaimNonAsuransi";
import DetailKlaimAsuransi from "./DetailKlaimAsuransi";
import ChatHistory from "./ChatHistory";

const useStyles = makeStyles({
  root: {
    padding: "30px 20px 20px 30px",
  },
  informationVendor: {
    backgroundColor: "#FFFFFF",
    padding: "20px 30px 30px",
    minHeight: 360,
    flex: 1,
    // marginRight: "30px",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
  },
  title: {
    color: "#2B2F3C",
    fontSize: "36px",
    fontWeight: 500,
    fontFamily: "Barlow",
    marginBottom: "24px",
  },
  history: {
    backgroundColor: "#FFFFFF",
    padding: "30px 20px",
    flex: 0.5,
    borderRadius: "10px",
  },
  buttonAsuransi: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  nonInsurance: {
    textTransform: "none",
    borderRadius: "6px 0 0 6px",
    padding: "10px 20px",
    fontSize: "12px",
  },
  insurance: {
    textTransform: "none",
    borderRadius: "0 6px 6px 0",
    padding: "10px 20px",
    fontSize: "12px",
  },
});

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
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const DetailKlaimEEI = () => {
  const classes = useStyles();
  const history = useHistory();
  const [valueTab, setValueTab] = useState(0);
  const [isSelected, setIsSelected] = useState(true);
  return (
    <Box className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <MuiIconLabelButton
            label="Back"
            iconPosition="startIcon"
            buttonIcon={<LeftArrowIcon />}
            onClick={() => {
              history.goBack();
            }}
            style={{ background: "inherit", color: "#DC241F", padding: 0 }}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography className={classes.title}>Insurance Detail</Typography>
        </Grid>
        {/* <ContentHeader /> */}
      </Grid>
      {/* <Box
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "30px",
          minHeight: 280,
        }}
      > */}
      <Grid container spacing={4}>
        <Grid item xs={7}>
          <Box className={classes.informationVendor}>
            {/* <Box className={classes.buttonAsuransi}>
              <Button
                className={classes.nonInsurance}
                onClick={() => {
                  setIsSelected(true);
                  setValueTab(0);
                }}
                style={{
                  backgroundColor: isSelected ? "#DC241F" : "#F4F7FB",
                  color: isSelected ? "#FFFFFF" : "#BCC8E7",
                  fontWeight: isSelected ? "normal" : 500,
                }}
              >
                Non Asuransi
              </Button>
              <Button
                className={classes.insurance}
                onClick={() => {
                  setIsSelected(false);
                  setValueTab(1);
                }}
                style={{
                  backgroundColor: !isSelected ? "#DC241F" : "#F4F7FB",
                  color: !isSelected ? "#FFFFFF" : "#BCC8E7",
                  fontWeight: !isSelected ? "normal" : 500,
                }}
              >
                Asuransi
              </Button>
            </Box> */}
            <TabPanel value={valueTab} index={0} style={{ paddingTop: 0 }}>
              {/* <InsuranceButton /> */}
              <DetailKlaimNonAsuransi />
            </TabPanel>
            <TabPanel value={valueTab} index={1} style={{ paddingTop: 0 }}>
              {/* <InsuranceButton /> */}
              <DetailKlaimAsuransi />
            </TabPanel>
          </Box>
        </Grid>
        <Grid item xs={5}>
          <Box className={classes.history}>
            <HistoryList />
            <ChatHistory />
          </Box>
        </Grid>
      </Grid>
    </Box>
    // </Box>
  );
};

export default DetailKlaimEEI;
