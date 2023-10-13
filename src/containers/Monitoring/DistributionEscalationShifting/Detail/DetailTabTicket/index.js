import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Checkbox,
  FormControl,
  Grid,
  InputBase,
  makeStyles,
  MenuItem,
  Select,
  Switch,
  Typography,
  withStyles,
  TextField,
} from "@material-ui/core";
import constansts from "../../../../../helpers/constants";
import { ReactComponent as DropDownIcon } from "../../../../../assets/icons/linear-red/chevron-down.svg";
import { ReactComponent as DropDownGrayIcon } from "../../../../../assets/icons/duotone-gray/chevron-down-gray.svg";
import { ReactComponent as SyncGreenIcon } from "../../../../../assets/icons/siab/sync-green.svg";
import { ReactComponent as SyncRedIcon } from "../../../../../assets/icons/siab/sync-red.svg";
import FotoSesudah1 from "../../../../../assets/images/Foto-ATM-sesudah-1.png";
import FotoSesudah2 from "../../../../../assets/images/Foto-ATM-sesudah-2.png";
import FotoSesudah3 from "../../../../../assets/images/Foto-ATM-sesudah-3.png";
import FotoSesudah4 from "../../../../../assets/images/Foto-ATM-sesudah-4.png";
import MinioDocComponent from "../../../../../components/MinioDocComponent";
import TableChips from "../../../../../components/Chips/TableChips";
import InputBordered from "../../../../../components/NewOrder/common/InputComponent";
import MuiButton from "../../../../../components/Button/MuiButton";
import { RootContext } from "../../../../../router";
import PopUpAssign from "../../common/PopUpAssign";
import PopUpConfirmation from "../../../../../components/PopUpConfirmation";
import PopUpRemark from "../../common/PopUpRemark";
import PopupSucces from "../../../../../components/PopupSucces";
import { ReactComponent as CallendarIcon } from "../../../../../assets/icons/linear-red/calendar.svg";
import { DatePicker } from "antd";

const SelectInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    display: "flex",
    alignItems: "center",
    border: `1px solid ${constansts.color.grayMedium}`,
    borderRadius: 8,
    fontFamily: "Barlow",
    fontSize: 13,
    padding: "16px 12px",
    width: "100%",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    "&:focus": {
      borderRadius: 8,
      border: `1px solid ${constansts.color.primaryMedium}`,
      backgroundColor: constansts.color.white,
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}))(InputBase);

const RedSwitch = withStyles({
  switchBase: {
    color: constansts.color.primaryHard,
    "&$checked": {
      color: constansts.color.grayMedium,
    },
    "&$checked + $track": {
      backgroundColor: constansts.color.graySoft,
    },
  },
  checked: {},
  track: {
    backgroundColor: constansts.color.primaryMedium,
  },
})(Switch);

const useStyles = makeStyles({
  detailTitle: {
    fontWeight: 600,
    fontSize: 13,
    color: constansts.color.grayMedium,
    borderBottom: `2px solid ${constansts.color.grayMedium}`,
    paddingBottom: 10,
    marginBottom: 20,
  },
  detailInfo: {
    fontSize: 15,
    fontWeight: 400,
    color: constansts.color.dark,
  },
  detailValue: {
    fontSize: 15,
    fontWeight: 600,
    color: constansts.color.dark,
  },
  select: {
    width: "100%",
    padding: 0,
    "& .MuiSelect-icon": {
      top: "unset",
      right: 5,
    },
  },
  buttonApprove: {
    margin: 10,
    paddingTop: 11,
    paddingBottom: 11,
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 14,
    backgroundColor: "#65D170",
    textTransform: "capitalize",
    color: constansts.color.white,
    boxShadow: "0px 6px 6px 0px rgba(220, 36, 31, 0.1)",
    borderRadius: "8px",
  },
  datePicker: {
    height: "40px",
    borderRadius: "6px",
    border: "1px solid #BCC8E7",
    width: "100%",
    "& .ant-picker-input > input::placeholder": {
      color: "#BCC8E7",
      fontStyle: "italic",
      textOverflow: "ellipsis !important",
      fontSize: 12,
    },
  },
});

