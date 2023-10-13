import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { makeStyles, Typography, Paper, Grid, Button } from "@material-ui/core";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import PropTypes from "prop-types";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const UseStyles = makeStyles({
  root: {
    width: "100%",
    marginTop: "30px",
  },
  title: {
    fontFamily: "Barlow",
    fontSize: 32,
    fontWeight: 600,
    marginBottom: 30,
  },
});

function ViewPdf(props) {
  const { title, urlPdf } = props;
  const classes = UseStyles();

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offSet) {
    setPageNumber((prevPageNumber) => prevPageNumber + offSet);
  }

  function changePageBack() {
    if (pageNumber > 1) {
      changePage(-1);
    }
  }

  function changePageNext() {
    if (pageNumber < numPages) {
      changePage(+1);
    }
  }
  return (
    <div className={classes.root}>
      <Paper style={{ padding: 30 }}>
        <Typography className={classes.title}>{title}</Typography>
        <Document file={urlPdf} onLoadSuccess={onDocumentLoadSuccess}>
          <Page width="1400" pageNumber={pageNumber} />
        </Document>
      </Paper>
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        <Grid item>
          <Button onClick={changePageBack}>
            <NavigateBeforeIcon />
          </Button>
        </Grid>
        <Grid item>
          <Typography>
            {pageNumber} of {numPages}
          </Typography>
        </Grid>
        <Grid item>
          <Button onClick={changePageNext}>
            <NavigateNextIcon />
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

ViewPdf.PropTypes = {
  title: PropTypes.string.isRequired,
  urlPdf: PropTypes.string.isRequired,
};

export default ViewPdf;
