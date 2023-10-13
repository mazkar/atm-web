import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles,useTheme, withStyles } from "@material-ui/styles";
import {
  Typography,
  Grid,
  IconButton,
  ListItemSecondaryAction,
  ListItemText,
  MenuItem,
  Menu,
  Box,
} from "@material-ui/core";
import MoreHoriz from "@material-ui/icons/MoreHoriz";
import axios from "axios";
import { useHistory } from "react-router-dom";

/* Internal Import */
import DeletePopUp from "../../../../../components/Alert/Warning";
import DialogEditList from "../DialogEditList";
import { ReactComponent as Trash } from "../../../../../assets/icons/linear-red/trash.svg";
import { ReactComponent as Edit } from "../../../../../assets/icons/linear-red/edit.svg";
import { GrayHard, PrimaryHard } from "../../../../../assets/theme/colors";
import ModalLoader from "../../../../../components/ModalLoader";

const useStyles = makeStyles({
  root: {
    padding: "12px 20px",
    boxShadow: "inset 0px -1px 0px rgba(188, 200, 231, 0.4)",
  },
  title: {
    fontSize: "15px",
    color: "#2B2F3C",
    fontWeight: 600,
  },
  subtitle: {
    fontSize: "15px",
    color: "#BCC8E7",
    fontWeight: 400,
  },
  duration: {
    fontSize: "15px",
    color: "#BCC8E7",
    fontWeight: 500,
  },
});

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));
const StyledMenuText = withStyles((theme) => ({
  primary: {
    fontWeight: "500",
    fontSize: "13px",
  },
}))(ListItemText);
const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:hover": {
      backgroundColor: "#FFF5F4",
    },
  },
}))(MenuItem);

const Row = ({ data, type }) => {
  const classes = useStyles();
  const { title, description, duration,startTime,endTime,rangeDateDes,rangeDate,kejadian,idSubConfig } = data;
  const [IsEditItem, setIsEditItem] = useState(false);
  const history = useHistory();
  const [openDelete,setOpenDelete]=useState(false);
  const [loadingSubmit,setLoadingSubmit]=useState(false);
  const [listEdit,setListEdit]=useState({});

  function handleDeleteOpen() {
    setOpenDelete(true);
  }
  const handleDelete = (idSubConfig) => {
    // console.log("delete");
    const headers = {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    };
    try{
      setLoadingSubmit(true);
      axios
        .get(
          `${process.env.REACT_APP_API_INFORMATION_MONITORING}/deleteConfiguration?id=${idSubConfig}`,
          headers
        )
        .then(() => {
          setOpenDelete(false);
          setLoadingSubmit(false);
          history.go(0);
        })
        .catch((err) => {
          alert(err);
        });
    }catch(err){ alert(`Fail to Send Remark..!\n ${err}`);
    }
  };
  function handleEdit(desk, realProblem, partTime, rangeTime, jumlah,idSubConfig,duration,startTime,endTime,typeTime) {
    setIsEditItem(true);
    setListEdit({
      idSubConfig,
      desk,
      realProblem,
      partTime,
      rangeTime,
      jumlah,
      duration,
      typeTime,
      startTime,
      endTime,
    });
  }
  function handleCloseEdit() {
    setIsEditItem(false);
    
  }
  function handleCloseDelete(){
    setOpenDelete(false);
  }

  const CustomMenu = ({  desk, realProblem, partTime, rangeTime, jumlah,idSubConfig,duration,startTime,endTime,typeTime }) => {
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
          <MoreHoriz style={{ color: PrimaryHard }} />
        </IconButton>
        <StyledMenu
          id="customized-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <StyledMenuItem
            onClick={() => {
              handleEdit(desk, realProblem, partTime, rangeTime, jumlah,idSubConfig,duration,startTime,endTime,typeTime);
              handleClose();
            }}
          >
            <StyledMenuText primary="Edit" />
            <ListItemSecondaryAction>
              <Edit style={{ width: 16, height: 16 }} />
            </ListItemSecondaryAction>
          </StyledMenuItem>
          <StyledMenuItem
            onClick={() => {
              handleDeleteOpen(idSubConfig);
              handleClose();
            }}
          >
            <StyledMenuText primary="Delete" style={{ color: PrimaryHard }} />
            <ListItemSecondaryAction>
              <Trash style={{ width: 16, height: 16 }} />
            </ListItemSecondaryAction>
          </StyledMenuItem>
        </StyledMenu>
      </>
    );
  };
  return (
    <Grid
      container
      className={classes.root}
      justifyContent="space-between"
      alignItems="center"
    >
      <Grid item xs={7}>
        <Typography className={classes.title}>{title}</Typography>
        <Typography className={classes.subtitle}>{description}</Typography>
      </Grid>
      <Grid item xs={4}>
        <Grid container justifyContent="flex-end" alignItems="center">
          {type === "anomali" ? (
            <div>
              {(() => {
                if (duration === null)
                  return (
                    <div>
                      <Typography className={classes.duration}>
                        {startTime} - {endTime}
                      </Typography>
                      <CustomMenu desk={description} realProblem={title} startTime={startTime} endTime={endTime} idSubConfig={idSubConfig} typeTime="time"/>
                    </div>
                  );
                if (duration !== null)
                  return (
                    <div>
                      <Typography className={classes.duration}>
                        {duration}
                      </Typography>
                      <CustomMenu desk={description} realProblem={title} duration={duration} idSubConfig={idSubConfig} typeTime="duration"/>
                    </div>
                  );
              })()}
            </div>
          ) : (
            <div>
              <div>
                <Typography className={classes.duration}>
                  {`${kejadian} Kejadian`}/{rangeDate} {rangeDateDes}
                </Typography>
                <CustomMenu desk={description} realProblem={title} jumlah={kejadian} partTime={rangeDateDes} rangeTime={rangeDate} idSubConfig={idSubConfig} />
              </div>
            </div>
          )}
        </Grid>
      </Grid>
      {IsEditItem && (
        <DialogEditList
          isOpen={IsEditItem}
          onClose={handleCloseEdit}
          listData={listEdit}
          type={type}
        />
      )}
      <DeletePopUp
        isOpen={openDelete}
        title="Anda yakin ingin Melakukan Delete ?"
        subTitle="Anda tidak dapat membatalkan tindakan ini"
        onClose={() => {
          handleCloseDelete();
        }}
        onConfirm={() => {
          handleDelete(idSubConfig);
        }}
      />
      <ModalLoader isOpen={loadingSubmit}/>
    </Grid>
  );
};

export default Row;
