import { Box, Card, Grid, makeStyles, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { PrimaryHard, White } from "../../../../assets/theme/colors";
import CardTask from "./CardTask";
import { ReactComponent as IconAddTask } from "../../../../assets/icons/general/plus_red.svg";
import { ReactComponent as IconJarkom } from "../../../../assets/icons/task/jarkom.svg";
import { ReactComponent as IconAktivasi } from "../../../../assets/icons/task/aktivasi.svg";
import { ReactComponent as IconBooth } from "../../../../assets/icons/task/boothWhite.svg";
import { ReactComponent as IconKeamanan } from "../../../../assets/icons/task/keamanan.svg";
import { ReactComponent as IconKebutuhan } from "../../../../assets/icons/task/kebutuhan.svg";
import { ReactComponent as IconMesin } from "../../../../assets/icons/task/mesin.svg";
import { ReactComponent as IconParameter } from "../../../../assets/icons/task/parameter.svg";
import { ReactComponent as IconSignage } from "../../../../assets/icons/task/signage.svg";

const useStyles = makeStyles({
  container: {
    height: 925,
    overflow: "scroll",
    "&::-webkit-scrollbar": {
      width: "0em",
    },
  },
  modal: {
    flexDirection: "column",
  },
});

function isEmpty(obj) {
  for (const x in obj) {
    if (obj.hasOwnProperty(x)) return false;
  }
  return true;
}

const ParentCard = (props) => {
  const { data, tambahData, getPostApi } = props;
  const classes = useStyles();

  let icon, title;
  if (isEmpty(data) === false) {
    if (data[0].kategori === "Jarkom") {
      icon = <IconJarkom />;
      title = data[0].kategori;
    } else if (data[0].kategori === "Activation") {
      icon = <IconAktivasi />;
      title = data[0].kategori;
    } else if (data[0].kategori === "Booth") {
      icon = <IconBooth />;
      title = data[0].kategori;
    } else if (data[0].kategori === "Keamanan") {
      icon = <IconKeamanan />;
      title = data[0].kategori;
    } else if (data[0].kategori === "Need") {
      icon = <IconKebutuhan />;
      title = "Kebutuhan";
    } else if (data[0].kategori === "Mesin") {
      icon = <IconMesin />;
      title = data[0].kategori;
    } else if (data[0].kategori === "Parameter") {
      icon = <IconParameter />;
      title = data[0].kategori;
    } else if (data[0].kategori === "Signage") {
      icon = <IconSignage />;
      title = data[0].kategori;
    } else if (data[0].kategori === "Termination") {
      icon = <IconAktivasi />;
      title = "Status Terminasi";
    } else if (data[0].kategori === "Balance") {
      icon = <IconAktivasi />;
      title = "Konnfirmasi Saldo 0";
    }
  }

  //cek apakah data lebih dari 2 jika iya kasih scroll
  let card;
  if (data.length > 2) {
    card = (
      <Grid container className={classes.container}>
        {data.map((item) => (
          <CardTask data={item} getPostApi={getPostApi} />
        ))}
      </Grid>
    );
  } else {
    card = data.map((item) => <CardTask data={item} getPostApi={getPostApi} />);
  }

  return (
    <Card align="center" style={{ marginBottom: 20 }}>
      <Box
        style={{
          backgroundColor: PrimaryHard,
          height: 38,
          paddingTop: 10,
          padiingBottom: 10,
        }}
      >
        <Grid container alignItems="center">
          <Grid
            item
            style={{
              marginLeft: 15,
              marginRight: 10,
            }}
          >
            {icon}
          </Grid>
          <Typography
            style={{
              fontSize: 16,
              color: White,
              fontFamily: "Barlow",
              fontWeight: 600,
              marginBottom: 6,
            }}
          >
            {title} - {data.length}
          </Typography>
        </Grid>
      </Box>
      {card}

      {tambahData ? (
        <Grid container alignItems="row" style={{ marginTop: 15 }}>
          <IconAddTask style={{ marginRight: 5, marginLeft: 15 }} />
          <p
            style={{
              fontFamily: "barlow",
              fontSize: 17,
              color: PrimaryHard,
              fontWeight: 600,
            }}
          >
            Buat Task Baru
          </p>
        </Grid>
      ) : (
        <div style={{ marginTop: 15 }}></div>
      )}
    </Card>
  );
};

export default ParentCard;
