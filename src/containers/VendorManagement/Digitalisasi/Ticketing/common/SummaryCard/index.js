/* External Import */
import React from 'react';
import { makeStyles } from "@material-ui/styles";
import { Typography, Grid } from '@material-ui/core';

/* Internal Import */
import { PrimaryHard, InfoMedium, Green, GrayHard } from '../../../../../../assets/theme/colors';
import {ReactComponent as TicketAlt} from "../../../../../../assets/icons/duotone-red/ticket-alt.svg";
import {ReactComponent as ExclamationCircle} from "../../../../../../assets/icons/duotone-red/exclamation-circle.svg";
import {ReactComponent as ClipboardCheck} from "../../../../../../assets/icons/duotone-red/clipboard-check.svg";
import {ReactComponent as CheckDouble} from "../../../../../../assets/icons/duotone-red/check-double.svg";

const useStyles = makeStyles({
  wrapper: {
    background: "#ffffff",
    borderRadius: "10px",
    boxShadow: "rgba(232, 238, 255, 0.3)",
    padding: "20px",
    margin: "0px 10px",
    maxHeight: '200px',
    overflowY: 'scroll'
  },
  textWrapper: {
    fontFamily: "Barlow",
    fontWeight: 600,
    fontSize: 15,
  },
});

const SummaryCard = () => {
  const classes = useStyles();

  const RowData = (props) => {
    const {label, value, icon, type, color} = props;
    return (
      <Grid container justifyContent='space-between' alignItems="center" style={{flexWrap: "nowrap", marginBottom: "16px"}}>
        <Grid container>
          {
            icon && <div style={{marginRight: '8px'}}>{icon}</div>
          }
          <Typography className={classes.textWrapper}>{label}</Typography>
        </Grid>
        <Typography className={classes.textWrapper}
          style={{color}}
        >
          {value}
        </Typography>
      </Grid>
    );
  };

  return (
    <Grid container alignItems='start' style={{flexWrap: "nowrap"}}>
      <Grid item xs={3} className={classes.wrapper}>
        <RowData label="Total Ticket" value="3.000" icon={<TicketAlt />}  / >
        <RowData label="Open" value="1.300" icon={<ExclamationCircle />} color={PrimaryHard} / >
        <RowData label="Assign to Vendor" value="700" icon={<ClipboardCheck />} color={InfoMedium} / >
        <RowData label="Close" value="200" icon={<CheckDouble />} color={Green} / >
      </Grid>
      <Grid item xs={5} className={classes.wrapper}>
        <RowData label="FLM" value="1.200" color={GrayHard} / >
        <RowData label="Potensi Modus Kejahatan" value="120" color={GrayHard} / >
        <RowData label="FLM Replenishment" value="200" color={GrayHard} / >
        <RowData label="SLM" value="200" color={GrayHard} / >
        <RowData label="Vendor CCTV External" value="150" color={GrayHard} / >
      </Grid>
      <Grid item xs={4} className={classes.wrapper}>
        <RowData label="Profile Site" value="1.200" color={GrayHard} / >
        <RowData label="Cek Media Promosi" value="120" color={GrayHard} / >
        <RowData label="Cek Kondisi Ruangan" value="200" color={GrayHard} / >
        <RowData label="Maintenance Premises" value="200" color={GrayHard} / >
        <RowData label="Kebersihan" value="150" color={GrayHard} / >
      </Grid>
    </Grid>
  );
};

export default SummaryCard;
