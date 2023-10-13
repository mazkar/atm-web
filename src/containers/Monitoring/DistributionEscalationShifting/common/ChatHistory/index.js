import React from "react";
import { Box, makeStyles, Typography } from "@material-ui/core";
import constansts from "../../../../../helpers/constants";
import InputMessage from "./inputMessage";

const useStyles = makeStyles({
  root: {
    height: "420px",
    border: `1px solid ${constansts.color.grayMedium}`,
    borderRadius: 10,
    marginBottom: 30,
    padding: "0px 5px 0px 10px",
    overflowY: "scroll",
  },
  container: {
    display: "flex",
    margin: "10px 0",
  },
  circle: {
    width: 20,
    height: 20,
    background: "#FF6A6A",
    border: `3px solid ${constansts.color.white}`,
    borderRadius: "50%",
    boxShadow: "0px 4px 8px 2px rgba(188, 200, 231, 0.3)",
  },
  itemContainer: {
    display: "flex",
    alignItems: "start",
    flexDirection: "column",
    marginLeft: 10,
  },
  topItem: {
    display: "flex",
    marginBottom: "7px",
  },
  message: {
    fontFamily: "Barlow",
    fontWeight: 400,
    fontSize: "15px",
    color: "#2B2F3C",
  },
});

const DUMMY_DATA = [
  {
    name: "Deden Hidayat",
    message: "Untuk pesanan warnanya kurang sesuai",
    date: "12-12-2020",
    time: "16:18",
  },
  {
    name: "Adam Rizananda",
    message: "Ada perubahan ukuran dari requirement awal",
    date: "12-12-2020",
    time: "16:18",
  },
  {
    name: "Ghefira FS",
    message: "Ada perubahan ukuran dari requirement awal",
    date: "12-12-2020",
    time: "16:18",
  },
  {
    name: "Deden Hidayat",
    message: "Untuk pesanan warnanya kurang sesuai",
    date: "12-12-2020",
    time: "16:18",
  },
  {
    name: "Deden Hidayat",
    message: "Untuk pesanan warnanya kurang sesuai",
    date: "12-12-2020",
    time: "16:18",
  },
  {
    name: "Deden Hidayat",
    message: "Untuk pesanan warnanya kurang sesuai",
    date: "12-12-2020",
    time: "16:18",
  },
  {
    name: "Deden Hidayat",
    message: "Untuk pesanan warnanya kurang sesuai",
    date: "12-12-2020",
    time: "16:18",
  },
  {
    name: "Deden Hidayat",
    message: "Untuk pesanan warnanya kurang sesuai",
    date: "12-12-2020",
    time: "16:18",
  },
  {
    name: "Deden Hidayat",
    message: "Untuk pesanan warnanya kurang sesuai",
    date: "12-12-2020",
    time: "16:18",
  },
];

const ChatHistory = () => {
  const classes = useStyles();
  return (
    <>
      <InputMessage
        style={{ marginBottom: 15 }}
        placeholder="Masukkan Pesan Anda"
      />
      <Box className={classes.root}>
        {DUMMY_DATA.map((data, idx) => (
          <Box key={idx} className={classes.container}>
            <Box className={classes.circle}></Box>
            <Box className={classes.itemContainer}>
              <Box className={classes.topItem}>
                <Typography
                  style={{
                    fontFamily: "Barlow",
                    fontWeight: 600,
                    fontSize: 15,
                    color: "#2B2F3C",
                  }}
                >
                  {data.name}
                </Typography>
                <Typography
                  style={{
                    marginLeft: "10px",
                    fontFamily: "Barlow",
                    fontWeight: 400,
                    fontSize: "15px",
                    color: "#BCC8E7",
                  }}
                >
                  {data.date} | {data.time}
                </Typography>
              </Box>
              <Typography className={classes.message}>
                {data.message}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </>
  );
};

export default ChatHistory;
