/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import { ReactComponent as AngleRightIcon } from '../../../assets/images/angle-right-white.svg';
import * as Colors from '../../../assets/theme/colors';

const styles = () => ({
  root: {
    margin: 5,
    padding: 8,
    width: 40,
    height: 40,
    backgroundColor: Colors.SecondaryMedium,
    color: Colors.White,
  }
});

const MuiButton = (props) => {
  // eslint-disable-next-line react/prop-types
  const { classes, buttonIcon, onClick, ...other } = props;
  return (
    <>
      <IconButton className={classes.root} {...other} onClick={onClick}>
        {buttonIcon}
      </IconButton>
    </>
  );
};

MuiButton.propTypes = {
  classes: PropTypes.object.isRequired,
  buttonIcon: PropTypes.object.isRequired,
};

MuiButton.defaultProps = {
  // eslint-disable-next-line react/default-props-match-prop-types
  buttonIcon: <AngleRightIcon />,
};

export default withStyles(styles)(MuiButton);

// How to use...?
// A==> import MuiIconButton
// import MuiIconButton from '../../components/Button/MuiIconButton';

// B==> import icon 
// import { ReactComponent as AngleLeftIcon } from '../../assets/images/angle-left.svg';

// C==> set component
// <MuiIconButton buttonIcon={<AngleLeftIcon/>}/>