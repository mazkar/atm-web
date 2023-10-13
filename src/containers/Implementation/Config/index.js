import {
  Grid,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  Checkbox,
  IconButton,
  Menu,
  MenuItem,
} from '@material-ui/core';
import React, { useState } from 'react';
import MuiIconLabelButton from '../../../components/Button/MuiIconLabelButton';
import { ReactComponent as Trash } from '../../../assets/icons/linear-red/trash.svg';
import { ReactComponent as Edit } from '../../../assets/icons/linear-red/edit.svg';
import { ReactComponent as Plus } from '../../../assets/icons/linear-red/plus.svg';
import MoreHoriz from '@material-ui/icons/MoreHoriz';
import { withStyles, makeStyles } from '@material-ui/styles';
import { GrayHard, PrimaryHard } from '../../../assets/theme/colors';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Popup from './Popup';
import { useEffect } from 'react';
import axios from 'axios';
import constansts from '../../../helpers/constants';

const useStyles = makeStyles(() => ({
  title: {
    fontWeight: '500',
    fontSize: '36px',
    lineHeight: '43px',
    margin: '75px 0 25px 0',
  },
  paper: {
    height: '100%',
    border: '1px solid #E6EAF3',
    boxShadow: '0px 6px 6px rgba(232, 238, 255, 0.3)',
    borderRadius: '8px',
  },
  cardTitle: {
    fontWeight: '600',
    fontSize: '17px',
    lineHeight: '20px',
    padding: 20,
  },
  delBtn: {
    backgroundColor: 'transparent',
    boxShadow: 'none',
    '& .MuiButton-label': {
      textTransform: 'capitalize',
      fontWeight: '600',
      fontSize: '11px',
      lineHeight: '13px',
      color: PrimaryHard,
    },
    '&:hover': {
      backgroundColor: 'transparent',
      boxShadow: 'none',
    },
  },
  list: {
    padding: 0,
  },
  listItem: {
    padding: '6px 20px',
    '&:hover': {
      backgroundColor: '#FFF5F4',
    },
  },
  listItemSelected: {
    backgroundColor: '#FFF5F4!important',
    '&:hover': {
      backgroundColor: '#FFF5F4!important',
    },
  },
  listItemIcon: {
    minWidth: 0,
    marginRight: 15,
    '& .MuiCheckbox-root': {
      padding: 0,
    },
  },
  addBtn: {
    backgroundColor: 'transparent',
    boxShadow: '0px -6px 6px rgba(232, 238, 255, 0.3)',
    width: '100%',
    padding: 25,
    borderRadius: '0 0 8px 8px',
    '& .MuiButton-label': {
      fontWeight: '600',
      fontSize: '15px',
      lineHeight: '18px',
      textAlign: 'center',
      textTransform: 'capitalize',
      color: PrimaryHard,
    },
    '&:hover': {
      backgroundColor: '#FFF5F4',
      boxShadow: '0px -6px 6px rgba(232, 238, 255, 0.3)',
    },
  },
}));

const checkedIcon = <CheckBoxIcon style={{ color: PrimaryHard }} />;

