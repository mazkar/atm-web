import {
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Filter from "./common/Filter";
import PopupAdd from "./common/PopupAdd";
import PopupEdit from "./common/PopupEdit";
import { ChkyButtons, TableCheckPagination } from "../../../components";
import FloatingChat from "../../../components/GeneralComponent/FloatingChat";
import { ReactComponent as PlusIcon } from "../../../assets/icons/siab/plus-white.svg";
import PopupDelete from "./common/PopupDelete";
import DeleteSuccess from "./common/DeleteSuccess";
import EditSuccess from "./common/EditSuccess";
import MenuPopUp from "./common/MenuPopUp";
import {
  doAddAndUpdateNoSurat,
  doDeleteNoSurat,
  doGetOverviewNoSurat,
} from "../serviceFileManagement";

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
  tambahNomor: {
    textTransform: "none",
    fontSize: 15,
    padding: "10px 10px 10px 20px",
    borderRadius: 8,
  },
  upperContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "end",
  },
  table: {
    overflow: "hidden",
    minWidth: 650,
    boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
    borderRadius: 10,
  },
  paginationContainer: {
    marginTop: 20,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pagination: {
    padding: 5,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    "& .MuiPaginationItem-root": {
      color: "#DC241F",
    },
  },
  customMenu: {
    "& .MuiPopover-paper": {
      minWidth: "140px",
      borderRadius: "4px",
      boxShadow: "0px 6px 6px rgb(232 238 255 / 30%)",
      fontSize: "13px",
      fontWeight: "500px",
    },
  },
  buttonsMenu: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontWeight: 500,
    fontSize: 13,
    color: "#2B2F3C",
  },
});

// function TabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`content-tabpanel-${index}`}
//       aria-labelledby={`content-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box p={3}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }

const rowsPerPage = 10; // <--- init default rowsPerPage

