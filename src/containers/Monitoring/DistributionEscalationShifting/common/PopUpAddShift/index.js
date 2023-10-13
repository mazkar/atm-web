import React, { useState } from "react";
import {
  Modal,
  Box,
  Grid,
  IconButton,
  Typography,
  Button,
} from "@material-ui/core";
import { Row, Col, Input, DatePicker, Select } from "antd";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { Close } from "@material-ui/icons";
import moment from "moment";
import InputBase from "@material-ui/core/InputBase";
import PropTypes from "prop-types";
import axios from "axios";
import { useHistory } from "react-router-dom";
import constants from "../../../../../helpers/constants";
import ModalLoader from "../../../../../components/ModalLoader";
import PopupSucces from "../../../../../components/PopupSucces";
import ModalUploadSuccess from "../../../../Modeling/ModelingModel/ModalUploadSuccess";
import ModalUploadError from "../../../../Modeling/ModelingModel/ModalUploadError";
import secureStorage from "../../../../../helpers/secureStorage";
import ModalAddSuccess from "../../../../ProjectManagement/TimelineProject/widget/Modal/ModalAddSuccess";
import ModalAddError from "../../../../ProjectManagement/TimelineProject/widget/Modal/ModalAddError";
import { PrimaryHard } from "../../../../../assets/theme/colors";
import { ReactComponent as ArrowDown } from "../../../../../assets/icons/duotone-red/arrow-alt-down.svg";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { CalendarOutlined } from "@ant-design/icons";
import PopupConfirmation from "../../../../../components/PopUpConfirmation";
const accessToken = secureStorage.getItem("access_token");

const ddlStatus = [
  {
    id: 0,
    status: "Active",
  },
  {
    id: 1,
    status: "In Active",
  },
];

const ddlPic = [
  {
    id: 1,
    status: "DW",
  },
  {
    id: 2,
    status: "HS",
  },
  {
    id: 3,
    status: "MR",
  },
];

const ddlJam = [
  {
    id: 1,
    status: "08:00",
  },
  {
    id: 2,
    status: "12:00",
  },
  {
    id: 3,
    status: "18:00",
  },
];

const ddlShift = [
  {
    id: 1,
    status: "1",
  },
  {
    id: 2,
    status: "2",
  },
  {
    id: 3,
    status: "3",
  },
];

const useStyles = makeStyles({
  root: {
    padding: "30px 20px 20px 30px",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    // position: "absolute",
    backgroundColor: constants.color.white,
    width: 780,
    // height: 423,
    borderRadius: 10,
    padding: 30,
    paddingLeft: 70,
    paddingBottom: 50,
  },
  closeIcon: {
    color: constants.color.primaryHard,
  },
  buttonUpload: {
    color: constants.color.white,
    backgroundColor: constants.color.primaryHard,
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
    borderRadius: "8px",
    height: 44,
    width: "95px",
    marginTop: "-71px",
    marginLeft: "575px",
    zIndex: 3,
    textTransform: "capitalize",
  },
  buttonCancel: {
    // margin: "45px",
    backgroundColor: constants.color.primaryHard,
    color: "white",
    textTransform: "capitalize",
    "& .MuiButton-root": {
      width: "100px",
      "&:hover": {
        backgroundColor: constants.color.primaryHard,
        opacity: 0.8,
      },
    },
  },
  buttonContainer: {
    marginTop: 100,
  },
  textField: {
    "& .MuiInputBase-root": {
      width: 670,
      border: "1px solid",
      borderColor: "#BCC8E7",
      borderRadius: "6px",
    },
    "& .MuiInputBase-input": {
      // right: '-20px',
    },
    "& .MuiOutlinedInput-input": {
      "&: hover": {
        background: "#F4F7FB",
      },
    },
    "& .MuiButton-root": {
      "&:hover": {
        backgroundColor: constants.color.primaryHard,
        opacity: 0.9,
      },
    },
  },
  inputExcel: {
    // display: 'none',
    position: "relative",
    marginBottom: 15,
    // marginLeft: -150,
  },
  uploadFile: {
    cursor: "pointer",
    width: "100%",
    border: "1px solid #BCC8E7",
    borderRadius: 8,
    display: "flex",
    justifyItems: "space-between",
    height: 45,
  },
  primaryButton: {
    color: constants.color.white,
    backgroundColor: constants.color.primaryHard,
    padding: "14px 36px",
    borderRadius: 10,
    width: 100,
    height: 40,
    marginRight: 40,
  },
  secondaryButton: {
    color: constants.color.primaryHard,
    backgroundColor: constants.color.white,
    padding: "14px 36px",
    borderRadius: 10,
    border: "1px solid",
    borderColor: `${constants.color.primaryHard}`,
    width: 100,
    height: 40,
  },
  text1: {
    lineHeight: 2,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 15,
    position: "relative",
  },
  labelInput: {
    fontWeight: 400,
    fontSize: 15,
    fontFamily: "Barlow",
    fontStyle: "normal",
  },
});

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    width: 250,
    height: 25,
    borderRadius: 10,
    position: "relative",
    border: "0px solid #BCC8E7",
    // backgroundColor: '#F4F7FB',
    fontSize: 13,
    padding: "10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: ["Barlow", "NunitoRegular"].join(","),
    "&:focus": {
      // boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
      right: "-20px",
      outline: "none",
    },
  },
}))(InputBase);

