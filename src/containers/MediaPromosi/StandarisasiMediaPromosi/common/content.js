import React, { useState, createContext, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { Typography, Paper, Grid, List, ListItem } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { Dark } from "../../../../assets/theme/colors";
import AddButton from "../../../../components/Button/AddButton";
import MenuPopUp from "../../../VendorManagement/PartAndServicePricelist/common/MenuPopUp";
import AddCategory from "../../../../components/Modal/AddCategory";
import PopUpConfirmation from "../../../EnvironmentPremises/StandarisasiPremises/common/PopUpConfirmation";
import { RootContext } from "../../../../router";
import PopupSucces from "../../../../components/PopupSucces";
import PopupSuccesDelete from "../../../../components/PopupSuccessDelete";
import ModalLoader from "../../../../components/ModalLoader";
import LoadingView from "../../../../components/Loading/LoadingView";
import { useContext } from "react";
import SubCategory from "./SubCategory";
import {
  doGetCategoryMediaPromosi,
  doAddCategoryMediaPromosi,
  doEditCategoryMediaPromosi,
  doDeleteCategoryMediaPromosi,
} from "../service";

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
    overflowY: "auto",
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

export const DataContext = createContext();

const Content = () => {
  const classes = UseStyles();
  const history = useHistory();
  const { userRoleName } = useContext(RootContext);
  const isAdmin = userRoleName?.toLowerCase().includes("admin");

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(undefined);

  const [selectedEditOrDeleteCategory, setSelectedEditOrDeleteCategory] =
    useState(undefined);

  const [inputCategory, setInputCategory] = useState("");
  const [isAddCategory, setIsAddCategory] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoaderOpen, setIsLoaderOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSuccessDelete, setIsSuccessDelete] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [isOpenDeletePopup, setIsOpenDeletePopup] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [renderPage, setRenderPage] = useState(false);
  const [indexCategory, setIndexCategory] = useState(null);

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
    setIndexCategory(categories[indx].id);
    setIsAddCategory(false);
    setModalOpen(true);
  }

  function handleDeleteConfirm(indx) {
    setIndexCategory(categories[indx].id);
    setSelectedEditOrDeleteCategory(categories[indx]);
    setIsOpenDeletePopup(true);
  }

  const handleChangeInput = (data) => {
    setInputCategory(data);
  };

  const handleSubmit = async () => {
    console.log("submitted");
    if (isAddCategory) {
      doAddCategoryMediaPromosi(loaderHandler, inputCategory).then((res) => {
        setModalOpen(false);
        setRenderPage(!renderPage);
      });
    } else {
      doEditCategoryMediaPromosi(
        loaderHandler,
        indexCategory,
        inputCategory
      ).then((res) => {
        setModalOpen(false);
        setIndexCategory(null);
        setRenderPage(!renderPage);
      });
    }
  };

  const loaderHandler = (bool) => {
    setIsFetching(bool);
  };

  const renderHandler = () => {
    setRenderPage(!renderPage);
  };

  const handleDeleteCategory = () => {
    doDeleteCategoryMediaPromosi(loaderHandler, indexCategory).then((res) => {
      setIsOpenDeletePopup(false);
      setRenderPage(!renderPage);
    });
  };

  useEffect(() => {
    doGetCategoryMediaPromosi(loaderHandler).then((res) => {
      console.log("+++ response", res);
      if (res.data?.responseCode === "200") {
        const { data } = res.data;
        if (data.length > 0) {
          setSelectedCategory(data[0]);
        }
        setCategories(data);
      }
    });
  }, [renderPage]);

  return (
    <Grid container direction="row" spacing={4}>
      <Grid item xs={4}>
        <div className={classes.paperWrapper}>
          <Paper className={classes.rootPage}>
            <Typography className={classes.titleCategory}>Kategori</Typography>
            <Grid
              container
              direction="column"
              justifyContent="space-between"
              style={{ minHeight: 475 }}
            >
              <Grid item xs={12}>
                <div className={classes.containerWrapper}>
                  {isFetching ? (
                    <LoadingView maxheight="100%" isTransparent />
                  ) : (
                    <div className={classes.row}>
                      <List component="nav" aria-label="Kategori">
                        {categories.map((item, index) => (
                          <ListItem
                            button
                            selected={selectedCategory.id === item.id}
                            onClick={() => handleListItemClick(index)}
                            classes={{
                              root: classes.root,
                              selected: classes.selected,
                            }}
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
                                {item.subCategory?.length || 0} Sub{" "}
                                {item.categoryName}
                              </Typography>
                            </div>
                            <div>
                              <MenuPopUp
                                editHandler={() => handleEditCategory(index)}
                                deleteHandler={() => handleDeleteConfirm(index)}
                              />
                            </div>
                          </ListItem>
                        ))}
                      </List>
                    </div>
                  )}
                </div>
              </Grid>
              <Grid item style={{ alignSelf: "center", padding: 20 }} xs={12}>
                {isAdmin && (
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
          isFetching={isFetching}
          subCategories={selectedCategory?.subCategory || []}
          idCategory={selectedCategory?.id}
          renderHandler={renderHandler}
          // handleRefresh={initFetch}
        />
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
        onSubmit={handleDeleteCategory}
      />
      <PopupSucces
        isOpen={isSuccess}
        onClose={() => {
          setIsSuccess(false);
          // initFetch();
        }}
        message={successMessage}
      />
      <PopupSuccesDelete
        isOpen={isSuccessDelete}
        onClose={() => {
          setIsSuccessDelete(false);
          // initFetch();
        }}
        message="Hapus Berhasil Dilakukan"
      />
      <ModalLoader isOpen={isLoaderOpen} />
    </Grid>
  );
};

export default Content;
