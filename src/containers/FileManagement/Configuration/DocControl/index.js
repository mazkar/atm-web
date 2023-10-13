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
  doAddFolderDocControl,
  doGetFolderDocControl,
} from "../../serviceFileManagement";
import LoadingView from "../../../../components/Loading/LoadingView";
import EmptyImg from "../../../../assets/images/empty_data.png";
import PopUpSuccess from "../../../../components/PopupSucces";
import { doDeleteFolderDocControl } from "../../serviceFileManagement";

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

const ConfigurationDocControl = () => {
  const history = useHistory();
  const classes = UseStyles();

  //STATE
  const [data, setData] = useState([]);
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
    doDeleteFolderDocControl(loadingHandler, { id: idDelete })
      .then((response) => {
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

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleDetail = (indx) => {
    history.push(`/file-management/configuration/detail-doc-control/${indx}`);
  };

  const handleListItemClick = (indx) => {
    setSelectedFolder(indx);
    history.push(`/file-management/configuration/detail-doc-control/${indx}`);
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
        : doAddFolderDocControl(loadingHandler, {
            folderName: inputNameFolder,
          })
            .then((response) => {
              if (response) {
                if (response.responseCode === "200") {
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
        : doAddFolderDocControl(loadingHandler, {
            folderName: inputNameFolder,
            id: idEdit,
          })
            .then((response) => {
              if (response) {
                if (response.responseCode === "200") {
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

  useEffect(() => {
    doGetFolderDocControl(loadingHandler).then((response) => {
      console.log(response);
      if (response) {
        if (response.responseCode === "200") {
          const { data } = response;
          const dataRow = [];
          data.map((item) => {
            const newRow = {
              id: item.folderId,
              name: item.folderName,
              artikels: item.files,
            };
            dataRow.push(newRow);
          });
          setData(dataRow);
        }
      }
    });
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
                {data.length > 0 ? (
                  data.map((item, index) => (
                    <List component="nav" aria-label="Folder">
                      <ListItem
                        button
                        selected={index === selectedFolder}
                        classes={{
                          root: classes.root,
                          selected: classes.selected,
                        }}
                        style={{ padding: "0px 20px", cursor: "default" }}
                      >
                        <Grid item xs={12}>
                          <Grid
                            container
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                          >
                            <Grid
                              item
                              style={{ cursor: "pointer" }}
                              onClick={() => handleListItemClick(item.id)}
                            >
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
                                {item.artikels.length} Artikel
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
                  ))
                ) : (
                  <Grid
                    container
                    alignContent="center"
                    justify="center"
                    style={{ height: 500 }}
                    direction="column"
                  >
                    <img src={EmptyImg} alt="Empty" style={{ opacity: 0.4 }} />
                    <Typography
                      style={{
                        opacity: 0.3,
                        textAlign: "center",
                        fontSize: 11,
                        marginTop: 10,
                      }}
                    >
                      Empty
                    </Typography>
                  </Grid>
                )}
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

export default ConfigurationDocControl;
