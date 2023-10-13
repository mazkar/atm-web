/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/prop-types */
/* External Import */
import React from 'react';
import { makeStyles } from "@material-ui/styles";
import { Typography, Grid } from '@material-ui/core';
import PropTypes from "prop-types";

/* Internal Import */
import { PrimaryHard, InfoMedium, Green, GrayHard } from '../../assets/theme/colors';
import {ReactComponent as TicketAlt} from "../../assets/icons/duotone-red/ticket-alt.svg";
import {ReactComponent as ExclamationCircle} from "../../assets/icons/duotone-red/exclamation-circle.svg";
import {ReactComponent as ClipboardCheck} from "../../assets/icons/duotone-red/clipboard-check.svg";
import {ReactComponent as History} from "../../assets/icons/duotone-red/history.svg";
import {ReactComponent as MinusCircle} from "../../assets/icons/duotone-red/minus-circle.svg";
import {ReactComponent as ChevronDown} from "../../assets/icons/duotone-red/chevron-double-down.svg";
import {ReactComponent as CheckDouble} from "../../assets/icons/duotone-red/check-double.svg";
import useThousandSeparator from '../../helpers/useThousandSeparator';

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

export const defaultDataSummary = {
  leftCard: {
    total: 0,
    open: 0,
    assigned: 0,
    close: 0
  },
  middleCard: [
    {label: 'FLM', value: 0},
    {label: 'Potensi Modus Kejahatan', value: 0},
    {label: 'FLM Replenishment', value: 0},
    {label: 'SLM', value: 0},
    {label: 'Vendor CCTV External', value: 0},
    {label: 'Inventory Cassete Fault', value: 0},
  ],
  rightCard: [
    {label: 'Profile Site', value: 0},
    {label: 'Cek Media Promosi', value: 0},
    {label: 'Cek Kondisi Ruangan', value: 0},
    {label: 'Maintenance Premises', value: 0},
    {label: 'Kebersihan', value: 0},
    {label: 'Kondisi Ruangan', value: 0},
    {label: 'Kebutuhan Khusus', value: 0},
  ]
};

const SummaryCardDigitalasi = ({data, valueTab}) => {
  const classes = useStyles();

  return (
    <Grid container alignItems='start' style={{flexWrap: "nowrap"}}>
      {valueTab === 0 ?
      <Grid item xs={3} className={classes.wrapper}>
        <RowData label="Total Result" value={data.leftCard?.total} icon={<TicketAlt />}  />
        <RowData label="Open" value={data.leftCard?.open} icon={<ExclamationCircle />} color={PrimaryHard} />
        <RowData label="Survey Done" value={data.leftCard?.done}icon={<ClipboardCheck />} color={InfoMedium} />
        <RowData label="Survey Delay" value={data.leftCard?.delay} icon={<History />} color={Green} />
        <RowData label="Not Survey" value={data.leftCard?.notSurvey} icon={<MinusCircle />} color={PrimaryHard} />
        <RowData label="Manual" value={data.leftCard?.manual} icon={<ChevronDown />} color={InfoMedium} />
      </Grid> 
      : 
      <Grid item xs={3} className={classes.wrapper}>
        <RowData label="Total Ticket" value={data.leftCard?.total} icon={<TicketAlt />}  />
        <RowData label="Open" value={data.leftCard?.open} icon={<ExclamationCircle />} color={PrimaryHard} />
        <RowData label="Assign to Vendor" value={data.leftCard?.assign}icon={<ClipboardCheck />} color={InfoMedium} />
        <RowData label="Close" value={data.leftCard?.close} icon={<CheckDouble />} color={Green} />
      </Grid>
      }
      <Grid item xs={5} className={classes.wrapper}>
        {data?.middleCard.map((item)=>
          <RowData label={item.label} value={item.value} color={GrayHard} />
        )}
      </Grid>
      {data.rightCard.length > 0 &&
      <Grid item xs={4} className={classes.wrapper}>
        {data?.rightCard.map((item)=>
          <RowData label={item.label} value={item.value} color={GrayHard} />
        )}
      </Grid>
      }
    </Grid>
  );
};

SummaryCardDigitalasi.propTypes = {
  data: PropTypes.object
};

SummaryCardDigitalasi.defaultProps = {
  data: defaultDataSummary
};

const RowData = (props) => {
  const classes = useStyles();
  const {label, value, icon, type, color} = props;
  return (
    <Grid container justifyContent='space-between' alignItems="center" style={{flexWrap: "nowrap", marginBottom: "16px"}}>
      <Grid container>
        {
          icon && <div style={{marginRight: '8px'}}>{icon}</div>
        }
        <Typography className={classes.textWrapper}>{label}</Typography>
      </Grid>
      <Typography className={classes.textWrapper}style={{color}}>
        {useThousandSeparator(value)}
      </Typography>
    </Grid>
  );
};

export default SummaryCardDigitalasi;
