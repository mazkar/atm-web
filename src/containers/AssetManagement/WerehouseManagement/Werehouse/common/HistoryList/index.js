import { Box, makeStyles, Typography } from "@material-ui/core";
import constansts from "../../../../../../helpers/constants";
import React from "react";
import useTimestampConverter from "../../../../../../helpers/useTimestampConverter";
import {
  getInitialName,
  numberFromText,
  todoListColors,
} from "../../../../../../helpers/todoList";

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

const DUMMY_DATA = [
  {
    name: "Ko Edi",
    initial: "KE",
    description: "Create Task",
    date: "12-12-2020",
    time: "12:36:12 AM",
    bg: "linear-gradient(44.18deg, #F19D1F 0%, #FFC062 87.52%)",
  },
  {
    name: "Rudi Andika",
    initial: "RA",
    description: "Submit Penawaran Harga",
    date: "12-12-2020",
    time: "12:36:12 AM",
    bg: "linear-gradient(44.18deg, #D50A2E 0%, #FB6388 87.52%)",
  },
  {
    name: "Rudi Andika",
    initial: "RA",
    description: "Edit Penawaran Harga",
    date: "12-12-2020",
    time: "12:36:12 AM",
    bg: "linear-gradient(44.18deg, #D50A2E 0%, #FB6388 87.52%)",
  },
  {
    name: "Rudi Andika",
    initial: "RA",
    description: "Submit Penawaran Harga",
    date: "12-12-2020",
    time: "12:36:12 AM",
    bg: "linear-gradient(44.18deg, #D50A2E 0%, #FB6388 87.52%)",
  },
  {
    name: "Mahardika Z",
    initial: "MZ",
    description: "Terima Penawaran Harga",
    date: "12-12-2020",
    time: "12:36:12 AM",
    bg: "linear-gradient(44.18deg, #1F27F1 0%, #8286FF 87.52%)",
  },
  {
    name: "Approval",
    initial: "AL",
    description: "Create Task",
    date: "12-12-2020",
    time: "12:36:12 AM",
    bg: "linear-gradient(44.18deg, #1DD519 0%, #58ED4B 87.52%)",
  },
  {
    name: "Rudi Andika",
    initial: "RA",
    description: "Pekerjaan Ongoing",
    date: "12-12-2020",
    time: "12:36:12 AM",
    bg: "linear-gradient(44.18deg, #D50A2E 0%, #FB6388 87.52%)",
  },
  {
    name: "Rudi Andika",
    initial: "RA",
    description: "Pekerjaan Done",
    date: "12-12-2020",
    time: "12:36:12 AM",
    bg: "linear-gradient(44.18deg, #D50A2E 0%, #FB6388 87.52%)",
  },
];

const HistoryList = ({ data }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      {data.map((item, idx) => {
        const initialName = getInitialName(item.userName);
        const backgroundColorRand =
          todoListColors[numberFromText(initialName) % todoListColors.length];

        return (
          <Box key={idx} className={classes.container}>
            <Box className={classes.leftItems}>
              <Box>
                <Box
                  className={classes.circle}
                  style={{
                    background: backgroundColorRand,
                    textTransform: "uppercase",
                  }}
                >
                  {initialName}
                </Box>
                {item.length - 1 != idx ? <div className={classes.line} /> : ""}
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
                  {item.userName}
                </Typography>
                <Typography
                  style={{
                    fontFamily: "Barlow",
                    fontSize: "13px",
                    fontWeight: 400,
                    color: "#8D98B4",
                  }}
                >
                  {item.message}
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
                {item.createdDate
                  ? useTimestampConverter(item.createdDate / 1000, "DD/MM/YYYY")
                  : "-"}
              </Typography>
              <Typography
                style={{
                  fontFamily: "Barlow",
                  fontSize: "13px",
                  fontWeight: 400,
                  color: "#8D98B4",
                }}
              >
                {item.createdDate
                  ? useTimestampConverter(item.createdDate / 1000, "hh:mm:ss")
                  : "-"}
              </Typography>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default HistoryList;
