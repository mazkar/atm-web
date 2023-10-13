import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core";
import * as Colors from "../../../../../../assets/theme/colors";
import { withRouter, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { ReactComponent as SearchIcon } from "../../../../../../assets/icons/linear-red/search.svg";

const useStyles = makeStyles({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: (width) => width,
    borderRadius: "0px 6px 6px 0px",
    border: "1px solid #A8B6DB",
    backgroundColor: Colors.White,
    boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
    height: 40,
  },
  input: {
    marginLeft: 8,
    flex: 1,
    color: Colors.Dark,
    fontSize: 13,
    "& ::placeholder": {
      color: "#BCC8E7",
      opacity: 1,
      fontStyle: "italic",
    },
  },
  iconButton: {
    padding: 5,
    color: Colors.GrayMedium,
  },
  divider: {
    height: 28,
    margin: 4,
  },
});

function SearchBarResult(props) {
  const { placeholder, width, onChange, value, onSubmit } = props;
  const classes = useStyles(width);

  return (
    <Paper component="form" className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        inputProps={{ "aria-label": "search" }}
        onKeyPress={(event) => {
          if (event.key === 'Enter'){
            event.preventDefault();
            onSubmit();     
          }
        }}
      />
      <IconButton
        type="submit"
        onClick={(event)=>{
          event.preventDefault();
          onSubmit();
        }} 
        className={classes.iconButton}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
SearchBarResult.propTypes = {
  onKeywordChange: PropTypes.func,
  placeholder: PropTypes.string,
  width: PropTypes.number,
};
SearchBarResult.defaultProps = {
  onKeywordChange: () => console.log("====> Keyword changed"),
  placeholder: "search",
  width: 400,
};
function mapStateToProps() {
  return {};
}
export default withRouter(
  connect(mapStateToProps)(withTranslation("translations")(SearchBarResult))
);
