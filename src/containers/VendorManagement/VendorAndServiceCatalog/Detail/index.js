/* eslint-disable radix */
/* eslint-disable no-use-before-define */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { useParams, useHistory } from "react-router-dom";
import {
  Grid,
  Typography,
  Button,
  Box,
  Table,
  TableCell,
  TableRow,
} from "@material-ui/core";
import PropTypes from 'prop-types';
import Slider from "react-slick";
import AddIcon from "@material-ui/icons/Add";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import EditIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/DeleteOutlineOutlined";
import { ChkyTablePagination } from "../../../../components";
import MuiIconLabelButton from "../../../../components/Button/MuiIconLabelButton";
import { PrimaryHard } from "../../../../assets/theme/colors";
import TableTemplate from "../common/TableTemplate/detail";
import AddServicePopUp from "./AddServicePopUp";
import EditServicePopUp from "./EditServicePopUp";
import { fetchDetailCatalog, deleteCatalogItem } from "../../ApiServices";
import ModalLoader from "../../../../components/ModalLoader";
import DeleteAlert from "../../../../components/Alert/Warning";
import useRupiahConverterSecondary from "../../../../helpers/useRupiahConverterSecondary";

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
  vendorTitle: {
    fontFamily: "Barlow",
    fontWeight: 500,
    fontSize: 28,
    color: "#2B2F3C",
  },
  titleContainer: {
    marginBottom: "42px",
  },
  buttonText: {
    color: PrimaryHard,
    textTransform: "capitalize",
  },
  container: {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "10px",
  },
  tableRow: {
    "& .MuiTableCell-sizeSmall": { padding: 2 },
  },
  tableCell: {
    borderBottom: "unset",
    fontSize: 12,
  },
  sliderContainer: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    '& .slick-prev:before': {
      color: PrimaryHard,
    },
    '& .slick-next:before': {
      color: PrimaryHard,
    },
    '& .slick-dots li.slick-active button:before': {
      color: PrimaryHard
    },
    '& .slick-list': {
      height: '200px',
    },
    '& .slick-list img': {
      height: '200px',
      objectFit: 'cover'
    },
    "& .MuiSvgIcon-root": {
      color: "black",
      backgroundColor: "#00000024",
      borderRadius: 20,
    },
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

