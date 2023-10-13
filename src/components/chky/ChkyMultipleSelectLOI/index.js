/* eslint-disable array-callback-return */
/* eslint-disable no-restricted-syntax */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
  },
}));

const RedCheckbox = withStyles({
  root: {
    color: '#DC241F',
    '&$checked': {
      color: '#DC241F',
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const dataDummy = {
  'Select 1': true,
  'Select 2': false,
  'Select 3': false,
};

export default function ChkyMultipleSelectLOI(props) {
  const classes = useStyles();
  const { dataSelect, getValue, isSelectAll, labelSelectAll, handleSelectAll, setUnrendered, isDisable } = props;
  const [state, setState] = useState(dataSelect);
  const [allSelected, setAllSelected] = useState(false);

  useEffect(() => {
    const newArray = [];
    for (const property in state) {
      if (state[property] === true) {
        // console.log("Property : ", `${property}`);
        newArray.push(property);
      }
    }
    if (getValue) {
      getValue(newArray);
    }
    // console.log("Data Multipleselect : ", state);
    if (setUnrendered) {
      setUnrendered(state);
    }
  }, [state]);

  /* useEffect(() => {
    setState(dataSelect);
  }, [dataSelect]); */

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  function mapObject(obj, fn) {
    return Object.fromEntries(
      Object
        .entries(obj)
        .map(fn)
    );
  }

  const handleChangeAll = (event) => {
    setAllSelected(event.target.checked);
    handleSelectAll(event.target.checked);
    if (event.target.checked) {
      const newObjState = mapObject(state, ([key]) => ([key, true]));
      setState(newObjState);
    } else {
      const newObjState = mapObject(state, ([key]) => ([key, false]));
      setState(newObjState);
    }
  };

  return (
    <div className={classes.root}>
      <FormControl component="fieldset">
        <FormGroup>
          {isSelectAll &&
            <FormControlLabel
              control={
                <RedCheckbox
                  checked={allSelected}
                  onChange={handleChangeAll}
                  name='All'
                />
              }
              label={labelSelectAll}
              disabled={isDisable}
            />
          }
          {Object.keys(state).map((keyName) => (
            <FormControlLabel
              control={
                <RedCheckbox
                  checked={state[keyName]}
                  onChange={handleChange}
                  name={keyName}
                />
              }
              label={keyName}
              disabled={isDisable}
            />
          ))}
        </FormGroup>
      </FormControl>
    </div>
  );
}
ChkyMultipleSelectLOI.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  dataSelect: PropTypes.object,
  getValue: PropTypes.any,
  isSelectAll: PropTypes.bool,
  labelSelectAll: PropTypes.string,
  handleSelectAll: PropTypes.func,
};
ChkyMultipleSelectLOI.defaultProps = {
  dataSelect: dataDummy,
  isSelectAll: false,
  labelSelectAll: "All Area",
  handleSelectAll: (e) => { console.log("Select all", e); },
  setUnrendered: () => { }
};