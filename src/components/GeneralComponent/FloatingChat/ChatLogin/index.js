/* eslint-disable react/jsx-no-bind */
import React, { useState, useEffect } from "react";
import {
  InputBase,
  makeStyles,
  Typography,
  ButtonBase
} from "@material-ui/core";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockIcon from "@material-ui/icons/Lock";
import * as COLORS from "../../../../assets/theme/colors";
import loginFirebase from "../../../../helpers/firebase/loginFirebase";

const useStyles = makeStyles({
  inputBase: {
    padding: "5px 10px",
    width: "100%",
    backgroundColor: COLORS.White,
    border: "1px solid #BCC8E7",
    borderRadius: 8,
    fontSize: 14,
    marginBottom: 10,
    color: "#BCC8E7"
  },
  title: {
    textAlign: "center",
    fontSize: 15,
    color: COLORS.GrayHardDarker,
    fontWeight: 500,
    marginBottom: 10
  },
  loginButton: {
    fontWeight: 400,
    fontSize: 10,
    color: "#FFFF",
    textAlign: "center",
    backgroundColor: COLORS.PrimaryHard,
    width: "100%",
    padding: "5px 10px",
    borderRadius: 10
  },
  errorMessage:{
    color: COLORS.PrimaryHard,
    fontSize: 12
  }
});

const ChatLogin = (props) => {
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div style={{ marginTop: 10 }}>
      <Typography className={classes.title}>FORM LOGIN</Typography>
      <InputBase
        autoFocus
        className={classes.inputBase}
        placeholder="Email..."
        endAdornment={<MailOutlineIcon />}
        onChange={(e)=>setEmail(e.target.value)}
      />
      <InputBase
        className={classes.inputBase}
        placeholder="Password..."
        endAdornment={<LockIcon />}
        type="password"
        onChange={(e)=>setPassword(e.target.value)}
      />
      <Typography id="login-msg" className={classes.errorMessage} />
      <ButtonBase className={classes.loginButton} onClick={()=>loginFirebase(email, password)}>
        <Typography>LOGIN</Typography>
      </ButtonBase>
    </div>
  );
};
ChatLogin.propTypes = {};

ChatLogin.defaultProps = {};

export default ChatLogin;
