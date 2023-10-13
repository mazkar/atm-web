import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Box, Button, makeStyles, Paper } from "@material-ui/core";
import { Grid, Typography } from "@material-ui/core";
import { PrimaryHard } from "../../../assets/theme/colors";
import { ReactComponent as Folder } from "../../../assets/icons/general/folder-documents.svg";
import { ReactComponent as FileArticle } from "../../../assets/icons/duotone-red/file-article.svg";
import LoadingView from "../../Loading/LoadingView";
import useTimestampConverter from "../../../helpers/useTimestampConverter";

const UseStyles = makeStyles({
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

function CardFolder({ data, jmlColumn, handleView, isLoading }) {
  const classes = UseStyles();

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <>
      <Grid container direction="row" spacing={3}>
        {data.map((item) => (
          <Grid
            item
            xs={12}
            md={
              jmlColumn === 1
                ? 12
                : jmlColumn === 2
                ? 6
                : jmlColumn === 3
                ? 4
                : jmlColumn === 4
                ? 3
                : 6
            }
          >
            {isLoading ? (
              <Paper elevation={0} className={classes.folder}>
                <LoadingView />
              </Paper>
            ) : (
              <Paper elevation={0} className={classes.folder}>
                <Grid container direction="column">
                  <Grid item>
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
                            {item.folderName}
                          </Typography>
                          <Typography className={classes.article}>
                            {item.tanggal
                              ? useTimestampConverter(
                                  item.tanggal / 1000,
                                  "DD MMM YYYY"
                                )
                              : "-"}
                          </Typography>
                        </div>
                      </div>
                      <Box className={classes.countArticle}>
                        {item.jmlArticle} Article
                      </Box>
                    </div>
                  </Grid>
                  {/* item article */}
                  {item.articles
                    ? item.articles.map((res, index) => (
                        <Grid
                          item
                          style={{ marginTop: 25, marginLeft: 10 }}
                          key={index}
                        >
                          <div className={classes.col}>
                            <FileArticle />
                            <Typography
                              className={classes.article}
                              style={{ marginLeft: 8 }}
                            >
                              {res.fileName}
                            </Typography>
                          </div>
                        </Grid>
                      ))
                    : null}

                  {/* end item article */}
                </Grid>
                <Grid item xs={12} style={{ marginTop: 25 }}>
                  <Button
                    variant="outlined"
                    className={classes.buttonView}
                    onClick={() => handleView(item.id)}
                  >
                    View All
                  </Button>
                </Grid>
              </Paper>
            )}
          </Grid>
        ))}
      </Grid>
    </>
  );
}

CardFolder.PropTypes = {
  jmlColumn: PropTypes.number,
  handleView: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default CardFolder;
