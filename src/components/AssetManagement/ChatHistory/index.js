import { Box, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import InputText from "../inputText";
import PropTypes from "prop-types";
import constansts from "../../../helpers/constants";
import useTimestampConverter from "../../../helpers/useTimestampConverter";

const useStyles = makeStyles({
  root: {
    height: "420px",
    border: `1px solid ${constansts.color.grayMedium}`,
    borderRadius: 10,
    padding: "0px 5px 0px 10px",
    overflowY: "scroll",
  },
  historyTitle: {
    fontFamily: "Barlow",
    fontWeight: 600,
    fontSize: "15px",
    color: "#2B2F3C",
    marginBottom: "15px",
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

const ChatHistory = (props) => {
  const { data } = props;
  const classes = useStyles();
  return (
    <div>
      <Typography className={classes.historyTitle}>Chat History</Typography>
      <InputText
        placeholder="Masukkan Pesan Anda"
        style={{ marginBottom: 15 }}
      />
      <Box className={classes.root}>
        {data.map((item, idx) => (
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
                  {item.name}
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
                  {useTimestampConverter(
                    item.date / 1000,
                    "DD/MM/YYYY | hh:mm"
                  )}
                </Typography>
              </Box>
              <Typography className={classes.message}>
                {item.message}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </div>
  );
};

ChatHistory.propTypes = {
  // eslint-disable-next-line react/require-default-props
  data: PropTypes.array.isRequired,
};

ChatHistory.defaultProps = {
  data: [
    {
      name: "Deden Hidayat",
      message: "Untuk pesanan warnanya kurang sesuai",
      date: 1661201529000,
    },
    {
      name: "Adam Rizananda",
      message: "Ada perubahan ukuran dari requirement awal",
      date: 1658845844000,
    },
    {
      name: "Ghefira FS",
      message: "Ada perubahan ukuran dari requirement awal",
      date: 1658845844000,
    },
    {
      name: "Deden Hidayat",
      message: "Untuk pesanan warnanya kurang sesuai",
      date: 1658845844000,
    },
    {
      name: "Deden Hidayat",
      message: "Untuk pesanan warnanya kurang sesuai",
      date: 1658845844000,
    },
    {
      name: "Deden Hidayat",
      message: "Untuk pesanan warnanya kurang sesuai",
      date: 1658845844000,
    },
    {
      name: "Deden Hidayat",
      message: "Untuk pesanan warnanya kurang sesuai",
      date: 1658845844000,
    },
    {
      name: "Deden Hidayat",
      message: "Untuk pesanan warnanya kurang sesuai",
      date: 1658845844000,
    },
    {
      name: "Deden Hidayat",
      message: "Untuk pesanan warnanya kurang sesuai",
      date: 1658845844000,
    },
  ],
};

export default ChatHistory;
