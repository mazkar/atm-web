import React, { useEffect, useState, useContext } from "react";
import ContainerEventScheduleNews from "./common/main";
import PaginationCard from "../../../components/Card/PaginationCard";
import TablePagination from "@material-ui/lab/Pagination";
import { makeStyles } from "@material-ui/styles";
import { useHistory } from "react-router-dom";
import {
  ContentTabs,
  ContentTab,
  a11yProps,
  TabPanel,
} from "../../../components/TabsMui";
import constansts from "../../../helpers/constants";
import FloatingChat from "../../../components/GeneralComponent/FloatingChat";
import { getEventsScheduleNews, deleteEventScheduleNews } from "./service";
import LoadingView from "../../../components/Loading/LoadingView";
import EmptyImg from "../../../assets/images/empty_data.png";
import { Grid, Typography } from "@material-ui/core";
import { RootContext } from "../../../router";
import { Markup } from "interweave";

const useStyle = makeStyles({
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
    backgroundColor: constansts.color.white,
    borderRadius: 10,
    "& .Mui-selected": {
      backgroundColor: constansts.color.primaryUltaSoft,
    },
    "& .MuiPaginationItem-root": {
      color: constansts.color.primaryHard,
    },
  },
});

const rowsPerPage = 6;
const defaultDataRequest = {
  sortType: "ASC",
  sortBy: "id",
  pageNumber: 0,
  dataPerPage: rowsPerPage,
  category: "Events", // Events / Schedule / News
};

