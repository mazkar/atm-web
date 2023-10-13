import { Grid, makeStyles, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { GrayHard } from "../../../../assets/theme/colors";

const useStyles = makeStyles({
  img: {
    width: 81,
    height: 81,
    borderRadius: 10,
    "&:hover": {
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
  txt: {
    fontFamily: "Barlow",
    fontSize: 12,
    fontWeight: 400,
    textAlign: "center",
    marginTop: 5,
  },
});

const ViewImage = (props) => {
  const { depan, kanan, kiri, belakang } = props;
  const classes = useStyles();
  const [url, setUrl] = useState(
    "https://media.istockphoto.com/photos/red-blurred-background-for-decor-picture-id1196215434?k=20&m=1196215434&s=612x612&w=0&h=0BN9V1JNCbaCzTpw0qDzOb-lhGqVU7GwvTgnYqmJ_bw="
  );
  return (
    <div>
      <Typography
        style={{
          fontFamily: "Barlow",
          fontSize: 13,
          color: GrayHard,
          fontWeight: 600,
        }}
      >
        Photo
      </Typography>
      <Grid
        container
        direction="row"
        spacing={2}
        style={{ marginTop: 15, marginBottom: 20 }}
      >
        <Grid item xs={3}>
          <Grid container alignItems="center" direction="column">
            <a href={depan} target="_blank">
              <img width={81} src={depan} className={classes.img} />
            </a>
            <Typography className={classes.txt}>Depan</Typography>
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <Grid container alignItems="center" direction="column">
            <a href={kanan} target="_blank">
              <img width={81} src={kanan} className={classes.img} />
            </a>
            <Typography className={classes.txt}>Kanan</Typography>
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <Grid container alignItems="center" direction="column">
            <a href={kiri} target="_blank">
              <img width={81} src={kiri} className={classes.img} />
            </a>
            <Typography className={classes.txt}>Kiri</Typography>
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <Grid container alignItems="center" direction="column">
            <a href={belakang} target="_blank">
              <img width={81} src={belakang} className={classes.img} />
            </a>
            <Typography className={classes.txt}>Belakang</Typography>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default ViewImage;
