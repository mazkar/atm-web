import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { Col, Row, Space } from "antd";
import { Grid, Typography } from "@material-ui/core";
import * as ThemeColor from "../../../../assets/theme/colors";
import constants from "../../../../helpers/constants";
import LoadingView from "../../../../components/Loading/LoadingView";

// Icon
import { ReactComponent as IconDoing } from "../assets/IconDoing.svg";
import { ReactComponent as IconTodo } from "../assets/IconTodo.svg";
import { ReactComponent as IconTotalAllTask } from "../assets/IconTotalAllTask.svg";
import { ReactComponent as IconMigrasi } from "../assets/IconTotalDone.svg";

const useStyles = makeStyles({
  root: {
    display: "flex",
    borderRadius: 10,
    // border: '1px solid #BCC8E7',
  },
  lefSide: {
    textAlign: "center",
    backgroundImage: "linear-gradient(137.73deg, #ffb443 0%, #ffb443 100%)",
    width: 20,
    borderTopLeftRadius: 9,
    borderBottomLeftRadius: 9,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  lefSideToDo: {
    textAlign: "center",
    backgroundImage: "linear-gradient(137.73deg, #ff7171 0%, #ff7171 100%)",
    width: 20,
    borderTopLeftRadius: 9,
    borderBottomLeftRadius: 9,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  lefSideDoing: {
    textAlign: "center",
    backgroundImage: "linear-gradient(137.73deg, #749bff 0%, #749bff 100%)",
    width: 20,
    borderTopLeftRadius: 9,
    borderBottomLeftRadius: 9,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  lefSideDone: {
    textAlign: "center",
    backgroundImage: "linear-gradient(137.73deg, #65d170 0%, #65d170 100%)",
    width: 20,
    borderTopLeftRadius: 9,
    borderBottomLeftRadius: 9,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  content: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingRight: 5,
    paddingLeft: 5,
    display: "flex",
    alignItems: "center",
    backgroundColor: "#fff",
    width: "275px",
  },
});

export default function CardTask(props) {
  const classes = useStyles(props);
  const [isLoading, setIsLoading] = useState(false);
  const [dataFromFetch, setDataFromFetch] = useState([]);

  // get Data Card

  const configNew = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };

  async function getDataCard() {
    setIsLoading(true);
    // console.log('~ dataRequest', dataRequest);
    try {
      const result = await axios.get(
        `${constants.PROJECT_MANAGEMENT_SERVICE}/summaryTimeline`,
        configNew
      );
      console.log("res card Project Management", result.data);
      setDataFromFetch(result.data);
    } catch (err) {
      alert(`Error Fetching Card Project Management ...! \n${err}`);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    getDataCard();
  }, []);

  return (
    <>
      <Row gutter={24}>
        <Col gutter="row" xl={6}>
          {isLoading ? (
            <LoadingView />
          ) : (
            <div className={classes.root}>
              <div className={classes.lefSide}>{null}</div>
              <Row gutter={24} direction="column" className={classes.content}>
                <Col>
                  <IconTotalAllTask />
                </Col>
                <Col>
                  <Typography style={{ fontWeight: 500 }}>
                    Total All Task
                  </Typography>
                </Col>
                <Col>
                  <Typography style={{ fontWeight: 800 }}>
                    {dataFromFetch.totalAllTask}
                  </Typography>
                </Col>
              </Row>
            </div>
          )}
        </Col>
        <Col gutter="row" xl={6}>
          {isLoading ? (
            <LoadingView />
          ) : (
            <div className={classes.root}>
              <div className={classes.lefSideToDo}>{null}</div>
              <Row gutter={24} direction="column" className={classes.content}>
                <Col>
                  <IconTodo />
                </Col>
                <Col>
                  <Typography style={{ fontWeight: 500 }}>
                    Total Todo
                  </Typography>
                </Col>
                <Col>
                  <Typography style={{ fontWeight: 800 }}>
                    {" "}
                    {dataFromFetch.totalToDO}
                  </Typography>
                </Col>
              </Row>
            </div>
          )}
        </Col>
        <Col gutter="row" xl={6}>
          {isLoading ? (
            <LoadingView />
          ) : (
            <div className={classes.root}>
              <div className={classes.lefSideDoing}>{null}</div>
              <Row gutter={24} direction="column" className={classes.content}>
                <Col>
                  <IconDoing />
                </Col>
                <Col>
                  <Typography style={{ fontWeight: 500 }}>
                    Total Doing
                  </Typography>
                </Col>
                <Col>
                  <Typography style={{ fontWeight: 800 }}>
                    {" "}
                    {dataFromFetch.totalDoing}
                  </Typography>
                </Col>
              </Row>
            </div>
          )}
        </Col>
        <Col gutter="row" xl={6}>
          {isLoading ? (
            <LoadingView />
          ) : (
            <div className={classes.root}>
              <div className={classes.lefSideDone}>{null}</div>
              <Row gutter={24} direction="column" className={classes.content}>
                <Col>
                  <IconMigrasi />
                </Col>
                <Col>
                  <Typography style={{ fontWeight: 500 }}>
                    Total Done
                  </Typography>
                </Col>
                <Col>
                  <Typography style={{ fontWeight: 800 }}>
                    {" "}
                    {dataFromFetch.totalDone}
                  </Typography>
                </Col>
              </Row>
            </div>
          )}
        </Col>
      </Row>
    </>
  );
}
