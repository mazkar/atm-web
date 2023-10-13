/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable react/no-array-index-key */
/* eslint-disable prefer-template */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable indent */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
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
import { makeStyles } from "@material-ui/core/styles";

import TablePagination from "@material-ui/lab/Pagination";
import TableContainer from "@material-ui/core/TableContainer";
import { Typography } from "@material-ui/core";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import DownArrow from "../../../assets/icons/siab/chevron-down.png";
import EmptyImg from "../../../assets/images/empty_data.png";
import UpArrow from "../../../assets/icons/siab/chevron-up.png";
import TableCellOption from "../../TabelCellOptions";
import Constants from "../../../helpers/constants";
import LoadingView from "../../Loading/LoadingView";
import { GraySoft } from "../../../assets/theme/colors";
import ApplyFilterRequired from "./ApplyFilterRequired";

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
    position: "relative",
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
  tableCell: {
    fontSize: 10,
  },
  tableValueCell: {
    "& .MuiIconButton-root": {
      padding: 0,
    },
    "& .MuiLink-root:hover": {
      textDecoration: "none",
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

const TablePaginationDigitalisasi = (props) => {
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
    onChangePage,
    alignTitleData,
    isLoadData,
    resetPageCounter,
    isDisablePagination,
    borderedContainer,
    isFilterApplied
  } = props;
  const rows = data;

  const [page, setPage] = React.useState(1);
  const emptyRows = rowsPerPage - rows.length;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    onChangePage(newPage - 1);
  };

  useEffect(() => {
    setPage(1);
  }, [resetPageCounter]);

  return (
    <div>
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
            <Table
              stickyHeader
              className={classes.table}
              size="small"
              aria-label="a dense table"
            >
            {/* === HEADER START === */}
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
                    if (typeCell !== "hide") {
                    return (
                        <React.Fragment key={i}>
                        {isSort[i] ? (
                            <TableCell
                            key={field}
                            align="center"
                            className={classes.tableCellHeader}
                            >
                            {isUsingMuiSort ? (
                                <TableSortLabel
                                active={isActive}
                                direction={
                                    isActive ? order.toLowerCase() : "asc"
                                }
                                onClick={handleSort(field)} // sudah benar handleSort(field)
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
                            align="center"
                            className={classes.tableCellHeader}
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
            {/* === HEADER END === */}
            {/* === BODY START === */}
            {isFilterApplied? (
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
                                align="center"
                            />
                            )}
                        </TableCell>
                        );
                    }
                    })}
                </TableRow>
                );
            })}
            { emptyRows > 0 && (
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
            </TableBody>
            ):(
                <>
                {/* JIKA USER BELUM APPLIED */}
                    <TableBody>
                        <TableRow
                            style={{ height: 37 * rowsPerPage }}
                            className={classes.cellRowEnd}
                        >
                            <TableCell colSpan={fields.length} />
                        </TableRow>
                    </TableBody>
                    <ApplyFilterRequired rowsPerPage={rowsPerPage} fields={fields} />
                </>
            )}
              
            {/* === BODY END === */}
            </Table>
          </TableContainer>
          {!isDisablePagination && (
            <div className={classes.paginationContainer}>
              <Typography
                style={{ fontSize: 15, color: Constants.color.grayMedium }}
              >
                Showing{" "}
                {(page - 1) * rowsPerPage + 1}{" "}
                -{" "}
                {(page - 1) * rowsPerPage + data.length}{" "}
                of {totalRows}
              </Typography>
              <TablePagination
                page={page}
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

TablePaginationDigitalisasi.propTypes = {
  rowsPerPage: PropTypes.number,
  totalRows: PropTypes.number,
  totalPages: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  cellType: PropTypes.string,
  data: PropTypes.array,
  fields: PropTypes.array,
  cellOption: PropTypes.array,
  isSort: PropTypes.array,
  grandTotal: PropTypes.object,
  isSummary: PropTypes.bool,
  alignTitleData: PropTypes.array,
  isLoadData: PropTypes.bool,
  resetPageCounter: PropTypes.number,
  isDisablePagination: PropTypes.bool,
  borderedContainer: PropTypes.bool,
  isFilterApplied: PropTypes.bool,
};

TablePaginationDigitalisasi.defaultProps = {
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
  grandTotal: null,
  isSummary: false,
  alignTitleData: undefined,
  isLoadData: false,
  resetPageCounter: 0,
  isDisablePagination: false,
  borderedContainer: false,
  isFilterApplied: false,
};

export default TablePaginationDigitalisasi;
