import React, { useState,useEffect,useParams } from "react";
import {
  Grid,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/styles";
import constans from "../../../../helpers/constants";
import MuiIconLabelButton from "../../../../components/Button/MuiIconLabelButton";
import Plus from "@material-ui/icons/Add";
import { PrimaryHard,GrayHard } from "../../../../assets/theme/colors";
import FloatingChat from "../../../../components/GeneralComponent/FloatingChat";
import PopUpSuccess from "./PopUp/common/PopUpSuccess";
import AddNewItem from "./PopUp/AddNewItem";
import AddNewCategory from "./PopUp/AddNewCategory";
import TableConfig from "./TableItem";
import { doFetchConfiguration } from "../../ApiServices";
import LoadingView from "../../../../components/Loading/LoadingView";

const useStyles = makeStyles(() => ({
  root: {
    padding: "30px 20px 20px 30px",
  },
  title: {
    fontWeight: "500",
    fontSize: "36px",
    lineHeight: "43px",
  },
  titleContainer: {
    marginBottom: 25,
  },
  paper: {
    height: "100%",
    border: "1px solid #E6EAF3",
    boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
    borderRadius: "8px",
    padding: 10,
    maxHeight: 500,
    overflowY:"scroll",
    overflowX: "hidden",
  },
  title: {
    fontWeight: "600",
    fontSize: "17px",
    lineHeight: "20px",
    padding: 20,
  },
  addBtn: {
    backgroundColor: "transparent",
    boxShadow: "none",
    "& .MuiButton-label": {
      textTransform: "capitalize",
      fontWeight: "600",
      fontSize: "11px",
      lineHeight: "13px",
      color: PrimaryHard,
      padding: 20,
    },
    "&:hover": {
      backgroundColor: "transparent",
      boxShadow: "none",
    },
  },
  cardTitle: {
    fontWeight: "600",
    fontSize: "17px",
    lineHeight: "20px",
    padding: 20,
  },
  list: {
    padding: 0,
  },
  listItem: {
    padding: "6px 20px",
    "&:hover": {
      backgroundColor: "#FFF5F4",
    },
  },
  listItemSelected: {
    backgroundColor: "#FFF5F4!important",
    "&:hover": {
      backgroundColor: "#FFF5F4!important",
    },
  },
  listItemIcon: {
    minWidth: 0,
    marginRight: 15,
    "& .MuiCheckbox-root": {
      padding: 0,
    },
  },
}));
const ConfigurationDigitalisasi = () => {
  const classes = useStyles();
  const [isAddNewOpen, setIsAddNewOpen] = useState(false);
  const [onSuccessSubmit, setOnSuccessSubmit] = useState(false);
   const [activeTypeId, setActiveTypeId] = useState(1);
  const [isAddCategory, setIsAddCategory] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isDelConfig, setIsDelConfig] = useState(false);
  const [listCategory, setListCategory]= useState([]);
  const [isLoadData, setIsLoadData] = useState(false);
  const {id}=1

  function loadDataHandler(loaderValue) {
    setIsLoadData(loaderValue);
  }

  function handleAddNewCategory() {
    setIsAddCategory(true);
  }

  function handleCloseAddCategory() {
    setIsAddCategory(false);
  }
  const handleSubmit = () => {
    setOnSuccessSubmit(true);
    setIsAddNewOpen(false);
  };

  const handleSubmitCategory = () => {
    setOnSuccessSubmit(true);
    setIsAddCategory(false);
  };
  function handleAddNewItem() {
    setIsAddNewOpen(true);
  }
  function handleClosePopup() {
    setIsAddNewOpen(false);
    setOnSuccessSubmit(false);
    history.go(0);
  }

  function handleDel() {
    setIsDelete(true);
  }

  useEffect(()=>{
    doFetchConfiguration(loadDataHandler, id)
      .then((response) => {
        console.log("response", response);
        setListCategory(response.configAttributeList);
      })
      .catch((err) => {
        alert(`Terjadi Kesalahan:${err}`);
      });
  },[])

  useEffect(()=>{
    console.log("category",listCategory)
  },[listCategory])

  return (
    <div className={classes.root}>
      <Grid item className={classes.titleContainer}>
        <Typography
          style={{ fontWeight: "500", fontSize: "36px", lineHeight: "43px" }}
        >
          Configuration
        </Typography>
      </Grid>
      <Grid container spacing={2} style={{ minHeight: 500 }}>
        <Grid item xs={4} >
          <Paper className={classes.paper}>
            <Grid container direction="row">
              <Grid item xs={8}>
                <Typography className={classes.title}>Kategori</Typography>
              </Grid>
              <Grid item xs={4}>
                <MuiIconLabelButton
                  label="Tambah"
                  iconPosition="endIcon"
                  onClick={handleAddNewCategory}
                  buttonIcon={<Plus style={{ width: 16, height: 16 }} />}
                  className={classes.addBtn}
                />
              </Grid>
            </Grid>
            <List className={classes.list}>
              {isLoadData ? (
                <LoadingView maxheight="100%" />
              ) : (
                <>
                  {listCategory.map((val) => {
                    return (
                      <ListItem
                        classes={{
                          root: classes.listItem,
                          selected: classes.listItemSelected,
                        }}
                        button
                        selected={val.id == activeTypeId}
                        onClick={() => {
                          setActiveTypeId(val.id);
                        }}
                      >
                        <CustomListText
                          primary={val.category}
                          secondary={`${val.countAttributeDetail} Items`}
                        />
                      </ListItem>
                    );
                  })}
                </>
              )}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <Paper
            style={{
              paddingTop: 20,
              paddingRight: 10,
              paddingLeft: 10,
              boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
              borderRadius: 10,
              minHeight: 500,
              minWidth: 600,
            }}
          >
            <Grid container>
              <Grid item>
                {" "}
                <Typography
                  style={{ fontSize: 17, fontWeight: 600, marginBottom: 25 }}
                >
                  Items
                </Typography>
              </Grid>
              <Grid item>
                <TableConfig borderedContainer categoryId={activeTypeId} />
              </Grid>
              <Grid
                container
                justifyContent="center"
                style={{ marginTop: "30px" }}
              >
                <MuiIconLabelButton
                  label="Tambah Items"
                  iconPosition="endIcon"
                  onClick={() => {
                    handleAddNewItem();
                  }}
                  buttonIcon={<Plus />}
                  style={{
                    width: "max-content",
                    right: 0,
                    height: 40,
                    boxShadow: "0px 6px 6px rgba(220, 36, 31, 0.1)",
                    borderRadius: "6px",
                  }}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      {isAddNewOpen && (
        <AddNewItem
          isOpen={isAddNewOpen}
          onClose={handleClosePopup}
          onSuccessSubmit={handleSubmit}
          categoriesId={activeTypeId}
        />
      )}
      {onSuccessSubmit && (
        <PopUpSuccess isOpen={handleSubmit} onClose={handleClosePopup} />
      )}
      {isAddCategory && (
        <AddNewCategory
          isOpen={isAddCategory}
          onClose={handleCloseAddCategory}
          onSuccessSubmit={handleSubmitCategory}
          customizedId={listCategory.value}
        />
      )}

      {/* <FloatingChat /> */}
    </div>
  );
};
export default ConfigurationDigitalisasi;
const CustomListText = withStyles((theme) => ({
  root: {
    margin: 0,
  },
  primary: {
    fontWeight: "600",
    fontSize: "12px",
    lineHeight: "14px",
  },
  secondary: {
    fontSize: "12px",
    lineHeight: "14px",
    color: GrayHard,
  },
}))(ListItemText);
