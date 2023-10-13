import {
  Box,
  Button,
  Grid,
  makeStyles,
  Typography,
  CardActionArea,
} from "@material-ui/core";
import constansts from "../../../../helpers/constants";
import { ReactComponent as BackIcon } from "../../../../assets/icons/general/arrow_back_red.svg";
import { ReactComponent as DocumentIcon } from "../../../../assets/images/document.svg";
import { ReactComponent as FileIcon } from "../../../../assets/icons/linear-red/file-text.svg";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { dummyDocument } from "../dummyData";
import FloatingChat from "../../../../components/GeneralComponent/FloatingChat";
import AddButton from "../../../../components/Button/AddButton";
import ModalUpload from "../common/ModalUpload";
import { getDetailFolderDocControl } from "../../serviceFileManagement";
import LoadingState from "../../../../components/Loading/LoadingState";
import EmptyState from "../../../../components/EmptyState";
import moment from "moment";
import { doUploadDocument } from "../../../Implementation/ApiServiceImplementation";
import { uploadDocControl } from "../../serviceFileManagement";
import MinioDocComponent from "../../../../components/MinioDocComponent";
import getMinioFile from "../../../../helpers/getMinioFile";

const useStyles = makeStyles({
  root: {
    padding: "30px 20px 20px 30px",
  },
  backLabel: {
    fontSize: 17,
    color: constansts.color.primaryHard,
    marginLeft: 5,
    textTransform: "capitalize",
  },
  titleContainer: {
    marginBottom: 25,
  },
  title: {
    fontFamily: "Barlow",
    fontWeight: 500,
    fontSize: 36,
    color: "#2B2F3C",
  },
});

const FolderViewDocControl = () => {
  const classes = useStyles();
  const [documents, setDocuments] = useState([]);
  const [headerCard, setHeaderCard] = useState({
    folderName: "",
    createdAt: "",
  });
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [inputUpload, setInputUpload] = useState(null);
  const [renderPage, setRenderPage] = useState(false);
  const { id } = useParams();
  const history = useHistory();

  const loaderHandler = (bool) => setIsLoading(bool);

  const onChangeUpload = (e) => {
    setInputUpload(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  const onUpload = async () => {
    if (!inputUpload) return alert("file tidak boleh kosong!");
    const payload = {};
    payload.folderId = id;
    payload.filename = inputUpload.name;
    await doUploadDocument(inputUpload).then((res) => {
      if (res.status === 200) payload.attach = `["${res.data.path}"]`;
    });

    await uploadDocControl(loaderHandler, payload)
      .then((res) => {
        if (res?.status === 200) {
          setInputUpload(null);
          setOpenModal(false);
          setRenderPage(!renderPage);
        }
      })
      .catch((error) => console.log("error", error));
  };

  const onCloseModal = () => {
    setOpenModal(false);
    setInputUpload(null);
  };

  // useEffect(() => {
  //   const findIndex = dummyDocument.findIndex((doc) => doc.id == id);
  //   setDocuments([dummyDocument[findIndex]]);
  // }, []);

  const handleActioDocControl = (id, fileName, attachment) => {
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

  // fetching data
  useEffect(() => {
    getDetailFolderDocControl(loaderHandler, id).then((res) => {
      if (res?.status === 200) {
        const { data } = res;
        setHeaderCard({
          folderName: data.folderName,
          createdAt: data.createdAt,
        });
        setDocuments(data.file);
      }
    });
  }, [renderPage]);

  return (
    <Box className={classes.root}>
      <Grid item style={{ display: "flex", justifyContent: "space-between" }}>
        <Button onClick={() => history.push("/file-management/doc-control")}>
          <BackIcon />
          <Typography className={classes.backLabel}>Back</Typography>
        </Button>
        <AddButton label={"Upload File"} onClick={() => setOpenModal(true)} />
      </Grid>
      <Grid item className={classes.titleContainer}>
        <Typography className={classes.title}>Document Control</Typography>
      </Grid>
      <Grid container>
        <Box
          style={{
            width: "100%",
            padding: 30,
            backgroundColor: constansts.color.white,
            borderRadius: 10,
            minHeight: 526,
          }}
        >
          {isLoading ? (
            <LoadingState />
          ) : (
            <>
              {headerCard.createdAt && (
                <Grid container>
                  <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                    style={{
                      borderBottom: "1px solid #BCC8E7",
                      paddingBottom: 12,
                    }}
                  >
                    <Grid item>
                      <Box
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <DocumentIcon />
                        <Typography
                          style={{
                            fontWeight: 500,
                            fontSize: 24,
                            marginLeft: 5,
                          }}
                        >
                          {headerCard.folderName}
                        </Typography>
                      </Box>
                    </Grid>
                    <Typography style={{ fontSize: 15 }}>
                      {moment(headerCard.createdAt).format("ll")}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    {documents.length > 0 ? (
                      <>
                        {documents.map((file) => (
                          <Box
                            style={{
                              display: "flex",
                              alignItems: "center",
                              marginTop: 24,
                              cursor: "pointer",
                            }}
                            onClick={() =>
                              handleActioDocControl(
                                file.id,
                                file.fileName,
                                file.attachment
                              )
                            }
                          >
                            <FileIcon />
                            <Typography
                              style={{
                                marginLeft: 4,
                                fontSize: 18,
                                fontWeight: 400,
                                fontFamily: "Barlow",
                              }}
                            >
                              {file?.fileName}
                            </Typography>
                          </Box>
                        ))}
                      </>
                    ) : (
                      <EmptyState />
                    )}
                  </Grid>
                </Grid>
              )}
            </>
          )}
        </Box>
      </Grid>
      <ModalUpload
        isOpen={openModal}
        onClose={onCloseModal}
        value={inputUpload}
        onChange={onChangeUpload}
        onSubmit={onUpload}
      />
      {/* <FloatingChat /> */}
    </Box>
  );
};

FolderViewDocControl.propTypes = {};

export default FolderViewDocControl;
