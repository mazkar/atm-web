import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import moment from 'moment';
import Axios from 'axios';

import FloatingChat from '../../components/GeneralComponent/FloatingChat';
import MuiIconLabelButton from '../../components/Button/MuiIconLabelButton';
import TablePagination from '../../components/chky/ChkyTablePagination';
import ModalLoader from '../../components/ModalLoader';
import { ReactComponent as PlusWhite } from '../../assets/icons/siab/plus-white.svg';
import { getMenus } from '../../helpers/userManagement';
import Modal from './partials/Modal';
import { GrayUltrasoft } from '../../assets/theme/colors';
import constants from '../../helpers/constants';
import secureStorage from '../../helpers/secureStorage';

const useStyles = makeStyles({
  root: {
    backgroundColor: GrayUltrasoft,
    padding: '30px 20px 20px 30px',
    '& .MuiBox-root': {
      padding: 0,
    },
  },
  titleContainer: {
    paddingBottom: 15,
  },
  title: {
    fontFamily: 'Barlow',
    fontWeight: '500',
    fontSize: '36px',
    color: constants.color.dark,
  },
  tableContent: {
    marginTop: 20,
  },
});

const MenuManagement = () => {
  const classes = useStyles();
  const { userServiceBaseUrl } = constants;
  const [totalRows, setTotalRows] = useState(0); // <--- init default totalRows
  const [currentPage, setCurrentPage] = useState(0); // <--- init default currentPage
  const [datas, setDatas] = useState([]);
  const rowsPerPage = 10; // <--- init default rowsPerPage
  const [orderDirection, setOrderDirection] = useState('asc');
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalType, setModalType] = useState('add');
  const [isModalBtnDisabled, setIsModalBtnDisabled] = useState(false);
  const [modalContent, setModalContent] = useState({ name: '', desc: '' });
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadMenus();
  }, [currentPage, orderDirection]);

  function loadMenus() {
    getMenus({ currentPage, orderDirection })
      .then((res) => {
        if (res.data.status === 'success') {
          setDatas(res.data.data.menus);
          setTotalRows(res.data.data.totalRecord);
        }
      })
      .catch((err) => console.log(err))
      .then(() => {
        setIsLoading(false);
      });
  }

  const handleCloseModal = () => setIsOpenModal(false);

  function popupModalEdit(id) {
    Axios({
      url: `${userServiceBaseUrl}/menus/${id}`,
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + secureStorage.getItem('access_token'),
      },
    })
      .then((res) => {
        const {
          status,
          data: { name, description },
        } = res.data;
        if (status === 'success') {
          setModalContent({
            name,
            desc: description,
            id,
          });
        }
        setIsOpenModal(true);
        setModalType('edit');
      })
      .catch((err) => console.log(err));
  }

  function delAction(id) {
    Axios({
      url: `${userServiceBaseUrl}/menus/${id}`,
      headers: {
        Authorization: 'Bearer ' + secureStorage.getItem('access_token'),
      },
      method: 'DELETE',
    })
      .then((res) => {
        if (res.data.status === 'success') {
          setCurrentPage(0)
        }
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  }

  const dataTable = datas.map((val) => {
    const date = val.createdDate;
    return {
      menuname: val.name,
      description: val.description,
      createdate: date ? moment(date).format('DD-MM-YYYY') : '-',
      creator: val.createdByFullName,
      action: [
        {
          name: ['Edit', 'Delete'],
          type: ['edit', 'delete'],
          handler: [() => popupModalEdit(val.id), () => delAction(val.id)],
        },
      ],
    };
  });

  const titleTable = ['Menu Name', 'Description', 'Create Date', 'Creator', ''];
  const valueType = ['child', 'child', 'string', 'string', 'menu_twouser'];
  const isSort = [true, false, false, false];

  const handleButton = () => {
    setIsOpenModal(true);
    setModalType('add');
  };

  function handleChangePageValue(newPage) {
    setCurrentPage(newPage);
  }

  function handleSort() {
    return () => setOrderDirection(orderDirection === 'asc' ? 'desc' : 'asc');
  }

  function submitFn(paramObj) {
    const { name, description, type, id } = paramObj;
    setIsModalBtnDisabled(true);
    const isEdit = type === 'edit';
    const path = isEdit && id ? '/' + id : '/create';
    Axios({
      url: `${userServiceBaseUrl}/menus${path}`,
      headers: {
        Authorization: 'Bearer ' + secureStorage.getItem('access_token'),
      },
      method: isEdit ? 'PUT' : 'POST',
      data: {
        name,
        description,
        status: true,
        icon: 'fa-edit',
      },
    })
      .then((res) => {
        if (res.data.status === 'success') {
          setIsOpenModal(false);
          loadMenus();
        }
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      })
      .then(() => setIsModalBtnDisabled(false));
  }

  return (
    <div className={classes.root}>
      <Grid
        container
        justify="space-between"
        className={classes.titleContainer}
        alignItems="center"
      >
        <Grid item>
          <Typography className={classes.title}>Menu Management</Typography>
        </Grid>
        <Grid item>
          <MuiIconLabelButton
            style={{ width: 125, height: 40 }}
            label="Add Menu"
            iconPosition="startIcon"
            onClick={handleButton}
            buttonIcon={<PlusWhite />}
          />
        </Grid>
      </Grid>
      <div className={classes.container}>
        <div className={classes.tableContent}>
          <TablePagination
            data={dataTable}
            fields={titleTable}
            cellOption={valueType}
            isSort={isSort}
            totalPages={Math.ceil(totalRows / rowsPerPage)}
            rowsPerPage={rowsPerPage}
            totalRows={totalRows}
            changePage={handleChangePageValue}
            isUsingMuiSort={true}
            handleSort={handleSort}
            sortBy={'Menu Name'}
            order={orderDirection}
            leftAlignHeaders={[0, 1]}
            isLoadData={isLoading}
          />
        </div>
      </div>
      {/* <FloatingChat /> */}
      <Modal
        isOpen={isOpenModal}
        type={modalType}
        onClose={handleCloseModal}
        submitFn={submitFn}
        disabled={isModalBtnDisabled}
        content={modalContent}
        setIsLoadData={setIsLoading}
      />
    </div>
  );
};

function mapStateToProps() {
  return {};
}

export default withRouter(
  connect(mapStateToProps)(withTranslation('translations')(MenuManagement))
);
