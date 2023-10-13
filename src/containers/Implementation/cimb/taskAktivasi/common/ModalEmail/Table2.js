import {
  Box,
  Grid,
  InputBase,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import { GrayMedium } from "../../../../../../assets/theme/colors";

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
  const {onChange, value} = props;
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
          <Typography className={classes.txtBoldTable}>Region</Typography>
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
            value={value?.region}
            onChange={(e)=>onChange("religion", e.target.value)}
            placeholder="Region"
          />
        </Box>
        <Box width={100} {...defaultBody}>
          <InputBase
            className={classes.input}
            placeholder="Unit"
            value={value?.unit}
            onChange={(e)=>onChange("unit", e.target.value)}
          />
        </Box>
        <Box width={100} {...defaultBody}>
          <InputBase
            className={classes.input}
            placeholder="S/N"
            value={value?.serialNumber}
            onChange={(e)=>onChange("sn", e.target.value)}
          />
        </Box>
        <Box width={203} {...defaultBody}>
          <InputBase
            className={classes.input}
            placeholder="Comms"
            value={value?.comms}
            onChange={(e)=>onChange("comms", e.target.value)}
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
            value={value?.flmVendor}
            onChange={(e)=>onChange("flm", e.target.value)}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Table2;
