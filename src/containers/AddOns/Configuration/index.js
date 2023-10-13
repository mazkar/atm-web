import {
  Box,
  Grid,
  List,
  ListItem,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { ReactComponent as PlusIcon } from "../../../assets/icons/linear-red/plus.svg";
import SearchBar from "./common/searchBar";
import MenuPopUp from "./common/MenuPopUp";
import PopUpAdd from "./common/PopUpAdd";
import PopUpEdit from "./common/PopUpEdit";
import PopUpDelete from "./common/PopUpDelete";
import {
  createUpdateCategoryAddOns,
  deleteCategoryAddOns,
  getCategoryAddOns,
  createUpdateSubCategoryAddOns,
  deleteSubCategoryAddOns,
} from "../ApiServicesAddOns";
import ModalLoader from "../../../components/ModalLoader";
import LoadingView from "../../../components/Loading/LoadingView";

const useStyles = makeStyles({
  rootPage: {
    padding: "30px 20px",
  },
  title: {
    fontFamily: "Barlow",
    fontWeight: 500,
    fontSize: 36,
    color: "#2B2F3C",
    marginBottom: 20,
  },
  boxCategory: {
    background: "#FFFFFF",
    boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
    borderRadius: "10px",
    // height: "560px",
  },
  titleCategory: {
    fontFamily: "Barlow",
    fontWeight: 500,
    fontSize: 22,
    padding: "12px 22px",
    background: "#FFFFFF",
    boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
    borderRadius: "10px 10px 0 0",
    color: "#2B2F3C",
  },
  categoryBox: {
    // width: "100%",
    height: "350px",
    overflowY: "scroll",
  },
  root: {
    "&$selected": {
      backgroundColor: "#FFF5F4",
    },
  },
  selected: {},
  addButton: {
    boxShadow: "0px -6px 6px rgba(232, 238, 255, 0.3)",
    // width: "100%",
    // height: "60px",
    padding: "16px 0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: 600,
    fontSize: 15,
    color: "#DC241F",
    cursor: "pointer",
  },
});

const Configuration = () => {
  const [dataCategory, setDataCategory] = useState([]);
  const [dataSubCategory, setDataSubCategory] = useState([]);

  const [inputCategory, setInputCategory] = useState("");
  const [inputSubCategory, setInputSubCategory] = useState("");

  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [isCategory, setIsCategory] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  const classes = useStyles();

  const [isLoadData, setLoadData] = useState(false);

  function loadingHandler(bool) {
    setLoadData(bool);
  }

  const onChangeInputCategory = (e) => {
    const { value } = e.target;
    setInputCategory(value);
  };

  const onChangeInputSubCategory = (e) => {
    const { value } = e.target;
    setInputSubCategory(value);
  };

  // add category & sub category
  const addCategoryHandler = (value, id) => {
    // add category
    if (isCategory) {
      createUpdateCategoryAddOns(loadingHandler, { categoryName: value }).then(
        (response) => {
          setShowAdd(false);
          setTimeout(() => {
            getCategoryApi();
          }, 3000);
        }
      );
    }
    // add sub category
    else {
      createUpdateSubCategoryAddOns(loadingHandler, {
        subConfigName: value,
        configId: id,
      }).then((response) => {
        setShowAdd(false);
        setTimeout(() => {
          onClickCategory(id);
        }, 3000);
      });
    }
  };

  const editCategoryHandler = (value, categoryId, subCategoryId) => {
    // edit category
    if (isCategory) {
      createUpdateCategoryAddOns(loadingHandler, {
        id: categoryId,
        categoryName: value,
      }).then((response) => {
        setShowEdit(false);
        setTimeout(() => {
          getCategoryApi();
        }, 3000);
      });
    }
    // edit sub category
    else {
      createUpdateSubCategoryAddOns(loadingHandler, {
        subConfigName: value,
        configId: categoryId,
        subConfigId: subCategoryId,
      }).then((response) => {
        setShowEdit(false);
        setTimeout(() => {
          onClickCategory(categoryId);
        }, 3000);
      });
    }
  };

  const deleteCategoryHandler = (categoryId, subCategoryId) => {
    // delete category
    if (isCategory) {
      deleteCategoryAddOns(loadingHandler, { id: categoryId }).then(
        (response) => {
          setShowDelete(false);
          setTimeout(() => {
            getCategoryApi();
          }, 3000);
        }
      );
    }
    // delete sub category
    else {
      deleteSubCategoryAddOns(loadingHandler, {
        subConfigId: subCategoryId,
      }).then((response) => {
        setShowDelete(false);
        setTimeout(() => {
          onClickCategory(categoryId);
        }, 3000);
      });
    }
  };

  const onClickCategory = (id) => {
    getCategoryAddOns(loadingHandler).then((res) => {
      const dataArr = res.data.data;
      const dataIndex = dataArr.findIndex((data) => data.categoryId == id);
      setDataSubCategory(dataArr[dataIndex].subCategory);
    });
  };

  const getCategoryApi = () => {
    getCategoryAddOns(loadingHandler).then((res) => {
      const dataPush = [];
      if (res.status == 200) {
        const dataArr = res.data.data;
        dataArr.map((item) => {
          dataPush.push({
            ...item,
          });
        });
        setDataCategory(dataPush);
      }
    });
  };

  useEffect(() => {
    getCategoryApi();
  }, []);

  return (
    <div className={classes.rootPage}>
      <Typography className={classes.title}>Configuration</Typography>
      <Grid container spacing={4}>
        <Grid item xs xm={6}>
          <Box className={classes.boxCategory}>
            <Typography className={classes.titleCategory}>Kategori</Typography>
            <Box>
              <SearchBar
                placeholder="Cari kategori"
                width={233}
                value={inputCategory}
                onChange={onChangeInputCategory}
                onSubmit={() => {}}
              />
              <Box className={classes.categoryBox}>
                {isLoadData ? (
                  <LoadingView />
                ) : (
                  <>
                    {dataCategory
                      .filter((data) =>
                        data.categoryName.toLowerCase().includes(inputCategory)
                      )
                      .map((data, idx) => (
                        <List component="nav" aria-label="Folder">
                          <ListItem
                            button
                            selected={data.categoryId === selectedCategory}
                            classes={{
                              root: classes.root,
                              selected: classes.selected,
                            }}
                            style={{ padding: "0 0 0 20px", cursor: "default" }}
                          >
                            <Grid item xs={12}>
                              <Grid
                                container
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                                onClick={() => {
                                  setSelectedCategory(data.categoryId);
                                }}
                              >
                                <Grid
                                  item
                                  style={{
                                    cursor: "pointer",
                                  }}
                                  onClick={() =>
                                    onClickCategory(data.categoryId)
                                  }
                                  xs={10}
                                >
                                  <Typography
                                    style={{
                                      fontWeight: 600,
                                      fontSize: 14,
                                      fontFamily: "Barlow",
                                      color: "#2B2F3C",
                                    }}
                                  >
                                    {data.categoryName}
                                  </Typography>
                                </Grid>

                                <Grid xs={2} style={{ textAlign: "end" }} item>
                                  <MenuPopUp
                                    editHandler={() => {
                                      setIsCategory(true);
                                      setShowEdit(true);
                                      setSelectedCategory(data.categoryId);
                                    }}
                                    deleteHandler={() => {
                                      setIsCategory(true);
                                      setShowDelete(true);
                                      setSelectedCategory(data.categoryId);
                                    }}
                                  />
                                </Grid>
                              </Grid>
                            </Grid>
                          </ListItem>
                        </List>
                      ))}
                  </>
                )}
              </Box>
              <div
                className={classes.addButton}
                onClick={() => {
                  setShowAdd(true);
                  setIsCategory(true);
                }}
              >
                Tambah Kategori <PlusIcon />
              </div>
            </Box>
          </Box>
        </Grid>
        <Grid item xs xm={6}>
          <Box className={classes.boxCategory}>
            <Typography className={classes.titleCategory}>
              Sub Kategori
            </Typography>
            <Box>
              <SearchBar
                placeholder="Cari Sub kategori"
                width={233}
                value={inputSubCategory}
                onChange={onChangeInputSubCategory}
                onSubmit={() => {}}
              />
              <Box className={classes.categoryBox}>
                {isLoadData ? (
                  <LoadingView />
                ) : (
                  <>
                    {!dataSubCategory.length ? (
                      <Typography
                        style={{ width: "100%", textAlign: "center" }}
                      >
                        Sub Category Kosong
                      </Typography>
                    ) : (
                      <>
                        {dataSubCategory
                          .filter((data) =>
                            data.subCategoryName
                              .toLowerCase()
                              .includes(inputSubCategory)
                          )
                          .map((data, idx) => (
                            <List component="nav" aria-label="Folder">
                              <ListItem
                                button
                                selected={
                                  data.subCategoryId === selectedSubCategory
                                }
                                classes={{
                                  root: classes.root,
                                  selected: classes.selected,
                                }}
                                style={{
                                  padding: "0 0 0 20px",
                                  cursor: "default",
                                }}
                              >
                                <Grid item xs={12}>
                                  <Grid
                                    container
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    style={{ cursor: "pointer" }}
                                    onClick={() =>
                                      setSelectedSubCategory(data.subCategoryId)
                                    }
                                  >
                                    <Grid item>
                                      <Typography
                                        style={{
                                          fontWeight: 600,
                                          fontSize: 14,
                                          fontFamily: "Barlow",
                                          color: "#2B2F3C",
                                        }}
                                      >
                                        {data.subCategoryName}
                                      </Typography>
                                    </Grid>

                                    <Grid item>
                                      <MenuPopUp
                                        editHandler={() => {
                                          setIsCategory(false);
                                          setShowEdit(true);
                                          setSelectedSubCategory(
                                            data.subCategoryId
                                          );
                                        }}
                                        deleteHandler={() => {
                                          setIsCategory(false);
                                          setShowDelete(true);
                                          setSelectedSubCategory(
                                            data.subCategoryId
                                          );
                                        }}
                                      />
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </ListItem>
                            </List>
                          ))}
                      </>
                    )}
                  </>
                )}
              </Box>
              <div
                className={classes.addButton}
                onClick={() => {
                  if (selectedCategory == null) {
                    alert("Pilih kategori terlebih dahulu!");
                  } else {
                    setShowAdd(true);
                    setIsCategory(false);
                  }
                }}
              >
                Tambah Sub Kategori <PlusIcon />
              </div>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <PopUpAdd
        type={isCategory ? "Kategori" : "Sub Kategori"}
        open={showAdd}
        onClose={() => setShowAdd(false)}
        onSubmit={addCategoryHandler}
        categoryId={selectedCategory}
      />
      <PopUpEdit
        type={isCategory ? "Kategori" : "Sub Kategori"}
        open={showEdit}
        onClose={() => setShowEdit(false)}
        onSubmit={editCategoryHandler}
        categoryId={selectedCategory}
        subCategoryId={selectedSubCategory}
      />
      <PopUpDelete
        type={isCategory ? "Kategori" : "Sub Kategori"}
        open={showDelete}
        onClose={() => setShowDelete(false)}
        onSubmit={deleteCategoryHandler}
        categoryId={selectedCategory}
        subCategoryId={selectedSubCategory}
      />
    </div>
  );
};

export default Configuration;
