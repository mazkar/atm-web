import { Box, makeStyles, Typography } from "@material-ui/core";
import constansts from "../../../../../helpers/constants";
import React, { useState, useEffect } from "react";
import InputMessage from "../common/ChatHistory/inputMessage";
import { getDetailDvr, postComent } from "./servicesDvr";
import moment from "moment";
import { useHistory, useParams, withRouter } from "react-router-dom";

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

const ChatHistory = () => {
  const classes = useStyles();
  const [listChatHistory, setListChatHistory] = useState([]);
  const [coment, setComent] = useState("");
  const [idImplementasi, setIdImplementasi] = useState("");

  function historyChat() {
    getDetailDvr(`detailDvr?id=3`).then((res) => {
      var tempList = [];
      tempList = res.data;
      console.log("list chathistory => ", tempList.history);
      setListChatHistory(tempList.comment);
      setIdImplementasi(tempList.idImplementationMesin);
    });
  }
  // console.log(idImplementasi)
  useEffect(() => {
    historyChat();
  }, []);

  const saveComment = () => {
    if (e.key === "Enter") {
      e.preventDefault();
      const data = {
        message: coment,
        cardTaskCategory: "mesin",
        cardTaskId: idImplementasi,
      };
    }
    postComent(data)
      .then((res) => {
        // console.log("comment dvr", res);
        if (res.data) {
          if (res.data.responseCode === "200") {
            alert(`Berhasil save comment`);
            history.go(0);
          }
        }
      })
      .catch((err) => {
        alert(`Gagal save comment. ${err}`);
        // setModalLoader(false);
      });
  };

  return (
    <>
      <InputMessage
        style={{ marginBottom: 15 }}
        placeholder="Masukkan Pesan Anda"
        onChange={(e) => setComent(e.target.value)}
        onKeyPress={saveComment}
      />
      <Box className={classes.root}>
        {listChatHistory.map((data, idx) => (
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
                  {data.userName}
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
                  {moment.unix(data.createdDate / 1000).format("DD-MM-YYYY")} |
                  {moment.unix(data.createdDate / 1000).format("HH:mm")}
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
