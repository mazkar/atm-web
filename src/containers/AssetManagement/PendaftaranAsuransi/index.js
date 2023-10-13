import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { Typography, Grid, Checkbox, Button } from "@material-ui/core";
import MuiIconLabelButton from "../../../components/Button/MuiIconLabelButton";
import AddIcon from "@material-ui/icons/Add";
import { ReactComponent as UploadIcon } from "../../../assets/icons/linear-red/upload.svg";
import Constants from "../../../helpers/constants";
import { SummaryCardsAsurance } from "./SummaryCard";
import PopUpUploadInvoice from "../../VendorManagement/Orders/common/PopUpUploadInvoice";
import FilterComponent from "./common/FilterComponent";
import { ChkyTablePagination } from "../../../components";
import TableTemplate from "./common/TableTemplate";
import { dummyData } from "./common/dummyData";
import { useHistory } from "react-router-dom";

const UseStyles = makeStyles({
  root: {
    padding: "30px 20px 20px 30px",
  },
  title: {
    fontFamily: "Barlow",
    fontWeight: 500,
    fontSize: 36,
    color: "#2B2F3C",
  },
  titleContainer: {
    marginBottom: 25,
  },
  col: {
    display: "flex",
    alignItems: "center",
  },
  paramButton: {
    width: "max-content",
    color: Constants.color.primaryHard,
    backgroundColor: "white",
    height: 40,
    marginRight: 10,
    border: "1px solid",
    borderColor: Constants.color.primaryHard,
    borderRadius: 10,
    textTransform: "capitalize",
  },
  approve: {
    width: 32,
    height: 32,
    padding: 5,
    borderRadius: "50%",
    color: "#FFFFFF",
    fontWeight: 400,
    fontSize: 14,
  },
  statusAcc: {
    fontFamily: "Barlow",
    fontSize: 13,
    fontWeight: 500,
    color: "#65D170",
    backgroundColor: "#DEFFE1",
    padding: "4px 10px",
    borderRadius: 40,
    border: "1px solid #65D170",
  },
  statusNonAcc: {
    fontFamily: "Barlow",
    fontSize: 13,
    fontWeight: 500,
    color: "#FFB443",
    backgroundColor: "#FFF9F0",
    padding: "4px 10px",
    borderRadius: 40,
    border: "1px solid #FFB443",
  },
  detailButton: {
    color: "#DC241F",
    backgroundColor: "none",
    textTransform: "capitalize",
  },
});

const rowsPerPage = 10;

