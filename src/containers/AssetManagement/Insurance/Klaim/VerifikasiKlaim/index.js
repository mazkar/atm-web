import React from "react";
import MuiIconLabelButton from "../../../../../components/Button/MuiIconLabelButton";
import { ReactComponent as LeftArrow } from "../../../../../assets/icons/linear-red/arrow-left.svg";
import { useHistory } from "react-router-dom";
import { Box, Grid, makeStyles, Typography } from "@material-ui/core";
import TabInformasi from "./TabInformasi";
import HistoryList from "../../../../../components/AssetManagement/HistoryList";
import ChatHistory from "../../../../../components/AssetManagement/ChatHistory";

const useStyles = makeStyles({
  root: {
    padding: "30px 20px 20px 30px",
  },
  title: {
    fontFamily: "Barlow",
    fontWeight: 500,
    fontSize: 36,
    color: "#2B2F3C",
  },
  history: {
    backgroundColor: "#FFFFFF",
    padding: "30px 20px",
    flex: 0.5,
    borderRadius: "10px",
    boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
  },
});
const VerifikasiKlaim = () => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <MuiIconLabelButton
            label={"Back"}
            iconPosition="startIcon"
            buttonIcon={<LeftArrow />}
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
      <Grid container spacing={4} style={{ marginTop: 10 }}>
        <Grid item xs={7}>
          <TabInformasi />
        </Grid>
        <Grid item xs={5}>
          <Box className={classes.history}>
            <HistoryList />
            <ChatHistory />
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default VerifikasiKlaim;
