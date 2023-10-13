/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import { ReactComponent as IconOverview } from '../../../../../assets/icons/general/overview_total_transaction.svg';
import { thousandFormat } from '../../../../../helpers/useFormatter';
import * as ThemeColor from "../../../../../assets/theme/colors";

const useStyles = makeStyles({
  root: {
    display: 'flex',
    borderRadius: 10,
    border: '1px solid #BCC8E7',
    width: '100%',
  },
  lefSide: {
    textAlign: 'center',
    backgroundImage: 'linear-gradient(137.73deg, #DC241F 0%, #DC241F 100%)',
    width: 60,
    borderTopLeftRadius: 9,
    borderBottomLeftRadius: 9,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  righSide: {
    display: 'flex',
    alignItems: 'center',
    padding: 10,
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: "0px 10px 10px 0px",
  },
});

function CardItem(props) {
  const classes = useStyles(props);
  const { leftIcon, title, valueDone, valueUndone, isRupiah } = props;
  
  return (
    <div className={classes.root}>
      <div className={classes.lefSide}>{leftIcon}</div>
      <div className={classes.righSide}>
        <Grid container direction="column">
          <Grid item>
            <Typography style={{ fontSize: 18, fontWeight: 600, marginBottom: 10 }}>
              {title}
            </Typography>
          </Grid>
          <Grid item>
            <Grid container justify="space-between">
              <Grid item >
                <Typography style={{ fontSize: 14, fontWeight: 400 }}>Task Done</Typography>
              </Grid>
              <Grid item>
                <Typography style={{ fontSize: 14, fontWeight: 600, color: ThemeColor.SuccessMedium }}>
                  <span style={{ opacity: 0.2 }}>{isRupiah ? 'Rp.' : ''} </span>
                  {thousandFormat(valueDone)}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container justify="space-between">
              <Grid item >
                <Typography style={{ fontSize: 14, fontWeight: 400 }}>Task Undone</Typography>
              </Grid>
              <Grid item>
                <Typography style={{ fontSize: 14, fontWeight: 600, color: ThemeColor.WarningMedium }}>
                  <span style={{ opacity: 0.2 }}>{isRupiah ? 'Rp.' : ''} </span>
                  {thousandFormat(valueUndone)}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

CardItem.propTypes = {
  leftIcon: PropTypes.object,
  title: PropTypes.string,
  valueDone: PropTypes.number,
  valueUndone: PropTypes.number,
  isRupiah: PropTypes.bool,
};
CardItem.defaultProps = {
  leftIcon: <IconOverview />,
  title: 'Title',
  valueDone: 3456,
  valueUndone: 3456,
  isRupiah: false,
};

export default CardItem;