function PendaftaranAsuransi(props) {
  const history = useHistory();
  const classes = UseStyles();
  const [modalUpload, setModalUpload] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState(null);
  const [orderDirection, setOrderDirection] = useState("ASC");
  const [totalPage, setTotalPage] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const [data, setData] = useState([]);

  const handleLoading = (laod) => {
    setIsLoading(load);
  };

  const handleClickUpload = () => {
    setModalUpload(true);
  };

  const closeModalUpload = () => {
    setModalUpload(false);
  };

  //FUNCTION HANDLE CHANGE PAGE
  function handleChangePage(newPage) {
    console.log(newPage);
    setDataRequest({
      ...dataRequest,
      pageNumber: newPage,
    });
  }

  //HANDLE SORT
  function handleSort(property) {
    return function actualFn(e) {
      const isActiveAndAsc = sortBy === property && orderDirection === "ASC";
      const sortByNewVal =
        TableTemplate.columnNameVar[TableTemplate.titleTable.indexOf(property)];
      const sortType = isActiveAndAsc ? "DESC" : "ASC";
      setOrderDirection(sortType);
      setSortBy(property);
      // setOrderBy(sortByNewVal);
      setDataRequest({
        ...dataRequest,
        sortType,
        sortBy: sortByNewVal,
      });
    };
  }
  //END HANDLE SORT

  const handleDetail = (id) => {
    history.push(`/asset-management/insurance/pendaftaran/${id}`);
  };

  function approve(item) {
    if (item === "RA") {
      return (
        <div
          className={classes.approve}
          style={{
            backgroundColor: "#88ADFF",
          }}
        >
          {item}
        </div>
      );
    } else if (item === "TS") {
      return (
        <div
          className={classes.approve}
          style={{
            backgroundColor: "#FFB443",
          }}
        >
          {item}
        </div>
      );
    } else {
      return (
        <div
          className={classes.approve}
          style={{
            backgroundColor: "#65D170",
          }}
        >
          {item}
        </div>
      );
    }
  }

  useEffect(() => {
    const dataRow = [];
    dummyData.map((item) => {
      const newRow = {
        RequestID: item.RequestID,
        NamaRequestor: item.NamaRequestor,
        OrderDate: item.OrderDate,
        DueDate: item.DueDate,
        SLA: item.sLA,
        Approver: approve(item.Approver),
        Status:
          item.Status === 1 ? (
            <div className={classes.statusAcc}>Approved</div>
          ) : (
            <div className={classes.statusNonAcc}>Need Approval</div>
          ),
        OnBehalf:
          item.OnBehalf === "ok" ? (
            <Checkbox style={{ color: "#DC241F" }} checked={true} />
          ) : (
            <Checkbox style={{ color: "#DC241F" }} checked={false} />
          ),
        Telephone: item.Telephone,
        Email: item.Email,
        Divisi: item.Divisi,
        Team: item.Team,
        Branch: item.Branch,
        JenisAsuransi: item.JenisAsuransi,
        TypeTransaksi: item.TypeTransaksi,
        CashMachineName: item.CashMachineName,
        Model: item.Model,
        IDMesin: item.IDMesin,
        BeradadiPropertyCIMBNiaga:
          item.BeradadiPropertyCIMBNiaga === "ok" ? (
            <Checkbox style={{ color: "#DC241F" }} checked={true} />
          ) : (
            <Checkbox style={{ color: "#DC241F" }} checked={false} />
          ),
        Lokasi: item.Lokasi,
        TipeMesin: item.TipeMesin,
        SerialNumber: item.SerialNumber,
        Harga: item.Harga,
        TanggalEfektif: item.TanggalEfektif,
        Alamat: item.Alamat,
        action: (
          <Button
            onClick={() => handleDetail(item.RequestID)}
            className={classes.detailButton}
          >
            Detail
          </Button>
        ),
      };
      dataRow.push(newRow);
    });
    setData(dataRow);
  }, []);

  return (
    <div className={classes.root}>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item>
          <Typography className={classes.title}>
            Pendaftaran Asuransi
          </Typography>
        </Grid>
        <Grid item>
          <div className={classes.col}>
            <MuiIconLabelButton
              className={classes.paramButton}
              style={{
                width: "max-content",
                background: "#FFFFFF",
                border: "1px solid #DC241F",
                boxShadow: "0px 6px 6px rgba(220, 36, 31, 0.1)",
                borderRadius: "6px",
              }}
              label="Upload Pembayaran"
              iconPosition="endIcon"
              buttonIcon={<UploadIcon />}
              onClick={handleClickUpload}
            />
            <MuiIconLabelButton
              style={{
                width: "max-content",
                right: 0,
                height: 40,
                boxShadow: "0px 6px 6px rgba(220, 36, 31, 0.1)",
                borderRadius: "6px",
                marginRight: "10px",
              }}
              label="Tambah Asuransi"
              iconPosition="endIcon"
              buttonIcon={<AddIcon />}
              // onClick={handleAddForum}
            />
          </div>
        </Grid>
      </Grid>

      <PopUpUploadInvoice isOpen={modalUpload} onClose={closeModalUpload} />

      <Grid container direction="column">
        <Grid item xs={12}>
          <SummaryCardsAsurance />
        </Grid>
        <Grid item xs={12}>
          <FilterComponent />
        </Grid>
        <Grid item xs={12}>
          <ChkyTablePagination
            fields={TableTemplate.titleTable}
            isSort={TableTemplate.isSort}
            isLoadData={isLoading}
            sortBy={sortBy}
            order={orderDirection}
            totalRows={totalRows}
            totalPages={totalPage}
            rowsPerPage={rowsPerPage}
            cellOption={TableTemplate.valueType}
            data={data}
            handleSort={handleSort}
            isUsingMuiSort
            changePage={handleChangePage}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default PendaftaranAsuransi;
