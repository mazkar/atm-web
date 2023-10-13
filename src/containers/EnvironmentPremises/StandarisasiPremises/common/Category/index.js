/* eslint-disable no-alert */
/* eslint-disable react/jsx-no-bind */
import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/styles";
import { Paper, Typography, Grid, List, ListItem } from "@material-ui/core";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { Dark } from "../../../../../assets/theme/colors";
import SubCategory from "../SubCategory";
import AddButton from "../../../../../components/Button/AddButton";
import MenuPopUp from "../../../../VendorManagement/PartAndServicePricelist/common/MenuPopUp";
import AddCategory from "../../../../../components/Modal/AddCategory";
import PopUpConfirmation from "../PopUpConfirmation";
import { doAddOrUpdateCategory, doDeleteCategory, doGetCategoryEnvironmentPremises } from "../../../ApiServicesEnvironmentPremises";
import { RootContext } from "../../../../../router";
import PopupSucces from "../../../../../components/PopupSucces";
import PopupSuccesDelete from "../../../../../components/PopupSuccessDelete";
import ModalLoader from "../../../../../components/ModalLoader";
import LoadingView from "../../../../../components/Loading/LoadingView";

const UseStyles = makeStyles({
  paperWrapper: {
    "& .MuiPaper-elevation1": {
      boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
    },
  },
  root: {
    "&$selected": {
      backgroundColor: "#FFF5F4",
    },
  },
  selected: {},
  rootPage: {
    alignItems: "center",
    borderRadius: 10,
  },
  containerWrapper: { 
    height: 475, 
    overflowY: "scroll" 
  },
  titleCategory: {
    fontFamily: "Barlow",
    fontWeight: 600,
    fontSize: "17px",
    padding: "17px 20px 20px 20px",
  },
  listCategory: {
    padding: "6px 30px",
    maxHeight: "100vh",
  },
  titleList: {
    fontFamily: "Barlow",
    fontSize: "13px",
    fontWeight: 600,
    color: Dark,
  },
  subList: {
    fontFamily: "Barlow",
    fontWeight: 400,
    fontSize: "12px",
    color: "#8D98B4",
  },
  col: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

function Category() {
  const classes = UseStyles();
  const history = useHistory();
  const { userRoleName } = useContext(RootContext);
  const isAdmin = userRoleName?.toLowerCase().includes("admin");

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(undefined);

  const [selectedEditOrDeleteCategory, setSelectedEditOrDeleteCategory] = useState(undefined);
  
  const [inputCategory, setInputCategory] = useState("");
  const [isAddCategory, setIsAddCategory] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoaderOpen, setIsLoaderOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSuccessDelete, setIsSuccessDelete] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [isOpenDeletePopup, setIsOpenDeletePopup] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  // handle select index
  const handleListItemClick = (indx) => {
    setSelectedCategory(categories[indx]);
  };

  // FUNCTION HANDLING MODAL
  function handleAddCategory() {
    setInputCategory("");
    setIsAddCategory(true);
    setModalOpen(true);
  }

  function handleCloseAction() {
    setModalOpen(false);
    setInputCategory("");
  }

  function handleCloseConfirm() {
    setIsOpenDeletePopup(false);
  }

  function handleEditCategory(indx) {
    setInputCategory(categories[indx].categoryName);
    setSelectedEditOrDeleteCategory(categories[indx]);
    setIsAddCategory(false);
    setModalOpen(true);
  }

  function handleDeleteConfirm(indx) {
    setSelectedEditOrDeleteCategory(categories[indx]);
    setIsOpenDeletePopup(true);
  }

  const handleChangeInput = (data) => {
    setInputCategory(data);
  };

  const handleSubmit = () => {
    
    const dataHitEdit= {
      id: isAddCategory? undefined : selectedEditOrDeleteCategory.categoryId,
      categoryName: inputCategory
    };

    doAddOrUpdateCategory((bool)=>setIsLoaderOpen(bool),dataHitEdit)
      .then((response)=>{
        // console.log("+++ response", response);
        if(response.data?.responseCode === "200"){
          setInputCategory("");
          setModalOpen(false);
          setSuccessMessage(`Sukses ${isAddCategory? "Add":"Edit"} Kategori`);
          setIsSuccess(true);
        }
      })
      .catch((err) => {
        alert(`Terjadi Kesalahan:${err}`);
      });;
  };

  function handleDeleteCategory(){
    // alert(`ID deleted: ${selectedEditOrDeleteCategory.categoryId}`);

    doDeleteCategory((bool)=>setIsLoaderOpen(bool),{id:selectedEditOrDeleteCategory.categoryId})
      .then((response)=>{
        // console.log("+++ response", response);
        if(response.data?.responseCode === "200"){
          setIsOpenDeletePopup(false);
          setIsSuccessDelete(true);
        }
      })
      .catch((err) => {
        alert(`Terjadi Kesalahan:${err}`);
      });
  }

  function initFetch(){
    doGetCategoryEnvironmentPremises((bool)=>setIsFetching(bool),1)
      .then((response)=>{
        console.log("+++ response", response);
        if(response.data?.responseCode === "200"){
          const {data} = response.data;
          if(data.length > 0){
            setSelectedCategory(data[0]);
          }
          setCategories(data);
        }
      })
      .catch((err) => {
        alert(`Terjadi Kesalahan:${err}`);
      });;
  }

  useEffect(() => {
    initFetch();
  }, []);
  
  // useEffect(() => {
  //   console.log("+++ userRoleName",userRoleName);
  //   console.log("+++ selectedCategory",selectedCategory);
  // }, [selectedCategory]);
  
  return (
    <Grid container direction="row" spacing={4}>
      <Grid item xs={4}>
        <div className={classes.paperWrapper}>
          <Paper className={classes.rootPage}>
            <Typography className={classes.titleCategory}>Kategori</Typography>
            <Grid container direction="column" justifyContent="space-between" style={{minHeight: 475}}>
              <Grid item xs={12} >
                <div className={classes.containerWrapper}>
                  {isFetching?(
                    <LoadingView maxheight='100%' isTransparent />
                  ):(
                    <div className={classes.row}>
                      <List component="nav" aria-label="Kategori">
                        {categories.map((item, index) => (
                          <ListItem
                            button
                            selected={selectedCategory.categoryId === item.categoryId}
                            onClick={() => handleListItemClick(index)}
                            classes={{ root: classes.root, selected: classes.selected }}
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              padding: "0px 20px",
                            }}
                          >
                            <div>
                              <Typography className={classes.titleList}>
                                {item.categoryName}
                              </Typography>
                              <Typography className={classes.subList}>
                                {item.subCategory?.length || 0} Sub {item.categoryName}
                              </Typography>
                            </div>
                            <div>
                              <MenuPopUp
                                editHandler={()=>handleEditCategory(index)}
                                deleteHandler={()=>handleDeleteConfirm(index)}
                              />
                            </div>
                          </ListItem>
                        ))}
                      </List>
                    </div>
                  )}
                </div>
                
              </Grid>
              <Grid item style={{alignSelf: "center", padding: 20}} xs={12}>
                {isAdmin&&(
                  <AddButton
                    onClick={handleAddCategory}
                    label="Tambah Kategori"
                    iconPosition="endIcon"
                  />
                )}
              </Grid>
            </Grid>

          </Paper>
        </div>
      </Grid>

      <Grid item xs={8}>
        <SubCategory 
          isFetching = {isFetching}
          subCategories={selectedCategory?.subCategory || []} 
          idCategory={selectedCategory?.categoryId}
          handleRefresh = {initFetch}/>
      </Grid>

      <AddCategory
        isOpen={modalOpen}
        handleClose={handleCloseAction}
        label={isAddCategory ? "Add Kategori" : "Edit Kategori"}
        placeholder="Masukan Nama Kategori"
        valInput={inputCategory}
        handleChange={handleChangeInput}
        handleSubmit={handleSubmit}
        handleCancel={handleCloseAction}
      />
      <PopUpConfirmation
        isOpen={isOpenDeletePopup}
        message="Anda Yakin Ingin Menghapus ?"
        selectedCategory={selectedCategory}
        onLeave={handleCloseConfirm}
        onSubmit={()=>handleDeleteCategory()}
      />
      <PopupSucces 
        isOpen={isSuccess} 
        onClose={()=>{
          setIsSuccess(false);
          initFetch();
        }} 
        message={successMessage}/>
      <PopupSuccesDelete
        isOpen={isSuccessDelete}
        onClose={()=>{
          setIsSuccessDelete(false);
          initFetch();
        }}
        message="Hapus Berhasil Dilakukan"
      />
      <ModalLoader isOpen={isLoaderOpen} />
    </Grid>
  );
}

Category.prototype = {};

export default Category;
