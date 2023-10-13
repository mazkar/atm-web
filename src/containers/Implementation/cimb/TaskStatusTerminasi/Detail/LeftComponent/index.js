/* eslint-disable react/forbid-prop-types */
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography, Grid, Box, IconButton, Button } from '@material-ui/core';
import { DatePicker } from 'antd';
import DeleteIcon from "@material-ui/icons/Delete";
import { ReactComponent as IconTitle } from '../../../../../../assets/icons/duotone-red/check-double.svg'; 
import { ReactComponent as CalendarIcon } from '../../../../../../assets/icons/linear-red/calendar.svg';
import { ReactComponent as UserIcon } from '../../../../../../assets/icons/general/user_red.svg';
import { ReactComponent as FileIcon } from "../../../../../../assets/icons/linear-red/paperclip.svg";
import { ReactComponent as GreenCheck } from '../../../../../../assets/icons/general/green-check.svg';
import { ReactComponent as RedPlus } from '../../../../../../assets/icons/general/plus_red.svg';
import * as Colors from '../../../../../../assets/theme/colors';
import NoImage from "../../../../../../assets/images/image.png";
import MinioDocComponent from '../../../../../../components/MinioDocComponent';
import MinioImageComponent from '../../../../../../components/MinioImageComponent';
import { dataCard } from "../../../../../../helpers/constants";
import ValueDetailTask from '../../../../../../components/ValueDetailTask';

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
  imgContainer: {
    borderRadius: 10,
    width: '100%', 
    height: '100px',
  }
});
function LeftComponent(props) {
  const classes = useStyles();
  const {data} = props;
  
  return (
        
    <Paper className={classes.rootPaper}>
      <Grid container direction='column' spacing={2} style={{paddingBottom: '15px', paddingRight: 70}}>
        <Grid item>
          <Grid container direction='row'>
            <Grid item style={{ padding: '2px 7px' }}>
              <IconTitle/>
            </Grid>
            <Grid item>
              <Typography style={{ fontWeight: 600, color: '#DC241F', fontSize: 20 }}>Status Terminasi</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Typography className={classes.textValue}>{data.taskTitle}</Typography>
        </Grid>
        <Grid item>
          <Typography className={classes.textValue} style={{minHeight: 75}}>{data.note}</Typography>
        </Grid>
        <Grid item>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Grid container direction="column" spacing={1}>
                <Grid item>
                  <Typography style={{fontWeight: 500, color: '#8D98B4'}}>Due date & Time</Typography>
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
          <Button
            style={{
              fontWeight: '600',
              fontSize: '15px',
              lineHeight: '18px',
              marginRight: 8,
              textTransform: "capitalize",
              color: data.isMailed ? Colors.SuccessMedium : Colors.PrimaryHard,
            }}
            disabled
          >
                Email Status Terminasi
            {data.isMailed ? <GreenCheck style={{marginLeft: 10}}/> : <RedPlus style={{marginLeft: 10}}/>}
          </Button>
        </Grid>
        <Grid item>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <ValueDetailTask
                label="BAST Digital" 
                value={data.bastId} 
                txtValue='BAST Digital - Terminasi' 
                href={dataCard.find(val=>val.type=='termination').url+'/bast-digital-preview/'+data.bastId+'?taskType=termination'}
                bast 
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Typography style={{fontWeight: 500, color: '#8D98B4'}}>Photo Lokasi / Layout</Typography>
          <Grid container direction='row' spacing={4} style={{marginTop: '5px'}}> 
            <Grid item xs={3}>
              <Box>
                <Grid container direction='column' alignItems="center">
                  {data.photoFront ? (
                    <MinioImageComponent filePath={data.photoFront} className={classes.imgContainer}/>
                  ): (
                    <img src={NoImage} className={classes.imgContainer} alt="img-depan"/>
                  ) }
                  <Typography>Depan</Typography>
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box>
                <Grid container direction='column' alignItems="center">
                  {data.photoRight ? (
                    <MinioImageComponent filePath={data.photoRight} className={classes.imgContainer}/>
                  ): (
                    <img src={NoImage} className={classes.imgContainer} alt="img-kanan"/>
                  ) }
                  <Typography>Kanan</Typography>
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box>
                <Grid container direction='column' alignItems="center">
                  {data.photoLeft ? (
                    <MinioImageComponent filePath={data.photoLeft} className={classes.imgContainer}/>
                  ): (
                    <img src={NoImage} className={classes.imgContainer} alt="img-kiri"/>
                  ) }
                  <Typography>Kiri</Typography>
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box>
                <Grid container direction='column' alignItems="center">
                  {data.photoRear ? (
                    <MinioImageComponent filePath={data.photoRear} className={classes.imgContainer}/>
                  ): (
                    <img src={NoImage} className={classes.imgContainer} alt="img-belakang"/>
                  ) }
                  <Typography>Belakang</Typography>
                </Grid>
              </Box>
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

