import React, { useState, useEffect, useContext } from "react";
import {
  Modal,
  Box,
  Grid,
  Typography,
  Button,
  IconButton,
  InputBase,
} from "@material-ui/core";
import { Select } from "antd";
import { useHistory, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/styles";
import constants from "../../../helpers/constants";
import { PrimaryHard } from "../../../assets/theme/colors";
import SelectMui from "../common/SelectMui";
import ImageSelector from "../../ImageSelector";
import InputBordered from "../common/InputComponent";
import { doUploadPhoto } from "../../../containers/Implementation/ApiServiceImplementation";
import { doGetVendors } from "../../../containers/UserManagement/ApiServicesUser";
import { doAddNewOrderTicketing, doGetConfigAttributes } from "../../../containers/VendorManagement/ApiServices";
import { ReactComponent as CloseButton } from "../../../assets/icons/siab/x-new.svg";
import ErrorComponent from "../../../containers/Implementation/cimb/TaskKebutuhan/CreateKebutuhan/ErrorComponent";
import SuccessPopUp from "../common/SuccesPopUp";
import { RootContext } from "../../../router";
import AutoCompleteByAtmId from "../../AutoCompleteByAtmId";

const { Option } = Select;

const DeleteIconButton = withStyles(() => ({
  root: {
    backgroundColor: "#DC241F75",
    color: "#fff",
    "&:hover": {
      color: "#DC241F",
      backgroundColor: "#fff8f8cc",
    },
  },
}))(IconButton);
const useStyles = makeStyles({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    position: "relative",
    overflow: "auto",
    overflowX: "hidden",
    "&::-webkit-scrollbar": {
      width: "5px",
    },
    "&::-webkit-scrollbar-track": {
      background: "#F4F7FB",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#BCC8E7",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: "#9AC2FF",
    },
    backgroundColor: constants.color.white,
    width: 800,
    minHeight: "550px",
    height: "570px",
    borderRadius: 10,
    padding: 30,
  },
  imageUploadContainer: {
    position: "relative",
  },
  imgDefault: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    width: "0.1px",
    height: "0.1px",
    opacity: 0,
    overflow: "hidden",
    position: "absolute",
    zIndex: -1,
  },
  resetImage: {
    position: "absolute",
    width: "15px",
    height: "15px",
    top: -10,
    right: -10,
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
const SmallInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
    padding: 0,
  },
  input: {
    borderRadius: 6,
    position: "relative",
    backgroundColor: (props) => props.backgroundColor, // theme.palette.common.white,
    fontSize: 15,
    width: "100%",
    height: "100%",
    padding: "7px 9px",
    border: "1px solid #BCC8E7",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    "&:focus": {
      borderColor: PrimaryHard,
    },
  },
}))(InputBase);

const defaultDataTicket = {
  ticketId: "-",
  locationId: "-",
  mesinId: "-",
  locationName: "-",
};

