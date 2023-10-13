import React, { useEffect, useState, useContext } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Modal, Grid, Typography, Button, Paper } from "@material-ui/core";
import axios from "axios";
import constants from "../../../helpers/constants";
import Logo from "../../../assets/images/SideMenu/logo_cimb.png";
import LoadingView from "../../Loading/LoadingView";
import secureStorage from "../../../helpers/secureStorage";
import getMinioFromUrl from "../../../helpers/getMinioFromUrl";
import { AdvancedSmallInput } from "../../chky/ChkyInputSmall";
import { RootContext } from "../../../router";

const useStyles = makeStyles({
  modal: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Barlow",
  },
  paperRoot: {
    position: "absolute",
    backgroundColor: constants.color.white,
    top: 0,
    width: 720,
    height: "100%",
    borderRadius: 10,
    padding: 30,
    overflow: "scroll",
  },
  girdAreaContent: {
    width: "100%",
  },
  logoArea: {
    marginBottom: 51,
  },
  judulArea: {
    marginBottom: 20,
  },
  keteranganArea: {
    marginBottom: 10,
  },
  wrapperArea: {
    marginBottom: 20,
  },
  deskripsiArea: {
    marginBottom: 20,
  },
  deskripsi: {
    fontStyle: "normal",
    fontSize: 13,
    color: "#2B2F3C",
    textAlign: 'justify',
  },
  deskripsiFooter: {
    fontStyle: "normal",
    fontSize: 13,
    color: "#DC241F",
    textAlign: 'justify',
  },
  spanDeskripsi: {
    display: "inline-block",
  },
  buttonContainer: {
    marginTop: 40,
  },
  primaryButton: {
    color: constants.color.white,
    backgroundColor: constants.color.primaryHard,
    borderRadius: 10,
    width: "100%",
    height: 40,
  },
  secondaryButton: {
    color: constants.color.primaryHard,
    backgroundColor: constants.color.white,
    borderRadius: 10,
    border: "1px solid",
    borderColor: `${constants.color.primaryHard}`,
    width: 115,
    height: 40,
  },
  areaTandaTangan: {
    marginTop: 110,
    marginBottom: 40,
  },
  fontBold: {
    fontWeight: 700,
    fontSize: 13,
  },
});

