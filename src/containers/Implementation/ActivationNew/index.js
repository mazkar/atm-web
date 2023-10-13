import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ReactComponent as BackIcon } from "../../../assets/icons/general/arrow_back_red.svg";
import constansts from "../../../helpers/constants";
import { Grid, Typography, Button, Paper } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Calculator from "../../../assets/images/calculator.png";
import { ReactComponent as Sync } from "../../../assets/icons/siab/sync-alt-blue.svg";
import ModalDraftBast from "../../../components/Modal/DraftBAST";

const useStyles = makeStyles({
  root: {
    padding: "30px 30px 30px 30px",
  },
  backLabel: {
    fontSize: 17,
    color: constansts.color.primaryHard,
    marginLeft: 5,
  },
  backAction: {
    backgroundColor: "unset",
    padding: 0,
    "& .MuiButton-root": {
      padding: 0,
      textTransform: "none",
      backgroundColor: "unset",
    },
    "& .MuiButton-root:hover": { opacity: 0.6, backgroundColor: "unset" },
  },
  title: {
    fontFamily: "Barlow",
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: 13,
    color: "#000000",
  },
  paper: {
    boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
    borderRadius: "10px",
    padding: "20px 20px",
  },
  text: {
    fontFamily: "Barlow",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 12,
    color: "#000000",
  },
  primaryButton: {
    color: constansts.color.white,
    backgroundColor: constansts.color.primaryHard,
    borderRadius: 6,
    width: 88,
    height: 40,
  },
  secondaryButton: {
    color: constansts.color.primaryHard,
    backgroundColor: constansts.color.white,
    borderRadius: 6,
    border: "1px solid",
    borderColor: constansts.color.primaryHard,
    width: 208,
    height: 40,
  },
  areaLeft: {
    background: "#DC241F",
    height: "100%",
    padding: "30px 5px",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  areaRight: {
    background: "transparent",
    width: "75%",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    padding: "10px 10px",
  },
  titleRight: {
    fontFamily: "Barlow",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: "17px",
    lineHeight: "22px",
    color: "#2B2F3C",
    marginBottom: 18,
  },
  avatar: {
    backgroundColor: "transparent",
    padding: "8px 8px 8px 8px",
    width: "45px",
    height: "45px",
  },
  textLeftHitam: {
    fontFamily: "Barlow",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "12.5px",
    color: "#2B2F3C",
  },
  textRightHitam: {
    fontFamily: "Barlow",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: "15px",
    color: "#2B2F3C",
  },
  textLeftHijau: {
    fontFamily: "Barlow",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: "12.5px",
    color: "#65D170",
  },
  textRightHijau: {
    fontFamily: "Barlow",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: "15px",
    color: "#65D170",
  },
});

const Activation = ({ history }) => {
  const classes = useStyles();
  const [modal, setModal] = useState(false);

  const showModal = () => {
    setModal(true);
  };

  return (
    <div className={classes.root}>
      <Grid
        container
        direction="column"
        spacing={2}
        style={{ marginBottom: "30px" }}
      >
        <Grid item>
          <Grid container direction="row" spacing={3} justify="space-between">
            <Grid item className={classes.backAction}>
              <Button onClick={() => history.goBack()}>
                <BackIcon />
                <Typography className={classes.backLabel}>Back</Typography>
              </Button>
            </Grid>

            <Grid item>
              <Typography
                style={{
                  color: "#000000",
                  fontFamily: "Barlow",
                  fontStyle: "normal",
                  fontWeight: 600,
                  fontSize: "13px",
                }}
              >
                Target Online : 20 December 2020
              </Typography>
              <Typography
                style={{
                  color: "#BCC8E7",
                  fontFamily: "Barlow",
                  fontStyle: "normal",
                  fontWeight: 500,
                  fontSize: "10px",
                  textAlign: "right",
                }}
              >
                10 Days left
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <Grid container direction="row" spacing={3} justify="space-between">
            <Grid item>
              <Typography
                style={{
                  fontFamily: "Barlow",
                  fontStyle: "normal",
                  fontWeight: 500,
                  fontSize: "36px",
                  color: "#2B2F3C",
                  textShadow: "0px 6px 10px rgba(0, 0, 0, 0.08)",
                }}
              >
                Aktivasi
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                style={{
                  background: "#EBF0FF",
                  border: "1px solid #749BFF",
                  padding: "8px 14px",
                  color: "#749BFF",
                  fontSize: "15px",
                  borderRadius: "4px",
                }}
              >
                Incomplete <Sync />
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container spacing={3} style={{ marginBottom: "30px" }}>
        <Grid item xs={12} sm={3}>
          <Paper
            style={{
              boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
              borderRadius: 10,
            }}
          >
            <Grid container direction="row" justify="flex-start">
              <Grid item className={classes.areaLeft}>
                <Avatar src={Calculator} className={classes.avatar} />
              </Grid>
              <Grid item className={classes.areaRight}>
                <Typography className={classes.titleRight}>
                  Total New
                </Typography>
                <Grid container justify="space-between">
                  <Grid item>
                    <Typography className={classes.textLeftHitam}>
                      Total Submission
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography className={classes.textRightHitam}>
                      4.201
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container justify="space-between">
                  <Grid item>
                    <Typography className={classes.textLeftHijau}>
                      Total Online
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography className={classes.textRightHijau}>
                      4.201
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={3}>
          <Paper
            style={{
              boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
              borderRadius: 10,
            }}
          >
            <Grid container direction="row" justify="flex-start">
              <Grid item className={classes.areaLeft}>
                <Avatar src={Calculator} className={classes.avatar} />
              </Grid>
              <Grid item className={classes.areaRight}>
                <Typography className={classes.titleRight}>
                  Total Replace
                </Typography>
                <Grid container justify="space-between">
                  <Grid item>
                    <Typography className={classes.textLeftHitam}>
                      Total Submission
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography className={classes.textRightHitam}>
                      4.201
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container justify="space-between">
                  <Grid item>
                    <Typography className={classes.textLeftHijau}>
                      Total Online
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography className={classes.textRightHijau}>
                      4.201
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={3}>
          <Paper
            style={{
              boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
              borderRadius: 10,
            }}
          >
            <Grid container direction="row" justify="flex-start">
              <Grid item className={classes.areaLeft}>
                <Avatar src={Calculator} className={classes.avatar} />
              </Grid>
              <Grid item className={classes.areaRight}>
                <Typography className={classes.titleRight}>
                  Total Termin
                </Typography>
                <Grid container justify="space-between">
                  <Grid item>
                    <Typography className={classes.textLeftHitam}>
                      Total Submission
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography className={classes.textRightHitam}>
                      4.201
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container justify="space-between">
                  <Grid item>
                    <Typography className={classes.textLeftHijau}>
                      Total Online
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography className={classes.textRightHijau}>
                      4.201
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={3}>
          <Paper
            style={{
              boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
              borderRadius: 10,
            }}
          >
            <Grid container direction="row" justify="flex-start">
              <Grid item className={classes.areaLeft}>
                <Avatar src={Calculator} className={classes.avatar} />
              </Grid>
              <Grid item className={classes.areaRight}>
                <Typography className={classes.titleRight}>
                  Total On to Off
                </Typography>
                <Grid container justify="space-between">
                  <Grid item>
                    <Typography className={classes.textLeftHitam}>
                      Total Submission
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography className={classes.textRightHitam}>
                      4.201
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container justify="space-between">
                  <Grid item>
                    <Typography className={classes.textLeftHijau}>
                      Total Online
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography className={classes.textRightHijau}>
                      4.201
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      <Grid item>
        <Paper className={classes.paper}>
          <Grid
            container
            justify="space-between"
            style={{ marginBottom: "10px" }}
          >
            <Grid item>
              <Typography
                style={{
                  fontFamily: "Barlow",
                  fontStyle: "normal",
                  fontWeight: 600,
                  fontSize: 15,
                  color: "#000000",
                }}
              >
                #11101
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                style={{
                  background: "#EBF0FF",
                  border: "1px solid #749BFF",
                  padding: "4px 10px",
                  color: "#749BFF",
                  fontSize: "12px",
                  borderRadius: "40px",
                }}
              >
                Inprogress
              </Typography>
            </Grid>
          </Grid>

          <Grid container spacing={3} style={{ marginBottom: "10px" }}>
            <Grid item xs={2} sm={2}>
              <Typography className={classes.title}>Lokasi :</Typography>
              <Typography className={classes.text}>
                CIMBN.JKT.Meruya.SPBU
              </Typography>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Typography className={classes.title}>Kota :</Typography>
              <Typography className={classes.text}>Jakarta</Typography>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Typography className={classes.title}>Latitude :</Typography>
              <Typography className={classes.text}>1200192017</Typography>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Typography className={classes.title}>Longitude :</Typography>
              <Typography className={classes.text}>1200192017</Typography>
            </Grid>
          </Grid>

          <Grid container spacing={3} style={{ marginBottom: "10px" }}>
            <Grid item xs={12} sm={2}>
              <Typography className={classes.title}>Alamat :</Typography>
              <Typography className={classes.text}>
                Jl. Mangkubumi,No.54, Kec.Mampang,Kab.Jakarta Selatan,
                DKI.Jakarta
              </Typography>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Typography className={classes.title}>Jenis Mesin :</Typography>
              <Typography className={classes.text}>ATM</Typography>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Typography className={classes.title}>Type Mesin :</Typography>
              <Typography className={classes.text}>Hitachi 7700</Typography>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Typography className={classes.title}>SN Mesin :</Typography>
              <Typography className={classes.text}>1201928</Typography>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Typography className={classes.title}>SN UPS :</Typography>
              <Typography className={classes.text}>1201928</Typography>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Typography className={classes.title}>Implementasi :</Typography>
              <Typography className={classes.text}>
                New / Replace / Termin / On to Off
              </Typography>
            </Grid>
          </Grid>

          <Grid container spacing={3} style={{ marginBottom: "10px" }}>
            <Grid item xs={12} sm={2}>
              <img
                src="https://source.unsplash.com/user/erondu/1600x900"
                alt="Gambar"
                width="50%"
                height="70px"
              />
              <img
                src="https://source.unsplash.com/user/erondu/1600x900"
                alt="Gambar"
                width="50%"
                height="70px"
              />
              <img
                src="https://source.unsplash.com/user/erondu/1600x900"
                alt="Gambar"
                width="50%"
                height="70px"
              />
              <img
                src="https://source.unsplash.com/user/erondu/1600x900"
                alt="Gambar"
                width="50%"
                height="70px"
              />
            </Grid>

            <Grid item sm={10}>
              <Grid container>
                <Grid
                  item
                  xs={12}
                  sm={2}
                  style={{ marginRight: "31px", marginBottom: "20px" }}
                >
                  <Typography className={classes.title}>FLM :</Typography>
                  <Typography className={classes.text}>FLM</Typography>
                </Grid>
                <Grid item xs={12} sm={2} style={{ marginRight: "31px" }}>
                  <Typography className={classes.title}>
                    Contact FLM :
                  </Typography>
                  <Typography className={classes.text}>082123456789</Typography>
                </Grid>
                <Grid item xs={12} sm={2} style={{ marginRight: "31px" }}>
                  <Typography className={classes.title}>Provider :</Typography>
                  <Typography className={classes.text}>Telkomsel</Typography>
                </Grid>
                <Grid item xs={12} sm={2} style={{ marginRight: "31px" }}>
                  <Typography className={classes.title}>
                    Kirim Email :
                  </Typography>
                  <Typography className={classes.text}>
                    10:10 | 10-10-2020
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={2}>
                  <Typography className={classes.title}>Status :</Typography>
                  <Typography className={classes.text}>
                    Online / Offline
                  </Typography>
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={2}
                  style={{ marginRight: "31px", marginBottom: "20px" }}
                >
                  <Typography className={classes.title}>SLM :</Typography>
                  <Typography className={classes.text}>SLM</Typography>
                </Grid>
                <Grid item xs={12} sm={2} style={{ marginRight: "31px" }}>
                  <Typography className={classes.title}>
                    Contact SLM :
                  </Typography>
                  <Typography className={classes.text}>082123456789</Typography>
                </Grid>
                <Grid item xs={12} sm={2} style={{ marginRight: "31px" }}>
                  <Typography className={classes.title}>
                    Jam Aktivitas :
                  </Typography>
                  <Typography className={classes.text}>10:10</Typography>
                </Grid>
                <Grid item xs={12} sm={2} style={{ marginRight: "31px" }}>
                  <Typography className={classes.title}>
                    BAST Digital :
                  </Typography>
                  <Typography
                    className={classes.text}
                    style={{ color: "#DC241F" }}
                    onClick={showModal}
                  >
                    Complete
                  </Typography>
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={2}
                  style={{ marginRight: "31px", marginBottom: "20px" }}
                >
                  <Typography className={classes.title}>
                    Tgl Replenishment :
                  </Typography>
                  <Typography className={classes.text}>10/10/2020</Typography>
                </Grid>
                <Grid item xs={12} sm={2} style={{ marginRight: "31px" }}>
                  <Typography className={classes.title}>
                    Tgl Tarik/Stor Tunai :
                  </Typography>
                  <Typography className={classes.text}>10/10/2020</Typography>
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={10}
                  style={{ marginRight: "31px", marginBottom: "20px" }}
                >
                  <Typography className={classes.title}>
                    Keterangan :
                  </Typography>
                  <Typography className={classes.text}>
                    Semuanya terpasang aman dan lancar
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid container justify="flex-end" spacing={5}>
            <Grid item>
              <Button
                variant="outlined"
                disableElevation
                className={classes.secondaryButton}
                style={{ textTransform: "capitalize" }}
              >
                Sent Email Aktivasi
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                disableElevation
                className={classes.primaryButton}
                style={{ textTransform: "capitalize" }}
              >
                Update
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>

      {modal && (
        <ModalDraftBast isOpen={modal} onClose={() => setModal(!modal)} />
      )}
    </div>
  );
};

export default Activation;
