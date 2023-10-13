/* eslint-disable prefer-template */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable indent */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import Table from "@material-ui/core/Table";
import Link from "@material-ui/core/Link";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import TablePagination from "@material-ui/lab/Pagination";
import TableContainer from "@material-ui/core/TableContainer";
import { Grid, Typography } from "@material-ui/core";
import DownArrow from "../../../assets/icons/siab/chevron-down.png";
import UpArrow from "../../../assets/icons/siab/chevron-up.png";
import TableCellOption from "../../TabelCellOptions";
import Constants from "../../../helpers/constants";
import EmptyImg from "../../../assets/images/empty_data.png";
import LoadingView from "../../Loading/LoadingView";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { GraySoft } from "../../../assets/theme/colors";

const useStyles = makeStyles({
  superRoot: {
    "& .MuiPaper-elevation1": {
      boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
    },
    "& .MuiPaper-rounded": {
      borderRadius: "10px",
    },
  },
  rootTable: {
    width: "100%",
    overflowX: "auto",
    padding: 10,
  },
  table: {
    minWidth: 650,
  },
  headerRow: {
    "& .MuiTableCell-sizeSmall": {
      padding: "5px 0px 5px 0px",
      backgroundColor: "unset",
    },
  },
  tableCellHeader: {
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    fontSize: 13,
    fontWeight: 600,
  },
  cellRow: {
    "& .MuiTableCell-sizeSmall": {
      padding: "5px 0px 5px 0px",
    },
  },
  cellRowEnd: {
    "& .MuiTableCell-sizeSmall": {
      padding: "5px 0px 5px 0px",
      borderBottom: 0,
    },
  },
  cellRowEndGrand: {
    height: 50,
    "& .MuiTableCell-sizeSmall": {
      borderBottom: 0,
    },
  },
  tableCell: {
    fontSize: 10,
  },
  tableCellNoBottomLine: {
    fontSize: 10,
    borderBottom: "10px solid red",
  },
  tableValueCell: {
    "& .MuiIconButton-root": {
      padding: 0,
    },
    "& .MuiLink-root:hover": {
      textDecoration: "none",
    },
  },
  total: {
    textAlign: "center",
    width: "max-content",
    paddingLeft: 10,
    paddingRight: 10,
    margin: "auto",
    fontWeight: 700,
    fontSize: 13,
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
    backgroundColor: Constants.color.white,
    borderRadius: 10,
    "& .Mui-selected": {
      backgroundColor: Constants.color.primaryUltaSoft,
    },
    "& .MuiPaginationItem-root": {
      color: Constants.color.primaryHard,
    },
  },
  borderTable: {
    border: `1px ${Constants.color.grayMedium} solid`,
    borderRadius: 10,
  },
});