const index = () => {
  const classes = useStyles();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [pekerjaans, setPekerjaans] = useState([]);
  const [details, setDetails] = useState([]);
  const [activeTypeId, setActiveTypeId] = useState(null);
  const [activeJobId, setActiveJobId] = useState(null);
  const [popupItem, setPopupItem] = useState({});
  const [checkedJobs, setCheckedJobs] = useState([]);
  const [checkedDetails, setCheckedDetails] = useState([]);

  function handleCheckJob(val, checked) {
    // console.log('~ check val, checked', val, checked);
    if (checked) {
      setCheckedJobs([...checkedJobs, val]);
    } else {
      setCheckedJobs(checkedJobs.filter((value) => value.id != val.id));
    }
  }

  function handleCheckDetail(val, checked) {
    // console.log('~ check val', val);
    if (checked) {
      setCheckedDetails([...checkedDetails, val]);
    } else {
      setCheckedDetails(checkedDetails.filter((value) => value.id != val.id));
    }
  }

  function handleEdit(val) {
    // console.log('~ edit val', val);
    setIsPopupOpen(true);
    setPopupItem(val);
  }

  function handleDel(val) {
    // single item
    deleteItem(val)
      .then((res) => {
        if (val.id === activeJobId) {
          setActiveJobId(null);
        }
        fetchConfig();
      })
      .catch((err) => {
        console.log('~ err', err);
      });
  }

  function handleDelJobMulti() {
    Promise.allSettled(checkedJobs.map(deleteItem))
      .then((res) => {
        if (checkedJobs.find((val) => val.id === activeJobId)) {
          setActiveJobId(null);
        }
        fetchConfig();
        setCheckedJobs([]);
      })
      .catch((err) => {
        console.log('~ err', err);
      });
  }

  function handleDelDetailMulti() {
    Promise.allSettled(checkedDetails.map(deleteItem))
      .then((res) => {
        fetchConfig();
        setCheckedDetails([]);
      })
      .catch((err) => {
        console.log('~ err', err);
      });
  }

  function deleteItem(val) {
    return axios.post(`${constansts.IMPLEMENTATION_SERVICE}/deleteConfigAttribute`, {
      id: val.id,
      attributeId: val.attributeId,
    });
  }

  function openAddNamePopup() {
    setIsPopupOpen(true);
    setPopupItem({ status: activeTypeId });
  }

  function openAddDetailPopup() {
    setIsPopupOpen(true);
    setPopupItem({ attributeId: activeJobId });
  }

  function handleClosePopup() {
    setIsPopupOpen(false);
    setPopupItem({});
  }

  function fetchConfig() {
    axios
      .get(`${constansts.IMPLEMENTATION_SERVICE}/getConfigAttribute`)
      .then((res) => {
        // console.log('~ res.data', res.data);
        setPekerjaans(res.data.data.configAttributeList);
        setDetails(res.data.data.configAttributeDetailList);
      })
      .catch((err) => {
        console.log('~ err', err);
      });
  }

  useEffect(() => {
    fetchConfig();
  }, []);

  const Item = ({ val, handleCheck, selected, onClick, checked }) => (
    <ListItem
      classes={{ root: classes.listItem, selected: classes.listItemSelected }}
      button
      selected={selected}
      onClick={onClick}
    >
      <ListItemIcon className={classes.listItemIcon}>
        <Checkbox
          checkedIcon={checkedIcon}
          onClick={(e) => handleCheck(val, e.target.checked)}
          checked={checked}
        />
      </ListItemIcon>
      <CustomListText
        primary={val.name}
        secondary={
          val.countAttributeDetail != null ? `${val.countAttributeDetail} Detail Atribut` : null
        }
      />
      <ListItemSecondaryAction>
        <CustomMenu val={val} />
      </ListItemSecondaryAction>
    </ListItem>
  );

  const CustomMenu = ({ val }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };
    return (
      <>
        <IconButton onClick={handleClick}>
          <MoreHoriz color={PrimaryHard} />
        </IconButton>
        <StyledMenu
          id='customized-menu'
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <StyledMenuItem
            onClick={() => {
              handleEdit(val);
              handleClose();
            }}
          >
            <StyledMenuText primary='Edit' />
            <ListItemSecondaryAction>
              <Edit style={{ width: 16, height: 16 }} />
            </ListItemSecondaryAction>
          </StyledMenuItem>
          <StyledMenuItem
            onClick={() => {
              handleDel(val);
              handleClose();
            }}
          >
            <StyledMenuText primary='Delete' style={{ color: PrimaryHard }} />
            <ListItemSecondaryAction>
              <Trash style={{ width: 16, height: 16 }} />
            </ListItemSecondaryAction>
          </StyledMenuItem>
        </StyledMenu>
      </>
    );
  };
  return (
    <div style={{ padding: 30 }}>
      <Typography className={classes.title}>Configuration</Typography>
      <Grid container spacing={2} style={{ minHeight: 550 }}>
        <Grid item xs={2}>
          <Paper className={classes.paper}>
            <Typography
              style={{
                fontWeight: '600',
                fontSize: '17px',
                lineHeight: '20px',
                padding: 20,
              }}
            >
              Type
            </Typography>
            <List className={classes.list}>
              {types.map((val) => {
                return (
                  <ListItem
                    classes={{ root: classes.listItem, selected: classes.listItemSelected }}
                    button
                    selected={val.id === activeTypeId}
                    onClick={() => {
                      setActiveTypeId(val.id);
                      setActiveJobId(null);
                    }}
                  >
                    <CustomListText
                      primary={val.name}
                      secondary={`${
                        pekerjaans.filter((job) => job.status === val.id).length
                      } Jenis Pekerjaan`}
                    />
                  </ListItem>
                );
              })}
            </List>
          </Paper>
        </Grid>
        {activeTypeId != null && (
          <Grid item xs={5}>
            <Paper className={classes.paper}>
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <Typography className={classes.cardTitle}>Jenis Pekerjaan</Typography>
                  <div>
                    <MuiIconLabelButton
                      label='Hapus'
                      onClick={() => {
                        handleDelJobMulti();
                      }}
                      iconPosition='endIcon'
                      buttonIcon={<Trash style={{ width: 16, height: 16 }} />}
                      className={classes.delBtn}
                    />
                  </div>
                </div>
                <List className={classes.list}>
                  {pekerjaans
                    .filter((job) => job.status === activeTypeId)
                    .map((val) => {
                      return (
                        <Item
                          val={val}
                          selected={activeJobId === val.id}
                          onClick={() => setActiveJobId(val.id)}
                          handleCheck={handleCheckJob}
                          checked={checkedJobs.find((value) => value.id == val.id)}
                        />
                      );
                    })}
                </List>
                <div style={{ marginTop: 'auto' }}>
                  <MuiIconLabelButton
                    label='Tambah Jenis Pekerjaan'
                    onClick={() => {
                      openAddNamePopup();
                    }}
                    iconPosition='endIcon'
                    buttonIcon={<Plus />}
                    className={classes.addBtn}
                  />
                </div>
              </div>
            </Paper>
          </Grid>
        )}
        {activeJobId != null && (
          <Grid item xs={5}>
            <Paper className={classes.paper}>
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <Typography className={classes.cardTitle}>Detail Atribut</Typography>
                  <div>
                    <MuiIconLabelButton
                      label='Hapus'
                      onClick={() => {
                        handleDelDetailMulti();
                      }}
                      iconPosition='endIcon'
                      buttonIcon={<Trash style={{ width: 16, height: 16 }} />}
                      className={classes.delBtn}
                    />
                  </div>
                </div>
                <List className={classes.list}>
                  {details
                    .filter((val) => val.attributeId === activeJobId)
                    .map((val) => {
                      return (
                        <Item
                          val={val}
                          handleCheck={handleCheckDetail}
                          checked={checkedDetails.find((value) => value.id == val.id)}
                        />
                      );
                    })}
                </List>
                <div style={{ marginTop: 'auto' }}>
                  <MuiIconLabelButton
                    label='Tambah Detail'
                    onClick={() => {
                      openAddDetailPopup();
                    }}
                    iconPosition='endIcon'
                    buttonIcon={<Plus />}
                    className={classes.addBtn}
                  />
                </div>
              </div>
            </Paper>
          </Grid>
        )}
      </Grid>
      {isPopupOpen && (
        <Popup
          isOpen={isPopupOpen}
          item={popupItem}
          onClose={handleClosePopup}
          reloadList={fetchConfig}
        />
      )}
    </div>
  );
};

export default index;

const types = [
  {
    name: 'Atribut',
    id: 1,
  },
  {
    name: 'Non Atribut',
    id: 0,
  },
];

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:hover': {
      backgroundColor: '#FFF5F4',
    },
  },
}))(MenuItem);

const StyledMenuText = withStyles((theme) => ({
  primary: {
    fontWeight: '500',
    fontSize: '13px',
    lineHeight: '16px',
  },
}))(ListItemText);

const CustomListText = withStyles((theme) => ({
  root: {
    margin: 0,
  },
  primary: {
    fontWeight: '600',
    fontSize: '12px',
    lineHeight: '14px',
  },
  secondary: {
    fontSize: '12px',
    lineHeight: '14px',
    color: GrayHard,
  },
}))(ListItemText);
