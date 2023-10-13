import { Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import MinioDocComponent from "../../../../../components/MinioDocComponent";
import constansts from "../../../../../helpers/constants";

const useStyles = makeStyles({
  root: {
    width: "100%",
    borderRadius: 8,
    padding: 30,
    minHeight: 287,
    boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
    backgroundColor: constansts.color.white,
  },
  label: {
    fontWeight: 400,
    fontSize: 15,
  },
  value: {
    fontWeight: 600,
    fontSize: 15,
  },
});

const TopComponent = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={4}>
          <Grid container spacing={2}>
            {/* No Klaim */}
            <Grid item xs={4}>
              <Typography className={classes.label}>No Klaim</Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography className={classes.label}>:</Typography>
            </Grid>
            <Grid item xs={7}>
              <Typography className={classes.value}>123</Typography>
            </Grid>

            {/* Tgl Input */}
            <Grid item xs={4}>
              <Typography className={classes.label}>Tgl Input</Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography className={classes.label}>:</Typography>
            </Grid>
            <Grid item xs={7}>
              <Typography className={classes.value}>12/12/12</Typography>
            </Grid>

            {/* SN Mesin */}
            <Grid item xs={4}>
              <Typography className={classes.label}>SN Mesin</Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography className={classes.label}>:</Typography>
            </Grid>
            <Grid item xs={7}>
              <Typography className={classes.value}>12331</Typography>
            </Grid>

            {/* ID Mesin */}
            <Grid item xs={4}>
              <Typography className={classes.label}>ID Mesin</Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography className={classes.label}>:</Typography>
            </Grid>
            <Grid item xs={7}>
              <Typography className={classes.value}>123321</Typography>
            </Grid>

            {/* Nama Lokasi */}
            <Grid item xs={4}>
              <Typography className={classes.label}>Nama Lokasi</Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography className={classes.label}>:</Typography>
            </Grid>
            <Grid item xs={7}>
              <Typography className={classes.value}>JKT SPBU</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Grid container spacing={2}>
            {/* Ket. Kerugian */}
            <Grid item xs={4}>
              <Typography className={classes.label}>Ket. Kerugian</Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography className={classes.label}>:</Typography>
            </Grid>
            <Grid item xs={7}>
              <Typography className={classes.value}>Vandal</Typography>
            </Grid>

            {/* Tgl Kejadian */}
            <Grid item xs={4}>
              <Typography className={classes.label}>Tgl Kejadian</Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography className={classes.label}>:</Typography>
            </Grid>
            <Grid item xs={7}>
              <Typography className={classes.value}>12/12/12</Typography>
            </Grid>

            {/* Jumlah Kerugian */}
            <Grid item xs={4}>
              <Typography className={classes.label}>Jumlah Kerugian</Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography className={classes.label}>:</Typography>
            </Grid>
            <Grid item xs={7}>
              <Typography className={classes.value}>10.000</Typography>
            </Grid>

            {/* Tgl Email Penawaran */}
            <Grid item xs={4}>
              <Typography className={classes.label}>Tgl Email Penawaran</Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography className={classes.label}>:</Typography>
            </Grid>
            <Grid item xs={7}>
              <Typography className={classes.value}>12/12/12</Typography>
            </Grid>

          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <MinioDocComponent filePath="/Berita Acara.pdf" />
            </Grid>
            <Grid item xs={12}>
              <MinioDocComponent filePath="/Surat Pengakuan Hak.pdf" />
            </Grid>
            <Grid item xs={12}>
              <MinioDocComponent filePath="/Foto Kerusakan.png" />
            </Grid>
            <Grid item xs={12}>
              <MinioDocComponent filePath="/File Upload 3" />
            </Grid>
            <Grid item xs={12}>
              <MinioDocComponent filePath="/File Upload 4" />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default TopComponent;
