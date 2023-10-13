/* Third Party Import */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Grid, FormControl } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

/* Internal Import */
import LabelTextField from "../../../../../components/Form/LabelTextField";
import { PrimaryHard } from "../../../../../assets/theme/colors";

const useStyles = makeStyles({
  prependLabel: {
    display: "flex",
    alignItems: "center",
    padding: "0px 12px",
    color: PrimaryHard,
    border: "1px solid #DC241F",
    borderRadius: "6px 0px 0px 6px",
    height: "100%",
  },
});

const PrependTextField = ({ prependLabel, textValue, handleInputText }) => {
  const classes = useStyles();
  return (
    <Grid container style={{ flexWrap: "nowrap" }}>
      <Grid item xs={3}>
        <div className={classes.prependLabel}>{prependLabel}</div>
      </Grid>
      <Grid item xs={9}>
        <LabelTextField
          placeholder="Masukkan Parameter"
          value={textValue}
          onChange={handleInputText}
          height="41px"
          style={{ borderLeft: "0px", borderRadius: "0px 6px 6px 0px" }}
        />
      </Grid>
    </Grid>
  );
};

PrependTextField.propTypes = {
  prependLabel: PropTypes.string,
  textValue: PropTypes.string.isRequired,
  handleInputText: PropTypes.func.isRequired,
};
PrependTextField.defaultValue = {
  prependLabel: "Default",
};

export default PrependTextField;
