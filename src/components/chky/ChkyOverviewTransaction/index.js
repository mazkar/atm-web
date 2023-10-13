/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import { ReactComponent as IconOverview } from '../../../assets/icons/general/overview_total_transaction.svg';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    borderRadius: 10,
    border: '1px solid #BCC8E7',
    height: (props) => props.height,
    width: '100%',
  },
  lefSide: {
    textAlign: 'center',
    backgroundImage: 'linear-gradient(137.73deg, #DC241F 0%, #DC241F 100%)',
    height: (props) => props.height - 2,
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
  },
});

function ChkyOverviewTransaction(props) {
  const classes = useStyles(props);
  const { leftIcon, title, value, isRupiah } = props;
  
  return (
    <div className={classes.root}>
      <div className={classes.lefSide}>{leftIcon}</div>
      <div className={classes.righSide}>
        <Grid container direction="column">
          <Grid item>
            <Typography style={{ fontSize: 13, fontWeight: 500 }}>
              {title}
            </Typography>
          </Grid>
          <Grid item>
            <Grid container justify="space-between">
              <Grid item />
              <Grid item>
                <Typography style={{ fontSize: 17, fontWeight: 500 }}>
                  <span style={{ opacity: 0.2 }}>{isRupiah ? 'Rp.' : ''} </span>
                  {/* {numberWithCommas(value)} */}
                  {value}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

ChkyOverviewTransaction.propTypes = {
  leftIcon: PropTypes.object,
  title: PropTypes.string,
  // value: PropTypes.number,
  // eslint-disable-next-line react/no-unused-prop-types
  height: PropTypes.number,
  isRupiah: PropTypes.bool,
};
ChkyOverviewTransaction.defaultProps = {
  leftIcon: <IconOverview />,
  title: 'Title',
  value: 882384290,
  height: 70,
  isRupiah: false,
};

export default ChkyOverviewTransaction;
