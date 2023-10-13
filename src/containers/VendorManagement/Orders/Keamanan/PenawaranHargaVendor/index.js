import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Button } from "@material-ui/core";
import { useHistory, useParams, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import { withTranslation } from "react-i18next";
import MuiIconLabelButton from "../../../../../components/Button/MuiIconLabelButton";
import FloatingChat from "../../../../../components/GeneralComponent/FloatingChat";
import { ReactComponent as ArrowLeft } from "../../../../../assets/icons/siab/arrow-left.svg";
import { ReactComponent as TrashIcon } from "../../../../../assets/images/trash.svg";
import constants from "../../../../../helpers/constants";
import ModalLoader from "../../../../../components/ModalLoader";
import { RootContext } from "../../../../../router";
import moment from "moment";
import { dataCard } from "../../index";
import TopComponent from "./topComponent";
import BottomComponent from "./bottomComponent";
import KopSuratNotif from "../../common/PopUp/kopSuratNotif";
import ViewSuratPopUp from "../../common/PopUp/viewSurat";
import SuccessPopUp from "../../common/PopUp/successPopUp";
import { doFetchHargaPenawaranVendorSecurity } from "../../../ApiServices";
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

const createKeamanan = () => {
  const classes = useStyles();
  const history = useHistory();
  const { userId, userFullName, userRoleName, userVendorId } = useContext(
    RootContext
  );
  const [dataTop, setDataTop] = useState({
    id: "",
    noTicket: "",
    requestDate: "",
    userRequest: "",
    dueDate: "",
    idMachine: "",
    address: "",
    letterHead: "",
    letterFooter: "",
    area: "",
    city: "",
    idLocation: "",
    jenisPekerjaan: "",
    latLong: "",
    locationName: "",
    namaVendor: "",
    noteDesc: "",
    tangalSurat:"",
    noTlpPerusahaan:"",
    alamatPerusahaan:"",
    logoPerusahaan:"",
    nomerSurat:"",
    tempat:"",
    ttd:"",
    listComment: [],
  });
  const [dataBottom, setDataBottom] = useState({
    approvalStatus: 0,
    biayaBarang: [],
    biayaService: [],
    listComment: [],
    ppn: null,
    status: null,
    totalBiaya: null,
    totalBiayaBarang: null,
    totalBiayaJasa: null,
    totalBiayaPpn: 0,
  });
  const [totalBiaya, setTotalBiaya] = useState(0);
  const [openKopSuratNotif, setOpenKopSuratNotif] = useState(false);
  const [OpenSuccessPopUp, setOpenSuccessPopUp] = useState(false);
  const [successLabel, setSuccessLabel] = useState(
    "Pengajuan Harga Berhasil Dilakukan"
  );
  const [openViewSurat, setOpenViewSurat] = useState(false);
  const [openNotEditSurat, setOpenNotEditSurat] = useState(false);
  const [typeSet, setType] = useState("security");
  const [message, setMessage] = useState("");
  const { id } = useParams();
  const [dataResponse, setDataResponse] = useState(null);
  const [isOpenModalLoader, setModalLoader] = useState(false);
  const [typeSurat, setTypeSurat] = useState("");
  function loaderHandler(bool) {
    setModalLoader(bool);
  }
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
    setModalLoader(true);
    const { biayaService, biayaBarang, ppn } = dataBottom;

    const dataSave = {
      id: dataTop.id,
      taskType: "security",
      letterHead: dataTop.letterHead || "",
      letterFooter: dataTop.letterFooter || "",
      ppn,
      biayaBarang: biayaBarang.map((val) => ({
        ...val,
        idTask: id * 1,
        totalHarga: val.quantity * val.price || 0,
        nama: val.nama || "-",
        unit: val.unit || "-",
        price: val.price || 0,
        quantity: val.quantity || 0,
      })),
      biayaService: biayaService.map((val) => ({
        ...val,
        idTask: id * 1,
        totalHarga: val.quantity * val.price || 0,
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
            cardTaskCategory: "security",
            cardTaskId: id * 1,
          },
        ],
      }),
    };
    console.log("--dataSave", dataSave);
    axios
      .post(
        `${constants.IMPLEMENTATION_SERVICE}/saveOrUpdatePenawaranHargaVendor`,
        dataSave
      )
      .then((res) => {
        console.log("res.data", res.data);
        setOpenSuccessPopUp(true);
        setModalLoader(false);
      })
      .catch((err) => {
        console.log("~err", err);
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
    doFetchHargaPenawaranVendorSecurity(loaderHandler, id)
      .then((response) => {
        console.log("response", response);
        if (response) {
          setDataResponse(response);
          const resDataTop = {
            id,
            noTicket: response.noTicket,
            requestDate:
              response.requestDate != null
                ? moment.unix(response.requestDate / 1000).format("DD-MM-YYYY")
                : "-",
            userRequest:
              response.userRequest != null ? response.userRequest : "-",
            dueDate:
              response.dueDate != null
                ? moment.unix(response.dueDate / 1000).format("DD-MM-YYYY")
                : "-",
            idMachine: response.idMachine,
            address: response.address,
            area: response.area,
            city: response.city,
            idLocation: response.idLocation != null ? response.idLocation : "-",
            jenisPekerjaan: response.jenisPekerjaan,
            latLong: response.latLong,
            locationName: response.locationName,
            namaVendor: response.namaVendor,
            tangalSurat: response.tanggalSurat,
            noTlpPerusahaan: response.noTlpPerusahaan,
            alamatPerusahaan: response.alamatPerusahaan,
            logoPerusahaan: response.logoPerusahaan,
            nomerSurat: response.nomerSurat,
            tempat: response.tempat,
            ttd: response.ttd,
            noteDesc: response.noteDesc,
            letterFooter: response.letterFooter,
            letterHead: response.letterHead,
            approvalApprover: response.approper,
            listComment: response.listComment,
            hal: response.hal,
            jabatan: response.jabatan,
            nama: response.namaVendor,
          };
          setDataTop(resDataTop);
          console.log(resDataTop);
          const resDataBottom = {
            biayaBarang: response.listBiayaBarang,
            biayaService: response.listBiayaJasa,
            ppn: response.ppn !== null ? response.ppn : 10,
            status: response.status,
            approvalStatus: response.approvalStatus,
          };
          setDataBottom(resDataBottom);
          console.log("Data Bottom", resDataBottom);
        }
      })
      .catch((err) => {
        console.log("Error Get Detail", err);
        alert(`Terjadi Kesalahan:${err}`);
      });
  }, []);

  function handleGetTotal(val) {
    console.log("+++ total penawaran:", val);
    setTotalBiaya(val);
  }
  const saveComment = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const dataHit = {
        message,
        cardTaskCategory: "security",
        cardTaskId: id,
        userId,
        userName: userFullName,
      };
      doSaveComment(loaderHandler, dataHit)
        .then((res) => {
          console.log("~ res.data", res.data);
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
        <Typography className={classes.title}> Penawaran Harga</Typography>
        {/*Container*/}
        <Grid
          container
          direction="column"
          style={{ marginTop: 20 }}
          spacing={4}
        >
          {/* Top Component*/}
          <Grid item>
            <TopComponent
              content={dataTop}
              messageHandler={handleMessage}
              onMessageEnter={saveComment}
            />
          </Grid>
          <Grid item>
            <BottomComponent
              content={dataBottom}
              onSubmit={handleSubmit}
              setData={setDataBottom}
              typeSurat={(e) => setTypeSurat(e)}
              onChangeTotal={handleGetTotal}
              onFinishUploadHeader={handleFileHeader}
              onFinishUploadFooter={handleFileFooter}
              onViewSurat={(e) => setOpenViewSurat(e)}
              onViewNotEditSurat={(e) => setOpenNotEditSurat(e)}
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
        dataSurat={dataTop}
        typeSet={typeSet}
        typeView={typeSurat}
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
  connect(mapStateToProps)(withTranslation("translations")(createKeamanan))
);
