import { Box, Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import MuiIconLabelButton from "../../../../../components/Button/MuiIconLabelButton";
import { ReactComponent as LeftArrow } from "../../../../../assets/icons/linear-red/arrow-left.svg";
import { useHistory } from "react-router-dom";
import TabInformasi from "./TabInformasi";

const useStyles = makeStyles({
  root: {
    padding: "30px 20px 20px 30px",
  },
  title: {
    fontFamily: "Barlow",
    fontWeight: 500,
    fontSize: 36,
    color: "#2B2F3C",
  },
});

const TambahKlaimMoneyInsurance = () => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <MuiIconLabelButton
            label={"Back"}
            iconPosition="startIcon"
            buttonIcon={<LeftArrow/>}
            onClick={() => {
              history.goBack();
            }}
            style={{ background: "inherit", color: "#DC241F", padding: 0 }}
          />
        </Grid>
        <Grid item xs={12} style={{ marginTop: 20 }}>
          <Typography className={classes.title}>Tambah Klaim</Typography>
        </Grid>
      </Grid>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item>
          <TabInformasi />
        </Grid>
      </Grid>
    </div>
  );
};

export default TambahKlaimMoneyInsurance;
