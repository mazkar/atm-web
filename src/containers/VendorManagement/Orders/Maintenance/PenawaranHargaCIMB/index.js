/* eslint-disable import/no-cycle */
import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Button } from "@material-ui/core";
import { useHistory, useParams, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import axios from "axios";
import moment from "moment";
import MuiIconLabelButton from "../../../../../components/Button/MuiIconLabelButton";
import FloatingChat from "../../../../../components/GeneralComponent/FloatingChat";
import { ReactComponent as ArrowLeft } from "../../../../../assets/icons/siab/arrow-left.svg";
import { ReactComponent as TrashIcon } from "../../../../../assets/images/trash.svg";
import BotComponent from "./botComponent";
import TopComponent from "./topComponent";
import constants from "../../../../../helpers/constants";
import KopSuratNotif from "../../common/PopUp/kopSuratNotif";
import SuccessPopUp from "../../common/PopUp/successPopUp";
import ViewSuratPopUp from "../../common/PopUp/viewSurat";
import ModalLoader from "../../../../../components/ModalLoader";
import { RootContext } from "../../../../../router";
import { dataCard } from "../../index";
import { doSaveComment } from "../../../../Implementation/ApiServiceImplementation";
import ViewNotEditLetter from "../../common/PopUp/viewNotEditLetter";

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
  title: {
    fontFamily: "Barlow",
    fontWeight: "500",
    fontSize: "36px",
    color: "#2B2F3C",
  },
  primaryButton: {
    color: constants.color.white,
    backgroundColor: constants.color.primaryHard,
    padding: "10px 32px",
    borderRadius: 10,
    border: "1px solid",
    borderColor: `${constants.color.primaryHard}`,
    width: 100,
    height: 40,
    marginLeft: -15,
  },
  secondaryButton: {
    color: constants.color.primaryHard,
    backgroundColor: constants.color.white,
    padding: "10px 32px",
    borderRadius: 10,
    border: "1px solid",
    borderColor: `${constants.color.primaryHard}`,
    width: 100,
    height: 40,
  },
});

const createKebutuhan = () => {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();
  const { userId, userFullName, userRoleName, userVendorId } = useContext(
    RootContext
  );
  const [isOpenModalLoader, setModalLoader] = useState(false);
  const [dataBottom, setDataBottom] = useState({});
  const [dataTop, setDataTop] = useState();
  const [openKopSuratNotif, setOpenKopSuratNotif] = useState(false);
  const [OpenSuccessPopUp, setOpenSuccessPopUp] = useState(false);
  const [successLabel, setSuccessLabel] = useState(
    "Pengajuan Harga Berhasil Dilakukan"
  );
  const [openViewSurat, setOpenViewSurat] = useState(false);
  const [openNotEditSurat, setOpenNotEditSurat] = useState(false);
  const [message, setMessage] = useState("");

  function loaderHandler(bool) {
    setModalLoader(bool);
  }

  async function handleSubmit() {
    setModalLoader(true);
    axios
      .post(
        `${constants.IMPLEMENTATION_SERVICE}/updateStatusPenawaranHargaCimb`,
        {
          id,
          taskType: "maintenance",
          ...(message && {
            comment: [
              {
                id: null,
                userId,
                userName: userFullName,
                createdDate: +moment(),
                message,
              },
            ],
          }),
        }
      )
      .then((res) => {
        if (res.data.responseMessage === "User Not permitted") {
          alert("Not Permitted");
          setModalLoader(false);
        } else if (res.data.responseMessage === "SUCCESS") {
          setOpenSuccessPopUp(true);
          setModalLoader(false);
        } else if (res.data.responseMessage === "You have Approved this Task") {
          alert("You have Approved this Task");
          setModalLoader(false);
        }
      })
      .catch((err) => {
        console.log("~ err", err);
        alert(err);
        setModalLoader(false);
      });
  }

  function handleCloseSuccess() {
    setOpenSuccessPopUp(false);
    history.push(
      userRoleName.toLowerCase().includes('vendor') ? "/vendor-orders" : "/vendor-management/orders"
    );
  }

  useEffect(() => {
    setModalLoader(true);
    axios
      .post(`${constants.IMPLEMENTATION_SERVICE}/getPenawaranHargaVendor`, {
        id: id * 1,
        taskType: "maintenance",
        picVendorId: userVendorId,
      })
      .then((res) => {
        // console.log('~ res.data', res.data);
        const {
          penawaranHargaVendorInfo,
          baseComment,
          biayaBarang,
          biayaService,
        } = res.data;
        const {
          ppn,
          approvalStatus,
          countApproval,
          tangalSurat,
          jenisPekerjaan,
          namaVendor,
          noTlpPerusahaan,
          alamatPerusahaan,
          logoPerusahaan,
          nomerSurat,
          tempat,
          ttd,
        } = penawaranHargaVendorInfo;
        setModalLoader(false);
        setDataTop({ ...penawaranHargaVendorInfo });
        setDataBottom({
          biayaBarang,
          biayaService,
          ppn,
          baseComment,
          approvalStatus,
          countApproval,
        });
      })
      .catch((err) => {
        console.log("~ err", err);
        setModalLoader(false);
      });
  }, [id]);

  const saveComment = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const dataHit = {
        message,
        cardTaskCategory: "maintenance",
        cardTaskId: id,
      };
      doSaveComment(loaderHandler, dataHit)
        .then((res) => {
          // console.log('~ res.data', res.data);
          if (res.data) {
            if (res.data.responseCode === "00") {
              alert(`Berhasil save comment`);
              history.go(0);
            }
          }
        })
        .catch((err) => {
          alert(`Gagal save comment. ${err}`);
          setModalLoader(false);
        });
    }
  };

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
      <div className={classes.content}>
        <Typography className={classes.title}>Penawaran Harga</Typography>

        {/* Container */}
        <Grid
          container
          direction="column"
          style={{ marginTop: 20 }}
          spacing={4}
        >
          {/* Top Component */}
          <Grid item>
            <TopComponent content={dataTop} />
          </Grid>

          {/* Bottom Component */}
          <Grid item>
            <BotComponent
              content={dataBottom}
              onSubmit={handleSubmit}
              onViewSurat={(e) => setOpenViewSurat(e)}
              onViewNotEditSurat={(e) => setOpenNotEditSurat(e)}
              handleMessage={(e) => setMessage(e.target.value)}
              onMessageEnter={saveComment}
            />
          </Grid>
        </Grid>
      </div>
      <KopSuratNotif
        isOpen={openKopSuratNotif}
        onClose={() => setOpenKopSuratNotif(false)}
      />
      <SuccessPopUp
        isOpen={OpenSuccessPopUp}
        onClose={handleCloseSuccess}
        label={successLabel}
      />
      {/* <FloatingChat /> */}
      <ViewNotEditLetter
        isOpen={openNotEditSurat}
        onClose={() => setOpenNotEditSurat(false)}
        dataSurat={dataTop}
        content={dataBottom}
        kopSurat={dataTop?.letterHead}
        footer={dataTop?.letterFooter}
        approver={dataTop?.approvalApprover}
        approvalStatus={dataBottom?.approvalStatus}
      />
      <ModalLoader isOpen={isOpenModalLoader} />
    </div>
  );
};

function mapStateToProps() {
  return {};
}

export default withRouter(
  connect(mapStateToProps)(withTranslation("translations")(createKebutuhan))
);
