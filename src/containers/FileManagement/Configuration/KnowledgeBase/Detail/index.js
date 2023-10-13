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
import { doGetFolderDocKnowledge } from "../../../serviceFileManagement";
import LoadingView from "../../../../../components/Loading/LoadingView";

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
      title: "Lorem ipsum dolor sit amet.",
      file: "1 Doc Pdf",
      url: "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf",
    },
    {
      title: "Lorem ipsum dolor sit amet.",
      file: "1 Doc Jpg",
      url: "https://photo.kontan.co.id/photo/2012/04/20/1892677426p.jpg",
    },
    {
      title: "Lorem ipsum dolor sit amet.",
      file: "1 Doc Mp3",
      url: "file2.mp3",
    },
    {
      title: "Lorem ipsum dolor sit amet.",
      file: "1 Doc Word",
      url: "https://www.pinhome.id/pages/wp-content/uploads/2021/12/CIMB-Niaga-Syariah-1-1-e1638329387366.doc",
    },
    {
      title: "Lorem ipsum dolor sit amet.",
      file: "1 Doc Jpg",
      url: "https://photo.kontan.co.id/photo/2012/04/20/1892677426p.jpg",
    },
    {
      title: "Lorem ipsum dolor sit amet.",
      file: "1 Doc Mp3",
      url: "file1.mp3",
    },
  ],
};

function DetailConfigKnowledgeBase(props) {
  const { id } = useParams();
  const history = useHistory();
  const {
    location: { hash },
  } = history;
  const classes = UseStyles();

  //STATE
  const [dataFolder, setDataFolder] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [isAddFolder, setIsAddFolder] = useState(false);
  const [inputCategory, setInputCategory] = useState("");
  const [extension, setExtension] = useState("");
  const [urlFile, setUrlFile] = useState("");
  const [hiddenFile, setHiddenFile] = useState(true);
  const [title, setTitle] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const loadingHandler = (loadValue) => {
    setIsLoading(loadValue);
  };

  // CONTENT TABS
  const hashValues = ["knowledgeBase"];
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
  const handleDelete = () => {};

  const handleListItemClick = (indx) => {
    setSelectedFolder(indx);
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

  const handleDownload = () => {};

  useEffect(() => {
    doGetFolderDocKnowledge(loadingHandler).then((res) => {
      loadingHandler(true);
      const dataPush = [];
      if (res.status == 200) {
        const dataArr = res.data.data;
        const dataIndex = dataArr.findIndex((data) => data.folderId == id);
        dataArr.map((data) => {
          dataPush.push({
            ...data,
          });
        });
        setDataFolder(dataPush[dataIndex]);
        loadingHandler(false);
        // setTimeout(() => {
        //   console.log(dataPush[dataIndex].files);
        // }, 3000);
      }
    });
  }, []);

  return (
    <div className={classes.rootPage}>
      {hiddenFile ? (
        <>
          <Grid container direction="column" className={classes.titleContainer}>
            <Grid item style={{ marginBottom: 20 }}>
              <MuiIconLabelButton
                label="Back"
                iconPosition="startIcon"
                buttonIcon={<LeftArrow />}
                onClick={() => {
                  history.goBack();
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
                <ContentTab label="Knowledge Base" {...a11yProps(0)} />
              </ContentTabs>
            </Grid>

            <TabPanel value={tabValue} index={0}>
              <Grid item xs={12} style={{ marginTop: 25 }}>
                <Paper elevation={1} className={classes.folderBox}>
                  <Typography className={classes.allFolder}>
                    {dataFolder.folderName}
                  </Typography>
                  <Grid
                    container
                    direction="column"
                    style={{ overflow: "auto", height: 500 }}
                  >
                    {isLoading ? (
                      <LoadingView />
                    ) : (
                      <Grid item xs={12}>
                        {/* item folder */}
                        {dataFolder.files?.map((item, index) => (
                          <List component="nav" aria-label="Folder">
                            <ListItem
                              button
                              selected={index === selectedFolder}
                              onClick={() => {
                                setSelectedFolder(index);
                                // handleShow(item.file, item.url);
                              }}
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
                                      <div>
                                        <Typography
                                          style={{
                                            fontWeight: 600,
                                            fontSize: 14,
                                            fontFamily: "Barlow",
                                            color: "#2B2F3C",
                                            marginLeft: 12,
                                          }}
                                        >
                                          {item.fileName}
                                        </Typography>
                                        {item.attachment.map((document) => (
                                          <Typography
                                            style={{
                                              fontWeight: 400,
                                              fontSize: 14,
                                              fontFamily: "Barlow",
                                              color: "#8D98B4",
                                              marginLeft: 12,
                                            }}
                                          >
                                            {document ? document : "-"}
                                          </Typography>
                                        ))}
                                      </div>
                                    </div>
                                  </Grid>
                                  <Grid item>
                                    <MenuPopUp
                                      editHandler={() =>
                                        history.push(
                                          `/file-management/configuration/edit-file/knowledge-base/${id}-${item?.id}`
                                        )
                                      }
                                      deleteHandler={handleDelete}
                                      detailHandler={() =>
                                        history.push(
                                          `/file-management/preview/knowledge/${item.id}`
                                        )
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
                    )}
                  </Grid>
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
                        onClick={() =>
                          history.push(
                            `/file-management/configuration/add-file/knowledge-base/${id}`
                          )
                        }
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

export default DetailConfigKnowledgeBase;
