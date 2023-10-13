/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
import React from "react";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import { ReactComponent as UploadMedicalIcon } from '../../../assets/icons/general/upload_medical_icon.svg';
import * as Colors from '../../../assets/theme/colors';

const styles = () => ({
  root: {
    paddingTop: 12,
    paddingBottom: 12,
    fontSize: 14,
    backgroundColor: '#65D170',
    textTransform:'capitalize',
    color: Colors.White,
    borderRadius: 10,
  },
});

const ChkyUploadMedicalButton = (props) => {
  // eslint-disable-next-line react/prop-types
  const { label, classes, iconPosition, buttonIcon, onClick, ...other } = props;
  let button;
  if (iconPosition==="startIcon") {
    button = <Button className={classes.root} variant="contained" startIcon={buttonIcon} onClick={onClick} {...other}>{label}</Button>;
  } else {
    button = <Button className={classes.root} variant="contained" endIcon={buttonIcon} onClick={onClick} {...other}>{label}</Button>;
  }
  return (
    <>
      {button}
    </>
  ) ;
};

ChkyUploadMedicalButton.propTypes = {
  label: PropTypes.string,
  iconPosition: PropTypes.string, // startIcon or endIcon
  classes: PropTypes.object.isRequired,
  buttonIcon: PropTypes.object.isRequired,
};

ChkyUploadMedicalButton.defaultProps  = {
  label: "Submit",
  // eslint-disable-next-line react/default-props-match-prop-types
  buttonIcon: <UploadMedicalIcon/>,
  iconPosition: "startIcon",
};

export default withStyles(styles)(ChkyUploadMedicalButton);