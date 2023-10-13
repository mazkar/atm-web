/* eslint-disable radix */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Grid, Typography, Button, Link, IconButton } from "@material-ui/core";
import axios from "axios";
import AttachmentOutlinedIcon from "@material-ui/icons/AttachmentOutlined";
import { makeStyles } from "@material-ui/styles";
import { Space } from "antd";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import { withRouter, useHistory, useParams } from "react-router-dom";

// internal import
import constansts from "../../../../helpers/constants";
import { PrimaryHard } from "../../../../assets/theme/colors";
import { ReactComponent as BackIcon } from "../../../../assets/icons/general/arrow_back_red.svg";
import TableInfo from "./TableInfo";
import SideBar from "./SideBar";
import { ChkyTablePagination } from "../../../../components";
import TableTemplate from "./DummyData";
import FloatingChat from "../../../../components/GeneralComponent/FloatingChat";
import { TabPanel } from "../../../../components/TabsMui";
import TablePagination from "../../../../components/chky/ChkyTablePagination";
import { ReactComponent as AttachIcon } from "../../../../assets/icons/duotone-red/AttachIcon.svg";
import LoadingView from "../../../../components/Loading/LoadingView";

const useStyles = makeStyles({
  root: { padding: "30px 20px 20px 30px" },
  backLabel: {
    fontSize: 17,
    color: constansts.color.primaryHard,
    marginLeft: 5,
  },
  backAction: {
    backgroundColor: "unset",
    padding: 0,
    "& .MuiButton-root": {
      padding: 0,
      textTransform: "none",
      backgroundColor: "unset",
    },
    "& .MuiButton-root:hover": { opacity: 0.6, backgroundColor: "unset" },
  },
  title: {
    fontFamily: "Barlow",
    fontWeight: "500",
    fontSize: "36px",
    color: "#2B2F3C",
  },
  divider: { marginTop: 25 },
  boldText: {
    fontFamily: "Barlow",
    fontWeight: "600",
    fontSize: "13px",
    color: "#2B2F3C",
  },
  normalText: {
    fontFamily: "Barlow",
    fontWeight: "400",
    fontSize: "13px",
    color: "#2B2F3C",
  },
  tableRoot: {
    minWidth: 500,
  },
  tableCell: {
    borderBottom: "none",
  },
});

const titleTable = [
  "Tanggal Invoice",
  "Nama Invoice",
  "Nomor Invoice",
  "Invoice",
];
const valueType = ["string", "string", "string", "string"];
function index(props) {
  const classes = useStyles();
  const history = useHistory();
  const [activeMenu, setActiveMenu] = useState(0);
  const [activeValue, setActiveValue] = useState("Activation");
  const [data, setData] = useState();
  const [dataInfo, setDataInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [dataSidebar, setDataSideBar] = useState([]);
  const [dataTable, setDataTable] = useState([]);
  const { id } = useParams();

  // Fetch Data Sidebar

  const configNew = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };

  async function getDataSideBar() {
    setIsLoading(true);
    // console.log('~ dataRequest', dataRequest);
    try {
      const result = await axios.get(
        `${constansts.FILE_MANAGEMENT_SERVICE}/vendorNeed?implementationId=${id}`,

        configNew
      );
      setDataSideBar(result.data.data);
      setIsLoading(false);
      console.log("res data sidebar", result.data);
    } catch (err) {
      alert(`Error Fetching Data Orders ...! \n${err}`);
    }
    setIsLoading(false);
  }

  // Fetch Data Table
  const dataRequest = {
    implementationId: parseInt(id),
    vendorNeed: activeValue.toLocaleLowerCase(),
    pageNumber: 0,
    dataPerPage: 10,
    sortType: "ASC",
  };

  async function getDataTable() {
    setIsLoading(true);
    // console.log('~ dataRequest', dataRequest);
    try {
      const result = await axios.post(
        `${constansts.FILE_MANAGEMENT_SERVICE}/docInvoicePagination`,
        dataRequest,

        configNew
      );
      setIsLoading(false);
      setDataTable(
        result.data?.content?.map((item) => ({
          invoiceDate: item.invoiceDate,
          invoiceName: item.invoiceName,
          invoiceNumber: item.invoiceNumber,

          Action: (
            <>
              <IconButton
                id="test123"
                style={{
                  color: PrimaryHard,
                  fontSize: 14,
                  Background: "transparant",
                  fontWeight: "500",
                }}
                // onClick={(e) => handleOpenMenu(e)}
                // aria-describedby={id}
                aria-haspopup="true"
                // onClick={() => navigateToDetail(item.implementationId)}
              >
                <Space>
                  {item.invoice != null ? <AttachIcon /> : <p>-</p>}

                  <Typography style={{ textOverflow: "ellipsis" }}>
                    {item.invoice}
                  </Typography>
                </Space>
              </IconButton>
            </>
          ),
        }))
      );

      console.log("res data table", result.data);
    } catch (err) {
      alert(`Error Fetching Data Orders ...! \n${err}`);
    }
    setIsLoading(false);
  }

  // Fetch Data Info

  async function getDataInfo() {
    setIsLoading(true);
    // console.log('~ dataRequest', dataRequest);
    try {
      const result = await axios.get(
        `${constansts.FILE_MANAGEMENT_SERVICE}/detailAtmDocInvoice?implementationId=${id}`,
        dataRequest,

        configNew
      );
      console.log(result.data, "<= Data Info");
      setIsLoading(false);
      setDataInfo(result.data);
    } catch (err) {
      alert(`Error Fetching Data Orders ...! \n${err}`);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    getDataSideBar();
    getDataInfo();
  }, []);

  useEffect(() => {
    getDataTable();
  }, [activeMenu]);
  return (
    <div className={classes.root}>
      <Grid container style={{ marginBottom: 20 }}>
        <div className={classes.backAction}>
          <Button onClick={() => history.goBack()}>
            <BackIcon />
            <Typography className={classes.backLabel}>Back</Typography>
          </Button>
        </div>
      </Grid>
      <Grid container>
        <TableInfo data={dataInfo} loading={isLoading} />
      </Grid>
      <div className={classes.divider} />
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        spacing={2}
      >
        <Grid item xs={4}>
          <SideBar
            title="Vendor"
            items={dataSidebar}
            loading={isLoading}
            value={activeMenu}
            onValueChange={(newVal) => setActiveMenu(newVal)}
            onValueChangeValue={(val) => setActiveValue(val)}
          />
        </Grid>
        <Grid item xs={8}>
          {isLoading ? (
            <LoadingView />
          ) : (
            <TablePagination
              data={dataTable}
              fields={titleTable}
              cellOption={valueType}
            />
          )}
        </Grid>
      </Grid>
      {/* <FloatingChat /> */}
    </div>
  );
}

index.propTypes = {};

export default index;
