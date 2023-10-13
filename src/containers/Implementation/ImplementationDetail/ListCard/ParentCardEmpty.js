import { Box, Card, Grid, makeStyles, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { PrimaryHard, White } from "../../../../assets/theme/colors";
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

const ParentCardEmpty = (props) => {
  const { kategori } = props;
  const classes = useStyles();

  let icon, title;
  if (kategori === "Jarkom") {
    icon = <IconJarkom />;
    title = kategori;
  } else if (kategori === "Activation") {
    icon = <IconAktivasi />;
    title = kategori;
  } else if (kategori === "Booth") {
    icon = <IconBooth />;
    title = kategori;
  } else if (kategori === "Security") {
    icon = <IconKeamanan />;
    title = kategori;
  } else if (kategori === "Need") {
    icon = <IconKebutuhan />;
    title = "Kebutuhan";
  } else if (kategori === "Mesin") {
    icon = <IconMesin />;
    title = kategori;
  } else if (kategori === "Parameter") {
    icon = <IconParameter />;
    title = kategori;
  } else if (kategori === "Signage") {
    icon = <IconSignage />;
    title = kategori;
  } else if (kategori === "Termination") {
    icon = <IconAktivasi />;
    title = "Status Terminasi";
  } else if (kategori === "Balance") {
    icon = <IconAktivasi />;
    title = "Konfirmasi Saldo 0";
  }

  return (
    <Card align="center" style={{ marginBottom: 20 }}>
      <Box
        style={{
          backgroundColor: PrimaryHard,
          height: 38,
          paddingTop: 10,
          paddingBottom: 10,
          marginBottom: 30,
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
            {title} - 0
          </Typography>
        </Grid>
      </Box>

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
    </Card>
  );
};

export default ParentCardEmpty;
