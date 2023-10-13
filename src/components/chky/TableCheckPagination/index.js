/* eslint-disable import/no-cycle */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/forbid-prop-types */
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/lab/Pagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import UndoIcon from "@material-ui/icons/Undo";
import TableCellOption from "../../TabelCellOptions";
import Constants from "../../../helpers/constants";
import EmptyImg from "../../../assets/images/empty_data.png";
import { ReactComponent as DownIcon } from "../../../assets/icons/general/dropdown_red.svg";
import LoadingView from "../../Loading/LoadingView";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiPaper-elevation1": {
      boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
    },
  },
  paper: {
    marginBottom: theme.spacing(2),
    borderRadius: 10,
  },
  table: {
    minWidth: 450,
  },
  leftCell: { width: "max-content" },
  centerCell: {},
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  checkBox: {
    "& .MuiCheckbox-root": {
      color: Constants.color.primaryHard,
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
}));

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    headCells,
    isFirstColumnAlignLeft,
    cellOption,
    isWithCheck,
    alignTitleData
  } = props;
  const classes = useStyles();
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {isWithCheck && (
          <TableCell padding="checkbox" className={classes.checkBox} >
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{ "aria-label": "select all desserts" }}
            />
          </TableCell>
        )}
        {headCells.map((headCell, index) => {
          if (cellOption[index] !== "hide") {
            return (
              <>
                {alignTitleData !== undefined ? (
                  <TableCell
                    key={headCell.id}
                    align={alignTitleData[index]}
                    padding={headCell.disablePadding ? "none" : "default"}
                    sortDirection={orderBy === headCell.id ? order : false}
                  >
                    <TableSortLabel
                      active={orderBy === headCell.id}
                      direction={orderBy === headCell.id ? order : "asc"}
                      onClick={createSortHandler(headCell.id)}
                      IconComponent={DownIcon}
                      style={{
                        width: "max-content",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        paddingLeft: 20,
                        paddingTop: 10, 
                        paddingBottom: 10
                      }}
                      disabled={headCell.disabledSort === true}
                    >
                      {headCell.label}
                      {orderBy === headCell.id ? (
                        <span className={classes.visuallyHidden}>
                          {order === "desc"
                            ? "sorted descending"
                            : "sorted ascending"}
                        </span>
                      ) : null}
                    </TableSortLabel>
                  </TableCell>
                ) : (
                  <TableCell
                    key={headCell.id}
                    align={
                      index !== 0
                        ? "center"
                        : isFirstColumnAlignLeft
                          ? "left"
                          : "center"
                    }
                    padding={headCell.disablePadding ? "none" : "default"}
                    sortDirection={orderBy === headCell.id ? order : false}
                  >
                    <TableSortLabel
                      active={orderBy === headCell.id}
                      direction={orderBy === headCell.id ? order : "asc"}
                      onClick={createSortHandler(headCell.id)}
                      IconComponent={DownIcon}
                      style={{
                        width: "auto",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        paddingLeft: 20
                      }}
                      disabled={headCell.disabledSort === true}
                    >
                      {headCell.label}
                      {orderBy === headCell.id ? (
                        <span className={classes.visuallyHidden}>
                          {order === "desc"
                            ? "sorted descending"
                            : "sorted ascending"}
                        </span>
                      ) : null}
                    </TableSortLabel>
                  </TableCell>
                )}
              </>
              
            );
          }
        })}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  headCells: PropTypes.array.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
  isFirstColumnAlignLeft: PropTypes.bool.isRequired,
  cellOption: PropTypes.array.isRequired,
  isWithCheck: PropTypes.bool.isRequired,
  alignTitleData: PropTypes.array.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  highlight:
    theme.palette.type === "light"
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  title: {
    flex: "1 1 100%",
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected, onDeleteIconClicked } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <div />
      )}

      {numSelected > 0 ? (
        <Tooltip title="Uncheck All">
          <IconButton
            aria-label="delete"
            onClick={onDeleteIconClicked}
            style={{ backgroundColor: "#FFF5F480", margin: 5, padding: 7.5 }}
          >
            <UndoIcon style={{ color: "#DC241F" }} />
          </IconButton>
        </Tooltip>
      ) : (
        <div />
      )}
    </div>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onDeleteIconClicked: PropTypes.func.isRequired,
};

