/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';

import FloatingChat from '../../components/GeneralComponent/FloatingChat';
import MuiIconLabelButton from '../../components/Button/MuiIconLabelButton';

import constansts from '../../helpers/constants';
import { ReactComponent as PlusWhite } from '../../assets/icons/siab/plus-white.svg';
import { useDispatch } from "../../helpers/Utils/react-redux-hook";
import TablePagination from '../../components/chky/ChkyTablePagination';
import MenuEdit from './OwnComponent/MenuEdit';
import { doDeleteDataVendor, doFetchDataVendor } from './ApiServiceVendor';
import ModalLoader from '../../components/ModalLoader';

const useStyles = makeStyles({
  root: {
    padding: '30px 20px 20px 30px',
    '& .MuiBox-root': {
      padding: 0,
    },
  },
  titleContainer: {
    paddingBottom: 15
  },
  title: {
    fontFamily: 'Barlow',
    fontWeight: '500',
    fontSize: '36px',
    color: constansts.color.dark,
  },
  tableContent: {
    marginTop: 20
  },
});

const Vendor = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const [isLoadData, setIsLoadData] = useState(false); 
  const [orderBy, setOrderBy] = useState("id"); 
  // set handler loader when call Approval API Service
  function loadDataHandler(loaderValue){
    setIsLoadData(loaderValue);
  }
  const [isModalLoader, setIsModalLoader] = useState(false);  
  // set handler loader when call Approval API Service
  function handleModalLoader(loaderValue){
    setIsModalLoader(loaderValue);
  }
  const [totalPages, setTotalPages] = useState(0); // <--- init default totalPages
  const [totalRows, setTotalRows] = useState(0); // <--- init default totalRows
  const [currentPage, setCurrentPage] = useState(0); // <--- init default currentPage
  const [dataVendorTable, setDataVendorTable] = useState([]);

  const rowsPerPage = 10; // <--- init default rowsPerPage

  function editButton(id) {
    history.push(`/vendors/edit-vendor/${id}`);
    // setIsLoadData(true);
    // dispatch.userManagement.vendorManagementEdit(id);
  }

  function deleteButton(id) {
    doDeleteDataVendor(handleModalLoader, id).then(response=>{
      if(response){
        if(response.data.responseCode=== "200"){
          alert("Data was deleted!");
          history.go(0);
        }else if(response.data.responseCode=== "201"){
          alert(response.data.responseMessage);
        }
        else{
          alert("Error delete data, Please try again!");
        }
      }else{
        alert("Error delete data, Please try again!");
      }
    });
    // setIsLoadData(true);
    // dispatch.userManagement.vendorManagementDelete(id);
    // alert('action delete');
  }

  const titleTable = [
    'Vendor Id',
    'Vendor Name',
    'Email',
    'No Telp/HP',
    'Alamat',
    'Status',
    ''
  ];
  const valueType = [
    // 'hide',
    'string',
    'string',
    'string',
    'string',
    'string',
    'status_user',
    'child'
  ];
  const isSort = [true, true, true, true, true, true];

  const columnNameVar = [
    'id',
    'name',
    'email',
    'telephoneNumber',
    'address',
    'active',
  ];

  // SORT
  const [orderDirection, setOrderDirection] = useState('asc');
  const [sortBy, setSortBy] = useState(null);
  function handleSort(property) {
    // return function actualFn() {
    //   // console.log(property,e);
    //   const isActiveAndAsc = sortBy === property && orderDirection === 'asc';
    //   setOrderDirection(isActiveAndAsc ? 'desc' : 'asc');
    //   setSortBy(property);
    // };

    return function actualFn() {
      const isActiveAndAsc = sortBy === property && orderDirection === 'ASC';
      setOrderDirection(isActiveAndAsc ? 'DESC' : 'ASC');
      setSortBy(property);
      setOrderBy(columnNameVar[titleTable.indexOf(property)]);
      setCurrentPage(0);
    };
  }

  // do fetch / hit api 
  useEffect(()=>{
    doFetchDataVendor(loadDataHandler, rowsPerPage, currentPage, orderBy, orderDirection.toUpperCase()).then(response=>{
      console.log(">>>> doFetchDataVendor :", JSON.stringify(response));
      if(response){
        const dataVendor = [];
        if(response.status){
          response.data.content.map((data) => {
            const dataAction = [{
              name: ['Edit', 'Delete'],
              type: ['edit', 'delete'],
              handler: [editButton, deleteButton],
              id: data.id
            }];
            const newRow = {
              // id: data.id,
              vendorId: data.id,
              vendorName: data.name,
              email: data.email,
              telephoneNumber: data.telephoneNumber,
              alamat: data.address,
              status: data.active ? "1" : "2",
              dataAction: <MenuEdit value={dataAction} />
            };
            dataVendor.push(newRow);
          });
          setDataVendorTable(dataVendor);
          setTotalRows(response.data.totalElements);
          setTotalPages(response.data.totalPages);
        }
      }
    });
  }, [currentPage, orderBy, orderDirection]);

  return (
    <div className={classes.root}>
      <Grid container justify="space-between" className={classes.titleContainer} alignItems="center">
        <Grid item>
          <Typography className={classes.title}>Vendor Management</Typography>
        </Grid>
        <Grid item>
          <MuiIconLabelButton
            style={{ width: 137, height: 40 }}
            label="Add Vendor"
            iconPosition="startIcon"
            onClick={()=>history.push('/vendors/new-vendor')}
            buttonIcon={<PlusWhite />}
          />
        </Grid>
      </Grid>
      <div className={classes.container}>
        <div className={classes.tableContent}>
          <TablePagination
            data={dataVendorTable}
            fields={titleTable}
            cellOption={valueType}
            totalPages={totalPages}
            rowsPerPage={rowsPerPage}
            totalRows={totalRows}
            changePage={(newPage)=>setCurrentPage(newPage)}
            isWithCheck={false}
            isSort={isSort}
            isUsingMuiSort
            handleSort={handleSort}
            sortBy={sortBy}
            order={orderDirection}
            isLoadData={isLoadData}
          />
        </div>
      </div>

      {/* <FloatingChat /> */}
      <ModalLoader isOpen={isModalLoader} />
    </div>
  );
};

function mapStateToProps() {
  return {};
}

export default withRouter(
  connect(mapStateToProps)(withTranslation('translations')(Vendor))
);