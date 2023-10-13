/* eslint-disable react/no-array-index-key */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Typography, MenuItem, Menu } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ReactComponent as TrashIcon } from "../../../../assets/images/trash.svg";
import { ReactComponent as EditIcon } from "../../../../assets/images/edit.svg";
import { ReactComponent as ArrowRight } from "../../../../assets/icons/siab/arrow-right.svg";

const useStyles = makeStyles({
  menuMoreItem: {
    fontSize: 13,
    justifyContent: 'space-between',
    display: 'flex',
    "&:hover": {
      color: '#DC241F'
    },
  },
});

const MenuEdit=(props)=> {
  const classes = useStyles();
  const {value} = props;
  const obj = value;
  // console.log("===> MENU MORE OBJ" + JSON.stringify(obj));
  // const actionObject = obj[Object.keys(obj)[0]];
  const actionObject = obj;

  const ITEM_HEIGHT = 48;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function renderIconMenu(type) {
    if (type === 'edit') {
      return <EditIcon height={16} width={16} />;
    } if (type === 'delete') {
      return <TrashIcon height={16} width={16} />;
    } 
    return <ArrowRight height={16} width={16} />;
    
  }

  return (
    <div>
      <Typography style={{ fontSize: 13, color: '#DC241F', cursor: 'pointer' }} onClick={handleClick}>Edit</Typography>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        {actionObject.map((item, i) => {
          return (
            <MenuItem key={i} onClick={() => { item.handler[0](item.id); }} className={classes.menuMoreItem} >
              <Typography style={{ fontSize: 13, fontWeight: 600 }}>{item.name[0]}</Typography>
              <div>{renderIconMenu(item.type[0])}</div>
            </MenuItem>
          );
        })}
        {actionObject.map((item, i) => {
          return (
            <MenuItem key={i} onClick={() => { 
              if(window.confirm('Are You Sure to Delete this item?')){
                item.handler[1](item.id); }
            }} className={classes.menuMoreItem} >
              <Typography style={{ fontSize: 13, fontWeight: 600 }}>{item.name[1]}</Typography>
              <div>{renderIconMenu(item.type[1])}</div>
            </MenuItem>
          );
        })}
      </Menu>

    </div>
  );
};

MenuEdit.propTypes = {
  value: PropTypes.object.isRequired,
};

export default MenuEdit;

