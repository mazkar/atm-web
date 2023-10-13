import {
  Box,
  Grid,
  InputBase,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import { GrayMedium } from "../../assets/theme/colors";

const useStyles = makeStyles({
  txtBoldTable: {
    fontFamily: "Barlow",
    fontSize: 15,
    fontWeight: 600,
    textAlign: "center",
  },
  input: {
    flex: 1,
    textAlign: "center",
    alignSelf: "center",
    justifySelf: "center",
  },
});

const defaultHead = {
  style: { height: 40, paddingTop: 9 },
  border: 1,
};

const defaultBody = {
  style: { height: 40, paddingTop: 4, paddingLeft: 8 },
  border: 1,
  borderColor: GrayMedium,
};

const Table2 = (props) => {
  const classes = useStyles();
  return (
    <Grid item style={{ marginTop: 30 }}>
      <Grid container>
        <Box
          width={115}
          style={{
            borderTopLeftRadius: 10,
            height: 40,
            paddingTop: 9,
          }}
          border={1}
        >
          <Typography className={classes.txtBoldTable}>Religion</Typography>
        </Box>
        <Box width={100} {...defaultHead}>
          <Typography className={classes.txtBoldTable}>Unit</Typography>
        </Box>
        <Box width={100} {...defaultHead}>
          <Typography className={classes.txtBoldTable}>S/N</Typography>
        </Box>
        <Box width={203} {...defaultHead}>
          <Typography className={classes.txtBoldTable}>Comms</Typography>
        </Box>
        <Box
          width={139}
          style={{
            borderTopRightRadius: 10,
            height: 40,
            paddingTop: 9,
          }}
          border={1}
        >
          <Typography className={classes.txtBoldTable}>FLM</Typography>
        </Box>
      </Grid>
      <Grid container>
        <Box
          width={115}
          style={{
            borderBottomLeftRadius: 10,
            height: 40,
            paddingTop: 4,
            paddingLeft: 8,
          }}
          border={1}
          borderColor={GrayMedium}
        >
          <InputBase
            className={classes.input}
            onChange={props.onReligion}
            placeholder="Religion"
          />
        </Box>
        <Box width={100} {...defaultBody}>
          <InputBase
            className={classes.input}
            placeholder="Unit"
            onChange={props.onUnit}
          />
        </Box>
        <Box width={100} {...defaultBody}>
          <InputBase
            className={classes.input}
            placeholder="S/N"
            onChange={props.onSn}
          />
        </Box>
        <Box width={203} {...defaultBody}>
          <InputBase
            className={classes.input}
            placeholder="Comms"
            onChange={props.onComms}
          />
        </Box>
        <Box
          width={139}
          style={{
            borderBottomRightRadius: 10,
            height: 40,
            paddingTop: 4,
            paddingLeft: 8,
          }}
          border={1}
          borderColor={GrayMedium}
        >
          <InputBase
            className={classes.input}
            placeholder="FLM"
            onChange={props.onFlm}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Table2;
