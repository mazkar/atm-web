import React, { useEffect, useState } from "react";
import {
  makeStyles,
  Grid,
  Typography,
  Paper,
  Divider,
  CardActionArea,
} from "@material-ui/core";
import MuiIconLabelButton from "../../../../components/Button/MuiIconLabelButton";
import { useHistory } from "react-router-dom";
import { ReactComponent as LeftArrow } from "../../../../assets/icons/linear-red/arrow-left.svg";
import { PrimaryHard } from "../../../../assets/theme/colors";
import { ReactComponent as Folder } from "../../../../assets/icons/general/folder-documents.svg";
import { ReactComponent as FileArticle } from "../../../../assets/icons/duotone-red/file-article.svg";
import { doGetDetailKnowledgeBase } from "../../serviceFileManagement";
import { useParams } from "react-router-dom";
import useTimestampConverter from "../../../../helpers/useTimestampConverter";
import LoadingView from "../../../../components/Loading/LoadingView";
import EmptyImg from "../../../../assets/images/empty_data.png";
import DocPreview from "../../DocPreview";
import { doGetDetailFileKnowledgeBase } from "../../serviceFileManagement";

const UseStyles = makeStyles({
  root: {
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
  rootContent: {
    padding: 45,
  },
  col: {
    display: "flex",
    alignItems: "center",
  },
  article: {
    fontSize: 13,
    fontWeight: 400,
    color: "#2B2F3C",
    fontFamily: "barlow",
  },
  titleImage: {
    fontFamily: "Barlow",
    fontSize: 32,
    fontWeight: 600,
    marginBottom: 30,
  },
  button: {
    color: "#fff",
    backgroundColor: PrimaryHard,
    textTransform: "capitalize",
    fontFamily: "Barlow",
  },
});

const Detail = () => {
  const classes = UseStyles();
  const history = useHistory();
  const { id } = useParams();

  const [data, setData] = useState([]);
  const [dataFile, setDataFile] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingFile, setLoadingFile] = useState(false);

  const loadingHandler = (loadValue) => {
    setIsLoading(loadValue);
  };

  const loadingFileHandler = (loadValue) => {
    setLoadingFile(loadValue);
  };

  const handleDetail = () => {
    history.push("/file-management/knowledge-base");
  };

  const handleShow = (id) => {
    history.push(`/file-management/preview/knowledge/${id}`);
  };

  useEffect(() => {
    doGetDetailKnowledgeBase(loadingHandler, id).then((response) => {
      console.log(response);
      if (response) {
        if (response.responseCode === "200") {
          setData(response);
          setDataFile(response.file);
        }
      }
    });
  }, []);

  return (
    <div className={classes.root}>
      <Grid container direction="column" className={classes.titleContainer}>
        <Grid item style={{ marginTop: 10 }}>
          <MuiIconLabelButton
            label="Back"
            iconPosition="startIcon"
            buttonIcon={<LeftArrow />}
            onClick={handleDetail}
            style={{ background: "inherit", color: PrimaryHard, padding: 0 }}
          />
        </Grid>
        <Grid item style={{ marginTop: 10 }}>
          <Typography className={classes.title}>Knowledge Based</Typography>
        </Grid>
        <Grid item style={{ marginTop: 20 }}>
          <Paper elevation={0} className={classes.rootContent}>
            {isLoading ? (
              <LoadingView />
            ) : (
              <>
                <Grid container direction="column">
                  <Grid item xs={12}>
                    <div
                      className={classes.col}
                      style={{ justifyContent: "space-between" }}
                    >
                      <div className={classes.col}>
                        <Folder />
                        <div style={{ marginLeft: 5 }}>
                          <Typography
                            style={{
                              fontSize: 15,
                              fontWeight: 500,
                              color: "#2B2F3C",
                              fontFamily: "barlow",
                            }}
                          >
                            {data.folderName}
                          </Typography>
                        </div>
                      </div>
                      <Typography
                        style={{
                          fontSize: 15,
                          fontWeight: 400,
                          color: "#2B2F3C",
                        }}
                      >
                        {data.createdAt
                          ? useTimestampConverter(
                              data.createdAt / 1000,
                              "DD MMM YYYY"
                            )
                          : "-"}
                      </Typography>
                    </div>
                  </Grid>
                </Grid>
                <Divider style={{ marginTop: 15, marginBottom: 5 }} />
                {dataFile.length > 0 ? (
                  dataFile.map((item, index) => (
                    <Grid
                      item
                      style={{ marginTop: 30, marginLeft: 10 }}
                      key={index}
                    >
                      <CardActionArea onClick={() => handleShow(item.idFile)}>
                        <div className={classes.col}>
                          <FileArticle />
                          <Typography
                            className={classes.article}
                            style={{ marginLeft: 8 }}
                          >
                            {item.fileName}
                          </Typography>
                        </div>
                      </CardActionArea>
                    </Grid>
                  ))
                ) : (
                  <Grid
                    container
                    alignContent="center"
                    justify="center"
                    style={{ height: "auto" }}
                    direction="column"
                  >
                    <img
                      src={EmptyImg}
                      alt="Empty"
                      style={{ marginTop: 20, opacity: 0.4 }}
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
                )}
              </>
            )}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Detail;
