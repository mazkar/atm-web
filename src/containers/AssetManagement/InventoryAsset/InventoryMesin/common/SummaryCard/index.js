import { Box, Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import constansts from "../../../../../../helpers/constants";
import { ReactComponent as ExchangeIcon } from "../../../../../../assets/icons/duotone-red/exchange-alt.svg";
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  root: {
    borderRadius: 10,
    backgroundColor: constansts.color.white,
    width: 280,
    padding: "18px 20px",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    marginRight: 20,
  },
  topContent: {
    fontSize: 15,
    fontWeight: 600,
    marginLeft: 5,
    color: constansts.color.dark,
  },
});

const SummaryCard = (props) => {
  const classes = useStyles();
  const {data} = props
  return (
    <Box className={classes.root}>
      <Grid container justifyContent="space-between">
        <Grid
          item
          style={{ display: "flex", alignItems: "center", marginBottom: 20 }}
        >
          <ExchangeIcon />
          <Typography className={classes.topContent}>{data.name}</Typography>
        </Grid>
        <Grid item>
          <Typography className={classes.topContent}>{data.totalMesin}</Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid
          container
          justifyContent="space-between"
          style={{ marginBottom: 10 }}
        >
          <Grid item>
            <Typography
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: constansts.color.dark,
              }}
            >
              {data.name == "Total Mesin" ? "Total Ready" : "Baik"}
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              style={{ fontSize: 13, fontWeight: 500, color: "#65D170" }}
            >
              {data.ready}
            </Typography>
          </Grid>
        </Grid>
        <Grid container justifyContent="space-between">
          <Grid item>
            <Typography
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: constansts.color.dark,
              }}
            >
              {data.name == "Total Mesin" ? "Total Not Ready" : "Rusak"}
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              style={{ fontSize: 13, fontWeight: 500, color: "#FF6A6A" }}
            >
              {data.notReady}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

SummaryCard.propTypes = {
    data: PropTypes.object
}

export default SummaryCard;
