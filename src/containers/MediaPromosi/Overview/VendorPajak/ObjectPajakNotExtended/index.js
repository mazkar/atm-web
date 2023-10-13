import React, { useState, useEffect } from "react";
import { makeStyles, Typography, Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { ReactComponent as ObjectIcon } from "../../../../../assets/icons/duotone-red/numberObject.svg";
import MuiIconLabelButton from "../../../../../components/Button/MuiIconLabelButton";
import { ReactComponent as IconLeft } from "../../../../../assets/icons/linear-red/chevron-right.svg";
import useRupiahConverter from "../../../../../helpers/useRupiahConverter";
import TableObject from "../../../../VendorManagement/Overview/VendorPajak/ObjectNumber/TableObject";
import { doGetJumlahObjectPajak } from "../../../services";

const UseStyles = makeStyles({
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
});

const dataTable = [
  {
    id: 1,
    atmID: "20129",
    alamat: "CIMBN.Indomaret.Meruya",
    kondisiATM: "New",
    pajakAwal: "01/01/2021",
    pajakAkhir: "23/03/2022",
    nilaiPajak: 15467879,
    status: "On Progress",
  },
  {
    id: 2,
    atmID: "20129",
    alamat: "CIMBN.Indomaret.Meruya",
    kondisiATM: "Termin",
    pajakAwal: "01/01/2021",
    pajakAkhir: "23/03/2022",
    nilaiPajak: 15467879,
    status: "Assign To Vendor",
  },
  {
    id: 3,
    atmID: "20129",
    alamat: "CIMBN.Indomaret.Meruya",
    kondisiATM: "Termin",
    pajakAwal: "01/01/2021",
    pajakAkhir: "23/03/2022",
    nilaiPajak: 15467879,
    status: "Overdue",
  },
  {
    id: 4,
    atmID: "20129",
    alamat: "CIMBN.Indomaret.Meruya",
    kondisiATM: "New",
    pajakAwal: "01/01/2021",
    pajakAkhir: "23/03/2022",
    nilaiPajak: 15467879,
    status: "Tidak Bisa Diproses",
  },
];

const initYear = 2022;

function ObjectPajakNotExtended() {
  const classes = UseStyles();
  const history = useHistory();
  const [tabelData, setTabelData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [tabelYear, setTabelYear] = useState(initYear);

  const titleTable = [
    "ATM ID",
    "Alamat",
    "Kondisi ATM",
    "Pajak Awal",
    "Pajak Akhir",
    "Nama Vendor",
    "Status",
  ];
  const valueType = [
    "string",
    "string",
    "string",
    "string",
    "string",
    "string",
    "object_pajak",
  ];
  const columnNameVar = [
    "atmID",
    "alamat",
    "kondisiATM",
    "pajakAwal",
    "pajakAkhir",
    "vendorName",
    "status",
  ];
  function loadDataHandler(loaderValue) {
    setIsLoading(loaderValue);
  }

  function linkObject() {
    history.push(`/media-promosi/overview/detailPajak#jlhPajakOpen`);
  }

  useEffect(() => {
    doGetJumlahObjectPajak(loadDataHandler, tabelYear)
      .then((response) => {
        console.log(response);
        if (response) {
          if (response.responseCode === "00") {
            const belumSelesai = response.data.belumSelesai;
            const dataRow = [];
            belumSelesai.map((item) => {
              const newRow = {
                atmID: item.atmId ? item.atmId : "-",
                alamat: item.alamat ? item.alamat : "-",
                kondisiATM: item.kondisiATM ? item.kondisiATM : "-",
                pajakAwal: item.pajakAwal ? item.pajakAwal : "-",
                pajakAkhir: item.pajakAkhir ? item.pajakAkhir : "-",
                vendorName: item.vendorName ? item.vendorName : "-",
                status: item.status ? parseInt(item.status) : "-",
              };
              dataRow.push(newRow);
            });
            setTabelData(dataRow);
          }
        }
      })
      .catch((err) => {
        console.log(`Error Fetching data \n${err}`);
      });
  }, [tabelYear]);

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
                  Jumlah Pajak Belum Selesai
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
                label="Detail"
                onClick={() => {
                  linkObject();
                }}
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
            isLoad={isLoading}
          />
        </Grid>
      </Grid>
    </div>
  );
}

ObjectPajakNotExtended.PropTypes = {};
ObjectPajakNotExtended.defaultProps = {};

export default ObjectPajakNotExtended;
