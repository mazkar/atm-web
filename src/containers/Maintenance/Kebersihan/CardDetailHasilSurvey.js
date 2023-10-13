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
    padding: 0,
    flex: 1,
    backgroundColor: 'white',
    borderTopRightRadius: 9,
    borderBottomRightRadius: 9,
  },
});

const index = (props) => {
  const {
    title,
    status,
    image,
    classes,
  } = props;

  return (
    <div className={classes.root}>
      <div className={classes.rightSide}>

        <Grid container direction="column">
          <Grid item>
              <img src={image} alt='hasil-survey' style={{height: '100px', width: '100%', borderTopLeftRadius: 10, borderTopRightRadius: 10}} />
          </Grid>

          <Grid item style={{marginLeft: 10, marginBottom: 7, marginTop: 15}}>
            <Typography style={{ fontSize: '15px', fontWeight: 500 }}>
                {title}
            </Typography>
          </Grid>

          <Grid item style={{marginLeft: 10, marginBottom: 15}}>
            {status === 'Kotor' ? 
                <Typography style={{
                    width: '60px',
                    height: '24px',
                    background: '#FFF6F6',
                    border: '1px solid #FF6A6A',
                    textAlign: 'Center',
                    color: '#FF6A6A',
                    fontSize: '13px',
                    borderRadius: '4px',
                    fontWeight: 500
                    }}>
                    {status}
                </Typography> :
                <Typography style={{
                    width: '60px',
                    height: '24px',
                    background: '#DEFFE1',
                    border: '1px solid #65D170',
                    textAlign: 'Center',
                    color: '#65D170',
                    fontSize: '13px',
                    borderRadius: '4px',
                    fontWeight: 500
                    }}>
                    {status}
                </Typography>
            }
            
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
