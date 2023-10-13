/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid, Typography, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import MuiIconLabelButton from "../../../components/Button/MuiIconLabelButton";
import FilterProgress from "../Orders/common/FilterProgress";
import Constants from "../../../helpers/constants";
import TableTemplate from "./common/TableTemplate";
import { ChkyTablePagination } from "../../../components";
import { ReactComponent as FolderIcon } from "../../../assets/icons/linear-red/folder.svg";
import { ReactComponent as UploadIcon } from "../../../assets/icons/linear-red/upload.svg";

import AddNewCatalogPopUp from "./common/AddNewCatalogPopUp";
import {
  fetchSummaryVendorCatalog,
  exportExcelCatalog,
  uploadExcelCatalog,
} from "../ApiServices";
import ModalLoader from "../../../components/ModalLoader";

const useStyles = makeStyles({
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
  buttonText: {
    color: Constants.color.primaryHard,
    textTransform: "capitalize",
  },
});

const rowsPerPage = 10; // <--- init default rowsPerPage
// INIT DATA REQUEST
const defaultDataHit = {
  pageNumber: 0,
  dataPerPage: rowsPerPage,
  sortBy: "id",
  sortType: "ASC",
};

function index() {
  const classes = useStyles();
  const history = useHistory();

  // =====> Init State  <=====
  const [isLoading, setIsLoading] = useState({
    table: false,
    modal: false,
  });
  const [openDialog, setOpenDialog] = useState(false);

  // =====> DATA TABLE  <=====
  const [dataRequest, setDataRequest] = useState(defaultDataHit);
  const [sortBy, setSortBy] = useState(null);
  const [orderDirection, setOrderDirection] = useState("ASC");
  const [resetPageCounter, setResetPageCounter] = useState(0);
  const [totalDataPages, setTotalPages] = useState(0);
  const [totalRows, setTotalRows] = useState(0);

  const [data, setData] = useState([]);

  //  =====> Methods  <=====
  // set handler loader when call Approval API Service
  function loadingHandler(loaderValue, type) {
    setIsLoading((prev) => ({
      ...prev,
      [type]: loaderValue,
    }));
  }

  function handleChangePage(newPage) {
    setDataRequest({
      ...dataRequest,
      pageNumber: newPage,
    });
  }

  function handleDetailPage(id) {
    history.push(`/vendor-management/vendor-service-catalog/detail/${id}`);
  }

  const itemSearch = [
    {
      text: "Vendor ID",
      value: "vendorId",
    },
    {
      text: "Nama Vendor",
      value: "vendorName",
    },
    {
      text: "Email Vendor",
      value: "emailVendor",
    },
    {
      text: "No Telp/HP",
      value: "phoneVendor",
    },
    {
      text: "Alamat",
      value: "address",
    },
  ];

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

  function handleFilterSubmit(value) {
    setResetPageCounter((prevCount) => prevCount + 1);
    if (value === null) {
      setDataRequest(defaultDataHit);
    } else {
      // console.log("Sasa",value);
      setDataRequest({
        ...defaultDataHit,
        ...value,
      });
    }
  }

  function handleResetFilter() {
    setDataRequest({
      ...defaultDataHit,
    });
  }

  function handleOpenDialog() {
    setOpenDialog(true);
  }

  function handleCloseDialog() {
    setOpenDialog(false);
  }

  async function handleExport() {
    const res = await exportExcelCatalog(loadingHandler);
  }

  const handleClickUpload = () => {
    document.getElementById("uploadFile").click();
  };

  const handleUpload = async (e) => {
    loadingHandler(true, "modal");
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    const res = await uploadExcelCatalog(formData);
    console.log(res);
    loadingHandler(false, "modal");
  };

  const fetchData = async () => {
    loadingHandler(true, "modal");
    const res = await fetchSummaryVendorCatalog(loadingHandler, dataRequest);
    if (res) {
      const { content, totalPages, totalElements, numberOfElements } = res;
      const tempArray = content.map((item) => {
        const {
          address,
          emailVendor,
          id,
          phoneVendor,
          status,
          vendorId,
          vendorName,
        } = item;
        return {
          vendorId,
          vendorName,
          emailVendor,
          phoneVendor,
          address,
          status,
          action: (
            <Button
              className={classes.buttonText}
              onClick={() => {
                handleDetailPage(id);
              }}
            >
              Detail
            </Button>
          ),
        };
      });

      setData(tempArray);
      setTotalPages(totalPages);
      setTotalRows(totalElements);
      loadingHandler(false, "modal");
    }
  };

  useEffect(() => {
    fetchData();
  }, [dataRequest]);

  return (
    <div className={classes.root}>
      <Grid
        container
        justify="space-between"
        alignItems="center"
        className={classes.titleContainer}
      >
        <Grid item>
          <Typography className={classes.title}>
            Vendor & Service Catalog
          </Typography>
        </Grid>
        <Grid item>
          <MuiIconLabelButton
            className={classes.paramButton}
            style={{
              width: "max-content",
              background: "#FFFFFF",
              border: "1px solid #DC241F",
              boxShadow: "0px 6px 6px rgba(220, 36, 31, 0.1)",
              borderRadius: "6px",
            }}
            label="Export"
            iconPosition="endIcon"
            buttonIcon={<FolderIcon />}
            onClick={handleExport}
          />
          <MuiIconLabelButton
            className={classes.paramButton}
            style={{
              width: "max-content",
              background: "#FFFFFF",
              border: "1px solid #DC241F",
              boxShadow: "0px 6px 6px rgba(220, 36, 31, 0.1)",
              borderRadius: "6px",
            }}
            label="Upload"
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
            }}
            label="Add New"
            iconPosition="endIcon"
            buttonIcon={<AddIcon />}
            onClick={() => {
              setOpenDialog(true);
            }}
          />
        </Grid>
      </Grid>
      <Grid container spacing={1} direction="column">
        <Grid item style={{ width: "-webkit-fill-available" }}>
          {/* FILTER */}
          <div>
            <FilterProgress
              isOpening={false}
              itemSearch={itemSearch}
              onFilterSubmit={handleFilterSubmit}
              handleReset={handleResetFilter}
            />
          </div>
        </Grid>

        {/* Data Table */}
        <ChkyTablePagination
          isLoadData={isLoading.table}
          data={data}
          fields={TableTemplate.titleTable}
          cellOption={TableTemplate.valueType}
          changePage={handleChangePage}
          isSort={TableTemplate.isSort}
          totalPages={totalDataPages}
          rowsPerPage={rowsPerPage}
          totalRows={totalRows}
          handleSort={handleSort}
          sortBy={sortBy}
          order={orderDirection}
          isUsingMuiSort
          leftAlignHeaders={[0, 1, 2, 3, 4]}
          leftAlignBody={[0, 1, 2, 3, 4]}
        />
      </Grid>
      {openDialog && (
        <AddNewCatalogPopUp
          refresh={fetchData}
          isOpen={openDialog}
          onClose={() => {
            handleCloseDialog();
          }}
        />
      )}
      <ModalLoader isOpen={isLoading.modal} />
      <input
        id="uploadFile"
        type="file"
        accept=".xlsx, .xls"
        style={{ display: "none" }}
        onChange={(e) => {
          handleUpload(e);
        }}
      />
    </div>
  );
}

export default index;
