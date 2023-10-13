/* eslint-disable func-names */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import Tachometer from '../../../assets/images/SideMenu/tachometer.svg';
import UnchangeIcon from '../../../assets/images/revenue-unchange.png';
import ArrowUpIcon from '../../../assets/icons/duotone-others/arrow-up-green.svg';
import ArrowDownIcon from '../../../assets/icons/duotone-red/arrow-square-down.svg';
import LoadingView from '../../Loading/LoadingView';

const styles = () => ({
  root: {
    display: 'flex',
    borderRadius: 10,
    height: (props) => props.height,
    width: '100%',
  },
  lefSide: {
    textAlign: 'center',
    backgroundImage: 'linear-gradient(137.73deg, #DC241F 0%, #DC241F 100%)',
    // height: (props) => props.height - 2,
    width: 60,
    borderTopLeftRadius: 9,
    borderBottomLeftRadius: 9,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightSide: {
    display: 'flex',
    alignItems: 'center',
    padding: 10,
    flex: 1,
    backgroundColor: 'white',
    borderTopRightRadius: 9,
    borderBottomRightRadius: 9,
  },
});

const CardDashTransaction = (props) => {
  const {
    isShort,
    imgIcon,
    imgStyle,
    summaryOptions,
    classes,
    currency,
    isLoadData,
    isWithChange,
  } = props;

  const { count, previous } = summaryOptions;

  const numberWithCommas = (x) => {
    if (x === null) {
      return 0;
    }
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const ChangeIcon = () => {
    let IconSrc;
    if (previous == null) {
      IconSrc = UnchangeIcon;
    } else if (count > previous) {
      IconSrc = ArrowUpIcon;
    } else if (count < previous) {
      IconSrc = ArrowDownIcon;
    } else {
      IconSrc = UnchangeIcon;
    }
    return <img src={IconSrc} alt='' style={{ width: 16, height: 16 }} />;
  };

  return (
    <div>
      {isLoadData ? (
        <LoadingView maxheight='100%' isTransparent />
      ) : (
        <div className={classes.root}>
          <div className={classes.lefSide}>
            <img src={imgIcon} style={imgStyle} />
          </div>
          <div className={classes.rightSide}>
            <Grid container direction='column'>
              <Grid item>
                <Typography
                  style={{ fontSize: isShort ? 15 : 18, fontWeight: 500, fontFamily: 'Barlow' }}
                >
                  {summaryOptions.title}
                </Typography>
              </Grid>
              <Grid item>
                <Grid container justify='space-between'>
                  <Grid item />
                  <Grid item>
                    <Typography
                      style={{
                        fontSize: isShort ? 24 : 30,
                        fontWeight: 500,
                        fontFamily: 'Barlow',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <div style={{ marginRight: 8 }}>
                        <span style={{ opacity: 0.2 }}>
                          {currency !== undefined ? currency : 'Rp.'}
                        </span>
                        <span>{numberWithCommas(count)}</span>
                      </div>
                      {isWithChange && <ChangeIcon />}
                    </Typography>
                  </Grid>
                </Grid>
                {isWithChange && (
                  <Grid item>
                    <Typography style={{ fontSize: 13, lineHeight: '16px', textAlign: 'right' }}>
                      {previous != null ? numberWithCommas(previous) : '-'}
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </div>
        </div>
      )}
    </div>
  );
};

CardDashTransaction.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  imgIcon: PropTypes.object,
  isLoadData: PropTypes.bool,
};

CardDashTransaction.defaultProps = {
  imgIcon: Tachometer,
  isLoadData: false,
};

export default withStyles(styles)(CardDashTransaction);
