// main
import React from 'react';
import PropTypes from 'prop-types';

// libraries
import { Button } from '@material-ui/core';
import { makeStyles, ThemeProvider, createTheme } from '@material-ui/core/styles';
// images
import approve from '../../../assets/icons/siab/approve-icon.svg';
import reject from '../../../assets/icons/siab/reject-icon.svg';

const ApprovalMuiButton = (props) => {
  
  const { type, onClick } = props;

  // main styles
  const buttonTheme = createTheme({
    palette: {
      primary: {
        main: type==='approve' ? '#65D170' : '#FF6A6A',
        dark: type==='approve' ? '#50b159' : '#d85555',
        light: type==='approve' ? '#76e281' : '#ff8181',
        contrastText: '#fff'
      }
    }
  });
  const useStyles = makeStyles({
    button: {
      fontFamily: 'Barlow, NunitoRegular',
      fontWeight: '500',
      fontSize: '15px',
      textTransform: 'capitalize',
      borderRadius: '6px',
      boxShadow: '0px 6px 6px rgba(101, 209, 112, 0.2)',
      width: '110px',
      height: '38px',
      padding: '6px 10px'
    },
    icon: {
      width: '24px',
      height: '24px',
    }
  });
  const classes = useStyles();

  return (
    <ThemeProvider theme={buttonTheme}>
      <Button
        variant="contained"
        color='primary'
        disableElevation
        className={classes.button}
        onClick={onClick}
        startIcon={<img src={type==='approve' ? approve : reject} className={classes.icon} />}
      >
        {type==='approve' ? 'Approve' : 'Reject'}
      </Button>
    </ThemeProvider>
  );
};

ApprovalMuiButton.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func
};

ApprovalMuiButton.defaultProps = {
  type: 'approve',
  onClick: null
};

export default ApprovalMuiButton;