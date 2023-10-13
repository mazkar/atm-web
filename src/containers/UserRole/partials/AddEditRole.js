import React, { useState, Fragment, useEffect, useContext } from 'react';
import {
  Grid,
  Typography,
  Paper,
  Checkbox,
  FormControlLabel,
  Divider,
  Button,
  Menu,
  MenuItem,
} from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Input } from 'antd';
import Axios from 'axios';

import MuiIconLabelButton from '../../../components/Button/MuiIconLabelButton';
import FloatingChat from '../../../components/GeneralComponent/FloatingChat';
import { ReactComponent as ArrowLeft } from '../../../assets/icons/siab/arrow-left.svg';
import constants from '../../../helpers/constants';
import { ReactComponent as DropDownIcon } from '../../../assets/icons/general/dropdown_red.svg';
import secureStorage from '../../../helpers/secureStorage';
import {
  getMenus,
  getUsers,
  useMenuArr,
} from '../../../helpers/userManagement';
import ModalLoader from '../../../components/ModalLoader';
import { GrayUltrasoft } from '../../../assets/theme/colors';
import { RootContext } from '../../../router';
import LoadingView from '../../../components/Loading/LoadingView';

const useStyles = makeStyles({
  root: {
    backgroundColor: GrayUltrasoft,
    padding: '10px 20px 10px 20px',
    '& .MuiBox-root': {
      padding: 0,
    },
  },
  backButton: {
    '& .MuiButton-contained': {
      boxShadow: 'none',
      backgroundColor: 'transparent',
      color: 'red',
    },
    '& .MuiButton-root': {
      textTransform: 'capitalize',
      '& :hover': {
        backgroundColor: '#F4F7FB',
      },
    },
  },
  titleContainer: {
    marginBottom: 0,
  },
  title: {
    margin: 10,
    fontFamily: 'Barlow',
    fontWeight: '500',
    fontSize: '36px',
    color: constants.color.dark,
  },
  WrapperContent: {
    padding: '0px 10px',
  },
  paper: {
    height: '100%',
    boxShadow: '0px 6px 6px rgba(232, 238, 255, 0.3)',
    borderRadius: '10px',
    padding: '20px 20px',
  },
  titleContent: {
    fontFamily: 'Barlow',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '24px',
    color: constants.color.dark,
    textShadow: '0px 6px 10px rgba(0, 0, 0, 0.08)',
  },
  inputForm: {
    width: '100%',
    height: 40,
    borderRadius: 8,
    border: '1px solid #BCC8E7',
    fontSize: 16,
    backgroundColor: '#FFFFFF',
  },
  removeUser: {
    cursor: 'pointer',
  },
  removeUserLabel: {
    fontSize: '13px',
    fontWeight: 400,
    lineHeight: '16px',
    color: '#DC241F',
    textTransform: 'capitalize',
  },
  hitamGelap: {
    fontWeight: 600,
    fontFamily: 'Barlow',
    fontSize: 15,
  },
  hitamTipis: {
    fontWeight: 'normal',
    fontFamily: 'Barlow',
    fontSize: 15,
  },
  buttonContainer: {
    marginTop: 25,
    marginBottom: 50,
  },
  primaryButton: {
    color: constants.color.white,
    backgroundColor: constants.color.primaryHard,
    padding: '14px 36px',
    borderRadius: 10,
    width: 72,
    height: 40,
    marginRight: 10,
  },
  secondaryButton: {
    color: constants.color.primaryHard,
    backgroundColor: constants.color.white,
    padding: '14px 36px',
    borderRadius: 10,
    border: '1px solid',
    borderColor: `${constants.color.primaryHard}`,
    width: 115,
    height: 40,
    marginLeft: 10,
  },
  menuModal: {
    fontSize: 13,
    '&:hover': {
      color: '#DC241F',
    },
  },
});

