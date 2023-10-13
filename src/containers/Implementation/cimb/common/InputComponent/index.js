import React from 'react';
import PropTypes from 'prop-types';
import InputBase from '@material-ui/core/InputBase';
import { withStyles } from '@material-ui/styles';
import * as Colors from '../../../../../assets/theme/colors';

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
    backgroundColor: (props) => props.backgroundColor, //theme.palette.common.white,
    fontSize: 15,
    width: '100%',
    height: '100%',
    padding: '7px 9px',
    border: '1px solid #BCC8E7',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderColor: Colors.PrimaryHard,
    },
    "&:disabled": {
      cursor: "not-allowed",
      border: '1px solid #F4F7FB',
      backgroundColor: "#FFFF",
      color: "#2B2F3C"
    }
  },
}))(InputBase);

function InputBorderedAll(props) {
  const { ...other } = props;
  return (
    <SmallInput {...other}/>
  );
}

InputBorderedAll.propTypes = {

};

export default InputBorderedAll;

export const AdvancedSmallInput = ({stateVar, stateModifier, ...rest}) => {
  return <InputBorderedAll value={stateVar} onChange={e=>stateModifier(e.target.value)} {...rest} />
}