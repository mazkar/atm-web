import React, { useState, useEffect } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Axios from 'axios';

import FloatingChat from '../../components/GeneralComponent/FloatingChat';
import MuiIconLabelButton from '../../components/Button/MuiIconLabelButton';
import secureStorage from '../../helpers/secureStorage';
import constants from '../../helpers/constants';
import TablePagination from '../../components/chky/ChkyTablePagination';
import { ReactComponent as PlusWhite } from '../../assets/icons/siab/plus-white.svg';
import { getMenus, getRoles, useMenuArr } from '../../helpers/userManagement';
import { Status } from '../../components/TabelCellOptions';
import {
  GrayHard,
  GrayUltrasoft,
  InfoMedium,
  InfoSoft,
  PrimaryHard,
  SuccessMedium,
  SuccessSoft,
} from '../../assets/theme/colors';

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
  primaryButton: {
    color: constants.color.white,
    backgroundColor: constants.color.primaryHard,
    padding: '10px 30px',
    borderRadius: 6,
    fontWeight: '600',
    fontSize: '15px',
    lineHeight: '18px',
  },
  secondaryButton: {
    color: constants.color.primaryHard,
    backgroundColor: constants.color.white,
    padding: '10px 30px',
    borderRadius: 6,
    border: '1px solid',
    borderColor: `${constants.color.primaryHard}`,
    fontWeight: '600',
    fontSize: '17px',
    lineHeight: '20px',
  },
});

