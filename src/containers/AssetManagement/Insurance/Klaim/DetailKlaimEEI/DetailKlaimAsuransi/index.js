import { Box, Grid, makeStyles, Typography } from "@material-ui/core";
import { unix } from "moment";
import React, { useEffect, useState } from "react";
import { ChkyButtons } from "../../../../../../components";
import MinioDocComponent from "../../../../../../components/MinioDocComponent";
import constansts from "../../../../../../helpers/constants";
import InputText from "../common/inputText";
import { ReactComponent as ExclamationIcon } from "../../../../../../assets/icons/duotone-red/exclamation-circle.svg";
import { ReactComponent as CheckIcon } from "../../../../../../assets/icons/siab/check-circle-upload.svg";
import { ReactComponent as TimesIcon } from "../../../../../../assets/icons/siab/times-circle-upload.svg";

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
});

const dummyData = {
  slaSkgr: "21 Days",
  slaUploadBukti: "21 Days",
  slaLod: "21 Days",
  slaSubmit: "21 Days",
  slaPaid: "21 Days",
  tglProses: 1659314592000,
  skgrLod: "Upload SKRG & LOD",
  lodTtd: "Upload LOD + TTD",
  uploadBuktiBayar: "Bukti Bayar.pdf",
};

const dummyFile = [
  {
    file: "Berita Acara.pdf",
    uploaded: true,
  },
  {
    file: "File Upload 3",
    uploaded: false,
  },
  {
    file: "Surat Pengakuan Hak.pdf",
    uploaded: true,
  },
  {
    file: "File Upload 4",
    uploaded: false,
  },
  {
    file: "Foto Kerusakan.png",
    uploaded: true,
  },
];

const DetailKlaimAsuransi = () => {
  const [valueKerugian, setValueKerugian] = useState(dummyData.jumlahKerugian);
  const [valueKetKerugian, setValueKetKerugian] = useState(
    dummyData.ketKerugian
  );
  const classes = useStyles();

  useEffect(() => {}, []);
  return (
    <Box className={classes.root}>
      <Grid container spacing={2} style={{ marginTop: 30 }}>
        <Grid item xs={6}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={5}>
              <Typography>SLA SKGR</Typography>
            </Grid>
            <Grid item xs={1}>
              :
            </Grid>
            <Grid item xs={6}>
              <Typography style={{ fontWeight: 400, color: "#65D170" }}>
                {dummyData.slaSkgr}
              </Typography>
            </Grid>

            <Grid item xs={5}>
              <Typography>SLA LOD</Typography>
            </Grid>
            <Grid item xs={1}>
              :
            </Grid>
            <Grid item xs={6}>
              <Typography style={{ fontWeight: 400, color: "#65D170" }}>
                {dummyData.slaLod}
              </Typography>
            </Grid>

            <Grid item xs={5}>
              <Typography>SLA PAID</Typography>
            </Grid>
            <Grid item xs={1}>
              :
            </Grid>
            <Grid item xs={6}>
              <Typography style={{ fontWeight: 400, color: "#65D170" }}>
                {dummyData.slaPaid}
              </Typography>
            </Grid>

            <Grid item xs={5}>
              <Typography>SKGR & LOD</Typography>
            </Grid>
            <Grid item xs={1}>
              :
            </Grid>
            <Grid item xs={6}>
              <Typography
                style={{ fontWeight: 600, color: constansts.color.dark }}
              >
                <MinioDocComponent filePath={`/${dummyData.skgrLod}`} />
              </Typography>
            </Grid>

            <Grid item xs={5}>
              <Typography>LOD + TTD</Typography>
            </Grid>
            <Grid item xs={1}>
              :
            </Grid>
            <Grid item xs={6}>
              <Typography
                style={{ fontWeight: 600, color: constansts.color.dark }}
              >
                <MinioDocComponent filePath={`/${dummyData.lodTtd}`} />
              </Typography>
            </Grid>

            <Grid item xs={5}>
              <Typography>Upload Bukti Bayar</Typography>
            </Grid>
            <Grid item xs={1}>
              :
            </Grid>
            <Grid item xs={6}>
              <Typography
                style={{ fontWeight: 600, color: constansts.color.dark }}
              >
                <MinioDocComponent
                  filePath={`/${dummyData.uploadBuktiBayar}`}
                />
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={6}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={5}>
              <Typography>SLA Upload Bukti Bayar</Typography>
            </Grid>
            <Grid item xs={1}>
              :
            </Grid>
            <Grid item xs={6}>
              <Typography
                style={{
                  fontWeight: 400,
                  color: constansts.color.primaryMedium,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {dummyData.slaUploadBukti} <ExclamationIcon />
              </Typography>
            </Grid>

            <Grid item xs={5}>
              <Typography>SLA Submit ke Bayar</Typography>
            </Grid>
            <Grid item xs={1}>
              :
            </Grid>
            <Grid item xs={6}>
              <Typography
                style={{
                  fontWeight: 400,
                  color: constansts.color.primaryMedium,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {dummyData.slaSubmit} <ExclamationIcon />
              </Typography>
            </Grid>

            <Grid item xs={5}>
              <Typography>Tgl Proses</Typography>
            </Grid>
            <Grid item xs={1}>
              :
            </Grid>
            <Grid item xs={6}>
              <Typography
                style={{ fontWeight: 600, color: constansts.color.dark }}
              >
                {dummyData.tglProses}
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <InputText
                withLabel={true}
                label="Jumlah Pembayaran Asuransi :"
                placeholder="Upload form klaim & surat tuntutan"
              />
            </Grid>
            <Grid item xs={6}>
              <InputText
                withLabel={true}
                label="Reff ID :"
                placeholder="Upload form klaim & surat tuntutan"
              />
            </Grid>
          </Grid>
        </Grid>

        <Typography className={classes.title}>Informasi</Typography>
        <Typography style={{ fontWeight: 600, color: constansts.color.dark }}>
          Files Document
        </Typography>
        <Grid container spacing={2} style={{ marginTop: 10 }}>
          {dummyFile.map((item) => (
            <Grid item xs={6}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "start",
                }}
              >
                <MinioDocComponent filePath={`/${item.file}`} />
                {item.uploaded ? (
                  <CheckIcon style={{ size: 32 }} />
                ) : (
                  <TimesIcon />
                )}
              </div>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};

export default DetailKlaimAsuransi;