const DraftPenghentianKerjasama = (props) => {
  const classes = useStyles();
  const [isOpenModalLoader, setModalLoader] = useState(false);
  const [data, setData] = useState(defaultData);
  const { isOpen, onClose, rowToShow, handleSave } = props;

  const { userSignature, userFullName } = useContext(RootContext);
  const [signatureSupport, setSignatureSupport] = useState(null);
  const [signatureManagement, setSignatureManagement] = useState(null);
  const [managementName, setManagementName] = useState("");
  const { userServiceBaseUrl } = constants;
  const [letterPlace, setLetterPlace] = useState("");

  // address
  let sendAddress = [];
  if (data) {
    sendAddress = data.sendTo
      .split("\n")
      .map((item) => (item === "null" ? "-" : item));
    // sendAddress.shift();
  }

  function getManagementSignature(signature) {
    if (signature) {
      getMinioFromUrl(signature)
        .then((res) => {
          // setIsLoading(false);
          // console.log("THIS IS TTD USER LOGIN : ", res.fileUrl);
          setSignatureManagement(res.fileUrl);
        })
        .catch((err) => {
          // console.log(err);
        });
    } else {
      // setIsLoading(false);
    }
  }

  useEffect(() => {
    if (isOpen === true) {
      // console.log("termin", rowToShow)
      const request = { id: rowToShow };
      const headers = {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      };
      try {
        setModalLoader(true);
        axios
          .post(
            `${process.env.REACT_APP_API_DOMAIN}/profilelocationservices/profilelocationservices/v1/getRequestTermination`,
            request,
            headers
          )
          .then((res) => {
            const dataPre = res.data;
            const dateArr = dataPre.letterDate.split(",");
            let newSendto = dataPre.sendTo.replace(/\/n/g, "\r\n");
            const newRow = {
              firstActiveUser: dataPre.firstActiveUser,
              firstVendor: dataPre.firstVendor,
              landlordName: dataPre.landlordName,
              letterDate: dateArr[1],
              locationName: dataPre.locationName,
              picName: dataPre.picName,
              referencedNumber: dataPre.referenceNumber,
              secondActiveUser: dataPre.secondActiveUser,
              secondVendor: dataPre.secondVendor,
              sendTo: dataPre.sendTo,
              firstSignatureUrl: dataPre.firstSignatureUrl,
              firstSigner: dataPre.firstSigner,
              revocationDay: dataPre.revocationDay,
              revocationDate: dataPre.revocationDate,
              revocationStartTime: dataPre.revocationStartTime,
              revocationEndTime: dataPre.revocationEndTime,
            };
            // console.log('ini datapre', newRow);
            // console.log('Ini Data request Draft Termin', res.data);
            getManagementSignature(dataPre.firstSignatureUrl);
            setManagementName(dataPre.firstSigner);
            setData(newRow);
            setLetterPlace(dateArr[0]);
            secureStorage.setItem("dataDraftTermin", newRow);
            setModalLoader(false);
          })
          .catch((err) => {
            alert(err);
            setModalLoader(false);
          });
      } catch (err) {
        alert(`Error Fetching New Atm Data...! \n${err}`);
        setModalLoader(false);
      }
    }
  }, [rowToShow]);

  useEffect(() => {
    secureStorage.setItem("kerjasamaLetterPlace", letterPlace);
  }, [letterPlace]);

  function isEmpty(obj) {
    for (const x in obj) {
      if (obj.hasOwnProperty(x)) return false;
    }
    return true;
  }

  return (
    <>
      <Modal
        open={isOpen}
        onClose={onClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={classes.modal}
      >
        {isOpenModalLoader ? (
          <LoadingView maxheight="100%" />
        ) : (
          <Paper className={classes.paperRoot}>
            <Grid item className={classes.girdAreaContent}>
              <Grid item className={classes.logoArea}>
                <img style={{ width: "145px" }} src={Logo} alt="logo" />
              </Grid>

              <Grid
                container
                justify="space-between"
                direction="row"
                className={classes.deskripsiArea}
              >
                <Grid item>
                  <Typography variant="body2">
                    <span className={classes.fontBold}>
                      {isEmpty(data) ? "N/A" : data.referencedNumber}
                    </span>
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body2">
                    <AdvancedSmallInput
                      stateVar={letterPlace}
                      stateModifier={setLetterPlace}
                    />
                    <span>{isEmpty(data) ? "N/A" : data.letterDate}</span>
                  </Typography>
                </Grid>
              </Grid>
              <Grid item className={classes.deskripsiArea}>
                <Typography className={classes.deskripsi}>
                  <b>Kepada Yth:</b> <br />
                  <b>
                    {isEmpty(data) ? "N/A" : data.picName ? data.picName : "-"}
                  </b>{" "}
                  <br />
                  {isEmpty(data) ? (
                    <b>N/A</b>
                  ) : (
                    sendAddress.map((item) => (
                      <div>
                        <b>{item}</b>
                      </div>
                    ))
                  )}
                  <br />
                </Typography>
              </Grid>

              <Grid item className={classes.deskripsiArea}>
                <Typography className={classes.deskripsi}>
                  Perihal: Penghentian Sewa Lokasi ATM CIMB Niaga di{" "}
                  <b>{isEmpty(data) ? "N/A" : data.locationName}</b>
                </Typography>
              </Grid>

              <Grid item className={classes.deskripsiArea}>
                <Typography className={classes.deskripsi}>
                  Dengan Hormat,
                </Typography>
              </Grid>

              <Grid item className={classes.deskripsiArea}>
                <Typography className={classes.deskripsi}>
                  Sehubungan dengan perihal tersebut diatas, bersama ini dapat
                  kami sampaikan bahwa dengan sangat
                  menyesal kami PT. Bank CIMB Niaga Tbk. telah mengambil
                  keputusan untuk tidak memperpanjang masa sewa
                  ATM CIMB Niaga di{" "}
                  <b>{isEmpty(data) ? "N/A" : data.locationName}</b>
                </Typography>
              </Grid>

              <Grid item className={classes.deskripsiArea}>
                <Typography className={classes.deskripsi}>
                  Hal tersebut kami putuskan dikarenakan adanya pertimbangan
                  standard kelayakan penempatan mesin
                  berdasarkan performance ATM.
                </Typography>
              </Grid>

              <Grid item className={classes.deskripsiArea}>
                <Typography className={classes.deskripsi}>
                  Atas perhatian kerjasama yang sudah terjalin baik selama ini,
                  antara PT. Bank CIMB Niaga Tbk. dengan{' '}
                  <b>
                    {isEmpty(data)
                      ? "N/A"
                      : data.landlordName
                      ? data.landlordName
                      : "-"}
                  </b>
                  , kami ucapkan terima kasih.
                </Typography>
              </Grid>

              <Grid item className={classes.deskripsiArea}>
                <Typography className={classes.deskripsi}>
                  Hormat Kami, <br />
                  PT. Bank CIMB Niaga, Tbk. <br />
                  ATM Business Group
                </Typography>
              </Grid>

              <Grid
                container
                justify="space-between"
                className={classes.areaTandaTangan}
              >
                <Grid>
                  <img
                    src={signatureManagement}
                    style={{
                      width: "132px",
                      height: "55px",
                      marginBottom: "10px",
                      marginLeft: "10px",
                    }}
                  />
                  <Typography style={{ textAlign: "center" }}>
                    {managementName} <br />
                    <b>ATM Site Management</b>
                  </Typography>
                </Grid>

                <Grid>
                  <img
                    src={signatureSupport}
                    style={{
                      width: "132px",
                      height: "55px",
                      marginBottom: "10px",
                      marginLeft: "40px",
                    }}
                  />
                  <Typography style={{ textAlign: "center" }}>
                    {userFullName} <br />
                    <b>ATM Site Management Support</b>
                  </Typography>
                </Grid>
              </Grid>

              <Grid item className={classes.deskripsiArea}>
                <Typography className={classes.deskripsiFooter}>
                  <b>PT. Bank CIMB Niaga, Tbk. </b><br />
                  Griya Niaga 2 Lt 10 , Jl. Wahid Hasyim Blok B-4 No 3 Bintaro Sektor VII Tangerang 15224 
                  Telp 299 72 400 Fax 7486 7959 SWIFT BNIAIDJA www.cimbniaga.com
                </Typography>
              </Grid>

              <Grid
                container
                justify="space-between"
                className={classes.buttonContainer}
              >
                <Grid item>
                  <Button
                    variant="outlined"
                    disableElevation
                    className={classes.secondaryButton}
                    onClick={onClose}
                    style={{ textTransform: "capitalize" }}
                  >
                    Cancel
                  </Button>
                </Grid>

                <Grid item>
                  <Button
                    variant="contained"
                    disableElevation
                    className={classes.primaryButton}
                    onClick={handleSave}
                    style={{ textTransform: "capitalize" }}
                  >
                    Next
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        )}
        {/* <ModalLoader isOpen={isOpenModalLoader} /> */}
      </Modal>
    </>
  );
};

const defaultData = {
  firstActiveUser: "",
  firstVendor: "",
  landlordName: "",
  letterDate: "",
  locationName: "",
  picName: "",
  referencedNumber: "",
  secondActiveUser: "",
  secondVendor: "",
  sendTo: "",
  firstSignatureUrl: "",
  firstSigner: "",
};

export default DraftPenghentianKerjasama;
