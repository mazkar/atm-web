/* eslint-disable import/no-cycle */
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { useHistory, useParams, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import MuiIconLabelButton from "../../../components/Button/MuiIconLabelButton";
import FloatingChat from "../../../components/GeneralComponent/FloatingChat";
import { ReactComponent as ArrowLeft } from "../../../assets/icons/siab/arrow-left.svg";
import NegotiationTabs from "./NegotiationTab";
import NegoBiaya from "./NegotiationBiaya";
import ModalLoader from "../../../components/ModalLoader";
import NegotiationDetailPaper from "./NegotiationDetailPaper";
import { doFetchDataNegotiationDetail } from "./ApiServiceNegotiation";
import { NegotiationProgressPaper } from "../../../components";

const useStyles = makeStyles({
  root: {
    padding: 15,
    marginBottom: 30,
  },
  content: {
    padding: 10,
  },
  backButton: {
    marginBottom: 20,
    "& .MuiButton-contained": {
      boxShadow: "none",
      backgroundColor: "transparent",
      color: "red",
    },
    "& .MuiButton-root": {
      textTransform: "capitalize",
      "& :hover": {
        backgroundColor: "#F4F7FB",
      },
    },
  },
  textName: {
    // margin: 6,
    fontFamily: "Barlow",
    fontSize: "15px",
    fontWeight: 500,
    lineHeight: "18px",
  },
  textDetail: {
    fontFamily: "Barlow",
    fontWeight: 500,
    fontSize: "13px",
    background: "#d534eb",
  },
  textExclude: {
    fontFamily: "Barlow",
    fontWeight: 400,
    fontSize: "15px",
    fontStyle: "italic",
    // lineHeight: '22px'
  },
  buttonForm: {
    width: 135,
    height: 40,
    padding: "12px 40px",
    fontSize: 12,
    fontWeight: 600,
    color: "#fff",
    textTransform: "capitalize",
    borderRadius: 8,
  },
  clipFormat: {
    fontSize: 14,
    fontFamily: "Barlow",
    fontWeight: 400,
    color: "#DC241F",
    cursor: "pointer",
  },
});

const negotiationDetail = () => {
  const classes = useStyles();
  // get id from uri
  const history = useHistory();
  const { id } = useParams();
  // console.log("<<<<<< ID Detail", id);
  const [isOpenModalLoader, setModalLoader] = useState(false);
  const [dataNegoHistories, setDataNegoHistories] = useState([]);
  const [dataInfoGeneral, setInfoGeneral] = useState({});

  // set handler loader when call Approval API Service
  function loaderHandler(loaderValue) {
    setModalLoader(loaderValue);
  }

  useEffect(() => {
    const dataHit = {
      id: id,
    };
    doFetchDataNegotiationDetail(loaderHandler, dataHit).then((dataFromApi) => {
      // console.log("<<<< DATa - dataFromApi : ",JSON.stringify(dataFromApi));
      try {
        loaderHandler(true);
        // set general data Info
        // console.log("<<<< DATa - dataFromApi : ",JSON.stringify(dataFromApi));
        setInfoGeneral({
          informasiNegotiation: dataFromApi.data.informasiNegotiation[0],
          detailRent: dataFromApi.data.detailRent,
          rent: dataFromApi.data.rent[0],
        });
        // set data nego histories
        setDataNegoHistories(dataFromApi.data.negotiation);
      } catch (error) {
        loaderHandler(false);
        alert("Error Set Data To State... ! \n", error);
      }
      loaderHandler(false);
    });
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.backButton}>
        <MuiIconLabelButton
          label="Back"
          iconPosition="startIcon"
          onClick={() => history.goBack()}
          buttonIcon={<ArrowLeft />}
        />
      </div>
      {/* === Content === */}
      <div className={classes.content}>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <NegotiationTabs
              data={dataInfoGeneral}
              idAtm={id}
              isLoadData={isOpenModalLoader}
            />
          </Grid>
          <Grid item xs={12}>
            <NegotiationProgressPaper
              status={
                dataInfoGeneral.informasiNegotiation &&
                dataInfoGeneral.informasiNegotiation.status
              }
              openingType={
                dataInfoGeneral.informasiNegotiation &&
                dataInfoGeneral.informasiNegotiation.openingType
              }
            />
            {/* <NegoProgress isLoadData={isOpenModalLoader}/> */}
          </Grid>
        </Grid>

        {/* DETAIL NEGO */}
        <Grid container spacing={2} style={{ marginTop: 20 }}>
          <Grid item xs={3}>
            <NegoBiaya data={dataInfoGeneral} isLoadData={isOpenModalLoader} />
          </Grid>
          {/* ==== Start NEGOTIATION DETAIL PAPER ==== */}
          <Grid item xs={9}>
            <NegotiationDetailPaper
              idLoc={id}
              dataNego={dataNegoHistories}
              dataInfoGeneral={dataInfoGeneral}
              idSiteNewAtm={id}
              isLoadData={isOpenModalLoader}
            />
          </Grid>
        </Grid>
      </div>

      {/* <FloatingChat /> */}
      {/* <ModalLoader isOpen={isOpenModalLoader} /> */}
    </div>
  );
};

function mapStateToProps() {
  return {};
}

export default withRouter(
  connect(mapStateToProps)(withTranslation("translations")(negotiationDetail))
);
