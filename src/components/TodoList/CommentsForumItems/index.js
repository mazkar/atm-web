/* eslint-disable no-console */
/* eslint-disable no-case-declarations */
/* eslint-disable react/prop-types */
import { Avatar, ButtonBase, Grid, makeStyles, Tooltip } from '@material-ui/core';
import { Typography } from 'antd';
import React from 'react';
import ReplyIcon from '@material-ui/icons/Reply';
import useTimestampConverter from '../../../helpers/useTimestampConverter';
import { ReactComponent as IconComment } from '../../../assets/icons/general/dot-comment.svg';
import MinioDocComponent from '../../MinioDocComponent';
import { getInitialName, numberFromText, todoListColors } from '../../../helpers/todoList';

const useStyles =  makeStyles({
  dateTime: {
    color: "#BCC8E7",
    fontSize: 15,
    fontWeight: 400,
    marginBottom: 10
  },
  text: {
    color: "#2B2F3C",
    fontSize: 15,
    fontWeight: 400
  },
  textRed: {
    color: "#DC241F",
    fontSize: 15,
    fontWeight: 400,
    paddingLeft: 5
  },
  comment: {
    color: "#2B2F3C",
    fontSize: 15,
    fontWeight: 400,
    borderRadius: 8,
    border: "1px solid #E6EAF3",
    padding: 12
  }
});

function ItemComment({type, value, onReply}){
  const classes = useStyles();
  // console.log("+++ value", value);
  switch (type) {
  case "comment":
    const initialName = getInitialName(value.name);
    const backgroundColorRand = todoListColors[numberFromText(initialName) % todoListColors.length];
    
    return(
      <>
        <Grid container>
          <Grid item xs="auto" style={{paddingRight: 10}}>
            <Avatar style={{backgroundColor: backgroundColorRand}}>{initialName}</Avatar>
          </Grid>
          <Grid item xs>
            <div className={classes.comment}>
              {value.text && (
                <Typography>{value.text}</Typography>
              )}
              {value.files?.length > 0 && (
                value.files.map((item)=><MinioDocComponent filePath={item}/>)
              )}
            </div>
          </Grid>
        </Grid>
        <div style={{ display: "flex", justifyContent: "end"}}>
          <ButtonBase style={{paddingRight:20}} onClick={()=>onReply(value)}>
            <Tooltip title="Reply" aria-label="reply">
              <ReplyIcon style={{color: "#BCC8E7"}}/>
            </Tooltip>
          </ButtonBase>
        </div>
        <div style={{paddingLeft: 25}}>
          {value.reply?.length>0 && (
            value.reply.map((itemReply)=>{
              return(
                <Grid container style={{paddingBottom: 5}} alignItems="center">
                  <Grid item xs="auto" style={{paddingRight: 10}}>
                    <Avatar style={{backgroundColor: backgroundColorRand, width: 25, height: 25, fontSize: 15}}>
                      {getInitialName(itemReply.userName)}
                    </Avatar>
                  </Grid>
                  <Grid item xs>
                    <div className={classes.comment}>
                      {itemReply.message && (
                        <Typography>{itemReply.message}</Typography>
                      )}
                      {itemReply.attachment?.length > 0 && (
                        itemReply.attachment.map((itemReplyAttach)=><MinioDocComponent filePath={itemReplyAttach}/>)
                      )}
                    </div>
                  </Grid>
                </Grid>
              )
            })
          )}
        </div>
      </>
    );
    
  default:
    return(
      <Grid container>
        <Grid item><Typography className={classes.text}>{value.text}</Typography></Grid>
        <Grid item><Typography className={classes.textRed}>{value.name}</Typography></Grid>
      </Grid>
      
    );
  }
}

function CommentsForumItems({data = {}, onReply = ()=>console.log("on reply")}) {
  const classes = useStyles();
  return (
    <Grid container style={{marginBottom: 15}}>
      <Grid item xs="auto">
        <IconComment/>
      </Grid>
      <Grid item xs>
        <Grid container direction="column">
          <Grid item>
            <Typography className={classes.dateTime}>{useTimestampConverter(data.dateTime, "DD/MM/YYYY hh:mm")}</Typography>
          </Grid>
          <Grid item>
            <ItemComment type={data.type} value={data.value} onReply={onReply}/>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default CommentsForumItems;