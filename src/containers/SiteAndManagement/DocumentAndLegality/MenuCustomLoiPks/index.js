/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from "@material-ui/core/styles";
import { MenuItem, Typography, Menu, Link } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { ReactComponent as ArrowRight } from "../../../../assets/icons/siab/arrow-right.svg";
import { ReactComponent as Edit2 } from "../../../../assets/icons/siab/edit-2.svg";
import { ReactComponent as File } from "../../../../assets/icons/siab/file-text.svg";
import { ReactComponent as EditIcon } from "../../../../assets/images/edit.svg";
import { ReactComponent as ApprIcon } from "../../../../assets/images/check.svg";
import { ReactComponent as Eye } from "../../../../assets/icons/siab/eye-red.svg";
import { ReactComponent as TrashIcon } from "../../../../assets/icons/linear-red/trash-2.svg";

const useStyles = makeStyles({
  value: {
    fontSize: 13,
  },
  menuMoreItem: {
    fontSize: 13,
    justifyContent: "space-between",
    display: "flex",
    "&:hover": {
      color: "#DC241F",
    },
  },
  linkItem: {
    color: '#313542',  
    fontSize: 13,
    "&:hover": { color: "#DC241F" }, 
  },
  linkDuo:{
    color: '#313542',  
    fontSize: 13,
    "&:hover": { 
      color: "#DC241F",
      textDecoration: 'none',  },
  }
});

function MenuCustomLoiPks(props) {
  const classes = useStyles();
  const {menuItems, remarkCount} = props;

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
    if (type === "detail") {
      return <ArrowRight height={16} width={16} />;
    } if (type === "edit") {
      return <EditIcon height={16} width={16} />;
    } if (type === "acknowledge") {
      return <ApprIcon height={16} width={16} />;
    } if (type === "create") {
      return <Edit2 height={16} width={16} />;
    } if (type === "file") {
      return <File height={16} width={16} />;
    } if (type === "eye") {
      return <Eye height={16} width={16} />;
    }
    return <ArrowRight height={16} width={16} />;
    
  }

  return (
    <div>
      <Typography
        style={{
          fontSize: 13,
          color: "#DC241F",
          textAlign: "center",
          cursor: "pointer",
        }}
        onClick={handleClick}
      >
          Action 
        <span style={{paddingLeft: 20, paddingRight: 20, color: "#BCC8E7"}}>|</span>
        <span 
          style={{
            color: 'red',
            fontWeight: 600,
            fontSize: 13,}}>
          {remarkCount}
        </span>
      </Typography>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "30ch",
          },
        }}
      >
        {menuItems.map((item, i) => {
          if(item.isDownload){
            // console.log("+++ item.isSigned", item.isSigned);
            return (
              <MenuItem
                className={classes.menuMoreItem}>
                {item.isSigned?(
                  <Tooltip title="Signed">
                    <CheckCircleOutlineIcon fontSize="small" style={{color: "#65D170"}}/>
                  </Tooltip>
                ):(
                  <Tooltip title="Not Signed">
                    <RadioButtonUncheckedIcon fontSize="small" style={{color: "#FFC062"}}/>
                  </Tooltip>
                )}
                <Tooltip title="Download file">
                  <Link onClick={() => {
                    item.handler();
                  }}
                  className={classes.linkItem}
                  style={{textDecoration:"none"}}>
                    {item.name}
                  </Link>
                </Tooltip>
                <div>
                  <Tooltip title="Delete file"><TrashIcon height={16} width={16} onClick={() => {
                    item.handlerIcon();
                  }}/></Tooltip>
                </div>
              </MenuItem>
            );
          }
          if(item.isDoubleAction){
            return (
              <MenuItem
                className={classes.menuMoreItem}
              >
                <Link 
                  onClick={() => {
                    item.handler();
                  }}
                  className={classes.linkDuo}>
                  {item.name}
                </Link>
                <Typography>|</Typography>
                <Link 
                  onClick={() => {
                    item.handlerSecond();
                  }}
                  className={classes.linkDuo}>
                  {item.nameSecond}
                </Link>
                <div>{renderIconMenu(item.type)}</div>
              </MenuItem>
            );
          }
          return (
            <MenuItem
              onClick={() => {
                item.handler();
              }}
              className={classes.menuMoreItem}
            >
              <Typography style={{ fontSize: 13 }}>{item.name}</Typography>
              <div>{renderIconMenu(item.type)}</div>
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
}

MenuCustomLoiPks.propTypes = {
  menuItems: PropTypes.object,
  remarkCount: PropTypes.number,
};
MenuCustomLoiPks.defaultProps = {
  menuItems: [],
  remarkCount: 0,
};
export default MenuCustomLoiPks;