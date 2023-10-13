import React, { useState, useEffect } from "react";
import {
  Grid,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Paper,
  Typography,
  Collapse,
  Button,
  TextField,
} from "@material-ui/core";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { RedHard } from "../../../assets/theme/colors";
import { Dark } from "../../../assets/theme/colors";
import { sideBarMenu } from "./common/DataDummy";
import DetailEyeBowling from "./common/DetailEyeBowling";
import { ReactComponent as LeftIcon } from "../../../assets/icons/siab/chevron-left.svg";
import { ReactComponent as RightIcon } from "../../../assets/icons/siab/chevron-right.svg";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import constants from "../../../helpers/constants";
import { Pagination } from "@material-ui/lab";
import { doGetMediaPromosiEyebowling } from "../services";
import LoadingView from "../../../components/Loading/LoadingView";
import { listRequest } from "./common/DataDummy";
import { doPrevAndNextGalleryMediaPromosi } from "../services";
import { PrimaryHard } from "../../../assets/theme/colors";
import EmptyImg from "../../../assets/images/empty_data.png";

const UseStyles = makeStyles({
  rootPage: {
    padding: "30px 20px 20px 30px",
  },
  root: {
    "&$selected": {
      backgroundColor: "#FFF5F4",
    },
  },
  selected: {},
  title: {
    fontFamily: "Barlow",
    fontWeight: 500,
    fontSize: 36,
    color: "#2B2F3C",
  },
  content: {
    marginTop: 25,
  },
  sidebarPage: {
    borderRadius: 10,
    minHeight: 770,
  },
  listNav: {
    padding: "17px 20px",
  },
  titleSideBar: {
    fontFamily: "Barlow",
    fontSize: 17,
    fontWeight: 600,
  },
  titleList: {
    fontFamily: "Barlow",
    fontSize: "13px",
    fontWeight: 600,
    color: Dark,
  },
  subList: {
    fontFamily: "Barlow",
    fontWeight: 400,
    fontSize: "12px",
    color: "#8D98B4",
  },
  paperWrapper: {
    "& .MuiPaper-elevation1": {
      boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
    },
  },
  backAction: {
    backgroundColor: "unset",
    padding: 0,
    borderRadius: 10,
    "& .MuiButton-root": {
      padding: 0,
      textTransform: "none",
      backgroundColor: constants.color.primaryUltaSoft,
    },
    "& .MuiButton-root:hover": {
      opacity: 0.6,
      backgroundColor: constants.color.primaryUltaSoft,
    },
  },
  paginationContainer: {
    "& > *": {
      marginTop: 15,
      marginBottom: 35,
    },
    display: "flex",
    justifyContent: "space-between",
  },
  pagination: {
    padding: 5,
    backgroundColor: constants.color.white,
    borderRadius: 10,
    "& .Mui-selected": {
      backgroundColor: constants.color.primaryUltaSoft,
    },
    "& .MuiPaginationItem-root": {
      color: constants.color.primaryHard,
    },
  },
  imageEmpty: {
    height: 240,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  inputFilter: {
    width: 50,
    marginTop: 2,
  },
  resize: {
    fontSize: 20,
    fontWeight: 600,
    fontFamily: "Barlow",
  },
});

const rowsPerPage = 5;
const defaultData = {
  dataPerPage: rowsPerPage,
  pageNumber: 0,
  sortBy: "atmId",
  category: "Gallery Foto Sekitar ATM",
  sortType: "ASC",
  atmId: "All",
};

function MediaPromosiEyeBowling(props) {
  const classes = UseStyles();
  //state
  const [collapse, setCollapse] = useState(true);
  const [data, setData] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [dataRequest, setDataRequest] = useState(defaultData);
  const [isLoading, setIsLoading] = useState(true);
  const [currentAtmId, setCurrentAtmId] = useState(null);
  const [dataRequestId, setDataRequestId] = useState({ atmId: currentAtmId });
  const [prevId, setPrevId] = useState(0);
  const [nextId, setNextId] = useState(0);
  const [isActiveLeft, setIsActiveLeft] = useState(false);
  const [isActiveRight, setIsActiveRight] = useState(false);
  const [nomorGaleri, setNomorGaleri] = useState(2);

  //state total element
  const [fotoSekitarATM, setFotoSekitarATM] = useState(0);
  const [fotoNegatif, setFotoNegatif] = useState(0);
  const [fotoFlagMounted, setFotoFlagMounted] = useState(0);
  const [fotoStikerKaca, setFotoStikerKaca] = useState(0);
  const [fotoBooth, setFotoBooth] = useState(0);

  //function
  const handleClick = () => {
    setCollapse(!collapse);
  };

  // set handler loader when call Approval API Service
  function loadingHandler(loaderValue) {
    setIsLoading(loaderValue);
  }

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      setDataRequest({
        ...dataRequest,
        atmId: currentAtmId,
      });
    }
  };

  const handleClickDetail = (category) => {
    setDataRequest({
      ...dataRequest,
      category: category,
      atmId: "All",
      pageNumber: 0,
    });
    setCurrentPage(1);

    switch (category) {
      case "Gallery Foto Negatif":
        setNomorGaleri(3);
        break;
      case "Gallery Foto Sekitar ATM":
        setNomorGaleri(2);
        break;
      case "Gallery Flag Mounted":
        setNomorGaleri(1);
        break;
      case "Gallery Foto Sticker Kaca":
        setNomorGaleri(1);
        break;
      case "Gallery Foto Booth":
        setNomorGaleri(1);
        break;
      default:
        setNomorGaleri(2);
        break;
    }

    console.log(category);
    // setIsActiveLeft(false);
    // setIsActiveRight(false);
  };

  const handleChangeFilter = (e) => {
    setCurrentAtmId(e.target.value);
  };
  //handle chage page value
  const handleChangePageValue = (event, value) => {
    setDataRequest({
      ...dataRequest,
      pageNumber: value - 1,
    });
    setCurrentPage(value);
  };
  //handle prev and next

  const handlePrevId = () => {
    setDataRequest({
      ...dataRequest,
      atmId: prevId,
    });
    // setIsActiveLeft(true);
    // setIsActiveRight(false);
  };

  const handleNextId = () => {
    setDataRequest({
      ...dataRequest,
      atmId: nextId,
    });
    // setIsActiveRight(true);
    // setIsActiveLeft(false);
  };

  useEffect(() => {
    doGetMediaPromosiEyebowling(loadingHandler, listRequest.reqFotoSekitarAtm)
      .then((response) => {
        if (response) {
          setFotoSekitarATM(response.totalElements);
        }
      })
      .catch((err) => {
        alert(`Error Fetchind Data ${err}`);
      });
    //fetch foto negatif
    doGetMediaPromosiEyebowling(loadingHandler, listRequest.reqFotoNegatif)
      .then((response) => {
        if (response) {
          setFotoNegatif(response.totalElements);
        }
      })
      .catch((err) => {
        alert(`Error Fetchind Data ${err}`);
      });

    //fetch foto flagmounted
    doGetMediaPromosiEyebowling(loadingHandler, listRequest.reqFotoFlagMounted)
      .then((response) => {
        if (response) {
          setFotoFlagMounted(response.totalElements);
        }
      })
      .catch((err) => {
        alert(`Error Fetchind Data ${err}`);
      });

    //fetch foto sticker kaca
    doGetMediaPromosiEyebowling(loadingHandler, listRequest.reqFotoStickerKaca)
      .then((response) => {
        if (response) {
          setFotoStikerKaca(response.totalElements);
        }
      })
      .catch((err) => {
        alert(`Error Fetchind Data ${err}`);
      });

    //fetch foto booth
    doGetMediaPromosiEyebowling(loadingHandler, listRequest.reqFotoBooth)
      .then((response) => {
        if (response) {
          setFotoBooth(response.totalElements);
        }
      })
      .catch((err) => {
        alert(`Error Fetchind Data ${err}`);
      });
  }, []);

  useEffect(() => {
    doGetMediaPromosiEyebowling(loadingHandler, dataRequest)
      .then((response) => {
        if (response) {
          if (response.responseCode === "200") {
            setTotalPages(response.totalPages);
            setTotalRows(response.totalElements);
            const dataRow = response.fotoFlagMounted
              ? response.fotoFlagMounted
              : response.fotoAtmSekitar
              ? response.fotoAtmSekitar
              : response.fotoBooth
              ? response.fotoBooth
              : response.fotoSkitarKaca
              ? response.fotoSkitarKaca
              : response.fotoNegative;
            setData(dataRow);
            if (dataRow.length > 0) {
              setCurrentAtmId(dataRow[0].atmId);

              doPrevAndNextGalleryMediaPromosi(loadingHandler, {
                atmId: dataRow[0].atmId,
                numberGallery: nomorGaleri,
              }).then((response) => {
                console.log(response);
                if (response) {
                  setNextId(response.nextAtmId);
                  setCurrentAtmId(response.currentAtmId);
                  setPrevId(response.prevAtmId);
                }
              });
            } else {
              setCurrentAtmId(null);
            }
          }
        }
      })
      .catch((err) => {
        alert(`Error Fetchind Data ${err}`);
      });
  }, [dataRequest, currentPage]);

  return (
    <div className={classes.rootPage}>
      <Typography className={classes.title}>
        Media Promosi Eye Bowling
      </Typography>
      <Grid container direction="row" className={classes.content}>
        {/* sidebar */}
        <Grid item md={2} sm={12} style={{ marginTop: "20px" }}>
          <Paper className={classes.sidebarPage}>
            <List component="nav" aria-labelledby="Sidebar Overview">
              <ListItem className={classes.listNav}>
                <ListItemText>
                  <Typography className={classes.titleSideBar}>
                    Overview
                  </Typography>
                </ListItemText>
                {collapse ? (
                  <ExpandLess
                    button
                    onClick={handleClick}
                    style={{ color: RedHard }}
                  />
                ) : (
                  <ExpandMore
                    button
                    onClick={handleClick}
                    style={{ color: RedHard }}
                  />
                )}
              </ListItem>
              <Collapse in={collapse} timeout="auto" unmountOnExit>
                <List component="nav" aria-label="Kategori">
                  {sideBarMenu.map((item, index) => (
                    <ListItem
                      button
                      selected={item.id === selectedIndex}
                      onClick={() => {
                        setSelectedIndex(item.id);
                        handleClickDetail(item.category);
                      }}
                      classes={{
                        root: classes.root,
                        selected: classes.selected,
                      }}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "6px 20px",
                      }}
                    >
                      <div>
                        <Typography className={classes.titleList}>
                          {item.category}
                        </Typography>
                        <Typography className={classes.subList}>
                          {item.id === 1
                            ? fotoSekitarATM
                            : item.id === 2
                            ? fotoNegatif
                            : item.id === 3
                            ? fotoFlagMounted
                            : item.id === 4
                            ? fotoStikerKaca
                            : fotoBooth}{" "}
                          Photos
                        </Typography>
                      </div>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            </List>
          </Paper>
        </Grid>
        <Grid item md={10} sm={12} style={{ marginTop: "20px" }}>
          {isLoading ? (
            <div style={{ maxHeight: 100, marginLeft: 30 }}>
              <LoadingView />
            </div>
          ) : (
            <div style={{ marginLeft: 20 }}>
              {data.length < 1 ? (
                <Grid container direction="column" spacing={2}>
                  <Grid item xs={12}>
                    <Paper className={classes.imageEmpty}>
                      <img src={EmptyImg} style={{ opacity: 0.5 }} />
                    </Paper>
                  </Grid>
                </Grid>
              ) : (
                <Grid container direction="column">
                  {data.map((dataFoto) => (
                    <Grid item xs={12} style={{ marginBottom: 20 }}>
                      <Paper
                        className={classes.paperWrapper}
                        style={{ height: "auto" }}
                      >
                        <DetailEyeBowling
                          dataFoto={dataFoto}
                          isLoading={isLoading}
                        />
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              )}

              {/* pagination */}
              <div className={classes.paginationContainer}>
                <Typography
                  style={{ fontSize: 15, color: constants.color.grayMedium }}
                >
                  Showing {(currentPage - 1) * rowsPerPage + 1} -
                  {(currentPage - 1) * rowsPerPage + data.length} of {totalRows}
                </Typography>
                <Pagination
                  page={currentPage}
                  count={totalPages}
                  className={classes.pagination}
                  onChange={handleChangePageValue}
                />
                {/* <Table fields={tableTitle} data={listBudgetCadangan} /> */}
              </div>
              <Grid item style={{ marginTop: 20 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                    margin: 20,
                  }}
                >
                  <Button
                    disabled={currentAtmId == prevId}
                    variant="outlined"
                    onClick={handlePrevId}
                    className={classes.backAction}
                    style={{ borderColor: isActiveLeft ? PrimaryHard : "" }}
                  >
                    <KeyboardArrowLeftIcon
                      style={{ fill: isActiveLeft ? PrimaryHard : "" }}
                    />
                  </Button>
                  <div style={{ display: "flex" }}>
                    <Typography
                      style={{ fontWeight: 600, margin: 5, fontSize: 20 }}
                    >
                      ATM ID
                    </Typography>
                    <TextField
                      variant="standard"
                      value={currentAtmId}
                      onChange={handleChangeFilter}
                      className={classes.inputFilter}
                      InputProps={{
                        classes: {
                          input: classes.resize,
                        },
                        disableUnderline: true,
                      }}
                      onKeyDown={handleKeyPress}
                    />
                  </div>
                  <Button
                    disabled={currentAtmId == nextId}
                    variant="outlined"
                    onClick={handleNextId}
                    className={classes.backAction}
                    style={{ borderColor: isActiveRight ? PrimaryHard : "" }}
                  >
                    <KeyboardArrowRightIcon
                      style={{ fill: isActiveRight ? PrimaryHard : "" }}
                    />
                  </Button>
                </div>
              </Grid>
            </div>
          )}
        </Grid>
      </Grid>
    </div>
  );
}

export default MediaPromosiEyeBowling;
