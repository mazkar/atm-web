import { Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
  txtBold: {
    fontFamily: "Barlow",
    fontSize: 15,
    fontWeight: 600,
  },
  txt: {
    fontFamily: "Barlow",
    fontSize: 15,
    marginTop: 8,
  },
  txtThin: {
    fontFamily: "Barlow",
    fontSize: 13,
    marginTop: 10,
  },
});

const TextBody = (props) => {
  const classes = useStyles();
  const {userFullName} = props;
  return (
    <Grid container direction="column" style={{ marginTop: 22 }}>
      <Typography className={classes.txt}>Notes:</Typography>
      <ul style={{ marginLeft: -22 }}>
        <li className={classes.txt}>
          Penambahan task dan Meng – copy image yang digunakan project atm
          improvement / Revamp
          <br />( SLM ) dan Octomobile.
        </li>
        <li className={classes.txt}>
          Mohon diinformasikan PIC Tekhnisi masing-masing N/A terlampir, dan
          teknisi datang sesuai
          <br />
          schedule di atas
        </li>
        <li className={classes.txt}>
          Mohon utk mengisi PIC ( nama / telp) langsung di kolom
        </li>
        <li className={classes.txt}>
          LinTeam Jarkom, SLM dan FLM agar dapat saling berkoordinasi
        </li>
      </ul>
      <Typography className={classes.txtBold} style={{ marginTop: 20 }}>
        Dear Team SLM
      </Typography>
      <Typography className={classes.txt}>
        Tolong di pastikan RMM Agentnya sudah terkoneksi setelah aktivasi,
        tolong di capture dan di kirimkan <br /> email.
      </Typography>
      <Typography className={classes.txt}>
        Mohon dibantu checking untuk RMM Agent.
      </Typography>
      <Typography className={classes.txtBold}>
        *Hasilnya masing2 point dicapture dan didocumentasikan ya...
      </Typography>
      <Typography className={classes.txt}>
        Berikut langkah – langkahnya :
      </Typography>
      <ol type="1" style={{ marginLeft: -22 }}>
        <li className={classes.txt}>
          Memastikan bahwa jam di ATM sudah sesuai, tolong disamakan dengan
          waktu di hp yang
          <br /> tersinkron, WIB
        </li>
        <li className={classes.txt}>Telnet 10.17.16.105 443</li>
        <li className={classes.txt}>Telnet 10.17.16.105 4321</li>
        <li className={classes.txt}>Telnet localhost 10030</li>
        <li className={classes.txt}>
          Lakukan tracert 10.17.16.105 (di capture). Hal ini agar team network
          bisa menambahkan routing <br /> yang belum pas.
        </li>
        <li className={classes.txt}>
          Memastikan 3 tasklist ada:
          <ol type="a" style={{ marginLeft: -15 }}>
            <li className={classes.txt}>RMMAgentWrapper.exe </li>
            <li className={classes.txt}>RMMAgent.exe</li>
            <li className={classes.txt}>RMMXFSProcessor.exe</li>
          </ol>
        </li>
      </ol>
      <Typography className={classes.txtBold}>Dear Team Monitoring</Typography>
      <Typography className={classes.txt}>
        Mohon supportnya jika ada kebutuhan check status dan keperluan loading
        mesin.
      </Typography>
      <Typography
        className={classes.txt}
        style={{ marginTop: 20, marginBottom: 50 }}
      >
        Terimakasih
      </Typography>
      <Typography className={classes.txt}>Salam,</Typography>
      <Typography className={classes.txtBold}>[{userFullName}]</Typography>
      <Typography className={classes.txt}>
        ATM Implementation | Digital Banking, Branchless & Partnership <br />
        ATM Business Group
      </Typography>
      <Typography className={classes.txtThin}>
        Griya CIMB Niaga 2, Lantai 10 <br />
        Jl. K.H Wahid Hasyim Blok B4 No. 3 Bintaro Jaya Sektor 7 Tangerang 15224
        Indonesia
        <br />
        Tel +6221 29972400 ext 89252 | Fax +6221 7486-7959
      </Typography>
    </Grid>
  );
};

export default TextBody;
