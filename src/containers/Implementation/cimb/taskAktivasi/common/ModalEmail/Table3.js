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

const Table3 = (props) => {
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
          <Typography className={classes.txtBoldTable}>PIC Comms</Typography>
        </Box>
        <Box width={100} {...defaultHead}>
          <Typography className={classes.txtBoldTable}>PIC SLM</Typography>
        </Box>
        <Box
          width={160}
          style={{
            borderTopRightRadius: 10,
            height: 40,
            paddingTop: 9,
          }}
          border={1}
        >
          <Typography className={classes.txtBoldTable}>
            PIC FLM/Cabang
          </Typography>
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
            value={value?.picComm}
            onChange={(e)=>onChange("picComms", e.target.value)}
            placeholder="PIC Comms"
          />
        </Box>
        <Box width={100} {...defaultBody}>
          <InputBase
            className={classes.input}
            placeholder="PIC SLM"
            value={value?.slmPic}
            onChange={(e)=>onChange("picSlm", e.target.value)}
          />
        </Box>
        <Box
          width={160}
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
            placeholder="PIC FLM/Cabang"
            value={value?.flmPic}
            onChange={(e)=>onChange("picFlmCabang", e.target.value)}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Table3;
