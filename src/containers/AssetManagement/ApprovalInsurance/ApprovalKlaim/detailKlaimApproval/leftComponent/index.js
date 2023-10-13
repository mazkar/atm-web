import React, { useEffect, useState } from "react";
import { Box, Grid, makeStyles, Typography,Button} from "@material-ui/core";
import constansts from "../../../../../../helpers/constants";
import { ChkyButtons } from "../../../../../../components";
import useTimestampConverter from "../../../../../../helpers/useTimestampConverter";
import MinioDocComponent from "../../../../../../components/MinioDocComponent";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    fontFamily: "Barlow",
  },
  title: {
    fontFamily: "Barlow",
    fontWeight: 600,
    fontSize: "15px",
    width: "100%",
    paddingBottom: "10px",
    borderBottom: "2px solid #BCC8E7",
    margin: "30px 0 15px 0",
    color: "#BCC8E7",
  },
  detailContainer: {
    display: "flex",
    flex: 1,
  },
  container: { display: "flex", alignItems: "center", marginBottom: "15px" },
  dataName: {
    flex: 2,
    fontFamily: "Barlow",
    fontSize: "15px",
    fontWeight: 400,
  },
  colon: {
    flex: 0.2,
    display: "flex",
    alignItems: "center",
  },
  dataValue: {
    flex: 3,
    fontFamily: "Barlow",
    fontSize: "15px",
    fontWeight: 600,
    display: "flex",
    alignItems: "center",
  },
});
const dummyInformation = {
  noKlaim: 123132,
  tipeKlaim: "Money Insurance",
  tglPengajuan: 1659314592000,
  idMesin: 5783,
  snMesin: "56HG704680",
  lokasi: "BKS. ATM CENTER APOTIK TAMAN NAROGONG INDAH",
  keteranganKerugian: "Exit Shutter Palsu - Endra Budi Harianto",
  tglKejadian:1659314592000,
  jumlahKerugian:"Rp.700.000",
  kategori: "Vandal",
  flm: "TAG",
  slm: "Diebold Nixdorf",
  cctv: "-",
  attachment: [
    { file: "Doc Klaim.pdf" },
    { file: "Attachment 4" },
    { file: "Attachment 2" },
    { file: "Attachment 5" },
    { file: "Attachment 3" },
  ],
};
const LeftComponent = ({ rejectPopUp, confirmationUp }) => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      {/* For Information */}
      <Typography className={classes.title}>Informasi</Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Grid container>
            <Grid item xs={5}>
              <Typography>No Klaim</Typography>
            </Grid>
            <Grid item xs={1}>
              :
            </Grid>
            <Grid item xs={6}>
              <Typography
                style={{ fontWeight: 600, color: constansts.color.dark }}
              >
                {dummyInformation.noKlaim}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid container>
            <Grid item xs={5}>
              <Typography>Jumlah Kerugian</Typography>
            </Grid>
            <Grid item xs={1}>
              :
            </Grid>
            <Grid item xs={6}>
              <Typography
                style={{ fontWeight: 600, color: constansts.color.dark }}
              >
                {dummyInformation.jumlahKerugian}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid container>
            <Grid item xs={5}>
              <Typography>Tipe Klaim</Typography>
            </Grid>
            <Grid item xs={1}>
              :
            </Grid>
            <Grid item xs={6}>
              <Typography
                style={{ fontWeight: 600, color: constansts.color.dark }}
              >
                {dummyInformation.tipeKlaim}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid container>
            <Grid item xs={5}>
              <Typography>Kategori</Typography>
            </Grid>
            <Grid item xs={1}>
              :
            </Grid>
            <Grid item xs={6}>
              <Typography
                style={{ fontWeight: 600, color: constansts.color.dark }}
              >
                {dummyInformation.kategori}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid container>
            <Grid item xs={5}>
              <Typography>Tanggal Pengajuan</Typography>
            </Grid>
            <Grid item xs={1}>
              :
            </Grid>
            <Grid item xs={6}>
              <Typography
                style={{ fontWeight: 600, color: constansts.color.dark }}
              >
                {useTimestampConverter(
                  dummyInformation.tglPengajuan / 1000,
                  "DD/MM/YYYY"
                )}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid container>
            <Grid item xs={5}>
              <Typography>FLM</Typography>
            </Grid>
            <Grid item xs={1}>
              :
            </Grid>
            <Grid item xs={6}>
              <Typography
                style={{ fontWeight: 600, color: constansts.color.dark }}
              >
                {dummyInformation.flm}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid container>
            <Grid item xs={5}>
              <Typography>ID Mesin</Typography>
            </Grid>
            <Grid item xs={1}>
              :
            </Grid>
            <Grid item xs={6}>
              <Typography
                style={{ fontWeight: 600, color: constansts.color.dark }}
              >
                {dummyInformation.idMesin}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid container>
            <Grid item xs={5}>
              <Typography>SLM</Typography>
            </Grid>
            <Grid item xs={1}>
              :
            </Grid>
            <Grid item xs={6}>
              <Typography
                style={{ fontWeight: 600, color: constansts.color.dark }}
              >
                {dummyInformation.slm}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid container>
            <Grid item xs={5}>
              <Typography>SN Mesin</Typography>
            </Grid>
            <Grid item xs={1}>
              :
            </Grid>
            <Grid item xs={6}>
              <Typography
                style={{ fontWeight: 600, color: constansts.color.dark }}
              >
                {dummyInformation.snMesin}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid container>
            <Grid item xs={5}>
              <Typography>CCTV</Typography>
            </Grid>
            <Grid item xs={1}>
              :
            </Grid>
            <Grid item xs={6}>
              <Typography
                style={{ fontWeight: 600, color: constansts.color.dark }}
              >
                {dummyInformation.cctv}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid container>
            <Grid item xs={5}>
              <Typography>Lokasi</Typography>
            </Grid>
            <Grid item xs={1}>
              :
            </Grid>
            <Grid item xs={6}>
              <Typography
                style={{ fontWeight: 600, color: constansts.color.dark }}
              >
                {dummyInformation.lokasi}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid container alignItems="center" spacing={2}>
            {dummyInformation.attachment.map((item) => (
              <Grid item xs={6}>
                <MinioDocComponent filePath={`/${item.file}`} />
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid container>
            <Grid item xs={5}>
              <Typography>Keterangan Kerugian</Typography>
            </Grid>
            <Grid item xs={1}>
              :
            </Grid>
            <Grid item xs={6}>
              <Typography
                style={{ fontWeight: 600, color: constansts.color.dark }}
              >
                {dummyInformation.keteranganKerugian}
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={5}>
              <Typography>Tgl Kejadian</Typography>
            </Grid>
            <Grid item xs={1}>
              :
            </Grid>
            <Grid item xs={6}>
              <Typography
                style={{ fontWeight: 600, color: constansts.color.dark }}
              >
                {useTimestampConverter(
                  dummyInformation.tglKejadian / 1000,
                  "DD/MM/YYYY"
                )}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container justifyContent="space-between" style={{ marginTop: 20 }}>
        <Grid item>
          <Button
            style={{
              backgroundColor: "#FF6A6A",
              padding: "12px 40px",
              fontSize: 13,
              fontWeight: 600,
              height: "38px",
              width: "83px",
              color: "#fff",
              textTransform: "capitalize",
              borderRadius: 8,
            }}
            onClick={rejectPopUp}
          >
            Reject
          </Button>
        </Grid>
        <Grid item>
          <Button
            style={{
              backgroundColor: "#65D170",
              padding: "12px 40px",
              fontSize: 13,
              fontWeight: 600,
              height: "38px",
              width: "96px",
              color: "#fff",
              textTransform: "capitalize",
              borderRadius: 8,
            }}
            onClick={confirmationUp}
          >
            Approve
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
export default LeftComponent;