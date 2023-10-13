/* eslint-disable react/jsx-no-bind */
/* Third Party Import */
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid, Typography, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

/* Internal Import */
import MuiIconLabelButton from "../../../components/Button/MuiIconLabelButton";
import { ReactComponent as DownloadIcon } from "../../../assets/icons/linear-red/download-cloud.svg";
import { PrimaryHard } from "../../../assets/theme/colors";
import { ChkyTablePagination } from "../../../components";
import TableChips from "../../../components/Chips/TableChips";
import TableTemplateOpen from "./common/TableTemplate/Open";
import TableTemplateDone from "./common/TableTemplate/Done";
import FilterComponent from "../MediaPromosiQuality/common/FilterComponent";
import TabsComponent from "../../VendorManagement/PartAndServicePricelist/common/Tabs";
import PopUpUploadInvoice from "../../VendorManagement/Orders/common/PopUpUploadInvoice";
import ReminderPopUp from "./common/ReminderPopUp";
import { ReactComponent as UploadIcon } from "../../../assets/icons/linear-red/upload.svg";
import { doGetSummaryTaxTrackingOpen } from "../services";
import { RedHard } from "../../../assets/theme/colors";

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
    color: PrimaryHard,
    backgroundColor: "white",
    height: 40,
    marginRight: 10,
    border: "1px solid",
    borderColor: PrimaryHard,
    borderRadius: 10,
    textTransform: "capitalize",
  },
  textButton: {
    color: PrimaryHard,
    textTransform: "capitalize",
  },
});

const rowsPerPage = 10; // <--- init default rowsPerPage
const defaultDataHit = {
  pageNumber: 0,
  dataPerPage: 10,
  provinceId: "All",
  cityId: "All",
  districtId: "All",
  sortType: "ASC",
};

