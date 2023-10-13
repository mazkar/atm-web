/* eslint-disable react/jsx-no-bind */
/* eslint-disable import/no-cycle */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Paper, Typography, Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import AddButton from "../../../../../components/Button/AddButton";
import MenuPopUp from "../MenuPopUp";
import PopUpConfirmation from "../PopUpConfirmation";
import AddSubCategory from "../AddSubCategory";
import { RootContext } from "../../../../../router";
import LoadingView from "../../../../../components/Loading/LoadingView";
import ModalLoader from "../../../../../components/ModalLoader";
import PopupSuccesDelete from "../../../../../components/PopupSuccessDelete";
import axios from "axios";

const UseStyles = makeStyles({
  paperWrapper: {
    "& .MuiPaper-elevation1": {
      boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
    },
  },
  root: {
    alignItems: "center",
    borderRadius: 10,
  },
  titleCategory: {
    fontFamily: "Barlow",
    fontWeight: 600,
    fontSize: "17px",
    padding: "17px 20px 20px 20px",
  },
  titleSub: {
    fontFamily: "Barlow",
    fontSize: "15px",
    fontWeight: 600,
  },
  containerWrapper: {
    height: 475,
    overflowY: "auto",
  },
});

function SubCategory({
  renderHandler,
  isFetching = false,
  subCategories = [],
  idCategory = null,
  handleRefresh = () => console.log("Refresh page"),
}) {
  const classes = UseStyles();
  const history = useHistory();
  const { userRoleName } = useContext(RootContext);
  const isAdmin = userRoleName?.toLowerCase().includes("admin");
  const [selectedSubCategory, setSelectedSubCategory] = useState(undefined);

  const [isLoaderOpen, setIsLoaderOpen] = useState(false);
  const [isOpenDeletePopup, setIsOpenDeletePopup] = useState(false);
  const [isSuccessDelete, setIsSuccessDelete] = useState(false);

  // FUNTION HANDLE OPEN CONFIRM DELETE
  function handleDeleteAction(indx) {
    setSelectedSubCategory(indx);
    setIsOpenDeletePopup(true);
  }

  function handleLeave() {
    setIsOpenDeletePopup(false);
  }

  function handleOpenSubCategory(id) {
    history.push(
      `/media-promosi/standarisasi-media-promosi/add-sub-category/${id}-null`
    );
  }

  const handleEdit = (categoryId, id) => {
    history.push(
      `/media-promosi/standarisasi-media-promosi/add-sub-category/${categoryId}-${id}`
    );
  };

  const handleDetail = (categoryId, id) => {
    history.push(
      `/media-promosi/standarisasi-media-promosi/${categoryId}-${id}`
    );
  };
  // useEffect(() => {
  //   console.log("+++ subCategories",subCategories);
  // }, [subCategories]);

  const handleDeleteSubCategory = async () => {
    await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_MONITORING}/removeSubCategoryMediaPromosi`,
      data: {
        id: selectedSubCategory,
      },
    })
      .then((res) => {
        console.log(res);
        setIsOpenDeletePopup(false);
        renderHandler();
      })
      .catch((err) => {
        alert(`error while deleting Sub Category\n${err}`);
        setIsOpenDeletePopup(false);
        renderHandler();
      });
  };

  return (
    <div className={classes.paperWrapper}>
      <Paper className={classes.root}>
        <Typography className={classes.titleCategory}>Sub Kategori</Typography>
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
                <>
                  {subCategories.map((item, index) => {
                    return (
                      <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        style={{ padding: "0px 20px" }}
                      >
                        <Grid item>
                          <Typography className={classes.titleSub}>
                            {item.subCategoryName}
                          </Typography>
                        </Grid>

                        <Grid item>
                          <MenuPopUp
                            deleteHandler={() => handleDeleteAction(item.id)}
                            editHandler={() =>
                              handleEdit(item.categoryId, item.id)
                            }
                            detailHandler={() =>
                              handleDetail(item.categoryId, item.id)
                            }
                          />
                        </Grid>
                      </Grid>
                    );
                  })}
                </>
              )}
            </div>
          </Grid>
          <Grid item style={{ alignSelf: "center", padding: 20 }} xs={12}>
            {isAdmin && (
              <AddButton
                onClick={() => handleOpenSubCategory(idCategory)}
                label="Tambah Sub Kategori"
                iconPosition="endIcon"
              />
            )}
          </Grid>
        </Grid>

        <PopUpConfirmation
          isOpen={isOpenDeletePopup}
          message="Anda yakin akan menghapus ?"
          onLeave={handleLeave}
          onSubmit={() => handleDeleteSubCategory()}
        />
        <PopupSuccesDelete
          isOpen={isSuccessDelete}
          onClose={() => {
            setIsSuccessDelete(false);
            handleRefresh();
          }}
          message="Hapus Berhasil Dilakukan"
        />
        <ModalLoader isOpen={isLoaderOpen} />
      </Paper>
    </div>
  );
}

SubCategory.propTypes = {
  subCategories: PropTypes.object.isRequired,
};

export default SubCategory;
