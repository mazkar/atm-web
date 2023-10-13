/* eslint-disable react/prop-types */
/* eslint-disable no-console */
/* eslint-disable no-use-before-define */
import React from 'react';
import { alpha, makeStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import CloseIcon from '@material-ui/icons/Close';
import Autocomplete from '@material-ui/lab/Autocomplete';
import ButtonBase from '@material-ui/core/ButtonBase';
import InputBase from '@material-ui/core/InputBase';
import { Avatar } from '@material-ui/core';
import { getInitialName, numberFromText, todoListColors } from '../../helpers/todoList';
import { ReactComponent as UserIcon } from "../../assets/icons/general/user.svg";
import { ReactComponent as PlusIcon } from "../../assets/icons/general/plus-circle.svg";
import { ReactComponent as SearchIcon } from "../../assets/icons/duotone-red/search-red.svg";
import { ReactComponent as DeleteIcon } from "../../assets/icons/duotone-red/x-circle.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    // width: 221,
    fontSize: 13,
  },
  popper: {
    border: '1px solid rgba(27,31,35,.15)',
    boxShadow: '0 3px 12px rgba(27,31,35,.15)',
    borderRadius: 3,
    width: 300,
    zIndex: 1,
    fontSize: 13,
    color: '#586069',
    backgroundColor: theme.palette.common.white,
    padding: 10
  },
  header: {
    borderBottom: '1px solid #e1e4e8',
    padding: '8px 10px',
    fontWeight: 600,
  },
  inputBase: {
    padding: 10,
    width: '100%',
    backgroundColor: theme.palette.common.white,
    border: '1px solid #BCC8E7',
    borderRadius: 4,
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    fontSize: 14,
    '&:focus': {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
  paper: {
    boxShadow: 'none',
    margin: 0,
    color: '#586069',
    fontSize: 13,
  },
  option: {
    minHeight: 'auto',
    alignItems: 'center',
    padding: 8,
    '&[aria-selected="true"]': {
      backgroundColor: 'transparent',
    },
    '&[data-focus="true"]': {
      backgroundColor: theme.palette.action.hover,
    },
  },
  popperDisablePortal: {
    position: 'relative',
  },
  iconSelected: {
    width: 17,
    height: 17,
  },
  color: {
    width: 14,
    height: 14,
    flexShrink: 0,
    borderRadius: 3,
    marginRight: 8,
    marginTop: 2,
  },
  text: {
    flexGrow: 1,
    fontSize: 13,
    fontWeight: 400,
  },
  close: {
    opacity: 0.6,
    width: 18,
    height: 18,
  },
  avatarContainer: {
    display: "flex", 
    flexDirection: "row",
    paddingLeft: 15
  },
}));

export default function UsersSelectorMenu({value=[], handleChange=(values)=>console.log("+++ values", values), usersOption=defUsersOption}) {

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  // const [value, setValue] = React.useState(defValue);
  const [pendingValue, setPendingValue] = React.useState([]);

  const handleClick = (event) => {
    setPendingValue(value);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event, reason) => {
    if (reason === 'toggleInput') {
      return;
    }
    // setValue(pendingValue);
    handleChange(pendingValue);
    if (anchorEl) {
      anchorEl.focus();
    }
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'github-label' : undefined;
  
  return (
    <>
      <div className={classes.root}>
        <div className={classes.avatarContainer}>
          {value.map((item, index) => {
            if(index < 6){
              if(index > 4){
                return (
                  <Avatar style={{backgroundColor: "#ffe9e8", color: "#db241f", fontSize: 15, marginLeft: -10}}>+{value.length-5}</Avatar>
                );
              }
              const initialName = getInitialName(item.name);
              const backgroundColorRand = todoListColors[numberFromText(initialName) % todoListColors.length];
              return (
                <Avatar style={{backgroundColor: backgroundColorRand, marginLeft: -10}}>{initialName}</Avatar>
              );}
          }
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
            <PlusIcon style={{position: "absolute", right: -2, bottom: -2}}/>
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
        <Autocomplete
          open
          onClose={handleClose}
          multiple
          classes={{
            paper: classes.paper,
            option: classes.option,
            popperDisablePortal: classes.popperDisablePortal,
          }}
          value={pendingValue}
          onChange={(event, newValue) => {
            setPendingValue(newValue);
          }}
          disableCloseOnSelect
          disablePortal
          renderTags={() => null}
          noOptionsText="No usersOption"
          renderOption={(option, { selected }) => (
            <>
              <div style={{position: 'relative', marginRight: 5, marginLeft: -2,}}>
                <Avatar style={{width: 30, height: 30, backgroundColor: selected ? '#DEFFE1':'#FFF5F4', fontSize: 13, color: '#2B2F3C'}}>
                  {getInitialName(option.name)}
                </Avatar>
                <DeleteIcon
                  className={classes.iconSelected}
                  style={{ visibility: selected ? 'visible' : 'hidden', position: 'absolute', right: -2, bottom: -2 }}
                />
              </div>
              <div className={classes.text}>
                {option.name}
              </div>
              {/* <CloseIcon
                className={classes.close}
                style={{ visibility: selected ? 'visible' : 'hidden' }}
              /> */}
            </>
          )}
          options={[...usersOption].sort((a, b) => {
            // Display the selected usersOption first.
            let ai = value.indexOf(a);
            ai = ai === -1 ? value.length + usersOption.indexOf(a) : ai;
            let bi = value.indexOf(b);
            bi = bi === -1 ? value.length + usersOption.indexOf(b) : bi;
            return ai - bi;
          })}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <InputBase
              ref={params.InputProps.ref}
              inputProps={params.inputProps}
              autoFocus
              className={classes.inputBase}
              placeholder="Search..."
              endAdornment={<SearchIcon/>}
            />
          )}
        />
      </Popper>
    </>
  );
}

const defUsersOption =     [
  {id: 1, name: "Dani"}, 
  {id: 2, name: "Franki"}, 
  {id: 3, name: "Ahmad"}, 
  {id: 4, name: "Mhd Rezky"}, 
  {id: 5, name: "Boni"}, 
  {id: 6, name: "Zaki"}
];
