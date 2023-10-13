import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Loading from './CIMBLoading';

const InfinityLoading = () => {

  const useStyles = makeStyles({
    loading: {
      position: 'fixed',
      top: '0',
      bottom: '0',
      left: '0',
      right: '0',
      zIndex: '9999',
      backgroundColor: 'rgba(0,0,0,0.5)',
      paddingBottom: '50px'
    }
  });
  const classes = useStyles();

  return (
    <div className={classes.loading}>
      <Loading height='100px' width='100px' />
    </div>
  );
};

export default InfinityLoading;