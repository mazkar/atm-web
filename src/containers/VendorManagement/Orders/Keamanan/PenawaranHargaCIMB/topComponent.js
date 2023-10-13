import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Button, Paper, Box } from "@material-ui/core";
import { useHistory, useParams, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";

const useStyles = makeStyles({
  rootPaper: {
    width: "100%",
    minHeight: "550px",
    height: "100%",
    borderRadius: 10,
    boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
    marginBottom: 50,
    padding: 30,
  },
});
const TopComponent = ({ content }) => {
  const classes = useStyles();
  const { id } = useParams();
  const c = content || {};
  const coordArr = c.latLong?.split(",") || [];
  const dataPenawaranHarga = [
    {
      label1: "No Ticket",
      value1: c.noTicket,
      label2: "ID Location",
      value2: c.idLocation,
      label3: "Jenis Pekerjaan",
      value3: c.jenisPekerjaan,
    },
    {
      label1: "Tgl Request",
      value1: c.requestDate,
      label2: "Nama Lokasi",
      value2: c.locationName,
      label3: "PIC / Vendor",
      value3: c.namaVendor == null ? "-":c.namaVendor,
    },
    {
      label1: "User Request",
      value1: c.userRequest,
      label2: "Alamat",
      value2: c.address,
      label3: "Lat Long",
      value3: (
        <>
          <div>Lat {coordArr[0]}</div>
          <div>Long {coordArr[1]}</div>
        </>
      ),
    },
    {
      label1: "Due Date",
      value1: c.dueDate,
      label2: "Area",
      value2: c.area,
      label3: "Notes & Desc",
      value3: c.noteDesc,
    },
    {
      label1: "ID Mesin",
      value1: c.idMachine,
      label2: "City",
      value2: c.city,
      label3: "",
      value3: "",
    },
  ];
  return (
    <div>
      <Paper className={classes.rootPaper}>
        <Grid
          container
          direction="column"
          style={{ paddingTop: 20, paddingLeft: "20px", width: "100%" }}
        >
          {dataPenawaranHarga.map((item) => (
            <Grid item>
              <Grid container direction="row">
                <Grid item xs={4}>
                  <Grid container direction="row">
                    <Grid item xs={3}>
                      <Typography>{item.label1}</Typography>
                    </Grid>
                    <Grid item xs={1}>
                      :
                    </Grid>
                    <Grid item xs={7}>
                      <Typography style={{ fontWeight: 600 }}>
                        {item.value1 || "-"}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={4}>
                  <Grid container direction="row">
                    <Grid item xs={3}>
                      <Typography>{item.label2}</Typography>
                    </Grid>
                    <Grid item xs={1}>
                      :
                    </Grid>
                    <Grid item xs={7}>
                      <Typography
                        style={{ fontWeight: 600, wordWrap: "anywhere" }}
                      >
                        {item.value2 || "-"}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={4}>
                  <Grid container direction="row">
                    <Grid item xs={3}>
                      <Typography>{item.label3}</Typography>
                    </Grid>
                    <Grid item xs={1}>
                      {item.label3 ? `:` : ""}
                    </Grid>
                    <Grid item xs={7}>
                      <Typography style={{ fontWeight: 600 }}>
                        {item.label3 ? item.value3 || "-" : ""}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </div>
  );
};
function mapStateToProps() {
  return {};
}

export default withRouter(
  connect(mapStateToProps)(withTranslation("translations")(TopComponent))
);