const EventScheduleNews = () => {
  // variable

  const { userRoleName } = useContext(RootContext);
  const isAdmin = userRoleName?.toLowerCase().includes("admin");
  const [valueTab, setValueTab] = useState(0);
  const classess = useStyle();
  const windowHash = window.location.hash;
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [dataAPI, setDataAPI] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [renderPage, setRenderPage] = useState(false);
  const [inputSearch, setInputSearch] = useState({
    keyword: "",
    onEnter: false,
  });
  const [paginationConfig, setPaginationConfig] = useState({
    dataRequest: defaultDataRequest,
    totalPages: 0,
    totalRows: 0,
    sortBy: "id",
    sortType: "ASC",
  });
  const dummyDataEvents = [
    {
      id: 1,
      imageUrl:
        "https://th.bing.com/th/id/OIP.Ix6XjMbuCvoq3EQNgJoyEQHaFj?w=216&h=180&c=7&r=0&o=5&pid=1.7",
      title: "Problem di ATM",
      date: "2 Agustus 2022",
      penulis: "Ahmad Wicaksono",
      deskripsi:
        "Tentu bagi hampir sebagian dari kalian merasa bahwa barang elektronik sekarang ini sudah menjadi kebutuh.....",
    },
    {
      id: 2,
      imageUrl:
        "https://th.bing.com/th/id/OIP.Ix6XjMbuCvoq3EQNgJoyEQHaFj?w=216&h=180&c=7&r=0&o=5&pid=1.7",
      title: "Problem di ATM",
      date: "2 Agustus 2022",
      penulis: "Ahmad Wicaksono",
      deskripsi:
        "Tentu bagi hampir sebagian dari kalian merasa bahwa barang elektronik sekarang ini sudah menjadi kebutuh.....",
    },
    {
      id: 3,
      imageUrl:
        "https://th.bing.com/th/id/OIP.Ix6XjMbuCvoq3EQNgJoyEQHaFj?w=216&h=180&c=7&r=0&o=5&pid=1.7",
      title: "Problem di ATM",
      date: "2 Agustus 2022",
      penulis: "Ahmad Wicaksono",
      deskripsi:
        "Tentu bagi hampir sebagian dari kalian merasa bahwa barang elektronik sekarang ini sudah menjadi kebutuh.....",
    },
    {
      id: 4,
      imageUrl:
        "https://th.bing.com/th/id/OIP.Ix6XjMbuCvoq3EQNgJoyEQHaFj?w=216&h=180&c=7&r=0&o=5&pid=1.7",
      title: "Problem di ATM",
      date: "2 Agustus 2022",
      penulis: "Ahmad Wicaksono",
      deskripsi:
        "Tentu bagi hampir sebagian dari kalian merasa bahwa barang elektronik sekarang ini sudah menjadi kebutuh.....",
    },
    {
      id: 5,
      imageUrl:
        "https://th.bing.com/th/id/OIP.Ix6XjMbuCvoq3EQNgJoyEQHaFj?w=216&h=180&c=7&r=0&o=5&pid=1.7",
      title: "Problem di ATM",
      date: "2 Agustus 2022",
      penulis: "Ahmad Wicaksono",
      deskripsi:
        "Tentu bagi hampir sebagian dari kalian merasa bahwa barang elektronik sekarang ini sudah menjadi kebutuh.....",
    },
    {
      id: 6,
      imageUrl:
        "https://th.bing.com/th/id/OIP.Ix6XjMbuCvoq3EQNgJoyEQHaFj?w=216&h=180&c=7&r=0&o=5&pid=1.7",
      title: "Problem di ATM",
      date: "2 Agustus 2022",
      penulis: "Ahmad Wicaksono",
      deskripsi:
        "Tentu bagi hampir sebagian dari kalian merasa bahwa barang elektronik sekarang ini sudah menjadi kebutuh.....",
    },
  ];

  const dummyDataSchedule = [
    {
      imageUrl:
        "https://th.bing.com/th/id/OIP.TUDe74-_OR6O3P4V-3_FYQHaE7?w=244&h=180&c=7&r=0&o=5&pid=1.7",
      title: "Problem di ATM",
      date: "2 Agustus 2022",
      penulis: "Ahmad Wicaksono",
      deskripsi:
        "Tentu bagi hampir sebagian dari kalian merasa bahwa barang elektronik sekarang ini sudah menjadi kebutuh.....",
    },
    {
      imageUrl:
        "https://th.bing.com/th/id/OIP.TUDe74-_OR6O3P4V-3_FYQHaE7?w=244&h=180&c=7&r=0&o=5&pid=1.7",
      title: "Problem di ATM",
      date: "2 Agustus 2022",
      penulis: "Ahmad Wicaksono",
      deskripsi:
        "Tentu bagi hampir sebagian dari kalian merasa bahwa barang elektronik sekarang ini sudah menjadi kebutuh.....",
    },
    {
      imageUrl:
        "https://th.bing.com/th/id/OIP.TUDe74-_OR6O3P4V-3_FYQHaE7?w=244&h=180&c=7&r=0&o=5&pid=1.7",
      title: "Problem di ATM",
      date: "2 Agustus 2022",
      penulis: "Ahmad Wicaksono",
      deskripsi:
        "Tentu bagi hampir sebagian dari kalian merasa bahwa barang elektronik sekarang ini sudah menjadi kebutuh.....",
    },
    {
      imageUrl:
        "https://th.bing.com/th/id/OIP.TUDe74-_OR6O3P4V-3_FYQHaE7?w=244&h=180&c=7&r=0&o=5&pid=1.7",
      title: "Problem di ATM",
      date: "2 Agustus 2022",
      penulis: "Ahmad Wicaksono",
      deskripsi:
        "Tentu bagi hampir sebagian dari kalian merasa bahwa barang elektronik sekarang ini sudah menjadi kebutuh.....",
    },
    {
      imageUrl:
        "https://th.bing.com/th/id/OIP.TUDe74-_OR6O3P4V-3_FYQHaE7?w=244&h=180&c=7&r=0&o=5&pid=1.7",
      title: "Problem di ATM",
      date: "2 Agustus 2022",
      penulis: "Ahmad Wicaksono",
      deskripsi:
        "Tentu bagi hampir sebagian dari kalian merasa bahwa barang elektronik sekarang ini sudah menjadi kebutuh.....",
    },
    {
      imageUrl:
        "https://th.bing.com/th/id/OIP.TUDe74-_OR6O3P4V-3_FYQHaE7?w=244&h=180&c=7&r=0&o=5&pid=1.7",
      title: "Problem di ATM",
      date: "2 Agustus 2022",
      penulis: "Ahmad Wicaksono",
      deskripsi:
        "Tentu bagi hampir sebagian dari kalian merasa bahwa barang elektronik sekarang ini sudah menjadi kebutuh.....",
    },
  ];

  const dummyDataNews = [
    {
      imageUrl:
        "https://th.bing.com/th/id/OIP.L51qzGCLtslIZn42Q0BFhgHaE7?w=244&h=180&c=7&r=0&o=5&pid=1.7",
      title: "Problem di ATM",
      date: "2 Agustus 2022",
      penulis: "Ahmad Wicaksono",
      deskripsi:
        "Tentu bagi hampir sebagian dari kalian merasa bahwa barang elektronik sekarang ini sudah menjadi kebutuh.....",
    },
    {
      imageUrl:
        "https://th.bing.com/th/id/OIP.L51qzGCLtslIZn42Q0BFhgHaE7?w=244&h=180&c=7&r=0&o=5&pid=1.7",
      title: "Problem di ATM",
      date: "2 Agustus 2022",
      penulis: "Ahmad Wicaksono",
      deskripsi:
        "Tentu bagi hampir sebagian dari kalian merasa bahwa barang elektronik sekarang ini sudah menjadi kebutuh.....",
    },
    {
      imageUrl:
        "https://th.bing.com/th/id/OIP.L51qzGCLtslIZn42Q0BFhgHaE7?w=244&h=180&c=7&r=0&o=5&pid=1.7",
      title: "Problem di ATM",
      date: "2 Agustus 2022",
      penulis: "Ahmad Wicaksono",
      deskripsi:
        "Tentu bagi hampir sebagian dari kalian merasa bahwa barang elektronik sekarang ini sudah menjadi kebutuh.....",
    },
    {
      imageUrl:
        "https://th.bing.com/th/id/OIP.L51qzGCLtslIZn42Q0BFhgHaE7?w=244&h=180&c=7&r=0&o=5&pid=1.7",
      title: "Problem di ATM",
      date: "2 Agustus 2022",
      penulis: "Ahmad Wicaksono",
      deskripsi:
        "Tentu bagi hampir sebagian dari kalian merasa bahwa barang elektronik sekarang ini sudah menjadi kebutuh.....",
    },
    {
      imageUrl:
        "https://th.bing.com/th/id/OIP.L51qzGCLtslIZn42Q0BFhgHaE7?w=244&h=180&c=7&r=0&o=5&pid=1.7",
      title: "Problem di ATM",
      date: "2 Agustus 2022",
      penulis: "Ahmad Wicaksono",
      deskripsi:
        "Tentu bagi hampir sebagian dari kalian merasa bahwa barang elektronik sekarang ini sudah menjadi kebutuh.....",
    },
    {
      imageUrl:
        "https://th.bing.com/th/id/OIP.L51qzGCLtslIZn42Q0BFhgHaE7?w=244&h=180&c=7&r=0&o=5&pid=1.7",
      title: "Problem di ATM",
      date: "2 Agustus 2022",
      penulis: "Ahmad Wicaksono",
      deskripsi:
        "Tentu bagi hampir sebagian dari kalian merasa bahwa barang elektronik sekarang ini sudah menjadi kebutuh.....",
    },
  ];

  // function

  const loaderHandler = (bool) => {
    setIsLoading(bool);
  };

  const onSearch = (e, bool) => {
    setInputSearch({
      ...inputSearch,
      keyword: e,
      onEnter: bool,
    });
  };

  const onClickEventCard = (id) => {
    history.push(`/add-ons/event-schedule-news/detail-events/${id}`);
  };

  const onClickScheduleCard = (id) => {
    history.push(`/add-ons/event-schedule-news/detail-schedule/${id}`);
  };

  const onClickNewsCard = (id) => {
    history.push(`/add-ons/event-schedule-news/detail-news/${id}`);
  };

  const onDeleteCard = (id) => {
    console.log(id);
    deleteEventScheduleNews(loaderHandler, id).then((res) => {
      if (res.status === 200) setRenderPage(!renderPage);
    });
  };

  const onEditCard = (id) => {
    if (windowHash === "#events")
      return history.push(`/add-ons/event-schedule-news/edit-event/${id}`);
    if (windowHash === "#schedule")
      return history.push(`/add-ons/event-schedule-news/edit-schedule/${id}`);
    if (windowHash === "#news")
      return history.push(`/add-ons/event-schedule-news/edit-news/${id}`);
  };

  const handleChangeTab = (e, newVal) => {
    setValueTab(newVal);
    let hashTab;
    switch (newVal) {
      case 0:
        hashTab = "#events";
        break;
      case 1:
        hashTab = "#schedule";
        break;
      case 2:
        hashTab = "#news";
        break;
      default:
        hashTab = "#events";
        break;
    }
    history.replace(`${hashTab}`);
  };

  const handleChangePage = (newVal) => {
    const tempArray = { ...paginationConfig };
    tempArray.dataRequest.pageNumber = newVal;
    setPaginationConfig(tempArray);
    setCurrentPage(newVal + 1);
  };

  const convertPublishDate = (resDate) => {
    const date = new Date(resDate).getDate();
    const month = new Date(resDate).getMonth();
    const year = new Date(resDate).getFullYear();

    const listMonth = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];

    return `${date} ${listMonth[month]} ${year}`;
  };

  const convertResponseToUI = (arr) => {
    if (arr.length === 0) return null;
    const dataArr = [];
    arr.map((data) => {
      const obj = {};
      obj.id = data.id;
      obj.title = data.title;
      obj.penulis = data.userName;
      obj.imageUrl = data.coverImage;
      obj.deskripsi = <Markup content={data.description} />;
      obj.publishDate = convertPublishDate(data.publishDate);
      dataArr.push(obj);
    });
    return dataArr;
  };

  useEffect(() => {
    if (!windowHash) history.replace("#events");
  }, []);

  useEffect(() => {
    const tempConfig = { ...paginationConfig };
    if (windowHash) {
      switch (windowHash) {
        case "#events":
          setValueTab(0);
          tempConfig.dataRequest.category = "Events";
          console.log(tempConfig);
          break;
        case "#schedule":
          setValueTab(1);
          tempConfig.dataRequest.category = "Schedule";
          console.log(tempConfig);
          break;
        case "#news":
          setValueTab(2);
          tempConfig.dataRequest.category = "News";
          console.log(tempConfig);
          break;
        default:
          setValueTab(0);
          tempConfig.dataRequest.category = "Events";
          console.log(tempConfig);
          break;
      }
    } else {
      setValueTab(0);
      tempConfig.dataRequest.category = "Events";
      setPaginationConfig(tempConfig);
      console.log(tempConfig);
    }
    setPaginationConfig({
      ...paginationConfig,
      dataRequest: defaultDataRequest,
    });
  }, [windowHash]);

  useEffect(() => {
    getEventsScheduleNews(
      loaderHandler,
      paginationConfig.dataRequest,
      inputSearch.keyword ? inputSearch.keyword : "all"
    ).then((res) => {
      if (res.status === 200) {
        if (res.data.content) {
          setDataAPI(convertResponseToUI(res.data.content));
          setPaginationConfig({
            ...paginationConfig,
            totalRows: res.data.totalElements,
            totalPages: res.data.totalPages,
          });
        }
      }
    });
  }, [
    windowHash,
    paginationConfig.dataRequest.pageNumber,
    inputSearch.onEnter,
    renderPage,
  ]);

  return (
    <>
      <ContainerEventScheduleNews
        inputSearch={inputSearch.keyword}
        onSearch={onSearch}
        onEnterValue={inputSearch.onEnter}
      >
        <ContentTabs
          value={valueTab}
          onChange={handleChangeTab}
          aria-label="content tabs"
        >
          <ContentTab
            label="Events"
            {...a11yProps(0)}
            style={{ minWidth: 266 }}
          />
          <ContentTab
            label="Schedule"
            {...a11yProps(1)}
            style={{ minWidth: 266 }}
          />
          <ContentTab
            label="News"
            {...a11yProps(2)}
            style={{ minWidth: 266 }}
          />
        </ContentTabs>
        <TabPanel value={valueTab} index={0}>
          {isLoading ? (
            <LoadingView maxheight={400} isTransparent />
          ) : (
            <>
              {dataAPI ? (
                <PaginationCard
                  data={dataAPI}
                  cardOnClick={onClickEventCard}
                  mappingTitle="title"
                  mappingImage="imageUrl"
                  mappingDate="publishDate"
                  mappingWriter="penulis"
                  mappingDescription="deskripsi"
                  rowsPerPage={rowsPerPage}
                  totalRows={paginationConfig.totalRows}
                  totalPages={paginationConfig.totalPages}
                  changePage={handleChangePage}
                  isAdministrator={isAdmin}
                  onEdit={onEditCard}
                  onDelete={onDeleteCard}
                  currentPage={currentPage}
                />
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
        </TabPanel>
        <TabPanel value={valueTab} index={1}>
          {isLoading ? (
            <LoadingView maxheight={400} isTransparent />
          ) : (
            <>
              {dataAPI ? (
                <PaginationCard
                  data={dataAPI}
                  cardOnClick={onClickScheduleCard}
                  mappingTitle="title"
                  mappingImage="imageUrl"
                  mappingDate="publishDate"
                  mappingWriter="penulis"
                  mappingDescription="deskripsi"
                  rowsPerPage={rowsPerPage}
                  totalRows={paginationConfig.totalRows}
                  totalPages={paginationConfig.totalPages}
                  changePage={handleChangePage}
                  isAdministrator={isAdmin}
                  onEdit={onEditCard}
                  onDelete={onDeleteCard}
                  currentPage={currentPage}
                />
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
        </TabPanel>
        <TabPanel value={valueTab} index={2}>
          {isLoading ? (
            <LoadingView maxheight={400} isTransparent />
          ) : (
            <>
              {dataAPI ? (
                <PaginationCard
                  data={dataAPI}
                  cardOnClick={onClickNewsCard}
                  mappingTitle="title"
                  mappingImage="imageUrl"
                  mappingDate="publishDate"
                  mappingWriter="penulis"
                  mappingDescription="deskripsi"
                  rowsPerPage={rowsPerPage}
                  totalRows={paginationConfig.totalRows}
                  totalPages={paginationConfig.totalPages}
                  changePage={handleChangePage}
                  isAdministrator={isAdmin}
                  onEdit={onEditCard}
                  onDelete={onDeleteCard}
                  currentPage={currentPage}
                />
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
        </TabPanel>
      </ContainerEventScheduleNews>
      {/* <FloatingChat /> */}
    </>
  );
};

export default EventScheduleNews;
