import React from "react";
import { Grid, Paper, Typography, makeStyles } from "@material-ui/core";
import PropTypes from "prop-types";

const UseStyles = makeStyles({
  titleImage: {
    fontFamily: "Barlow",
    fontSize: 32,
    fontWeight: 600,
    marginBottom: 30,
  },
  image: {
    width: "100%",
    height: "auto",
  },
});

function ViewImage(props) {
  const { title, urlFile } = props;
  const classes = UseStyles();
  return (
    <div>
      <Grid container style={{ marginTop: 30 }}>
        <Grid item xs={12}>
          <Paper style={{ padding: 30 }}>
            <Typography className={classes.titleImage}>{title}</Typography>
            <img className={classes.image} src={urlFile} alt={title} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

ViewImage.PropTypes = {
  title: PropTypes.string.isRequired,
  urlFile: PropTypes.string.isRequired,
};

export default ViewImage;
