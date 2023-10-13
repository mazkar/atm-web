import { Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import constansts from "../../../../helpers/constants";
import PropTypes from "prop-types";

const useStyles = makeStyles({
  root: {
    borderRadius: 10,
    backgroundColor: constansts.color.white,
    border: `1px solid ${constansts.color.grayMedium}`,
    height: "100%",
    padding: "20px 12px 15px 12px",
  },
});

const UptimeDowntimeTable = (props) => {
  const { tableData } = props;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container justifyContent="start">
        <Grid item xs={1}></Grid>
        <Grid item xs={2}>
          <Typography style={{ fontSize: "15px", fontWeight: 600 }}>
            ATM ID
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography style={{ fontSize: "15px", fontWeight: 600 }}>
            Location
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography
            style={{
              fontSize: "15px",
              fontWeight: 600,
            }}
          >
            Problem
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography
            style={{
              fontSize: "15px",
              fontWeight: 600,
            }}
          >
            Frequency
          </Typography>
        </Grid>
      </Grid>
      <div style={{ overflowY: "scroll", height: "200px" }}>
        {tableData.map((item, index) => (
          <Grid
            container
            justifyContent="start"
            style={{
              borderBottom: "1px solid rgba(188, 200, 231, 0.4)",
              padding: "10px 0",
            }}
          >
            <Grid item xs={1}>
              <Typography
                style={{
                  fontWeight: 600,
                  color: constansts.color.primaryHard,
                  fontSize: 15,
                }}
              >
                {index + 1 === 1 && "1st"}
                {index + 1 === 2 && "2nd"}
                {index + 1 === 3 && "3rd"}
                {index + 1 >= 4 && index + 1 + "th"}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography
                style={{
                  fontWeight: 400,
                  color: constansts.color.dark,
                  fontSize: 15,
                }}
              >
                {item.atmId}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography
                style={{
                  fontWeight: 400,
                  color: constansts.color.dark,
                  fontSize: 15,
                }}
              >
                {item.location.slice(0, 15)}...
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                style={{
                  fontWeight: 400,
                  color: constansts.color.dark,
                  fontSize: 13,
                }}
              >
                {item.problem}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography
                style={{
                  fontWeight: 600,
                  color: constansts.color.dark,
                  fontSize: 15,
                }}
              >
                {item.frequency}
              </Typography>
            </Grid>
          </Grid>
        ))}
      </div>
    </div>
  );
};

UptimeDowntimeTable.propTypes = {
  tableData: PropTypes.array,
};

UptimeDowntimeTable.defaultProps = {
  tableData: [
    {
      atmId: 20129,
      location: "CIMBN.Indomaret.Meruya",
      problem: "Casette 3 Not Configured",
      frequency: 4102,
    },
    {
      atmId: 20129,
      location: "CIMBN.Indomaret.Meruya",
      problem: "Casette 3 Not Configured",
      frequency: 4102,
    },
    {
      atmId: 20129,
      location: "CIMBN.Indomaret.Meruya",
      problem: "Casette 3 Not Configured",
      frequency: 4102,
    },
    {
      atmId: 20129,
      location: "CIMBN.Indomaret.Meruya",
      problem: "Casette 3 Not Configured",
      frequency: 4102,
    },
    {
      atmId: 20129,
      location: "CIMBN.Indomaret.Meruya",
      problem: "Casette 3 Not Configured",
      frequency: 4102,
    },
    {
      atmId: 20129,
      location: "CIMBN.Indomaret.Meruya",
      problem: "Casette 3 Not Configured",
      frequency: 4102,
    },
    {
      atmId: 20129,
      location: "CIMBN.Indomaret.Meruya",
      problem: "Casette 3 Not Configured",
      frequency: 4102,
    },
    {
      atmId: 20129,
      location: "CIMBN.Indomaret.Meruya",
      problem: "Casette 3 Not Configured",
      frequency: 4102,
    },
    {
      atmId: 20129,
      location: "CIMBN.Indomaret.Meruya",
      problem: "Casette 3 Not Configured",
      frequency: 4102,
    },
    {
      atmId: 20129,
      location: "CIMBN.Indomaret.Meruya",
      problem: "Casette 3 Not Configured",
      frequency: 4102,
    },
  ],
};

export default UptimeDowntimeTable;
