import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/styles";
import {
  Typography,
  Grid,
  Tabs,
  Tab,
  Box,
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
import { doGetDetailFolderDocControl } from "../../../serviceFileManagement";
import LoadingView from "../../../../../components/Loading/LoadingView";
import EmptyImg from "../../../../../assets/images/empty_data.png";
import getMinioFile from "../../../../../helpers/getMinioFile";

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

function DetailDocControl(props) {
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
  const [data, setData] = useState({});
  const [dataFiles, setDataFiles] = useState([]);

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

  //loading handler
  const loadingHandler = (loadValue) => {
    setIsLoading(loadValue);
  };

  // function handler
  const handleEdit = () => {
    setModalOpen(true);
  };
  const handleDelete = () => {};

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

  const handleDetailFile = (id, fileName, attachment) => {
    const extension = fileName.slice(fileName.length - 4);
    if (
      extension === ".jpg" ||
      extension === ".png" ||
      extension === "jpeg" ||
      extension === "docx" ||
      extension === "xlsx" ||
      extension === ".pdf"
    ) {
      getMinioFile(attachment[0]).then((result) => {
        window.location.assign(result.fileUrl);
      });
    } else {
      history.push(`/file-management/preview/control/${id}`);
    }
  };

  const handleClickUpload = () => {
    document.getElementById("uploadFile").click();
  };

  const handleBack = () => {
    history.push("/file-management/configuration");
  };

  useEffect(() => {
    doGetDetailFolderDocControl(loadingHandler, id).then((response) => {
      console.log(response);
      if (response) {
        if ((response.responseCode = "200")) {
          const content = response.data[0];
          setData(content);
          setDataFiles(content.files);
          console.log(content.files);
        }
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
                style={{
                  background: "inherit",
                  color: "#DC241F",
                  padding: 0,
                  marginTop: 10,
                }}
                onClick={handleBack}
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
                <ContentTab label="Doc Control" {...a11yProps(0)} />
              </ContentTabs>
            </Grid>

            <TabPanel value={tabValue} index={0}>
              <Grid item xs={12} style={{ marginTop: 25 }}>
                <Paper elevation={1} className={classes.folderBox}>
                  {isLoading ? (
                    <LoadingView />
                  ) : (
                    <>
                      <Typography className={classes.allFolder}>
                        {data.folderName}
                      </Typography>
                      {dataFiles.length < 1 ? (
                        <Grid
                          container
                          alignContent="center"
                          justify="center"
                          style={{ height: 500 }}
                          direction="column"
                        >
                          <img
                            src={EmptyImg}
                            alt="Empty"
                            style={{ opacity: 0.4 }}
                          />
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
                      ) : (
                        <Grid
                          container
                          direction="column"
                          style={{ overflow: "auto", height: 500 }}
                        >
                          <Grid item xs={12}>
                            {/* item folder */}
                            {dataFiles.map((item, index) => (
                              <List component="nav" aria-label="Folder">
                                <ListItem
                                  button
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
                                            {item.fileName}
                                          </Typography>
                                        </div>
                                      </Grid>
                                      <Grid item>
                                        <MenuPopUp
                                          editHandler={() =>
                                            history.push(
                                              `/file-management/configuration/edit-file/doc-project/${id}-${item?.id}`
                                            )
                                          }
                                          deleteHandler={handleDelete}
                                          detailHandler={() =>
                                            handleDetailFile(
                                              item.id,
                                              item.fileName,
                                              item.attachment
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
                        </Grid>
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
                            `/file-management/configuration/add-file/doc-control/${id}`
                          )
                        }
                      />
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </TabPanel>
          </Grid>
          <input
            id="uploadFile"
            type="file"
            accept=".xlsx, .xls, .jpg, .jpeg, .png, .pdf, .mp3"
            style={{ display: "none" }}
            onChange={(e) => {
              handleUpload(e);
            }}
          />
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

export default DetailDocControl;
