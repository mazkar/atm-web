/* eslint-disable prefer-template */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable indent */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import Link from '@material-ui/core/Link';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import TablePagination from '@material-ui/lab/Pagination';
import DownArrow from '../../assets/icons/siab/chevron-down.png';
import TableCellOption from '../TabelCellOptions';
import Constants from '../../helpers/constants';
import { Typography } from '@material-ui/core';
import LoadingView from '../Loading/LoadingView';
import EmptyImg from "../../assets/images/empty_data.png";

import './style.css'
import constansts from '../../helpers/constants';

const useStyles = makeStyles({
  root: {
    width: "100%",
    overflowX: "auto",
    borderRadius: 10,
    padding: 10,
    boxShadow: '0px 6px 6px rgba(232, 238, 255, 0.3)',
  },
  paper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: constansts.color.white,
    borderRadius: 10
  },
  table: {
    minWidth: 650,
  },
  tableCellHeader: {
    fontSize: 13,
  },
  tableCell: {
    fontSize: 10,
  },
  tableValueCell: {
    '& .MuiIconButton-root': {
      padding: 0,
    },
  },
  paginationContainer: {
    '& > *': {
      marginTop: 15,
      marginBottom: 35,
    },
    display: 'flex',
    justifyContent: 'space-between',
  },
  pagination: {
    padding: 5,
    backgroundColor: Constants.color.white,
    borderRadius: 10,
    '& .Mui-selected': {
      backgroundColor: Constants.color.primaryUltaSoft,
    },
    '& .MuiPaginationItem-root': {
      color: Constants.color.primaryHard,
    },
  },
});

const DynamicTablePagination = (props) => {
  const classes = useStyles();
  const { rowsPerPage, totalRows, data, fields, cellOption, isSort, isLoading, className } = props;
  const rows = data;

  // console.log("==> DATA TABLE" + JSON.stringify(rows));

  const [page, setPage] = React.useState(1);

  // const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - ((page - 1) * rowsPerPage));

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    // console.log("NEW PAGE " + newPage);
  };

  return (
    <div style={{width:'100%'}}>
      {isLoading ?
        <div className={classes.paper}>
          <LoadingView maxheight='100%' />
        </div>
        :
        <div style={{width:'100%'}}>
          <Paper className={classes.root}>
            <Table
              stickyHeader
              className={`${className} ${classes.table}`}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  {fields.map((field, i) => {
                    return (
                      <>
                        {isSort[i] ? (
                          <TableCell key={field} align="center" className={classes.tableCellHeader}>
                            {field}{' '}
                            <Link>
                              <img src={DownArrow} alt="" />
                            </Link>
                          </TableCell>
                        ) : (
                            <TableCell key={field} align="center" className={classes.tableCellHeader}>
                              {field}
                            </TableCell>
                          )}
                      </>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? rows.slice((page - 1) * rowsPerPage, ((page - 1) * rowsPerPage) + rowsPerPage)
                  : rows
                ).map((row) => {
                  return (
                    <TableRow style={{ height: 37, }}>
                      {Object.keys(row).map((object, j) => {
                        const typeCell = cellOption[j];
                        return (
                          <TableCell className={classes.tableValueCell}>
                            {typeCell === 'action' ? (
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
                                />
                              )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}

                {emptyRows > 0 && (
                  <TableRow style={{ height: 37 * emptyRows }}>
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
            </Table>
          </Paper>
          <div className={classes.paginationContainer}>
            <Typography style={{ fontSize: 15, color: Constants.color.grayMedium }}>
              Showing {((page - 1) * rowsPerPage) + 1} - {((page - 1) * rowsPerPage) + rows.slice((page - 1) * rowsPerPage, ((page - 1) * rowsPerPage) + rowsPerPage).length} of {totalRows}
            </Typography>
            <TablePagination
              count={Math.ceil(rows.length / rowsPerPage)}
              className={classes.pagination}
              onChange={handleChangePage}
            />
          </div>
        </div>
      }
    </div>
  );
};

DynamicTablePagination.propTypes = {
  rowsPerPage: PropTypes.number,
  totalRows: PropTypes.number,
  cellType: PropTypes.string,
  data: PropTypes.array,
  fields: PropTypes.array,
  cellOption: PropTypes.array,
  isSort: PropTypes.array,
  isLoading: PropTypes.bool,
  className: PropTypes.string
};

DynamicTablePagination.defaultProps = {
  rowsPerPage: 10,
  cellType: 'string',
  data: [],
  fields: [
    'ID',
    'ATM ID',
    'Priority',
    'Progression',
    'Status',
    'Assignee',
    'Action',
  ],
  cellOption: [
    'string',
    'string',
    'string',
    'string',
    'string',
    'string',
    'action',
  ],
  isSort: [false, false, false, false, false, false, false],
  isLoading: false,
  className: ''
};

export default DynamicTablePagination;