const TaxTracking = () => {
  const classes = useStyles();
  const history = useHistory();

  const [openDialog, setOpenDialog] = useState(false);
  const [uploadPembayaran, setUploadPembayaran] = useState(false);
  const [dataRequest, setDataRequest] = useState(defaultDataHit);
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [resetPageCounter, setResetPageCounter] = useState(0);
  const [summaryTaxOpen, setSummaryTaxOpen] = useState([]);
  const [tabs, setTabs] = useState(0);
  const [tableOpenConfig, setTableOpenConfig] = useState({
    dataRequest: {
      pageNumber: 0,
      dataPerPage: rowsPerPage,
      sortBy: "id",
      sortType: "ASC",
    },
    orderDirection: "ASC",
    totalPages: 0,
    totalRows: 0,
    sortBy: null,
  });

  /* Methods */

  // INIT LOADING
  const [isLoading, setIsLoading] = useState(true); /* <------- loading Table */
  function loaderHandler(loaderValue) {
    setIsLoading(loaderValue);
  }

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
    };

    return condition[type] ?? "default";
  }

  //format rupiah

  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  function handleDialogOpen() {
    setOpenDialog(true);
  }

  function handleDialogClose() {
    setOpenDialog(false);
  }

  function handleFilterSubmit(value) {
    setIsFilterApplied(true);
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
    setIsFilterApplied(false);
    setDataRequest({
      ...defaultDataHit,
    });
  }

  function handleChangePage(newPage) {
    setTableOpenConfig({
      dataRequest: {
        ...tableOpenConfig.dataRequest,
        pageNumber: newPage,
      },
    });
  }

  function handleSortOpenTable(property) {
    return function actualFn(e) {
      const isActiveAndAsc =
        tableOpenConfig.sortBy === property &&
        tableOpenConfig.orderDirection === "ASC";
      const sortByNewVal =
        TableTemplateOpen.columnNameVar[
          TableTemplateOpen.titleTable.indexOf(property)
        ];
      const sortType = isActiveAndAsc ? "DESC" : "ASC";
      setTableOpenConfig((prevValue) => ({
        ...prevValue,
        orderDirection: sortType,
        sortBy: property,
        dataRequest: {
          ...tableOpenConfig.dataRequest,
          sortType,
          sortBy: sortByNewVal,
        },
      }));
    };
  }

  const handleChangeTabs = (event, value) => {
    console.log(value);
    setTabs(value);
  };

  /*
    FUNCTIONAL COMPONENT
    Section ini terdiri dari dua functional component yaitu "PartPanel" dan "ServicePanel",
    kedua panel ini akan dipanggil dalam variable "tabsData" di bawah.
  */
  const OpenPanel = () => {
    return (
      <>
        <ChkyTablePagination
          data={summaryTaxOpen}
          fields={TableTemplateOpen.titleTable}
          cellOption={TableTemplateOpen.valueType}
          changePage={handleChangePage}
          isSort={TableTemplateOpen.isSort}
          totalPages={tableOpenConfig.isSort}
          rowsPerPage={rowsPerPage}
          totalRows={tableOpenConfig.totalRows}
          handleSort={handleSortOpenTable}
          sortBy={tableOpenConfig.sortBy}
          order={tableOpenConfig.orderDirection}
          isUsingMuiSort
        />
      </>
    );
  };

  const DonePanel = () => {
    return (
      <>
        <ChkyTablePagination
          data={TabelDoneData}
          fields={TableTemplateDone.titleTable}
          cellOption={TableTemplateDone.valueType}
          changePage={handleChangePage}
          isSort={TableTemplateDone.isSort}
          totalPages={tableOpenConfig.totalPages}
          rowsPerPage={rowsPerPage}
          totalRows={tableOpenConfig.totalRows}
          handleSort={handleSortOpenTable}
          sortBy={tableOpenConfig.sortBy}
          order={tableOpenConfig.orderDirection}
          isUsingMuiSort
        />
      </>
    );
  };

  //FUNCTIOH HIT SUMMARYTAXTRACKING OPEN
  const hitApiSummaryTaxTrackingOpen = () => {
    doGetSummaryTaxTrackingOpen(loaderHandler, dataRequest).then((response) => {
      const StoreNew = [];
      const dataContents = response.content;
      console.log(dataContents);
      dataContents.map((dataContent) => {
        StoreNew.push({
          id: dataContent.atmId,
          location: dataContent.locationName,
          address: "",
          kelurahan: dataContent.subDistrict,
          kecamatan: dataContent.district,
          area: dataContent.areaName,
          city: dataContent.city,
          provinsi: dataContent.province,
          condiiton: "",
          pajakAwal: dataContent.startTax,
          pajakAkhir: dataContent.endTax,
          nilaiPajak: rupiah(dataContent.tax),
          vendorPajak: "",
          typeOrderan: dataContent.orderType,
          signage: dataContent.signageAvailable,
          mediaSignage: dataContent.signageMedia,
          mediaSignage2: dataContent.signageMediaTwo,
          ukuranSignage: dataContent.signageSize,
          bentukUkuranSignage: "",
          sla: dataContent.slaWork,
          statusPajak: <TableChips label="Done" type={chipsHandler("done")} />,
          surveyObjekPajak: dataContent.taxObject,
          prosesDaftar: dataContent.register,
          reviewSKPD: dataContent.review,
          cetakSKPD: dataContent.printSKPD,
          prosesBayar: dataContent.payment,
          attachSKPDandSSPD: dataContent.attachment,
          action1: (
            <Button
              style={{ textTransform: "capitalize" }}
              onClick={() => {
                handleDialogOpen();
              }}
            >
              <Typography style={{ color: RedHard }}>Reminder</Typography>
            </Button>
          ),
          action2: (
            <Button
              style={{ color: PrimaryHard, textTransform: "capitalize" }}
              onClick={() => {
                history.push(
                  `/media-promosi/tracking-pengurusan-pajak/detail/1`
                );
              }}
            >
              Detail
            </Button>
          ),
        });
      });
      setSummaryTaxOpen(StoreNew);
    });
  };

  /* Static Data */

  useEffect(() => {
    hitApiSummaryTaxTrackingOpen();
  }, []);

  //table Done data

  const TabelDoneData = [
    {
      id: "1222",
      location: "TGR-CRM-CBG-CLG",
      address: "Jl. Delman Utama ",
      kelurahan: "Pondok Kopi",
      kecamatan: "Duren Sawit",
      area: "East",
      city: "Bekasi",
      provinsi: "Jawa Barat",
      condiiton: "New",
      pajakAwal: "01/01/2021",
      pajakAkhir: "01/01/2021",
      nilaiPajak: "Rp. 1.300.000",
      vendorPajak: "Multikencana",
      typeOrderan: "Kepengurusan Lokasi Baru",
      signage: "Ada",
      mediaSignage: "Pylon Sign",
      mediaSignage2: "0",
      ukuranSignage: "80 x 60 cm",
      bentukUkuranSignage: "Kecil",
      sla: "-89 days",
      statusPajak: <TableChips label="Done" type={chipsHandler("done")} />,
      surveyObjekPajak: "12/12/2021",
      prosesDaftar: "12/12/2021",
      reviewSKPD: "12/12/2021",
      cetakSKPD: "12/12/2021",
      prosesBayar: "12/12/2021",
      attachSKPDandSSPD: "12/12/2021",
      action1: (
        <Button
          style={{ color: PrimaryHard, textTransform: "capitalize" }}
          onClick={() => {
            handleDialogOpen();
          }}
        >
          Reminder
        </Button>
      ),
      action2: (
        <Button
          style={{ color: PrimaryHard, textTransform: "capitalize" }}
          onClick={() => {
            history.push(`/media-promosi/tracking-pengurusan-pajak/detail/1`);
          }}
        >
          Detail
        </Button>
      ),
    },
    {
      id: "1222",
      location: "TGR-CRM-CBG-CLG",
      address: "Jl. Delman Utama ",
      kelurahan: "Pondok Kopi",
      kecamatan: "Duren Sawit",
      area: "East",
      city: "Bekasi",
      provinsi: "Jawa Barat",
      condiiton: "New",
      pajakAwal: "01/01/2021",
      pajakAkhir: "01/01/2021",
      nilaiPajak: "Rp. 1.300.000",
      vendorPajak: "Multikencana",
      typeOrderan: "Kepengurusan Lokasi Baru",
      signage: "Ada",
      mediaSignage: "Pylon Sign",
      mediaSignage2: "0",
      ukuranSignage: "80 x 60 cm",
      bentukUkuranSignage: "Kecil",
      sla: "-89 days",
      statusPajak: (
        <TableChips label="Overdue" type={chipsHandler("Overdue")} />
      ),
      surveyObjekPajak: "12/12/2021",
      prosesDaftar: "12/12/2021",
      reviewSKPD: "12/12/2021",
      cetakSKPD: "12/12/2021",
      prosesBayar: "12/12/2021",
      attachSKPDandSSPD: "12/12/2021",
      action1: (
        <Button
          style={{ color: PrimaryHard, textTransform: "capitalize" }}
          onClick={() => {
            handleDialogOpen();
          }}
        >
          Reminder
        </Button>
      ),
      action2: (
        <Button
          style={{ color: PrimaryHard, textTransform: "capitalize" }}
          onClick={() => {
            history.push(`/media-promosi/tracking-pengurusan-pajak/detail/1`);
          }}
        >
          Detail
        </Button>
      ),
    },
    {
      id: "1222",
      location: "TGR-CRM-CBG-CLG",
      address: "Jl. Delman Utama ",
      kelurahan: "Pondok Kopi",
      kecamatan: "Duren Sawit",
      area: "East",
      city: "Bekasi",
      provinsi: "Jawa Barat",
      condiiton: "New",
      pajakAwal: "01/01/2021",
      pajakAkhir: "01/01/2021",
      nilaiPajak: "Rp. 1.300.000",
      vendorPajak: "Multikencana",
      typeOrderan: "Kepengurusan Lokasi Baru",
      signage: "Ada",
      mediaSignage: "Pylon Sign",
      mediaSignage2: "0",
      ukuranSignage: "80 x 60 cm",
      bentukUkuranSignage: "Kecil",
      sla: "-89 days",
      statusPajak: (
        <TableChips label="Overdue" type={chipsHandler("Overdue")} />
      ),
      surveyObjekPajak: "12/12/2021",
      prosesDaftar: "12/12/2021",
      reviewSKPD: "12/12/2021",
      cetakSKPD: "12/12/2021",
      prosesBayar: "12/12/2021",
      attachSKPDandSSPD: "12/12/2021",
      action1: (
        <Button
          style={{ color: PrimaryHard, textTransform: "capitalize" }}
          onClick={() => {
            handleDialogOpen();
          }}
        >
          Reminder
        </Button>
      ),
      action2: (
        <Button
          style={{ color: PrimaryHard, textTransform: "capitalize" }}
          onClick={() => {
            history.push(`/media-promosi/tracking-pengurusan-pajak/detail/1`);
          }}
        >
          Detail
        </Button>
      ),
    },
    {
      id: "1222",
      location: "TGR-CRM-CBG-CLG",
      address: "Jl. Delman Utama ",
      kelurahan: "Pondok Kopi",
      kecamatan: "Duren Sawit",
      area: "East",
      city: "Bekasi",
      provinsi: "Jawa Barat",
      condiiton: "New",
      pajakAwal: "01/01/2021",
      pajakAkhir: "01/01/2021",
      nilaiPajak: "Rp. 1.300.000",
      vendorPajak: "Multikencana",
      typeOrderan: "Kepengurusan Lokasi Baru",
      signage: "Ada",
      mediaSignage: "Pylon Sign",
      mediaSignage2: "0",
      ukuranSignage: "80 x 60 cm",
      bentukUkuranSignage: "Kecil",
      sla: "-89 days",
      statusPajak: <TableChips label="Done" type={chipsHandler("done")} />,
      surveyObjekPajak: "12/12/2021",
      prosesDaftar: "12/12/2021",
      reviewSKPD: "12/12/2021",
      cetakSKPD: "12/12/2021",
      prosesBayar: "12/12/2021",
      attachSKPDandSSPD: "12/12/2021",
      action1: (
        <Button
          style={{ color: PrimaryHard, textTransform: "capitalize" }}
          onClick={() => {
            handleDialogOpen();
          }}
        >
          Reminder
        </Button>
      ),
      action2: (
        <Button
          style={{ color: PrimaryHard, textTransform: "capitalize" }}
          onClick={() => {
            history.push(`/media-promosi/tracking-pengurusan-pajak/detail/1`);
          }}
        >
          Detail
        </Button>
      ),
    },
  ];

  /*
    STATIC DATA TABS
    Variable "tabsData" adalah data static yang berisikan header tabs dan body tabs,
    data ini akan dilooping dalam reusable component --> "TabsComponent"
  */
  const tabsData = [
    {
      header: "Open",
      component: <OpenPanel />,
    },
    {
      header: "Done",
      component: <DonePanel />,
    },
  ];

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
            Tracking Pengurusan Pajak
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
            label="Upload Pembayaran"
            iconPosition="endIcon"
            buttonIcon={<UploadIcon />}
            onClick={() => setUploadPembayaran(true)}
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
            label="Export to Excel"
            iconPosition="endIcon"
            buttonIcon={<DownloadIcon />}
          />
        </Grid>
      </Grid>
      <FilterComponent
        onFilterSubmit={handleFilterSubmit}
        handleReset={handleResetFilter}
      />
      {/* popup invoices */}

      <PopUpUploadInvoice
        isOpen={uploadPembayaran}
        onClose={() => setUploadPembayaran(false)}
      />

      <TabsComponent
        data={tabsData}
        currentTabs={tabs}
        onChange={handleChangeTabs}
      />
      <ReminderPopUp isOpen={openDialog} onClose={handleDialogClose} />
    </div>
  );
};

export default TaxTracking;
