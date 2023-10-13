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
import { makeStyles } from '@material-ui/core/styles';
import TableCellOption from '../TabelCellOptions';
import DownArrow from '../../assets/icons/siab/chevron-down.png';

const useStyles = makeStyles({
  root: {
    '& .MuiPaper-rounded': {
      borderRadius: '10px',
    },
  },
  table: {
    minWidth: 650,
  },
});

const index = (props) => {
  const classes = useStyles();
  const { data, fields, cellOption, isSort } = props;

  return (
    <div className={classes.root}>
      <Paper style={{ padding: 10 }}>
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              {fields.map((field, i) => {
                return (
                  <>
                    {isSort[i] ? (
                      <TableCell key={field} align="center">
                        {field}{' '}
                        <Link>
                          <img src={DownArrow} alt="" />
                        </Link>
                      </TableCell>
                    ) : (
                      <TableCell key={field} align="center">
                        {field}
                      </TableCell>
                    )}
                  </>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, i) => {
              return (
                <TableRow>
                  {Object.keys(item).map((object, j) => {
                    const typeCell = cellOption[j];
                    return (
                      // <TableCell key={object.key}>
                      //   <TableCellOption value={object.value}/>
                      // </TableCell>
                      <TableCell key={Object.values(item)[0]}>
                        {typeCell === 'action' ? (
                          <TableCellOption
                            cellType={cellOption[j]}
                            value={Object.values(item)[j]}
                          />
                        ) : (
                          // ? <TableCellOption cellType={cellOption[j]} dataAction={} value={Object.values(item)[j]}/>
                          <TableCellOption
                            cellType={cellOption[j]}
                            value={Object.values(item)[j]}
                          />
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}

            {/* <TableRow >
                 <TableCell align="right"></TableCell>
              </TableRow> */}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
};

index.propTypes = {
  value: PropTypes.string,
  cellType: PropTypes.string,
  data: PropTypes.array,
  fields: PropTypes.array,
  cellOption: PropTypes.array,
  isSort: PropTypes.array,
};

index.defaultProps = {
  value: 'Value',
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
};

export default index;
