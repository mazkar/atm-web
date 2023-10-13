/* eslint-disable react/prop-types */
/* eslint-disable no-console */
/* eslint-disable no-use-before-define */
import React from 'react';
import { alpha, makeStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import ButtonBase from '@material-ui/core/ButtonBase';
import { Avatar } from '@material-ui/core';
import { getInitialName, numberFromText, todoListColors } from '../../../helpers/todoList';
import { ReactComponent as UserIcon } from "../../../assets/icons/general/user.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 221,
    fontSize: 13,
  },
  popper: {
    border: '1px solid rgba(27,31,35,.15)',
    boxShadow: '0 3px 12px rgba(27,31,35,.15)',
    borderRadius: 3,
    maxWidth: 300,
    zIndex: 1,
    fontSize: 13,
    color: '#586069',
    backgroundColor: theme.palette.common.white,
    padding: 10
  },
  option: {
    minHeight: 'auto',
    alignItems: 'center',
    padding: 8,
    display: "flex",
    '&[aria-selected="true"]': {
      backgroundColor: 'transparent',
    },
    '&[data-focus="true"]': {
      backgroundColor: theme.palette.action.hover,
    },
  },
  text: {
    flexGrow: 1,
    fontSize: 13,
    fontWeight: 400,
  },
  avatarContainer: {
    display: "flex", 
    flexDirection: "row",
    paddingLeft: 15
  },
}));

export default function UsersAssigned({value=[]}) {

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'github-label' : undefined;
  
  return (
    <>
      <div className={classes.root}>
        <div className={classes.avatarContainer}>
          {value.map((item, index) => {
            if(index > 4){
              return (
                <Avatar style={{backgroundColor: "#ffe9e8", color: "#db241f", fontSize: 15, marginLeft: -10}}>+{value.length-5}</Avatar>
              );
            }
            const initialName = getInitialName(item);
            const backgroundColorRand = todoListColors[numberFromText(initialName) % todoListColors.length];
            return (
              <Avatar style={{backgroundColor: backgroundColorRand, marginLeft: -10}}>{initialName}</Avatar>
            );}
          )}
          <ButtonBase 
            style={{position: "relative", marginLeft: -10}} 
            disableRipple
            aria-describedby={id}
            onClick={handleClick}
          >
            <Avatar style={{backgroundColor: "#FFFFFF", border: "1px solid #BCC8E7"}}>
              <UserIcon/>
            </Avatar>
          </ButtonBase>
        </div>
      </div>

      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
        placement="bottom-start"
        className={classes.popper}
      >
        {value.map((item)=>{
          const initialName = getInitialName(item);
          const backgroundColorRand = todoListColors[numberFromText(initialName) % todoListColors.length];
          return(
            <div className={classes.option}>
              <div style={{position: 'relative', marginRight: 5, marginLeft: -2,}}>
                <Avatar style={{width: 30, height: 30, backgroundColor: backgroundColorRand, fontSize: 13}}>
                  {initialName}
                </Avatar>
              </div>
              <div className={classes.text}>
                {item}
              </div>
            </div>
          );
        })}
      </Popper>
    </>
  );
}