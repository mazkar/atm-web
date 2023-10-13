/* Third Party Import */
import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Typography, Button, Grid } from '@material-ui/core';
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

/* Internal Import */
import LabelTextField from "../../../../components/Form/LabelTextField";
import { PrimaryHard } from '../../../../assets/theme/colors';
import { ReactComponent as ExchangeAlt } from "../../../../assets/icons/duotone-red/exchange-alt.svg";
import { ReactComponent as Rss } from "../../../../assets/icons/duotone-red/rss.svg";
import { ReactComponent as Calculator } from "../../../../assets/icons/duotone-red/calculator.svg";
import { ReactComponent as MoneyBill } from "../../../../assets/icons/duotone-red/money-bill.svg";
import { ReactComponent as IdCard } from "../../../../assets/icons/duotone-red/id-card.svg";
import { ReactComponent as UserHeadset } from "../../../../assets/icons/duotone-red/user-headset.svg";
import { ReactComponent as ListIcon } from "../../../../assets/icons/duotone-red/list-ul.svg";
import { ReactComponent as UsersCog } from "../../../../assets/icons/duotone-red/users-cog.svg";
import { ReactComponent as Tools } from "../../../../assets/icons/duotone-red/tools.svg";
import { ReactComponent as ExclamationCircle } from "../../../../assets/icons/duotone-red/exclamation-circle.svg";

const useStyles = makeStyles({
  root: {
    padding: "30px 20px 20px 30px",
  },
  title: {
    fontFamily: "Barlow",
    fontWeight: 500,
    fontSize: 36,
    color: "#2B2F3C",
    marginBottom: "28px"
  },
  wrapper: {
    background: "#ffffff",
    borderRadius: "6px",
    padding: "20px 0px 0px 0px",
    marginBottom: "24px"
  },
  rowWrapper: {
    padding: "30px 20px",
    borderBottom: "1px solid rgba(188, 200, 231, 0.4)",
    '&:last-child': {
      borderBottom: "0px"
    }
  },
  sectionTitle: {
    fontWeight: 600,
    fontSize: "20px",
    textAlign: "center"
  },
  totalBarHeight: {
    height: "26px"
  },
  detailBarHeight: {
    height: "10px"
  },
  success: {
    background: "#65D170",
  },
  warning: {
    background: "#FFB443",
  },
  error: {
    background: "#FF6A6A",
  },
  statusBox: {
    width: "20px",
    height: "20px",
    borderRadius: "5px",
  },
  textButton: {
    color: PrimaryHard,
    textTransform: "capitalize",
    marginBottom: "32px"
  },
});

const totalBar = {
  success: "70%",
  warning: "30%",
  error: "20%"
};

const data = [
  {
    icon: <ExchangeAlt width={22} height={22} />,
    title: "Success Rate Trx",
    detail: {
      success: "70%",
      warning: "30%",
      error: "20%"
    }
  },
  {
    icon: <Rss width={22} height={22} />,
    title: "Problem Jaringan",
    detail: {
      success: "20%",
      warning: "50%",
      error: "30%"
    }
  },
  {
    icon: <Calculator width={22} height={22} />,
    title: "Problem Hardware",
    detail: {
      success: "10%",
      warning: "40%",
      error: "50%"
    }
  },
  {
    icon: <MoneyBill width={22} height={22} />,
    title: "Problem Cash Out / Overfill",
    detail: {
      success: "10%",
      warning: "40%",
      error: "50%"
    }
  },
  {
    icon: <IdCard width={22} height={22} />,
    title: "Kartu Tertelan",
    detail: {
      success: "10%",
      warning: "40%",
      error: "50%"
    }
  },
  {
    icon: <UserHeadset width={22} height={22} />,
    title: "Komplain Nasabah",
    detail: {
      success: "10%",
      warning: "40%",
      error: "50%"
    }
  },
  {
    icon: <ListIcon width={22} height={22} />,
    title: "Selisih Rekonsiliasi",
    detail: {
      success: "10%",
      warning: "40%",
      error: "50%"
    }
  },
  {
    icon: <UsersCog width={22} height={22} />,
    title: "Jumlah Kunjungan FLM (First Maintenance)",
    detail: {
      success: "10%",
      warning: "40%",
      error: "50%"
    }
  },
  {
    icon: <UsersCog width={22} height={22} />,
    title: "Jumlah Kunjungan FLM (Replenishment)",
    detail: {
      success: "10%",
      warning: "40%",
      error: "50%"
    }
  },
  {
    icon: <UsersCog width={22} height={22} />,
    title: "Jumlah Kunjungan SLM CM",
    detail: {
      success: "10%",
      warning: "40%",
      error: "50%"
    }
  },
  {
    icon: <UsersCog width={22} height={22} />,
    title: "Jumlah Kunjungan SLM PM",
    detail: {
      success: "10%",
      warning: "40%",
      error: "50%"
    }
  },
  {
    icon: <Tools width={22} height={22} />,
    title: "Penggantian Part / Link",
    detail: {
      success: "10%",
      warning: "40%",
      error: "50%"
    }
  },
  {
    icon: <ListIcon width={22} height={22} />,
    title: "Problem Premises",
    detail: {
      success: "10%",
      warning: "40%",
      error: "50%"
    }
  },
  {
    icon: <ExclamationCircle width={22} height={22} />,
    title: "Kejadian Force Majeur",
    detail: {
      success: "10%",
      warning: "40%",
      error: "50%"
    }
  },
  {
    icon: <ExclamationCircle width={22} height={22} />,
    title: "Kejadian Vandalisme",
    detail: {
      success: "10%",
      warning: "40%",
      error: "50%"
    }
  },
  {
    icon: <IdCard width={22} height={22} />,
    title: "Klaim Asuransi",
    detail: {
      success: "10%",
      warning: "40%",
      error: "50%"
    }
  },
  {
    icon: <ListIcon width={22} height={22} />,
    title: "Log Force Majeur / Vandalism",
    detail: {
      success: "10%",
      warning: "40%",
      error: "50%"
    }
  },
];

