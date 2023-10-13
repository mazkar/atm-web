import { Box, Button, Grid, makeStyles, Typography } from "@material-ui/core";
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
import { doGetFolderDocProject } from "../../serviceFileManagement";
import LoadingView from "../../../../components/Loading/LoadingView";
import useTimestampConverter from "../../../../helpers/useTimestampConverter";

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

const FolderViewDocProject = () => {
  const classes = useStyles();
  const [openModal, setOpenModal] = useState(false);
  const { id } = useParams();
  const history = useHistory();

  const [dataDocument, setDataDocument] = useState([]);

  // INIT STATE
  const [isLoading, setIsLoading] = useState(true); /* <------- loading Table */
  function loaderHandler(loaderValue) {
    setIsLoading(loaderValue);
  }

  useEffect(() => {
    doGetFolderDocProject(loaderHandler, id).then((res) => {
      console.log(res.data);
      // const dataObject = res.data;
      loaderHandler(true);
      if (res.status == 200) {
        setDataDocument([res.data]);
        setTimeout(() => {
          // console.log(dataObject);
          loaderHandler(false);
        }, 3000);
      }
    });
  }, []);
  return (
    <Box className={classes.root}>
      <Grid item style={{ display: "flex", justifyContent: "space-between" }}>
        <Button style={{ padding: 0 }} onClick={() => history.goBack()}>
          <BackIcon />
          <Typography className={classes.backLabel}>Back</Typography>
        </Button>
        {/* <AddButton label={"Upload File"} onClick={()=>setOpenModal(true)} /> */}
      </Grid>
      <Grid item className={classes.titleContainer}>
        <Typography className={classes.title}>Document Project</Typography>
      </Grid>
      <Grid container>
        <Box
          style={{
            width: "100%",
            padding: 30,
            backgroundColor: constansts.color.white,
            borderRadius: 10,
          }}
        >
          {isLoading ? (
            <LoadingView maxheight="100%" />
          ) : (
            <>
              {dataDocument.map((data) => (
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
                          {data.folderName}
                        </Typography>
                      </Box>
                    </Grid>
                    <Typography style={{ fontSize: 15 }}>
                      {data.createdAt
                        ? useTimestampConverter(
                            data.createdAt / 1000,
                            "DD MMM YYYY"
                          )
                        : "-"}
                    </Typography>
                  </Grid>
                  <Grid item>
                    {data.file.map((item) => (
                      <Box
                        key={item.idFile}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginTop: 24,
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          history.push(
                            `/file-management/preview/project/${item.idFile}`
                          )
                        }
                      >
                        <FileIcon />
                        <Typography style={{ marginLeft: 4, fontSize: 18 }}>
                          {item.fileName}
                        </Typography>
                      </Box>
                    ))}
                  </Grid>
                </Grid>
              ))}
            </>
          )}
        </Box>
      </Grid>
      <ModalUpload isOpen={openModal} onClose={() => setOpenModal(false)} />
      {/* <FloatingChat /> */}
    </Box>
  );
};

FolderViewDocProject.propTypes = {};

export default FolderViewDocProject;
