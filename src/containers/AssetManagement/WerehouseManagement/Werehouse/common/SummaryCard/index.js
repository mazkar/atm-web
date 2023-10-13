/* eslint-disable react/prop-types */
import { Box, Grid, makeStyles, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { Button, Row, Col } from "antd";
import constansts from "../../../../../../helpers/constants";
import { ReactComponent as ExchangeIcon } from "../../../../../../assets/icons/duotone-red/exchange-alt.svg";
import PropTypes from "prop-types";

const useStyles = makeStyles({
  root: {
    borderRadius: 10,
    backgroundColor: constansts.color.white,
    width: 280,
    padding: "18px 20px",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    marginRight: 20,
  },
  topContent: {
    fontSize: 15,
    fontWeight: 600,
    marginLeft: 5,
    color: constansts.color.dark,
  },
});

const SummaryCard = ({ data }) => {
  const classes = useStyles();

  return (
    <Row gutter={24}>
      <Col span={7}>
        <Box className={classes.root}>
          <Grid container justifyContent="space-between">
            <Grid
              item
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <ExchangeIcon />
              <Typography className={classes.topContent}>
                Total Mesin
              </Typography>
            </Grid>
            <Grid item>
              <Typography className={classes.topContent}>
                {data?.totalMachine}
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid
              container
              justifyContent="space-between"
              style={{ marginBottom: 10 }}
            >
              <Grid item>
                <Typography
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: constansts.color.dark,
                  }}
                >
                  Total Ready
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  style={{ fontSize: 13, fontWeight: 500, color: "#65D170" }}
                >
                  {data?.machineReady}
                </Typography>
              </Grid>
            </Grid>
            <Grid container justifyContent="space-between">
              <Grid item>
                <Typography
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: constansts.color.dark,
                  }}
                >
                  Total Not Ready
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  style={{ fontSize: 13, fontWeight: 500, color: "#FF6A6A" }}
                >
                  {data?.machineNotReady}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Col>
      <Col span={7}>
        <Box className={classes.root}>
          <Grid container justifyContent="space-between">
            <Grid
              item
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <ExchangeIcon />
              <Typography className={classes.topContent}>Total UPS</Typography>
            </Grid>
            <Grid item>
              <Typography className={classes.topContent}>
                {data?.totalUps}
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid
              container
              justifyContent="space-between"
              style={{ marginBottom: 10 }}
            >
              <Grid item>
                <Typography
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: constansts.color.dark,
                  }}
                >
                  Baik
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  style={{ fontSize: 13, fontWeight: 500, color: "#65D170" }}
                >
                  {data?.upsGood}
                </Typography>
              </Grid>
            </Grid>
            <Grid container justifyContent="space-between">
              <Grid item>
                <Typography
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: constansts.color.dark,
                  }}
                >
                  Rusak
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  style={{ fontSize: 13, fontWeight: 500, color: "#FF6A6A" }}
                >
                  {data?.upsNotGood}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Col>
      <Col span={7}>
        <Box className={classes.root}>
          <Grid container justifyContent="space-between">
            <Grid
              item
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <ExchangeIcon />
              <Typography className={classes.topContent}>Total DVR</Typography>
            </Grid>
            <Grid item>
              <Typography className={classes.topContent}>
                {data?.totalDvr}
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid
              container
              justifyContent="space-between"
              style={{ marginBottom: 10 }}
            >
              <Grid item>
                <Typography
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: constansts.color.dark,
                  }}
                >
                  Baik
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  style={{ fontSize: 13, fontWeight: 500, color: "#65D170" }}
                >
                  {data?.dvrGood}
                </Typography>
              </Grid>
            </Grid>
            <Grid container justifyContent="space-between">
              <Grid item>
                <Typography
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: constansts.color.dark,
                  }}
                >
                  Rusak
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  style={{ fontSize: 13, fontWeight: 500, color: "#FF6A6A" }}
                >
                  {data?.dvrNotGood}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Col>
    </Row>
  );
};

export default SummaryCard;
