/* eslint-disable no-console */
/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography, Grid, IconButton } from '@material-ui/core';
import "moment/locale/id";
import DeleteIcon from "@material-ui/icons/Delete";
import * as Colors from '../../../../../assets/theme/colors';
import { ChkyInputSmall } from "../../../../../components";
import AttachFileSelector from "../../../../../components/AttachFileSelector";
import MinioDocComponent from "../../../../../components/MinioDocComponent";
import ChildStatus from "../../../../../components/chky/TableChild/ChildStatus";

const useStyles = makeStyles({
  rootPaper: {
    width: '100%',
    height: '100%',
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
  tglOrder: "",
  typeOrder: "",
  pajakAwal: "",
  pajakAkhir: "",
  remark: "",
  statusPajak: "",
  statusPembayaran: "",
  tglPembayaran: "",
  invoiceFileRes: "",
  invoiceFile: "",
  tglKirimInvoice: "",
  noInvoice: "",
};

function renderStatusPaid(param) {
  if (param === "1") {
    return (
      <ChildStatus
        value="Paid"
        borderColor="#65D170"
        textColor="#65D170"
        fillColor="#DEFFE1"
      />
    );
  } 
  return (
    <ChildStatus
      value="Unpaid"
      borderColor="#FF6A6A"
      textColor="#FF6A6A"
      fillColor="#FFF6F6"
    />
  );
    
}

function DetailPaper({data, onChange}) {
  const classes = useStyles();
  return (
    <Paper className={classes.rootPaper}>
      <Grid container direction='column' spacing={2} style={{paddingBottom: '15px', paddingRight: 70}}>
        <Grid item>
          <Typography style={{ fontWeight: 500, fontSize: 20 }}>
                Detail
          </Typography>
        </Grid>
      </Grid>
      <Grid container justifyContent='space-between' className={classes.row}>
        <Grid item xs={4}><Typography className={classes.lable}>Tgl Order</Typography></Grid>
        <Grid item xs={1}><Typography className={classes.lable}>:</Typography></Grid>
        <Grid item xs={7}><Typography className={classes.value}>{data.tglOrder}</Typography></Grid>
      </Grid>
      <Grid container justifyContent='space-between' className={classes.row}>
        <Grid item xs={4}><Typography className={classes.lable}>Type Orderan</Typography></Grid>
        <Grid item xs={1}><Typography className={classes.lable}>:</Typography></Grid>
        <Grid item xs={7}><Typography className={classes.value}>{data.typeOrder}</Typography></Grid>
      </Grid>
      <Grid container justifyContent='space-between' className={classes.row}>
        <Grid item xs={4}><Typography className={classes.lable}>Pajak Awal</Typography></Grid>
        <Grid item xs={1}><Typography className={classes.lable}>:</Typography></Grid>
        <Grid item xs={7}><Typography className={classes.value}>{data.pajakAwal}</Typography></Grid>
      </Grid>
      <Grid container justifyContent='space-between' className={classes.row}>
        <Grid item xs={4}><Typography className={classes.lable}>Pajak Akhir</Typography></Grid>
        <Grid item xs={1}><Typography className={classes.lable}>:</Typography></Grid>
        <Grid item xs={7}><Typography className={classes.value}>{data.pajakAkhir}</Typography></Grid>
      </Grid>
      <Grid container justifyContent='space-between' className={classes.row}>
        <Grid item xs={4}><Typography className={classes.lable}>Remark</Typography></Grid>
        <Grid item xs={1}><Typography className={classes.lable}>:</Typography></Grid>
        <Grid item xs={7}><Typography className={classes.value}>{data.remark}</Typography></Grid>
      </Grid>
      <Grid container justifyContent='space-between' className={classes.row}>
        <Grid item xs={4}><Typography className={classes.lable}>Status Kepengurusan Pajak</Typography></Grid>
        <Grid item xs={1}><Typography className={classes.lable}>:</Typography></Grid>
        <Grid item xs={7}><Typography className={classes.value}>{data.statusPajak}</Typography></Grid>
      </Grid>
      <Grid container justifyContent='space-between' className={classes.row}>
        <Grid item xs={4}><Typography className={classes.lable}>Status Pembayaran</Typography></Grid>
        <Grid item xs={1}><Typography className={classes.lable}>:</Typography></Grid>
        <Grid item xs={7}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
            {renderStatusPaid(data.statusPembayaran)}
          </div>
        </Grid>
      </Grid>
      <Grid container justifyContent='space-between' className={classes.row}>
        <Grid item xs={4}><Typography className={classes.lable}>Tgl Pembayaran</Typography></Grid>
        <Grid item xs={1}><Typography className={classes.lable}>:</Typography></Grid>
        <Grid item xs={7}><Typography className={classes.value}>{data.tglPembayaran}</Typography></Grid>
      </Grid>
      <Grid container justifyContent='space-between' className={classes.row}>
        <Grid item xs={4}><Typography className={classes.lable}>Upload Invoice</Typography></Grid>
        <Grid item xs={1}><Typography className={classes.lable}>:</Typography></Grid>
        <Grid item xs={7}>
          {data?.invoiceFileRes ? (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
              <MinioDocComponent filePath={data?.invoiceFileRes} />
              <IconButton
                style={{ marginLeft: 10, color: "#DC241F" }}
                onClick={() => {
                  onChange("", "invoiceFileRes");
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
              <AttachFileSelector
                title="Select File Invoice"
                refId="invoiceAttach"
                onChange={(e) =>
                  onChange(e.target.files[0], "invoiceFile")
                }
                selectedFile={data.invoiceFile}
                onDelete={() => {
                  onChange("", "invoiceFile");
                }}
              />
            </div>
          )}
        </Grid>
      </Grid>
      <Grid container justifyContent='space-between' className={classes.row}>
        <Grid item xs={4}><Typography className={classes.lable}>Tgl Kirim Invoice</Typography></Grid>
        <Grid item xs={1}><Typography className={classes.lable}>:</Typography></Grid>
        <Grid item xs={7} alignContent="flex-end" alignItems='flex-end'><Typography className={classes.value}>{data.tglKirimInvoice}</Typography></Grid>
      </Grid>
      <Grid container justifyContent='space-between' className={classes.row}>
        <Grid item xs={4}><Typography className={classes.lable}>No Invoice</Typography></Grid>
        <Grid item xs={1}><Typography className={classes.lable}>:</Typography></Grid>
        <Grid item xs={7}>
          <ChkyInputSmall
            style={{width: "100%"}}
            value={data.noInvoice}
            onChange={(e) => {
              onChange(e.target.value, "noInvoice");
            }}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}

DetailPaper.propTypes = {
  data: PropTypes.object,
  onChange: PropTypes.func
};

DetailPaper.defaultProps = {
  data: defaultData,
  onChange: ()=>console.log('Handle Change')
};

export default DetailPaper;

