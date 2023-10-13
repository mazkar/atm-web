/* eslint-disable func-names */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Tachometer from '../../../assets/images/SideMenu/tachometer.svg';
import { Typography } from '@material-ui/core';

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
    height: (props) => props.height - 2,
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

const index = (props) => {
  const {
    isShort,
    imgIcon,
    imgStyle,
    summaryOptions,
    classes,
    currency
  } = props;
  const numberWithCommas = (x) => {
    if (x === null) { return 0; }
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
  return (
    <div className={classes.root}>
      {/* <div className={classes.lefSide}>
        <img src={imgIcon} style={imgStyle} />
      </div> */}
      <div className={classes.rightSide}>
        <Grid container direction="column">
          <Grid item style={{marginLeft: '25px'}}>
              <Typography style={{ fontSize: '13px', fontWeight: 600 }}>{summaryOptions.title}</Typography>
          </Grid>
          {/* <Grid item>
            <Grid container justify="space-between">
              <Grid item />
              <Grid item>
                {isShort === false ?
                  <Typography style={{ fontSize: 30, fontWeight: 500 }}>
                    <span style={{ opacity: 0.2 }}>{currency !== undefined ? currency : "Rp."} </span>{numberWithCommas(summaryOptions.count)}
                  </Typography> : <Typography style={{ fontSize: 24, fontWeight: 500 }}>
                    <span style={{ opacity: 0.2 }}>{currency !== undefined ? currency : "Rp."} </span>{numberWithCommas(summaryOptions.count)}
                  </Typography>
                }
              </Grid>
            </Grid>
          </Grid> */}
          <Grid container direction='row' spacing={3} justify='center' style={{padding: 10}}>
              <Grid item>
                <Grid container direction='column'>
                    <Grid item>
                        <Typography style={{ fontSize: '17px', fontWeight: 500 }}>
                            2.810
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography style={{ fontSize: '10px', fontWeight: 400 }}>
                            Operator
                        </Typography>
                    </Grid>
                </Grid>
              </Grid>

              <Grid item>
                <Grid container direction='column'>
                    <Grid item>
                        <Typography style={{ fontSize: '17px', fontWeight: 500 }}>
                            2.810
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography style={{ fontSize: '10px', fontWeight: 400 }}>
                            Operator
                        </Typography>
                    </Grid>
                </Grid>
              </Grid>

              <Grid item>
                <Grid container direction='column'>
                    <Grid item>
                        <Typography style={{ fontSize: '17px', fontWeight: 500 }}>
                            2.810
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography style={{ fontSize: '10px', fontWeight: 400 }}>
                            Operator
                        </Typography>
                    </Grid>
                </Grid>
              </Grid>
          </Grid>

        </Grid>
      </div>
    </div>
  );
};

index.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  imgIcon: PropTypes.object,
};

index.defaultProps = {
  imgIcon: Tachometer,
};

export default withStyles(styles)(index);
