/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
import React from "react";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import { ReactComponent as AngleRightIcon } from '../../../assets/images/angle-right-white.svg';
import * as Colors from '../../../assets/theme/colors';

const styles = () => ({
  root: {
    paddingTop: 12,
    paddingBottom: 12,
    fontSize: 14,
    backgroundColor: '#DC241F',
    textTransform:'capitalize',
    color: Colors.White,
    borderRadius: 10,
    fontFamily: 'Barlow',
    boxShadow: "0px, 6px rgba(220, 36, 31, 0.1)"
  }
});

const MuiButton = (props) => {
  // eslint-disable-next-line react/prop-types
  const { label, classes, iconPosition, buttonIcon, onClick, ...other } = props;
  let button;
  if (iconPosition==="endIcon") {
    button = <Button className={classes.root} variant="contained" endIcon={buttonIcon} onClick={onClick} disableElevation {...other}>{label}</Button>;
  } else {
    button = <Button className={classes.root} variant="contained" startIcon={buttonIcon} onClick={onClick} disableElevation {...other}>{label}</Button>;
  }
  return (
    <>
      {button}
    </>
  ) ;
};

MuiButton.propTypes = {
  label: PropTypes.string,
  iconPosition: PropTypes.string, // startIcon or endIcon
  classes: PropTypes.object.isRequired,
  buttonIcon: PropTypes.object.isRequired,
};

MuiButton.defaultProps  = {
  label: "Submit",
  // eslint-disable-next-line react/default-props-match-prop-types
  buttonIcon: <AngleRightIcon/>,
  iconPosition: "endIcon",
};

export default withStyles(styles)(MuiButton);

// How to use...?
// A==> import MuiIconLabelButton
// import MuiIconLabelButton from '../../components/Button/MuiIconLabelButton';

// B==> import icon
// import { ReactComponent as AngleLeftIcon } from '../../assets/images/angle-left.svg';

// C==> set component
// <MuiIconLabelButton label="Tombol" iconPosition="startIcon" buttonIcon={<AngleLeftIcon/>}/>
