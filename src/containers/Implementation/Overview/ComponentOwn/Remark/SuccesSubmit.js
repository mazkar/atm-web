import { Grid, makeStyles, Typography, Box } from "@material-ui/core";
import React from "react";
import {
  GrayHard,
  SuccessMedium,
  SuccessSoft,
} from "../../../../../assets/theme/colors";
import { ReactComponent as IconSuccess } from "../../../../../assets/icons/general/success_green.svg";
import { ReactComponent as IconClose } from "../../../../../assets/icons/general/close_green.svg";

const useStyles = makeStyles({
  container: {
    display: "flex",
    width: "100%",
    backgroundColor: SuccessSoft,
    borderRadius: 8,
    alignItems: "center",
    height: 60,
    position: "relative",
    marginTop: 20,
    marginBottom: 20
  },
  containerHide: {display: "none"},
  box: {
    position: "absolute",
    width: 10,
    height: 60,
    top: 0,
    color: SuccessMedium,
    backgroundColor: SuccessMedium,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
});
// eslint-disable-next-line react/prop-types
const SuccesSubmit = ({show, onClose}) => {
  const classes = useStyles();

  return (
    <div className={show? classes.container : classes.containerHide}>
      <div className={classes.box} />
      <Grid container justify="space-between" alignItems="center" style={{paddingLeft: 20, paddingRight: 20}} >
        <Grid item xs="auto">
          <IconSuccess style={{ marginTop: 7 }} />
        </Grid>
        <Grid item style={{ marginLeft: 15 }} xs>
          <Typography
            style={{ fontFamily: "Barlow", fontSize: 16, fontWeight: 600 }}
          >
              Success
          </Typography>
          <Typography
            style={{ fontFamily: "Barlow", fontSize: 13, color: GrayHard }}
          >
              Remark Successfully Added.
          </Typography>
        </Grid>
        <Grid item xs="auto">
          <IconClose
            style={{ marginTop: 13, cursor: "pointer" }}
            onClick={() => onClose()}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default SuccesSubmit;
