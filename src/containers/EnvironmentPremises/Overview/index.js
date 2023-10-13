import React, { useEffect, useState } from "react";
import { Col, Layout, Row } from "antd";
import { makeStyles, withStyles } from "@material-ui/styles";
import { Typography, Tabs, Tab, Grid } from "@material-ui/core";
import PercentageCard from "../../../components/Card/PercentageCard";
import { ReactComponent as CheckIcon } from "../../../assets/images/check-circle-red.svg";
import { ReactComponent as TachometerIcon } from "../../../assets/images/tachometer-fast-red.svg";
import { ReactComponent as TimesIcon } from "../../../assets/images/times-circle-red.svg";
import { ReactComponent as PauseIcon } from "../../../assets/images/pause-circle-red.svg";
import { ReactComponent as FileIcon } from "../../../assets/images/file-signature-red.svg";
import TableSummarySurveyVendor from "./common/TableSummary";
import TableTopVendor from "./common/TableTopVendor.js";
import PersentaseKunjungan from "./common/PersentaseKunjungan";
import Constants from "../../../helpers/constants";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import TokenListrik from "./common/TokenListrik";
import TablePagination from "./common/TablePagination";
import MuiIconLabelButton from "../../../components/Button/MuiIconLabelButton";
import { PrimaryUltrasoft, PrimaryHard } from "../../../assets/theme/colors";
import { ReactComponent as AngleRightIcon } from "../../../assets/icons/linear-red/chevron-right.svg";
import {
  doGetOverviewPraAndPasca,
  doGetSummaryOverview,
} from "../ApiServicesEnvironmentPremises";
import EmptyImg from "../../../assets/images/empty_data.png";

