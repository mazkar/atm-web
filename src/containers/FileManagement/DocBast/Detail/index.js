import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Grid, Typography, Button, Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import { withRouter, useHistory, useParams } from "react-router-dom";

// internal import
import constansts from "../../../../helpers/constants";
import { ReactComponent as BackIcon } from "../../../../assets/icons/general/arrow_back_red.svg";
import TableInfo from "./TableInfo";
import SideBar from "./SideBar";
import { ChkyTablePagination } from "../../../../components";
import TableTemplate from "../common/dummyData";
import FloatingChat from "../../../../components/GeneralComponent/FloatingChat";
import useTimestampConverter from "../../../../helpers/useTimestampConverter";
import {
  doGetDetailDocBast,
  doGetVendorDocBast,
  doGetTableDocBast,
} from "../../serviceFileManagement";

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
function index(props) {
  const classes = useStyles();
  const history = useHistory();
  const [activeMenu, setActiveMenu] = useState(0);
  const [data, setData] = useState();
  const [dataInfo, setDataInfo] = useState();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [dataPromosi, setDataPromosi] = useState();
  const [dataMediaDetail, setMediaDetail] = useState();
  const [totalPages, setTotalPages] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const [dataVendor, setDataVendor] = useState([]);
  const defaultDataHit = {
    id: id,
    idVendor: activeMenu,
    pageNumber: 0,
    dataPerPage: 10,
    sortType: "ASC",
  };
  const [dataRequest, setDataRequest] = useState(defaultDataHit);

  function loaderDataHandler(newValue) {
    setIsLoading(newValue);
  }
  useEffect(() => {
    doGetDetailDocBast(loaderDataHandler, id).then((res) => {
      if (res) {
        setDataInfo(res.data);
        setDataPromosi(
          res.data.numOfOtherAtmDetail !== null
            ? JSON.parse(res.data.numOfOtherAtmDetail).toString()
            : ""
        );
        setMediaDetail(
          res.data.mediaPromotionDetail !== null
            ? JSON.parse(res.data.mediaPromotionDetail).toString()
            : ""
        );
      } else {
        setDataInfo();
      }
    });
  }, []);
  function handleRequest(newVal) {
    setActiveMenu(newVal);
    setDataRequest({
      ...dataRequest,
      idVendor: newVal,
    });
  }
  useEffect(() => {
    doGetVendorDocBast(loaderDataHandler, id).then((res) => {
      if (res) {
        if (res.data.length > 0) {
          console.log("res.vendor", res.data);
          setDataVendor(res.data);
        }
      }
    });
  }, []);
  const handleChangePage = (value) => {
    setDataRequest((prevValue) => ({
      ...prevValue,
      pageNumber: value,
    }));
  };
  useEffect(() => {
    doGetTableDocBast(loaderDataHandler, dataRequest).then((res) => {
      if (res) {
        if (res.content.length > 0) {
          console.log(res.content);
          setTotalPages(res.totalPages);
          setTotalRows(res.totalElements);
          const dataPush = [];
          const dataBast = res.content;
          dataBast.map((val) => {
            const newRow = {
              id: val.id,
              tanggal: useTimestampConverter(
                val.createDate / 1000,
                "DD/MM/YYYY"
              ),
              bastInfo:
                val.idBast !== null ? (
                  <div>
                    {" "}
                    <Link
                      onClick={() => {
                        history.push(`/file-management/doc-bast`);
                      }}
                      style={{
                        color: "#65D170",
                        display: "flex",
                        textDecoration: "none",
                        marginTop: 5,
                        fontWeight: 600,
                      }}
                    >
                      {val.bast}
                      <CheckIcon
                        style={{
                          color: "#65D170",
                          marginTop: -3,
                          height: 20,
                          width: 20,
                        }}
                      />
                    </Link>
                  </div>
                ) : (
                  <div>
                    <Link
                      onClick={() => {
                        history.push(`/file-management/doc-bast`);
                      }}
                      style={{
                        color: "red",
                        display: "flex",
                        textDecoration: "none",
                        fontWeight: 600,
                      }}
                    >
                      BAST Digital
                      <CloseIcon
                        style={{ color: "red", height: 20, width: 20 }}
                      />
                    </Link>
                  </div>
                ),
            };
            dataPush.push(newRow);
          });
          setData(dataPush);
        } else {
          setData([]);
        }
      }
    });
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
        <TableInfo
          data={dataInfo}
          dataAtm={dataPromosi}
          dataDetail={dataMediaDetail}
        />
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
            items={dataVendor}
            value={activeMenu}
            onValueChange={handleRequest}
          />
        </Grid>
        <Grid item xs={8}>
          <ChkyTablePagination
            data={data}
            fields={TableTemplate.titleDetail}
            cellOption={TableTemplate.valueTypeDetail}
            isLoadData={isLoading}
            changePage={handleChangePage}
            totalPages={totalPages}
            // rowsPerPage={rowsPerPage}
            totalRows={totalRows}
          />
        </Grid>
      </Grid>
      {/* <FloatingChat /> */}
    </div>
  );
}

index.propTypes = {};

export default index;