const PembuatanNoSurat = () => {
  const classes = useStyles();
  const [dataSurat, setDataSurat] = useState([]);
  const [currentId, setCurrentId] = useState("");

  const [openMenu, setOpenMenu] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [editSuccess, setEditSuccess] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  //Tabs Value
  const [valueTab, setValueTab] = useState(0);

  const [totalPages, setTotalPages] = useState(0);
  const [totalRows, setTotalRows] = useState(0); // <--- init default totalRows

  const [orderDirection, setOrderDirection] = useState("ASC");
  const [sortBy, setSortBy] = useState("id");
  const [orderBy, setOrderBy] = useState("id");

  const [resetPageCounter, setResetPageCounter] = useState(0);

  const initialRequest = {
    sortType: orderDirection,
    sortBy: orderBy,
    pageNumber: 0,
    dataPerPage: rowsPerPage,
    id: "1",
    letterType: "All",
    letterCode: "All",
    month: "All",
    year: "All",
    category: "All",
  };
  const [dataRequest, setDataRequest] = useState(initialRequest);

  // INIT STATE
  const [isLoading, setIsLoading] = useState(true); /* <------- loading Table */
  function loaderHandler(loaderValue) {
    setIsLoading(loaderValue);
  }
  const [isLoadingSummary, setIsLoadingSummary] =
    useState(true); /* <------- loading Summary */
  function loaderHandlerSummary(loaderValue) {
    setIsLoadingSummary(loaderValue);
  }

  // HANDLER
  function handleChangePage(newPage) {
    setDataRequest({
      ...dataRequest,
      pageNumber: newPage,
    });
  }

  const handleSorting = (type, column) => {
    setDataRequest({
      ...dataRequest,
      sortType: type,
      sortBy: column,
    });
  };

  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };
  const handleDeleteNoSurat = (id) => {
    doDeleteNoSurat(loaderHandler, { id: parseInt(id) }).then((res) => {
      if (res.status == 200) {
        setOpenDelete(false);
        setDeleteSuccess(true);
        setTimeout(() => {
          handleOverviewNoSurat();
          setDeleteSuccess(false);
        }, 3000);
      }
    });
  };

  const handleAddAndUpdateNoSurat = (data) => {
    doAddAndUpdateNoSurat(loaderHandler, { ...data }).then((res) => {
      console.log(res);
      if (res.status == 200) {
        setOpenEdit(false);
        data.id && setEditSuccess(true);
        setTimeout(() => {
          setOpenAdd(false);
          handleOverviewNoSurat();
          data.id && setEditSuccess(false);
        }, 3000);
      }
    });
  };

  const handleOverviewNoSurat = (selectedSearch, inputSearch) => {
    // Data DVR
    loaderHandler(true);
    if (
      selectedSearch != "All" &&
      selectedSearch != undefined &&
      inputSearch != undefined &&
      inputSearch != ""
    ) {
      setDataRequest((dataRequest[selectedSearch] = inputSearch));
    }

    const arrDataPush = [];

    console.log(dataRequest);
    const dataHit = {
      ...dataRequest,
    };
    console.log("selectedSearch handleOverview >>> ", selectedSearch);
    console.log("inputSearch handleOverview >>> ", inputSearch);

    doGetOverviewNoSurat(loaderHandler, dataHit).then((res) => {
      if (res.status == 200) {
        console.log(res);
        console.log("content >>> ", res.data.content);
        const arrData = res.data.content;
        arrData.map((item) => {
          console.log(item);
          arrDataPush.push({
            id: item.id,
            letterNumber: 1231321,
            letterType: item.letterType,
            letterCode: item.letterCode,
            month: item.month,
            year: item.year,
            category: item.category,
            action: (
              <MenuPopUp
                editHandler={() => {
                  setOpenEdit(true);
                  setCurrentId(item.id);
                }}
                deleteHandler={() => {
                  setOpenDelete(true);
                  setCurrentId(item.id);
                }}
                setCurrentId={item.id}
              />
            ),
          });
        });
        setDataSurat(arrDataPush);
        loaderHandler(true);
        loaderHandler(false);
        setTotalRows(res.data.totalElements);
        setTotalPages(res.data.totalPages);
        setDataRequest(initialRequest);
      }
    });
  };

  useEffect(() => {
    handleOverviewNoSurat();
  }, []);

  useEffect(() => {
    console.log(dataSurat);
  }, [dataSurat]);

  return (
    <div className={classes.root}>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        style={{ marginBottom: 35 }}
      >
        <Grid item>
          <Typography className={classes.title}>Pembuatan No Surat</Typography>
        </Grid>
        <Grid>
          <ChkyButtons
            style={{
              textTransform: "none",
              fontSize: 15,
              padding: "10px 10px 10px 20px",
              borderRadius: 8,
            }}
            onClick={() => {
              setOpenAdd(true);
              setAnchorEl(null);
            }}
          >
            Tambah Nomor <PlusIcon />
          </ChkyButtons>
        </Grid>
      </Grid>
      <Grid container direction="column" style={{ marginBottom: 35 }}>
        <Grid item xs={12}>
          <Filter handleApplyFilter={handleOverviewNoSurat} />
        </Grid>
        <Grid item xs={12}>
          <TableCheckPagination
            data={dataSurat}
            fields={titleTableSurat}
            cellOption={valueTypeTableSurat}
            totalPages={totalPages}
            rowsPerPage={rowsPerPage}
            totalRows={totalRows}
            changePage={handleChangePage}
            resetPageCounter={resetPageCounter}
            isWithCheck={false}
            isLoadData={isLoading}
            sorting={handleSorting}
            isSort
            // alignTitleData={alignTitleData}
          />
        </Grid>
      </Grid>
      <PopupAdd
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        onSubmit={handleAddAndUpdateNoSurat}
      />
      <PopupEdit
        data={dataSurat}
        selectedId={currentId}
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        onSubmit={handleAddAndUpdateNoSurat}
      />
      <PopupDelete
        selectedId={currentId}
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onSubmit={handleDeleteNoSurat}
      />

      <DeleteSuccess
        open={deleteSuccess}
        onClose={() => setDeleteSuccess(false)}
      />
      <EditSuccess open={editSuccess} onClose={() => setEditSuccess(false)} />
      {/* <FloatingChat /> */}
    </div>
  );
};

export default PembuatanNoSurat;

const titleTableSurat = [
  { id: "id", numeric: false, disablePadding: false, label: "ID" },
  {
    id: "letterNumber",
    numeric: false,
    disablePadding: false,
    label: "No Surat",
  },
  {
    id: "letterType",
    numeric: false,
    disablePadding: false,
    label: "Jenis Surat",
  },
  {
    id: "letterCode",
    numeric: false,
    disablePadding: false,
    label: "Kode Surat",
  },
  { id: "month", numeric: false, disablePadding: false, label: "Bulan" },
  { id: "year", numeric: false, disablePadding: false, label: "Tahun" },
  { id: "category", numeric: false, disablePadding: false, label: "Kategori" },
  { id: "action", numeric: false, disablePadding: false, label: "" },
];

const valueTypeTableSurat = [
  "hide",
  "string",
  "string",
  "string",
  "string",
  "string",
  "string",
  "",
];

const alignTitleData = [
  "left",
  "left",
  "left",
  "left",
  "left",
  "left",
  "left",
  "left",
];
