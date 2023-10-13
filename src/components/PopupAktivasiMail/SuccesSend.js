import { Grid, makeStyles, Typography, Box } from "@material-ui/core";
import React from "react";
import {
  GrayHard,
  SuccessMedium,
  SuccessSoft,
  White,
} from "../../assets/theme/colors";
import { ReactComponent as IconSuccess } from "../../assets/icons/general/success_green.svg";
import { ReactComponent as IconClose } from "../../assets/icons/general/close_green.svg";
import { ChkyButtons } from "../chky";

const useStyles = makeStyles({
  container: {
    position: "absolute",
    width: 533,
    height: 56,
    backgroundColor: SuccessSoft,
    borderRadius: 8,
    modal: 1350,
    margin: "auto",
    direction: "row",
    alignItems: "center",
  },
  box: {
    height: 56,
    width: 10,
    color: SuccessMedium,
    backgroundColor: SuccessMedium,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    marginRight: 20,
  },
});
const SuccesSend = (props) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.container}>
      <Grid item>
        <Box className={classes.box}></Box>
      </Grid>
      <Grid item>
        <Grid container justify="space-between" direction="row">
          <Grid item>
            <IconSuccess style={{ marginTop: 7 }} />
          </Grid>
          <Grid item style={{ marginLeft: 15, marginRight: 255 }}>
            <Typography
              style={{ fontFamily: "Barlow", fontSize: 16, fontWeight: 600 }}
            >
              Success
            </Typography>
            <Typography
              style={{ fontFamily: "Barlow", fontSize: 13, color: GrayHard }}
            >
              Your Messege Has Been Sent
            </Typography>
          </Grid>
          <Grid item>
            <IconClose
              style={{ marginTop: 13, cursor: "pointer" }}
              onClick={() => {
                props.closeCancel();
                props.cancel();
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SuccesSend;
