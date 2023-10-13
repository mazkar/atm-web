import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/styles";
import { Typography, Grid, Paper, List, ListItem } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import MenuPopUp from "../../../EnvironmentPremises/StandarisasiPremises/common/MenuPopUp";
import { ReactComponent as Plus } from "../../../../assets/icons/linear-red/plus.svg";
import MuiIconLabelButton from "../../../../components/Button/MuiIconLabelButton";
import AddFolder from "../../../../components/Modal/AddCategory";
import PopUpConfirmation from "../../../../components/PopUpConfirmation";
import {
  doAddAndUpdateFolderKnowledge,
  doDeleteFolderKnowledge,
  doGetFolderDocKnowledge,
} from "../../serviceFileManagement";
import LoadingView from "../../../../components/Loading/LoadingView";
import PopUpSuccess from "../../../../components/PopupSucces";

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

const ConfigurationKnowlegdeBase = () => {
  const history = useHistory();
  const classes = UseStyles();

  //STATE
  const [dataFolder, setDataFolder] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isAddFolder, setIsAddFolder] = useState(false);
  const [inputNameFolder, setInputNameFolder] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successUpload, setSuccessUpload] = useState(false);
  const [successDelete, setSuccessDelete] = useState(false);
  const [successEdit, setSuccessEdit] = useState(false);
  const [idDelete, setIdDelete] = useState(null);
  const [idEdit, setIdEdit] = useState(null);

  //function loading handler
  const loadingHandler = (loadValue) => {
    setIsLoading(loadValue);
  };

  // function handler
  const handleEdit = (id) => {
    setIdEdit(id);
    setIsAddFolder(false);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    setOpenModal(true);
    setIdDelete(id);
  };

  const handleDeleteSubmit = (e) => {
    e.preventDefault();
    doDeleteFolderKnowledge(loadingHandler, { id: idDelete })
      .then((response) => {
        if (response.status == 200) {
          setOpenModal(false);
          setSuccessDelete(true);
          setTimeout(() => {
            setSuccessDelete(false);
            getFolderDocKnowledge();
          }, 3000);
        }
      })
      .catch((error) => {
        alert(`Gagal Hapus Folder ${error}`);
      });
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleDetail = (indx) => {
    history.push(
      `/file-management/configuration/detail-knowledge-base/${indx}`
    );
  };

  function handleCloseAction() {
    setModalOpen(false);
  }

  const handleChangeInput = (data) => {
    setInputNameFolder(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputNameFolder == "") {
      alert("Input tidak boleh kosong!");
    } else {
      doAddAndUpdateFolderKnowledge(loadingHandler, {
        folderName: inputNameFolder,
      })
        .then((response) => {
          if (response.status == 200) {
            setModalOpen(false);
            setSuccessUpload(true);
            setTimeout(() => {
              setSuccessUpload(false);
              getFolderDocKnowledge();
            }, 3000);
          }
        })
        .catch((error) => {
          alert(`Gagal Tambah Folder ${error}`);
        });
    }
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    if (inputNameFolder == "") {
      alert("Input tidak boleh kosong!");
    } else {
      doAddAndUpdateFolderKnowledge(loadingHandler, {
        folderName: inputNameFolder,
        id: idEdit,
      })
        .then((response) => {
          if (response.status == 200) {
            setModalOpen(false);
            setSuccessEdit(true);
            setTimeout(() => {
              setSuccessEdit(false);
              getFolderDocKnowledge();
            }, 3000);
          }
        })
        .catch((error) => {
          alert(`Gagal Tambah Folder ${error}`);
        });
    }
  };

  const getFolderDocKnowledge = () => {
    doGetFolderDocKnowledge(loadingHandler).then((res) => {
      loadingHandler(true);
      const dataPush = [];
      if (res.status == 200) {
        const dataArr = res.data.data;
        dataArr.map((data) => {
          dataPush.push({
            ...data,
          });
        });
        setDataFolder(dataPush);
        loadingHandler(false);
      }
    });
  };

  useEffect(() => {
    getFolderDocKnowledge();
  }, []);

  return (
    <>
      <Grid item xs={12} style={{ marginTop: 25 }}>
        <Paper elevation={1} className={classes.folderBox}>
          <Typography className={classes.allFolder}>Semua Folder</Typography>
          {isLoading ? (
            <LoadingView />
          ) : (
            <Grid
              container
              direction="column"
              style={{ overflow: "auto", height: 500 }}
            >
              <Grid item xs={12}>
                {/* item folder */}
                {dataFolder.map((item, index) => (
                  <List component="nav" aria-label="Folder">
                    <ListItem
                      button
                      selected={index === selectedFolder}
                      onClick={() => setSelectedFolder(index)}
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
                              {item.folderName}
                            </Typography>
                            <Typography
                              style={{
                                fontWeight: 400,
                                fontFamily: "Barlow",
                                fontSize: 12,
                                color: "#8D98B4",
                              }}
                            >
                              {item.files.length} Artikel
                            </Typography>
                          </Grid>

                          <Grid item>
                            <MenuPopUp
                              editHandler={() => handleEdit(item.folderId)}
                              deleteHandler={() => handleDelete(item.folderId)}
                              detailHandler={() => {
                                handleDetail(item.folderId);
                              }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </ListItem>
                  </List>
                ))}
                {/*end item folder */}
              </Grid>
            </Grid>
          )}
        </Paper>
        <AddFolder
          isOpen={modalOpen}
          handleClose={handleCloseAction}
          label={isAddFolder ? "Tambah Nama Folder" : "Edit Nama Folder"}
          placeholder="Nama Folder"
          titleLabel="Nama Folder"
          valInput={inputNameFolder}
          handleChange={handleChangeInput}
          handleSubmit={idEdit === null ? handleSubmit : handleSubmitEdit}
          handleCancel={handleCloseAction}
        />
        <PopUpSuccess
          isOpen={successUpload}
          message="Folder Berhasil di Tambah"
        />
        <PopUpSuccess
          isOpen={successDelete}
          message="Folder Berhasil di Hapus"
        />
        <PopUpSuccess isOpen={successEdit} message="Folder Berhasil di Edit" />

        <PopUpConfirmation
          isOpen={openModal}
          message="Anda yakin akan menghapus?"
          desc="Anda tidak dapat membatalkan tindakan ini"
          onClose={handleCloseModal}
          onLeave={handleCloseModal}
          onSubmit={handleDeleteSubmit}
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

export default ConfigurationKnowlegdeBase;
