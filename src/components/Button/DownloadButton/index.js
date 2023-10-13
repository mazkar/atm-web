import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { ReactComponent as DownloadIcon } from '../../../assets/icons/siab/download-cloud.svg';
import * as Colors from '../../../assets/theme/colors';

const styles = () => ({
  root: {
    paddingTop: 12,
    paddingBottom: 12,
    fontSize: 15,
    fontFamily: 'Barlow',
    backgroundColor: '#65D170',
    textTransform: 'capitalize',
    color: Colors.White,
    borderRadius: 6,
    boxShadow: "0px 6px 6px rgba(101, 209, 112, 0.2)",
  },
});

const DownloadButton = (props) => {
  // eslint-disable-next-line react/prop-types
  const { label, classes, iconPosition, buttonIcon, onClick, ...other } = props;
  let button;
  if (iconPosition === 'startIcon') {
    button = (
      <Button
        className={classes.root}
        variant="contained"
        startIcon={buttonIcon}
        onClick={onClick}
        {...other}
      >
        {label}
      </Button>
    );
  } else {
    button = (
      <Button
        className={classes.root}
        variant="contained"
        endIcon={buttonIcon}
        onClick={onClick}
        {...other}
      >
        {label}
      </Button>
    );
  }
  return <>{button}</>;
};

DownloadButton.propTypes = {
  label: PropTypes.string,
  iconPosition: PropTypes.string, // startIcon or endIcon
  classes: PropTypes.object.isRequired,
  buttonIcon: PropTypes.object.isRequired,
};

DownloadButton.defaultProps = {
  label: 'Submit',
  buttonIcon: <DownloadIcon />,
  iconPosition: 'startIcon',
};

export default withStyles(styles)(DownloadButton);
