import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/styles";
import {
  Typography,
  Grid,
  Tabs,
  Tab,
  Box,
  Button,
  Paper,
  List,
  ListItem,
} from "@material-ui/core";
import Constants from "../../../../helpers/constants";
import * as ThemeColor from "../../../../assets/theme/colors";
import { useHistory } from "react-router-dom";
import MenuPopUp from "../../../EnvironmentPremises/StandarisasiPremises/common/MenuPopUp";
import { ReactComponent as Plus } from "../../../../assets/icons/linear-red/plus.svg";
import MuiIconLabelButton from "../../../../components/Button/MuiIconLabelButton";
import AddFolder from "../../../../components/Modal/AddCategory";
import PopUpConfirmation from "../../../../components/PopUpConfirmation";
import { doAddAndUpdateFolderDocProject } from "../../serviceFileManagement";
import PopupSucces from "../../../../components/PopupSucces";
import LoadingView from "../../../../components/Loading/LoadingView";
import { doDeleteFolderDocProject } from "../../serviceFileManagement";
import { getFolderDocProject } from "../../serviceFileManagement";
import EmptyState from "../../../../components/EmptyState";
import LoadingState from "../../../../components/Loading/LoadingState";

const UseStyles = makeStyles({
  root: {
    "&$selected": {
      backgroundColor: "#FFF5F4",
    },
  },
  selected: {},
  rootPage: {
    padding: "30px 20px 20px 30px",
  },
  title: {
    fontFamily: "Barlow",
    fontWeight: 500,
    fontSize: 36,
    color: "#2B2F3C",
  },
  titleContainer: {
    marginBottom: 25,
  },
  folderBox: {
    borderRadius: "10px 10px 0px 0px",
    height: 550,
  },
  allFolder: {
    fontFamily: "Barlow",
    fontSize: 17,
    fontWeight: 600,
    color: "#2B2F3C",
    marginBottom: 25,
    padding: "20px 20px 0px 20px",
  },
  addButton: {
    padding: 20,
    borderRadius: "0px 0px 10px 10px",
  },
});

const dummyFolders = [
  {
    id: 1,
    name: "Folder 1",
    artikel: ["artikel 1", "artikel 2", "artikel 3"],
  },
  {
    id: 2,
    name: "Folder 2",
    artikel: ["artikel 1", "artikel 2", "artikel 3"],
  },
  {
    id: 3,
    name: "Folder 3",
    artikel: ["artikel 1", "artikel 2"],
  },
  {
    id: 4,
    name: "Folder 4",
    artikel: ["artikel 1", "artikel 2", "artikel 3"],
  },
  {
    id: 5,
    name: "Folder 5",
    artikel: ["artikel 1", "artikel 2", "artikel 3"],
  },
];

