/* eslint-disable no-case-declarations */
/* eslint-disable react/prop-types */
import { Avatar, Grid, makeStyles } from '@material-ui/core';
import { Typography } from 'antd';
import React from 'react';
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
  comment: {
    color: "#2B2F3C",
    fontSize: 15,
    fontWeight: 400,
    borderRadius: 8,
    border: "1px solid #E6EAF3",
    padding: 12
  }
});

function ItemComment({type, value}){
  const classes = useStyles();
  switch (type) {
  case "comment":

    const initialName = getInitialName(value.name);
    const backgroundColorRand = todoListColors[numberFromText(initialName) % todoListColors.length];
    
    return(
      <Grid container>
        <Grid item xs="auto" style={{paddingRight: 10}}>
          <Avatar style={{backgroundColor: backgroundColorRand}}>{initialName}</Avatar>
        </Grid>
        <Grid item xs>
          <Typography className={classes.comment}>{value.comment}</Typography>
        </Grid>
      </Grid>
    );
  
  case "file":
    return(
      <MinioDocComponent filePath={value}/>
    );
    
  default:
    return(
      <Typography className={classes.text}>{value}</Typography>
    );
  }
}

function CommentItems({data = {}}) {
  const classes = useStyles();
  return (
    <Grid container style={{marginBottom: 15}}>
      <Grid item xs="auto">
        <IconComment/>
      </Grid>
      <Grid item xs>
        <Grid container direction="column">
          <Typography className={classes.dateTime}>{useTimestampConverter(data.dateTime, "DD/MM/YYYY hh:mm")}</Typography>
          <ItemComment type={data.type} value={data.value}/>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default CommentItems;