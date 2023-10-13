import React from "react";
import { withStyles } from "@material-ui/styles";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import constansts from "../../../helpers/constants";
import PropTypes from "prop-types";

const CheckBox = withStyles({
  root: {
    color: constansts.color.primaryHard,
    "&$checked": {
      color: constansts.color.primaryHard,
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const RedCheckbox = (props) => {
  return (
    <FormControlLabel
      control={
        <CheckBox
          checked={props.inputState}
          onChange={props.onChange}
          name={props.name}
        />
      }
      label={props.label}
    />
  );
};

RedCheckbox.propTypes = {
  inputState: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string,
  label: PropTypes.string,
};

export default RedCheckbox;
