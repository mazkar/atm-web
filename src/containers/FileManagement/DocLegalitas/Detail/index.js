import React, { useState, useEffect } from "react";
import { Grid, makeStyles, Typography, Button } from "@material-ui/core";
import MuiIconLabelButton from "../../../../components/Button/MuiIconLabelButton";
import { ReactComponent as LeftArrow } from "../../../../assets/icons/linear-red/arrow-left.svg";
import { PrimaryHard } from "../../../../assets/theme/colors";
import { useHistory, useParams } from "react-router-dom";
import TabInfoDetail from "./TabInfoDetail";
import { ChkyTablePagination } from "../../../../components";
import { ReactComponent as PaperClip } from "../../../../assets/icons/general/paperclip_red.svg";
import { doGetDetailInfoSKPD } from "../../serviceFileManagement";
import LoadingView from "../../../../components/Loading/LoadingView";
import { doGetDetailSKPD } from "../../serviceFileManagement";
import useTimestampConverter from "../../../../helpers/useTimestampConverter";
import numeral from "numeral";
import getMinioFile from "../../../../helpers/getMinioFile";

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
});

const titleTable = [
  "Tahun",
  "Survey Object Pajak",
  "Proses Daftar",
  "Review SKPD",
  "Cetak SKPD",
  "Proses Bayar",
  "Attach SKPD & SSPD",
  "Pajak Awal Tahun Berikutnya",
  "Pajak Akhir Tahun Berikutnya",
  "Nilai Pajak",
  "Nilai Jasa",
];

const type = [
  "string",
  "string",
  "string",
  "string",
  "string",
  "node",
  "string",
  "string",
  "string",
  "string",
  "string",
];

const isSort = [
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
];

const columNameVar = [
  "tahun",
  "surveyPajak",
  "prosesDaftar",
  "reviewSKPD",
  "cetakSKPD",
  "prosesBayar",
  "attachSKPD",
  "nextPajakAwal",
  "nextPajakAkhir",
  "nilaiPajak",
  "nilaiJasa",
];

