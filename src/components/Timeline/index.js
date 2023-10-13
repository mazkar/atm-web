import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {Typography , Grid, Box} from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  root: {
    // backgroundColor: '#fa6ede',
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
    // backgroundColor: '#88fcfb',
    padding: '10px 10px 10px 40px',
    position: 'relative',
    width: '100%',
    '&::after': {
      content: '""',
      position: 'absolute',
      width: 25,
      height: 25,
      left: 0,
      backgroundColor: '#FF6A6A',
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
    // backgroundColor: '#e3f589',
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
  return (
    <div className={classes.root}>
      {dataNego.map((nego) =>{
        const {status} = nego;
        return (
          <>
            {status === 'Complete' 
              ? <div className={classes.containerFinish}>
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
              :  <div className={classes.container}>
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
                      borderColor: '#FF7A76',
                      background: '#FFE9E9',
                      borderRadius: 20,
                      color:'#FF7A76',
                      width: 'max-content',
                      paddingLeft: 10,
                      paddingRight: 10,
                    }}>
                      <Typography variant="body2" >{nego.status}</Typography>
                    </Box>
                  </Grid>
                </div>
              </div>
            }
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