import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Typography } from 'antd';
import SelectWithCaptions from "../../Selects/SelectWithCaptions";
import MuiButton from '../../Button/MuiButton';

import { ReactComponent as DropDownIcon } from '../../../assets/icons/general/dropdown_red.svg';

const styles = () => ({
  root: {
    padding:2,
    display:'flex',
    flexWrap:'wrap',
    justifyContent:'space-between',
    alignItems:'center'
  },
  col: {
    display:'flex',
    flexWrap:'wrap',
  },
  title: {
    fontWeight: 'bold',
    marginRight: 2
  },
});
const index = (props) => {
  const {
    provinceSuggestions,
    districtsSuggestions,
    subdistrictsSuggestions,
    handleProvinceOnChange,
    handleDistrictsOnChange,
    handleSubDistrictsOnChange,
    onFilterSubmit,
    classes } = props;
  return (
    <div className={classes.root}>
      <Typography className={classes.title}>Showing</Typography>
      <div className={classes.col}>
        <SelectWithCaptions bordered caption='Provinsi' suggestions={provinceSuggestions} defaultValue={provinceSuggestions[0].value} handleChange={handleProvinceOnChange} width="150px" />
        <SelectWithCaptions bordered caption='Kabupaten' suggestions={districtsSuggestions} defaultValue={districtsSuggestions[0].value} handleChange={handleDistrictsOnChange} width="170px" />
        <SelectWithCaptions bordered caption='Kecamatan' suggestions={subdistrictsSuggestions} defaultValue={subdistrictsSuggestions[0].value} handleChange={handleSubDistrictsOnChange} width="170px" />
        <MuiButton style={{width: '120px', height: '40px'}} label="Apply Filter" onClick={() => onFilterSubmit} />
      </div>
    </div>
  );
};
index.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
  captionD: PropTypes.string,
};

index.defaultProps = {
  captionD: "Status",
};

export default withStyles(styles)(index);