const useStyle = makeStyles({
  root: {
    paddingTop: 30,
    paddingLeft: 30,
    paddingRight: 28.5,
    paddingBottom: 75,

    background: "inherit",
  },
  Barlow: {
    fontFamily: "Barlow",
    fontStyle: "normal",
  },
  title: {
    fontWeight: 500,
    fontSize: 36,
  },
  loaderWrapper: {
    width: "100%",
    height: "100%",
    position: "relative",
    zIndex: 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});

const ContentTabs = withStyles({
  indicator: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
    height: 3,
    "& > span": {
      width: "100%",
      backgroundColor: Constants.color.primaryHard,
    },
  },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const ContentTab = withStyles((theme) => ({
  root: {
    textTransform: "none",
    fontSize: 17,
    fontWeight: 600,
    marginRight: theme.spacing(1),
    color: Constants.color.grayMedium,
    "&:hover": {
      color: Constants.color.dark,
      opacity: 1,
    },
    "&$selected": {
      color: Constants.color.dark,
    },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />);

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`content-tabpanel-${index}`}
      aria-labelledby={`content-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `content-tab-${index}`,
    "aria-controls": `content-tabpanel-${index}`,
  };
}

const OverviewEnvironmentPremises = () => {
  // variable is here
  const { Header, Content } = Layout;
  const classess = useStyle();
  const { Barlow, title } = classess;
  const history = useHistory();
  const [valueTab, setValueTab] = useState(0);
  const [dataAPI, setDataAPI] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadOverview, setIsLoadOverview] = useState(true);
  const [dataSummary, setDataSummary] = useState([]);

  const windowHash = window.location.hash;

  const handleChangeTab = (e, newVal) => {
    setValueTab(newVal);
    let hashTab;
    switch (newVal) {
      case 0:
        hashTab = "#Pra-Bayar";
        break;
      case 1:
        hashTab = "#Pasca-Bayar";
        break;
      default:
        hashTab = "#Pra-Bayar";
        break;
    }
    history.replace(`${hashTab}`);
  };

  const loaderHandler = (bool) => {
    setIsLoading(bool);
  };

  const loaderOverview = (bool) => {
    setIsLoadOverview(bool);
  };

  const typeRequest = (type) => {
    if (!type) return "Pra";
    if (type == "#Pra-Bayar") return "Pra";
    return "Pasca";
  };

  useEffect(() => {
    if (windowHash) {
      switch (windowHash) {
        case "#Pra-Bayar":
          setValueTab(0);
          break;
        case "#Pasca-Bayar":
          setValueTab(1);
        default:
          setValueTab(0);
          break;
      }
    }
  }, []);

  const convertResponseToUI = (response) => {
    if (!response) return null;
    const dataArr = [];
    response.map((res) => {
      const obj = {};
      // obj.atmId = res.atmId ? res.atmId : "-";
      // obj.meterNumber = res.meterNumber ? res.meterNumber : "-";
      // obj.tokenRemaining = res.tokenRemaining ? res.tokenRemaining : "-";
      // obj.tokenAfter = res.tokenAfter ? res.tokenAfter : "-";
      obj.atmId = !res.atmId || res.atmId === "null" ? "-" : res.atmId
      obj.meterNumber = !res.meterNumber || res.meterNumber === "null" ? "-" : res.meterNumber
      obj.tokenRemaining = !res.tokenRemaining || res.tokenRemaining === "null" ? "-" : res.tokenRemaining
      obj.tokenAfter = !res.tokenAfter || res.tokenAfter === "null" ? "-" : res.tokenAfter
      obj.emptyCol = "";
      dataArr.push(obj);
    });
    return dataArr;
  };

  useEffect(() => {
    setIsLoading(true);
    doGetOverviewPraAndPasca(loaderHandler, typeRequest(windowHash))
      .then((res) => {
        setDataAPI(convertResponseToUI(res.data.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [windowHash]);

  useEffect(() => {
    doGetSummaryOverview(loaderOverview).then((res) => {
      const { delay, manual, open, sesuaiWaktu, tidakDikerjakan } = res.data;
      setDataSummary([
        {
          label: "Open",
          value: open === "NaN%" || open === null ? "0%" : open,
          icon: <CheckIcon />,
        },
        {
          label: "Tepat Waktu",
          value: sesuaiWaktu === "NaN%" || sesuaiWaktu === null ? "0%" : sesuaiWaktu,
          icon: <TachometerIcon />,
        },
        {
          label: "Delay",
          value: delay === "NaN%" || delay === null ? "0%" : delay,
          icon: <PauseIcon />,
        },
        {
          label: "Tidak Dikerjakan",
          value: tidakDikerjakan === "NaN%" || tidakDikerjakan === null ? "0%" : tidakDikerjakan,
          icon: <TimesIcon />,
        },
        {
          label: "Manual",
          value: manual === "NaN%" || manual === null ? "0%" : manual,
          icon: <FileIcon />,
        },
      ]);
    });
  }, []);

  const tableHeader = [
    "ATM ID",
    "No Meteran",
    "Token Sebelum",
    "Token Sesudah",
    <MuiIconLabelButton
      label={"Detail"}
      iconPosition="endIcon"
      buttonIcon={<AngleRightIcon />}
      style={{ height: 20, color: PrimaryHard, background: PrimaryUltrasoft }}
      onClick={() => history.push("/environment-premises/pra-pasca-bayar")}
    />,
  ];

  const dataDummyPrabayar = [
    {
      atmId: "C-2124",
      noMeteran: "12343891279",
      tokenSebelum: "213 KWH",
      tokenSesudah: "5000 KWH",
      emptyCol: "",
    },
    {
      atmId: "C-2124",
      noMeteran: "12343891279",
      tokenSebelum: "213 KWH",
      tokenSesudah: "5000 KWH",
      emptyCol: "",
    },
    {
      atmId: "C-2124",
      noMeteran: "12343891279",
      tokenSebelum: "213 KWH",
      tokenSesudah: "5000 KWH",
      emptyCol: "",
    },
    {
      atmId: "C-2124",
      noMeteran: "12343891279",
      tokenSebelum: "213 KWH",
      tokenSesudah: "5000 KWH",
      emptyCol: "",
    },
    {
      atmId: "C-2124",
      noMeteran: "12343891279",
      tokenSebelum: "213 KWH",
      tokenSesudah: "5000 KWH",
      emptyCol: "",
    },
    {
      atmId: "C-2124",
      noMeteran: "12343891279",
      tokenSebelum: "213 KWH",
      tokenSesudah: "5000 KWH",
      emptyCol: "",
    },
  ];

  const dataDummyPascabayar = [
    {
      atmId: "C-2124",
      noMeteran: "12343891279",
      tokenSebelum: "213 KWH",
      tokenSesudah: "5000 KWH",
      emptyCol: "",
    },
    {
      atmId: "C-2124",
      noMeteran: "12343891279",
      tokenSebelum: "213 KWH",
      tokenSesudah: "5000 KWH",
      emptyCol: "",
    },
    {
      atmId: "C-2124",
      noMeteran: "12343891279",
      tokenSebelum: "213 KWH",
      tokenSesudah: "5000 KWH",
      emptyCol: "",
    },
    {
      atmId: "C-2124",
      noMeteran: "12343891279",
      tokenSebelum: "213 KWH",
      tokenSesudah: "5000 KWH",
      emptyCol: "",
    },
    {
      atmId: "C-2124",
      noMeteran: "12343891279",
      tokenSebelum: "213 KWH",
      tokenSesudah: "5000 KWH",
      emptyCol: "",
    },
    {
      atmId: "C-2124",
      noMeteran: "12343891279",
      tokenSebelum: "213 KWH",
      tokenSesudah: "5000 KWH",
      emptyCol: "",
    },
  ];

  const listDataSummary = dataSummary.map((data, index) => (
    <>
      {isLoadOverview ? (
        <div className={classess.loaderWrapper}>
          <LoadingView maxheight="100%" isTransparent />
        </div>
      ) : (
        <>
          {data ? (
            <Col flex={1}>
              <PercentageCard
                key={index}
                icon={data.icon}
                label={data.label}
                value={data.value}
              />
            </Col>
          ) : (
            <Grid
              container
              alignContent="center"
              justify="center"
              style={{ height: 120 }}
              direction="column"
            >
              <img src={EmptyImg} alt="Empty" style={{ opacity: 0.4 }} />
              <Typography
                style={{
                  opacity: 0.3,
                  textAlign: "center",
                  fontSize: 11,
                  marginTop: 10,
                }}
              >
                Empty
              </Typography>
            </Grid>
          )}
        </>
      )}
    </>
  ));

  return (
    <>
      <Layout className={classess.root}>
        <Header style={{ padding: 0, background: "inherit" }}>
          <Typography className={`${Barlow} ${title}`}>
            Environment Premises
          </Typography>
        </Header>
        <Content style={{ background: "inherit", marginTop: 10 }}>
          <Row gutter={[16, 16]}>
            {/* <Col flex={1}>
              <PercentageCard icon={<CheckIcon />} label="Open" value={25} />
            </Col> */}
            {listDataSummary}
          </Row>
        </Content>
        <Content style={{ marginTop: 20 }}>
          <TableSummarySurveyVendor />
        </Content>
        <Content style={{ marginTop: 20 }}>
          <Row
            gutter={[20, 20]}
            align="middle"
            justify="center"
            style={{ height: 315 }}
          >
            <Col span={12}>
              <TableTopVendor />
            </Col>
            <Col span={12}>
              <PersentaseKunjungan />
            </Col>
          </Row>
        </Content>
        <Content style={{ marginTop: 40 }}>
          <Row gutter={[20, 20]} justify="start" align="middle">
            <Col span={9}></Col>
            <Col span={15}>
              <Row align="middle" justify="start">
                <Col>
                  <ContentTabs
                    value={valueTab}
                    onChange={handleChangeTab}
                    aria-label="content tabs"
                  >
                    <ContentTab
                      label="Pra Bayar"
                      {...a11yProps(0)}
                      style={{ minWidth: 266 }}
                    />
                    <ContentTab
                      label="Pasca Bayar"
                      {...a11yProps(1)}
                      style={{ minWidth: 266 }}
                    />
                  </ContentTabs>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row
            gutter={[20, 20]}
            align="middle"
            justify="center"
            style={{ marginTop: 10 }}
          >
            <Col span={9}>
              <TokenListrik />
            </Col>
            {windowHash == "#Pra-Bayar" ? (
              <Col span={15}>
                <TablePagination
                  header={tableHeader}
                  data={dataAPI}
                  isLoading={isLoading}
                />
              </Col>
            ) : (
              <Col span={15}>
                <TablePagination
                  header={tableHeader}
                  data={dataAPI}
                  isLoading={isLoading}
                />
              </Col>
            )}
          </Row>
        </Content>
      </Layout>
    </>
  );
};

export default OverviewEnvironmentPremises;