const ChkyTablePagination = (props) => {
  const classes = useStyles();
  const {
    isUsingMuiSort,
    handleSort,
    sortBy,
    order,
    rowsPerPage,
    totalRows,
    data,
    fields,
    cellOption,
    isSort,
    totalPages,
    changePage,
    withTabs,
    grandTotal,
    isSummary,
    alignTitleData,
    isLoadData,
    firstColumnLeft,
    leftAlignHeaders,
    leftAlignBody,
    giveHeaderGap,
    resetPageCounter,
    setOnPage,
    setInitData,
    outerPage,
    isDisablePagination,
    borderedContainer,
  } = props;
  const rows = data;

  const [page, setPage] = React.useState(1);

  // const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  const emptyRows = rowsPerPage - rows.length;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    changePage(newPage - 1);
    setOnPage(newPage);
    setInitData(newPage * 10 - 10);
  };

  useEffect(() => {
    setPage(1);
  }, [resetPageCounter]);

  const styleWithTab = { position: "relative", width: "inherit", top: -45 };
  const styleTableContainer = { position: "relative", width: "inherit" };

  return (
    <div style={withTabs ? styleWithTab : styleTableContainer}>
      {isLoadData ? (
        <LoadingView maxheight="100%" />
      ) : (
        <div className={classes.superRoot}>
          <TableContainer
            component={Paper}
            className={[
              classes.rootTable,
              borderedContainer && classes.borderTable,
            ]}
          >
            {withTabs ? <div style={{ height: 60 }} /> : <div />}
            <Table
              stickyHeader
              className={classes.table}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                {alignTitleData !== undefined ? (
                  <TableRow className={classes.headerRow}>
                    {fields.map((field, i) => {
                      return (
                        <React.Fragment key={i}>
                          <TableCell
                            key={field}
                            align={alignTitleData[i]}
                            className={classes.tableCellHeader}
                          >
                            {field}
                          </TableCell>
                        </React.Fragment>
                      );
                    })}
                  </TableRow>
                ) : (
                  <TableRow className={classes.headerRow}>
                    {fields.map((field, i) => {
                      const typeCell = cellOption[i];
                      const isActive = field === sortBy;
                      const theAlign =
                        (firstColumnLeft && i === 0) ||
                        leftAlignHeaders.includes(i)
                          ? "left"
                          : "center";
                      if (typeCell !== "hide") {
                        return (
                          <React.Fragment key={i}>
                            {isSort[i] ? (
                              <TableCell
                                key={field}
                                align={theAlign}
                                className={classes.tableCellHeader}
                                style={{ padding: giveHeaderGap ? 5 : null }}
                              >
                                {isUsingMuiSort ? (
                                  <TableSortLabel
                                    active={isActive}
                                    direction={
                                      isActive ? order.toLowerCase() : "asc"
                                    }
                                    onClick={handleSort(field)} //sudah benar handleSort(field)
                                    IconComponent={() =>
                                      isActive ? (
                                        <img
                                          src={
                                            order.toLowerCase() === "desc"
                                              ? DownArrow
                                              : UpArrow
                                          }
                                          alt=""
                                          height="20"
                                          width="20"
                                        />
                                      ) : (
                                        <KeyboardArrowUpIcon
                                          style={{ color: GraySoft }}
                                        />
                                      )
                                    }
                                  >
                                    {field}
                                  </TableSortLabel>
                                ) : (
                                  <>
                                    {field}{" "}
                                    <Link>
                                      <img src={DownArrow} alt="" />
                                    </Link>
                                  </>
                                )}
                              </TableCell>
                            ) : (
                              <TableCell
                                key={field}
                                align={theAlign}
                                className={classes.tableCellHeader}
                                style={{ padding: giveHeaderGap ? 5 : null }}
                              >
                                {field}
                              </TableCell>
                            )}
                          </React.Fragment>
                        );
                      }
                    })}
                  </TableRow>
                )}
              </TableHead>
              <TableBody>
                {rows.map((row, k) => {
                  return (
                    <TableRow
                      key={k}
                      style={{ height: 37 }}
                      className={
                        k === rowsPerPage - 1
                          ? classes.cellRowEnd
                          : classes.cellRow
                      }
                    >
                      {Object.keys(row).map((object, j) => {
                        const typeCell = cellOption[j];
                        const theAlign = leftAlignBody?.includes(j)
                          ? "left"
                          : "center";
                        if (typeCell !== "hide") {
                          return (
                            <TableCell
                              key={j}
                              className={classes.tableValueCell}
                            >
                              {typeCell === "action" ? (
                                <TableCellOption
                                  cellType={cellOption[j]}
                                  value={Object.values(row)[j]}
                                  className={classes.tableCell}
                                />
                              ) : (
                                <TableCellOption
                                  cellType={cellOption[j]}
                                  value={Object.values(row)[j]}
                                  className={classes.tableCell}
                                  align={theAlign}
                                />
                              )}
                            </TableCell>
                          );
                        }
                      })}
                    </TableRow>
                  );
                })}
                {isSummary === false && emptyRows > 0 && (
                  <TableRow
                    style={{ height: 37 * emptyRows }}
                    className={classes.cellRowEnd}
                  >
                    {data.length < 1 ? (
                      <TableCell
                        colSpan={fields.length}
                        style={{
                          backgroundImage: `url(${EmptyImg})`,
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center",
                          backgroundSize: 75,
                          opacity: 0.5,
                        }}
                      />
                    ) : (
                      <TableCell colSpan={fields.length} />
                    )}
                  </TableRow>
                )}
                {grandTotal !== null && (
                  <TableRow className={classes.cellRowEndGrand}>
                    <TableCell>
                      <Typography className={classes.total}>
                        Grand Total
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography className={classes.total}>
                        {grandTotal.totalTarget}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography className={classes.total}>
                        {grandTotal.totalTargetRemaining}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography className={classes.total}>
                        {grandTotal.totalSubmission}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography className={classes.total}>
                        {grandTotal.totalBIReportCount}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography className={classes.total}>
                        {grandTotal.totalBIReportRemaining}
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          {!isDisablePagination && (
            <div className={classes.paginationContainer}>
              <Typography
                style={{ fontSize: 15, color: Constants.color.grayMedium }}
              >
                Showing{" "}
                {outerPage
                  ? (outerPage - 1) * rowsPerPage + 1
                  : (page - 1) * rowsPerPage + 1}{" "}
                -{" "}
                {outerPage
                  ? (outerPage - 1) * rowsPerPage + data.length
                  : (page - 1) * rowsPerPage + data.length}{" "}
                of {totalRows}
              </Typography>
              <TablePagination
                page={outerPage ? outerPage : page}
                count={totalPages}
                className={classes.pagination}
                onChange={handleChangePage}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

ChkyTablePagination.propTypes = {
  rowsPerPage: PropTypes.number,
  totalRows: PropTypes.number,
  totalPages: PropTypes.number.isRequired,
  changePage: PropTypes.func.isRequired,
  setOnPage: PropTypes.func,
  cellType: PropTypes.string,
  data: PropTypes.array,
  fields: PropTypes.array,
  cellOption: PropTypes.array,
  isSort: PropTypes.array,
  withTabs: PropTypes.bool,
  grandTotal: PropTypes.object,
  isSummary: PropTypes.bool,
  alignTitleData: PropTypes.array,
  isLoadData: PropTypes.bool,
  resetPageCounter: PropTypes.number,
  outerPage: PropTypes.number,
  isDisablePagination: PropTypes.bool,
  borderedContainer: PropTypes.bool,
};

ChkyTablePagination.defaultProps = {
  rowsPerPage: 10,
  totalRows: null,
  cellType: "string",
  data: [],
  fields: [
    "ID",
    "ATM ID",
    "Priority",
    "Progression",
    "Status",
    "Assignee",
    "Action",
  ],
  cellOption: [
    "string",
    "string",
    "string",
    "string",
    "string",
    "string",
    "action",
  ],
  isSort: [false, false, false, false, false, false, false],
  withTabs: false,
  grandTotal: null,
  isSummary: false,
  alignTitleData: undefined,
  isLoadData: false,
  leftAlignHeaders: [],
  resetPageCounter: 0,
  setOnPage: () => {},
  setInitData: () => {},
  outerPage: null,
  isDisablePagination: false,
  borderedContainer: false,
};

export default ChkyTablePagination;
