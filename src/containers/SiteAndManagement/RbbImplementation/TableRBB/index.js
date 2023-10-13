import React from 'react';
import PropTypes from 'prop-types';

import { Table, Typography } from 'antd';

import { makeStyles } from '@material-ui/core/styles';
import TablePagination from '@material-ui/lab/Pagination';
import { Grid, Paper } from '@material-ui/core';

import Constants from '../../../../helpers/constants';
import { ReactComponent as StarIcon } from '../../../../assets/icons/siab/star.svg';
import Loading from '../../../../components/Loading/LoadingView';

import './TableRBB.css';

const useStyles = makeStyles({
  root: {
    padding: '30px 20px 20px 30px',
    '& .MuiBox-root': {
      padding: '20px 0px 0px 0px',
    },
  },
  rootTable: {
    width: '100%',
    // overflowX: "auto",
    borderRadius: '10px',
  },
  titleSum: {
    fontSize: 15,
    fontWeight: 500,
  },
  total: {
    width: 'max-content',
    // paddingRight: 10,
    margin: 'auto',
  },
  cellRowEnd: {
    '& .MuiTableCell-sizeSmall': {
      padding: '5px 0px 5px 0px',
      borderBottom: 0,
    },
  },
  cellRowEndGrand: {
    height: 50,
    '& .MuiTableCell-sizeSmall': {
      borderBottom: 0,
    },
  },
});

const { Text } = Typography;

const TableRBB = (props) => {
  const classes = useStyles();
  // const { rowsPerPage, totalRows, totalPages } = props;
  const {
    titleSum,
    imgIcon,
    columnData,
    data,
    grandTotal,
    summaries,
    scrollWidth,
    isLoading,
  } = props;
  // console.log(data);
  const styleWithTab = { position: 'relative', top: -45 };
  const dataSource = data.map((val) => {
    const newCities = val.children?.map((city) => {
      const veryNewLoc = city.children?.map((newloc) => {
        return {
          ...newloc,
          sisalaporbiIndex: newloc.sisalaporbiIndex < 0 ? 'N/A' : newloc.sisalaporbiIndex,
        };
      });
      return {
        ...city,
        children: veryNewLoc || [],
        sisalaporbiIndex: city.sisalaporbiIndex < 0 ? 'N/A' : city.sisalaporbiIndex,
      };
    });
    return {
      ...val,
      children: newCities || [],
      sisalaporbiIndex: val.sisalaporbiIndex < 0 ? 'N/A' : val.sisalaporbiIndex,
    };
  });

  const newSummaries = dataSource
    .map((val) => val.sisalaporbiIndex)
    .filter((val) => val !== 'N/A')
    .reduce((a, b) => a + b, 0);
  // console.log(newSummaries);

  return (
    <div style={{ styleWithTab: null }}>
      {isLoading ? (
        <Loading maxheight='100%' />
      ) : (
        <div>
          <Paper className={classes.rootTable}>
            <Grid
              container
              direction='row'
              alignItems='center'
              spacing={2}
              style={{ padding: '20px 0 0 20px' }}
            >
              <Grid item>
                {imgIcon === null ? (
                  ''
                ) : (
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: 30,
                      height: 30,
                      backgroundColor: '#FFE9E9',
                      borderRadius: 10,
                    }}
                  >
                    {imgIcon}
                  </div>
                )}
              </Grid>
              <Grid item>
                <Typography style={{ fontSize: 15, fontWeight: 500 }}>{titleSum}</Typography>
              </Grid>
            </Grid>
            <Table
              align='center'
              columns={columnData}
              dataSource={dataSource}
              pagination={{
                style: {
                  marginRight: 20,
                },
                pageSizeOptions: ['5', '10', '20'],
              }}
              scroll={{ x: scrollWidth }}
              summary={(pageData) => {
                return (
                  <>
                    {grandTotal !== null && (
                      <Table.Summary.Row>
                        <Table.Summary.Cell align='center'>
                          <Text strong className={classes.total}>
                            Grand Total
                          </Text>
                        </Table.Summary.Cell>
                        {summaries.map((item, i) => {
                          return (
                            <Table.Summary.Cell key={i} align='center'>
                              <Text strong className={classes.total} key={i}>
                                {i == 4 ? newSummaries : item}
                              </Text>
                            </Table.Summary.Cell>
                          );
                        })}
                      </Table.Summary.Row>
                    )}
                  </>
                );
              }}
            />
          </Paper>
        </div>
      )}
    </div>
  );
};

TableRBB.propTypes = {
  rowsPerPage: PropTypes.number,
  data: PropTypes.array,
  imgIcon: PropTypes.object.isRequired,
  columnData: PropTypes.array,
  // grandTotal: PropTypes.object,
  summaries: PropTypes.array,
  scrollWidth: PropTypes.number,
  isLoading: PropTypes.bool,
};

TableRBB.defaultProps = {
  rowsPerPage: 10,
  data: [],
  imgIcon: <StarIcon />,
  columnData: [],
  grandTotal: {},
  summaries: [],
  scrollWidth: 0,
  isLoading: false,
};

export default TableRBB;