const RedCheckbox = withStyles({
  root: {
    color: '#E6EAF3',
    '&$checked': {
      color: '#DC241F',
    },
  },
  checked: {},
})((props) => <Checkbox {...props} />);

const AddEditRole = ({ type }) => {
  const classes = useStyles();
  const history = useHistory();
  const { roleId } = useParams();
  const { userServiceBaseUrl } = constants;
  const { userId } = useContext(RootContext);

  const isEdit = type === 'edit';

  const [users, setUsers] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [role, setRole] = useState({});
  const [menus, setMenus] = useState([]);
  const [menuValues, setMenuValues] = useState([]);
  const [selectedDropdownIndex, setSelectedDropdownIndex] = useState();
  const [roleName, setRoleName] = useState('');
  const [isOpenModalLoader, setIsOpenModalLoader] = useState(false);
  const [modalLoaderContent, setModalLoaderContent] = useState('');
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(true)

  function goBack() {
    history.push('/user-management/user-role/');
  }

  useEffect(() => {
    if (isEdit && !roleId) {
      goBack();
    }
  }, [roleId, type]);

  useEffect(() => {
    const defaultPromises = [getMenus()];
    const promises = isEdit
      ? [...defaultPromises, getUsersByRole(), getRole()]
      : defaultPromises;
    Promise.all(promises)
      .then((values) => {
        setIsOpenModalLoader(false);
        setIsLoading(false)
        const [menusRes, usersRes, roleRes] = values;
        if (isEdit) {
          handleRoleRes(roleRes);
          handleUsersRes(usersRes);
        }
        handleMenuRes(menusRes);
      })
      .catch((err) => {
        console.log(err);
        setModalLoaderContent('ERROR LOADING CONTENT');
      });
  }, []);

  function getRole() {
    const url = `${userServiceBaseUrl}/roles/${roleId}`;
    return Axios({
      method: 'GET',
      url,
      headers: {
        Authorization: 'Bearer ' + secureStorage.getItem('access_token'),
      },
    });
  }

  function handleRoleRes(res) {
    if (res.data.status === 'success') {
      setRole(res.data.data);
      setRoleName(res.data.data.name);
    }
  }

  function handleMenuRes(res) {
    if (res.data.status === 'success') {
      setMenus(res.data.data);
    }
  }

  function getUsersByRole() {
    return getUsers({ roleId });
  }

  function handleUsersRes(res) {
    if (res.data.status === 'success') {
      setUsers(res.data.data.users);
    }
  }

  function reloadUsers() {
    getUsersByRole()
      .then(handleUsersRes)
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    const mappedValues = menus.map((val) => {
      const { getUserAccess } = useMenuArr(role.menus);
      return getUserAccess(val.id);
    });
    setMenuValues(mappedValues);
  }, [menus, role]);

  const dummyData = menus.map((val, i) => {
    const access = menuValues[i];
    const accessLabel =
      access === READ ? 'View Only' : access === EDIT ? 'Can Edit' : null;
    return {
      name: val.name,
      access: accessLabel,
      userAccess: access,
      id: val.id,
    };
  });

  const dummyUser = users.map((val) => {
    return {
      name: val.fullName,
      id: val.id,
    };
  });

  const handleCheck = (index, event) => {
    const { checked } = event.target;
    let newValues = [...menuValues];
    newValues[index] = checked ? READ : null;
    setMenuValues(newValues);
  };

  const handleClickDropdown = (event, index) => {
    setSelectedDropdownIndex(index);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedDropdownIndex();
  };

  const handleClickOption = (value) => {
    let newValues = [...menuValues];
    newValues[selectedDropdownIndex] = value;
    setMenuValues(newValues);
    handleClose();
  };

  function handleChangeRoleName(e) {
    setRoleName(e.target.value);
  }

  function handleSave() {
    if (roleId || !isEdit) {
      setIsBtnDisabled(true);
      const desc = role.description;
      Axios({
        method: isEdit ? 'PUT' : 'POST',
        headers: {
          Authorization: 'Bearer ' + secureStorage.getItem('access_token'),
        },
        url: `${userServiceBaseUrl}/roles/${isEdit ? roleId : 'create'}`,
        data: {
          name: roleName,
          description: desc ? desc : '',
          menus: dummyData
            .filter((val) => val.userAccess === READ || val.userAccess === EDIT)
            .map(({ id, userAccess }) => {
              return {
                menuId: id,
                userAccess,
              };
            }),
        },
      })
        .then((res) => {
          if (res.data.status === 'success') {
            // goBack();
            window.location.href='/user-management/user-role/';
          }
        })
        .catch((err) => {
          console.log(err);
          setIsBtnDisabled(false);
          alert(err);
        });
    }
  }

  function removeUser(id) {
    Axios({
      method: 'PUT',
      headers: {
        Authorization: 'Bearer ' + secureStorage.getItem('access_token'),
      },
      url: `${userServiceBaseUrl}/users/remove-access/${id}?removedBy=${userId}`,
    })
      .then((res) => {
        if (res.data.status === 'success') {
          reloadUsers();
        }
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  }

  return (
    <div className={classes.root}>
      <Grid container direction="column">
        <Grid item>
          <div className={classes.backButton}>
            <MuiIconLabelButton
              label="Back"
              iconPosition="startIcon"
              onClick={() => goBack()}
              buttonIcon={<ArrowLeft />}
              disabled={isBtnDisabled}
            />
          </div>
        </Grid>
        <div className={classes.container}>
          <Grid className={classes.titleContainer}>
            <Grid item>
              <Typography className={classes.title}>
                {isEdit ? 'Edit' : 'Add'} User Role
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2} className={classes.WrapperContent}>
            <Grid item xs={4}>
              {isLoading ?
                <LoadingView maxheight={'100%'} height={'70px'} width={'70px'} />
                :
                <Paper className={classes.paper}>
                  <Grid item>
                    <Typography className={classes.titleContent}>
                      Role Detail
                  </Typography>
                  </Grid>
                  <Grid item style={{ marginTop: '20px' }}>
                    <Grid item>
                      <Typography
                        style={{
                          color: '#000000',
                          fontFamily: 'Barlow',
                          fontStyle: 'normal',
                          fontWeight: 'normal',
                          fontSize: 15,
                        }}
                      >
                        Role Name :
                    </Typography>
                    </Grid>
                    <Grid item style={{ marginTop: '5px' }}>
                      <Input
                        className={classes.inputForm}
                        value={roleName}
                        onChange={handleChangeRoleName}
                      />
                    </Grid>
                    <Grid container spacing={2} style={{ marginTop: '20px' }}>
                      <Grid item xs={8}>
                        <Typography
                          style={{
                            color: '#000000',
                            fontFamily: 'Barlow',
                            fontStyle: 'normal',
                            fontWeight: 'normal',
                            fontSize: 15,
                          }}
                        >
                          Total User :
                      </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography align="right">
                          <b>{dummyUser.length} User</b>
                        </Typography>
                      </Grid>
                    </Grid>
                    <Divider
                      style={{
                        marginTop: '10px',
                        background: '#BCC8E7',
                        height: '1px',
                      }}
                    />
                    {dummyUser.map((d, i) => {
                      return (
                        <Grid
                          container
                          spacing={2}
                          alignItems="center"
                          style={{ marginTop: '10px' }}
                          key={i}
                        >
                          <Grid item xs={6}>
                            <Typography
                              style={{
                                fontFamily: 'Barlow',
                                fontSize: '13px',
                                fontWeight: 'normal',
                                fontStyle: 'normal',
                                lineHeight: '16px',
                              }}
                            >
                              {d.name}
                            </Typography>
                          </Grid>
                          <Grid item xs={6} style={{ textAlign: 'right' }}>
                            <Button
                              onClick={() => removeUser(d.id)}
                              align="right"
                              classes={{
                                root: classes.removeUser,
                                label: classes.removeUserLabel,
                              }}
                            >
                              Remove Access
                          </Button>
                          </Grid>
                        </Grid>
                      );
                    })}
                  </Grid>
                </Paper>
              }
            </Grid>
            <Grid item xs={8}>
              {isLoading ?
                <LoadingView maxheight={'100%'} height={'70px'} width={'70px'} />
                :
                <Paper className={classes.paper}>
                  <Grid container spacing={2}>
                    <Grid item xs={8}>
                      <Typography className={classes.titleContent}>
                        Menu
                    </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography align="right" className={classes.titleContent}>
                        User Access
                    </Typography>
                    </Grid>
                  </Grid>
                  <div>
                    {dummyData.map((d, i) => {
                      return (
                        <Fragment key={i}>
                          <Grid container spacing={4} alignItems="center">
                            <Grid item xs={8}>
                              <FormControlLabel
                                control={
                                  <RedCheckbox
                                    checked={d.access ? true : false}
                                    name={d.name}
                                    color="default"
                                    onChange={(e) => handleCheck(i, e)}
                                  />
                                }
                                style={{
                                  padding: '4px 0',
                                }}
                                label={
                                  <Typography
                                    className={
                                      d.access
                                        ? classes.hitamGelap
                                        : classes.hitamTipis
                                    }
                                  >
                                    {d.name}
                                  </Typography>
                                }
                              />
                            </Grid>
                            <Grid
                              item
                              xs={4}
                              style={{
                                textAlign: 'right',
                              }}
                            >
                              <Button
                                onClick={(e) => {
                                  if (d.access) {
                                    handleClickDropdown(e, i);
                                  }
                                }}
                              >
                                <Typography
                                  align="right"
                                  style={{
                                    color: d.access ? '#DC241F' : '#BCC8E7',
                                    fontSize: '15px',
                                    lineHeight: '18px',
                                    textTransform: 'capitalize',
                                    fontWeight: 500,
                                  }}
                                >
                                  {d.access ? d.access : 'None'}
                                </Typography>
                                {'  '}
                                <DropDownIcon style={{ height: 20, width: 20 }} />
                              </Button>
                              <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                                PaperProps={{
                                  style: {
                                    maxHeight: 48 * 4.5,
                                    width: '20ch',
                                    boxShadow:
                                      '0px 6px 6px rgba(232, 238, 255, 0.3)',
                                  },
                                }}
                              >
                                {options.map(({ label, value }, j) => {
                                  return (
                                    <MenuItem
                                      key={j}
                                      onClick={() => handleClickOption(value)}
                                      className={classes.menuModal}
                                    >
                                      {label}
                                    </MenuItem>
                                  );
                                })}
                              </Menu>
                            </Grid>
                          </Grid>
                          <Divider />
                        </Fragment>
                      );
                    })}
                  </div>
                </Paper>
              }
            </Grid>
          </Grid>
          <Grid
            container
            justify="space-between"
            className={classes.buttonContainer}
          >
            <Grid item>
              <Button
                variant="outlined"
                disableElevation
                disabled={isBtnDisabled}
                className={classes.secondaryButton}
                onClick={() => goBack()}
                style={{ textTransform: 'capitalize' }}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                disableElevation
                disabled={isBtnDisabled}
                className={classes.primaryButton}
                onClick={handleSave}
                style={{ textTransform: 'capitalize' }}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </div>
      </Grid>
      <ModalLoader isOpen={isOpenModalLoader} content={modalLoaderContent} />
      {/* <FloatingChat /> */}
    </div>
  );
};

export default AddEditRole;

const READ = 'CAN_READ';
const EDIT = 'CAN_EDIT';

const options = [
  {
    label: 'View Only',
    value: READ,
  },
  {
    label: 'Can Edit',
    value: EDIT,
  },
  {
    label: 'None',
  },
];
