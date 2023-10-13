/* eslint-disable no-else-return */
import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {Typography , Grid, Box} from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  root: {
    position: 'relative',
    width: '100%',
    margin: '0 auto',
    '&::after':{
      content: '""',
      position: 'absolute',
      width: 6,
      backgroundColor: '#BCC8E7',
      top: 35,
      bottom: 0,
      left:10,
    }
  },
  container:{
    padding: '10px 10px 10px 40px',
    position: 'relative',
    width: '100%',
    '&::after': {
      content: '""',
      position: 'absolute',
      width: 25,
      height: 25,
      left: 0,
      backgroundColor: '#88ADFF',
      border: '3px solid #FFFF',
      top: 35,
      borderRadius: '50%',
      zIndex: 2,
      boxShadow: '0px 4px 8px 2px rgba(188, 200, 231, 0.3)',
    }
  },
  containerWaiting:{
    padding: '10px 10px 10px 40px',
    position: 'relative',
    width: '100%',
    '&::after': {
      content: '""',
      position: 'absolute',
      width: 25,
      height: 25,
      left: 0,
      backgroundColor: '#BCC8E7',
      border: '3px solid #FFFF',
      top: 35,
      borderRadius: '50%',
      zIndex: 2,
      boxShadow: '0px 4px 8px 2px rgba(188, 200, 231, 0.3)',
    }
  },
  containerFinishOtw:{
    padding: '10px 10px 10px 40px',
    position: 'relative',
    width: '100%',
    '&::after': {
      content: '""',
      position: 'absolute',
      width: 25,
      height: 25,
      left: 0,
      backgroundColor: '#65D170',
      border: '3px solid #FFFF',
      top: 35,
      borderRadius: '50%',
      zIndex: 2,
      boxShadow: '0px 4px 8px 2px rgba(188, 200, 231, 0.3)',
    }
  },

  containerEndWaiting:{
    padding: '10px 10px 10px 40px',
    position: 'relative',
    width: '100%',
    marginBottom:10,
    '&::after': {
      content: '""',
      position: 'absolute',
      width: 25,
      height: 25,
      left: 0,
      backgroundColor: '#BCC8E7',
      border: '3px solid #FFFF',
      top: 35,
      borderRadius: '50%',
      zIndex: 2,
      boxShadow: '0px 4px 8px 2px rgba(188, 200, 231, 0.3)',
    }
  },
  containerEndProgress:{
    padding: '10px 10px 10px 40px',
    position: 'relative',
    width: '100%',
    marginBottom:10,
    '&::after': {
      content: '""',
      position: 'absolute',
      width: 25,
      height: 25,
      left: 0,
      backgroundColor: '#88ADFF',
      border: '3px solid #FFFF',
      top: 35,
      borderRadius: '50%',
      zIndex: 2,
      boxShadow: '0px 4px 8px 2px rgba(188, 200, 231, 0.3)',
    }
  },
  containerFinish:{
    padding: '10px 10px 10px 40px',
    position: 'relative',
    width: '100%',
    marginBottom:10,
    '&::after': {
      content: '""',
      position: 'absolute',
      width: 25,
      height: 25,
      left: 0,
      backgroundColor: '#65D170',
      border: '3px solid #FFFF',
      top: 35,
      borderRadius: '50%',
      zIndex: 2,
      boxShadow: '0px 4px 8px 2px rgba(188, 200, 231, 0.3)',
    }
  },
  content: {
    padding: '15px 15px',
    position: 'relative',
    borderRadius: 10,
    border: '1px solid #BCC8E7',
  },

  contentFinish: {
    padding: '15px 15px',
    position: 'relative',
    borderRadius: 6,
    border: '1px solid #BCC8E7',
    '&::after': {
      content: '""',
      position: 'absolute',
      width: 20,
      height: 35,
      left: -37,
      backgroundColor: '#fff',
      top: 40,
      zIndex: 1,
    }
  },
});

