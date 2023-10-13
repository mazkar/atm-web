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

const Table1 = (props) => {
  const classes = useStyles();
  return (
    <Grid item style={{ marginTop: 25 }}>
      <Grid container>
        <Box
          width={48}
          style={{
            borderTopLeftRadius: 10,
            height: 40,
            paddingTop: 9,
          }}
          border={1}
        >
          <Typography className={classes.txtBoldTable}>No</Typography>
        </Box>
        <Box width={55} {...defaultHead}>
          <Typography className={classes.txtBoldTable}>Jam</Typography>
        </Box>
        <Box width={65} {...defaultHead}>
          <Typography className={classes.txtBoldTable}>ID Lama</Typography>
        </Box>
        <Box width={60} {...defaultHead}>
          <Typography className={classes.txtBoldTable}>Id Baru</Typography>
        </Box>
        <Box width={139} {...defaultHead}>
          <Typography className={classes.txtBoldTable}>Lokasi</Typography>
        </Box>
        <Box
          width={291}
          style={{
            borderTopRightRadius: 10,
            height: 40,
            paddingTop: 9,
          }}
          border={1}
        >
          <Typography className={classes.txtBoldTable}>Alamat</Typography>
        </Box>
      </Grid>
      <Grid container>
        <Box
          width={48}
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
            onChange={props.onNo}
            placeholder="No"
          />
        </Box>
        <Box width={55} {...defaultBody}>
          <InputBase
            className={classes.input}
            placeholder="Jam"
            onChange={props.onJam}
          />
        </Box>
        <Box width={65} {...defaultBody}>
          <InputBase
            className={classes.input}
            placeholder="ID Lama"
            onChange={props.onIdLama}
          />
        </Box>
        <Box width={60} {...defaultBody}>
          <InputBase
            className={classes.input}
            placeholder="ID Baru"
            onChange={props.onIdBaru}
          />
        </Box>
        <Box width={139} {...defaultBody}>
          <InputBase
            className={classes.input}
            placeholder="Lokasi"
            onChange={props.onLokasi}
          />
        </Box>
        <Box
          width={291}
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
            placeholder="Alamat"
            onChange={props.onAlamat}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Table1;
