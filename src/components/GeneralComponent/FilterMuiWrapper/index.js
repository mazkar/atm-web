/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import SelectWithCaptions from "../../Selects/SelectWithCaptions";
import MuiButton from '../../Button/MuiButton';

const styles = () => ({
  root: {
    padding:2,
    display:'flex', 
    flexWrap:'wrap', 
    justifyContent:'space-between'
  },
  col: {
    display:'flex', 
    flexWrap:'wrap', 
  },
});
const index = (props) => {
  const { viewingSuggestions, sortingSuggestions, handleViewByOnChange, handleSortByOnChange, handleStartDateOnChange, handleEndDateOnChange, onFilterSubmit, classes } = props;
  return (
    <div className={classes.root}>
      <div className={classes.col}>
        <SelectWithCaptions bordered caption='View By' suggestions={viewingSuggestions} defaultValue={viewingSuggestions[0].value} handleChange={handleViewByOnChange} width="150px" />
        <SelectWithCaptions bordered caption='Sort By' suggestions={sortingSuggestions} defaultValue={sortingSuggestions[0].value} handleChange={handleSortByOnChange} width="150px" />
      </div>
      <div className={classes.col}>
        <SelectWithCaptions caption='Start Date' width="125px" isDatePicker defaultValue='11/09/2001' handleChange={handleStartDateOnChange} />
        <SelectWithCaptions caption='End Date' width="125px" isDatePicker defaultValue='11/09/2001' handleChange={handleEndDateOnChange} />
        <MuiButton label="Apply" onClick={() => onFilterSubmit} />
      </div>
    </div>
  );
};
index.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(index);
