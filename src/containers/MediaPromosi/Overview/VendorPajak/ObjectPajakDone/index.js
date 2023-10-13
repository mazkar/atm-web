import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { Typography, Grid, makeStyles } from "@material-ui/core";
import { ReactComponent as ObjectIcon } from "../../../../../assets/icons/duotone-red/numberObject.svg";
import { ReactComponent as IconLeft } from "../../../../../assets/icons/linear-red/chevron-right.svg";
import MuiIconLabelButton from "../../../../../components/Button/MuiIconLabelButton";
import useRupiahConverter from "../../../../../helpers/useRupiahConverter";
import TableObject from "../../../../VendorManagement/Overview/VendorPajak/ObjectNumber/TableObject";
import { doGetJumlahObjectPajak } from "../../../services";

const UseStyles = makeStyles(() => ({
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

const initYear = 2022;

function ObjectPajakDone() {
  const classes = UseStyles();
  const history = useHistory();

  //STATE
  const [tabelData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [tabelYear, setTabelYear] = useState(initYear);

  const titleTable = [
    "ATM ID",
    "Alamat",
    "Kondisi ATM",
    "Nama Vendor",
    "Status",
  ];
  const valueType = ["string", "string", "string", "string", "object_pajak"];
  const columnNameVar = [
    "atmID",
    "alamat",
    "kondisiATM",
    "namaVendor",
    "status",
  ];

  function loadDataHandler(loaderValue) {
    setIsLoading(loaderValue);
  }

  function linkObject() {
    history.push(`/media-promosi/overview/detailPajak#jlhPajakDone`);
  }

  useEffect(() => {
    doGetJumlahObjectPajak(loadDataHandler, tabelYear)
      .then((response) => {
        console.log(response);
        if (response) {
          if (response.responseCode === "00") {
            const sudahSelesai = response.data.sudahSelesai;
            const dataRow = [];
            sudahSelesai.map((item) => {
              const newRow = {
                atmID: item.atmId ? item.atmId : "-",
                alamat: item.alamat ? item.alamat : "-",
                kondisiATM: item.kondisiATM ? item.kondisiATM : "-",
                vendorName: item.vendorName ? item.vendorName : "-",
                status: item.status ? parseInt(item.status) : "-",
              };
              dataRow.push(newRow);
            });
            setTableData(dataRow);
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
                  Jumlah Object Pajak Sudah Selesai
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
                iconPosition="endIcon"
                onClick={() => {
                  linkObject();
                }}
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

ObjectPajakDone.propTypes = {};
ObjectPajakDone.defaultProps = {};

export default ObjectPajakDone;
