/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useState, useEffect, Fragment } from "react";
import { useParams, withRouter } from "react-router-dom";
import axios from "axios";
import { ReactComponent as BackIcon } from "../../../../assets/icons/general/arrow_back_red.svg";
import DocLegalityProgressBar from "../../../../components/chky/DocLegalityProgressBar";
import constansts from "../../../../helpers/constants";
import { doFetchDocumentDetail } from "./ApiServiceDetail";
import ModalLoader from "../../../../components/ModalLoader";
import ApprovalTabInfo from "./TabInfo";
import DetailInfo from "./DetailInfo";
import NegoHistories from "./NegoHistories";
import * as ThemeColor from "../../../../assets/theme/colors";
import DetailInfoApproveTermin from "../../Approval/ApprovalDetail/DetailInfoApproveTermin";
import PaperTransaction from "../../Approval/ApprovalDetail/PaperTransaction";

const useStyles = makeStyles({
  root: {
    padding: "30px 20px 20px 30px",
    backgroundColor: ThemeColor.GrayUltrasoft,
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
});

const DocLegalityDetails = ({ history }) => {
  const classes = useStyles();

  // get id from uri
  const { id } = useParams();

  // init STATE

  const [dataNegoHistories, setDataNegoHistories] = useState([]);
  const [dataInfoGeneral, setInfoGeneral] = useState({});
  const [topData, setTopData] = useState({});
  const [status, setStatus] = useState(status);

  // MODAL LOADER
  const [isOpenModalLoader, setModalLoader] = useState(false);
  // set handler loader when call Approval API Service
  function loaderHandler(loaderValue) {
    setModalLoader(loaderValue);
  }

  // modal for Acknowledge
  const [openModalAcknowledge, setOpenModalAcknowledge] = useState(false);
  const handleOpenModalAcknowledge = () => setOpenModalAcknowledge(true);
  const handleCloseModalAcknowledge = () => setOpenModalAcknowledge(false);

  const hitApiAcknowledge = async () => {
    try {
      setModalLoader(true);
      const data = await axios({
        url: `${process.env.REACT_APP_API_DOMAIN}/acquisitionservice/acquisitionservice/v1/documentLegalityAcknowledge`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        data: {
          id,
        },
      });
      if (data.data.statusCode == 200) {
        alert(data.data.message);
        window.location.assign("/site-management/document-legality");
      } else {
        alert(data.data.message);
      }
      setModalLoader(false);
    } catch (error) {
      setModalLoader(false);
      alert(`Error Fetching Data Get Saved Location : \n ${error}`);
    }
  };

  useEffect(() => {
    const dataHit = {
      id,
    };
    doFetchDocumentDetail(loaderHandler, dataHit).then((dataFromApi) => {
      try {
        loaderHandler(true);
        // set general data Info
        // console.log("<<<< DATa - dataFromApi : ", dataFromApi);
        setInfoGeneral({
          informasiApproval: dataFromApi.data.informasiDocument[0],
          detail: {
            ...dataFromApi.data.rent[0],
            detailRent: dataFromApi.data.detailRent,
          },
          detailRent: dataFromApi.data.detailRent,
        });
        // set data nego histories
        setDataNegoHistories(dataFromApi.data.negotiation);
        setStatus(dataFromApi.data.informasiDocument[0].status);
        // set top data nego
        setTopData({
          yearlyRentCost: dataFromApi.data.rent[0].yearlyRentCost,
          negotiationDealCost: dataFromApi.data.rent[0].negotiationDealCost,
        });
      } catch (error) {
        loaderHandler(false);
        alert("Error Set Data To State... ! \n", error);
      }
      loaderHandler(false);
    });
  }, []);

  return (
    <div className={classes.root}>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <div className={classes.backAction}>
            <Button onClick={() => history.goBack()}>
              <BackIcon />
              <Typography className={classes.backLabel}>Back</Typography>
            </Button>
          </div>
        </Grid>
        <Grid item>
          <ApprovalTabInfo data={dataInfoGeneral} idAtm={id} />
        </Grid>
        <Grid item>
          <DocLegalityProgressBar
            status={status}
            openingType={
              dataInfoGeneral.informasiApproval &&
              dataInfoGeneral.informasiApproval.openingType
            }
            docLegalityStatus={
              dataInfoGeneral.informasiApproval &&
              dataInfoGeneral.informasiApproval.documentLegalityStatus
            }
          />
        </Grid>
        <Grid item>

          {
              dataInfoGeneral?.informasiApproval?.openingType === "Termin" ?
                <Grid container spacing={2}>
                  <Grid item sm={3}>
                    <DetailInfoApproveTermin
                      dataApproval={dataInfoGeneral}
                      // rejectionBtnHandler={handleOpenModalRejection}
                      // approveBtnHandler={handleOpenModalApprove}
                      isLoadData={isOpenModalLoader}
                      isWithAction={false}
                    />
                  </Grid>
                  <Grid item sm={9}>
                    <PaperTransaction id={dataInfoGeneral.informasiApproval.atmId}/>
                  </Grid>
                </Grid>
                :
                <Grid container spacing={2}>
                  <Grid item sm={6}>
                    <DetailInfo
                      data={dataInfoGeneral.detail}
                      acknowledgeBtnHandler={hitApiAcknowledge}
                      loaderHandler={loaderHandler}
                    />
                  </Grid>
                  <Grid item sm={6}>
                    <NegoHistories
                      dataNego={dataNegoHistories}
                      dataInfoGeneral={dataInfoGeneral}
                    />
                  </Grid>
                </Grid>
          }

        </Grid>
      </Grid>
      <ModalLoader isOpen={isOpenModalLoader} />
    </div>
  );
};

export default withRouter(DocLegalityDetails);
