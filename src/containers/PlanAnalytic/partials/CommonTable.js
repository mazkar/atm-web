import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import { Link } from 'react-router-dom';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';

import {
  GrayMedium,
  PrimaryHard,
  RedHard,
  GrayHard,
} from '../../../assets/theme/colors';

const useStyles = makeStyles(() => ({
  pagItemRoot: {
    color: PrimaryHard,
    margin: '0 5px',
    padding: '0 6px',
    fontWeight: 500,
    fontSize: '15px',
    lineHeight: '18px',
    height: 'auto',
    minWidth: 0,
    '&.MuiPaginationItem-page.Mui-disabled': {
      opacity: 1,
    },
  },
  pagItemDisabled: {
    color: GrayMedium,
  },
  pagItemSelected: {
    backgroundColor: 'transparent!important',
    color: GrayMedium,
  },
}));

const CommonTable = (props) => {
  const classes = useStyles();

  return (
    <>
      <TableContainer
        component={Paper}
        style={{
          boxShadow: '0px 6px 6px rgba(232, 238, 255, 0.3)',
          borderRadius: '10px',
          marginBottom: 20,
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              {props.header.map((val, i) => {
                return <CustomCell key={i}>{val}</CustomCell>;
              })}
              <CustomCell> </CustomCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.body.map((val, i) => {
              return (
                <TableRow key={i}>
                  {val.map((value, j) => (
                    <CustomCell key={j}>{value}</CustomCell>
                  ))}
                  {/* <CustomCell>
                    <Typography
                      component={Link}
                      style={{ fontSize: '13px', lineHeight: '16px' }}
                    >
                      Lihat Detil
                    </Typography>
                  </CustomCell> */}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography
          style={{
            fontWeight: 500,
            fontSize: '15px',
            lineHeight: '18px',
            color: GrayHard,
          }}
        >
          Showing 1 - 10 of 10
        </Typography>
        <Paper
          style={{
            boxShadow: '0px 6px 6px rgba(232, 238, 255, 0.3)',
            borderRadius: '10px',
          }}
        >
          <Pagination
            count={10}
            style={{ padding: '8px 0' }}
            renderItem={(item) => (
              <PaginationItem
                classes={{
                  root: classes.pagItemRoot,
                  disabled: classes.pagItemDisabled,
                  selected: classes.pagItemSelected,
                }}
                {...item}
              />
            )}
          />
        </Paper>
      </div>
    </>
  );
};

export default CommonTable;

const CustomCell = withStyles((theme) => ({
  root: {
    fontSize: 13,
    lineHeight: '16px',
    padding: '12px',
    textAlign: 'center',
    borderBottomColor: 'rgb(188, 200, 231, .4)',
  },
  head: {
    paddingTop: 20,
    paddingBottom: 4,
    borderBottom: 'none',
    fontWeight: 600,
  },
}))(TableCell);
