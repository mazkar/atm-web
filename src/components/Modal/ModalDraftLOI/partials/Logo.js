import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import logo from '../../../../assets/images/logo-cimb-niaga.svg';

const useStyles = makeStyles({
  logo: {
    width: 145,
    marginTop: 20,
    marginLeft: 20
  },
})

const Logo = () => {
  const classes = useStyles()
  return (
    <Grid item>
      <img src={logo} alt='logo' className={classes.logo} />
    </Grid>
  );
};

export default Logo;