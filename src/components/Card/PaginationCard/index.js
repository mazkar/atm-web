import React, { useState } from "react";
import { Grid, Card, Typography } from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import constansts from "../../../helpers/constants";
import TablePagination from "@material-ui/lab/Pagination";
import MenuPopUp from "../../../containers/VendorManagement/PartAndServicePricelist/common/MenuPopUp";
import MinioImageComponent from "../../MinioImageComponent";
import Pagination from "@material-ui/lab/Pagination/Pagination";

const useStyle = makeStyles({
  imageStyle: {
    width: "100%",
    aspectRatio: 16 / 9,
  },
  paginationContainer: {
    "& > *": {
      marginTop: 30,
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
  textGroup: {
    widht: "100%",
    padding: "20px 10px 0px 10px",
    cursor: "pointer",
    maxHeight: 200,
    overflowY: "hidden",
  },
  barlow: {
    fontStyle: "normal",
    fontFamily: "Barlow",
  },
  titleStyle: {
    fontWeight: 600,
    fontSize: 18,
    color: "#374062",
  },
  dateAndWriter: {
    fontWeight: 500,
    fontSize: 12,
    marginTop: 5,
    color: "#8D98B4",
  },
  descriptionStyle: {
    fontSize: 13,
    fontWeight: 400,
    marginTop: 10,
    color: "#374062",
  },
});

const ModificationCard = withStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: 0,
    borderRadius: 12,
    filter: "drop-shadow(0px 6px 6px rgba(232, 238, 255, 0.3))",
  },
})(Card);

const PaginationCard = (props) => {
  // Variable
  const {
    data,
    mappingTitle,
    mappingImage,
    mappingDate,
    mappingWriter,
    mappingDescription,
    isDisablePagination,
    outerPage,
    rowsPerPage,
    totalRows,
    totalPages,
    changePage,
    setOnPage,
    setInitData,
    cardStyle,
    cardOnClick,
    isAdministrator,
    isDeletePopup,
    isEditPopup,
    onEdit,
    onDelete,
    currentPage,
  } = props;
  const { ...other } = props;
  const classess = useStyle();
  const { barlow, titleStyle, dateAndWriter, descriptionStyle } = classess;
  const { imageStyle } = classess;
  const [page, setPage] = useState(1);

  // Function
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    changePage(newPage - 1);
    setOnPage(newPage);
    setInitData(newPage * 10 - 10);
  };

  const descriptionHandler = (text) => {
    console.log(text);
    return text;
  };

  return (
    <>
      <Grid
        container
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={2}
        {...other}
      >
        {data?.map((item, index) => {
          return (
            <Grid key={index} item xs={4}>
              <ModificationCard variant="outlined" style={cardStyle}>
                <MinioImageComponent
                  filePath={item?.[mappingImage]}
                  className={imageStyle}
                />
                <div
                  className={classess.textGroup}
                  onClick={
                    cardOnClick
                      ? () => {
                          cardOnClick(item.id);
                        }
                      : () => {}
                  }
                >
                  <Typography className={`${barlow} ${titleStyle}`}>
                    {item?.[mappingTitle] ? item[mappingTitle] : "-"}
                  </Typography>
                  <Typography className={`${barlow} ${dateAndWriter}`}>
                    {item?.[mappingDate] ? item[mappingDate] : "-"} -{" "}
                    {item?.[mappingWriter] ? item[mappingWriter] : "-"}
                  </Typography>
                  <Typography className={`${barlow} ${descriptionStyle}`}>
                    {item?.[mappingDescription]
                      ? descriptionHandler(item[mappingDescription])
                      : "-"}
                  </Typography>
                </div>
                <Grid
                  container
                  justifyContent="center"
                  alignItems="flex-end"
                  // style={{ padding: "20px 10px 20px 10px" }}
                >
                  <Grid item xs={10}></Grid>
                  <Grid item xs={2}>
                    {isAdministrator && (
                      <MenuPopUp
                        deleteHandler={() => onDelete(item.id)}
                        editHandler={() => onEdit(item.id)}
                      />
                    )}
                    {isEditPopup && (
                      <MenuPopUp editHandler={() => onEdit(item.id)} />
                    )}
                    {isDeletePopup && (
                      <MenuPopUp deleteHandler={() => onDelete(item.id)} />
                    )}
                  </Grid>
                </Grid>
              </ModificationCard>
            </Grid>
          );
        })}
      </Grid>
      {!isDisablePagination && (
        <div className={classess.paginationContainer}>
          <Typography
            style={{ fontSize: 15, color: constansts.color.grayMedium }}
          >
            Showing{" "}
            {outerPage
              ? (outerPage - 1) * rowsPerPage + 1
              : (currentPage - 1) * rowsPerPage + 1}{" "}
            -{" "}
            {outerPage
              ? (outerPage - 1) * rowsPerPage + data.length
              : (currentPage - 1) * rowsPerPage + data.length}{" "}
            of {totalRows}
          </Typography>
          <Pagination
            page={outerPage ? outerPage : currentPage}
            count={totalPages}
            className={classess.pagination}
            onChange={handleChangePage}
          />
        </div>
      )}
    </>
  );
};

PaginationCard.propTypes = {
  data: PropTypes.array.isRequired,
  mappingTitle: PropTypes.string.isRequired,
  mappingImage: PropTypes.string.isRequired,
  mappingDate: PropTypes.string.isRequired,
  mappingWriter: PropTypes.string.isRequired,
  mappingDescription: PropTypes.string.isRequired,
  isDisablePagination: PropTypes.bool,
  outerPage: PropTypes.number,
  rowsPerPage: PropTypes.number,
  totalRows: PropTypes.number,
  totalPages: PropTypes.number.isRequired,
  setOnPage: PropTypes.func,
  cardStyle: PropTypes.object,
  cardOnClick: PropTypes.func,
  setInitData: PropTypes.func,
  changePage: PropTypes.func.isRequired,
  isAdministrator: PropTypes.bool,
  isDeletePopup: PropTypes.bool.isRequired,
  isEditPopup: PropTypes.bool.isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  currentPage: PropTypes.number.isRequired,
};

PaginationCard.defaultProps = {
  isDisablePagination: false,
  outerPage: null,
  rowsPerPage: 6,
  totalRows: null,
  setOnPage: () => {},
  setInitData: () => {},
  currentPage: 1,
};

export default PaginationCard;
