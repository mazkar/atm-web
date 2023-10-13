import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { Typography, Grid, CardActionArea } from "@material-ui/core";
import MuiIconLabelButton from "../../../components/Button/MuiIconLabelButton";
import AddIcon from "@material-ui/icons/Add";
import ChkySearchBar from "./common/CkhySearchBar";
import CardForum from "./common/CardForum";
import constants from "../../../helpers/constants";
import { Pagination } from "@material-ui/lab";
import { useHistory } from "react-router-dom";
import { doGetSummaryForumDiscussion } from "../ApiServicesAddOns";
import MinioImageComponent from "../../../components/MinioImageComponent";
import LoadingView from "../../../components/Loading/LoadingView";

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
  paginationContainer: {
    "& > *": {
      marginTop: 20,
      marginBottom: 35,
    },
    display: "flex",
    justifyContent: "space-between",
  },

  pagination: {
    padding: 5,
    backgroundColor: constants.color.white,
    borderRadius: 10,
    "& .MuiPaper-elevation1": {
      boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
    },
    "& .Mui-selected": {
      backgroundColor: constants.color.primaryUltaSoft,
    },
    "& .MuiPaginationItem-root": {
      color: constants.color.primaryHard,
    },
  },
});

//init rowsperpage
const rowsPerPage = 6;
const defaultRequest = {
  sortType: "ASC",
  sortBy: "id",
  pageNumber: 0,
  dataPerPage: rowsPerPage,
  keyword: "All",
};
function ForumDiscussion() {
  const classes = UseStyles();
  const history = useHistory();

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [dataRequest, setDataRequest] = useState(defaultRequest);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  const handleLoading = (loader) => {
    setIsLoading(loader);
  };

  const handleAddForum = () => {
    history.push("/add-ons/forum-discussion/add");
  };

  // const handleOpen = (id) => {
  //   history.push(`/add-ons/forum-discussion/${id}`);
  // };

  function handleKeyword(value) {
    console.log(value);
    setDataRequest({
      ...dataRequest,
      keyword: value,
    });
  }

  //FUNCTION HANDLE CHANGE PAGE
  function handleChangePage(event, newPage) {
    console.log(newPage);
    setCurrentPage(newPage);
    setDataRequest({
      ...dataRequest,
      pageNumber: newPage - 1,
    });
  }

  const convertDate = (resDate) => {
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

  useEffect(() => {
    doGetSummaryForumDiscussion(handleLoading, dataRequest)
      .then((response) => {
        console.log(response);
        if (response) {
          if (response.responseCode === "200") {
            setTotalRows(response.totalElements);
            setTotalPages(response.totalPages);
            const { content } = response;
            const dataRow = [];
            content.map((item) => {
              const newRow = {
                id: item.id,
                coverImage: item.coverImage,
                title: item.title,
                subCategory: item.subCategory,
                category: item.category,
                description: item.description,
                comment: item.comment,
                date: convertDate(item.publishDate),
              };
              dataRow.push(newRow);
            });
            setData(dataRow);
          }
        }
      })
      .catch((err) => {
        alert(`Fetching Data Error ${err}`);
      });
  }, [dataRequest]);

  return (
    <div className={classes.root}>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        className={classes.titleContainer}
      >
        <Grid item>
          <Typography className={classes.title}>Forum Discussion</Typography>
        </Grid>
        <Grid item className={classes.col}>
          <MuiIconLabelButton
            style={{
              width: "max-content",
              right: 0,
              height: 40,
              boxShadow: "0px 6px 6px rgba(220, 36, 31, 0.1)",
              borderRadius: "6px",
              marginRight: "10px",
            }}
            label="Discussion"
            iconPosition="endIcon"
            buttonIcon={<AddIcon />}
            onClick={handleAddForum}
          />

          <ChkySearchBar
            placeholder="Pencarian forum"
            onKeywordChange={handleKeyword}
            width={290}
          />
        </Grid>
      </Grid>

      {/* content */}
      {isLoading ? (
        <LoadingView />
      ) : (
        <Grid container spacing={4} style={{ marginTop: "20px" }}>
          {data.map((item) => (
            <Grid item xs={4}>
              <CardForum
                id={item.id}
                foto={item.coverImage}
                title={item.title}
                keterangan={`${item.date} - ${
                  item.userName ? item.userName : ""
                } - ${item.category}`}
                comment={item.comment}
              />
            </Grid>
          ))}
        </Grid>
      )}

      <div className={classes.paginationContainer}>
        <Typography style={{ fontSize: 15, color: constants.color.grayMedium }}>
          Showing {(currentPage - 1) * rowsPerPage + 1} -
          {(currentPage - 1) * rowsPerPage + data.length} of {totalRows}
        </Typography>
        <Pagination
          page={currentPage}
          count={totalPages}
          className={classes.pagination}
          onChange={handleChangePage}
        />
      </div>
    </div>
  );
}

export default ForumDiscussion;
