import React from "react";
import { Grid, Paper, Typography, makeStyles, Button } from "@material-ui/core";
import GetAppIcon from "@material-ui/icons/GetApp";
import { PrimaryHard } from "../../../../assets/theme/colors";
import PropTypes from "prop-types";

const UseStyles = makeStyles({
  titleImage: {
    fontFamily: "Barlow",
    fontSize: 32,
    fontWeight: 600,
    marginBottom: 30,
  },
  button: {
    color: "#fff",
    backgroundColor: PrimaryHard,
    textTransform: "capitalize",
    fontFamily: "Barlow",
  },
});

function DownloadFile({ title, label, handleDownload }) {
  const classes = UseStyles();
  return (
    <div>
      <Grid container style={{ marginTop: 30 }}>
        <Grid item xs={12}>
          <Paper style={{ padding: 30 }}>
            <Typography className={classes.titleImage}>{title}</Typography>
            <Button
              variant="contained"
              className={classes.button}
              startIcon={<GetAppIcon />}
              onClick={handleDownload}
            >
              {label}
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

DownloadFile.PropTypes = {
  title: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  handleDownload: PropTypes.func,
};

export default DownloadFile;