const UserRole = () => {
  const classes = useStyles();
  const history = useHistory();
  const { userServiceBaseUrl } = constants;
  const [totalPages, setTotalPages] = useState(0); // <--- init default totalPages
  const [totalRows, setTotalRows] = useState(0); // <--- init default totalRows
  const [currentPage, setCurrentPage] = useState(0); // <--- init default currentPage
  const [datas, setDatas] = useState([]);
  const [menus, setMenus] = useState([]);
  const [orderDirection, setOrderDirection] = useState('asc');
  const [delCandidateRoleId, setDelCandidateRoleId] = useState();
  const [isModalBtnDisabled, setIsModalBtnDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(true)

  const rowsPerPage = 10; // <--- init default rowsPerPage

  useEffect(() => {
    Promise.all([getTheRoles(), getMenus()])
      .then((values) => {
        const [rolesRes, menusRes] = values;
        handleRolesRes(rolesRes);
        handleMenuRes(menusRes);
      })
      .catch((err) => {
        console.log(err);
      })
      .then(() => {
        setIsLoading(false);
      });
  }, [orderDirection, currentPage]);

  function getTheRoles() {
    return getRoles({ orderDirection, ordersBy: 'name', currentPage });
  }

  function handleRolesRes(res) {
    if (res.data.status === 'success') {
      const { totalRecord } = res.data.data;
      setDatas(res.data.data.roles);
      setTotalPages(Math.ceil(totalRecord / rowsPerPage));
      setTotalRows(totalRecord);
      setIsLoading(false)
    }
  }

  function handleMenuRes(res) {
    if (res.data.status === 'success') {
      setMenus(res.data.data);
    }
  }

  function reloadRoles() {
    getTheRoles()
      .then(handleRolesRes)
      .catch((err) => console.log(err))
      .then(() => setIsLoading(false));
  }

  function goEdit(id) {
    history.push('/user-management/user-role/edit/' + id);
  }

  function goDelete(id) {
    if (id) {
      setIsModalBtnDisabled(true);
      Axios({
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + secureStorage.getItem('access_token'),
        },
        url: `${userServiceBaseUrl}/roles/${id}`,
      })
        .then((res) => {
          if (res.data.status === 'success') {
            reloadRoles();
            setDelCandidateRoleId();
          }
        })
        .catch((err) => {
          console.log(err);
          alert(err);
        })
        .then(() => setIsModalBtnDisabled(false));
    }
  }

  const dataTable = datas.map((role) => {
    const { name } = role;
    const roleMenus = role?.menus;
    const { getUserAccess } = useMenuArr(roleMenus);
    function getVal(id) {
      const nilai = getUserAccess(id);
      let statusProps = {};
      switch (nilai) {
        case 'CAN_READ':
          statusProps = {
            value: 'View Only',
            borderColor: InfoMedium,
            textColor: InfoMedium,
            fillColor: InfoSoft,
          };
          break;
        case 'CAN_EDIT':
          statusProps = {
            value: 'Edit',
            borderColor: SuccessMedium,
            textColor: SuccessMedium,
            fillColor: SuccessSoft,
          };
          break;
        default:
          statusProps = {
            value: 'None',
            borderColor: GrayHard,
            textColor: GrayHard,
            fillColor: GrayUltrasoft,
          };
          break;
      }
      return <Status {...statusProps} />;
    }
    const menuObj = menus.reduce((prev, cur) => {
      return { ...prev, ['menu' + cur.id]: getVal(cur.id) };
    }, {});
    return {
      userrole: <div style={{ whiteSpace: 'nowrap' }}>{name}</div>,
      ...menuObj,
      action: [
        {
          name: ['Edit', 'Delete'],
          type: ['edit', 'delete'],
          handler: [() => goEdit(role.id), () => openDialog(role.id)],
        },
      ],
    };
  });

  const menusArr = menus.map(({ name }) => name);

  const titleTable = ['User Role', ...menusArr, ''];

  const childVal = menus.map(() => 'child');

  const valueType = ['child', ...childVal, 'menu_tworole'];

  const isSortVal = menus.map(() => false);

  const isSort = [true, ...isSortVal, false];

  const handleButton = () => {
    history.push('/user-management/user-role/add');
  };

  function handleChangePageValue(newPage) {
    setCurrentPage(newPage);
  }

  function handleSort() {
    return () => setOrderDirection(orderDirection === 'asc' ? 'desc' : 'asc');
  }

  function openDialog(id) {
    setDelCandidateRoleId(id);
  }

  function handleCloseDialog() {
    setDelCandidateRoleId();
  }

  function handleConfirmDelete(e) {
    goDelete(delCandidateRoleId);
  }

  const delCandidate = datas.find(({ id }) => id === delCandidateRoleId);

  return (
    <div className={classes.root}>
      <Grid
        container
        justify="space-between"
        className={classes.titleContainer}
        alignItems="center"
      >
        <Grid item>
          <Typography className={classes.title}>User Role</Typography>
        </Grid>
        <Grid item>
          <MuiIconLabelButton
            style={{ width: 156, height: 40 }}
            label="New User Role"
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
            totalPages={totalPages}
            rowsPerPage={rowsPerPage}
            totalRows={totalRows}
            changePage={handleChangePageValue}
            isUsingMuiSort={true}
            handleSort={handleSort}
            sortBy={'User Role'}
            order={orderDirection}
            firstColumnLeft
            giveHeaderGap
            isLoadData={isLoading}
          />
        </div>
      </div>
      <Dialog open={delCandidateRoleId ? true : false} fullWidth>
        <MuiDialogTitle style={{ position: 'relative', padding: 26 }}>
          <IconButton
            style={{ position: 'absolute', right: 0, top: 0 }}
            onClick={handleCloseDialog}
            disabled={isModalBtnDisabled}
          >
            <CloseIcon style={{ color: PrimaryHard }} />
          </IconButton>
        </MuiDialogTitle>
        <MuiDialogContent style={{ textAlign: 'center', marginBottom: 20 }}>
          <Typography
            style={{
              fontWeight: '500',
              fontSize: '36px',
              lineHeight: '43px',
              marginBottom: 30,
            }}
          >
            Delete
          </Typography>
          <Typography style={{ fontSize: '17px', lineHeight: '24px' }}>
            Are you sure want to delete user role
          </Typography>
          <Typography
            style={{ fontSize: '17px', lineHeight: '24px', fontWeight: 'bold' }}
          >
            [{delCandidate?.name}]
          </Typography>
        </MuiDialogContent>
        <MuiDialogActions
          style={{ justifyContent: 'space-between', padding: 30 }}
        >
          <Button
            variant="outlined"
            disableElevation
            className={classes.secondaryButton}
            style={{ textTransform: 'capitalize' }}
            onClick={handleCloseDialog}
            disabled={isModalBtnDisabled}
          >
            Cancel
          </Button>
          <Button
            disableElevation
            className={classes.primaryButton}
            style={{ textTransform: 'capitalize' }}
            variant="contained"
            onClick={handleConfirmDelete}
            disabled={isModalBtnDisabled}
          >
            Confirm
          </Button>
        </MuiDialogActions>
      </Dialog>
      {/* <FloatingChat /> */}
    </div>
  );
};

function mapStateToProps() {
  return {};
}

export default withRouter(
  connect(mapStateToProps)(withTranslation('translations')(UserRole))
);
