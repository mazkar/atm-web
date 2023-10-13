import React, { useState, useEffect } from "react";
import { Box, Button, makeStyles, Paper } from "@material-ui/core";
import { Grid, Typography } from "@material-ui/core";
import { ChkySearchBar } from "../../../components";
import { PrimaryHard } from "../../../assets/theme/colors";
import CardFolder from "../../../components/Card/CardFolder";
import { useHistory } from "react-router-dom";
import { doOverviewKnowledgeBase } from "../serviceFileManagement";
import SearchBar from "./SearchBar";
import LoadingView from "../../../components/Loading/LoadingView";

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
  buttonSearch: {
    padding: "8px 20px",
    borderRadius: 8,
    color: "#fff",
    fontSize: 13,
    fontWeight: 600,
    backgroundColor: PrimaryHard,
    textTransform: "capitalize",
    display: "inline",
  },
  rootContent: {
    padding: 20,
    borderRadius: 10,
    marginTop: 30,
  },
  folder: {
    backgroundColor: "#F4F7FB",
    borderRadius: 10,
    padding: 12,
  },
  col: {
    display: "flex",
    alignItems: "center",
  },
  countArticle: {
    padding: 6,
    borderRadius: 8,
    backgroundColor: "#fff",
    color: PrimaryHard,
    fontSize: 13,
    fontWeight: 500,
  },
  article: {
    fontSize: 13,
    fontWeight: 400,
    color: "#2B2F3C",
    fontFamily: "barlow",
  },
  buttonView: {
    borderColor: PrimaryHard,
    color: PrimaryHard,
    width: "100%",
    textTransform: "capitalize",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: "5px 0px",
  },
});

function KnowlwdgeBase(props) {
  const classes = UseStyles();
  const history = useHistory();

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputSearch, setInputSearch] = useState("");
  const [valueEvent, setValueEvent] = useState("");

  // Loading Handler
  const loadingHandler = (loadValue) => {
    setIsLoading(loadValue);
  };

  const handleView = (id) => {
    history.push(`/file-management/knowledge-base/${id}`);
  };

  const handleChangeKey = (event) => {
    setInputSearch(event);
    setValueEvent(event);
  };

  useEffect(() => {
    doOverviewKnowledgeBase(loadingHandler, { keyword: inputSearch }).then(
      (response) => {
        console.log(response);
        if (response) {
          if (response.responseCode === "200") {
            const { content } = response;
            const namaFolder = content[0].file[0].folderName;
            console.log(namaFolder);
            const dataRow = [];
            content.map((item) => {
              const newRow = {
                id: item.idFolder,
                folderName: item.file[0].folderName,
                jmlArticle: item.countFile,
                articles:
                  item.file.length > 1
                    ? [item.file[0], item.file[1]]
                    : item.file,
                tanggal: item.file[0].createdAt,
              };
              dataRow.push(newRow);
            });
            setData(dataRow);
          }
        }
      }
    );
  }, [inputSearch]);

  useEffect(() => {
    console.log(data.articles);
  }, []);

  return (
    <div className={classes.root}>
      <Grid container direction="column" className={classes.titleContainer}>
        <Grid item>
          <Typography className={classes.title}>Knowledge Based</Typography>
        </Grid>
        <Grid
          item
          xs={12}
          style={{ marginTop: 60, display: "flex", justifyContent: "center" }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <SearchBar
              placeholder="Pencarian berdasarkan nama folder atau artikel"
              width={430}
              onKeywordChange={handleChangeKey}
              value={inputSearch}
            />
          </div>
        </Grid>
      </Grid>
      {/* content */}
      <Paper className={classes.rootContent}>
        {isLoading ? (
          <LoadingView />
        ) : (
          <CardFolder
            data={data}
            jmlColumn={2}
            handleView={handleView}
            isLoading={isLoading}
          />
        )}
      </Paper>
    </div>
  );
}
export default KnowlwdgeBase;
