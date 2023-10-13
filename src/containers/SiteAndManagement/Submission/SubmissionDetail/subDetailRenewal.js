/* eslint-disable no-shadow */
/* eslint-disable no-undef */
/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { useParams, withRouter } from "react-router-dom";
import {
  makeStyles,
  Grid,
  Typography,
  Button,
  Paper,
  Tab,
  Tabs,
} from "@material-ui/core";
import { Select, Input, DatePicker, TimePicker } from "antd";
import PropTypes from "prop-types";
import moment from "moment";
import axios from "axios";
import constants from "../../../../helpers/constants";
import { ReactComponent as BackIcon } from "../../../../assets/icons/general/arrow_back_red.svg";
import SubAtmInfo from "./subAtmInfo";
import SubDetailPaper from "./subDetailPaper";
import PaperSubmissionProgress from "../../../../components/GeneralComponent/PaperSubmissionProgress";
import MuiIconLabelButton from "../../../../components/Button/MuiIconLabelButton";
import { ReactComponent as ArrowLeft } from "../../../../assets/icons/siab/arrow-left.svg";
import RupiahConverter from "../../../../helpers/useRupiahConverter";
import LoadingView from "../../../../components/Loading/LoadingView";

const useStyles = makeStyles({
  // Tabs Style
  rootTabs: {
    minHeight: 40,
    backgroundColor: constants.color.grayUltraSoft,
    borderRadius: 10,
    color: constants.color.grayMedium,
    width: "fit-content",
    position: "relative",
    // left: "10%",
  },
  tabsIndicator: {
    display: "none",
  },
  rootItemTabs: {
    minHeight: 40,
    minWidth: 72,
    padding: "7px 10px",
  },
  selectedTabItem: {
    backgroundColor: constants.color.primaryHard,
    color: constants.color.white,
  },
  wrapperTabItem: {
    textTransform: "none",
  },
  root: { padding: "30px 20px 20px 30px" },
  backLabel: {
    fontSize: 17,
    color: constants.color.primaryHard,
    marginLeft: 5,
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
      "& .MuiButton-label": {
        fontSize: 17,
        fontWeight: 500,
      },
    },
  },
  details: {
    margin: "20px 0px",
    padding: 10,
    border: "1px solid #BCC8E7",
    borderRadius: 8,
  },
  inputDay: {
    "& .ant-select-single .ant-select-selector": {
      borderRadius: "6px !important",
    },
  },
  btnSubmit: {
    backgroundColor: constants.color.primaryHard,
    color: "white",
    borderRadius: 6,
    textTransform: "capitalize",
  },
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`content-tabpanel-${index}`}
      aria-labelledby={`content-tab-${index}`}
      {...other}
    >
      {value === index && <div>{children}</div>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const SubDetailRenewal = ({ history }) => {
  const classes = useStyles();
  const { Option } = Select;
  const { TextArea } = Input;

  // GET ID from URL
  const { id } = useParams();
  const rowId = { id: id };

  // const { locId } = useParams();
  // const idLoc = { "locationId" : locId };

  const { atmId } = useParams();
  const idAtm = { atmId: atmId };

  // ---FOR TABS--- //
  const tabsStyles = {
    root: classes.rootTabs,
    indicator: classes.tabsIndicator,
  };
  const tabItemStyles = {
    root: classes.rootItemTabs,
    selected: classes.selectedTabItem,
    wrapper: classes.wrapperTabItem,
  };

  const [selectedTab, setSelectedTab] = useState("Perbaikan");
  const handleSelectedTab = (event, newValue) => {
    event.preventDefault();
    setSelectedTab(newValue);
    if (newValue === "Perbaikan") {
      console.log("Tab Current 0");
    } else if (newValue === "Perawatan") {
      console.log("Tab Current 1");
    } else {
      console.log("Tab Default");
    }
  };
  // ---FOR TABS--- //

  // ---INITIAL STATE--- //
  const [isOpenModalLoader, setModalLoader] = useState(false);
  const [data, setData] = useState("");
  const [position, setPosition] = useState(null);
  const [cost, setCost] = useState("");
  const [dataDetailCost, setDataDetailCost] = useState("");
  const [valueNote, setValueNote] = useState("");
  const [repair, setRepair] = useState("");
  const [statusProgress, setStatusProgress] = useState();

  function handleChangeRemark(value) {
    setRepair(value);
  }

  function handleNote(event) {
    setValueNote(event.target.value);
  }

  function isEmpty(obj) {
    for (const x in obj) {
      if (obj.hasOwnProperty(x)) return false;
    }
    return true;
  }

  // HIT API GET Data Detail
  useEffect(() => {
    setModalLoader(true);
    const config = {
      headers: { "Content-Type": "application/json" },
    };

    axios
      .post(
        `${process.env.REACT_APP_API_DOMAIN}/acquisitionservice/acquisitionservice/v1/viewSubmissionRenewal`,
        rowId,
        config
      )
      .then((res) => {
        const dataRenew = {
          repairType: res.data.repairType,
          requestRepair: res.data.requestRepaired,
          repairNote: res.data.repairNote,
        };
        console.log("DATA RENEW", dataRenew);
        setSelectedTab(dataRenew.repairType);
        setRepair(dataRenew.requestRepair);
        setValueNote(dataRenew.repairNote);
        setModalLoader(false);
      });

    axios
      .post(
        `${process.env.REACT_APP_API_DOMAIN}/acquisitionservice/acquisitionservice/v1/detailSubmissionNew`,
        rowId,
        config
      )
      .then((res) => {
        console.log("RESPONSE", JSON.stringify(res));
        const dataInfo = res.data.informasiNegotiation[0];
        console.log("INI DATA", dataInfo);
        const newInfo = {
          type: dataInfo.openingType === null ? "-" : dataInfo.openingType,
          locationPhotoslist: dataInfo.locationPhotoslist,
          kondisi: dataInfo.openingType === null ? "-" : dataInfo.openingType,
          lokasiId: dataInfo.newLocation === null ? "-" : dataInfo.newLocation,
          alamat: dataInfo.address === null ? "-" : dataInfo.address,
          roArea: dataInfo.area === null ? "-" : dataInfo.area,
          cabang: dataInfo.branch === null ? "-" : dataInfo.branch,
          picCabang:
            dataInfo.branchPicName === null ? "-" : dataInfo.branchPicName,
          picPemilik:
            dataInfo.ownerPicName === null ? "-" : dataInfo.ownerPicName,
          picOnLocation:
            dataInfo.locationPicName === null ? "-" : dataInfo.locationPicName,
          populasiATM: dataInfo.countAtm === null ? "-" : dataInfo.countAtm,
          categoryType:
            dataInfo.categoryType === null ? "-" : dataInfo.categoryType,
          locationCategory:
            dataInfo.locationCategory === null
              ? "-"
              : dataInfo.locationCategory,
          // jenisLokasiMakro: dataInfo.macroLocationType === null ? '-' : dataInfo.macroLocationType,
          // jenisLokasiMikro: dataInfo.microLocationType === null ? '-' : dataInfo.microLocationType,
          aksesibilitas:
            dataInfo.workingHour === null ? "-" : `${dataInfo.workingHour} Jam`,
          aksesPublik:
            dataInfo.publicAccessibility === null
              ? "-"
              : dataInfo.publicAccessibility,
          luasArea:
            dataInfo.buildingLarge === null ? "-" : dataInfo.buildingLarge,
          jumlahAtmBankLain:
            dataInfo.aroundAtmCount === null ? "-" : dataInfo.aroundAtmCount,
          tipeAtm: dataInfo.boothType === null ? "-" : dataInfo.boothType,
          ruangAtm:
            dataInfo.boothAvailability === null
              ? "-"
              : dataInfo.boothAvailability,
          komunikasi: dataInfo.commType === null ? "-" : dataInfo.commType,
          nilaiTerendah: dataInfo.minOffering,
          nilaiTengah: dataInfo.averageOffering,
          nilaiTertinggi: dataInfo.maxOffering,
          locationPhotosPositionNeonSign:
            dataInfo.locationPhotosPositionNeonSign,
          locationPhotosPositionAtenaVsat:
            dataInfo.locationPhotosPositionAtenaVsat,
          locationMachinePhotos:
            dataInfo.locationMachinePhotos,
          locationFrontMachinePhoto:
            dataInfo.locationFrontMachinePhoto,
        };
        console.log("INI NEW INFO", JSON.stringify(newInfo));
        // set constructed data
        setData(newInfo);
        setModalLoader(false);

        const dataLocation = res.data.informasiNegotiation[0];
        const newPosition = [
          dataLocation.latitude === null ? -6.1753924 : dataLocation.latitude,
          dataLocation.longitude === null
            ? 106.8249641
            : dataLocation.longitude,
        ];
        setPosition(newPosition);
        setModalLoader(false);
        console.log("new location", newPosition);

        const dataCost = res.data.detailRent;
        console.log("INI COST", dataCost);
        setCost(dataCost);
        setModalLoader(false);

        const dataCostDetail = res.data.rent[0];
        const { detailRent } = res.data
        const approver = res.data.rent[0].daNameList;
        console.log("INI DETAIL BIAYA", dataCostDetail);
        console.log("APPROVER", approver);
        const newDetail = {
          biayaSewa: detailRent.map(({yearlyRentCost})=>RupiahConverter(yearlyRentCost)),
          biayaListrik:
            dataCostDetail.yearlyElectricityCost === null
              ? "-"
              : RupiahConverter(dataCostDetail.yearlyElectricityCost),
          telepon:
            dataCostDetail.yearlyTelephoneRentCost === null
              ? "-"
              : RupiahConverter(dataCostDetail.yearlyTelephoneRentCost),
          serviceCharge:
            dataCostDetail.yearlyServiceCharge === null
              ? "-"
              : RupiahConverter(dataCostDetail.yearlyServiceCharge),
          totalSewa:
            dataCostDetail.totalRent === null
              ? "-"
              : RupiahConverter(dataCostDetail.totalRent),
          fileDocument: dataCostDetail.documents,
          name: approver === null ? "N/A" : approver,
        };
        setDataDetailCost(newDetail);
        setModalLoader(false);
        if (res.data.status) {
          setStatusProgress(res.data.status);
        }
        console.log("DETAIL COST", newDetail);
      })
      .catch((err) => {
        setModalLoader(false);
        alert(err);
      });
  }, []);

  const handleSubmit = () => {
    // alert('Udah di Submit!');
    // useEffect(() => {
    setModalLoader(true);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const data = {
      id: rowId.id,
      repairType: selectedTab,
      requestRepaired: repair,
      repairNote: valueNote,
      submit: true,
    };
    console.log(data, "dataSubmitRenewal");

    try {
      axios
        .post(
          `${process.env.REACT_APP_API_DOMAIN}/acquisitionservice/acquisitionservice/v1/submitSubmissionRenewal`,
          data,
          config
        )
        .then((res) => {
          setModalLoader(true);
          console.log(res);
          if (res.status === 200) {
            if (res.data.responseCode === "00") {
              alert("Success send Data!");
              setModalLoader(false);
              // window.location.assign('/submission-tracking');
            }
          }
        })
        .catch((error) => {
          alert(error);
          console.log(error);
          setModalLoader(false);
        });
    } catch (err) {
      alert(err);
      setModalLoader(false);
    }
    // },[]);
  };

  return (
    <div>
      {isOpenModalLoader ? (
        <LoadingView maxheight="100%" />
      ) : (
        <div className={classes.root}>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <div className={classes.backButton}>
                <MuiIconLabelButton
                  label="Back"
                  iconPosition="startIcon"
                  onClick={() => window.history.back()}
                  buttonIcon={<ArrowLeft />}
                />
              </div>
            </Grid>

            <Grid item>
              <SubAtmInfo
                atmId={idAtm}
                data={data}
                position={position}
                cost={cost}
              />
            </Grid>

            <Grid item>
              <PaperSubmissionProgress statusProgress={statusProgress} />
            </Grid>

            <Grid container direction="row" spacing={2} style={{ padding: 10 }}>
              <Grid item xs={4}>
                <SubDetailPaper dataDetail={dataDetailCost} />
              </Grid>

              <Grid item xs={8}>
                <Paper style={{ padding: 20 }}>
                  <Typography
                    style={{ fontSize: 24, fontWeight: 500, marginBottom: 20 }}
                  >
                    Remark
                  </Typography>
                  <Typography
                    style={{ fontSize: 15, fontWeight: 500, marginBottom: 20 }}
                  >
                    Masukkan remark untuk perbaikan
                  </Typography>

                  <Grid container direction="row" spacing={3}>
                    <Grid item sm={4}>
                      <Typography
                        style={{
                          fontSize: 13,
                          fontWeight: 400,
                          marginBottom: 10,
                        }}
                      >
                        Jenis Perbaikan
                      </Typography>
                      <Tabs
                        classes={tabsStyles}
                        value={selectedTab}
                        onChange={handleSelectedTab}
                        centered
                      >
                        <Tab
                          classes={tabItemStyles}
                          label="Perbaikan"
                          value="perbaikan"
                        />
                        <Tab
                          classes={tabItemStyles}
                          label="Perawatan"
                          value="perawatan"
                        />
                      </Tabs>
                    </Grid>
                    <Grid item sm={3}>
                      <Typography
                        style={{
                          fontSize: 13,
                          fontWeight: 400,
                          marginBottom: 10,
                        }}
                      >
                        Pilih Permintaan
                      </Typography>
                      <Select
                        defaultValue="1"
                        value={isEmpty(repair) ? "1" : repair}
                        className="CommonSelect__select--bordered"
                        onChange={handleChangeRemark}
                      >
                        <Option value="1">Renovasi Ruangan</Option>
                        <Option value="2">Bangun Ruangan</Option>
                        <Option value="3">Pemasangan AC</Option>
                        <Option value="4">Pemasangan KWH</Option>
                        <Option value="5">Pemasangan Outlet</Option>
                        <Option value="6">Type Jarkom</Option>
                        <Option value="7">Pembuatan Booth</Option>
                        <Option value="8">Pembuatan FM</Option>
                        <Option value="9">Pembuatan Neon Box</Option>
                      </Select>
                    </Grid>
                  </Grid>

                  <Grid
                    container
                    direction="row"
                    style={{ marginTop: "4%" }}
                    alignItems="flex-end"
                  >
                    <Grid item xs={7}>
                      <TextArea
                        style={{ borderRadius: 6 }}
                        placeholder="Catatan"
                        rows={10}
                        value={valueNote}
                        onChange={handleNote}
                      />
                    </Grid>
                    <Grid item xs={5}>
                      <Grid
                        container
                        alignContent="flex-end"
                        justify="flex-end"
                      >
                        <Grid item>
                          <Button
                            variant="contained"
                            className={classes.btnSubmit}
                            onClick={handleSubmit}
                          >
                            Submit Untuk Survey
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  );
};

export default withRouter(SubDetailRenewal);