const PopUpAddShift = ({
  isOpen,
  onClose,
  onSuccesUpload,
  refresh,
  isEdit,
}) => {
  const {
    root,
    modal,
    paper,
    closeIcon,
    buttonUpload,
    buttonCancel,
    textField,
    inputExcel,
    uploadFile,
    buttonContainer,
    primaryButton,
    secondaryButton,
  } = useStyles();
  const classes = useStyles();

  // const today = new Date();
  // const year = today.getFullYear();

  const inputFileRef = React.useRef(null);
  const history = useHistory();
  // const [uploadDate, setUploadDate] = useState(today);
  const [openModalAddSuccess, setOpenModalAddSuccess] = useState(false);
  const [openModalEditSuccess, setOpenModalEditSuccess] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  function loaderHandler(bool) {
    setIsUploading(bool);
  }
  const [OpenModalUploadError, setOpenModalUploadError] = React.useState(false);
  const [isOpenModalLoader, setModalLoader] = useState(false);
  const [messageUpload, setMessageUpload] = React.useState("");
  const handleCloseModalUploadError = () => setOpenModalUploadError(false);
  const handleCloseModalUploadSuccess = () => {
    setOpenModalAddSuccess(false);
    setOpenModalEditSuccess(false);
  };
  const [payload, setPayload] = useState({
    id: noId,
    pic: "",
    jadwal: "",
    startShift: "",
    endShift: "",
    shift: "",
    status: "active",
  });

  // data for body
  const [noId, setNoId] = useState("");
  const [sureAdd, setSureAdd] = useState(false);

  function handleChangePayload(event, key) {
    setPayload((prev) => {
      return {
        ...prev,
        [key]: event,
      };
    });
  }

  // handle submit
  const handleSubmitAdd = () => {
    if (isEdit) {
      setOpenModalEditSuccess(true);
    } else {
      setOpenModalAddSuccess(true);
    }
    console.log(payload);
  };

  // handle Open confirmation
  const handleConfirmSubmit = () => {
    setSureAdd(true);
  };

  // handle close confirmation
  const handleCloseSureAdd = () => {
    setSureAdd(false);
  };

  if (onClose === false) {
    setPayload({});
  }

  return (
    <div className={root}>
      <Modal
        className={modal}
        open={isOpen}
        onClose={onClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Box className={paper}>
          <Grid container justify="flex-end">
            <Grid item>
              <IconButton onClick={onClose}>
                <Close className={closeIcon} />
              </IconButton>
            </Grid>
          </Grid>

          <Grid container justify="center" direction="column" spacing={5}>
            <Grid
              item
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h4"
                component="h4"
                style={{ marginBottom: 40, fontSize: 36, fontWeight: 500 }}
              >
                {isEdit ? "Edit Shift" : "Tambah Shift"}
              </Typography>
            </Grid>
            <Row gutter={24} style={{ marginTop: 20, display: "flex" }}>
              <Col gutter="row" xl={12}>
                <div className={classes.inputContainer}>
                  <Typography className={classes.labelInput}>
                    Shifting ID :
                  </Typography>
                  <Typography
                    style={{
                      fontSize: 15,
                      fontWeight: 600,
                      fontFamily: "Barlow",
                    }}
                  >
                    2123
                  </Typography>
                </div>

                <div className={classes.inputContainer}>
                  <Typography className={classes.labelInput}>
                    Nama PIC :
                  </Typography>
                  <Select
                    placeholder="Masukan Nama PIC"
                    size="large"
                    dropdownStyle={{ zIndex: 9999 }}
                    suffixIcon={
                      <ExpandMoreIcon style={{ color: PrimaryHard }} />
                    }
                    style={{
                      width: "90%",
                      borderRadius: 10,
                      color: PrimaryHard,
                    }}
                    onChange={(newVal) => handleChangePayload(newVal, "pic")}
                  >
                    {ddlPic.map((inv) => (
                      <Select.Option value={inv.id}>{inv.status}</Select.Option>
                    ))}
                  </Select>
                </div>

                <div className={classes.inputContainer}>
                  <Typography className={classes.labelInput}>
                    Start Shift :
                  </Typography>
                  <Select
                    placeholder="Pilih Start Shift"
                    size="large"
                    dropdownStyle={{ zIndex: 9999 }}
                    suffixIcon={
                      <ExpandMoreIcon style={{ color: PrimaryHard }} />
                    }
                    style={{
                      width: "90%",
                      borderRadius: 10,
                    }}
                    onChange={(newVal) =>
                      handleChangePayload(newVal, "startShift")
                    }
                  >
                    {ddlJam.map((inv) => (
                      <Select.Option value={inv.id}>{inv.status}</Select.Option>
                    ))}
                  </Select>
                </div>

                <div className={classes.inputContainer}>
                  <Typography className={classes.labelInput}>
                    Shift :
                  </Typography>
                  <Select
                    placeholder="Pilih Shift"
                    size="large"
                    suffixIcon={
                      <ExpandMoreIcon style={{ color: PrimaryHard }} />
                    }
                    dropdownStyle={{ zIndex: 9999 }}
                    style={{
                      width: "90%",
                      borderRadius: 10,
                    }}
                    onChange={(newVal) => handleChangePayload(newVal, "shift")}
                  >
                    {ddlShift.map((inv) => (
                      <Select.Option value={inv.id}>{inv.status}</Select.Option>
                    ))}
                  </Select>
                </div>
              </Col>

              {/* kolom kanan */}

              <Col gutter="row" xl={12}>
                <div className={classes.inputContainer}>
                  <Typography className={classes.labelInput}>
                    User ID :
                  </Typography>
                  <Typography
                    style={{
                      fontSize: 15,
                      fontWeight: 600,
                      fontFamily: "Barlow",
                    }}
                  >
                    1222
                  </Typography>
                </div>
                <div className={classes.inputContainer}>
                  <Typography className={classes.labelInput}>
                    Jadwal :
                  </Typography>
                  <Input.Group compact>
                    <DatePicker
                      placeholder="Masukan Jadwal"
                      popupStyle={{ zIndex: 9999 }}
                      suffixIcon={
                        <CalendarOutlined
                          style={{ color: PrimaryHard, fontSize: 18 }}
                        />
                      }
                      required
                      style={{
                        width: "90%",
                        height: "40px",
                        borderRadius: 10,
                      }}
                      onChange={(newVal) =>
                        handleChangePayload(newVal, "jadwal")
                      }
                    />
                  </Input.Group>
                </div>

                <div className={classes.inputContainer}>
                  <Typography className={classes.labelInput}>
                    End Shift :
                  </Typography>
                  <Select
                    placeholder="Pilih End Shift"
                    size="large"
                    suffixIcon={
                      <ExpandMoreIcon style={{ color: PrimaryHard }} />
                    }
                    dropdownStyle={{ zIndex: 9999 }}
                    style={{
                      width: "90%",
                      borderRadius: 10,
                    }}
                    onChange={(newVal) =>
                      handleChangePayload(newVal, "endShift")
                    }
                  >
                    {ddlJam.map((inv) => (
                      <Select.Option value={inv.id}>{inv.status}</Select.Option>
                    ))}
                  </Select>
                </div>

                <div className={classes.inputContainer}>
                  <Typography className={classes.labelInput}>
                    Status :
                  </Typography>
                  <Select
                    defaultValue={0}
                    placeholder="Pilih Status"
                    suffixIcon={
                      <ExpandMoreIcon style={{ color: PrimaryHard }} />
                    }
                    size="large"
                    dropdownStyle={{ zIndex: 9999 }}
                    style={{
                      width: "90%",
                      borderRadius: 10,
                    }}
                    onChange={(newVal) => handleChangePayload(newVal, "status")}
                  >
                    {ddlStatus.map((inv) => (
                      <Select.Option value={inv.id}>{inv.status}</Select.Option>
                    ))}
                  </Select>
                </div>
              </Col>
            </Row>

            <Grid container justify="space-between" className={buttonContainer}>
              <Grid item>
                <Button
                  variant="outlined"
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
                  onClick={handleConfirmSubmit}
                  style={{ textTransform: "capitalize" }}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Modal>

      <PopupConfirmation
        isOpen={sureAdd}
        message={
          isEdit
            ? "Anda yakin ingin memperbarui shift ini?"
            : "Anda yakin ingin menambahkan shift ini?"
        }
        desc="Anda tidak dapat membatalkan tindakan ini"
        onSubmit={handleSubmitAdd}
        onClose={handleCloseSureAdd}
        onLeave={handleCloseSureAdd}
      />

      <ModalLoader isOpen={isOpenModalLoader} />
      <PopupSucces
        isOpen={openModalAddSuccess}
        onClose={handleCloseModalUploadSuccess}
        onLeave={() => {
          handleCloseModalUploadSuccess();
        }}
        message="Berhasil Menambah Shift"
      />

      <PopupSucces
        isOpen={openModalEditSuccess}
        onClose={handleCloseModalUploadSuccess}
        onLeave={() => {
          handleCloseModalUploadSuccess();
        }}
        message="Berhasil Memperbarui Shift"
      />

      <ModalAddError
        isOpen={OpenModalUploadError}
        onClose={handleCloseModalUploadError}
        onLeave={() => {
          handleCloseModalUploadError();
        }}
        message={messageUpload}
      />
    </div>
  );
};

PopUpAddShift.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccesUpload: PropTypes.func.isRequired,
};

export default PopUpAddShift;
