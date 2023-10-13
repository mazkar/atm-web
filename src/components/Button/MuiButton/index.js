import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import * as Colors from '../../../assets/theme/colors';

const styles = () => ({
  root: {
    margin: 10,
    paddingTop: 11,
    paddingBottom: 11,
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 14,
    height: (props) => props.height,
    backgroundColor: Colors.PrimaryHard,
    textTransform: 'capitalize',
    color: Colors.White,
    boxShadow: "0px 6px 6px 0px rgba(220, 36, 31, 0.1)",
    borderRadius: "8px"
  },
});

const MuiButton = (props) => {
  // eslint-disable-next-line react/prop-types
  const { label, classes, onClick, style, ...other } = props;
  return (
    <Button
      className={classes.root}
      variant="contained"
      {...other}
      onClick={onClick}
      style={style}
    >
      {label}
    </Button>
  );
};

MuiButton.propTypes = {
  label: PropTypes.string,
  height: PropTypes.number,
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
};

MuiButton.defaultProps = {
  label: 'Submit',
  height: 30,
};

export default withStyles(styles)(MuiButton);
