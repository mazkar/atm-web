import {
  Box,
  Grid,
  IconButton,
  InputBase,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import { ReactComponent as SearchIcon } from "../../../assets/icons/duotone-gray/search.svg";
import React, { useEffect, useState } from "react";
import { ChkyButtons } from "../../../components";
import FloatingChat from "../../../components/GeneralComponent/FloatingChat";
import { ReactComponent as DocumentIcon } from "../../../assets/images/document.svg";
import { ReactComponent as FileIcon } from "../../../assets/icons/linear-red/file-text.svg";
import { useHistory } from "react-router-dom";
import { doGetOverviewDocProject } from "../serviceFileManagement";
import useTimestampConverter from "../../../helpers/useTimestampConverter";
import LoadingView from "../../../components/Loading/LoadingView";

const useStyles = makeStyles({
  root: {
    padding: "30px 20px 20px 30px",
  },
  title: {
    fontFamily: "Barlow",
    fontWeight: 500,
    fontSize: 36,
    color: "#2B2F3C",
    marginBottom: 60,
  },
  wrapperInputSearch: {
    display: "flex",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    height: 40,
    width: 450,
    border: "none",
    boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3);",
  },
  iconButton: {
    color: "gray",
  },
  inputSearch: {
    // marginLeft: 8,
    flex: 1,
    fontSize: 13,
    width: 230,
    "& ::placeholder": {
      color: "#BCC8E7",
      opacity: 1,
      fontStyle: "italic",
    },
    border: "none",
  },
  container: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 30,
    marginTop: 40,
  },
  box: {
    backgroundColor: "#F4F7FB",
    width: "100%",
    height: "100%",
    borderRadius: 12,
    padding: 12,
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
  },
  docTitle: {
    color: "#2B2F3C",
    fontWeight: 500,
    fontSize: 15,
  },
  description: {
    color: "#2B2F3C",
    fontWeight: 400,
    fontSize: 13,
  },
  totalFile: {
    padding: 6,
    backgroundColor: "#FFFFFF",
    height: "min-content",
    borderRadius: 8,
    fontSize: 13,
    fontWeight: 500,
    color: "#DC241F",
  },
});

const DocProject = () => {
  const classes = useStyles();
  const history = useHistory();

  const [dataDocument, setDataDocument] = useState([]);

  const [inputSearch, setInputSearch] = useState("");

  // INIT STATE
  const [isLoading, setIsLoading] = useState(true); /* <------- loading Table */
  function loaderHandler(loaderValue) {
    setIsLoading(loaderValue);
  }

  useEffect(() => {
    const arrPush = [];
    doGetOverviewDocProject(loaderHandler, { keyword: "" }).then((res) => {
      loaderHandler(true);
      const arrData = res.data.content;
      console.log(res);
      if (res.status == 200) {
        arrData.map((data) => {
          arrPush.push({
            ...data,
          });
        });
        setDataDocument(arrPush);
        loaderHandler(false);
      }
    });
  }, []);
  return (
    <Box className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <Typography className={classes.title}>Document Project</Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container alignItems="center" justifyContent="center">
            <Grid item>
              <Paper className={classes.wrapperInputSearch}>
                <IconButton
                  type="submit"
                  className={classes.iconButton}
                  aria-label="search"
                >
                  <SearchIcon />
                </IconButton>
                <InputBase
                  className={classes.inputSearch}
                  placeholder="Pencarian berdasarkan nama folder atau artikel"
                  onChange={(e) => setInputSearch(e.target.value)}
                />
              </Paper>
            </Grid>
            <Grid item>
              <ChkyButtons
                onClick={() => {}}
                style={{ textTransform: "none", height: 40 }}
              >
                Search
              </ChkyButtons>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Box className={classes.container}>
            {isLoading ? (
              <LoadingView maxheight="100%" />
            ) : (
              <Grid container spacing={5}>
                {dataDocument
                  .filter((data) =>
                    data.file[0].folderName.toLowerCase().includes(inputSearch)
                  )
                  .map((document) => (
                    <Grid key={document.idFolder} item xs={4}>
                      <Box className={classes.box}>
                        <Box
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Box style={{ display: "flex" }}>
                            <DocumentIcon />
                            <Box style={{ marginLeft: 5 }}>
                              <Typography className={classes.docTitle}>
                                {document.file[0].folderName}
                              </Typography>
                              <Typography className={classes.description}>
                                {document.file[0].createdAt
                                  ? useTimestampConverter(
                                      document.file[0].createdAt / 1000,
                                      "DD MMM YYYY"
                                    )
                                  : "-"}
                              </Typography>
                            </Box>
                          </Box>
                          <Box className={classes.totalFile}>
                            {document.file[0].fileName != null ? document.countFile : 0} File
                          </Box>
                        </Box>
                        <Box>
                          {document.file[0].fileName != null ? (
                            document.file.map((item) => (
                              <Box
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  margin: "12px 7px",
                                }}
                              >
                                <FileIcon style={{ marginRight: 5 }} />
                                {item.fileName}
                              </Box>
                            ))
                          ) : (
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                height: 60,
                                alignItems: "center",
                              }}
                            >
                              <Typography
                                style={{
                                  fontSize: 24,
                                  fontWeight: 600,
                                  color: "#2B2F3C",
                                }}
                              >
                                Empty
                              </Typography>
                            </div>
                          )}
                        </Box>
                        <ChkyButtons
                          onClick={() => {
                            history.push(
                              `/file-management/doc-project/${document.idFolder}`
                            );
                          }}
                          buttonType="redOutlined"
                          style={{ width: "100%", textTransform: "none" }}
                        >
                          View All
                        </ChkyButtons>
                      </Box>
                    </Grid>
                  ))}
              </Grid>
            )}
          </Box>
        </Grid>
      </Grid>
      {/* <FloatingChat /> */}
    </Box>
  );
};

export default DocProject;
