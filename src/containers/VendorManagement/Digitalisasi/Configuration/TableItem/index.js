/* eslint-disable prefer-template */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable indent */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { isValidElement, useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import { makeStyles, useTheme, withStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  IconButton,
  ListItemSecondaryAction,
  ListItemText,
  MenuItem,
  Menu,
  Box,
} from "@material-ui/core";
import MoreHoriz from "@material-ui/icons/MoreHoriz";
import Constants from "../../../../../helpers/constants";
import Divider from "@material-ui/core/Divider";
import { ReactComponent as Trash } from "../../../../../assets/icons/linear-red/trash.svg";
import { ReactComponent as Edit } from "../../../../../assets/icons/linear-red/edit.svg";
import { GrayHard, PrimaryHard } from "../../../../../assets/theme/colors";
import { doFetchConfiguration } from "../../../ApiServices"
import PopUpDelete from "../PopUp/common/PopUpDelete";
import PopUpSuccess from "../PopUp/common/PopUpSuccess";
import DelSuccess from "../PopUp/common/DelSuccess";
import LoadingView from "../../../../../components/Loading/LoadingView"
import EditItem from "../PopUp/EditItem"
import axios from "axios";

const useStyles = makeStyles({
  superRoot: {
    "& .MuiPaper-elevation1": {
      boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
    },
    "& .MuiPaper-rounded": {
      borderRadius: "10px",
    },
  },
  boxStyle: {
    padding: "10px 10px",
    width: 670,
    position: "relative",
    borderRadius: 10,
    border: "1px solid #BCC8E7",
    backgroundColor: "#fff",
    minHeight: 300,
    overflow: "auto",
    overflowX: "hidden",
    overflowY: "scroll",
    maxHeight: 300,
  },
  label: {
    fontWeight: "600",
    fontSize: "13px",
    lineHeight: "16px",
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

const TableConfig = ({ isDel, categoryId }) => {
  const classes = useStyles();
  const [listItem, setListItem] = useState([]);
  const [isDelete, setIsDelete] = useState(false);
  const [isDelConfig, setIsDelConfig] = useState(false);
   const [onSuccessSubmit, setOnSuccessSubmit] = useState(false);
  const [isLoadData, setIsLoadData] = useState(false);
  const [editItem, setEditItem] = useState({});
  const [isEditItem, setIsEditItem]= useState(false)
  const [listId, setListId]= useState(0)
  const { id } = 1;

  function loadDataHandler(loaderValue) {
    setIsLoadData(loaderValue);
  }
   function handledelConfig() {
     setIsDelConfig(true);
   }
    function handleDelClose() {
      setIsDelete(false);
    }
    function handledelConfigClose() {
      setIsDelConfig(false);
      setIsDelete(false)
      history.go(0);
    }
 const handleSubmit = () => {
   setOnSuccessSubmit(true);
   setEditItem(false);
 };
 function handleClosePopup() {
   setEditItem(false);
   setOnSuccessSubmit(false);
   history.go(0);
 }
  useEffect(() => {
    doFetchConfiguration(loadDataHandler, id).then((response) => {
      console.log("item", response.configAttributeDetailList);
      setListItem(
        response.configAttributeDetailList.map((list) => ({
          label: list.name,
          content: [
            {
              label: list.typeList,
              value:
                list.typeName != "Input"
                  ? JSON.parse(list.typeName).toString()
                  : "Input",
            },
            {
              label: list.conditionList,
              value: list.conditionName != "Input"?JSON.parse(list.conditionName).toString():"Input",
            },
            {
              label: list.existingList,
              value: list.existingName != "Input" ? JSON.parse(list.existingName).toString():"Input",
            },
          ],
          custom: list.customizeId,
          idList: list.id,
          photo: list.photoStatus,
          listExisting: list.existingName,
          listType: list.typeName,
          listCondition: list.conditionName,
          labelType: list.typeList,
          conditionLabel: list.conditionList,
          existingLabel: list.existingList,
        }))
      );
    });
  }, []);
  useEffect(() => {
    console.log("typeid", categoryId);
  }, [categoryId]);
  useEffect(() => {
    console.log("itemsbizz", listItem);
    //const abs= Array.isArray(listItem.listType)
    //console.log("arrayngk",abs)
  }, [listItem]);

function handleDel(valueId){
setIsDelete(true);
setListId(valueId)
}
function handleEdit(
  valueId,
  nameItem,
  photoStatus,
  listExisting,
  listCondition,
  listType,
  labelType,
  conditionLabel,
  existingLabel
) {
  setIsEditItem(true);
  setEditItem({
    id: valueId,
    name: nameItem,
    photo: photoStatus == 1 ? true : false,
    listExisting: listExisting == "Input" ? true : false,
    listCondition: listCondition == "Input" ? true : false,
    listType: listType == "Input" ? true : false,
    labelType: labelType,
    conditionLabel: conditionLabel,
    existingLabel: existingLabel,
    listExistType: listExisting != "Input" ? JSON.parse(listExisting):"Input",
    listNameType: listType != "Input" ? JSON.parse(listType):"Input",
    listConditionName:listCondition != "Input" ? JSON.parse(listCondition):"Input"
  });
}
function handleCloseEdit(){
  setIsEditItem(false)
}
const CustomMenu = ({
  valueId,
  nameItem,
  photoStatus,
  listExisting,
  listCondition,
  listType,
  labelType,
  conditionLabel,
  existingLabel,
}) => {
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
            handleEdit(
              valueId,
              nameItem,
              photoStatus,
              listExisting,
              listCondition,
              listType,
              labelType,
              conditionLabel,
              existingLabel
            );
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
            handleDel(valueId);
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
    <div>
      <Grid container spacing={2}>
        <Grid item>
          <Box className={classes.boxStyle}>
            {isLoadData ? (
              <LoadingView maxheight="100%" />
            ) : (
              <>
                {listItem
                  .filter((list) => list.custom === categoryId)
                  .map((item) => {
                    return (
                      <div>
                        <Grid container>
                          <Grid item xs={4} style={{ marginTop: 15 }}>
                            <Typography
                              style={{
                                fontWeight: 600,
                                fontSize: 13,
                                color: "#2B2F3C",
                              }}
                            >
                              {item.label}
                            </Typography>
                          </Grid>
                          <Grid item xs={7} style={{ marginTop: 15 }}>
                            <Grid container direction="column">
                              {item.content.map((itemAnswer) => {
                                return <Answer answer={itemAnswer} />;
                              })}
                              <Grid item />
                            </Grid>
                          </Grid>
                          <Grid item xs={1}>
                            <CustomMenu
                              isDel={handleDel}
                              valueId={item.idList}
                              nameItem={item.label}
                              photoStatus={item.photo}
                              listExisting={item.listExisting}
                              listCondition={item.listCondition}
                              listType={item.listType}
                              labelType={item.labelType}
                              conditionLabel={item.conditionLabel}
                              existingLabel={item.existingLabel}
                            />
                          </Grid>
                        </Grid>
                        <Divider
                          variant="fullWidth"
                          light="true"
                          style={{ marginTop: 5 }}
                        />
                      </div>
                    );
                  })}
              </>
            )}
          </Box>
        </Grid>
      </Grid>
      {isDelete && (
        <PopUpDelete
          isOpen={handleDel}
          onClose={handleDelClose}
          delConfig={handledelConfig}
          idListConfig={listId}
          customId={categoryId}
        />
      )}
      {isDelConfig && (
        <DelSuccess isOpen={handledelConfig} onClose={handledelConfigClose} />
      )}
      {isEditItem && (
        <EditItem
          isOpen={isEditItem}
          onClose={handleCloseEdit}
          itemId={editItem}
          categoriesId={categoryId}
          onSuccessSubmit={handleSubmit}
        />
      )}
      {onSuccessSubmit && (
        <PopUpSuccess isOpen={handleSubmit} onClose={handleClosePopup} />
      )}
    </div>
  );
};

TableConfig.propTypes = {
  borderedContainer: PropTypes.bool,
};

TableConfig.defaultProps = {
  borderedContainer: false,
};

export default TableConfig;

const Answer = ({ answer }) => {
  return (
    answer.value !== "" &&
    answer.value !== null && (
      <Grid container style={{ fontSize: 13, color: "#2B2F3C" }}>
        <Grid item xs={3} style={{ fontWeight: 600 }}>
          <Typography
            style={{
              fontWeight: 600,
              fontSize: 13,
              color: "#2B2F3C",
            }}
          >
            {" "}
            {answer.label}
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography
            style={{
              fontWeight: 600,
              fontSize: 13,
              color: "#2B2F3C",
            }}
          >
            {" "}
            :
          </Typography>
        </Grid>
        <Grid item>
          <Typography
            style={{
              fontWeight: 400,
              fontSize: 13,
              color: "#2B2F3C",
            }}
          >
            {answer.value} 
          </Typography>
        </Grid>
      </Grid>
    )
  );
};
