import { Box, Grid, makeStyles, Paper } from "@material-ui/core";
import React, { useState } from "react";
import { ReactComponent as IconParameter } from "../../../../../assets/icons/task/parameterRed.svg";
import { ReactComponent as IconPaperclip } from "../../../../../assets/icons/linear-red/paperclip.svg";
import { Typography } from "antd";
import {
  GrayHard,
  GrayUltrasoft,
  PrimaryHard,
  White,
} from "../../../../../assets/theme/colors";
import ValueDetailTask from "../../../../../components/ValueDetailTask";
import PropTypes from "prop-types";
import moment from "moment";
import MinioDocComponent from "../../../../../components/MinioDocComponent";
const useStyles = makeStyles({
  input: {
    width: "100%",
    minHeight: "632px",
    height: "100%",
    borderRadius: 10,
    boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
  },
  noData: {
    color: "#BCC8E7",
    fontStyle: "italic",
    fontSize: 13,
    marginTop: 10,
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
  txtRed: {
    fontFamily: "Barlow",
    fontSize: 13,
    fontWeight: 600,
    color: PrimaryHard,
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
  const classes = useStyles();
  const { data } = props;
  const cimbAtch = [
    {
      id: 1,
      title: "Surat Penyataan.pdf",
      url:
        "https://assets.website-files.com/5f2d75adf06cf15c6bcc482e/5f2d75adf06cf1c681cc495e_dummy.pdf",
    },
    {
      id: 2,
      title: "Attachement1.pdf",
      url:
        "https://assets.website-files.com/5f2d75adf06cf15c6bcc482e/5f2d75adf06cf1c681cc495e_dummy.pdf",
    },
  ];

  return (
    <Grid item xs={7} className={classes.input}>
      <Paper className={classes.input}>
        <div style={{ padding: 30 }}>
          <Grid container direction="column">
            <Grid container direction="row" alignItems="center">
              <IconParameter />
              <Typography className={classes.txtBoldRed}>Parameter</Typography>
            </Grid>
            <Grid item className={classes.item}>
              <Box
                style={{ width: "100%", padding: "13px 0" }}
                borderColor={GrayUltrasoft}
                border={1}
                borderRadius={10}
              >
                <Typography className={classes.title}>
                  {data.taskTitle}
                </Typography>
              </Box>
            </Grid>
            <Grid item className={classes.item}>
              <Box
                style={{ width: "100%", padding: "10px 0" }}
                borderColor={GrayUltrasoft}
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
                  {data.notesDescription}
                </Typography>
              </Box>
            </Grid>
            <Grid container className={classes.item2}>
              <Grid item xs={5}>
                <ValueDetailTask label="Due Date" value={data.dueDate} />
              </Grid>
              <Grid item xs={5}>
                <ValueDetailTask label="PIC/Vendor" value={data.picVendorId} />
              </Grid>
            </Grid>
            <Grid container className={classes.item2}>
              <Grid item xs={5}>
                <ValueDetailTask label="Type Mesin" value={data.machineType} />
              </Grid>
              <Grid item xs={5}>
                <ValueDetailTask
                  label="Request Type"
                  value={data.requestType}
                />
              </Grid>
            </Grid>
            <Grid container className={classes.item2}>
              <Grid item xs={5}>
                <ValueDetailTask label="Denom" value={data.denom} />
              </Grid>
              <Grid item xs={5}>
                <ValueDetailTask label="Branch Code" value={data.codeGfms} />
              </Grid>
            </Grid>
            <Grid container className={classes.item2}>
              <Grid item xs={5}>
                <ValueDetailTask label="ATM ID Baru" value={data.newAtmId} />
              </Grid>
              <Grid item xs={5}>
                <ValueDetailTask
                  label="Mesin Baru"
                  value={data.newMachineType}
                />
              </Grid>
            </Grid>
            <Grid container className={classes.item2}>
              <Grid item xs={5}>
                <div>
                  <Grid container direction="column">
                    <Typography className={classes.label}>Promises</Typography>
                    <Grid container>
                      <Box
                        border={1}
                        borderColor={GrayUltrasoft}
                        width="30%"
                        height={40}
                        color={White}
                        style={{
                          borderTopLeftRadius: 8,
                          borderBottomLeftRadius: 8,
                        }}
                      >
                        <Typography className={classes.txtValue}>
                          {data.locationMode}
                        </Typography>
                      </Box>
                      <Box
                        border={1}
                        borderColor={GrayUltrasoft}
                        width="70%"
                        height={40}
                        color={White}
                        style={{
                          borderTopRightRadius: 8,
                          borderRightLeftRadius: 8,
                        }}
                      >
                        <Typography className={classes.txtValue}>
                          {data.modelTeam}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </div>
              </Grid>
              <Grid item xs={5}>
                <ValueDetailTask label="Lokasi Baru" value={data.lokasiBaru} />
              </Grid>
            </Grid>
            <Grid container className={classes.item2}>
              <Grid item xs={5}>
                <ValueDetailTask label="No RFC " value={data.noRfc} />
              </Grid>
              <Grid item xs={5}>
                <ValueDetailTask
                  label="Tgl RFC Selesai"
                  value={data.tglRfcSelesai}
                />
              </Grid>
            </Grid>
            <Grid container className={classes.item2}>
              <Grid item xs={5}>
                <ValueDetailTask label="No PSF" value={data.noPsf} />
              </Grid>
              <Grid item xs={5}>
                {/* <Grid container direction="column">
                  <Typography className={classes.label}>
                    BAST Digital
                  </Typography>
                  <Typography className={classes.txtValue}>-</Typography>
                </Grid> */}
                <ValueDetailTask label="BAST Digital" value={data.bastId} />
              </Grid>
            </Grid>
            <Grid container className={classes.cItem2}>
              <div style={{ width: "65%" }}>
                <Grid container direction="column">
                  <Grid item>
                    <Typography className={classes.title2}>
                      CIMB Attachment
                    </Typography>
                  </Grid>
                  {data.cimbAttachment.length > 0 ? (
                    data.cimbAttachment.map((item) => {
                      return <MinioDocComponent filePath={item.path} />;
                    })
                  ) : (
                    <Typography className={classes.noData}>No Files</Typography>
                  )}
                </Grid>
              </div>
              <div style={{ width: "35%" }}>
                <Grid container direction="column">
                  <Grid item>
                    <Typography className={classes.title2}>
                      Vendor Attachment
                    </Typography>
                  </Grid>
                  {data.vendorAttachment.length > 0 ? (
                    data.vendorAttachment.map((item) => {
                      return (
                        <MinioDocComponent
                          filePath={item.path}
                          textColor="#8D98B4"
                        />
                      );
                    })
                  ) : (
                    <Typography className={classes.noData}>No Files</Typography>
                  )}
                </Grid>
              </div>
            </Grid>
          </Grid>
        </div>
      </Paper>
    </Grid>
  );
};
FromInput.propTypes = {
  data: PropTypes.object.isRequired,
};
export default FromInput;
