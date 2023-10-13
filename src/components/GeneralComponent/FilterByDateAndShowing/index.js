import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Typography } from 'antd';
import SelectWithCaptions from '../../Selects/SelectWithCaptions';
import MuiButton from '../../Button/MuiButton';

const styles = () => ({
  root: {
    padding: 2,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  col: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 'auto',
  },
  title: {
    fontWeight: 'bold',
    marginRight: 30,
  },
});
const index = (props) => {
  const {
    dateSuggestions,
    showingSuggestions,
    handleDateOnChange,
    handleShowingOnChange,
    onFilterSubmit,
    captionD,
    classes,
  } = props;
  return (
    <div className={classes.root}>
      <Typography className={classes.title}>Filter</Typography>
      <div className={classes.col}>
        <SelectWithCaptions
          bordered
          caption="Sort by"
          suggestions={dateSuggestions}
          defaultValue={dateSuggestions[0].value}
          handleChange={handleDateOnChange}
          width="auto"
        />
        <SelectWithCaptions
          bordered
          caption="Showing"
          suggestions={showingSuggestions}
          defaultValue={showingSuggestions[0].value}
          handleChange={handleShowingOnChange}
          width="auto"
        />
      </div>
      <MuiButton label="Apply" onClick={() => onFilterSubmit} />
    </div>
  );
};
index.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
  captionD: PropTypes.string,
};

index.defaultProps = {
  captionD: 'Status',
};

export default withStyles(styles)(index);
