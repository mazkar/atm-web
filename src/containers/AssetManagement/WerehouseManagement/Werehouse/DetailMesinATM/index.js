import { Box, Button, Grid, makeStyles, Typography } from "@material-ui/core";
import { ReactComponent as BackIcon } from "../../../../../assets/icons/general/arrow_back_red.svg";
import React from "react";
import constansts from "../../../../../helpers/constants";
import { useHistory, useParams } from "react-router-dom";
import HistoryList from "../common/HistoryList";
import ChatHistory from "../common/ChatHistory";
import DetailTabMesinATM from "./DetailTabMesinATM";

const useStyles = makeStyles({
  root: {
    padding: "30px 20px 20px 30px",
  },
  backLabel: {
    fontSize: 17,
    color: constansts.color.primaryHard,
    marginLeft: 5,
    textTransform: "capitalize",
  },
  titleContainer: {
    marginBottom: 25,
  },
  title: {
    fontFamily: "Barlow",
    fontWeight: 500,
    fontSize: 36,
    color: "#2B2F3C",
  },
  detailTitle: {
    borderBottom: `2px solid ${constansts.color.grayMedium}`,
    paddingBottom: 10,
    fontWeight: 600,
    fontSize: 13,
    color: constansts.color.grayMedium,
    marginBottom: 20,
  },
  historyTitle: {
    fontFamily: "Barlow",
    fontWeight: 600,
    fontSize: 15,
    color: constansts.color.dark,
    marginBottom: 15,
  },
});

const DetailMesinATMWerehouse = () => {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();
  return (
    <Box className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <Button onClick={() => history.push("/asset-management/inventory")}>
            <BackIcon />
            <Typography className={classes.backLabel}>Back</Typography>
          </Button>
        </Grid>
        <Grid xs={12} item className={classes.titleContainer}>
          <Typography className={classes.title}>Warehouse Management Detail</Typography>
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        <Grid item xs={7}>
          <Box
            style={{
              width: "100%",
              backgroundColor: constansts.color.white,
              borderRadius: 10,
              padding: "30px 20px",
              boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
            }}
          >
            <DetailTabMesinATM />
          </Box>
        </Grid>

        {/* History */}
        <Grid item xs={5}>
          <Box
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: constansts.color.white,
              borderRadius: 10,
              padding: "30px 20px",
              boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
            }}
          >
            <Typography className={classes.historyTitle}>History</Typography>
            <HistoryList />
            <Typography className={classes.historyTitle}>
              Chat History
            </Typography>
            <ChatHistory />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DetailMesinATMWerehouse;
