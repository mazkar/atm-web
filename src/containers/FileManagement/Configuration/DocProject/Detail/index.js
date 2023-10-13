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
import Constants from "../../../../../helpers/constants";
import * as ThemeColor from "../../../../../assets/theme/colors";
import { useHistory } from "react-router-dom";
import MenuPopUp from "../../../../EnvironmentPremises/StandarisasiPremises/common/MenuPopUp";
import { ReactComponent as Plus } from "../../../../../assets/icons/linear-red/plus.svg";
import MuiIconLabelButton from "../../../../../components/Button/MuiIconLabelButton";
import AddFolder from "../../../../../components/Modal/AddCategory";
import { ReactComponent as LeftArrow } from "../../../../../assets/icons/linear-red/arrow-left.svg";
import { ReactComponent as FileArticle } from "../../../../../assets/icons/duotone-red/file-article.svg";
import { useParams } from "react-router-dom";
import ViewImage from "../../../DocPreview/ViewImage";
import ViewPdf from "../../../DocPreview/ViewPdf";
import ViewDownload from "../../../DocPreview/DownloadFile";
import { getDetailFolderDocProject } from "../../../serviceFileManagement";
import LoadingState from "../../../../../components/Loading/LoadingState";
import EmptyState from "../../../../../components/EmptyState";
import PopUpConfirmation from "../../../../../components/PopUpConfirmation";
import { removeFileDocProject } from "../../../serviceFileManagement";

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
  col: {
    display: "flex",
    alignItems: "center",
  },
});

const dummyDetailFolders = {
  id: 1,
  name: "Folder A",
  artikel: [
    {
      artId: 1,
      name: "Article CIMB.pdf",
      url: "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf",
    },
    {
      artId: 2,
      name: "Article CIMB.pdf",
      url: "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf",
    },
    {
      artId: 3,
      name: "New ATM.jpg",
      url: "https://photo.kontan.co.id/photo/2012/04/20/1892677426p.jpg",
    },
    {
      atmId: 4,
      name: "Logo CIMB Syariah.png",
      url: "https://www.pinhome.id/pages/wp-content/uploads/2021/12/CIMB-Niaga-Syariah-1-1-e1638329387366.png",
    },
    {
      atmId: 5,
      name: "Document.doc",
      url: "https://www.pinhome.id/pages/wp-content/uploads/2021/12/CIMB-Niaga-Syariah-1-1-e1638329387366.doc",
    },
  ],
};

