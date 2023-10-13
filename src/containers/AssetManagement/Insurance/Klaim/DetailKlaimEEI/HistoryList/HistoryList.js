/* eslint-disable eqeqeq */
/* eslint-disable react/no-array-index-key */
import React from "react";
import { Box, Grid, makeStyles, Typography } from "@material-ui/core";
import constansts from "../../../../../../helpers/constants";

const useStyles = makeStyles({
  root: {
    height: "356px",
    border: `1px solid ${constansts.color.grayMedium}`,
    borderRadius: 10,
    marginBottom: 30,
    padding: "10px 5px 10px 10px",
    overflowY: "scroll",
  },
  history: {
    fontFamily: "Barlow",
    fontWeight: 600,
    fontSize: "15px",
    color: "#2B2F3C",
    marginBottom: "15px",
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

const HistoryList = () => {
  const classes = useStyles();
  return (
    <>
      <Typography className={classes.history}>History</Typography>
      <Grid container className={classes.root}>
        {DUMMY_DATA.map((data, idx) => (
          <Grid item key={idx} xs={12} className={classes.container}>
            <Box className={classes.leftItems}>
              <Box>
                <Box className={classes.circle} style={{ background: data.bg }}>
                  {data.initial}
                </Box>
                {DUMMY_DATA.length - 1 != idx ? (
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
                  {data.name}
                </Typography>
                <Typography
                  style={{
                    fontFamily: "Barlow",
                    fontSize: "13px",
                    fontWeight: 400,
                    color: "#8D98B4",
                  }}
                >
                  {data.description}
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
                {data.date}
              </Typography>
              <Typography
                style={{
                  fontFamily: "Barlow",
                  fontSize: "13px",
                  fontWeight: 400,
                  color: "#8D98B4",
                }}
              >
                {data.time}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default HistoryList;
