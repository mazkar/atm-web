import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Barlow from "../barlow";
import PropTypes from "prop-types";

const useStyles = makeStyles({
  font13: {
    fontSize: 13,
  },
  font15: {
    fontSize: 15,
  },
  font18: {
    fontSize: 18,
  },
  font36: {
    fontSize: 36,
  },
  font24: {
    fontSize: 24,
  },
  font12: {
    fontSize: 12,
  },
  font12: {
    fontSize: 14,
  },
});

export const Barlow13 = (props) => {
  const { font13 } = useStyles();
  return (
    <Barlow style={props.style} className={font13}>
      {props.children}
    </Barlow>
  );
};

export const Barlow15 = (props) => {
  const { font15 } = useStyles();
  return (
    <Barlow style={props.style} className={font15}>
      {props.children}
    </Barlow>
  );
};

export const Barlow18 = (props) => {
  const { font18 } = useStyles();
  return (
    <Barlow style={props.style} className={font18}>
      {props.children}
    </Barlow>
  );
};

export const Barlow36 = (props) => {
  const { font36 } = useStyles();
  return (
    <Barlow style={props.style} className={font36}>
      {props.children}
    </Barlow>
  );
};

export const Barlow24 = (props) => {
  const { font24 } = useStyles();
  return (
    <Barlow style={props.style} className={font24}>
      {props.children}
    </Barlow>
  );
};

export const Barlow12 = (props) => {
  const { font12 } = useStyles();
  return (
    <Barlow style={props.style} className={font12}>
      {props.children}
    </Barlow>
  );
};

export const Barlow14 = (props) => {
  const { font14 } = useStyles();
  return (
    <Barlow style={props.style} className={font14}>
      {props.children}
    </Barlow>
  );
};

Barlow13.propTypes = {
  style: PropTypes.object,
};

Barlow15.propTypes = {
  style: PropTypes.object,
};

Barlow18.propTypes = {
  style: PropTypes.object,
};

Barlow36.propTypes = {
  style: PropTypes.object,
};

Barlow24.propTypes = {
  style: PropTypes.object,
};

Barlow12.propTypes = {
  style: PropTypes.object,
};

Barlow14.propTypes = {
  style: PropTypes.object,
};
