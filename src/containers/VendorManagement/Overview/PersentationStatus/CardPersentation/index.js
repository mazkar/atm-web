import React from 'react';
import { PropTypes } from 'prop-types';
import {makeStyles} from "@material-ui/styles";
import {Grid, Typography} from "@material-ui/core";

const UseStyles = makeStyles({
  root: {
    display: "flex",
    borderRadius: 10,
    width: "100%",
  },
  leftSide: {
    textAlign: "center",
    backgroundImage: "linear-gradient(137.73deg, white 0%, white 100%)",
    width: 60,
    borderTopLeftRadius: 9,
    borderBottomLeftRadius: 9,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  rightSide: {
    display: "flex",
    alignItems: "center",
    padding: 10,
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: "0px 10px 10px 0px",
  },
});

function CardPersentation(props) {
    const classes = UseStyles(props)
    const {leftIcon, title,value}=props
  return (
    <div className={classes.root}>
      <div className={classes.leftSide}>{leftIcon}</div>
      <div className={classes.rightSide}>
        <Grid container direction="column">
          <Grid item>
            <Typography
              style={{
                fontSize: 17,
                fontWeight: 600,
                marginBottom: 10,
              }}
            >
              {title}
            </Typography>
            <Typography
              style={{
                fontSize: 18,
                fontWeight: 600,
                marginBottom: 10,
                color: "#DC241F",
              }}
            >
              {value}
            </Typography>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default CardPersentation