import React ,{useState}from 'react'
import PropTypes from 'prop-types'
import Table from '@material-ui/core/Table'
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCellOption from '../../../../../../components/TabelCellOptions'
import {makeStyles,useTheme} from "@material-ui/core/styles"
import { Grid, Typography } from "@material-ui/core";
import LoadingView from '../../../../../../components/Loading/LoadingView';
import EmptyImg from "../../../../../../assets/images/empty_data.png";
const useStyles = makeStyles({
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
});

function TableObject(props) {
    const classes= useStyles()
    const {
      fields,
      data,
      cellOption,
      isUsingMuiSort,
      isSort,
      alignTitleData,
      sortBy,
      firstColumnLeft,
      leftAlignHeaders,
      leftAlignBody,
      giveHeaderGap,
      isLoad,
    } = props;
    const rows = data;
   
  return (
    <div>
      {isLoad ? (
        <LoadingView maxheight="100%" />
      ) : (
        <Table
          stickyHeader
          className={classes.table}
          size="small"
          aria-table="a dense table"
          scroll={{ y: "max-content" }}
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
                    (firstColumnLeft && i === 0) || leftAlignHeaders.includes(i)
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
                <TableRow key={k}>
                  {Object.keys(row).map((object, j) => {
                    const typeCell = cellOption[j];
                    const theAlign = leftAlignBody?.includes(j)
                      ? "left"
                      : "center";
                    if (typeCell !== "hide") {
                      return (
                        <TableCell key={j} className={classes.tableValueCell}>
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
            {data.length < 1 && (
              <TableRow style={{ height: 30 * (4-data.length)}}>
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
      )}
    </div>
  );
}

TableObject.propTypes = {
  data: PropTypes.array,
  fields: PropTypes.array,
  cellOption: PropTypes.array,
  alignTitleDta: PropTypes.array,
  cellType: PropTypes.string,
};
TableObject.defaultProps = {
  data: [],
  fields: ["ATM ID", "Alamat", "Kondisi ATM", "Nilai Pajak", "Status"],
  cellOption: ["string", "string", "string", "string", "string"],
  leftAlignHeaders: [],
  isSort: [false, false, false, false, false, false, false],
  cellType: "string",
};
export default TableObject
