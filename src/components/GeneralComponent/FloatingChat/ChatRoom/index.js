/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from "@material-ui/core/styles";
import { ButtonBase, Divider, Grid, InputBase, Typography } from '@material-ui/core';
import CloseIcon from "@material-ui/icons/Close";
import SendIcon from '@material-ui/icons/Send';
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { onValue, ref } from 'firebase/database';
import * as COLORS from '../../../../assets/theme/colors';
import useTimestampConverter from '../../../../helpers/useTimestampConverter';
import { chatMessages } from '../dummyData';
import addMessagePersonal from '../../../../helpers/firebase/addMessagePersonal';
import { db } from '../../../../helpers/firebase/config';

const useStyles = makeStyles({
  chatPopup: {
    width: 300,
    minHeight: 400,
    backgroundColor: "#FFFF",
    borderRadius: 10,
    padding: 20,
    boxShadow: "0px 0px 6px 6px rgb(209 216 236 / 30%)"
  },
  inputBase: {
    padding: 10,
    width: "100%",
    backgroundColor: COLORS.White,
    border: "1px solid #BCC8E7",
    borderRadius: 8,
    fontSize: 14,
    marginTop: 15,
    marginBottom: 10,
    color: "#BCC8E7"
  },
  messagesSection: {
    minHeight: 400,
    marginTop: 15
  },
  messagesContainer: {
    maxHeight: 400,
    overflowY: "auto",
    flexDirection: "column-reverse",
    scrollBehavior: "smooth",
    display: "flex",
  },
  dateTime: {
    color: COLORS.GrayMedium,
    fontWeight: 400,
    fontSize: 12,
    paddingTop: 2
  },
  messageLeftContainer: {
    paddingRight: 50,
    paddingBottom: 10
  },
  messageLeft: {
    backgroundColor: "#D4DDF0",
    borderRadius: 4,
    padding: "4px 8px",
    fontWeight: 400,
    fontSize: 14,
    color: COLORS.Dark
  },
  messageRightContainer: {
    paddingLeft: 50,
    paddingBottom: 10
  },
  messageRight: {
    backgroundColor: "#FFECD1",
    borderRadius: 4,
    padding: "4px 8px",
    fontWeight: 400,
    fontSize: 14,
    color: COLORS.Dark
  },
  errorMessage:{
    color: COLORS.PrimaryHard,
    fontSize: 12
  },
  onlineStatus: {
    height: 10,
    width: 10,
    borderRadius: "50%",
    display: "inline-block",
    position: "absolute",
    bottom: 5,
    right: 0,
  },
});

function ChatRoom({ userData, receiverData, onClose }) {
  const classes = useStyles();

  const [feed, updateFeed] = useState([]);
  const [their, setTheir] = useState([]);
  const [mine, setMine] = useState([]);

  const [isOnline, setIsOnline] = useState(false);

  const [message, setMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const postMessageItem = (e) => {
    e.preventDefault();
    // eslint-disable-next-line no-bitwise
    if (message.length > 0) {
      // console.log("+++ addMessagePersonal");
      addMessagePersonal(userData, message, receiverData.userId);
      setMessage("");
      setErrorMsg("");
    } else setErrorMsg("Please say something.");
  };

  useEffect(() => {

    onValue(ref(db, `allchats/${userData.userId}`), (snapshot) => {
      const newArr = [];
      const data = snapshot.val();
      if (data !== null) {
        const array = Object.values(data);
        array.map((item)=>{
          if(item.senderId === receiverData.userId){
            newArr.push({...item, sender:"their"}); 
          }
        });
      }
      setTheir(newArr);
    });
    onValue(ref(db, `allchats/${receiverData.userId}`), (snapshot) => {
      const newArr = [];
      const data = snapshot.val();
      if (data !== null) {
        const array = Object.values(data);
        array.map((item)=>{
          if(item.senderId === userData.userId){
            newArr.push({...item, sender:"me"}); 
          }
        });
      }
      setMine(newArr);
    });

    // ONLINE STATUS

    onValue(ref(db, `users/${receiverData.userId}`), (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        setIsOnline(data.isOnline === true);
      }
    });

  }, [receiverData]);

  useEffect(() => {
    updateFeed([...their, ...mine]);
  }, [their, mine]);

  return (
    <div className={classes.chatPopup}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Grid container spacing={1} alignItems="center">
            <Grid item>
              <div style={{position: "relative"}}>
                <AccountCircleIcon
                  style={{ height: 30, width: 30, color: "#727C98" }}
                />
                <span className={classes.onlineStatus} style={{backgroundColor: isOnline? COLORS.Green : COLORS.GrayMedium}}/>
              </div>
            </Grid>
            <Grid item>
              <Typography
                className={classes.chatTitleOpened}
                style={{ color: COLORS.GrayHard }}
              >
                {receiverData.fullname}
              </Typography>
              <Typography
                style={{ color: COLORS.GrayHard, fontStyle: "italic", fontSize: 12 }}
              >
                {isOnline? "Online" : "Offline"}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <ButtonBase onClick={() => onClose()}>
            <CloseIcon />
          </ButtonBase>
        </Grid>
      </Grid>
      <Divider variant="fullWidth" light="true" />
      <Grid container justifyContent='space-between' direction='column' className={classes.messagesSection}>
        <Grid item>
          <div className={classes.messagesContainer}>
            {feed
              .sort(function (x, y) {
                return x.timestamp - y.timestamp;
              })
              .map((item) => {
                return (
                  <Grid
                    container
                    justifyContent={
                      item.sender === "me" ? "flex-end" : "flex-start"
                    }
                    className={
                      item.sender === "me"
                        ? classes.messageRightContainer
                        : classes.messageLeftContainer
                    }
                  >
                    <Grid item>
                      <Typography
                        className={
                          item.sender === "me"
                            ? classes.messageRight
                            : classes.messageLeft
                        }
                      >
                        {item.message}
                      </Typography>
                      <Typography className={classes.dateTime}>
                        {useTimestampConverter(
                          item.timestamp / 1000,
                          "DD/MM/YYYY HH:MM"
                        )}
                      </Typography>
                    </Grid>
                  </Grid>
                );
              }).reverse()}
          </div>
        </Grid>
        <Grid item>
          <div>
            <Grid container className={classes.inputBase} justifyContent="space-between" alignItems='center'>
              <Grid item>
                <InputBase
                  autoFocus
                  placeholder="Tulis Pesan..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter"){
                      postMessageItem(e);
                    }
                  }}
                />
              </Grid>
              <Grid item>
                <ButtonBase onClick={postMessageItem}>
                  <SendIcon style={{ color: COLORS.PrimaryHard }} />
                </ButtonBase>
              </Grid>
            </Grid>
            <Typography className={classes.loginButton} id="message-error">{errorMsg}</Typography>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

ChatRoom.propTypes = {
  userData: PropTypes.object.isRequired,
  receiverData: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired
};

export default ChatRoom;