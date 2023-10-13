/* eslint-disable react/forbid-prop-types */
import { Box, Grid, makeStyles, Paper } from "@material-ui/core";
import React, { useState } from "react";
import PropTypes from 'prop-types';
import { Typography } from "antd";
import { ReactComponent as IconKeamanan } from "../../../../../assets/icons/task/keamananRed.svg";
import {
  GrayHard,
  GrayMedium,
  GrayUltrasoft,
  PrimaryHard,
  White,
} from "../../../../../assets/theme/colors";
import ValueDetailTask from "../../../../../components/ValueDetailTask";
import NoImage from "../../../../../assets/images/image.png";
import MinioDocComponent from "../../../../../components/MinioDocComponent";
import MinioImageComponent from "../../../../../components/MinioImageComponent";
import { dataCard } from "../../../../../helpers/constants";

const useStyles = makeStyles({
  input: {
    width: "100%",
    minHeight: "632px",
    height: "100%",
    borderRadius: 10,
    boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
  },
  title: {
    fontFamily: "Barlow",
    fontSize: 13,
    fontWeight: 600,
    paddingLeft: 12,
  },
  title2: {
    fontFamily: "Barlow",
    fontSize: 13,
    fontWeight: 600,
    marginBottom: 8,
  },
  vndrAtch: {
    fontFamily: "Barlow",
    fontSize: 13,
    fontWeight: 600,
    marginLeft: 8,
  },
  txtBoldRed: {
    fontFamily: "Barlow",
    fontSize: 20,
    fontWeight: 600,
    color: PrimaryHard,
    marginLeft: 10,
  },
  txtGray: {
    fontFamily: "Barlow",
    fontSize: 13,
    fontWeight: 600,
    color: GrayHard,
    marginLeft: 8,
  },
  item: {
    marginTop: 20,
  },
  item2: {
    marginTop: 20,
    direction: "row",
    justifyContent: "space-between",
  },
  label: {
    fontFamily: "Barlow",
    fontSize: 13,
    fontWeight: 600,
    color: GrayHard,
    marginBottom: 10,
  },
  col2: {
    direction: "column",
  },
  value2: {
    border: 1,
    borderColor: GrayHard,
    alignItems: "center",
    width: 250,
    height: 40,
    color: White,
  },
  txtValue: {
    fontFamily: "Barlow",
    fontSize: 13,
    margin: 10,
  },
  imgContainer: {
    borderRadius: 10,
    width: '100%', 
    height: '100px',
  }
});

const FromInput = ({data}) => {
  const classes = useStyles();
  const openingType = (new URLSearchParams(window.location.search)).get("openingType");

  return (
    <div>
      <Paper className={classes.input}>
        <div style={{ padding: 30 }}>
          <Grid container direction="column" spacing={2}>
            <Grid container direction="row" alignItems="center">
              <IconKeamanan />
              <Typography className={classes.txtBoldRed}>
                {openingType !=="Termin" ? "Keamanan":"Cabut Keamanan"}
              </Typography>
            </Grid>
            <Grid item className={classes.item}>
              <Box
                style={{ width: "100%", padding: "13px 0" }}
                borderColor={GrayUltrasoft}
                border={1}
                borderRadius={10}
              >
                <Typography className={classes.title}>{data.category}</Typography>
              </Box>
            </Grid>
            <Grid item className={classes.item}>
              <Box
                style={{ width: "100%", padding: "10px 0" }}
                borderColor={GrayUltrasoft}
                border={1}
                borderRadius={10}
              >
                <Typography
                  style={{
                    fontFamily: "Barlow",
                    fontSize: 13,
                    fontWeight: 400,
                    paddingLeft: 12,
                  }}
                >{data.description}
                </Typography>
              </Box>
            </Grid>
            <Grid container className={classes.item2}>
              <Grid item xs={5}>
                <ValueDetailTask label="Due Date" value={data.dueDate} />
              </Grid>
              <Grid item xs={5}>
                <ValueDetailTask label="PIC/Vendor" value={data.picVendor} />
              </Grid>
            </Grid>
            <Grid container className={classes.item2}>
              <Typography
                style={{
                  fontFamily: "Barlow",
                  fontSize: 13,
                  fontWeight: 600,
                  color: GrayMedium,
                }}
              >
                Informasi Vendor
              </Typography>
              <Box
                style={{
                  backgroundColor: GrayMedium,
                  width: "100%",
                  height: 2,
                }}
              />
            </Grid>
            <Grid container className={classes.item2}>
              <Grid item xs={5}>
                <ValueDetailTask 
                  label="BAST Digital" 
                  value={data.bastDigital} 
                  bastSubmitStatus={data.bastSubmitStatus}
                  txtValue='BAST Digital - Keamanan' 
                  href={dataCard.find(val=>val.type=='security').url+'/bast-digital-preview/'+data.bastDigital}
                  bast 
                />
              </Grid>
            </Grid>
            <Grid item>
              <Typography style={{fontWeight: 500, color: '#8D98B4'}}>Photo</Typography>
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
        </div>
      </Paper>
    </div>
  );
};

FromInput.propTypes = {
  data: PropTypes.object.isRequired,
};
export default FromInput;
