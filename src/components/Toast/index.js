/* eslint-disable react/require-default-props */
/*
AVAILABLE TOAST:
  type="success"
  type="error"
*/

/* Third Party Import */
import React from 'react';
import { makeStyles } from "@material-ui/styles";
import { Grid, Typography, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/CloseOutlined";
import PropTypes from "prop-types";

/* Internal Import */
import {
  PrimaryUltrasoft,
} from "../../assets/theme/colors";
import { ReactComponent as CheckCircle } from "../../assets/icons/duotone-others/check-green.svg";
import { ReactComponent as CrossCircle } from "../../assets/icons/duotone-red/times-circle.svg";

const useStyles = makeStyles({
  root: {
    width: "100%",
    borderRadius: "8px",
    padding: "12px 26px"
  },
  title: {
    fontWeight: 600,
    fontSize: "16px",
    color: "#2B2F3C"
  },
  subtitle: {
    fontWeight: 400,
    fontSize: "13px",
    color: "#8D98B4"
  },
  success: {
    backgroundColor: "#DEFFE1",
  },
  error: {
    backgroundColor: PrimaryUltrasoft,
  }
});

const Toast = (props) => {
  const classes = useStyles();
  const {title, subtitle, type, onClose} = props;

  return (
    <div className={`${classes.root} ${type === "success" ? classes.success : classes.error}`}>
      <Grid container alignItems='center' justifyContent='space-between' style={{flexWrap: "nowrap"}}>
        <Grid container alignItems="center">
          {
            type === "success"
              ? <CheckCircle width="32px" height="32px" style={{marginRight: "15px"}} />
              : <CrossCircle width="32px" height="32px" style={{marginRight: "15px"}} />
          }
          <div>
            <Typography className={classes.title}>{title}</Typography>
            <Typography className={classes.subtitle}>{subtitle}</Typography>
          </div>
        </Grid>
        <IconButton size="small" onClick={onClose}>
          <CloseIcon fill={type === "success" ? "#DEFFE1" : "#FF6F6F"} />
        </IconButton>
      </Grid>
    </div>
  );
};

Toast.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  type: PropTypes.string,
  onClose: PropTypes.func
};

Toast.defaultProps = {
  title: "Insert Title",
  subtitle: "Insert Subtitle",
  type: "success",
  onClose: () => {}
};

export default Toast;
