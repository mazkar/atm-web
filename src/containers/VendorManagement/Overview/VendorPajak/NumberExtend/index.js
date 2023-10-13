import React, { useEffect, useState} from "react";
import { withRouter, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { Typography, Grid, makeStyles, Button } from "@material-ui/core";
import { ReactComponent as ObjectIcon } from "../../../../../assets/icons/duotone-red/numberObject.svg";
import MuiIconLabelButton from "../../../../../components/Button/MuiIconLabelButton";
import { ReactComponent as IconLeft } from "../../../../../assets/icons/linear-red/chevron-right.svg";
import useRupiahConverter from "../../../../../helpers/useRupiahConverter";
import TableObject from "../ObjectNumber/TableObject";
import { doGetObjectExtend } from "../../../ApiServices";

const useStyles = makeStyles(() => ({
  title: {
    fontSize: 18,
    fontWeight: 600,
  },
  col: {
    display: "flex",
    alignItems: "center",
  },
  paramButton: {
    width: "95px",
    height: "30px",
    color: "#DC241F",
    //backgroundColor: "white",
    height: 40,
    marginRight: 10,
    //border: "1px solid",
    //borderColor: Constants.color.primaryHard,
    borderRadius: 10,
    textTransform: "capitalize",
  },
}));
const dataTable = [
  {
    id: 1,
    atmID: "20129",
    alamat: "CIMBN.Indomaret.Meruya",
    kondisiATM: "New",
    pajakAwal: "01/01/2021",
    pajakAkhir: "23/03/2022",
    nilaiPajak: 15467879,
    status: "Done",
  },
  {
    id: 2,
    atmID: "20129",
    alamat: "CIMBN.Indomaret.Meruya",
    kondisiATM: "Termin",
    pajakAwal: "01/01/2021",
    pajakAkhir: "23/03/2022",
    nilaiPajak: 15467879,
    status: "Done",
  },
  {
    id: 3,
    atmID: "20129",
    alamat: "CIMBN.Indomaret.Meruya",
    kondisiATM: "Termin",
    pajakAwal: "01/01/2021",
    pajakAkhir: "23/03/2022",
    nilaiPajak: 15467879,
    status: "Done",
  },
  {
    id: 4,
    atmID: "20129",
    alamat: "CIMBN.Indomaret.Meruya",
    kondisiATM: "New",
    pajakAwal: "01/01/2021",
    pajakAkhir: "23/03/2022",
    nilaiPajak: 15467879,
    status: "Done",
  },
  {
    id: 5,
    atmID: "20129",
    alamat: "CIMBN.Indomaret.Meruya",
    kondisiATM: "New",
    pajakAwal: "01/01/2021",
    pajakAkhir: "23/03/2022",
    nilaiPajak: 15467879,
    status: "Done",
  },
  {
    id: 6,
    atmID: "20129",
    alamat: "CIMBN.Indomaret.Meruya",
    kondisiATM: "New",
    pajakAwal: "01/01/2021",
    pajakAkhir: "23/03/2022",
    nilaiPajak: 15467879,
    status: "Done",
  },
];
function NumberExtend(props) {
  const classes = useStyles();
  const history = useHistory();
  const [tabelData, setTabelData] = useState([]);
  const [isLoadData, setIsLoadData] = useState(false);
  const titleTable = [
    "ATM ID",
    "Alamat",
    "Kondisi ATM",
    "Pajak Awal",
    "Pajak Akhir",
    "Nilai Pajak",
    "Status",
  ];
  const valueType = ["string", "string", "string", "string","string","string", "object_pajak"];
  const columnNameVar = [
    "atmID",
    "alamat",
    "kondisiATM",
    "pajakAwal",
    "pajakAkhir",
    "nilaiPajak",
    "status",
  ];
   function loadDataHandler(loaderValue) {
     setIsLoadData(loaderValue);
   }
   function linkObject(){
    history.push(`/vendor-management/overview/detailPajak#jlhObjectExtend`);
   }
  useEffect(() => {
    doGetObjectExtend(loadDataHandler).then((response)=>{
      console.log("++respextend",response)
      const dataRandom = [];
      //setIsModalLoaderOpen(true);
      if(response.responseCode == "200"){
        const dataRow = response.overViewObjekPajakList;
        dataRow.map(async(item) => {
          const newRow = {
            atmID: item?.atmId,
            alamat: item?.alamat,
            kondisiATM: item?.kondisiAtm,
            pajakAwal: item?.pajakAwal ? item?.pajakAwal : "-",
            pajakAkhir: item?.pajakAkhir ? item?.pajakAkhir : "-",
            nilaiPajak: item.nilaiPajak ? useRupiahConverter(item?.nilaiPajak) : useRupiahConverter(0),
            status: item?.status,
          };
          dataRandom.push(newRow);
        });
        setTabelData(dataRandom);
      }else{
        setTabelData([])
      }
    })  
  }, []);
  return (
    <div>
      <Grid container direction="column" justifyContent="space-between">
        <Grid item>
          <Grid container direction="row" justifyContent="space-between">
            <Grid item>
              <div className={classes.col}>
                <ObjectIcon />
                <Typography
                  className={classes.title}
                  style={{ marginLeft: 10 }}
                >
                  Jumlah Pajak Yang Sudah Diperpanjang
                </Typography>
              </div>
            </Grid>
            <Grid item>
              <MuiIconLabelButton
                className={classes.paramButton}
                style={{
                  width: "max-content",
                  background: "#FFF5F4",
                  borderRadius: "10px",
                }}
                onClick={() => {linkObject()}}
                label="Detail"
                iconPosition="endIcon"
                buttonIcon={<IconLeft style={{ marginLeft: 20 }} />}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <TableObject
            fields={titleTable}
            data={tabelData}
            cellOption={valueType}
            isLoad={isLoadData}
          />
        </Grid>
      </Grid>
    </div>
  );
}

NumberExtend.propTypes = {};
NumberExtend.defaultProps = {};

export default NumberExtend;
