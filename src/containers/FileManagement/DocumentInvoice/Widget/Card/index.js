import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import axios from "axios";
import { Card, Grid, Typography, Paper } from "@material-ui/core";
import { Layout, Row, Col } from "antd";
import { PrimaryHard } from "../../../../../assets/theme/colors";
import constants from "../../../../../helpers/constants";
import LoadingView from "../../../../../components/Loading/LoadingView";

// Icon
import { ReactComponent as IconNewLoc } from "../../Icon/IconNewLoc.svg";
import { ReactComponent as IconTerminasi } from "../../Icon/IconTerminasi.svg";
import { ReactComponent as IconReplace } from "../../Icon/IconReplace.svg";
import { ReactComponent as IconMigrasi } from "../../Icon/IconMigrasi.svg";

const UseStyles = makeStyles({
  containerCard: {
    marginTop: 16,
  },
  card: {
    height: 100,
    borderRadius: 10,
    padding: "20px 15px 20px 15px",
  },
  titleCard: {
    fontSize: 16,
    fontWeight: 500,
  },
});

export default function CardDocInvoice() {
  const [dataSummary, setDataSummary] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function getDataSummary() {
    setIsLoading(true);
    // console.log('~ dataRequest', dataRequest);
    try {
      const result = await axios.get(
        `${constants.FILE_MANAGEMENT_SERVICE}/summaryDocInvoice`
      );
      console.log("res Doc Invoice Summary", result.data.data);
      setDataSummary(result.data.data);
    } catch (err) {
      alert(`Error Fetching Data Orders ...! \n${err}`);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    getDataSummary();
  }, []);

  const classes = UseStyles();
  return (
    <div>
      <Row gutter={24} className={classes.containerCard}>
        <Col gutter="row" xl={6}>
          {isLoading ? (
            <LoadingView />
          ) : (
            <Paper className={classes.card}>
              <Row gutter={24}>
                <Col gutter="row" xl={3}>
                  <IconNewLoc />
                </Col>
                <Col gutter="row" xl={8}>
                  <Typography className={classes.titleCard}>New Loc</Typography>
                </Col>
              </Row>
              <Row gutter={24} style={{ marginTop: 6 }}>
                <Col gutter="row" xl={12}>
                  <Typography style={{ fontSize: 14, fontWeight: 500 }}>
                    Submission
                  </Typography>
                </Col>
                <Col gutter="row" xl={8}>
                  <Typography className={classes.titleCard}>
                    {dataSummary[1]?.submission}
                  </Typography>
                </Col>
              </Row>
              {/* <Row gutter={24} style={{ marginTop: 6 }}>
                <Col gutter="row" xl={12}>
                  <Typography style={{ fontSize: 14, fontWeight: 500 }}>
                    Actual
                  </Typography>
                </Col>
                <Col gutter="row" xl={6}>
                  <Typography
                    className={classes.titleCard}
                    style={{ color: "#79d782" }}
                  >
                    500
                  </Typography>
                </Col>
                <Col gutter="row" xl={6}>
                  <Typography
                    className={classes.titleCard}
                    style={{ color: "#79d782" }}
                  >
                    50 %
                  </Typography>
                </Col>
              </Row> */}
            </Paper>
          )}
        </Col>
        <Col gutter="row" xl={6}>
          {isLoading ? (
            <LoadingView />
          ) : (
            <Paper className={classes.card}>
              <Row gutter={24}>
                <Col gutter="row" xl={3}>
                  <IconTerminasi />
                </Col>
                <Col gutter="row" xl={8}>
                  <Typography className={classes.titleCard}>
                    Terminasi
                  </Typography>
                </Col>
              </Row>
              <Row gutter={24} style={{ marginTop: 6 }}>
                <Col gutter="row" xl={12}>
                  <Typography style={{ fontSize: 14, fontWeight: 500 }}>
                    Submission
                  </Typography>
                </Col>
                <Col gutter="row" xl={8}>
                  <Typography className={classes.titleCard}>
                    {dataSummary[0]?.submission}
                  </Typography>
                </Col>
              </Row>
              {/* <Row gutter={24} style={{ marginTop: 6 }}>
                <Col gutter="row" xl={12}>
                  <Typography style={{ fontSize: 14, fontWeight: 500 }}>
                    Actual
                  </Typography>
                </Col>
                <Col gutter="row" xl={6}>
                  <Typography
                    className={classes.titleCard}
                    style={{ color: "#79d782" }}
                  >
                    500
                  </Typography>
                </Col>
                <Col gutter="row" xl={6}>
                  <Typography
                    className={classes.titleCard}
                    style={{ color: "#79d782" }}
                  >
                    50 %
                  </Typography>
                </Col>
              </Row> */}
            </Paper>
          )}
        </Col>
        <Col gutter="row" xl={6}>
          {isLoading ? (
            <LoadingView />
          ) : (
            <Paper className={classes.card}>
              <Row gutter={24}>
                <Col gutter="row" xl={3}>
                  <IconReplace />
                </Col>
                <Col gutter="row" xl={8}>
                  <Typography className={classes.titleCard}>Replace</Typography>
                </Col>
              </Row>
              <Row gutter={24} style={{ marginTop: 6 }}>
                <Col gutter="row" xl={12}>
                  <Typography style={{ fontSize: 14, fontWeight: 500 }}>
                    Submission
                  </Typography>
                </Col>
                <Col gutter="row" xl={8}>
                  <Typography className={classes.titleCard}>
                    {dataSummary[3]?.submission}
                  </Typography>
                </Col>
              </Row>
              {/* <Row gutter={24} style={{ marginTop: 6 }}>
                <Col gutter="row" xl={12}>
                  <Typography style={{ fontSize: 14, fontWeight: 500 }}>
                    Actual
                  </Typography>
                </Col>
                <Col gutter="row" xl={6}>
                  <Typography
                    className={classes.titleCard}
                    style={{ color: "#79d782" }}
                  >
                    500
                  </Typography>
                </Col>
                <Col gutter="row" xl={6}>
                  <Typography
                    className={classes.titleCard}
                    style={{ color: "#79d782" }}
                  >
                    50 %
                  </Typography>
                </Col>
              </Row> */}
            </Paper>
          )}
        </Col>
        <Col gutter="row" xl={6}>
          {isLoading ? (
            <LoadingView />
          ) : (
            <Paper className={classes.card}>
              <Row gutter={24}>
                <Col gutter="row" xl={3}>
                  <IconMigrasi />
                </Col>
                <Col gutter="row" xl={8}>
                  <Typography className={classes.titleCard}>Migrasi</Typography>
                </Col>
              </Row>
              <Row gutter={24} style={{ marginTop: 6 }}>
                <Col gutter="row" xl={12}>
                  <Typography style={{ fontSize: 14, fontWeight: 500 }}>
                    Submission
                  </Typography>
                </Col>
                <Col gutter="row" xl={8}>
                  <Typography className={classes.titleCard}>
                    {dataSummary[2]?.submission}
                  </Typography>
                </Col>
              </Row>
              {/* <Row gutter={24} style={{ marginTop: 6 }}>
                <Col gutter="row" xl={12}>
                  <Typography style={{ fontSize: 14, fontWeight: 500 }}>
                    Actual
                  </Typography>
                </Col>
                <Col gutter="row" xl={6}>
                  <Typography
                    className={classes.titleCard}
                    style={{ color: "#79d782" }}
                  >
                    500
                  </Typography>
                </Col>
                <Col gutter="row" xl={6}>
                  <Typography
                    className={classes.titleCard}
                    style={{ color: "#79d782" }}
                  >
                    50 %
                  </Typography>
                </Col>
              </Row> */}
            </Paper>
          )}
        </Col>
      </Row>
    </div>
  );
}
