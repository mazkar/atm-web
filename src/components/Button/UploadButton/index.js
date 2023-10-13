import React from "react";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { ReactComponent as UploadIcon } from "../../../assets/icons/siab/upload-cloud.svg";
import * as Colors from "../../../assets/theme/colors";

const styles = () => ({
  root: {
    paddingTop: 12,
    paddingBottom: 12,
    fontSize: 15,
    fontFamily: "Barlow",
    backgroundColor: "#DC241F",
    textTransform: "capitalize",
    color: Colors.White,
    borderRadius: 6,
    boxShadow: '0px 6px 6px rgba(220, 36, 31, 0.1)',
  },
});

const UploadButton = (props) => {
  // eslint-disable-next-line react/prop-types
  const { label, classes, iconPosition, buttonIcon, onClick, ...other } = props;
  let button;
  if (iconPosition === "startIcon") {
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

UploadButton.propTypes = {
  label: PropTypes.string,
  iconPosition: PropTypes.string, // startIcon or endIcon
  classes: PropTypes.object.isRequired,
  buttonIcon: PropTypes.object.isRequired,
};

UploadButton.defaultProps = {
  label: "Submit",
  buttonIcon: <UploadIcon />,
  iconPosition: "startIcon",
};

export default withStyles(styles)(UploadButton);
