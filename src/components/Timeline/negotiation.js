import React, {useState, useEffect} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {Typography , Grid, Box, Button, Link} from '@material-ui/core';
import PropTypes from 'prop-types';
import moment from 'moment';
import {ReactComponent as FileIcon} from '../../assets/icons/general/paperclip.svg';
import {ReactComponent as FlagIcon} from '../../assets/icons/duotone-gray/flag-alt.svg';
import { ReactComponent as FlagGreenIcon } from "../../assets/icons/duotone-others/flag-alt-green.svg";
import getMinioFile from '../../helpers/getMinioFromUrl';

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
    padding: '10px 0px 10px 40px',
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
      height: '130%',
      left: -37,
      backgroundColor: '#f4f7fb',
      top: -20,
      zIndex: 1,
    }
  },

  documentLink: {
    backgroundColor: 'unset', 
    padding: 0,
    '& .MuiButton-root':{padding: 0, textTransform: 'none' ,backgroundColor: 'unset'},
    '& .MuiButton-root:hover':{opacity: 0.6,backgroundColor: 'unset'},
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

const RenderOfferingFile=({filePath})=>{
  const [dataOffering,setDataOffering] = useState(null);
  function limitString(string, count){
    const result = string.slice(0, count) + (string.length > count ? "..." : "");
    return result;
  }
  useEffect(()=>{
    try{
      getMinioFile(filePath).then(result=>{
        // console.log(">>>> try getMinio Offering ",JSON.stringify(result));
        setDataOffering(result);
      });
    }catch(err){
      console.log(">>>> Error try getMinio", err);
    }
  },[]);
  useEffect(()=>{console.log(">>>> dataOffering: ", dataOffering);},[dataOffering]);
  return(
    <Link href={dataOffering == null ? '#' : dataOffering.fileUrl} target="_blank" style={{textDecoration: 'none',fontSize: 13, color: '#DC241F', fontWeight: 400}}>
      {dataOffering == null ? 'N/A': limitString(dataOffering.fileName, 25)}
    </Link>
  );
};
RenderOfferingFile.propTypes={
  filePath: PropTypes.string.isRequired,
};

const TimelineNegotiation = (props) => {
  const {dataNego} = props;
  const classes = useStyles();

  const jumlahDataToShow = 3;
  const [displayValue, setDisplayValue] = useState('none');
  const displayDifHide = {"display" : displayValue};
  
  function showHideHistory() {
    if (displayValue === 'none') {
      setDisplayValue('block');
    } else {
      setDisplayValue('none');
    }
  }
  // console.log("??? dataNego", dataNego);
  return (
    <div className={classes.root}>
      {dataNego.map((nego, index) =>{
        
        return (
          <>
            <div className={classes.container} style={index < (dataNego.length-jumlahDataToShow) ? displayDifHide : null}>
              <Grid container justify="space-between" alignItems="center" style={{marginBottom: 20}}>
                <Typography style={{fontSize:15, fontWeight: 500, color:'#000'}}>{`${OrdinalNumber(index + 1)  } negotiation`}</Typography>
                <Typography style={{fontSize:10, color:'#BCC8E7'}}>{moment(nego.submitNegotiationDetailDate).format('ll')}</Typography>
              </Grid>
              
              <div className={index === 0 ? classes.contentFirst : classes.content}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Grid container direction="column" alignItems="flex-start">
                      <Typography style={{fontSize:13, color:'#2B2F3C', marginBottom: 5}}>
                        Penawaran CIMB : 
                        <span>
                          {nego.priceCimbDealFlag ? (
                            <FlagGreenIcon style={{ height: 15, width: 15 }} />
                          ) : (
                            <FlagIcon style={{ height: 15, width: 15 }} />
                          )}
                        </span>
                      </Typography>
                      {
                        nego.offeringPriceCimbList?.map((rowCimb, idx) => {
                          return (
                            <>
                              <Typography style={{ fontSize: 12, color: '#2B2F3C', marginRight: 10 }}>Tahun ke - {(idx+1)}</Typography>
                              <Typography style={{ fontSize: 16, fontWeight: 500, color: '#2B2F3C', marginBottom: 5, marginRight: 10 }}>
                                {idrCurrencyFormat(rowCimb, '.')}
                              </Typography>
                            </>
                          );
                        })
                      }
                      <Grid container spacing={1} alignItems="center">
                        <Grid item style={{marginTop:5}}><FileIcon /></Grid>
                        <Grid item  className={classes.documentLink}>
                          {nego.offeringFilesCimb === null? 
                            <Typography style={{fontSize: 13, color: '#DC241F', fontWeight: 400}}>N/A</Typography>
                            :
                            <RenderOfferingFile filePath={nego.offeringFilesCimb} />}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Grid container direction="column" alignItems="flex-start">
                      <Typography style={{fontSize:13, color:'#2B2F3C', marginBottom: 5}}>Penawaran Landlord : 
                        <span>
                          {nego.priceLandlordDealFlag ? (
                            <FlagGreenIcon style={{ height: 15, width: 15 }} />
                          ) : (
                            <FlagIcon style={{ height: 15, width: 15 }} />
                          )}
                        </span>
                      </Typography>                      
                      {
                        nego.offeringPriceLandlordList?.map((rowLandlord, idxLand) => {
                          return (
                            <>
                              <Typography style={{ fontSize: 12, color: '#2B2F3C', marginRight: 10 }}>Tahun ke - {(idxLand + 1)}</Typography>
                              <Typography style={{ fontSize: 16, fontWeight: 500, color: '#2B2F3C', marginBottom: 5, marginRight: 10 }}>
                                {idrCurrencyFormat(rowLandlord, '.')}
                              </Typography>
                            </>
                          );
                        })
                      }
                      <Grid container spacing={1} alignItems="center">
                        <Grid item style={{marginTop:5}}><FileIcon/></Grid>
                        <Grid item className={classes.documentLink}>
                          {nego.offeringFilesLandlord === null? 
                            <Typography style={{fontSize: 13, color: '#DC241F', fontWeight: 400}}>N/A</Typography>
                            :
                            <RenderOfferingFile filePath={nego.offeringFilesLandlord} />  }
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </div>
            </div>
          </>

        );
      }).reverse()}
      {dataNego.length > jumlahDataToShow &&
        <Grid>
          <Typography onClick={()=>{showHideHistory();}} style={{textAlign:'center',cursor: 'pointer', color: '#DC241F', fontSize: 12}}>
              Show / Hide Older Negotiation
          </Typography>
        </Grid> 
      }

    </div>
  );
};

TimelineNegotiation.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  dataNego: PropTypes.array,
};
  
TimelineNegotiation.defaultProps = {
  dataNego: [],
};

export default TimelineNegotiation;