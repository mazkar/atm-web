/* eslint-disable no-return-assign */
/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';

import Axios from 'axios';
import { Grid, Typography } from '@material-ui/core';
import FloatingChat from '../../../components/GeneralComponent/FloatingChat';
import * as ThemeColor from "../../../assets/theme/colors";
import {
  ChildMenuMore,
  ChkyTablePagination,
} from '../../../components/chky';
import FilterProgress from './FilterProgress';
import ModalRemark from "../../../components/Modal/ModalRemark";
import { useRenameOpeningType } from '../../../helpers';

const useStyles = makeStyles({
  root: {
    padding: "30px 20px 20px 30px",
    "& .MuiBox-root": {
      padding: 0,
    },
    backgroundColor: ThemeColor.GrayUltrasoft,
    minHeight: 'calc(100vh - 64px)',
  },
  filterSection: {
    padding: "10px 20px 10px 20px",
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  dataSectionNoPadding: {
    borderRadius: 4,
    marginTop: 10,
    marginBottom: 20,
  },

  tableData: {
    marginTop: 10
  },
  titleSearch: { marginBottom: 15 },
  filterContainer: { marginBottom: 15 },
  title: {
    fontFamily: 'Barlow',
    fontWeight: '500',
    fontSize: '36px',
    color: '#2B2F3C',
  },
  detail: {
    color: '#DC241F'
  }
});

function directDetail(progress, idSite){
  switch (progress) {
  case 1:
    return '/acquisition/savedLocation';
  case 2:
    return '/acquisition/savedLocation';
  case 3:
    return `/negotiation/detail/${idSite}`;
  case 4:
    return '/procurement';
  case 5:
    return '/approval';
  case 6:
    return '/submission-tracking';
  case 7:
    return '';
  case 8:
    return '';
  case 9:
    return '';
  case 10:
    return '';
  case 11:
    return '';
  case 12:
    return '/rbb-implementation';
  default:
    return '';
  }
}

const Overview = () => {
  const classes = useStyles();

  const [totalPages, setTotalPages] = useState(0); // <--- init default totalPages
  const [totalRows, setTotalRows] = useState(0); // <--- init default totalRows
  const [currentPage, setCurrentPage] = useState(0); // <--- init default currentPage
  const rowsPerPage = 10; // <--- init default rowsPerPage
  const [dataProgress, setDataProgress] = useState([]);
  const [isLoadData, setIsLoadData] = useState(true);  // Init TABS Value
  const [orderDirection, setOrderDirection] = useState('ASC');
  const [orderBy, setOrderBy] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const [selectedRow, setSelectedRow] = useState();
  const [isOpenModalRemark, setModalRemark] = useState(false);
  const [dataFilter, setDataFilter] = useState({
    area: 'All',
    city: 'All',
    atmId: 'All',
    type: 'All',
    progress: 'All',
    approval: 'All',
    docLegal: 'All'
  });
  // RESET PAGE PAGINATION
  const [resetPageCounter, setResetPageCounter] = useState(0);

  // default hit data
  const [dataHit, setDataHit] = useState({
    pageNumber: currentPage,
    dataPerPage: rowsPerPage,
    atmId: 'All',
    city: 'All',
    area: 'All',
    type: 'All',
    progress: 'All',
    approvalStatus: 'All',
    docLegalityStatus: 'All'
  });

  const titleTable = ['ATM ID', 'Location', 'ID Requester', 'Type', 'Progress', 'Last Update', 'PIC', 'Approver', ''];

  const valueType = ['string', 'string', 'string', 'string', 'progress_progress', 'string', 'string', 'approverNew', 'string'];

  useEffect(() => {
    setDataProgress([]);
    setIsLoadData(true);
    Axios.post(
      `${process.env.REACT_APP_API_DOMAIN}/acquisitionservice/acquisitionservice/v1/getProgressList`,
      {
        pageNumber: dataHit.pageNumber,
        dataPerPage: dataHit.dataPerPage,
        atmId: dataHit.atmId,
        cityId: dataHit.city,
        picAreaId: dataHit.area,
        type: dataHit.type,
        progress: dataHit.progress,
        approvalStatus: dataHit.approvalStatus,
        docLegalityStatus: dataHit.docLegalityStatus,
        ...(orderBy && {orderBy, orderDirection})
      },
      {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Access-Control-Allow-Origin': '*',
        }
      },
    )
      .then(res => {
        const {progressListDetails} = res.data;
        if(progressListDetails) {
          const progressData = [];
          progressListDetails.map(item => {
            let detail = '-';
            if(item.progress) {
              if(item.progress===1) {
                detail = 'Pipeline';
              } else if(item.progress===2) {
                detail = 'Profiling';
              } else if(item.progress===3) {
                detail = 'Negotiation';
              } else if(item.progress===4) {
                detail = 'Procurement';
              } else if(item.progress===5) {
                detail = 'Approval';
              } else if(item.progress===6) {
                detail = 'Submission';
              } else if(item.progress===7) {
                detail = 'Konfirmasi Perpanjangan';
              } else if(item.progress===8) {
                detail = 'Konfirmasi Termination';
              } else if(item.progress===9) {
                detail = 'Izin / Jadwal Penarikan';
              } else if(item.progress===10) {
                detail = 'Terminated';
              } else if(item.progress===11) {
                detail = 'Replace';
              } else if(item.progress===99) {
                detail = 'Approved';
              } else {
                detail = 'Implementation';
              };
            };
            const dataMenu = [{
              name: 'Detail',
              type: 'next',
              handler: ()=> window.location.href=`${directDetail(item.progress, item.idSite)}`,
            },
            {
              name: 'Edit',
              type: 'edit',
              handler: ()=> window.location.href=`/site-management/progress-list/edit-profiling?openingType=${useRenameOpeningType(item.type)}&savedId=${item.idSite}&atmId=${item.atmId}`,
            },
            {
              name: 'Remark',
              type: 'remark',
              handler: ()=> showRemark(item.idSite),
            },
            ];
            const newItem = {
              // eslint-disable-next-line no-nested-ternary
              atmId: item.type === 'New ATM' || item.type === 'Reopen' ? '-' :  item.atmId ? item.atmId : '-',
              locationName: item.locationName ? item.locationName : '-',
              idRequester: item.requesterId ? item.requesterId : '-',
              statusType: item.type ? item.type : '-',
              progress: detail,
              lastUpdate: item.lastUpdate ? dateFormat(item.lastUpdate) : '-',
              picName: item.picName ? item.picName : '-',
              approver: item.approverList ? item.approverList : [],
              // action: item ? detailComponent(item) : ''
              menu: <ChildMenuMore value={dataMenu} textLink="Action" />
            };
            progressData.push(newItem);
          });
          setDataProgress(progressData);
          setTotalPages(res.data.totalPages);
          setTotalRows(res.data.totalElements);
          setIsLoadData(false);
        };
      })
      .catch(err => {
        alert(`Error Fetching Data...! \n${err}`);
        setIsLoadData(false);
      });
  }, [dataHit, orderBy, orderDirection]);

  useEffect(() => {
    setDataHit({
      pageNumber: currentPage,
      dataPerPage: rowsPerPage,
      atmId: dataFilter.atmId,
      city: dataFilter.city,
      area: dataFilter.area,
      type: dataFilter.type,
      progress: dataFilter.progress,
      approvalStatus: dataFilter.approval,
      docLegalityStatus: dataFilter.docLegal
    });
  }, [dataFilter]);

  function handleChangePageValue(newPage) {
    setCurrentPage(newPage);
    setDataHit({
      pageNumber: newPage,
      dataPerPage: rowsPerPage,
      atmId: dataFilter.atmId,
      city: dataFilter.city,
      area: dataFilter.area,
      type: dataFilter.type,
      progress: dataFilter.progress,
      approvalStatus: dataFilter.approval,
      docLegalityStatus: dataFilter.docLegal
    });
  }

  const detailComponent = (value) => {
    let link = '';
    if(value.progress===1 || value.progress===2) {
      link += '/acquisition/savedLocation';
    } else if(value.progress===3) {
      link += `/negotiation/detail/${value.idSite}`;
    } else if(value.progress===4) {
      link += '/procurement';
    } else if(value.progress===5) {
      link += '/approval';
    } else if(value.progress===6) {
      link += '/submission-tracking';
    } else if(value.progress===7) {
      link += '';
    } else if(value.progress===8) {
      link += '';
    } else if(value.progress===9) {
      link += '';
    } else if(value.progress===10) {
      link += '';
    } else if(value.progress===11) {
      link += '';
    } else if(value.progress===12) {
      link += '/rbb-implementation';
    } else {
      link += '';
    };
    return <Link to={link} className={classes.detail}>Detail</Link>;
  };

  const dateFormat = (seconds) => {
    const date = new Date(seconds);
    const newDate = date.getDate();
    const newMonth = date.getMonth()+1;
    const newYear = date.getFullYear();
    return `${newDate<10 ? `0${newDate}` : newDate}/${newMonth<10 ? `0${newMonth}` : newMonth}/${newYear}`;
  };

  function handleSort(property) {
    return function actualFn(e) {
      const isActiveAndAsc = sortBy === property && orderDirection === 'ASC';
      setOrderDirection(isActiveAndAsc ? 'DESC' : 'ASC');
      setSortBy(property);
      setOrderBy(columnNameVar[titleTable.indexOf(property)]);
      setCurrentPage(0);
      setDataHit({...dataHit, pageNumber: 0})
    };
  }

  const showRemark = (id) => {
    // console.log(id);
    setSelectedRow(id);
    setModalRemark(true);
  };

  const handleCloseRemark = () => setModalRemark(false);

  return (
    <div className={classes.root}>
      <div className={classes.titleSearch}>
        <Typography className={classes.title}>Progress List</Typography>
      </div>
      <Grid container direction="column" spacing={2}>
        <Grid item style={{width: '-webkit-fill-available'}}>
          <div className={classes.filterContainer}>
            <FilterProgress setDataFilter={setDataFilter} setCurrentPage={setCurrentPage} />
          </div>
          <div className={classes.tableContent}>
            <ChkyTablePagination
              data={dataProgress}
              fields={titleTable}
              cellOption={valueType}
              totalPages={totalPages}
              rowsPerPage={rowsPerPage}
              totalRows={totalRows}
              isLoadData={isLoadData}
              changePage={handleChangePageValue}
              resetPageCounter={resetPageCounter}
              leftAlignBody={[1]}
              outerPage={currentPage+1}
              isSort={isSort}
              isUsingMuiSort={true}
              handleSort={handleSort}
              sortBy={sortBy}
              order={orderDirection}
            />
          </div>
        </Grid>
      </Grid>
      {/* <FloatingChat /> */}

      {isOpenModalRemark && (
        <ModalRemark
          isOpen={isOpenModalRemark}
          onClose={handleCloseRemark}
          onLeave={handleCloseRemark}
          rowToShow={selectedRow}
          type="ProgressList"
          rType="PROGRESS_LIST_REMARK"
        />
      )}

    </div>
  );
};

function mapStateToProps() {
  return {};
}

export default withRouter(
  connect(mapStateToProps)(withTranslation('translations')(Overview))
);

const isSort = [true, true, true, true, true, true, true, true,];

const columnNameVar = [
  'atmId',
  'locationName',
  'requesterId',
  'type',
  'progress',
  'lastUpdate',
  'userId',
  'approvalApprover',
];
