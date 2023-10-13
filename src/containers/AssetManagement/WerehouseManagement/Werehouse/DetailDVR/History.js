import { Box, makeStyles, Typography } from "@material-ui/core";
import constansts from "../../../../../helpers/constants";
import React, { useState, useEffect } from "react";
import { getDetailDvr } from "./servicesDvr";
import { getInitialName } from "./Utils";
import {
  numberFromText,
  todoListColors,
} from "../../../../../helpers/todoList";
import moment from "moment";

const useStyles = makeStyles({
  root: {
    height: "356px",
    border: `1px solid ${constansts.color.grayMedium}`,
    borderRadius: 10,
    marginBottom: 30,
    padding: "10px 5px 10px 10px",
    overflowY: "scroll",
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "start",
  },
  leftItems: {
    display: "flex",
    alignItems: "start",
  },
  circle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    background: "linear-gradient(44.18deg, #F19D1F 0%, #FFC062 87.52%)",
    borderRadius: "50%",
    color: constansts.color.white,
    fontWeight: 600,
    fontSize: 16,
  },
  timeContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "end",
    flexDirection: "column",
  },
  line: {
    margin: "20px 0",
    borderBottom: "2px dashed #8D98B4",
    width: 40,
    transform: "rotate(90deg)",
  },
});

const HistoryList = () => {
  const classes = useStyles();
  const [listsHistory, setListsHistory] = useState([]);
  function historyLists() {
    getDetailDvr(`detailDvr?id=3`).then((res) => {
      var tempList = [];
      tempList = res.data;
      console.log("list history => ", tempList.history);
      setListsHistory(tempList.history);
    });
  }

  useEffect(() => {
    historyLists();
  }, []);
  return (
    <Box className={classes.root}>
      {listsHistory.map((data, idx) => (
        <Box key={idx} className={classes.container}>
          <Box className={classes.leftItems}>
            <Box>
              <Box
                className={classes.circle}
                style={{
                  background:
                    todoListColors[
                      numberFromText(getInitialName(data.userName)) %
                        todoListColors.length
                    ],
                }}
              >
                {getInitialName(data.userName)}
              </Box>
              {listsHistory.length - 1 != idx ? (
                <div className={classes.line} />
              ) : (
                ""
              )}
            </Box>
            <Box style={{ marginLeft: "10px" }}>
              <Typography
                style={{
                  fontFamily: "Barlow",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#2B2F3C",
                }}
              >
                {data.userName}
              </Typography>
              <Typography
                style={{
                  fontFamily: "Barlow",
                  fontSize: "13px",
                  fontWeight: 400,
                  color: "#8D98B4",
                }}
              >
                {data.message}
              </Typography>
            </Box>
          </Box>
          <Box className={classes.timeContainer}>
            <Typography
              style={{
                fontFamily: "Barlow",
                fontSize: "13px",
                fontWeight: 600,
                color: "#2B2F3C",
              }}
            >
              {moment.unix(data.createdDate / 1000).format("DD-MM-YYYY")}
            </Typography>
            <Typography
              style={{
                fontFamily: "Barlow",
                fontSize: "13px",
                fontWeight: 400,
                color: "#8D98B4",
              }}
            >
              {moment.unix(data.createdDate / 1000).format("HH:mm")}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default HistoryList;
