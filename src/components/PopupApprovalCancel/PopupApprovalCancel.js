import { Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { White } from "../../assets/theme/colors";
import { ChkyButtons } from "../chky";

const useStyles = makeStyles({
  container: {
    position: "absolute",
    width: 365,
    height: 160,
    backgroundColor: White,
    padding: 40,
    borderRadius: 10,
    modal: 1350,
    margin: "auto",
    direction: "column",
  },
});
const PopupApprovalCancel = (props) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.container}>
      <Typography
        style={{ fontSize: 15, fontWeight: 500, fontFamily: "Barlow" }}
      >
        Are you sure want to discard this message ?
      </Typography>
      <Grid
        container
        style={{ marginTop: 14, justifyContent: "space-between" }}
      >
        <ChkyButtons
          height={38}
          btnType="redOutlined"
          buttonType="redOutlined"
          onClick={() => {
            props.closeCancel();
            props.cancel();
          }}
          style={{textTransform: "capitalize"}}
        >
          Dicard
        </ChkyButtons>
        <ChkyButtons
          onClick={() => {
            props.closeCancel();
          }}
          style={{textTransform: "capitalize"}}
        >
          No
        </ChkyButtons>
      </Grid>
    </Grid>
  );
};

export default PopupApprovalCancel;
