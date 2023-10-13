import React, { useState, useEffect } from "react";
// import lib
import { Layout } from "antd";
import { Grid, Button } from "@material-ui/core";
import { makeStyles, withStyles } from "@mui/styles";
import { useHistory, useParams } from "react-router-dom";
import numeral from "numeral";
import { DatePicker } from "antd";
import moment from "moment";
// import component
import MuiIconLabelButton from "../../../../components/Button/MuiIconLabelButton";
import { ReactComponent as LeftArrow } from "../../../../assets/icons/linear-red/arrow-left.svg";
import { ReactComponent as CallendarIcon } from "../../../../assets/icons/linear-red/calendar.svg";
import {
  Barlow36,
  Barlow13,
  Barlow15,
} from "../../../../components/Typography/BarlowWithSize";
import GeneralCard from "../../../../components/Card/GeneralCard";
import constansts from "../../../../helpers/constants";
import RedCheckbox from "../../../../components/Checkbox/RedCheckbox";
import LabelTextField from "../../../../components/Form/LabelTextField";
import MuiButton from "../../../../components/Button/MuiButton";
import TableChips from "../../../../components/Chips/TableChips";
import HistoryList from "./common/HistoryList";

const useStyles = makeStyles({
  root: {
    padding: 30,
    background: "inherit",
  },
  leftCard: {
    padding: "30px 20px",
  },
  bottomLine: {
    paddingBottom: 10,
    borderBottom: `2px solid ${constansts.color.grayMedium}`,
  },
  inputGrid: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 10,
  },
  spaceBetween: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
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

const defaultDetailPermintaan = {
  jenisAsuransi: "",
  typeTransaksi: "",
  cashMachineName: "",
  model: "",
  idMesin: "",
  beradaDiPropertiCIMBNiaga: false,
  lokasi: "",
  tipeMesin: "",
  serialNumber: "",
  harga: "",
  tanggalEfektif: "",
  alamat: "",
};

const defaultStatus = {
  requestId: "",
  orderDate: "",
  dueDate: "",
  status: "",
};

const DetailPendaftaranAsuransi = () => {
  const history = useHistory();
  const { id } = useParams();
  const { Content } = Layout;
  const { root, leftCard, bottomLine, inputGrid, spaceBetween, datePicker } =
    useStyles();
  const [checkBox, setCheckBox] = useState({
    onBehalf: false,
  });
  const [inputDetailPermintaan, setInputDetailPermintaan] = useState(
    defaultDetailPermintaan
  );
  const [statusInput, setStatusInput] = useState(defaultStatus);
  const [historyData, setHistoryData] = useState(null);

  // function
  const onCheckBox = (key, bool) => {
    setCheckBox({ ...checkBox, [key]: bool });
  };

  const onChangeDetailPermintaan = (key, e) => {
    setInputDetailPermintaan({ ...inputDetailPermintaan, [key]: e });
    console.log(key, e);
  };

  const onChangeStatus = (key, e) => {
    setStatusInput({ ...statusInput, [key]: e });
  };

  const Numeral = (num) => {
    return numeral(num).format("0,0");
  };

  useEffect(() => {
    console.log(inputDetailPermintaan);
  }, [inputDetailPermintaan]);

  // data user dummy
  const dataUserDummy = {
    namaRequestor: "Edie",
    onBehalf: (
      <RedCheckbox
        inputState={checkBox.onBehalf}
        onChange={() => onCheckBox("onBehalf", !checkBox.onBehalf)}
      />
    ),
    telephone: "08123456789",
    email: "Edie@cimbniaga.co.id",
    divisi: "ATM Business",
    team: "Consumer Banking",
    branch: "ATM Implementation & Maintenance",
  };

  // detail permintaan dummy
  const detailPermintaanDummy = {
    jenisAsuransi: "Cash Machine",
    typeTransaksi: "New",
    cashMachineName: "ZZ08",
    model: "Hitachi SR7500",
    idMesin: "ZZ08",
    beradaDiPropertiCIMBNiaga: true,
    lokasi: "Tanggerang Sup",
    tipeMesin: "CRM",
    serialNumber: "762429",
    harga: "155000000",
    tanggalEfektif: 1659571200,
    alamat: "Supermall  Karawaci",
  };

  // data dummy history
  const historyDummy = [
    {
      name: "Ko Edi",
      initial: "KE",
      description: "Create Task",
      date: "12-12-2020",
      time: "12:36:12 AM",
      bg: "linear-gradient(44.18deg, #F19D1F 0%, #FFC062 87.52%)",
    },
    {
      name: "Rudi Andika",
      initial: "RA",
      description: "Submit Penawaran Harga",
      date: "12-12-2020",
      time: "12:36:12 AM",
      bg: "linear-gradient(44.18deg, #D50A2E 0%, #FB6388 87.52%)",
    },
    {
      name: "Rudi Andika",
      initial: "RA",
      description: "Edit Penawaran Harga",
      date: "12-12-2020",
      time: "12:36:12 AM",
      bg: "linear-gradient(44.18deg, #D50A2E 0%, #FB6388 87.52%)",
    },
    {
      name: "Rudi Andika",
      initial: "RA",
      description: "Submit Penawaran Harga",
      date: "12-12-2020",
      time: "12:36:12 AM",
      bg: "linear-gradient(44.18deg, #D50A2E 0%, #FB6388 87.52%)",
    },
    {
      name: "Mahardika Z",
      initial: "MZ",
      description: "Terima Penawaran Harga",
      date: "12-12-2020",
      time: "12:36:12 AM",
      bg: "linear-gradient(44.18deg, #1F27F1 0%, #8286FF 87.52%)",
    },
    {
      name: "Approval",
      initial: "AL",
      description: "Create Task",
      date: "12-12-2020",
      time: "12:36:12 AM",
      bg: "linear-gradient(44.18deg, #1DD519 0%, #58ED4B 87.52%)",
    },
    {
      name: "Rudi Andika",
      initial: "RA",
      description: "Pekerjaan Ongoing",
      date: "12-12-2020",
      time: "12:36:12 AM",
      bg: "linear-gradient(44.18deg, #D50A2E 0%, #FB6388 87.52%)",
    },
    {
      name: "Rudi Andika",
      initial: "RA",
      description: "Pekerjaan Done",
      date: "12-12-2020",
      time: "12:36:12 AM",
      bg: "linear-gradient(44.18deg, #D50A2E 0%, #FB6388 87.52%)",
    },
  ];

  // chips handler
  const chipHandler = (status) => {
    switch (status) {
      case 0:
        return <TableChips label="Need Approval" type={"warning"} />;
      case 1:
        return <TableChips label="Approved" type={"success"} />;

      default:
        break;
    }
  };

  // data status dummy
  const statusDummy = {
    requestId: 10881,
    orderDate: 1659484800,
    dueDate: 1659571200,
    status: 0,
  };

  // conditional label of user's data
  const labelUserData = (label) => {
    switch (label) {
      case "namaRequestor":
        return "Nama Requestor";
      case "onBehalf":
        return "On Behalf";
      case "telephone":
        return "Telephone";
      case "email":
        return "Email";
      case "divisi":
        return "Divisi";
      case "team":
        return "Team";
      case "branch":
        return "Branch";

      default:
        return "unknown";
    }
  };

  // conditional label of detail permintaan
  const labelDetailPermintaan = (label) => {
    switch (label) {
      case "jenisAsuransi":
        return "Jenis Asuransi";
      case "typeTransaksi":
        return "Type Transaksi";
      case "cashMachineName":
        return "Cash Machine Name";
      case "model":
        return "Model";
      case "idMesin":
        return "ID Mesin";
      case "beradaDiPropertiCIMBNiaga":
        return "Berada Di Properti CIMB Niaga";
      case "lokasi":
        return "Lokasi";
      case "tipeMesin":
        return "Type Mesin";
      case "serialNumber":
        return "Serial Number";
      case "harga":
        return "Harga";
      case "tanggalEfektif":
        return "Tanggal Efektif";
      case "alamat":
        return "Alamat";

      default:
        return "Unknown";
    }
  };

  const conditionalStatus = (status) => {
    switch (status) {
      case "requestId":
        return "Request ID";
      case "orderDate":
        return "Order Date";
      case "dueDate":
        return "Due Date";
      case "status":
        return "Status";
      default:
        return "Unknown";
    }
  };

  // left list user data
  const leftListUserData = Object.keys(dataUserDummy).map((key, index) => {
    const lastIndex = Math.floor(Object.keys(dataUserDummy).length / 2);

    if (index <= lastIndex)
      return (
        <Grid
          key={index}
          container
          justifyContent="space-between"
          alignItems="center"
          style={{ marginTop: 15 }}
        >
          <Grid item xs={5}>
            <Barlow15 style={{ fontWeight: 400 }}>
              {labelUserData(key)}
            </Barlow15>
          </Grid>
          <Grid item xs={1}>
            :
          </Grid>
          <Grid item xs={6}>
            <Barlow15 style={{ fontWeight: 600 }}>
              {Object.values(dataUserDummy)[index]}
            </Barlow15>
          </Grid>
        </Grid>
      );
  });

  // right list user data
  const rightListUserData = Object.keys(dataUserDummy).map((key, index) => {
    const firstIndex = Math.floor(Object.keys(dataUserDummy).length / 2);

    if (index > firstIndex)
      return (
        <Grid
          key={index}
          container
          justifyContent="space-between"
          alignItems="center"
          style={{ marginTop: 15 }}
        >
          <Grid item xs={5}>
            <Barlow15 style={{ fontWeight: 400 }}>
              {labelUserData(key)}
            </Barlow15>
          </Grid>
          <Grid item xs={1}>
            :
          </Grid>
          <Grid item xs={6}>
            <Barlow15 style={{ fontWeight: 600 }}>
              {Object.values(dataUserDummy)[index]}
            </Barlow15>
          </Grid>
        </Grid>
      );
  });

  // left list detail permintaan
  const leftListDetailPermintaan = Object.keys(inputDetailPermintaan).map(
    (key, index) => {
      const lastIndex = Math.floor(
        Object.keys(inputDetailPermintaan).length / 2
      );

      if (index === lastIndex - 1)
        return (
          <Grid
            key={index}
            container
            justifyContent="space-between"
            alignItems="center"
            spacing={1}
            style={{ marginTop: 15 }}
          >
            <Grid item xs={5}>
              <Barlow15 style={{ fontWeight: 400 }}>
                {labelDetailPermintaan(key)}
              </Barlow15>
            </Grid>
            <Grid item xs={1}>
              :
            </Grid>
            <Grid item xs={6} className={inputGrid}>
              <RedCheckbox
                inputState={inputDetailPermintaan[key]}
                onChange={() =>
                  onChangeDetailPermintaan(key, !inputDetailPermintaan[key])
                }
              />
            </Grid>
          </Grid>
        );

      if (index < lastIndex - 1)
        return (
          <Grid
            key={index}
            container
            justifyContent="space-between"
            alignItems="center"
            spacing={1}
            style={{ marginTop: 15 }}
          >
            <Grid item xs={5}>
              <Barlow15 style={{ fontWeight: 400 }}>
                {labelDetailPermintaan(key)}
              </Barlow15>
            </Grid>
            <Grid item xs={1}>
              :
            </Grid>
            <Grid item xs={6} className={inputGrid}>
              <LabelTextField
                height={38}
                value={inputDetailPermintaan[key]}
                onChange={(e) => onChangeDetailPermintaan(key, e.target.value)}
              />
            </Grid>
          </Grid>
        );
    }
  );

  // right list detail permintaan
  const rightListDetailPermintaan = Object.keys(inputDetailPermintaan).map(
    (key, index) => {
      const firstIndex = Math.floor(
        Object.keys(inputDetailPermintaan).length / 2
      );

      if (index >= firstIndex)
        return (
          <Grid
            key={index}
            container
            justifyContent="space-between"
            alignItems="center"
            spacing={1}
            style={{ marginTop: 15 }}
          >
            <Grid item xs={6}>
              <Barlow15 style={{ fontWeight: 400 }}>
                {labelDetailPermintaan(key)}
              </Barlow15>
            </Grid>
            <Grid item xs={6} className={inputGrid}>
              <span>:&nbsp;</span>
              {key == "harga" && (
                <LabelTextField
                  height={38}
                  value={Numeral(inputDetailPermintaan[key])}
                  currencyField
                  onChange={(e) =>
                    onChangeDetailPermintaan(key, e.target.value)
                  }
                />
              )}
              {key === "tanggalEfektif" && (
                <DatePicker
                  format="DD/MM/YYYY"
                  popupStyle={{ zIndex: 1500 }}
                  allowClear={false}
                  suffixIcon={<CallendarIcon />}
                  className={datePicker}
                  onChange={(newDate) => {
                    let valDate = "";
                    if (newDate === null) {
                      valDate = "";
                    } else {
                      valDate = newDate.unix();
                    }
                    onChangeDetailPermintaan(key, valDate);
                  }}
                  value={
                    inputDetailPermintaan[key]
                      ? moment(inputDetailPermintaan[key] * 1000)
                      : ""
                  }
                />
              )}
              {key !== "tanggalEfektif" && key !== "harga" && (
                <LabelTextField
                  height={38}
                  value={inputDetailPermintaan[key]}
                  onChange={(e) =>
                    onChangeDetailPermintaan(key, e.target.value)
                  }
                />
              )}
            </Grid>
          </Grid>
        );
    }
  );

  // list status
  const listStatus = Object.keys(statusInput).map((key, index) => {
    if (key === "status")
      return (
        <Grid
          key={index}
          container
          justifyContent="space-between"
          alignItems="center"
          style={{ marginTop: 20 }}
        >
          <Grid item xs={5}>
            <Barlow15 style={{ fontWeight: 400 }}>
              {conditionalStatus(key)}
            </Barlow15>
          </Grid>
          <Grid item xs={1}>
            :
          </Grid>
          <Grid item xs={6}>
            {chipHandler(Object.values(statusInput)[index])}
          </Grid>
        </Grid>
      );
    if (key === "requestId")
      return (
        <Grid
          key={index}
          container
          justifyContent="space-between"
          alignItems="center"
          style={{ marginTop: 20 }}
        >
          <Grid item xs={5}>
            <Barlow15 style={{ fontWeight: 400 }}>
              {conditionalStatus(key)}
            </Barlow15>
          </Grid>
          <Grid item xs={1}>
            :
          </Grid>
          <Grid item xs={6}>
            <Barlow15 style={{ fontWeight: 600 }}>
              {Object.values(statusInput)[index]}
            </Barlow15>
          </Grid>
        </Grid>
      );
    if (key === "dueDate" || key === "orderDate")
      return (
        <Grid
          key={index}
          container
          justifyContent="space-between"
          alignItems="center"
          style={{ marginTop: 20 }}
        >
          <Grid item xs={5}>
            <Barlow15 style={{ fontWeight: 400 }}>
              {conditionalStatus(key)}
            </Barlow15>
          </Grid>
          <Grid item xs={1}>
            :
          </Grid>
          <Grid item xs={6}>
            <DatePicker
              format="DD/MM/YYYY H:mm"
              popupStyle={{ zIndex: 1500 }}
              allowClear={false}
              suffixIcon={<CallendarIcon />}
              className={datePicker}
              size="middle"
              onChange={(newDate) => {
                let valDate = "";
                if (newDate === null) {
                  valDate = "";
                } else {
                  valDate = newDate.unix();
                }
                onChangeStatus(key, valDate);
              }}
              value={statusInput[key] ? moment(statusInput[key] * 1000) : ""}
            />
          </Grid>
        </Grid>
      );
  });

  const convertToUI = (data) => {
    const obj = {};
    Object.keys(data).map((key, index) => {
      obj[key] = Object.values(data)[index];
    });
    return obj;
  };

  useEffect(() => {
    setInputDetailPermintaan(convertToUI(detailPermintaanDummy));
    setStatusInput(statusDummy);
    setHistoryData(historyDummy);
  }, []);

  return (
    <>
      <Layout className={root}>
        {/* back button */}
        <Content>
          <MuiIconLabelButton
            label={"Back"}
            iconPosition="startIcon"
            buttonIcon={<LeftArrow />}
            style={{ background: "inherit", color: "#DC241F", padding: 0 }}
            onClick={() =>
              history.push(`/asset-management/insurance/pendaftaran`)
            }
          />
        </Content>

        {/* title */}
        <Content style={{ marginTop: 20 }}>
          <Barlow36 style={{ fontWeight: 500 }}>Detail Asuransi</Barlow36>
        </Content>

        {/* Content */}
        <Content style={{ marginTop: 20 }}>
          <Grid
            container
            justifyContent="space-between"
            alignItems="flex-start"
            spacing={2}
          >
            {/* left grid */}
            <Grid item xs={8}>
              <GeneralCard className={leftCard}>
                <Layout style={{ background: "inherit" }}>
                  <Content className={bottomLine}>
                    {/* data user's title */}
                    <Barlow13
                      style={{
                        color: constansts.color.grayMedium,
                        fontWeight: 600,
                      }}
                    >
                      Data User
                    </Barlow13>
                  </Content>

                  {/* Data User */}
                  <Content style={{ marginTop: 5 }}>
                    <Grid
                      container
                      justifyContent="space-between"
                      alignItems="flex-start"
                      spacing={2}
                    >
                      <Grid item xs={6}>
                        {leftListUserData}
                      </Grid>
                      <Grid item xs={6}>
                        {rightListUserData}
                      </Grid>
                    </Grid>
                  </Content>

                  {/* Detail Permintaan */}
                  <Content className={bottomLine} style={{ marginTop: 20 }}>
                    <Barlow13
                      style={{
                        color: constansts.color.grayMedium,
                        fontWeight: 600,
                      }}
                    >
                      Detail Permintaan
                    </Barlow13>
                  </Content>
                  <Content style={{ marginTop: 5 }}>
                    <Grid
                      container
                      justifyContent="space-between"
                      alignItems="flex-start"
                      spacing={2}
                    >
                      <Grid item xs={6}>
                        {leftListDetailPermintaan}
                      </Grid>
                      <Grid item xs={6}>
                        {rightListDetailPermintaan}
                      </Grid>
                    </Grid>
                  </Content>
                  <Content className={spaceBetween} style={{ marginTop: 40 }}>
                    <MuiButton
                      style={{
                        height: 38,
                        color: constansts.color.primaryHard,
                        background: "white",
                        border: `1px solid ${constansts.color.primaryHard}`,
                      }}
                      label={"Cancel"}
                      onClick={() => console.log("canceled")}
                    />
                    <MuiButton
                      style={{ height: 38 }}
                      label={"Simpan"}
                      onClick={() => console.log("saved")}
                    />
                  </Content>
                </Layout>
              </GeneralCard>
            </Grid>

            {/* right grid */}
            <Grid item xs={4}>
              {/* Card Status */}
              <GeneralCard className={leftCard}>
                <Layout style={{ background: "inherit" }}>
                  {/* status's title */}
                  <Content className={bottomLine}>
                    <Barlow13
                      style={{
                        fontWeight: 600,
                        color: constansts.color.grayMedium,
                      }}
                    >
                      Status
                    </Barlow13>
                  </Content>

                  {/* List Status */}
                  <Content>{listStatus}</Content>
                </Layout>
              </GeneralCard>

              {/* Card History */}
              <GeneralCard className={leftCard} style={{ marginTop: 20 }}>
                <Layout style={{ background: "inherit" }}>
                  {/* Title History */}
                  <Content>
                    <Barlow15 style={{ fontWeight: 600 }}>History</Barlow15>
                  </Content>

                  {/* History */}
                  <Content style={{ marginTop: 10 }}>
                    <HistoryList data={historyData} />
                  </Content>
                </Layout>
              </GeneralCard>
            </Grid>
          </Grid>
        </Content>
      </Layout>
    </>
  );
};

export default DetailPendaftaranAsuransi;
