/* eslint-disable react/forbid-prop-types */
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography, Grid, Box, IconButton } from '@material-ui/core';
import { DatePicker } from 'antd';
import DeleteIcon from "@material-ui/icons/Delete";
import { Link } from 'react-router-dom';
import { ReactComponent as IconTitle } from '../../../../../../assets/icons/duotone-red/list-ul.svg'; 
import { ReactComponent as CalendarIcon } from '../../../../../../assets/icons/linear-red/calendar.svg';
import { ReactComponent as UserIcon } from '../../../../../../assets/icons/general/user_red.svg';
import { ReactComponent as FileIcon } from "../../../../../../assets/icons/linear-red/paperclip.svg";
import { ChkyInputSmall } from '../../../../../../components';
import * as Colors from '../../../../../../assets/theme/colors';
import SelectLeftCustomIcon from '../../../../../../components/Selects/SelectLeftCustomIcon';
import DoubleSelector from '../../../../../../components/Selects/DoubleSelector';
import MinioDocComponent from '../../../../../../components/MinioDocComponent';
import { dataCard } from '../../../../../../helpers/constants';

const useStyles = makeStyles({
  rootPaper: {
    width: '100%',
    minHeight: '550px',
    borderRadius: 10,
    boxShadow: '0px 6px 6px rgba(232, 238, 255, 0.3)',
    padding: 25,
    height: '100%',
  },
  datePicker: {
    borderRadius: 6,
    height: '40px',
    border: '1px solid #BCC8E7',
  },
  iconButton: {
    padding: '0px 5px',
    color: Colors.GrayMedium,
    display: 'flex',
    alignItems: 'center'
  },
  uploadFile: {
    cursor: "pointer",
  },
  resetFile: {
    position: "absolute",
    top: -10,
    right: -65,
    color: "#DC241F",
  },
  textValue: {
    minHeight: 40,
    padding: 12,
    border: "1px solid #dfe4ea",
    borderRadius: 10,
    fontSize: 13,
    color: "#2B2F3C",
    width: "100%",
  },
  noData: {
    color: "#BCC8E7",
    fontStyle: "italic",
    fontSize: 13,
    marginTop: 10
  },
});

const typeSugestion = [
  {value: 'New', name: "New"},
  {value: 'Existing', name: "Existing"},
  {value: 'Not Request (-)', name: "Not Request (-)"},
];

const vendorSugestion = [
  {value: 'PT. Royal', name: "PT. Royal"},
  {value: 'PT. Trias', name: "PT. Trias"},
  {value: 'PT. Cakrawala Mitra', name: "PT. Cakrawala Mitra"},
  {value: 'PT. Sarana Usaha Adhi', name: "PT. Sarana Usaha Adhi"},
];

const requestSugestion = [
  {value: 'Urgent', name: "Urgent"},
  {value: 'Regular', name: "Regular"},
];

const typePremissesSugestion = [
  {value: 'ON', name: "ON"},
  {value: 'OFF', name: "OFF"},
];

const premissesOnSugestion = [
  {value: 'Konvensional', name: "Konvensional"},
  {value: 'Syariah', name: "Syariah"},
];

const premissesOffSugestion = [
  {value: 'Prominent', name: "Prominent"},
  {value: 'Branding', name: "Branding"},
  {value: 'High SA', name: "High SA"},
  {value: 'Medium SA', name: "Medium SA"},
  {value: 'High Usage', name: "High Usage"},
];

// function split path get filename
function splitDataPath(path) {
  const res = path.split("/");
  return res[res.length - 1];
}

