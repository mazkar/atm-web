/* eslint-disable import/no-cycle */
import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Button } from "@material-ui/core";
import { useHistory, useParams, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import MuiIconLabelButton from "../../../../../components/Button/MuiIconLabelButton";
import FloatingChat from "../../../../../components/GeneralComponent/FloatingChat";
import { ReactComponent as ArrowLeft } from "../../../../../assets/icons/siab/arrow-left.svg";
import { ReactComponent as TrashIcon } from "../../../../../assets/images/trash.svg";
import TopComponent from "./topComponent";
import BottomCompoent from "./bottomComponent";
import constants from "../../../../../helpers/constants";
import KopSuratNotif from "../../common/PopUp/kopSuratNotif";
import SuccessPopUp from "../../common/PopUp/successPopUp";
import ViewSuratPopUp from "../../common/PopUp/viewSurat";
import ModalLoader from "../../../../../components/ModalLoader";
import axios from "axios";
import {
  doSaveComment,
  doUploadPhoto,
} from "../../../../Implementation/ApiServiceImplementation";
import { RootContext } from "../../../../../router";
import moment from "moment";
import { dataCard } from "../../index";
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
  const { userId, userFullName, userRoleName, userVendorId } = useContext(
    RootContext
  );
  const { id } = useParams();

  const [isOpenModalLoader, setModalLoader] = useState(false);
  const [totalBiaya, setTotalBiaya] = useState(0);
  const [dataTop, setDataTop] = useState({});
  const [dataBottom, setDataBottom] = useState({});
  const [openKopSuratNotif, setOpenKopSuratNotif] = useState(false);
  const [OpenSuccessPopUp, setOpenSuccessPopUp] = useState(false);
  const [typeSet, setType] = useState("maintenance");
  const [openNotEditSurat, setOpenNotEditSurat] = useState(false);
  const [successLabel, setSuccessLabel] = useState(
    "Pengajuan Harga Berhasil Dilakukan"
  );
  const [openViewSurat, setOpenViewSurat] = useState(false);
  const [message, setMessage] = useState("");
  const [typeSurat, setTypeSurat] = useState("");

  function loaderHandler(bool) {
    setModalLoader(bool);
  }

  const [errorCreateKebutuhan, setErrorCreateKebutuhan] = useState({
    category: false,
    description: false,
    date: false,
    picVendor: false,
    jenisMesin: false,
    merekMesin: false,
  });

  const handleMessage = (e) => {
    setMessage(e);
  };

  function handleFileHeader(resData) {
    setDataTop((old) => ({ ...old, letterHead: resData.path }));
  }
  function handleFileFooter(resFoot) {
    setDataTop((old) => ({ ...old, letterFooter: resFoot.path }));
  }

  async function handleSubmit() {
    if (totalBiaya === 0) {
      alert("Submit Gagal, Silahkan input rincian biaya barang / jasa!");
    } else {
      setModalLoader(true);
      const { biayaService, biayaBarang, ppn } = dataBottom;

      const dataSave = {
        id: dataTop.id,
        taskType: "maintenance",
        letterHead: dataTop.letterHead,
        letterFooter: dataTop.letterFooter,
        ppn,
        biayaBarang: biayaBarang.map((val) => ({
          ...val,
          idTask: id * 1,
          totalHarga: 0,
          nama: val.nama || "-",
          unit: val.unit || "-",
          price: val.price || 0,
          quantity: val.quantity || 0,
        })),
        biayaService: biayaService.map((val) => ({
          ...val,
          idTask: id * 1,
          totalHarga: 0,
          nama: val.nama || "-",
          unit: val.unit || "-",
          price: val.price || 0,
          quantity: val.quantity || 0,
        })),
        ...(message && {
          comment: [
            {
              id: null,
              userId,
              userName: userFullName,
              message,
              createdDate: +moment(),
              cardTaskCategory: "maintenance",
              cardTaskId: id * 1,
            },
          ],
        }),
      };

      // console.log('~ dataSave', dataSave);

      axios
        .post(
          `${constants.IMPLEMENTATION_SERVICE}/saveOrUpdatePenawaranHargaVendor`,
          dataSave
        )
        .then((res) => {
          // console.log('~ res.data', res.data);
          setOpenSuccessPopUp(true);
          setModalLoader(false);
        })
        .catch((err) => {
          console.log("~ err", err);
          alert(err);
          setModalLoader(false);
        });
    }
  }

  function handleError(keyname, bool) {
    // eslint-disable-next-line default-case
    setErrorCreateKebutuhan((prevVal) => {
      return {
        ...prevVal,
        [keyname]: bool,
      };
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
        // picVendorId: userVendorId * 1,
      })
      .then((res) => {
        console.log("~ res.data", res.data);
        const {
          penawaranHargaVendorInfo,
          baseComment,
          biayaBarang,
          biayaService,
        } = res.data;
        const { ppn, approvalStatus,
          id,
          tangalSurat,
          jenisPekerjaan,
          namaVendor,
          noTlpPerusahaan,
          alamatPerusahaan,
          logoPerusahaan,
          nomerSurat,
          tempat,
          ttd,} = penawaranHargaVendorInfo;
        const ppnDef = ppn !== null ? ppn : 10;
        setModalLoader(false);
        setDataTop({ ...penawaranHargaVendorInfo, baseComment });
        setDataBottom({
          biayaBarang,
          biayaService,
          ppn: ppnDef,
          approvalStatus,
        });
      })
      .catch((err) => {
        console.log("~ err", err);
        setModalLoader(false);
      });
  }, [id]);

  function handleGetTotal(val) {
    // console.log("+++ total penawaran:", val);
    setTotalBiaya(val);
  }

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
            <TopComponent
              content={dataTop}
              messageHandler={handleMessage}
              onMessageEnter={saveComment}
            />
          </Grid>
          {/* Bottom Component */}
          <Grid item>
            <BottomCompoent
              onSubmit={handleSubmit}
              onViewSurat={(e) => setOpenViewSurat(e)}
              onViewNotEditSurat={(e) => setOpenNotEditSurat(e)}
              typeSurat={(e) => setTypeSurat(e)}
              content={dataBottom}
              setData={setDataBottom}
              onFinishUploadHeader={handleFileHeader}
              onFinishUploadFooter={handleFileFooter}
              onChangeTotal={handleGetTotal}
            />
          </Grid>
        </Grid>
      </div>
      <KopSuratNotif
        isOpen={openKopSuratNotif}
        onClose={() => setOpenKopSuratNotif(false)}
      />
      <ViewSuratPopUp
        isOpen={openViewSurat}
        onClose={() => setOpenViewSurat(false)}
        content={dataBottom}
        typeView={typeSurat}
        dataSurat={dataTop}
        typeSet={typeSet}
        kopSurat={dataTop?.letterHead}
        footer={dataTop?.letterFooter}
        approver={dataTop?.approvalApprover}
        approvalStatus={dataBottom?.approvalStatus}
      />
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
      <SuccessPopUp
        isOpen={OpenSuccessPopUp}
        onClose={handleCloseSuccess}
        label={successLabel}
      />
      <ModalLoader isOpen={isOpenModalLoader} />
      {/* <FloatingChat /> */}
    </div>
  );
};

function mapStateToProps() {
  return {};
}

export default withRouter(
  connect(mapStateToProps)(withTranslation("translations")(createKebutuhan))
);
