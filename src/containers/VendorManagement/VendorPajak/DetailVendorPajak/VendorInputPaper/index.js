/* eslint-disable react/forbid-prop-types */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from "@material-ui/icons/Delete";
import { Paper, Typography, Grid, IconButton } from '@material-ui/core';
import "moment/locale/id";
import * as Colors from '../../../../../assets/theme/colors';
import DateSelectTimestamp from '../../../../../components/Selects/DateSelectTimestamp';
import { ChkyInputSmall, IdrNumberInput } from '../../../../../components';
import InputFile from '../../../../../components/InputFile';
import MinioDocComponent from '../../../../../components/MinioDocComponent';

const useStyles = makeStyles({
  rootPaper: {
    width: '100%',
    minHeight: '550px',
    borderRadius: 10,
    boxShadow: '0px 6px 6px rgba(232, 238, 255, 0.3)',
    padding: 25,
  },
  lable: {
    color: "#374062",
    fontSize: 13,
  },
  value: {
    color: "#374062",
    fontSize: 13,
    fontWeight: 600,
    textAlign: "right"
  },
  row: {
    paddingBottom: 10
  }
});

export const defaultData = {
  tglObjectPajak: "",
  tglDaftar: "",
  tglReview: "",
  tglCetak: "",
  tglBayar: "",
  skkpdFileRes: "",
  skkpdFile: "",
  tglPajakAwal: "",
  tglPajakAkhir: "",
  nilaiPajak: "",
  nilaiJasa: ""
};
function VendorInputPaper({data, onChange}) {
  const classes = useStyles();
  return (
    <Paper className={classes.rootPaper}>
      <Grid container direction='column' spacing={2} style={{paddingBottom: '15px', paddingRight: 70}}>
        <Grid item>
          <Typography style={{ fontWeight: 500, fontSize: 20 }}>
            Vendor Input
          </Typography>
        </Grid>
      </Grid>
      <Grid container justifyContent='space-between' className={classes.row} alignItems="center">
        <Grid item xs={5}><Typography className={classes.lable}>Survey Objek Pajak</Typography></Grid>
        <Grid item xs={1}><Typography className={classes.lable}>:</Typography></Grid>
        <Grid item xs={6}>
          <DateSelectTimestamp value={data.tglObjectPajak} placeholder='Masukan Tanggal Survey Objek Pajak' width="100%"
            handleChange={(val) => {
              onChange(val, "tglObjectPajak");
            }}/>
        </Grid>
      </Grid>
      <Grid container justifyContent='space-between' className={classes.row} alignItems="center">
        <Grid item xs={5}><Typography className={classes.lable}>Proses Daftar</Typography></Grid>
        <Grid item xs={1}><Typography className={classes.lable}>:</Typography></Grid>
        <Grid item xs={6}>
          <DateSelectTimestamp value={data.tglDaftar} placeholder='Masukan Tanggal Proses Daftar' width="100%"
            handleChange={(val) => {
              onChange(val, "tglDaftar");
            }}/>
        </Grid>
      </Grid>
      <Grid container justifyContent='space-between' className={classes.row} alignItems="center">
        <Grid item xs={5}><Typography className={classes.lable}>Review SKPD</Typography></Grid>
        <Grid item xs={1}><Typography className={classes.lable}>:</Typography></Grid>
        <Grid item xs={6}>
          <DateSelectTimestamp value={data.tglReview} placeholder='Masukan Tanggal Review SKPD' width="100%"
            handleChange={(val) => {
              onChange(val, "tglReview");
            }}/>
        </Grid>
      </Grid>
      <Grid container justifyContent='space-between' className={classes.row} alignItems="center">
        <Grid item xs={5}><Typography className={classes.lable}>Cetak SKPD</Typography></Grid>
        <Grid item xs={1}><Typography className={classes.lable}>:</Typography></Grid>
        <Grid item xs={6}>
          <DateSelectTimestamp value={data.tglCetak} placeholder='Masukan Tanggal Cetak SKPD' width="100%"
            handleChange={(val) => {
              onChange(val, "tglCetak");
            }}/>
        </Grid>
      </Grid>
      <Grid container justifyContent='space-between' className={classes.row} alignItems="center">
        <Grid item xs={5}><Typography className={classes.lable}>Proses Bayar</Typography></Grid>
        <Grid item xs={1}><Typography className={classes.lable}>:</Typography></Grid>
        <Grid item xs={6}>
          <DateSelectTimestamp value={data.tglBayar} placeholder='Masukan Tanggal Proses Bayar' width="100%"
            handleChange={(val) => {
              onChange(val, "tglBayar");
            }}/>
        </Grid>
      </Grid>
      <Grid container justifyContent='space-between' className={classes.row} alignItems="center">
        <Grid item xs={5}><Typography className={classes.lable}>Attach SKPD & SSPD</Typography></Grid>
        <Grid item xs={1}><Typography className={classes.lable}>:</Typography></Grid>
        <Grid item xs={6}>
          {data?.skkpdFileRes ? (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
              <MinioDocComponent filePath={data?.skkpdFileRes} />
              <IconButton
                style={{ marginLeft: 10, color: "#DC241F" }}
                onClick={() => {
                  onChange("", "skkpdFileRes");
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </div>
          ) : (
            <InputFile
              refId="skkpdFile"
              onChange={(e) =>
                onChange(e.target.files[0], "skkpdFile")
              }
              selectedFile={data.skkpdFile}
              onDelete={() => {
                onChange("", "skkpdFile");
              }}
              placeholder="Upload File SKPD & SSPD"
            />
          )}
        </Grid>
      </Grid>
      <Grid container justifyContent='space-between' className={classes.row} alignItems="center">
        <Grid item xs={5}><Typography className={classes.lable}>Pajak Awal Tahun Berikutnya</Typography></Grid>
        <Grid item xs={1}><Typography className={classes.lable}>:</Typography></Grid>
        <Grid item xs={6}>
          <DateSelectTimestamp value={data.tglPajakAwal} placeholder='Masukan Pajak Awal' width="100%"
            handleChange={(val) => {
              onChange(val, "tglPajakAwal");
            }}/>
        </Grid>
      </Grid>
      <Grid container justifyContent='space-between' className={classes.row} alignItems="center">
        <Grid item xs={5}><Typography className={classes.lable}>Pajak Akhir Tahun Berikutnya</Typography></Grid>
        <Grid item xs={1}><Typography className={classes.lable}>:</Typography></Grid>
        <Grid item xs={6}>
          <DateSelectTimestamp value={data.tglPajakAkhir} placeholder='Masukan Pajak Akhir' width="100%" 
            handleChange={(val) => {
              onChange(val, "tglPajakAkhir");
            }}/>
        </Grid>
      </Grid>
      <Grid container justifyContent='space-between' className={classes.row} alignItems="center">
        <Grid item xs={5}><Typography className={classes.lable}>Nilai Pajak </Typography></Grid>
        <Grid item xs={1}><Typography className={classes.lable}>:</Typography></Grid>
        <Grid item xs={6}>
          <IdrNumberInput 
            onValueChange={(val)=>onChange(val.value, "nilaiPajak")} 
            value={data.nilaiPajak} 
            style={{width: "100%"}}
            placeholder="Masukan Nilai Pajak" />
        </Grid>
      </Grid>
      <Grid container justifyContent='space-between' className={classes.row} alignItems="center">
        <Grid item xs={5}><Typography className={classes.lable}>Nilai Jasa</Typography></Grid>
        <Grid item xs={1}><Typography className={classes.lable}>:</Typography></Grid>
        <Grid item xs={6}>
          <IdrNumberInput 
            onValueChange={(val)=>onChange(val.value, "nilaiJasa")} 
            value={data.nilaiJasa} 
            style={{width: "100%"}}
            placeholder="Masukan Nilai Jasa" />
        </Grid>
      </Grid>
    </Paper>
  );
}

VendorInputPaper.propTypes = {
  data: PropTypes.object,
  onChange: PropTypes.func
};

VendorInputPaper.defaultProps = {
  data: defaultData,
  onChange: ()=>console.log('Handle Change')
};

export default VendorInputPaper;