function DetailPage() {
  const classes = useStyles();
  const { id } = useParams();
  const history = useHistory();

  // =====> STATIC DATA  <=====
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  const dummyPhotos = [
    'https://images.unsplash.com/photo-1646549101199-4f96e60584e7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3432&q=80',
    'https://images.unsplash.com/photo-1646550574194-2409555b1866?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2350&q=80'
  ];

  // =====> STATE of DATA TABLE  <=====
  const [dataRequest, setDataRequest] = useState(defaultDataHit);
  const [sortBy, setSortBy] = useState(null);
  const [orderDirection, setOrderDirection] = useState("ASC");
  const [resetPageCounter, setResetPageCounter] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const [dataVendor, setDataVendor] = useState({});
  const [dataDetailService, setDataService] = useState([]);
  const [itemId, setItemId] = useState(null);
  const [requestDetail, setRequestDetail] = useState({
    id : parseInt(id),
    pageNumber: 0,
    dataPerPage: 10,
    sortBy: "id",
    sortByType: "ASC",
  });

  const [openDialog, setOpenDialog] = useState({
    create: false,
    edit: false,
    delete: false,
  });
  const [isLoading, setLoading] = useState(false);

  const RenderImageSlider=({filePath})=>{
    // const [imageSlider,seImageSlider] = useState(null);
    // useEffect(()=>{
    //   try{
    //     getMinioFile(filePath).then(result=>{
    //     // console.log(">>>> try getMinio Offering ",JSON.stringify(result));
    //       seImageSlider(result);
    //     });
    //   }catch(err){
    //     console.log(">>>> Error try getMinio", err);
    //   }
    // },[]);
    // useEffect(()=>{console.log(">>>> imageSlider: ", imageSlider);},[imageSlider]);
    return(
      <div style={{ textAlign: 'center', }}>
        {filePath !== null &&
      <img src={filePath} alt="img" style={{width:'100%'}}/>
        }
      </div>
    );
  };
  RenderImageSlider.propTypes={
    filePath: PropTypes.string.isRequired,
  };

  const handleLoading = (value) => {
    setLoading(value);
  };

  function handleOpenDialog(key, keyId) {
    setOpenDialog((prevValue) => {
      return {
        ...prevValue,
        [key]: true,
      };
    });
    if (keyId) {
      setItemId(keyId);
    }
  }

  function handleCloseDialog(key) {
    setOpenDialog((prevValue) => {
      return {
        ...prevValue,
        [key]: false,
      };
    });
  }

  function handleChangePage(newPage) {
    setDataRequest({
      ...dataRequest,
      pageNumber: newPage,
    });
  }

  function handleSort(property) {
    return function actualFn(e) {
      const isActiveAndAsc = sortBy === property && orderDirection === "ASC";
      const sortByNewVal =
        TableTemplate.columnNameVar[TableTemplate.titleTable.indexOf(property)];
      const sortByType = isActiveAndAsc ? "DESC" : "ASC";
      setOrderDirection(sortByType);
      setSortBy(property);
      // setOrderBy(sortByNewVal);
      setRequestDetail({
        ...requestDetail,
        sortByType,
        sortBy: sortByNewVal,
      });
    };
  }

  function handleBackButton() {
    history.push(`/vendor-management/vendor-service-catalog`);
  }

  const handleDeleteItem = async () => {
    if (itemId === null) {
      return;
    }

    const requestPayload = {
      id: itemId,
    };
    const res = await deleteCatalogItem(requestPayload);
    if (res) {
      handleCloseDialog("delete");
      await fetchData();
    }
  };

  const getCatalogItemById = () => {
    const res = dataDetailService.find((item) => item.serviceId === itemId);
    console.log("+++ resObjEdit", res);
    return res;
  };

  const fetchData = async () => {
    setLoading(true);
    const res = await fetchDetailCatalog(handleLoading, requestDetail);
    if (res) {
      const { vendorInformation, detailService } = res;
      const tempDetailService = detailService.map((item) => {
        const { id: serviceId, nameService, costService } = item;
        return {
          serviceId,
          nameService,
          costService: parseInt(costService),
          editButton: (
            <Button
              className={classes.buttonText}
              style={{ textAlign: "right" }}
              endIcon={<EditIcon />}
              onClick={() => {
                handleOpenDialog("edit", serviceId);
              }}
            >
              Edit
            </Button>
          ),
          deleteButton: (
            <Button
              className={classes.buttonText}
              style={{ textAlign: "right" }}
              endIcon={<DeleteIcon />}
              onClick={() => {
                handleOpenDialog("delete", serviceId);
              }}
            >
              Delete
            </Button>
          ),
        };
      });
      setDataVendor(vendorInformation);
      setDataService(tempDetailService);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [requestDetail]);
  // console.log("+++ TableTemplate.valueType", TableTemplate.valueType);
  return (
    <div className={classes.root}>
      <Box>
        <Button
          className={classes.buttonText}
          startIcon={<ArrowBackIcon />}
          onClick={() => {
            handleBackButton();
          }}
          style={{ marginBottom: "20px" }}
        >
          Back
        </Button>
      </Box>
      <Grid
        container
        justify="space-between"
        alignItems="center"
        className={classes.titleContainer}
      >
        <Grid item>
          <Typography className={classes.title}>
            Vendor & Service Catalog Detail
          </Typography>
        </Grid>
        <Grid item>
          <MuiIconLabelButton
            style={{
              width: "max-content",
              right: 0,
              height: 40,
              boxShadow: "0px 6px 6px rgba(220, 36, 31, 0.1)",
              borderRadius: "6px",
            }}
            label=" Tambah Layanan"
            iconPosition="endIcon"
            buttonIcon={<AddIcon />}
            onClick={() => {
              handleOpenDialog("create");
            }}
          />
        </Grid>
      </Grid>
      <Box className={classes.container} style={{ marginBottom: "24px" }}>
        <Grid
          container
          justify="space-between"
          alignItems="center"
          style={{ marginBottom: "40px" }}
        >
          <Grid item>
            <Typography className={classes.vendorTitle}>
              {dataVendor?.vendorName}
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              style={{
                padding: "4px 14px",
                borderRadius: 20,
                border: dataVendor.status === 1 ? "1px solid #65D170" : "1px solid #FF6A6A",
                color: dataVendor.status === 1 ? "#65D170" : "#FF6A6A",
                fontSize: 13,
                fontWeight: 500,
                backgroundColor: dataVendor.status === 1 ? "#DEFFE1" : "#FFF7F7",
              }}
            >
              {dataVendor?.status === 1 ? "Aktif" : "Tidak Aktif"}
            </Typography>
          </Grid>
        </Grid>
        <Grid container alignItems="start">
          <Grid
            item
            xs={3}
            style={{ marginBottom: "24px", marginRight: "24px" }}
          >
            <div className={classes.sliderContainer}>
              <Slider {...sliderSettings} adaptiveHeight>
                {dummyPhotos.map((image) => {
                  return <RenderImageSlider filePath={image} />;
                })}
              </Slider>
            </div>
          </Grid>
          <Grid item xs={5}>
            <Table size="small">
              <TableRow className={classes.tableRow}>
                <TableCell width="40%" className={classes.tableCell}>
                  Vendor ID
                </TableCell>
                <TableCell className={classes.tableCell}>
                  : {dataVendor?.vendorId}
                </TableCell>
              </TableRow>
              <TableRow className={classes.tableRow}>
                <TableCell width="40%" className={classes.tableCell}>
                  Vendor Name
                </TableCell>
                <TableCell className={classes.tableCell}>
                  : {dataVendor?.vendorName}
                </TableCell>
              </TableRow>
              <TableRow className={classes.tableRow}>
                <TableCell width="40%" className={classes.tableCell}>
                  Email
                </TableCell>
                <TableCell className={classes.tableCell}>
                  : {dataVendor?.vendorEmail}
                </TableCell>
              </TableRow>
              <TableRow className={classes.tableRow}>
                <TableCell width="40%" className={classes.tableCell}>
                Nomor Telepon / HP
                </TableCell>
                <TableCell className={classes.tableCell}>
                  : {dataVendor?.vendorPhone}
                </TableCell>
              </TableRow>
              <TableRow className={classes.tableRow}>
                <TableCell width="40%" className={classes.tableCell}>
                  Status
                </TableCell>
                <TableCell className={classes.tableCell}>
                  <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                  :&nbsp;{dataVendor?.status === 1 ? (
                    <Typography style={{fontSize: 13, fontWeight: 700, fontFamily: "Barlow", color: "#65D170"}}>
                      Aktif
                    </Typography>
                  ) : (
                    <Typography style={{fontSize: 13, fontWeight: 700, fontFamily: "Barlow", color: PrimaryHard}}>
                      Tidak Aktif
                    </Typography>
                  )}
                  </div>
                </TableCell>
              </TableRow>
              <TableRow className={classes.tableRow}>
                <TableCell width="40%" className={classes.tableCell}>
                  Alamat
                </TableCell>
                <TableCell className={classes.tableCell}>
                  : {dataVendor?.vendorAddress}
                </TableCell>
              </TableRow>
            </Table>
          </Grid>
        </Grid>
      </Box>
      <Grid container direction="column">
        <ChkyTablePagination
          data={dataDetailService}
          fields={TableTemplate.titleTable}
          cellOption={TableTemplate.valueType}
          changePage={handleChangePage}
          isSort={TableTemplate.isSort}
          totalPages={totalPages}
          rowsPerPage={rowsPerPage}
          totalRows={totalRows}
          handleSort={handleSort}
          sortBy={sortBy}
          order={orderDirection}
          isUsingMuiSort
          leftAlignHeaders={[0, 1, 2]}
          leftAlignBody={[0, 1, 2]}
          isDisablePagination
        />
      </Grid>
      <AddServicePopUp
        refresh={fetchData}
        isOpen={openDialog.create}
        onClose={() => {
          handleCloseDialog("create");
        }}
      />
      {openDialog.edit && (
        <EditServicePopUp
          refresh={fetchData}
          getData={getCatalogItemById}
          isOpen={openDialog.edit}
          itemId={itemId}
          onClose={() => {
            handleCloseDialog("edit");
          }}
        />
      )}
      <DeleteAlert
        isOpen={openDialog.delete}
        title="Anda yakin akan menghapus?"
        subTitle="Anda tidak dapat membatalkan tindakan ini"
        onConfirm={handleDeleteItem}
        onClose={() => {
          handleCloseDialog("delete");
        }}
      />
      <ModalLoader isOpen={isLoading} />
    </div>
  );
}

export default DetailPage;
