import { Box, makeStyles, Typography } from "@material-ui/core";
import constansts from "../../../../../../helpers/constants";
import React, { useState } from "react";
import InputMessage from "./inputMessage";
import { doSendChat } from "../../../../ApiServiceAsset";
import useTimestampConverter from "../../../../../../helpers/useTimestampConverter";

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

const ChatHistory = ({ data, cardTaskId }) => {
  const classes = useStyles();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [dataRequest, setDataRequest] = useState({
    message: "",
    cardTaskCategory: "mesin",
    cardTaskId: parseInt(cardTaskId),
  });

  const loadingHandler = (loadValue) => {
    setIsLoading(loadValue);
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    if (e.which === 13) {
      doSendChat(loadingHandler, {
        message: message,
        cardTaskCategory: "mesin",
        cardTaskId: parseInt(cardTaskId),
      }).then((response) => {
        if (response) {
          if (response.responseCode === "00") {
            alert("Chat Berhasil di Tambah!");
            window.location.reload();
          }
        }
      });
    }
  };

  return (
    <>
      <InputMessage
        style={{ marginBottom: 15 }}
        placeholder="Masukkan Pesan Anda"
        value={message}
        onChange={handleChange}
        onKeyDown={handleSubmit}
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
                  {item.userName}
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
                  {item.createdDate
                    ? useTimestampConverter(
                        item.createdDate / 1000,
                        "DD/MM/YYYY | hh:mm"
                      )
                    : "-"}
                </Typography>
              </Box>
              <Typography className={classes.message}>
                {item.message}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </>
  );
};

export default ChatHistory;