function LeftComponent(props) {
  const classes = useStyles();
  const {data} = props;
  const openingType = (new URLSearchParams(window.location.search)).get("openingType");
  
  return (
        
    <Paper className={classes.rootPaper}>
      <Grid container direction='column' spacing={2} style={{paddingBottom: '15px', paddingRight: 70}}>
        <Grid item>
          <Grid container direction='row'>
            <Grid item style={{ padding: '2px 7px' }}>
              <IconTitle/>
            </Grid>
            <Grid item>
              <Typography style={{ fontWeight: 600, color: '#DC241F', fontSize: 20 }}>
                {openingType !=="Termin" ? "Parameter":"Cabut Parameter"}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Typography className={classes.textValue}>{data.type}</Typography>
        </Grid>
        <Grid item>
          <Typography className={classes.textValue} style={{minHeight: 75}}>{data.note}</Typography>
        </Grid>
        <Grid item>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Grid container direction="column" spacing={1}>
                <Grid item>
                  <Typography style={{fontWeight: 500, color: '#8D98B4'}}>Due date</Typography>
                </Grid>
                <Grid item>
                  <Typography className={classes.textValue}>{data.dueDate}</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container direction="column" spacing={1}>
                <Grid item>
                  <Typography style={{fontWeight: 500, color: '#8D98B4'}}>PIC / Vendor</Typography>
                </Grid>
                <Grid item>
                  <Typography className={classes.textValue}>{data.vendor}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Grid container direction="column" spacing={1}>
                <Grid item>
                  <Typography style={{fontWeight: 500, color: '#8D98B4'}}>Premises</Typography>
                </Grid>
                <Grid item>
                  <div style={{display: "flex"}}>
                    <Typography className={classes.textValue} style={{width: "30%", borderRadius: "8px 0px 0px 8px"}}>{data.typePremises}</Typography>
                    <Typography className={classes.textValue} style={{width: "70%", borderRadius: "0px 8px 8px 0px"}}>{data.premises}</Typography>
                  </div>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container direction="column" spacing={1}>
                <Grid item>
                  <Typography style={{fontWeight: 500, color: '#8D98B4'}}>Request Type</Typography>
                </Grid>
                <Grid item>
                  <Typography className={classes.textValue}>{data.requestType}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography style={{fontWeight: 600, color: '#8D98B4'}}>Informasi Vendor</Typography>
          <hr style={{border: "2px solid #BCC8E7", marginTop: 10}}/>
        </Grid>
        <Grid item>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Grid container direction="column" spacing={1}>
                <Grid item>
                  <Typography style={{fontWeight: 500, color: '#8D98B4'}}>Denom</Typography>
                </Grid>
                <Grid item>
                  <Typography className={classes.textValue}>{data.denom}</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container direction="column" spacing={1}>
                <Grid item>
                  <Typography style={{fontWeight: 500, color: '#8D98B4'}}>Kode GFMS</Typography>
                </Grid>
                <Grid item>
                  <Typography className={classes.textValue}>{data.kodeGfms}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Grid container direction="column" spacing={1}>
                <Grid item>
                  <Typography style={{fontWeight: 500, color: '#8D98B4'}}>Tipe Mesin</Typography>
                </Grid>
                <Grid item>
                  <Typography className={classes.textValue}>{data.machineType}</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container direction="column" spacing={1}>
                <Grid item>
                  <Typography style={{fontWeight: 500, color: '#8D98B4'}}>No PSF</Typography>
                </Grid>
                <Grid item>
                  <Typography className={classes.textValue}>{data.noPsf}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {/* <Grid item xs={6}>
            <Grid container direction="column" spacing={1}>
              <Grid item>
                <Typography style={{fontWeight: 500, color: '#8D98B4'}}>No RFC</Typography>
              </Grid>
              <Grid item>
                <Typography className={classes.textValue}>{data.noRfc}</Typography>
              </Grid>
            </Grid>
          </Grid> */}
        </Grid>
        <Grid item>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Grid container direction="column" spacing={1}>
                <Grid item>
                  <Typography style={{fontWeight: 500, color: '#8D98B4'}}>BAST  Digital </Typography>
                </Grid>
                <Grid item>
                  {/* <Typography>{data.bastDigital}</Typography> */}
                  <div>
                    {data.bastSubmitStatus === true ? (
                      <Link
                        to={`${dataCard.find(val=>val.type==='parameter').url}/bast-digital-preview/${data.bastDigital}`}
                        style={{
                          backgroundColor: "#E6EAF3",
                          padding: '6px 10px',
                          fontSize: '13px',
                          lineHeight: '16px',
                          borderRadius: '14px',
                          display: 'inline-block',
                          color: "#2B2F3C",
                        }}
                      >
                      BAST Digital - Parameter
                      </Link>
                    ) : (
                      '-'
                    )}
                  </div>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container direction="column" spacing={1}>
                <Grid item>
                  <Typography style={{fontWeight: 500, color: '#8D98B4'}}>Tgl PSF Selesai</Typography>
                </Grid>
                <Grid item>
                  <Typography className={classes.textValue}>{data. tglPsfSelesai}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <b style={{fontSize: 13}}>CIMB Attachment</b>
              {data.cimbAttachment.length > 0 ? 
                data.cimbAttachment.map((item)=>{
                  return(
                    <MinioDocComponent filePath={item.path}/>
                  );
                })
                : (<Typography className={classes.noData}>No Files</Typography>)}
            </Grid>
            <Grid item xs={6}>
              <b style={{fontSize: 13}}>Vendor Attachment</b>
              {data.vendorAttachment.length > 0 ? 
                data.vendorAttachment.map((item)=>{
                  return (
                    <MinioDocComponent filePath={item.path} textColor="#8D98B4"/>
                  );
                })
                : (<Typography className={classes.noData}>No Files</Typography>)}
            </Grid>
          </Grid>
          
        </Grid>
            
      </Grid>
    </Paper>
  );
}

LeftComponent.propTypes = {
  data: PropTypes.object.isRequired,
};

export default LeftComponent;