const index = (props) => {
  const {dataNego} = props;
  const classes = useStyles();
  function renderTimelineData(param, nego){
    const {position} = nego;

    if(param === "Complete" && position === "end"){
      return (
        <div className={classes.containerFinish}>
          <div className={classes.contentFinish}>
            <Grid container spacing={2} justify="space-between">
              <Typography style={{fontSize:13, color:'#2B2F3C'}}>{nego.title}</Typography>
              <Typography style={{fontSize:10, color:'#BCC8E7'}}>{nego.date}</Typography>
            </Grid>
            <Grid container spacing={2} justify="space-between" style={{marginTop:15}}>
              <Typography style={{fontSize:13, color:'#2B2F3C'}}>{nego.price}</Typography>
              <Box style={{
                textAlign:'right',
                border: '1px solid',
                borderColor: '#65D170',
                background: '#D9FFDD',
                borderRadius: 20,
                color:'#65D170',
                width: 'max-content',
                paddingLeft: 10,
                paddingRight: 10,
              }}>
                <Typography variant="body2" >{nego.status}</Typography>
              </Box>
            </Grid>
            
          </div>
        </div> 
      );
    }else if(param === "Waiting" && position === "end"){
      return (
        <div className={classes.containerEndWaiting}>
          <div className={classes.contentFinish}>
            <Grid container spacing={2} justify="space-between">
              <Typography style={{fontSize:13, color:'#2B2F3C'}}>{nego.title}</Typography>
              <Typography style={{fontSize:10, color:'#BCC8E7'}}>{nego.date}</Typography>
            </Grid>
            <Grid container spacing={2} justify="space-between" style={{marginTop:15}}>
              <Typography style={{fontSize:13, color:'#2B2F3C'}}>{nego.price}</Typography>
              <Box style={{
                textAlign:'right',
                border: '1px solid',
                borderColor: '#FFB443',
                background: '#FFF9F0',
                borderRadius: 20,
                color:'#FFB443',
                width: 'max-content',
                paddingLeft: 10,
                paddingRight: 10,
              }}>
                <Typography variant="body2" >{nego.status}</Typography>
              </Box>
            </Grid>
              
          </div>
        </div> 
      );
    }else if(param === "Inprogress" && position === "end"){
      return (
        <div className={classes.containerEndProgress}>
          <div className={classes.contentFinish}>
            <Grid container spacing={2} justify="space-between">
              <Typography style={{fontSize:13, color:'#2B2F3C'}}>{nego.title}</Typography>
              <Typography style={{fontSize:10, color:'#BCC8E7'}}>{nego.date}</Typography>
            </Grid>
            <Grid container spacing={2} justify="space-between" style={{marginTop:15}}>
              <Typography style={{fontSize:13, color:'#2B2F3C'}}>{nego.price}</Typography>
              <Box style={{
                textAlign:'right',
                border: '1px solid',
                borderColor: '#88ADFF',
                background: '#EFF4FF',
                borderRadius: 20,
                color:'#88ADFF',
                width: 'max-content',
                paddingLeft: 10,
                paddingRight: 10,
              }}>
                <Typography variant="body2" >{nego.status}</Typography>
              </Box>
            </Grid>
              
          </div>
        </div> 
      );
    }else if(param === "Complete" && position !== "end"){
      return (
        <div className={classes.containerFinishOtw}>
          <div className={classes.content}>
            <Grid container spacing={2} justify="space-between">
              <Typography style={{fontSize:13, color:'#2B2F3C'}}>{nego.title}</Typography>
              <Typography style={{fontSize:10, color:'#BCC8E7'}}>{nego.date}</Typography>
            </Grid>
            <Grid container spacing={2} justify="space-between" style={{marginTop:15}}>
              <Typography style={{fontSize:13, color:'#2B2F3C'}}>{nego.price}</Typography>
              <Box style={{
                textAlign:'right',
                border: '1px solid',
                borderColor: '#65D170',
                background: '#D9FFDD',
                borderRadius: 20,
                color:'#65D170',
                width: 'max-content',
                paddingLeft: 10,
                paddingRight: 10,
              }}>
                <Typography variant="body2" >{nego.status}</Typography>
              </Box>
            </Grid>
              
          </div>
        </div> 
      );
    }else if(param === "Inprogress" && position !== "end"){
      return (
        <div className={classes.container}>
          <div className={classes.content}>
            <Grid container spacing={2} justify="space-between">
              <Typography style={{fontSize:13, color:'#2B2F3C'}}>{nego.title}</Typography>
              <Typography style={{fontSize:10, color:'#BCC8E7'}}>{nego.date}</Typography>
            </Grid>
            <Grid container spacing={2} justify="space-between" style={{marginTop:15}}>
              <Typography style={{fontSize:13, color:'#2B2F3C'}}>{nego.price}</Typography>
              <Box style={{
                textAlign:'right',
                border: '1px solid',
                borderColor: '#88ADFF',
                background: '#EFF4FF',
                borderRadius: 20,
                color:'#88ADFF',
                width: 'max-content',
                paddingLeft: 10,
                paddingRight: 10,
              }}>
                <Typography variant="body2" >{nego.status}</Typography>
              </Box>
            </Grid>
          </div>
        </div>
      );
    }else{
      return (
        <div className={classes.containerWaiting}>
          <div className={classes.content}>
            <Grid container spacing={2} justify="space-between">
              <Typography style={{fontSize:13, color:'#2B2F3C'}}>{nego.title}</Typography>
              <Typography style={{fontSize:10, color:'#BCC8E7'}}>{nego.date}</Typography>
            </Grid>
            <Grid container spacing={2} justify="space-between" style={{marginTop:15}}>
              <Typography style={{fontSize:13, color:'#2B2F3C'}}>{nego.price}</Typography>
              <Box style={{
                textAlign:'right',
                border: '1px solid',
                borderColor: '#FFB443',
                background: '#FFF9F0',
                borderRadius: 20,
                color:'#FFB443',
                width: 'max-content',
                paddingLeft: 10,
                paddingRight: 10,
              }}>
                <Typography variant="body2" >{nego.status}</Typography>
              </Box>
            </Grid>
          </div>
        </div>
      );
    }
    
  }
  return (
    <div className={classes.root}>
      {dataNego.map((nego) =>{
        const {status} = nego;
        return (
          <>
            {renderTimelineData(status, nego)}
          </>
        );
      })}

    </div>
  );
};

index.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  dataNego: PropTypes.array,
};
  
index.defaultProps = {
  dataNego: [],
};

export default index;