const TableCheckPagination = (props) => {
  const classes = useStyles();
  const {
    rowsPerPage,
    totalRows,
    totalPages,
    changePage,
    data,
    fields,
    cellOption,
    onSelectedItems,
    onSelectedItemsObj,
    isFirstColumnAlignLeft,
    isWithCheck,
    isLoadData,
    sorting,
    isSort,
    leftAlignBody,
    resetPageCounter,
    isWithApiSorting,
    limitCharacter,
    alignTitleData
  } = props;
// console.log("+++ alignTitleData",alignTitleData);
  const rows = data;
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("");
  const [selected, setSelected] = React.useState([]);
  const [selectedObj, setSelectedObj] = React.useState([]);
  const [page, setPage] = React.useState(1);

  useEffect(() => {
    // console.log("<<<<< SELECTED : ", JSON.stringify(selected));
    onSelectedItems(selected);
  }, [selected]);
  useEffect(() => {
    // console.log("<<<<< SELECTED OBJ: ", JSON.stringify(selectedObj));
    onSelectedItemsObj(selectedObj);
  }, [selectedObj]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);

    if (isSort) {
      const type = isAsc ? "desc" : "asc";
      sorting(type, property);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      // selected ID only
      const newSelecteds = rows.map((n) => n.id);
      setSelected(newSelecteds);
      // selected all object
      const newSelectedObjs = rows.map((n) => n);
      setSelectedObj(newSelectedObjs);
      return;
    }
    // selected ID only
    setSelected([]);
    // selected all object
    setSelectedObj([]);
  };

  const handleClick = (event, id, row) => {
    const selectedIndex = selected.indexOf(id);
    // selected ID only
    let newSelected = [];
    // selected all object
    let newSelectedObj = [];

    if (selectedIndex === -1) {
      // selected ID only
      newSelected = newSelected.concat(selected, id);
      // selected all object
      newSelectedObj = newSelectedObj.concat(selectedObj, row);
    } else if (selectedIndex === 0) {
      // selected ID only
      newSelected = newSelected.concat(selected.slice(1));
      // selected all object
      newSelectedObj = newSelectedObj.concat(selectedObj.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      // selected ID only
      newSelected = newSelected.concat(selected.slice(0, -1));
      // selected all object
      newSelectedObj = newSelectedObj.concat(selectedObj.slice(0, -1));
    } else if (selectedIndex > 0) {
      // selected ID only
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
      // selected all object
      newSelectedObj = newSelectedObj.concat(
        selectedObj.slice(0, selectedIndex),
        selectedObj.slice(selectedIndex + 1)
      );
    }

    // selected ID only
    setSelected(newSelected);
    // selected all object
    setSelectedObj(newSelectedObj);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    changePage(newPage - 1);
  };
  useEffect(() => {
    setPage(1);
  }, [resetPageCounter]);

  const handleDeleteIconClicked = () => {
    setSelected([]);
    setSelectedObj([]);
  };
  const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows = rowsPerPage - rows.length;

  return (
    <div className={classes.root}>
      {isLoadData ? (
        <LoadingView maxheight="100%" />
      ) : (
        <div>
          <TableContainer component={Paper} className={classes.paper}>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              size="small"
              aria-label="enhanced table"
            >
              {/* Table HEADER/TITLE */}
              <EnhancedTableHead
                classes={classes}
                headCells={fields}
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
                isFirstColumnAlignLeft={isFirstColumnAlignLeft}
                cellOption={cellOption}
                isWithCheck={isWithCheck}
                alignTitleData={alignTitleData}
              />
              <TableBody>
                {(isWithApiSorting ? rows : stableSort(rows, getComparator(order, orderBy)))
                  // .slice((page-1) * rowsPerPage, (page-1) * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.id);
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return (
                      <TableRow
                        hover
                        onClick={
                          isWithCheck
                            ? (event) => handleClick(event, row.id, row)
                            : () => {}
                        }
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.id}
                        selected={isItemSelected}
                        style={{ height: 50 }}
                      >
                        {isWithCheck && (
                          <TableCell
                            padding="checkbox"
                            className={classes.checkBox}
                          >
                            <Checkbox
                              checked={isItemSelected}
                              inputProps={{ "aria-labelledby": labelId }}
                            />
                          </TableCell>
                        )}

                        {Object.keys(row).map((object, j) => {
                          const theAlign =
                          leftAlignBody?.includes(j)
                            ? "left"
                            : "center";
                          if (cellOption[j] !== "hide") {
                            // if (limitCharacter !== false) {
                            //   if (Object.values(row)[j] !== null && Object.values(row)[j].length > 20){
                            //     return (
                            //       <TableCell key={j} className={classes.tableValueCell}>
                            //           <TableCellOption
                            //           cellType={cellOption[j]}
                            //           value={Object.values(row)[j].substr(0, 20)+"..."} 
                            //           className={classes.tableCell}
                            //           align={theAlign}
                            //           />
                            //       </TableCell>
                            //     );
                            //   } else {
                            //     return (
                            //       <TableCell key={j} className={classes.tableValueCell}>
                            //         <TableCellOption
                            //           cellType={cellOption[j]}
                            //           value={Object.values(row)[j]} 
                            //           className={classes.tableCell}
                            //           align={theAlign}
                            //         />
                            //       </TableCell>
                            //     );
                            //   }
                            // } else {
                            return (
                              <TableCell key={j} className={classes.tableValueCell}>
                                <TableCellOption
                                  cellType={cellOption[j]}
                                  value={Object.values(row)[j]} 
                                  className={classes.tableCell}
                                  align={theAlign}
                                />
                              </TableCell>
                            );
                            // }
                          }
                        })}
                      </TableRow>
                    );
                  })}
                {/* Row Empty Data */}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 50 * emptyRows }}>
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
                      <TableCell colSpan={6} />
                    )}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <EnhancedTableToolbar
            numSelected={selected.length}
            onDeleteIconClicked={handleDeleteIconClicked}
          />
          <div className={classes.paginationContainer}>
            <Typography
              style={{ fontSize: 15, color: Constants.color.grayMedium }}
            >
              Showing {(page - 1) * rowsPerPage + 1} -{" "}
              {(page - 1) * rowsPerPage + data.length} of {totalRows}
            </Typography>
            <TablePagination
              count={totalPages}
              page={page}
              className={classes.pagination}
              onChange={handleChangePage}
            />
          </div>
        </div>
      )}
    </div>
  );
};

