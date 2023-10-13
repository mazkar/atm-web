/*
This table chips component has 6 color type
and their color are dynamically changed by "type" props.

And this table chips has default color as lightblue.

Example:
If you send props type="success", the table chips will rendered as green-ish chips.

List of color:
success -> green
error -> red
warning -> orange
info -> blue
purple -> purple
default -> lightblue

HOW TO USE:
1. First, import this component, assume we named it as "<TableChips />"
2. Make a function that held condition like this:

  function chipsHandler(type){
    if(type === "Paid"){
      return "success";
    }
    return "error";
  }

  Note: You can use if-else or switch-case for conditional

3. Then call <TableChips /> component in your table list. Example below:

  <TableChips label="Paid" type={chipsHandler("Paid")} />

*/

import React from 'react';
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/styles';
import { ButtonBase } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    border: "1px solid",
    borderRadius: "40px",
    padding: "4px 10px",
    width: "100%"
  },
  success: {
    background: "#DEFFE1",
    color: "#65D170",
    borderColor: "#65D170"
  },
  error: {
    background: "#FFF6F6",
    color: "#FF6A6A",
    borderColor: "#FF6A6A"
  },
  warning: {
    background: "#FFF9F0",
    color: "#FFB443",
    borderColor: "#FFB443"
  },
  info: {
    background: "#EBF0FF",
    color: "#749BFF",
    borderColor: "#749BFF"
  },
  purple: {
    background: "#F3E3FF",
    color: "#CB88FF",
    borderColor: "#CB88FF"
  },
  default: {
    background: "#F6FEFF",
    color: "#13BED6",
    borderColor: "#13BED6"
  },
  noClick: {
    cursor: "default"
  },
  click: {
    cursor: "pointer"
  }
});

const TableChips = (props) => {
  const {label, type, clickable, ...others} = props;
  const classes = useStyles();
  return (
    <ButtonBase
      className={`${classes.root} ${classes[type]} ${clickable ? classes.click  : classes.noClick}`}
      disableRipple={!clickable}
      {...{...others}}
    >
      {label}
    </ButtonBase>
  );
};

TableChips.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  clickable: PropTypes.bool,
};

TableChips.defaultProps = {
  type: "default",
  clickable: false
};

export default TableChips;
