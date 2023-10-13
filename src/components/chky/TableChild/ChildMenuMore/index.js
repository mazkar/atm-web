/* eslint-disable no-unused-expressions */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { ReactComponent as TrashIcon } from "../../../../assets/images/trash.svg";
import { ReactComponent as EditIcon } from "../../../../assets/images/edit.svg";
import { ReactComponent as EyeIcon } from "../../../../assets/images/eye.svg";
import { ReactComponent as ApprIcon } from "../../../../assets/images/check.svg";
import { ReactComponent as RegenIcon } from "../../../../assets/images/refresh.svg";
import { ReactComponent as DeclineIcon } from "../../../../assets/images/xclose.svg";
import { ReactComponent as ArrowRight } from "../../../../assets/icons/siab/arrow-right.svg";
import { ReactComponent as Remark } from "../../../../assets/images/edit2.svg";

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

const ChildMenuMore = (props) => {
  const classes = useStyles();
  const { value, textLink, padding = 12 } = props;
  // console.log(`===> MENU MORE OBJ${  JSON.stringify(value)}`);
  const actionObject = value;

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
    if (type === 'view') {
      return <EyeIcon height={16} width={16} />;
    } if (type === 'edit') {
      return <EditIcon height={16} width={16} />;
    } if (type === 'delete') {
      return <TrashIcon height={16} width={16} />;
    } if (type === 'approve') {
      return <ApprIcon height={16} width={16} />;
    } if (type === 'renegotiation') {
      return <RegenIcon height={16} width={16} />;
    } if (type === 'decline') {
      return <DeclineIcon height={16} width={16} />;
    } if (type === 'next'){
      return <ArrowRight height={16} width={16} />;
    } if (type === 'remark'){
      return <Remark height={16} width={16} />;
    }
    return <EyeIcon height={16} width={16} />;
  }

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
        style={{padding}}
      >
        {textLink? (
          <Typography style={{color: "#DC241F", fontSize: 13}}>Action</Typography>
        ): (
          <MoreHorizIcon style={{ color: '#DC241F' }} />
        )}
      </IconButton>
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
        {actionObject.map((item) => {
          return (
            <MenuItem onClick={item.handler} className={classes.menuMoreItem} >
              <Typography style={{ fontSize: 13, }}>{item.name}</Typography>
              <div>{renderIconMenu(item.type)}</div>
            </MenuItem>

          );
        })}

      </Menu>

    </div>
  );
};

ChildMenuMore.propTypes = {
  value: PropTypes.object.isRequired,
  textLink: PropTypes.object.isRequired,
  padding: PropTypes.number.isRequired
};

export default ChildMenuMore;