const MedicalRecord = () => {
  const classes = useStyles();
  const history = useHistory();

  function handleBackButton() {
    history.push(`/monitoring/reliability`);
  }

  /* Functional Component */
  const RowOfProgress = ({data}) => {
    const {title, icon, detail} = data;
    return (
      <Grid container alignItems="center" className={classes.rowWrapper}>
        <Grid item xs={5}>
          <Grid container alignItems="center">
            {icon}
            <Typography style={{marginLeft: "10px", fontWeight: 500, fontSize: "15px"}}>{title}</Typography>
          </Grid>
        </Grid>
        <Grid item xs={7}>
          <Grid container style={{flexWrap: "nowrap", marginBottom: "10px"}}>
            {
              Object.keys(detail).map((type, index) => (
                <Grid container alignItems="center" style={{flexWrap: "nowrap", marginRight: "20px", width: "unset"}} >
                  <div className={`${classes.statusBox} ${classes[type]}`} />
                  <Typography
                    style={{fontWeight: 600, fontSize: "15px", marginLeft: "10px"}}>
                    Level {index+1} : {detail[type]}
                  </Typography>
                </Grid>
              ))
            }
          </Grid>
          <Grid container style={{flexWrap: "nowrap", borderRadius: "10px"}}>
            {
              Object.keys(detail).map((type, index) => {
                const rdx = () => {
                  if(!index) return "5px 0px 0px 5px";
                  if(index === 2) return "0px 5px 5px 0px";
                  return "0px";
                };
                const borderRadius = rdx();
                return (
                  <div
                    key={type}
                    className={`${classes.detailBarHeight} ${classes[type]}`}
                    style={{width: detail[type], borderRadius}}
                  />
                );
              })
            }
          </Grid>
        </Grid>
      </Grid>
    );
  };
  RowOfProgress.propTypes = {
    data: PropTypes.object.isRequired
  };

  return (
    <div className={classes.root}>
      <Button
        className={classes.textButton}
        startIcon={<ArrowBackIcon />}
        onClick={() => {
          handleBackButton();
        }}
      >
          Back
      </Button>
      <Typography className={classes.title}>Medical Record</Typography>
      <Grid container alignItems="center" className={classes.wrapper} style={{padding: "20px"}}>
        <Typography style={{fontSize: "15px", fontWeight: 500, marginRight: "20px"}}>Show: </Typography>
        <Grid item xs={3} style={{marginRight: "20px"}}>
          <Grid container alignItems="center" style={{flexWrap: "nowrap"}}>
            <Typography style={{fontSize: "13px", fontWeight: 400, marginRight: "5px", whiteSpace: "nowrap"}}>ATM ID</Typography>
            <LabelTextField disabled value="ATM-122" />
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <Grid container alignItems="center" style={{flexWrap: "nowrap"}}>
            <Typography style={{fontSize: "13px", fontWeight: 400, marginRight: "5px", whiteSpace: "nowrap"}}>Lokasi</Typography>
            <LabelTextField disabled value="Kebayoran - Jakarta" />
          </Grid>
        </Grid>
      </Grid>
      <Grid container alignItems="center" className={classes.wrapper} style={{padding: "20px"}}>
        <Grid item xs={5}>
          <Typography className={classes.sectionTitle}>Total</Typography>
        </Grid>
        <Grid item xs={7}>
          <Grid container style={{flexWrap: "nowrap", borderRadius: "10px"}}>
            {
              Object.keys(totalBar).map((type, index) => {
                const rdx = () => {
                  if(!index) return "5px 0px 0px 5px";
                  if(index === 2) return "0px 5px 5px 0px";
                  return "0px";
                };
                const borderRadius = rdx();
                return (
                  <div key={type} className={`${classes.totalBarHeight} ${classes[type]}`} style={{width: totalBar[type], borderRadius}}>
                    <Typography style={{fontSize: "15px", color: "#ffffff", textAlign: "center"}}>{totalBar[type]}</Typography>
                  </div>
                );
              })
            }
          </Grid>
        </Grid>
      </Grid>
      <div className={classes.wrapper}>
        <Grid container alignItems="center">
          <Grid item xs={4}>
            <Typography className={classes.sectionTitle}>Status</Typography>
          </Grid>
        </Grid>
        {data.map(object => (
          <RowOfProgress data={object} />
        ))}
      </div>
    </div>
  );
};

export default MedicalRecord;
