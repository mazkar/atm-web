/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-unused-vars */
/* eslint-disable react/require-default-props */
/* eslint-disable no-shadow */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { ButtonBase, Grid, makeStyles, Typography } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import * as Colors from '../../../assets/theme/colors';
import { ReactComponent as IconAttach } from '../../../assets/icons/general/paperclip.svg';
import AttachedFile from '../../AttachedFile';

const useStyles =  makeStyles({
  root: {
    position: "relative",
    zIndex: 1,
  },
  inputContainer:{
    padding: 5,
    display: 'flex',
    alignItems: 'center',
    width: "100%",
    borderRadius: 10,
    border: "1px solid #BCC8E7",
    backgroundColor: Colors.White,
    height: 40,
  },
  input: {
    flex: 1,
    color: '##BCC8E7',
    fontSize: 13,
    '& ::placeholder':{
      color: '#BCC8E7',
      opacity: 1,
      fontStyle: 'italic',
    },
    paddingLeft: 5,
    paddingRight: 5
  },
  iconButton: {
    padding: 5,
    color: Colors.GrayMedium,
    display: "block"
  },
});

function InputComments(props) {
  const { 
    placeholder="Komentar", 
    contentReply = "", 
    onCloseReply = ()=>console.log("on close reply"), 
    onSubmit = ()=>console.log("on submit") , 
    // files = [],
    // message = "",
    // onChange, 
    // onAttach = ()=>console.log("on attach"), 
  } = props;
  const classes = useStyles();
  const [filesAttach, setFilesAttach] = useState([]);
  const [replyObj, setReplyObj] = useState(null);
  const [message, setMessage] = useState("");
  
  // useEffect(() => {
  //   console.log("+++ filesAttach", filesAttach);
  //   console.log("+++ message", message);
  // }, [filesAttach, message]);

  useEffect(() => {
    setReplyObj(contentReply);
  }, [contentReply]);

  function handleSubmit(){
    if(filesAttach.length < 1 && !message){
      alert("Please insert message!");
    }else{
      const payload={
        filesAttach,
        message,
        contentReply: replyObj
      };
      onSubmit(payload);
      // reset value
      setFilesAttach([]);
      setMessage("");
      setReplyObj(null);
    }
  }

  return (
    <div>
      {replyObj&& (
        <div style={{ transition: "all .2s"}}>
          <div style={{
            background: "#DEFFE1",
            border: "1px solid #BCC8E7",
            borderRadius: 5,
            padding: 5,
            paddingBottom: 20,
            position: "relative",
            bottom: -10,
          }}>
            <Grid container spacing={2} justifyContent="space-between">
              <Grid item xs><Typography style={{color: "#2B2F3C"}}> Reply for: </Typography></Grid>
              <Grid item xs="auto">
                <ButtonBase onClick={onCloseReply}><HighlightOffIcon style={{color: "#FF6A6A"}}/></ButtonBase>
              </Grid>
            </Grid>
            <Typography style={{color: "#8D98B4"}}>{replyObj.text}</Typography>
          </div>
        </div>
      )}
      <Paper elevation={0} className={classes.root}>
        <div className={classes.inputContainer}>
          <InputBase
            className={classes.input}
            placeholder={placeholder}
            value={message}
            onKeyDown={(e)=>{
              if (e.key === 'Enter') {
                e.preventDefault();
                handleSubmit();
              }
            }}
            onChange={(e)=>setMessage(e.target.value)}
          />
          <div className={classes.iconButton} >
            <InputBase
              id="file-attachment"
              type="file"
              // accept=".doc, .docx, .xls, .xlxs, .xlsx, .pdf, .jpg, .jpeg, .pmg"
              onChange={(e)=>{
                const arr = [...filesAttach, e.target.files[0]];
                // arr.push(e.target.files[0]);
                // console.log("+++ arr attach", arr);
                setFilesAttach(arr);
              }}
              style={{
                width: "0.1px",
                height: "0.1px",
                opacity: 0,
                overflow: "hidden",
                zIndex: -1,
              }} />
            <label htmlFor="file-attachment" style={{cursor: "pointer", verticalAlign: "center"}}>
              <IconAttach style={{width: 24, height: 24, paddingTop: 5}}/>
            </label>
          </div>
          <ButtonBase 
            style={{paddingLeft: 10}} 
            onClick={handleSubmit}>
            <SendIcon style={{color: "#BCC8E7"}}/>
          </ButtonBase>
        </div>
        <div style={{paddingTop: 10}}>
          {filesAttach.map((item, index)=>{
            return(
              <AttachedFile 
                filename={item.name} 
                onDelete={()=>{
                  const newArr = [...filesAttach];
                  newArr.splice(index, 1);
                  setFilesAttach(newArr);
                }}/>
            );}
          )}
        </div>
      </Paper>
    </div>
  );
}

export default InputComments;

