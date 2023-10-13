/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Paper } from '@material-ui/core';
import { Link } from "react-router-dom";
import IconOverview from '../../../../../assets/icons/general/overview_total_transaction.svg';
import Loading from '../../../../../components/Loading/LoadingView';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    borderRadius: 10,
    height: (props) => props.height,
    width: '100%',
  },
  lefSide: {
    textAlign: 'center',
    backgroundImage: 'linear-gradient(137.73deg, #F22721 0%, #DC241F 100%)',
    height: (props) => props.height - 2,
    borderTopLeftRadius: 9,
    borderBottomLeftRadius: 9,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  righSide: {
    display: 'flex',
    alignItems: 'center',
    padding: 20,
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: "0px 10px 10px 0px",
  },
});

function ChkyOverviewTransaction(props) {
  const { leftIcon, title, value, url, height, valueColor, isLoading } = props;
  const classes = useStyles({height});
  
  return (
    <Link style={{ cursor: 'pointer', color: "#2B2F3C"}} to={url} >
      <div className={classes.root}>
        <div className={classes.lefSide}>
          <img src={leftIcon} alt="icon" width={40}/>
        </div>
        <div className={classes.righSide}>
        {isLoading ?
          <Loading maxheight='100%' />
        :
          <div>
          <Grid container spacing={1} direction="column">
            <Grid item>
              <Typography style={{ fontSize: 20, fontWeight: 600 }}>
                {title}
              </Typography>
            </Grid>
            <Grid item>
              <Typography style={{ fontSize: 20, fontWeight: 600, color: valueColor }}>
                {value}
              </Typography>
            </Grid>
          </Grid>
          </div>
        }
        </div>
      </div>
    </Link>
  );
}

ChkyOverviewTransaction.propTypes = {
  leftIcon: PropTypes.object,
  title: PropTypes.string,
  value: PropTypes.string,
  url: PropTypes.string,
  height: PropTypes.number,
};
ChkyOverviewTransaction.defaultProps = {
  leftIcon: IconOverview,
  title: 'Title',
  value: null,
  height: 120,
  url: "#",
};

export default ChkyOverviewTransaction;
