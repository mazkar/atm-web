import { Box, Button, Grid, makeStyles, Typography } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import MuiIconLabelButton from "../../../../../components/Button/MuiIconLabelButton";
import { ReactComponent as LeftArrowIcon } from "../../../../../assets/icons/siab/arrow-left.svg";
import { useHistory } from "react-router-dom";
import HistoryList from "../../../../../components/AssetManagement/HistoryList";
import ChatHistory from "../../../../../components/AssetManagement/ChatHistory";
import TabNonAsuransi from "./TabNonAsuransi";
import TabAsuransi from "./TabAsuransi";
import { ChkyButtons } from "../../../../../components";
import { useSessionStorage } from "react-use-sessionstorage";
import { RootContext } from "../../../../../router";

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
    marginBottom: 20,
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

const DetailKlaimApproval = () => {
  const classes = useStyles();
  const history = useHistory();
  const [valueTab, setValueTab] = useState(0);
  const [isSelected, setIsSelected] = useState(true);
  const { userRoleName } = useContext(RootContext);

  const handleChangeTab = (newValueTab) => {
    setValueTab(newValueTab);
    let hashTab = "";
    if (newValueTab === 0) {
      hashTab = "non-asuransi";
    }
    if (newValueTab === 1) {
      hashTab = "asuransi";
    }
    history.replace(`#${hashTab}`);
  };

  useEffect(() => {
    const windowsHash = window.location.hash;
    if (windowsHash) {
      switch (windowsHash) {
        case "#non-asuransi":
          setValueTab(0);
          setIsSelected(true);
          break;
        case "#asuransi":
          setValueTab(1);
          setIsSelected(false);
          break;
        default:
          setValueTab(0);
          setIsSelected(true);
      }
    } else {
      setValueTab(0);
      setIsSelected(true);
    }
  }, []);

  return (
    <Box className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <MuiIconLabelButton
            label={"Back"}
            iconPosition="startIcon"
            buttonIcon={<LeftArrowIcon />}
            onClick={() => {
              history.goBack();
            }}
            style={{ background: "inherit", color: "#DC241F", padding: 0 }}
          />
        </Grid>
        <Grid item xs={12} style={{ marginTop: 20 }}>
          <Typography className={classes.title}>Detail Klaim</Typography>
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        <Grid item xs={7}>
          <Box className={classes.informationVendor}>
            <Box className={classes.buttonAsuransi}>
              <Button
                className={classes.nonInsurance}
                onClick={() => {
                  setIsSelected(true);
                  handleChangeTab(0);
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
                  handleChangeTab(1);
                }}
                style={{
                  backgroundColor: !isSelected ? "#DC241F" : "#F4F7FB",
                  color: !isSelected ? "#FFFFFF" : "#BCC8E7",
                  fontWeight: !isSelected ? "normal" : 500,
                }}
              >
                Asuransi
              </Button>
            </Box>
            <TabPanel value={valueTab} index={0} style={{ paddingTop: 0 }}>
              <TabNonAsuransi />
            </TabPanel>
            <TabPanel value={valueTab} index={1} style={{ paddingTop: 0 }}>
              <TabAsuransi />
            </TabPanel>
            {userRoleName === "Admin" ? (
              <Grid
                container
                justifyContent="space-between"
                style={{ marginTop: 20 }}
              >
                <Grid item>
                  <ChkyButtons style={{ textTransform: "none" }}>
                    Reject
                  </ChkyButtons>
                </Grid>
                <Grid item>
                  <ChkyButtons
                    buttonType="greenFilled"
                    style={{ textTransform: "none" }}
                  >
                    Approve
                  </ChkyButtons>
                </Grid>
              </Grid>
            ) : (
              <Grid
                container
                justifyContent="space-between"
                style={{ marginTop: 20 }}
              >
                <Grid item>
                  <ChkyButtons
                    buttonType="redOutlined"
                    style={{ textTransform: "none" }}
                  >
                    Cancel
                  </ChkyButtons>
                </Grid>
                <Grid item>
                  <ChkyButtons style={{ textTransform: "none" }}>
                    Simpan
                  </ChkyButtons>
                </Grid>
              </Grid>
            )}
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

export default DetailKlaimApproval;