// eslint-disable-next-line react/prop-types
const TicketingNew = ({ refresh, isOpen, onClose, dataTicket = defaultDataTicket}) => {
  const { modal, paper, primaryButton, secondaryButton } = useStyles();
  const { userId, userFullName } = useContext(RootContext);
  const [openSuccessPopUp, setOpenSuccessPopUp] = useState(false);
  // const { ticketingId } = useParams();
  const [dataRequest, setDataRequest] = useState({
    id: null,
    timestamp: null,
    implementationId: null,
    idMesin: null,
    locationId: null,
    locationName: null,
    status: 0,
    taskTitle: "-",
    notesDescription: "",
    picVendorId: "-",
    photoList: [],
  });
  const [errorValidation, setErrorValidation] = useState({
    idMesin: false,
    notesDescription: false,
    picVendorId: false,
    taskTitle: false,
  });
  const [photoFront, setPhotoFront] = useState("");
  const [photoLeft, setPhotoLeft] = useState("");
  const [photoRight, setPhotoRight] = useState("");
  const [photoRear, setPhotoRear] = useState("");

  const [jenisPekerjaanOption, setJenisPekerjaanOption] = useState([
    { value: "-", name: "-Pilih Jenis Pekerjaan-" },
  ]);
  const [isLoadJenisPekerjaan, setIsLoadJenisPekerjaan] = useState(false);
  const [vendorsOption, setVendorsOption] = useState([
    { value: "-", name: "Pilih Nama Vendor" },
  ]);
  const [isLoadVendors, setIsLoadVendors] = useState(false);

  const [loadingAddNew, setLoadingAddNew] = useState(false);

  const handleChangeRequest = (newVal, attribut) => {
    // console.log(`+++ ${state}: ${newVal}`);
    setDataRequest((prevValue) => {
      return {
        ...prevValue,
        [attribut]: newVal,
      };
    });
  };

  function loadAddNewHandler(bool) {
    setLoadingAddNew(bool);
  }
  function loadVendorsHandler(bool) {
    setIsLoadVendors(bool);
  }

  function loadJenisPekerjaanHandler(bool) {
    setIsLoadJenisPekerjaan(bool);
  }
  function handleError(keyname, bool) {
    // eslint-disable-next-line default-case
    setErrorValidation((prevVal) => {
      return {
        ...prevVal,
        [keyname]: bool,
      };
    });
  }
  function validateForm() {
    let errorCount = 0;

    if (
      dataRequest.taskTitle === "" ||
      dataRequest.taskTitle === "-" ||
      dataRequest.taskTitle === null
    ) {
      handleError("taskTitle", true);
      errorCount += 1;
    } else {
      handleError("taskTitle", false);
    }
    if (
      dataRequest.picVendorId === "" ||
      dataRequest.picVendorId === "-" ||
      dataRequest.picVendorId === null
    ) {
      handleError("picVendorId", true);
      errorCount += 1;
    } else {
      handleError("picVendorId", false);
    }

    if (dataRequest.notesDescription === "") {
      handleError("notesDescription", true);
      errorCount += 1;
    } else {
      handleError("notesDescription", false);
    }

    return errorCount;
  }
  // useEffect(()=>{
  //   console.log("ticketid", dataTicket);
  // },[]);
  const handleSubmitNewOrder = async () => {

    const errorCount = validateForm();
    if (errorCount > 0) {
      alert("Harap lengkapi data terlebih dahulu !");
    } else {
      // setOnSuccessSubmit(true);

      // Handle Photo Files
      const reqPhotoFront = { path: null, url: null };
      const reqPhotoRight = { path: null, url: null };
      const reqPhotoLeft = { path: null, url: null };
      const reqPhotoRear = { path: null, url: null };

      const doUploadPhotos = async (arr) => {
        if (arr.length > 0) {
          loadAddNewHandler(true);
          await Promise.all(
            arr.map(async (item) => {
              const { docKey } = item;

              await doUploadPhoto(item.file)
                .then((res) => {
                  // console.log("data res", res);
                  // console.log("docKey", docKey);
                  if (res.status === 200) {
                    if (res.data.responseCode === "00") {
                      // eslint-disable-next-line default-case
                      switch (docKey) {
                      case "photoFront":
                        reqPhotoFront.path = res.data.path;
                        break;
                      case "photoLeft":
                        reqPhotoLeft.path = res.data.path;
                        break;
                      case "photoRight":
                        reqPhotoRight.path = res.data.path;
                        break;
                      case "photoRear":
                        reqPhotoRear.path = res.data.path;
                        break;
                      }
                    } else {
                      alert(res.data.responseMessage);
                    }
                  }
                })
                .catch((err) => {
                  alert(`Failed to upload file ${err}`);
                  loadAddNewHandler(false);
                });
            })
          );
        }
      };
      await doUploadPhotos(dataRequest.photoList);

      const dataHit = {
        userId,
        userName: userFullName,
        id: dataTicket.ticketId,
        timestamp: null,
        implementationId: null,
        mesinId: dataTicket.mesinId,
        locationId: dataTicket.locationId,
        locationName: dataTicket.locationName,
        status: 0,
        taskTitle: dataRequest.taskTitle,
        notesDescription: dataRequest.notesDescription,
        picVendorId: dataRequest.picVendorId,
        photoFrontVendor: reqPhotoFront.path,
        photoRightVendor: reqPhotoRight.path,
        photoLeftVendor: reqPhotoLeft.path,
        photoRearVendor: reqPhotoRear.path,
      };
      console.log("+++ dataHit", dataHit);

      doAddNewOrderTicketing(loadAddNewHandler, dataHit)
        .then((response) => {
          console.log("+++ response Hit", response);
          if (response) {
            if (response.responseCode === "00") {
              // onSuccessSubmit("ID-009 (dummy)")
              // refresh();
              setOpenSuccessPopUp(true);
              setLoadingAddNew(true);
            }
          }
        })
        .catch((err) => {
          alert(`Terjadi Kesalhan: ${err}`);
        });
      /* setTimeout(() => {
        setOnSuccessSubmit(false);
      }, 1000); */
    }
  };
  // FOTO

  useEffect(() => {
    if (photoFront !== "") {
      const oldDataList = dataRequest.photoList.slice();
      const newDataList = [...oldDataList];
      const newObj = {
        docKey: "photoFront",
        file: photoFront,
      };
      newDataList.push(newObj);
      handleChangeRequest(newDataList, "photoList");
    } else {
      const oldDataList = dataRequest.photoList.slice();
      let newDataList = [...oldDataList];
      newDataList = newDataList.filter(function (item) {
        return item.docKey !== "photoFront";
      });
      handleChangeRequest(newDataList, "photoList");
    }
  }, [photoFront]);

  useEffect(() => {
    if (photoRight !== "") {
      const oldDataList = dataRequest.photoList.slice();
      const newDataList = [...oldDataList];
      const newObj = {
        docKey: "photoRight",
        file: photoRight,
      };
      newDataList.push(newObj);
      handleChangeRequest(newDataList, "photoList");
    } else {
      const oldDataList = dataRequest.photoList.slice();
      let newDataList = [...oldDataList];
      newDataList = newDataList.filter(function (item) {
        return item.docKey !== "photoRight";
      });
      handleChangeRequest(newDataList, "photoList");
    }
  }, [photoRight]);

  useEffect(() => {
    if (photoLeft !== "") {
      const oldDataList = dataRequest.photoList.slice();
      const newDataList = [...oldDataList];
      const newObj = {
        docKey: "photoLeft",
        file: photoLeft,
      };
      newDataList.push(newObj);
      handleChangeRequest(newDataList, "photoList");
    } else {
      const oldDataList = dataRequest.photoList.slice();
      let newDataList = [...oldDataList];
      newDataList = newDataList.filter(function (item) {
        return item.docKey !== "photoLeft";
      });
      handleChangeRequest(newDataList, "photoList");
    }
  }, [photoLeft]);

  useEffect(() => {
    // console.log("+++ photoRear", JSON.stringify(photoRear));
    if (photoRear !== "") {
      const oldDataList = dataRequest.photoList.slice();
      const newDataList = [...oldDataList];
      const newObj = {
        docKey: "photoRear",
        file: photoRear,
      };
      newDataList.push(newObj);
      handleChangeRequest(newDataList, "photoList");
    } else {
      const oldDataList = dataRequest.photoList.slice();
      let newDataList = [...oldDataList];
      newDataList = newDataList.filter(function (item) {
        return item.docKey !== "photoRear";
      });
      handleChangeRequest(newDataList, "photoList");
    }
  }, [photoRear]);
  // const handleClose = () => {
  //   setOnSuccessSubmit(false);
  //   // history.go(0);
  //   // console.log("handle close");
  // };

  // GET OPTION VENDORS
  useEffect(() => {
    if (isOpen) {
      doGetVendors(loadVendorsHandler).then((response) => {
        // console.log(">>>> doFetchDataVendor :", JSON.stringify(response));
        if (response?.length > 0) {
          const options = [{ value: "-", name: "Pilih Nama Vendor" }];
          response.map((item) => {
            const newObj = { value: item.id, name: item.name };
            options.push(newObj);
          });
          setVendorsOption(options);
        }
      });
      doGetConfigAttributes(loadJenisPekerjaanHandler).then((response) => {
        // console.log(">>>> doFetchDataVendor :", JSON.stringify(response));
        if (response) {
          if (response.responseCode === 200) {
            const resAttributes = response.data.configAttributeList;
            const options = [{ value: "-", name: "-Pilih Jenis Pekerjaan-" }];
            resAttributes.map((item) => {
              const newObj = { value: item.name, name: item.name };
              options.push(newObj);
            });
            setJenisPekerjaanOption(options);
          }
        }
      });
    }
  }, [isOpen]);
  return (
    <Modal
      className={modal}
      open={isOpen}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Box className={paper}>
        <Grid container justify="flex-end" alignItems="stretch">
          <CloseButton onClick={onClose} style={{ cursor: "pointer" }} />
        </Grid>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Typography
              variant="h5"
              component="h5"
              align="center"
              style={{ color: "#374062", fontWeight: 600, fontSize: "36px" }}
            >
              Add New Order
            </Typography>
          </Grid>
          <Grid item style={{ margin: 50 }}>
            <Grid container spacing={4}>
              <Grid item xs={6}>
                <Grid container direction="column">
                  <Grid item style={{ paddingTop: 10 }}>
                    <Typography>No Ticket :</Typography>
                  </Grid>
                  <Grid item style={{ paddingTop: 10 }}>
                    <Typography style={{ fontWeight: 600 }}>
                      {dataTicket.ticketId}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid container direction="column">
                  <Grid item style={{ paddingTop: 10 }}>
                    <Typography>ID Location:</Typography>
                  </Grid>
                  <Grid item style={{ paddingTop: 10 }}>
                    <Typography style={{ fontWeight: 600 }}>
                      {dataTicket.locationId ? dataTicket.locationId : "-"}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid container spacing={4}>
              <Grid item xs={6}>
                <Grid container direction="column">
                  <Grid item>
                    <Typography>ID Mesin :</Typography>
                  </Grid>
                  <Grid item style={{ paddingTop: 15 }}>
                    <SmallInput
                      style={{
                        width: "100%",
                        height: "30px",
                        marginBottom: 10,
                      }}
                      value={dataTicket.mesinId}
                      disabled
                    />
                    {/* <AutoCompleteByAtmId
                      onChange={() => {
                        // console.log("+++ value", value);
                        const value = dataTicket.ticketId
                        if (value) {
                          handleChangeRequest(value.value, "mesinId");
                          handleChangeRequest(
                            value.locationName,
                            "locationName"
                          );
                          handleChangeRequest(
                            value.locationName,
                            "locationName"
                          );
                        }
                      }}
                    /> */}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid container direction="column">
                  <Grid item>
                    <Typography>Nama Lokasi :</Typography>
                  </Grid>
                  <Grid item style={{ paddingTop: 10 }}>
                    <Typography style={{ fontWeight: 600 }}>
                      {dataTicket.locationName
                        ? dataTicket.locationName
                        : "-"}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid container spacing={4}>
              <Grid item xs={6}>
                <Grid container direction="column">
                  <Grid item>
                    <Typography>Jenis Pekerjaan :</Typography>
                  </Grid>
                  <Grid item style={{ paddingTop: 10 }}>
                    <SelectMui
                      selectOptionData={jenisPekerjaanOption}
                      selectedValue={dataRequest.taskTitle}
                      onSelectValueChange={(newVal) =>
                        handleChangeRequest(newVal, "taskTitle")
                      }
                    />
                    {errorValidation.taskTitle ? (
                      <ErrorComponent label="Please Select One!" />
                    ) : null}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid container direction="column">
                  <Grid item>
                    <Typography>Nama Vendor :</Typography>
                  </Grid>
                  <Grid item style={{ paddingTop: 10 }}>
                    <SelectMui
                      selectOptionData={vendorsOption}
                      selectedValue={dataRequest.picVendorId}
                      onSelectValueChange={(newVal) =>
                        handleChangeRequest(newVal, "picVendorId")
                      }
                    />
                    {errorValidation.picVendorId ? (
                      <ErrorComponent label="Please Select One!" />
                    ) : null}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              container
              direction="column"
              style={{ marginTop: 10 }}
              spacing={3}
            >
              <Grid item>
                <Typography>Notes & Description :</Typography>
              </Grid>
              <Grid item>
                <InputBordered
                  multiline
                  rows={6}
                  style={{ width: "100%" }}
                  onChange={(e) => {
                    handleChangeRequest(e.target.value, "notesDescription");
                  }}
                  placeholder="Notes & Description"
                  value={dataRequest.notesDescription}
                />
                {errorValidation.notesDescription ? (
                  <ErrorComponent label="This Field is Required!" />
                ) : null}
              </Grid>
            </Grid>
            <Grid
              container
              direction="row"
              spacing={4}
              style={{ marginTop: 20 }}
            >
              <Grid item>
                <ImageSelector
                  isLarger
                  largerWidth={130}
                  largerMinHeight={90}
                  title="Depan"
                  onChange={(e) => setPhotoFront(e.target.files[0])}
                  selectedImage={photoFront}
                  onDelete={() => setPhotoFront("")}
                />
              </Grid>
              <Grid item>
                <ImageSelector
                  isLarger
                  largerWidth={130}
                  largerMinHeight={90}
                  title="Kanan"
                  onChange={(e) => setPhotoRight(e.target.files[0])}
                  selectedImage={photoRight}
                  onDelete={() => setPhotoRight("")}
                />
              </Grid>
              <Grid item>
                <ImageSelector
                  isLarger
                  largerWidth={130}
                  largerMinHeight={90}
                  title="Kiri"
                  onChange={(e) => setPhotoLeft(e.target.files[0])}
                  selectedImage={photoLeft}
                  onDelete={() => setPhotoLeft("")}
                />
              </Grid>
              <Grid item>
                <ImageSelector
                  isLarger
                  largerWidth={130}
                  largerMinHeight={90}
                  title="Belakang"
                  onChange={(e) => setPhotoRear(e.target.files[0])}
                  selectedImage={photoRear}
                  onDelete={() => setPhotoRear("")}
                />
              </Grid>
            </Grid>
            <Grid
              container
              alignItems="stretch"
              style={{ marginTop: 5, marginLeft: 15 }}
            >
              <Typography
                style={{ fontWeight: 400, color: "#8D98B4", fontSize: 12 }}
              >
                *Tolong upload foto sesuai dengan keterangan yang tersedia
              </Typography>
            </Grid>
            <Grid container style={{ marginTop: 20, marginBottom: 20 }}>
              {openSuccessPopUp === true ? (
                <SuccessPopUp onClose={onClose} />
              ) : (
                ""
              )}
            </Grid>
            <Grid container style={{ marginTop: 20 }} justify="space-between">
              <Grid item>
                <Button
                  variant="contained"
                  disableElevation
                  className={secondaryButton}
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
                  className={primaryButton}
                  onClick={handleSubmitNewOrder}
                  style={{ textTransform: "capitalize" }}
                  disabled={loadingAddNew}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};
TicketingNew.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
  onSuccessSubmit: PropTypes.func.isRequired,
  dataTicket: PropTypes.object.isRequired,
};

export default TicketingNew;