const dummyFoto = [
  {
    src: FotoSesudah1,
    alt: "Sesudah 1",
  },
  {
    src: FotoSesudah2,
    alt: "Sesudah 2",
  },
  {
    src: FotoSesudah3,
    alt: "Sesudah 3",
  },
  {
    src: FotoSesudah4,
    alt: "Sesudah 4",
  },
];

const DetailTabTicket = () => {
  const [disableUPS, setDisableUPS] = useState(true);
  const classes = useStyles();

  const { userRoleName } = useContext(RootContext);
  const isAdmin = userRoleName?.toLowerCase().includes("admin");

  const [popUpAssign, setPopUpAssign] = useState(false);
  const [picSeted, setPicSeted] = useState(false);
  const [confirmAct, setConfirmAct] = useState(false);
  const [confirmType, setConfirmType] = useState("");
  const [openRemark, setOpenRemark] = useState(false);
  const [successAccept, setSuccessAccept] = useState(false);

  // FUNCTION HANDLER
  const handleCloseAssign = () => {
    setPopUpAssign(false);
  };

  const handleSubmitAssign = () => {
    alert("Berhasil submit");
  };

  const handleOpenConfirm = (type) => {
    setConfirmType(type);
    setConfirmAct(true);
  };

  const handleSubmitAccept = () => {
    setSuccessAccept(true);
    setConfirmAct(false);
  };

  const handleSubmitReject = () => {
    setOpenRemark(true);
    setConfirmAct(false);
  };

  const handleCloseRemark = () => {
    setOpenRemark(false);
  };

  const handleOpenAssign = (status) => {
    if (status === 1) {
      setPicSeted(true);
      setPopUpAssign(true);
    } else {
      setPicSeted(false);
      setPopUpAssign(true);
    }
  };

  //CHIP HANDLER

  function chipsHandler(type) {
    /*
      [props in table] : "color in chips component"
    */
    const condition = {
      done: "success",
      assigned: "info",
      onprogress: "warning",
      open: "purple",
      unprocessed: "error",
      overdue: "default",
    };

    return condition[type] ?? "default";
  }
  //END CHIP HANDLER

  useEffect(() => {
    console.log(isAdmin);
  }, []);

  return (
    <div>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Box>
            <Typography className={classes.detailTitle}>Informasi</Typography>
            <Grid container>
              <Grid item xs={6}>
                <Grid container spacing={2}>
                  {/* Ticket Id */}
                  <Grid item xs={5}>
                    <Typography className={classes.detailInfo}>
                      Ticket Id
                    </Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography className={classes.detailValue}>
                      <span className={classes.detailInfo}>:</span> 2323
                    </Typography>
                  </Grid>

                  {/* Nama Request */}
                  <Grid item xs={5}>
                    <Typography className={classes.detailInfo}>
                      User Request
                    </Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography className={classes.detailValue}>
                      <span className={classes.detailInfo}>:</span> Jajat
                      Suderajat
                    </Typography>
                  </Grid>

                  {/* Tanggal request */}
                  <Grid item xs={5}>
                    <Typography className={classes.detailInfo}>
                      Tgl Request
                    </Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography className={classes.detailValue}>
                      <span className={classes.detailInfo}>:</span> 01/05/2021
                    </Typography>
                  </Grid>

                  {/* ATM ID  */}
                  <Grid item xs={5}>
                    <Typography className={classes.detailInfo}>
                      ATM ID
                    </Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography className={classes.detailValue}>
                      <span className={classes.detailInfo}>:</span> 1222
                    </Typography>
                  </Grid>

                  {/* Lokasi */}
                  <Grid item xs={5}>
                    <Typography className={classes.detailInfo}>
                      Lokasi
                    </Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography className={classes.detailValue}>
                      <span className={classes.detailInfo}>:</span>{" "}
                      TGR-CRM-CBG-CLG
                    </Typography>
                  </Grid>

                  {/* Detail */}
                  <Grid item xs={5}>
                    <Typography className={classes.detailInfo}>
                      Detail
                    </Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography className={classes.detailValue}>
                      <span className={classes.detailInfo}>:</span>{" "}
                      TGR-CRM-CBG-CLG
                    </Typography>
                  </Grid>

                  {/* Problem */}
                  <Grid item xs={5}>
                    <Typography className={classes.detailInfo}>
                      Problem
                    </Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography className={classes.detailValue}>
                      <span className={classes.detailInfo}>:</span> Cassete 03
                      Not Configured
                    </Typography>
                  </Grid>

                  {/* Tanggal */}
                  <Grid item xs={5}>
                    <Typography className={classes.detailInfo}>
                      Tanggal
                    </Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography className={classes.detailValue}>
                      <span className={classes.detailInfo}>:</span> 01
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid container spacing={2}>
                  {/* Bulan */}
                  <Grid item xs={5}>
                    <Typography className={classes.detailInfo}>
                      Bulan
                    </Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography className={classes.detailValue}>
                      <span className={classes.detailInfo}>:</span> 01
                    </Typography>
                  </Grid>

                  {/* Start */}
                  <Grid item xs={5}>
                    <Typography className={classes.detailInfo}>
                      Start
                    </Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography className={classes.detailValue}>
                      <span className={classes.detailInfo}>:</span> 01/05/2021,
                      07:30:00
                    </Typography>
                  </Grid>

                  {/* Selesai */}
                  <Grid item xs={5}>
                    <Typography className={classes.detailInfo}>
                      Selesai
                    </Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography className={classes.detailValue}>
                      <span className={classes.detailInfo}>:</span> -
                    </Typography>
                  </Grid>

                  {/* Durasi */}
                  <Grid item xs={5}>
                    <Typography className={classes.detailInfo}>
                      Durasi
                    </Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography className={classes.detailValue}>
                      <span className={classes.detailInfo}>:</span> -
                    </Typography>
                  </Grid>

                  {/* Type Mesin */}
                  <Grid item xs={5}>
                    <Typography className={classes.detailInfo}>
                      Type Mesin
                    </Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography className={classes.detailValue}>
                      <span className={classes.detailInfo}>:</span> Diebold 2321
                    </Typography>
                  </Grid>

                  {/* Status */}
                  <Grid item xs={5}>
                    <Typography className={classes.detailInfo}>
                      Status
                    </Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography className={classes.detailValue}>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <span className={classes.detailInfo}>:</span>{" "}
                        <TableChips
                          label="Reject"
                          type={chipsHandler("unprocessed")}
                          style={{ width: "min-content", marginLeft: 3 }}
                        />
                      </div>
                    </Typography>
                  </Grid>

                  {/* PIC */}
                  <Grid item xs={5}>
                    <Typography className={classes.detailInfo}>PIC</Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography className={classes.detailValue}>
                      <span className={classes.detailInfo}>:</span> Amirul Hakim
                    </Typography>
                  </Grid>

                  {/* Note & Description */}
                  {isAdmin ? null : (
                    <>
                      <Grid item xs={5}>
                        <Typography className={classes.detailInfo}>
                          Note & Description
                        </Typography>
                      </Grid>
                      <Grid item xs={7}>
                        <Typography className={classes.detailValue}>
                          <span className={classes.detailInfo}>:</span> -
                        </Typography>
                      </Grid>
                    </>
                  )}
                </Grid>
              </Grid>
              {/* Note & Description   : */}
              {isAdmin ? (
                <>
                  <Grid item xs={5} style={{ marginTop: 15 }}>
                    <Typography className={classes.detailInfo}>
                      Note & Description :
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <InputBordered
                      multiline
                      rows={6}
                      style={{ width: "100%", marginTop: 5 }}
                      //   onChange={(e) => {
                      //     handleChangeRequest(e.target.value, "notesDescription");
                      //   }}
                      placeholder="Isi Note and Description"
                      //   value=""
                    />
                  </Grid>
                </>
              ) : null}
            </Grid>
          </Box>
        </Grid>

        {isAdmin ? (
          <Grid item xs={12}>
            <Box>
              <Typography className={classes.detailTitle}>
                Informasi PIC
              </Typography>
              <Grid container>
                <Grid item xs={6}>
                  <Grid container spacing={2}>
                    {/* Start Date */}
                    <Grid item xs={5}>
                      <Typography className={classes.detailInfo}>
                        Start Date
                      </Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <Typography className={classes.detailValue}>
                        <span className={classes.detailInfo}>:</span> 01/05/2021
                      </Typography>
                    </Grid>

                    {/* End Date */}
                    <Grid item xs={5}>
                      <Typography className={classes.detailInfo}>
                        End Date
                      </Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <Typography className={classes.detailValue}>
                        <span className={classes.detailInfo}>:</span> 01/05/2021
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} style={{ marginTop: 15 }}>
                  <Grid container spacing={2}>
                    {/* User Control */}
                    <Grid item xs={2}>
                      <Typography className={classes.detailInfo}>
                        Remark
                      </Typography>
                    </Grid>
                    <Grid item xs={9} style={{ marginLeft: 35 }}>
                      <Typography className={classes.detailValue}>
                        <span className={classes.detailInfo}>:</span> Overload
                        task hari ini, minta tolong assign ke PIC lain tq
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        ) : (
          <Grid item xs={12}>
            <Box>
              <Typography className={classes.detailTitle}>
                Informasi PIC
              </Typography>
              <Grid container>
                <Grid item xs={6}>
                  <Grid container spacing={2}>
                    {/* Nama Vendor */}
                    <Grid item xs={12}>
                      <Typography className={classes.detailInfo}>
                        Start Date
                      </Typography>
                    </Grid>
                    <Grid item xs={10}>
                      <DatePicker
                        format="DD/MM/YYYY H:mm"
                        popupStyle={{ zIndex: 1500 }}
                        allowClear={false}
                        suffixIcon={<CallendarIcon />}
                        className={classes.datePicker}
                        size="middle"
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <Grid container spacing={2}>
                    {/* User Control */}
                    <Grid item xs={12}>
                      <Typography className={classes.detailInfo}>
                        End Date
                      </Typography>
                    </Grid>
                    <Grid item xs={10}>
                      <DatePicker
                        format="DD/MM/YYYY H:mm"
                        popupStyle={{ zIndex: 1500 }}
                        allowClear={false}
                        suffixIcon={<CallendarIcon />}
                        className={classes.datePicker}
                        size="middle"
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container style={{ marginTop: 20 }}>
                <Typography
                  style={{ fontWeight: 600, color: "#2B2F3C", fontSize: 15 }}
                >
                  <span style={{ fontWeight: 400 }}>Remark :</span>Overload task
                  hari ini, minta tolong assign ke PIC lain tq
                </Typography>
              </Grid>
            </Box>
          </Grid>
        )}

        <Grid item xs={12}>
          <Box>
            <Typography className={classes.detailTitle}>
              Informasi Vendor
            </Typography>
            <Grid container>
              <Grid item xs={6}>
                <Grid container spacing={2}>
                  {/* Nama Vendor */}
                  <Grid item xs={5}>
                    <Typography className={classes.detailInfo}>
                      Nama Vendor
                    </Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography className={classes.detailValue}>
                      <span className={classes.detailInfo}>:</span> PT Maju Jaya
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid container spacing={2}>
                  {/* User Control */}
                  <Grid item xs={5}>
                    <Typography className={classes.detailInfo}>
                      Rekening Escrow Vendor
                    </Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography className={classes.detailValue}>
                      <span className={classes.detailInfo}>:</span> 800153180000
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box>
            <Grid Container>
              <Grid item xs={6}>
                <Typography
                  style={{
                    fontWeight: 600,
                    fontSize: 13,
                    color: "#8D98B4",
                    marginBottom: 5,
                  }}
                >
                  Status
                </Typography>
                <FormControl className={classes.select}>
                  <Select
                    // value={valueSelectArea}
                    // onChange={onChangeArea}
                    style={{ marginTop: 5 }}
                    input={<SelectInput />}
                    IconComponent={DropDownIcon}
                    defaultValue="Reject"
                  >
                    <MenuItem value="Done">
                      <SyncGreenIcon />
                      <Typography style={{ marginLeft: 5 }}>DONE</Typography>
                    </MenuItem>
                    <MenuItem value="Reject">
                      <SyncRedIcon />
                      <Typography style={{ marginLeft: 5 }}>REJECT</Typography>
                    </MenuItem>
                    <MenuItem value="On Progress">
                      <SyncRedIcon />
                      <Typography style={{ marginLeft: 5 }}>
                        ON PROGRESS
                      </Typography>
                    </MenuItem>
                    <MenuItem value="Open">
                      <SyncRedIcon />
                      <Typography style={{ marginLeft: 5 }}>OPEN</Typography>
                    </MenuItem>
                  </Select>
                </FormControl>
                <Typography
                  style={{
                    fontSize: 13,
                    fontWeight: 400,
                    fontStyle: "italic",
                    fontFamily: "Barlow",
                    marginTop: 10,
                    marginBottom: 20,
                    color: "#8D98B4",
                  }}
                >
                  *Status berubah menjadi{" "}
                  <span style={{ fontWeight: 600 }}>overdue</span> ketika due
                  date terlewati
                </Typography>
              </Grid>
            </Grid>
            <Box style={{ marginTop: 40 }}>
              <Typography
                style={{
                  fontWeight: 600,
                  fontSize: 13,
                  color: "#8D98B4",
                }}
              >
                Foto ATM
              </Typography>
              <Grid container style={{ marginTop: 5 }}>
                {dummyFoto.map((img) => (
                  <Grid>
                    <img
                      style={{
                        borderRadius: 8,
                        width: 115,
                        height: 80,
                        marginRight: 20,
                      }}
                      src={img.src}
                      alt={img.alt}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
            <Box style={{ marginTop: 40 }}>
              <Typography
                style={{
                  fontWeight: 600,
                  fontSize: 13,
                  marginBottom: 10,
                  color: constansts.color.dark,
                }}
              >
                Vendor Attachment
              </Typography>
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <MinioDocComponent filePath="/Surat Penawaran.pdf" />
                </Grid>
                <Grid item>
                  <MinioDocComponent filePath="/Attachment 2" />
                </Grid>
                <Grid item>
                  <MinioDocComponent filePath="/Attachment 3" />
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          {isAdmin ? (
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item>
                <MuiButton
                  label="Reject"
                  //   onClick={() => setIsReject(true)}
                  style={{ height: 38, visibility: "hidden" }}
                />
              </Grid>
              <Grid item>
                <MuiButton
                  label="Assign"
                  onClick={() => handleOpenAssign(0)}
                  style={{ height: 38 }}
                />
              </Grid>
            </Grid>
          ) : (
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item>
                <MuiButton
                  label="Reject"
                  onClick={() => handleOpenConfirm("Reject")}
                  style={{ height: 38 }}
                />
              </Grid>
              <Grid item>
                <MuiButton
                  label="Accept"
                  onClick={() => handleOpenConfirm("Accept")}
                  className={classes.buttonApprove}
                  style={{ height: 38 }}
                />
              </Grid>
            </Grid>
          )}
        </Grid>
        <PopUpAssign
          isOpen={popUpAssign}
          onClose={handleCloseAssign}
          onSubmit={handleSubmitAssign}
          picSeted={picSeted}
        />

        <PopUpConfirmation
          isOpen={confirmAct}
          message={
            confirmType === "Accept"
              ? "Anda yakin ingin menerima task ini?"
              : "Anda yakin ingin menolak task ini?"
          }
          desc="Anda tidak dapat membatalkan tindakan ini"
          onClose={() => setConfirmAct(false)}
          onLeave={() => setConfirmAct(false)}
          onSubmit={
            confirmType === "Accept" ? handleSubmitAccept : handleSubmitReject
          }
        />
        <PopUpRemark
          isOpen={openRemark}
          onClose={handleCloseRemark}
          onLeave={handleCloseRemark}
        />
        <PopupSucces
          isOpen={successAccept}
          message="Berhasil Menerima Task"
          onClose={() => setSuccessAccept(false)}
          onLeave={() => setSuccessAccept(false)}
        />
      </Grid>
    </div>
  );
};

export default DetailTabTicket;
