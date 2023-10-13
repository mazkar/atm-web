/* eslint-disable no-console */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ButtonBase, Grid, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { equalTo, get, onValue, orderByChild, query, ref, set } from "firebase/database";
import * as COLORS from '../../../assets/theme/colors';
import ChatRoom from "./ChatRoom";
import { useAuthListener } from "../../../helpers/firebase/useAuthListener";
import ChatLogin from "./ChatLogin";
import { db } from "../../../helpers/firebase/config";
import UserList from "./UserList";

const useStyles = makeStyles({
  root: {
    zIndex: 9,
    position: "absolute",
  },
  init: {
    fontWeight: 500,
    fontSize: 12,
    color: "#FFFFFF",
    fontStyle: "italic",
  },
  chatTitle: {
    fontWeight: 500,
    fontSize: 18,
    color: "#FFFFFF"
  },
  chatTitleOpened: {
    fontWeight: 500,
    fontSize: 18
  },
  openButton: {
    backgroundColor: "#DC241F",
    minWidth: 300,
    padding: "9px 15px",
    border: "none",
    cursor: "pointer",
    opacity: "1",
    position: "fixed",
    bottom: "0px",
    right: "50px",
    "&:hover": {
      opacity: "0.8"
    },
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingBottom: 10,
    boxShadow: "0px 0px 6px 6px rgb(209 216 236 / 30%)"
  },
  chatPopupContainer: {
    position: "fixed",
    right: "50px",
    bottom: 60,
  },
  chatPopup: {
    width: 300,
    minHeight: 400,
    backgroundColor: "#FFFF",
    borderRadius: 10,
    padding: 20,
    boxShadow: "0px 0px 6px 6px rgb(209 216 236 / 30%)"
  },
});

const FloatingChat = (props) => {
  const classes = useStyles();

  const { userData, initializing } = useAuthListener();
  // console.log("+++ userData",userData);
  const [show, setShow] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [chatCounter, setChatCounter] = useState(0);

  const [listResUsers, setListResUsers] = useState([]);
  const [listUsers, setListUsers] = useState([]);

  function handleSearch(searchInput) {
    const filteredData = listResUsers.filter((value) => {
      const searchStr = searchInput.toLowerCase();
      const nameMatches = value.fullname.toLowerCase().includes(searchStr);
      const companyMatches = value.company
        .toLowerCase()
        .includes(searchStr);
      return nameMatches || companyMatches;
    });
      // console.log("+++ filteredData", filteredData);
    setListUsers(filteredData);
  }
  
  useEffect(() => {
    // SET LIST USER IF RESPONSE LENGTH > 0
    if(listResUsers?.length > 0){

      setListUsers(listResUsers);
      // LISTENER jika ada update chat baru dan status read false
      onValue(query(ref(db, `allchats/${userData.userId}`), orderByChild("read"), equalTo(false)), (snapshot) => {
        const data = snapshot.val();
        // console.log("+++ data unread", data);
        let counter = 0;
        if (data !== null) {
          const copyListUser = [...listResUsers];
          const array = Object.values(data);
          listResUsers.map((item)=>{
            const filteredData = array.filter((value) => {
              const senderMatches = value.senderId === item.userId;
              const readMessages = value.read === false;
              return senderMatches && readMessages;
            });
            const foundIndex = copyListUser.findIndex(x => x.userId === item.userId);
            copyListUser[foundIndex].unreadMessages = filteredData.length;
            if(filteredData.length>0){
              counter +=filteredData.length;
            }
            setListUsers(copyListUser);
          });
        }else{
          setListUsers(listResUsers);
        }
        setChatCounter(counter);
      });
    }
  }, [listResUsers]);

  function handleSelectUser(user){
    if(user?.unreadMessages > 0){
      onValue(query(ref(db, `allchats/${userData.userId}`), orderByChild("read"), equalTo(false)), (snapshot)=>{
        snapshot.forEach((childSnapshot) => {
          const {senderId} = childSnapshot.val();
          if(senderId === user.userId){
            const updates = {...childSnapshot.val(),read: true};
            set(ref(db, `allchats/${snapshot.key}/${childSnapshot.key}`), updates)
              .then()
              .catch((error)=>console.log("+++ error",error));
          }
        });
      }, {
        onlyOnce: true
      });
    }
    setShow(false);
    setSelectedUser(user);
  }

  async function getAllUsersData(){
    get(ref(db, "users"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const newArr = [];
          snapshot.forEach((childSnapshot) => {
            const item = childSnapshot.val();
            const userId =childSnapshot.key;
          
            // console.log("+++ users userId", userId);
            // console.log("+++ users item", item);
            if(userId !== userData.userId){
              const newItem = {...item, userId, unreadMessages: 0};
              // console.log("+++ users newItem", newItem);
              newArr.push(newItem);
            }
          });
          // console.log("+++ users array", newArr);
          setListResUsers(newArr);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    if(initializing === false && userData){
      // SET STATUS ONLINE TRUE
      // console.log(`+++ users/${userData.userId}`);
      const updates = {...userData, isOnline: true};
      set(ref(db, `users/${userData.userId}`), updates);

      getAllUsersData();
    }
  }, [initializing, userData]);
  
  return (
    <div className={classes.root} >
      {initializing? (
        <div className={classes.openButton} onClick={() => setShow(!show)}>
          <Typography className={classes.init}>Initializing...</Typography>
        </div>
      ):(
        <>
          <div className={classes.openButton} onClick={() => setShow(!show)}>
            <Grid container justifyContent="space-between" spacing={2}>
              <Grid item>
                <Typography className={classes.chatTitle}>Chat</Typography>
              </Grid>
              <Grid item>
                <Typography className={classes.chatTitle}>({chatCounter})</Typography>
              </Grid>
            </Grid>
          </div>
          <div className={classes.chatPopupContainer}>
            <Grid container spacing={1} alignItems="flex-end">
              <Grid item>
                {selectedUser && (
                  <ChatRoom userData={userData} receiverData={selectedUser} onClose={()=>setSelectedUser(null)}/>
                )}
              </Grid>
              <Grid item>
                {show && (
                  <div className={classes.chatPopup}>
                    <Grid container justifyContent="space-between" alignItems="center">
                      <Grid item>
                        <Grid container spacing={1} alignItems="center">
                          <Grid item>
                            <Typography
                              className={classes.chatTitleOpened}
                              style={{ color: COLORS.Dark }}
                            >
                              Chat
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography
                              className={classes.chatTitleOpened}
                              style={{ color: COLORS.GrayMedium }}
                            >
                          ({chatCounter})
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <ButtonBase onClick={() => setShow(false)}>
                          <CloseIcon />
                        </ButtonBase>
                      </Grid>
                    </Grid>
                    {/* <ButtonBase onClick={() => {
                      if(userData){
                        onValue(query(ref(db, `users/${userData.userId}`)), (snapshot)=>{
                          const updates = {...snapshot.val(), isOnline: false};
                          set(ref(db, `users/${userData.userId}`), updates)
                            .then()
                            .catch((error)=>console.log("+++ error",error));
                        }, {
                          onlyOnce: true
                        });
                      }
                    }}>
                      <Typography>Logout</Typography>
                    </ButtonBase> */}
                    {userData? (
                      <UserList listUsers={listUsers} handleSearch={handleSearch} onSelected={handleSelectUser}/>
                    ):(
                      <ChatLogin userData={userData}/>
                    )}
                  </div>
                )}
              </Grid>
            </Grid>
          </div> 

        </>
      )}
      
    </div>
  );
};
FloatingChat.propTypes = {};

FloatingChat.defaultProps = {};

export default FloatingChat;
