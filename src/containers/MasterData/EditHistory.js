import React from 'react';
import {
  makeStyles,
  Typography,
  Grid,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Link,
} from '@material-ui/core';
import MuiIconLabelButton from '../../components/Button/MuiIconLabelButton';
import { ReactComponent as DownloadCloud } from '../../assets/icons/siab/download-cloud.svg';
import constansts from '../../helpers/constants';
import { ChkyTablePagination } from '../../components';
import moment from 'moment';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import ModalLoader from '../../components/ModalLoader';

const useStyles = makeStyles({
  root: {
    padding: '30px 20px 20px 30px',
  },
  titleContainer: {
    marginBottom: 15,
  },
  title: {
    fontFamily: 'Barlow',
    fontWeight: '500',
    fontSize: '36px',
    color: constansts.color.dark,
  },
  containerMachine: {
    padding: 15,
    border: '1px solid #8D98B4',
    borderRadius: 10,
  },
  fontStyle: {
    fontWeight: 500,
    fontSize: 15,
  },
});

const EditHistory = () => {
  const classes = useStyles();
  const [currentPage, setCurrentPage] = useState(0);
  const [historyData, setHistoryData] = useState([]);
  const [isLoadData, setIsLoadData] = useState(false);
  const [isModalLoaderOpen, setIsModalLoaderOpen] = useState(false);
  const rowsPerPage = 10;
  const [totalPages, setTotalPages] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  
  const handleChangePage = (newPage) => {
    // console.log('~ newPage', newPage);
    setCurrentPage(newPage);
  };

  useEffect(() => {
    setIsLoadData(true);
    axios({
      method: 'POST',
      url: `${constansts.MODELINGS_SERVICE}/getHistoryMasterData`,
      data: {
        pageNumber: currentPage,
        dataPerPage: rowsPerPage,
      },
    })
      .then((res) => {
        setIsLoadData(false);
        // console.log('~ res.data', res.data);
        setHistoryData(
          res.data.content.map((val) => ({
            atmId: val.atmId,
            changesDate: moment(val.changesDate).format('DD/MM/YYYY, HH:mm'),
            userId: val.userId,
            userName: val.userName,
            changesField: val.changesField,
            beforeChanges: val.beforeChanges,
            afterChanges: val.afterChanges,
          }))
        );
        setTotalPages(res.data.totalPages);
        setTotalRows(res.data.totalElements);
      })
      .catch((err) => {
        setIsLoadData(false);
        console.log('~ err', err);
      });
  }, [currentPage]);

  const handleClick = () => {
    setIsModalLoaderOpen(true);
    // console.log('click');
    axios({
      url: `${process.env.REACT_APP_API_DOMAIN}/analysismodelingservice/v1/downloadHistoryMasterData`,
      responseType: 'blob', // important
      method: 'GET',
      // headers: {
      //   'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      // },
    })
      .then((res) => {
        console.log(res.data);
        setIsModalLoaderOpen(false);
        const blob = new Blob([res.data], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        const url = window.URL.createObjectURL(blob);
        // console.log('~ url', url);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'History Master Data.xlsx');
        document.body.appendChild(link);
        link.addEventListener(
          'click',
          function () {
            setTimeout(() => {
              URL.revokeObjectURL(url);
              link.removeEventListener('click', this);
            }, 150);
          },
          false
        );
        link.click();
        document.body.removeChild(link);
      })
      .catch((err) => {
        setIsModalLoaderOpen(false);
        console.log(err);
      });
  };

  return (
    <div className={classes.root}>
      <Grid
        container
        justify='space-between'
        className={classes.titleContainer}
        alignItems='center'
      >
        <Grid item>
          <Typography className={classes.title}>History Master Data</Typography>
        </Grid>
        <Grid item>
          <MuiIconLabelButton
            style={{ width: 'max-content', right: 0, height: 40 }}
            label='Download'
            iconPosition='startIcon'
            onClick={() => {
              handleClick();
            }}
            buttonIcon={<DownloadCloud />}
          />
        </Grid>
      </Grid>
      <ChkyTablePagination
        data={historyData}
        fields={titleTable}
        cellOption={valueType}
        totalPages={totalPages}
        rowsPerPage={rowsPerPage}
        totalRows={totalRows}
        changePage={handleChangePage}
        isLoadData={isLoadData}
      />
      <ModalLoader isOpen={isModalLoaderOpen} />
    </div>
  );
};

export default EditHistory;

const titleTable = [
  'ATM ID',
  'Tgl Perubahan',
  'User ID',
  'Username',
  'Field yang Berubah',
  'Before',
  'After',
];

const valueType = ['string', 'string', 'string', 'string', 'string', 'string', 'string'];
