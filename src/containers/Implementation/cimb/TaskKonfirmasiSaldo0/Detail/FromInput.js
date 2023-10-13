import { Box, Grid, makeStyles, Paper } from "@material-ui/core";
import React, { useState } from "react";
import { Typography } from "antd";
import { ReactComponent as IconKonfirmasiSaldo0 } from "../../../../../assets/icons/task/konfirmasiSaldo0Red.svg";
import { ReactComponent as IconPaperclip } from "../../../../../assets/icons/linear-red/paperclip.svg";
import {
  GrayHard,
  GrayMedium,
  GrayUltrasoft,
  PrimaryHard,
  White,
} from "../../../../../assets/theme/colors";
import ValueDetailTask from "../../../../../components/ValueDetailTask";
import ViewImage from "../../common/ViewImage";

const useStyles = makeStyles({
  input: {
    width: "100%",
    minHeight: "632px",
    height: "100%",
    borderRadius: 10,
    boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
  },
  title: {
    fontFamily: "Barlow",
    fontSize: 13,
    fontWeight: 600,
    paddingLeft: 12,
  },
  title2: {
    fontFamily: "Barlow",
    fontSize: 13,
    fontWeight: 600,
    marginBottom: 8,
  },
  vndrAtch: {
    fontFamily: "Barlow",
    fontSize: 13,
    fontWeight: 600,
    marginLeft: 8,
  },
  txtBoldRed: {
    fontFamily: "Barlow",
    fontSize: 20,
    fontWeight: 600,
    color: PrimaryHard,
    marginLeft: 10,
  },
  txtGray: {
    fontFamily: "Barlow",
    fontSize: 13,
    fontWeight: 600,
    color: GrayHard,
    marginLeft: 8,
  },
  item: {
    marginTop: 20,
  },
  item2: {
    marginTop: 20,
    direction: "row",
    justifyContent: "space-between",
  },
  label: {
    fontFamily: "Barlow",
    fontSize: 13,
    fontWeight: 600,
    color: GrayHard,
    marginBottom: 10,
  },
  col2: {
    direction: "column",
  },
  value2: {
    border: 1,
    borderColor: GrayHard,
    alignItems: "center",
    width: 250,
    height: 40,
    color: White,
  },
  txtValue: {
    fontFamily: "Barlow",
    fontSize: 13,
    margin: 10,
  },
});

const FromInput = (props) => {
  const { data } = props;
  const classes = useStyles();

  return (
    <Paper className={classes.input}>
      <div style={{ padding: 30 }}>
        <Grid container direction="column">
          <Grid container direction="row" alignItems="center">
            <IconKonfirmasiSaldo0 />
            <Typography className={classes.txtBoldRed}>
                KonfirmasiSaldo0
            </Typography>
          </Grid>
          <Grid item className={classes.item}>
            <Box
              style={{ width: "100%", padding: "13px 0" }}
              borderColor={GrayMedium}
              border={1}
              borderRadius={10}
            >
              <Typography className={classes.title}>{data.title}</Typography>
            </Box>
          </Grid>
          <Grid item className={classes.item}>
            <Box
              style={{ width: "100%", padding: "10px 0" }}
              borderColor={GrayMedium}
              border={1}
              borderRadius={10}
            >
              <Typography
                style={{
                  fontFamily: "Barlow",
                  fontSize: 13,
                  fontWeight: 400,
                  paddingLeft: 12,
                }}
              >
                {data.note}
              </Typography>
            </Box>
          </Grid>
          <Grid container className={classes.item2}>
            <Grid item xs={5}>
              <ValueDetailTask label="Tanggal Check" value={data.tanggal} />
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Paper>
  );
};

export default FromInput;
