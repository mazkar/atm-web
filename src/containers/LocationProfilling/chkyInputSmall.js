import React from 'react';
import PropTypes from 'prop-types';
import InputBase from '@material-ui/core/InputBase';
import { withStyles } from '@material-ui/styles';
import * as Colors from '../../assets/theme/colors';

const SmallInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
    padding: 0,
  },
  input: {
    borderRadius: 6,
    position: 'relative',
    backgroundColor: theme.palette.common.white,
    fontSize: 15,
    width: '100%',
    padding: '7px 9px',
    border: '1px solid #BCC8E7',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderColor: Colors.Dark,
    },
  },
}))(InputBase);

function ChkyInputSmall(props) {
  const { ...other } = props;
  return (
    <SmallInput {...other} type="number"/>
  );
}

ChkyInputSmall.propTypes = {

};

export default ChkyInputSmall;

