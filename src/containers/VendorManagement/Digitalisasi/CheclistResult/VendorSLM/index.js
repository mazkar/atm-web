import React, { useState, useEffect, useHistory } from "react";
import { withRouter, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import { Button, Grid, Typography } from "@material-ui/core";
import { PDFDownloadLink } from "@react-pdf/renderer";
import constansts from "../../../../../helpers/constants";
import MuiIconLabelButton from "../../../../../components/Button/MuiIconLabelButton";
import { ReactComponent as BackIcon } from "../../../../../assets/icons/general/arrow_back_red.svg";
import { ReactComponent as DownloadIcon } from "../../../../../assets/icons/general/download-white.svg";
import SLMPdf from "./SLMPdf";
import { slmData} from "./common/DummyData";
import {dataTopInfoPdf} from "./common/DataTop";
import { changeStateTopPdf } from "../common/ChangeStateSurveyDetail";
import TabInfo from "./common/TabInfo";
import ModalLoader from "../../../../../components/ModalLoader";
import BottomComponent from "./BottomComponent";
import FloatingChat from "../../../../../components/GeneralComponent/FloatingChat";
import mappingDataSlm from "../../../../../helpers/setDataSlm/index";
import { doFetchDetailVendorSLM } from "../../../ApiServices";

const useStyles = makeStyles({
  root: { padding: "30px 20px 20px 30px" },
  backLabel: {
    fontSize: 17,
    color: constansts.color.primaryHard,
    marginLeft: 5,
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
    fontWeight: "500",
    fontSize: "36px",
    color: "#2B2F3C",
  },
  divider: { marginTop: 25 },
  boldText: {
    fontFamily: "Barlow",
    fontWeight: "600",
    fontSize: "13px",
    color: "#2B2F3C",
  },
  normalText: {
    fontFamily: "Barlow",
    fontWeight: "400",
    fontSize: "13px",
    color: "#2B2F3C",
  },
  tableRoot: {
    minWidth: 500,
  },
  tableCell: {
    borderBottom: "none",
  },
});

const GeneralSLM = ({history}) => {
  const classes = useStyles();
  const { id } = useParams();
  const [dataSlm, setDataSlm] = useState(slmData);
  const [isLoadData, setLoadData] = useState(false);
  const [dataInfoGeneral, setInfoGeneral] = useState({});
  const [dataTopPdf, setDataTopPdf]= useState(dataTopInfoPdf);
  function loadingHandler(bool) {
    setLoadData(bool);
  }

  useEffect(() => {
    doFetchDetailVendorSLM (loadingHandler, id)
      .then(async(response) => {
        console.log("+++ response data SLM", response);
        if (response?.responseStatus === "00") {
          console.log("+++ response.responseStatus === 00");
          const dataUmum = response.informasiUmum[0];
          console.log("+++ data umum", dataUmum);
          setInfoGeneral(dataUmum);
          const dataToSet = mappingDataSlm(response);
          console.log("+++ dataset", dataToSet);
          setDataSlm(dataToSet);

          const topLeftPdf = [
            id,
            "?",
            dataUmum.locationName,
            "?",
            "?",
          ];
          const topRightPdf = ["?", "?", "?", "?"];
          const newArrTopLeftPdf = await changeStateTopPdf(
            dataTopPdf,
            "infoLeft",
            topLeftPdf
          );
          const newArrTopRightPdf = await changeStateTopPdf(
            dataTopPdf,
            "infoRight",
            topRightPdf
          );
          setDataTopPdf({
            infoLeft: newArrTopLeftPdf,
            infoRight: newArrTopRightPdf,
          });
        }
      })
      .catch((err) => {
        alert(`Terjadi Kesalahan:${err}`);
      });
  }, []);
  return (
    <div className={classes.root}>
      <Grid container justifyContent="space-between">
        <Grid item className={classes.backAction}>
          <Button onClick={() => history.goBack()}>
            <BackIcon />
            <Typography className={classes.backLabel}>Back</Typography>
          </Button>
        </Grid>
        <Grid item>
          <div className={classes.backButton}>
            <PDFDownloadLink document={<SLMPdf dataQnA={dataSlm} dataTopInfo={dataTopPdf}/>} fileName="Result SLM">
              {({ loading }) =>
                loading ? (
                  <MuiIconLabelButton
                    iconPosition="startIcon"
                    label="Loading file..."
                    disabled
                    buttonIcon={<DownloadIcon />}
                  />
                ) : (
                  <MuiIconLabelButton
                    label="Export To PDF"
                    iconPosition="endIcon"
                    // onClick={generatePDF}
                    buttonIcon={<DownloadIcon />}
                  />
                )
              }
            </PDFDownloadLink>
          </div>
        </Grid>
      </Grid>
      <div className={classes.divider} />
      <Grid container>
        <TabInfo data={dataInfoGeneral} idAtm={id} isLoadData={isLoadData} />
      </Grid>
      <div className={classes.divider} />
      <Grid container>
        <BottomComponent dataSlm = {dataSlm}/>
      </Grid>
      <ModalLoader isOpen={isLoadData} />
      {/* <FloatingChat /> */}
    </div>
  );
};
export default withRouter(GeneralSLM);
