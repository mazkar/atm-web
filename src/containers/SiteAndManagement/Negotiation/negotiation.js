import React, {useState} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {Typography , Grid} from '@material-ui/core';
import PropTypes from 'prop-types';
import {ReactComponent as FileIcon} from '../../../assets/icons/general/paperclip.svg';
import NegoInput from './NegotiationInput';

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
      backgroundColor: '#FF6A6A',
      border: '3px solid #FFFF',
      top: 10,
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
    backgroundColor: '#fff',
  },

  contentFirst: {
    padding: '15px 15px',
    position: 'relative',
    borderRadius: 10,
    border: '1px solid #BCC8E7',
    backgroundColor: '#fff',
    '&::after': {
      content: '""',
      position: 'absolute',
      width: 20,
      height: 150,
      left: -37,
      backgroundColor: '#f0f2f5',
      top: -20,
      zIndex: 1,
    }
  },

});

const idrCurrencyFormat = (value, delimiter) => {
  return `Rp ${  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, delimiter)}`;
};

const OrdinalNumber = (i)=>  {
  const j = i % 10;
  const k = i % 100;
  if (j === 1 && k !== 11) {
    return `${i  }st`;
  }
  if (j === 2 && k !== 12) {
    return `${i  }nd`;
  }
  if (j === 3 && k !== 13) {
    return `${i  }rd`;
  }
  return `${i  }th`;
};

var months = {
  1 :"January",
  2 :"February",
  3 :"March",
  4 :"April",
  5 :"May",
  6 :"June",
  7 :"July",
  8 :"August",
  9 :"September",
  10 :"October",
  11 :"November",
  12 :"December"
 };
 
const getDate = (d) => {
  if (d) {
    var date = new Date(d).toLocaleDateString(),
      now = date.split('/');
    return now[1] + ' ' + months[parseInt(now[0])] + ' ' + now[2];
  }
  return "-";
};

const getPresentDate = () => {
  var date = new Date(), 
  loc = date.toLocaleDateString(), 
  today = loc.split('/');
  return today[1] + ' ' + months[parseInt(today[0])] + ' ' + today[2];
};

const TimelineNegotiation = ({dataNego}) => {
  const newDataNego = dataNego;
  const classes = useStyles();
  const dataRowsCount = dataNego[0] && dataNego[0].negotiation.length;
  // const dataRowsCount = dataNego.length;

  const [displayValue, setDisplayValue] = useState('none');
  const displayDifHide = {"display" : displayValue};

  function showHideHistory() {
    if (displayValue === 'none') {
      setDisplayValue('block');
    } else {
      setDisplayValue('none');
    }
  }

  return (
    <div className={dataRowsCount > 0 ? classes.root : null}>
      <div className={classes.container}>
          <Grid container justify="space-between" alignItems="center" style={{marginBottom: 20}}>
              <Typography style={{fontSize:15, fontWeight: 500, color:'#000'}}>{dataRowsCount > 0 ? OrdinalNumber(dataRowsCount+1)+' negotiation' : '1st negotiation'}</Typography>
              <Typography style={{fontSize:10, color:'#BCC8E7'}}>{getPresentDate()}</Typography>
          </Grid>
        <NegoInput />
      </div>
      {/* {newDataNego.map((nego, index) =>{ */}
      {newDataNego[0] && newDataNego[0].negotiation.map((nego, index) =>{
        return (
          <>
            <div className={classes.container} style={ dataRowsCount > 2 ? index < dataRowsCount-2 ? displayDifHide : null : null}>
              <Grid container justify="space-between" alignItems="center" style={{marginBottom: 20}}>
                <Typography style={{fontSize:15, fontWeight: 500, color:'#000'}}>{OrdinalNumber(index+1) + ' negotiation'}</Typography>
                <Typography style={{fontSize:10, color:'#BCC8E7'}}>{getDate(nego.submitNegotiationDetailDate)}</Typography>
                {/* <Typography style={{fontSize:15, fontWeight: 500, color:'#000'}}>{nego.title}</Typography> */}
                {/* <Typography style={{fontSize:10, color:'#BCC8E7'}}>{getDate(nego.date)}</Typography> */}
              </Grid>
              
              {/* <div className={(index + 1) === (dataRowsCount) ? classes.contentFirst : classes.content}> */}
              <div className={index === 0 ? classes.contentFirst : classes.content}>
                <Grid container spacing={2} onClick={()=> console.log(index)}>
                  <Grid item xs={6}>
                    <Grid container direction="column" alignItems="flex-start">
                      <Typography style={{fontSize:13, color:'#2B2F3C', marginBottom: 5}}>Penawaran CIMB :</Typography>
                      <Typography style={{fontSize:16, fontWeight: 500, color:'#2B2F3C', marginBottom: 5}}>{idrCurrencyFormat(nego.offeringPriceCimb, '.')}</Typography>
                      {/* <Typography style={{fontSize:16, fontWeight: 500, color:'#2B2F3C', marginBottom: 5}}>{nego.price}</Typography> */}
                      <Grid container spacing={1} alignItems="center">
                        <Grid item style={{marginTop:5}}><FileIcon /></Grid>
                        <Grid item style={{color: '#DC241F', fontSize: 14}}>Surat Penawaran.pdf</Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Grid container direction="column" alignItems="flex-start">
                      <Typography style={{fontSize:13, color:'#2B2F3C', marginBottom: 5}}>Penawaran Landlord :</Typography>
                      <Typography style={{fontSize:16, fontWeight: 500, color:'#2B2F3C', marginBottom: 5}}>{idrCurrencyFormat(nego.offeringPriceLandlord, '.')}</Typography>
                      {/* <Typography style={{fontSize:16, fontWeight: 500, color:'#2B2F3C', marginBottom: 5}}>{nego.price}</Typography> */}
                      <Grid container spacing={1} alignItems="center">
                        <Grid item style={{marginTop:5}}><FileIcon/></Grid>
                        <Grid item style={{color: '#DC241F', fontSize: 14}}>Surat Penawaran.pdf</Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </div>
              {dataRowsCount > 2 ? index === dataRowsCount-2 ? 
              <Grid>
                <Typography onClick={()=>{showHideHistory();}} style={{textAlign:'center',cursor: 'pointer', color: '#DC241F', fontSize: 12, padding: '10px'}}>
                    Show Older Negotiation
                </Typography>
              </Grid> 
              : null : null}
            </div>
          </>
        );
      }).reverse()}
    </div>
  );
};

TimelineNegotiation.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  dataNego: PropTypes.array
};
  
TimelineNegotiation.defaultProps = {
  dataNego: [],
};

export default TimelineNegotiation;