TableCheckPagination.propTypes = {
  rowsPerPage: PropTypes.number,
  totalRows: PropTypes.number,
  totalPages: PropTypes.number,
  changePage: PropTypes.func,
  data: PropTypes.array,
  fields: PropTypes.array,
  cellOption: PropTypes.array,
  onSelectedItems: PropTypes.func,
  onSelectedItemsObj: PropTypes.func,
  isFirstColumnAlignLeft: PropTypes.bool,
  isWithCheck: PropTypes.bool,
  isLoadData: PropTypes.bool,
  sorting: PropTypes.func,
  isSort: PropTypes.bool,
  resetPageCounter: PropTypes.number,
  limitCharacter: PropTypes.bool,
  alignTitleData: PropTypes.array,
};

TableCheckPagination.defaultProps = {
  rowsPerPage: 10,
  totalRows: 0,
  totalPages: 1,
  changePage: (val) => {
    // console.log("Change page to: ", val);
  },
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
  onSelectedItems: () => {
    // console.log("<<<< Selected Items Has Changed");
  },
  onSelectedItemsObj: () => {
    // console.log("<<<< Selected Items Obj Has Changed");
  },
  isFirstColumnAlignLeft: false,
  isWithCheck: true,
  limitCharacter: false,
  isLoadData: false,
  sorting: () => {
    // console.log("Sorting");
  },
  isSort: false,
  resetPageCounter: 0,
  alignTitleData: undefined,
};

export default TableCheckPagination;
