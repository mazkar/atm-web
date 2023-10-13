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
import constants from "../../../../../helpers/constants";
import ModalLoader from "../../../../../components/ModalLoader";
import { RootContext } from "../../../../../router";
import moment from "moment";
import axios from "axios";
import { dataCard } from "../../index";
import TopComponent from "./topComponent";
import BottomComponent from "./bottomComponent";
import KopSuratNotif from "../../common/PopUp/kopSuratNotif";
import SuccessPopUp from "../../common/PopUp/successPopUp";
import ViewSuratPopUp from "../../common/PopUp/viewSurat";
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
    area: "",
    city: "",
    idLocation: "",
    jenisPekerjaan: "",
    letterHead: "",
    letterFooter: "",
    latLong: "",
    locationName: "",
    namaVendor: "",
    noteDesc: "",
    tangalSurat: "",
    noTlpPerusahaan: "",
    alamatPerusahaan: "",
    logoPerusahaan: "",
    nomerSurat: "",
    tempat: "",
    ttd: "",
  });
  const [dataBottom, setDataBottom] = useState({
    approvalStatus: "",
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
  const [successLabel, setSuccessLabel] = useState("Penawaran Diterima");
  const [openViewSurat, setOpenViewSurat] = useState(false);
  const [message, setMessage] = useState("");
  const { id } = useParams();
  const [dataResponse, setDataResponse] = useState(null);
  const [isOpenModalLoader, setModalLoader] = useState(false);
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
          taskType: "security",
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
        } else if (
          res.data.responseMessage === "You have Approved this Task"
        ) {
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
    doFetchHargaPenawaranVendorSecurity(loaderHandler, id)
      .then((response) => {
        console.log("response", response);
        if (response) {
          setDataResponse(response);
          const resDataTop = {
            id,
            noTicket: response.noTicket,
            requestDate:response.requestDate != null
              ? moment.unix(response.requestDate / 1000).format("DD-MM-YYYY")
              : "-",
            userRequest: response.userRequest,
            dueDate: response.dueDate != null
              ? moment.unix(response.dueDate / 1000).format("DD-MM-YYYY")
              : "-",
            idMachine: response.idMachine,
            address: response.address,
            area: response.area,
            city: response.city,
            idLocation: response.idLocation,
            jenisPekerjaan: response.jenisPekerjaan,
            latLong: response.latLong,
            locationName: response.locationName,
            approvalApprover: response.approper,
            letterFooter: response.letterFooter,
            letterHead: response.letterHead,
            namaVendor: response.namaVendor,
            noteDesc: response.noteDesc,
            tangalSurat: response.tangalSurat,
            noTlpPerusahaan: response.noTlpPerusahaan,
            alamatPerusahaan: response.alamatPerusahaan,
            logoPerusahaan: response.logoPerusahaan,
            nomerSurat: response.nomerSurat,
            tempat: response.tempat,
            ttd: response.ttd,
          };
          setDataTop(resDataTop);
          console.log(resDataTop);
          const resDataBottom = {
            biayaBarang: response.listBiayaBarang,
            biayaService: response.listBiayaJasa,
            ppn: response.ppn !== null ? response.ppn : 10,
            status: response.status,
            listComment: response.listComment,
            approvalStatus: response.approvalStatus,
            countApproval: response.countApproval,
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
  const saveComment = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const dataHit = {
        message,
        cardTaskCategory: "security",
        cardTaskId: id,
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
            <TopComponent content={dataTop} />
          </Grid>
          {/*Bottom Component*/}
          <Grid item>
            <BottomComponent
              content={dataBottom}
              onSubmit={handleSubmit}
              onViewSurat={(e) => setOpenViewSurat(e)}
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
        isOpen={openViewSurat}
        onClose={() => setOpenViewSurat(false)}
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
  connect(mapStateToProps)(withTranslation("translations")(createKeamanan))
);