function Detail() {
  const classes = UseStyles();
  const history = useHistory();
  const { id } = useParams();
  const ids = id.split("-");
  const type = ids[0];
  const snaId = ids[1];
  const atmId = ids[2];

  //STATE
  const rowsPerPage = 10; //init rows per page
  const [data, setData] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [orderDirection, setOrderDirection] = useState("ASC");
  const [resetPageCounter, setResetPageCounter] = useState(0);
  const [sortBy, setSortBy] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dataInfo, setDataInfo] = useState({});
  const [dataPhotos, setDataPhotos] = useState([]);
  const [minioFile, setMinioFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [dataRequest, setDataRequest] = useState({
    pageNumber: 0,
    dataPerPage: 10,
    sortBy: "atmId",
    sortType: "ASC",
    atmId: atmId,
  });

  const loadingHandler = (loadValue) => {
    setIsLoading(loadValue);
  };

  //handleDetail
  const handleDetail = () => {
    history.push("/file-management/doc-legalitas");
  };

  //handle change
  const handleChangePage = (val) => {
    setCurrentPage(val);
  };
  //handle sort
  function handleSort(property) {
    return function actualFn(e) {
      const isActiveAndAsc = sortBy === property && orderDirection === "ASC";
      const { titleArr, colNameArr } = sortArray[tabValue];
      const colNumber = titleArr.indexOf(property);
      const columnName = colNameArr[colNumber];
      setOrderDirection(isActiveAndAsc ? "DESC" : "ASC");
      setSortBy(property);
      setOrderBy(columnName);
      setCurrentPage(0);
    };
  }

  // function download file
  //>>>>>>>>>>>>>>>>>>>>>>>>>function download file
  const document = async (documentFile, openFile) => {
    const filePath = documentFile;
    console.log("document", filePath);
    if (filePath) {
      try {
        getMinioFile(filePath).then((result) => {
          console.log(">>>> try getMinio Offering ", JSON.stringify(result));
          setMinioFile(result);
          setFileUrl(result.fileUrl);
          openFile(result.fileUrl);
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("Document does not exist");
    }
  };

  const openFile = (urlFile) => {
    window.open(urlFile, "_blank");
  };
  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>function download file

  useEffect(() => {
    doGetDetailSKPD(loadingHandler, dataRequest).then((response) => {
      console.log(response);
      if (response) {
        if (response.responseCode === "200") {
          setTotalRows(response.totalElements);
          setTotalPages(response.totalPages);
          const { content } = response;
          const dataRow = [];
          content.map((item) => {
            const newRow = {
              tahun: item.year ? item.year : "-",
              surveyPajak: item.taxObjectSurvey
                ? useTimestampConverter(
                    item.taxObjectSurvey / 1000,
                    "DD/MM/YYYY"
                  )
                : "-",
              prosesDaftar: item.registrationProcess
                ? useTimestampConverter(
                    item.registrationProcess / 1000,
                    "DD/MM/YYYY"
                  )
                : "-",
              reviewSKPD: item.reviewSkpd
                ? useTimestampConverter(item.reviewSkpd / 1000, "DD/MM/YYYY")
                : "-",
              cetakSKPD: item.printSkpd
                ? useTimestampConverter(item.printSkpd / 1000, "DD/MM/YYYY")
                : "-",
              prosesBayar: item.payProcess
                ? useTimestampConverter(item.payProcess / 1000, "DD/MM/YYYY")
                : "-",
              attachSKPD: (
                <Button
                  style={{
                    color: PrimaryHard,
                    textTransform: "capitalize",
                    backgroundColor: "transparent",
                    padding: 0,
                  }}
                  onClick={() => document(item.attachSkpd, openFile)}
                >
                  <PaperClip />{" "}
                  {item.attachSkpd ? item.attachSkpd.split("/")[5] : "-"}
                </Button>
              ),
              nextPajakAwal: item.nextStartDate
                ? useTimestampConverter(item.nextStartDate / 1000, "DD/MM/YYYY")
                : "-",
              nextPajakAkhir: item.nextEndDate
                ? useTimestampConverter(item.nextEndDate / 1000, "DD/MM/YYYY")
                : "-",
              nilaiPajak: `Rp ${numeral(item.taxValue).format("0,0")}`,
              nilaiJasa: `Rp ${numeral(item.serviceValue).format("0,0")}`,
            };
            dataRow.push(newRow);
          });
          setData(dataRow);
        }
      }
    });
  }, []);

  useEffect(() => {
    doGetDetailInfoSKPD(loadingHandler, snaId).then((response) => {
      console.log(response);
      if (response) {
        if (response.responseCode === "200") {
          setDataInfo(response);
          setDataPhotos(response.images);
        }
      }
    });
  }, []);

  return (
    <div className={classes.root}>
      <Grid container direction="column" className={classes.titleContainer}>
        <Grid item>
          <MuiIconLabelButton
            label="Back"
            iconPosition="startIcon"
            buttonIcon={<LeftArrow />}
            onClick={handleDetail}
            style={{ background: "inherit", color: PrimaryHard, padding: 0 }}
          />
        </Grid>

        <Grid item>
          <Typography className={classes.title} style={{ marginTop: 25 }}>
            SKPD Pajak
          </Typography>
        </Grid>
        {/* card SKPD Pajak */}
        <Grid item style={{ marginTop: 25 }}>
          {isLoading ? (
            <LoadingView />
          ) : (
            <TabInfoDetail
              dataInfo={dataInfo}
              dataPhotos={dataPhotos}
              atmId={atmId}
              type={type}
            />
          )}
        </Grid>
        <Grid item style={{ marginTop: 25 }} xs={12}>
          <ChkyTablePagination
            data={data}
            fields={titleTable}
            cellOption={type}
            isSort={isSort}
            totalPages={totalPages}
            totalRows={totalRows}
            rowsPerPage={rowsPerPage}
            order={orderDirection}
            resetPageCounter={resetPageCounter}
            changePage={handleChangePage}
            handleSort={handleSort}
            sortBy={sortBy}
            isUsingMuiSort
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default Detail;