const ConfigurationDocProject = () => {
  const history = useHistory();
  const classes = UseStyles();

  //STATE
  const [selectedFolder, setSelectedFolder] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [isAddFolder, setIsAddFolder] = useState(false);
  const [inputCategory, setInputCategory] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [inputNameFolder, setInputNameFolder] = useState("");
  const [successUpload, setSuccessUpload] = useState(false);
  const [successEdit, setSuccessEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [idEdit, setIdEdit] = useState(null);
  const [idDelete, setIdDelete] = useState(null);
  const [successDelete, setSuccessDelete] = useState(false);
  const [dataAPI, setDataAPI] = useState(null);

  //function loading handler
  const loadingHandler = (loadValue) => {
    setIsLoading(loadValue);
  };

  // function handler
  // function handler
  const handleEdit = (id, name) => {
    setIdEdit(id);
    setIsAddFolder(false);
    setModalOpen(true);
    setInputNameFolder(name);
  };

  const handleDelete = (id) => {
    setOpenModal(true);
    setIdDelete(id);
  };

  const handleDeleteSubmit = (e) => {
    e.preventDefault();
    doDeleteFolderDocProject(loadingHandler, { id: idDelete })
      .then((response) => {
        console.log(response);
        if (response) {
          if (response.responseCode === "200") {
            setSuccessDelete(true);
            setTimeout(() => {
              setSuccessDelete(false);
              location.reload();
            }, 3000);
          }
        }
      })
      .catch((error) => {
        alert(`Gagal Hapus Folder ${error}`);
      });
  };

  const handleListItemClick = (indx) => {
    setSelectedFolder(indx);
  };

  function handleCloseAction() {
    setModalOpen(false);
  }

  const handleChangeInput = (data) => {
    setInputNameFolder(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    {
      inputNameFolder === ""
        ? alert("Nama Folder Kosong!")
        : doAddAndUpdateFolderDocProject(loadingHandler, {
            folderName: inputNameFolder,
          })
            .then((response) => {
              console.log(response);
              if (response) {
                if (response.status === 200) {
                  setSuccessUpload(true);
                  setTimeout(() => {
                    setSuccessUpload(false);
                    location.reload();
                  }, 3000);
                }
              }
            })
            .catch((error) => {
              alert(`Gagal Tambah Folder ${error}`);
            });
    }
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    {
      inputNameFolder === ""
        ? alert("Nama Folder Kosong!")
        : doAddAndUpdateFolderDocProject(loadingHandler, {
            folderName: inputNameFolder,
            id: idEdit,
          })
            .then((response) => {
              if (response) {
                if (response.status === 200) {
                  setSuccessEdit(true);
                  setTimeout(() => {
                    setSuccessEdit(false);
                    location.reload();
                  }, 3000);
                }
              }
            })
            .catch((error) => {
              alert(`Gagal Tambah Folder ${error}`);
            });
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenDelete = () => {
    setOpenModal(true);
  };

  const handleDetail = (index) => {
    history.push(`/file-management/configuration/detail-doc-project/${index}`);
  };

  const convertToUI = (dataRes) => {
    const dataArr = [];
    dataRes.map((data) => {
      const obj = {};
      obj.id = data.folderId;
      obj.name = data.folderName;
      obj.artikel = data.files;
      dataArr.push(obj);
    });

    return dataArr;
  };

  useEffect(() => {
    getFolderDocProject(loadingHandler)
      .then((res) => {
        if (res) {
          if (res.status === 200) setDataAPI(convertToUI(res.data.data));
        } else return;
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Grid item xs={12} style={{ marginTop: 25 }}>
        <Paper elevation={1} className={classes.folderBox}>
          <Typography className={classes.allFolder}>Semua Folder</Typography>
          <Grid
            container
            direction="column"
            style={{ overflow: "auto", height: 500 }}
          >
            <Grid item xs={12}>
              {/* item folder */}
              {isLoading ? (
                <LoadingState />
              ) : (
                <>
                  {!dataAPI ? (
                    <EmptyState />
                  ) : (
                    <>
                      {dataAPI.map((item, index) => (
                        <List component="nav" aria-label="Folder">
                          <ListItem
                            button
                            selected={index === selectedFolder}
                            onClick={() => handleListItemClick(index)}
                            classes={{
                              root: classes.root,
                              selected: classes.selected,
                            }}
                            style={{ padding: "0px 20px" }}
                          >
                            <Grid item xs={12}>
                              <Grid
                                container
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
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
                                    {item.name}
                                  </Typography>
                                  <Typography
                                    style={{
                                      fontWeight: 400,
                                      fontFamily: "Barlow",
                                      fontSize: 12,
                                      color: "#8D98B4",
                                    }}
                                  >
                                    {item.artikel.length} Artikel
                                  </Typography>
                                </Grid>

                                <Grid item>
                                  <MenuPopUp
                                    editHandler={() =>
                                      handleEdit(item.id, item.name)
                                    }
                                    deleteHandler={() => handleDelete(item.id)}
                                    detailHandler={() => handleDetail(item.id)}
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
              {/*end item folder */}
            </Grid>
          </Grid>
        </Paper>
        <AddFolder
          isOpen={modalOpen}
          handleClose={handleCloseAction}
          label={isAddFolder ? "Tambah Nama Folder" : "Edit Nama Folder"}
          placeholder="Nama Folder"
          valInput={inputNameFolder}
          titleLabel="Nama Folder"
          handleChange={handleChangeInput}
          handleSubmit={idEdit === null ? handleSubmit : handleSubmitEdit}
          handleCancel={handleCloseAction}
        />
        <PopUpConfirmation
          isOpen={openModal}
          message="Anda yakin akan menghapus?"
          desc="Anda tidak dapat membatalkan tindakan ini"
          onClose={handleCloseModal}
          onLeave={handleCloseModal}
          onSubmit={handleDeleteSubmit}
        />
        <PopupSucces
          isOpen={successUpload}
          message="Folder Berhasil di Tambah"
        />
        <PopupSucces isOpen={successEdit} message="Folder Berhasil di Edit" />
        <PopupSucces
          isOpen={successDelete}
          message="Folder Berhasil di Hapus"
        />
        <Paper className={classes.addButton}>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item>
              <MuiIconLabelButton
                label="Tambah Folder"
                iconPosition="endIcon"
                buttonIcon={<Plus />}
                onClick={() => {
                  setModalOpen(true);
                  setIsAddFolder(true);
                }}
                style={{
                  background: "inherit",
                  color: "#DC241F",
                  padding: 0,
                  marginTop: 10,
                }}
              />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </>
  );
};

export default ConfigurationDocProject;
