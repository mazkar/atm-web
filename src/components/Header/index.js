/* eslint-disable import/order */
/* eslint-disable react/self-closing-comp */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import { Toolbar, Typography } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import { ReactComponent as HeadNotifAnalisaIcon } from '../../assets/icons/general/notif_analisa_red.svg';
import { ReactComponent as HeadNotifIcon } from '../../assets/icons/general/notif_red.svg';
import { ReactComponent as HeadUserIcon } from '../../assets/icons/general/user_red.svg';
import { ReactComponent as UserIcon } from '../../assets/icons/duotone-red/user.svg';
import { ReactComponent as SignoutIcon } from '../../assets/icons/duotone-red/log-out.svg';
import IconButton from '@material-ui/core/IconButton';
import theme from '../../assets/theme/theme';
import { Popover, Menu, Dropdown  } from 'antd';
import PopupNotif from '../PopupNotif';
import PopupLogout from '../Popuplogout';
import Logo from '../../assets/images/SideMenu/logo_cimb.png';
// eslint-disable-next-line import/no-cycle
import {RootContext} from '../../router';
import { useAuthListener } from '../../helpers/firebase/useAuthListener';
import { onValue, orderByChild, query, ref, set } from 'firebase/database';
import { db } from '../../helpers/firebase/config';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    width: 'calc(100vw - 0px)',
    // marginLeft: '200px',
    height: '60px',
    // position: 'relative',
    justifyContent: 'space-between',
  },
  icon: {
    // position: 'relative',
    float: 'left',
    // left: '89%',
    // right: '184px',
    cursor: 'pointer',
  },
  iconHead: {
    marginRight: 10,
    height: 32,
    width: 32,
    padding: 5,
    // borderRadius: '50%',
    // backgroundColor: Colors.PrimaryUltrasoft,
  },
  userIcon: {
    marginLeft: 10,
    // borderRadius: '50%',
    // backgroundColor: Colors.PrimaryUltrasoft,
  },
  downIcon: {
    position: 'absolute',
    marginLeft: 10,
    bottom: 8,
    float: 'left',
    left: '90%',
  },
  action: {
    fontSize: 14,
    fontFamily: theme.typography.fontFamily,
    fontWeight: 600,
    fontStyle: 'normal',
    color: '#004D6E',
    lineHeight: '19px',
  },
  actionButton: {
    position: 'absolute',
    float: 'left',
    left: '100%',
    cursor: 'pointer',
  },
  profile: {
    fontFamily: 'Barlow',
    fontSize: '13px',
    fontWeight: '500',
    margin: '0 0 0 20px',
    color:'#DC241F'
  },
  menuItem:{
    color:'#DC241F',
    padding: 10,
    display: "flex",
    alignItems: "center",
    fontWeight: 500,
    fontSize: 15
  },
  notifCounter: {
    fontWeight: 500,
    fontSize: 8,
    color: "#FFFFFF",
    background: "#DC241F",
    borderRadius: 50,
    padding: "3px 6px",
    position: "absolute",
    top: 0,
    right: 0,
  },
});

const Header = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const {logout, userFullName} = useContext(RootContext);
  const { userData, initializing } = useAuthListener();

  const [modalLogout, setModalLogout] = useState(false);
  const [notifCounter, setNotifCounter] = useState(0);
  const [dataNotif, setDataNotif] = useState([]);

  function getNotifications(){
    onValue(query(ref(db, `notifications/${userData.userId}`), orderByChild("read")), (snapshot)=>{
      let count = 0;
      const arrDataNotif = [];
      snapshot.forEach((childSnapshot) => {
        const item = childSnapshot.val();
        arrDataNotif.push({...item, time: childSnapshot.key});
        if(!item.read){
          count+=1;
        }
      });
      setDataNotif(arrDataNotif);
      setNotifCounter(count);
    });
  }

  useEffect(() => {
    if(initializing === false && userData){
      getNotifications();
    }
  }, [initializing, userData]);

  const handleSelectNotif=(item)=>{
    console.log("+++ item cliked", item);
    onValue(query(ref(db, `notifications/${userData.userId}/${item.time}`)), (snapshot)=>{
      const dataObject = snapshot.val();
      console.log("+++ dataObject", dataObject);
      if(!dataObject.read){
        const updates = {...dataObject,read: true};
        set(ref(db, `notifications/${userData.userId}/${snapshot.key}`), updates)
          .then()
          .catch((error)=>console.log("+++ error",error));
      }
    }, {
      onlyOnce: true
    });
  };

  const menu = (
    <Menu style={{borderRadius: 8, marginTop: 10}}>
      <Menu.Item key="0" className={classes.menuItem} onClick={()=>history.push(`/user-profile`)}>
        <UserIcon alt="profile" style={{marginRight:5}}/> Profile
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="1" className={classes.menuItem} onClick={() => setModalLogout(true)}>
        <SignoutIcon alt="logout" style={{marginRight:5}}/> Sign Out
      </Menu.Item>
    </Menu>
  );

  return (
    <AppBar
      className={classes.root}
      style={{ boxShadow: '0 8px 4px -4px #e5edf8' }}
    >
      <div
        style={{
          textAlign: 'center',
          marginTop: '8px',
          marginLeft: props.collapsed ? 110 : 280,
        }}
      >
        <img style={{ width: '145px' }} src={Logo} alt="logo" />
      </div>
      <Toolbar>
        <div className={classes.icon}>
          {/* <IconButton>
            <HeadNotifAnalisaIcon alt="analisa-icon" />
          </IconButton> */}
          <Popover
            placement="bottomRight"
            title=""
            content={<PopupNotif data={dataNotif} counter={notifCounter} handleSelectNotif={handleSelectNotif} />}
            trigger="click"
          >
            <IconButton style={{position: "relative", marginRight: 10}}>
              <HeadNotifIcon alt="notif-icon" />
              {notifCounter > 0 && (
                <Typography className={classes.notifCounter}>
                  {notifCounter}
                </Typography>
              )}
            </IconButton>
          </Popover>
          <Dropdown overlay={menu} trigger={['click']} placement="bottomLeft">
            <IconButton
              style={{ backgroundColor: '#FFE9E9' }}
              // onClick={() => setModalLogout(true)}
            >
              <HeadUserIcon alt="user-icon" />
            </IconButton>
          </Dropdown>
        </div>
        <div className={classes.actionButton}></div>
        <p className={classes.profile}>{userFullName}</p>
      </Toolbar>
      <PopupLogout
        isOpen={modalLogout}
        onClose={() => setModalLogout(false)}
        onLeave={() => logout()}
      />
    </AppBar>
  );
};

export default Header;