function DetailConfigurationDocProject(props) {
  const { id } = useParams();
  const history = useHistory();
  const {
    location: { hash },
  } = history;
  const classes = UseStyles();

  //STATE
  const [selectedFolder, setSelectedFolder] = useState(0);
  const [hiddenFile, setHiddenFile] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [isAddFolder, setIsAddFolder] = useState(false);
  const [urlFile, setUrlFile] = useState("");
  const [title, setTitle] = useState("Document");
  const [extension, setExtension] = useState("");
  const [inputCategory, setInputCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [dataAPI, setDataAPI] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [fileId, setFileId] = useState(null);
  const [renderPage, setRenderPage] = useState(false);

  // CONTENT TABS
  const hashValues = ["docControl"];
  const index = hashValues.indexOf(hash.replace("#", ""));
  const tabValue = index >= 0 ? index : 0;
  const ContentTabs = withStyles({
    indicator: {
      display: "flex",
      justifyContent: "center",
      backgroundColor: "transparent",
      "& > span": {
        width: "100%",
        backgroundColor: ThemeColor.PrimaryHard,
      },
    },
  })((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

  const ContentTab = withStyles((theme) => ({
    root: {
      textTransform: "none",
      fontSize: 17,
      fontWeight: 600,
      marginRight: theme.spacing(1),
      color: Constants.color.grayMedium,
      "&:hover": {
        color: Constants.color.dark,
        opacity: 1,
      },
      "&$selected": {
        color: Constants.color.dark,
      },
    },
    selected: {},
  }))((props) => <Tab disableRipple {...props} />);

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3} style={{ padding: "24px 0px 0px 0px" }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  //END CONTENT TABS

  // function handler
  const handleEdit = () => {
    setModalOpen(true);
  };
  const handleDelete = (idFile) => {
    setFileId(idFile);
    setIsOpenModal(true);
    console.log(idFile);
  };

  const handleDeleteSubmit = async (e) => {
    e.preventDefault();
    await removeFileDocProject(loaderHandler, { id: fileId }).then((res) => {
      if (res)
        if (res.status === 200) {
          setIsOpenModal(false);
          setRenderPage(!renderPage);
        }
    });
  };

  function handleCloseAction() {
    setModalOpen(false);
  }

  const handleChangeInput = (data) => {
    setInputCategory(data);
  };

  const handleSubmit = () => {
    console.log("berhasil ditambah");
  };

  const handleShow = (name, url) => {
    console.log(url);
    setExtension(url.slice(url.length - 4));
    setUrlFile(url);
    setTitle(name);
    setHiddenFile(false);
  };

  const handleCloseModal = () => setIsOpenModal(false);

  const handleDownload = () => {};

  const loaderHandler = (bool) => setIsLoading(bool);

  const convertToUI = (data) => {
    const obj = {};
    obj.id = data.id;
    obj.name = data.folderName;
    const files = [];
    data.file.map((item) => {
      const objChild = {};
      objChild.artId = item.idFile;
      objChild.name = item.fileName;
      files.push(objChild);
    });
    obj.artikel = files;

    return obj;
  };

  useEffect(() => {
    getDetailFolderDocProject(loaderHandler, id)
      .then((res) => {
        if (res.status === 200) {
          setDataAPI(convertToUI(res.data));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [renderPage]);

  return (
    <div className={classes.rootPage}>
      <PopUpConfirmation
        isOpen={isOpenModal}
        message="Anda yakin akan menghapus?"
        desc="Anda tidak dapat membatalkan tindakan ini"
        onClose={handleCloseModal}
        onLeave={handleCloseModal}
        onSubmit={handleDeleteSubmit}
      />
      {hiddenFile ? (
        <>
          <Grid container direction="column" className={classes.titleContainer}>
            <Grid item style={{ marginBottom: 20 }}>
              <MuiIconLabelButton
                label="Back"
                iconPosition="startIcon"
                buttonIcon={<LeftArrow />}
                onClick={() => {
                  history.push("/file-management/configuration#docControl");
                }}
                style={{
                  background: "inherit",
                  color: "#DC241F",
                  padding: 0,
                  marginTop: 10,
                }}
              />
            </Grid>
            <Grid item>
              <Typography className={classes.title}>Configuration</Typography>
            </Grid>
          </Grid>

          {/* tab */}
          <Grid
            container
            direction="column"
            className={classes.titleContainer}
            style={{ marginTop: 25 }}
          >
            <Grid item xs={12}>
              <ContentTabs value={tabValue} aria-label="simple tabs example">
                <ContentTab label="Doc Project" {...a11yProps(0)} />
              </ContentTabs>
            </Grid>

            <TabPanel value={tabValue} index={0}>
              <Grid item xs={12} style={{ marginTop: 25 }}>
                <Paper elevation={1} className={classes.folderBox}>
                  {isLoading ? (
                    <LoadingState />
                  ) : (
                    <>
                      {!dataAPI ? (
                        <EmptyState />
                      ) : (
                        <>
                          <Typography className={classes.allFolder}>
                            {dataAPI?.name}
                          </Typography>
                          <Grid
                            container
                            direction="column"
                            style={{ overflow: "auto", height: 500 }}
                          >
                            <Grid item xs={12}>
                              {/* item folder */}
                              {dataAPI?.artikel.map((item, index) => (
                                <List component="nav" aria-label="Folder">
                                  <ListItem
                                    button
                                    selected={index === selectedFolder}
                                    // onClick={() => handleShow(item.name, item.url)}
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
                                          <div className={classes.col}>
                                            <FileArticle />
                                            <Typography
                                              style={{
                                                fontWeight: 600,
                                                fontSize: 14,
                                                fontFamily: "Barlow",
                                                color: "#2B2F3C",
                                                marginLeft: 5,
                                              }}
                                            >
                                              {item?.name}
                                            </Typography>
                                          </div>
                                        </Grid>
                                        <Grid item>
                                          <MenuPopUp
                                            editHandler={() =>
                                              history.push(
                                                `/file-management/configuration/edit-file/doc-project/${id}-${item?.artId}`
                                              )
                                            }
                                            deleteHandler={() =>
                                              handleDelete(item?.artId)
                                            }
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
                        </>
                      )}
                    </>
                  )}
                </Paper>
                <AddFolder
                  isOpen={modalOpen}
                  handleClose={handleCloseAction}
                  label={isAddFolder ? "Tambah File" : "Edit File"}
                  placeholder="Nama Folder"
                  valInput={inputCategory}
                  handleChange={handleChangeInput}
                  handleSubmit={handleSubmit}
                  handleCancel={handleCloseAction}
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
                        label="Tambah File"
                        iconPosition="endIcon"
                        buttonIcon={<Plus />}
                        style={{
                          background: "inherit",
                          color: "#DC241F",
                          padding: 0,
                          marginTop: 10,
                        }}
                        onClick={() =>
                          history.push(
                            `/file-management/configuration/add-file/doc-project/${id}`
                          )
                        }
                      />
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </TabPanel>
          </Grid>
        </>
      ) : (
        <Grid container direction="column" className={classes.titleContainer}>
          <Grid item style={{ marginBottom: 20 }}>
            <MuiIconLabelButton
              label="Back"
              iconPosition="startIcon"
              buttonIcon={<LeftArrow />}
              onClick={() => setHiddenFile(true)}
              style={{
                background: "inherit",
                color: "#DC241F",
                padding: 0,
                marginTop: 10,
              }}
            />
          </Grid>
          <Grid item>
            <Typography className={classes.title}>Configuration</Typography>
          </Grid>
          <Grid item xs={12}>
            {extension === ".pdf" ? (
              <ViewPdf title={title} urlPdf={urlFile} />
            ) : extension === ".jpg" ? (
              <ViewImage title={title} urlFile={urlFile} />
            ) : extension === ".png" ? (
              <ViewImage title={title} urlFile={urlFile} />
            ) : extension === ".jpeg" ? (
              <ViewImage title={title} urlFile={urlFile} />
            ) : (
              <ViewDownload
                title={title}
                label="Download File"
                handleDownload={handleDownload}
              />
            )}
          </Grid>
        </Grid>
      )}
    </div>
  );
}

export default DetailConfigurationDocProject;
