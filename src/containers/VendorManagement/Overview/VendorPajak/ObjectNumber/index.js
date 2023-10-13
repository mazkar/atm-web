import React,{useEffect,useState}from 'react'
import PropTypes from 'prop-types'
import { withRouter, useHistory } from "react-router-dom";
import {Typography,Grid, makeStyles,Button} from '@material-ui/core'
import {ReactComponent as ObjectIcon} from "../../../../../assets/icons/duotone-red/numberObject.svg"
import MuiIconLabelButton from '../../../../../components/Button/MuiIconLabelButton'
import { ReactComponent as IconLeft } from "../../../../../assets/icons/linear-red/chevron-right.svg";
import useRupiahConverter from '../../../../../helpers/useRupiahConverter'
import TableObject from './TableObject'
import { doGetObjectData } from '../../../ApiServices'

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
    height:"30px",
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
    nilaiPajak: 15467879,
    status: "Done",
  },
  {
    id: 2,
    atmID: "20129",
    alamat: "CIMBN.Indomaret.Meruya",
    kondisiATM: "Termin",
    nilaiPajak: 15467879,
    status: "Open",
  },
  {
    id: 3,
    atmID: "20129",
    alamat: "CIMBN.Indomaret.Meruya",
    kondisiATM: "Termin",
    nilaiPajak: 15467879,
    status: "Assign To Vendor",
  },
  {
    id: 4,
    atmID: "20129",
    alamat: "CIMBN.Indomaret.Meruya",
    kondisiATM: "New",
    nilaiPajak: 15467879,
    status: "On Progress",
  },
  {
    id: 5,
    atmID: "20129",
    alamat: "CIMBN.Indomaret.Meruya",
    kondisiATM: "New",
    nilaiPajak: 15467879,
    status: "On Progress",
  },
  {
    id: 6,
    atmID: "20129",
    alamat: "CIMBN.Indomaret.Meruya",
    kondisiATM: "New",
    nilaiPajak: 15467879,
    status: "On Progress",
  },
  {
    id: 7,
    atmID: "20129",
    alamat: "CIMBN.Indomaret.Meruya",
    kondisiATM: "New",
    nilaiPajak: 15467879,
    status: "On Progress",
  },
  {
    id: 8,
    atmID: "20129",
    alamat: "CIMBN.Indomaret.Meruya",
    kondisiATM: "New",
    nilaiPajak: 15467879,
    status: "On Progress",
  },
];
function ObjectNumber(props) {
    const classes= useStyles()
    const history = useHistory();
    const [tabelData, setTabelData] = useState([]);
    const [isLoadData, setIsLoadData] = useState(false);
    const titleTable = [
        "ATM ID",
        "Alamat",
        "Kondisi ATM",
        "Nilai Pajak",
        "Status",
      ];
    const valueType = ["string", "string", "string", "string", "object_pajak"];
    const columnNameVar=[
      "atmID",
      "alamat",
      "kondisiATM",
      "nilaiPajak",
      "status"
    ]
     function loadDataHandler(loaderValue) {
       setIsLoadData(loaderValue);
     }
     function linkObject() {
       history.push(`/vendor-management/overview/detailPajak#jlhObjectPajak`);
     }
  useEffect(()=>{
    doGetObjectData(loadDataHandler).then((response)=>{
      console.log("++res",response)
       const dataRow = response.overViewObjekPajakList;
        const dataRandom = [];
         dataRow.map((item) => {
           const newRow = {
             atmID: item.atmId,
             alamat: item.alamat,
             kondisiATM: item.kondisiAtm,
             nilaiPajak: item.nilaiPajak ? useRupiahConverter(item.nilaiPajak) : useRupiahConverter(0),
             status: item.status,
           };
           dataRandom.push(newRow);
         });
         setTabelData(dataRandom);
    })
    },[])
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
                  Jumlah Object Pajak
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
            isLoad={isLoadData}
          />
        </Grid>
      </Grid>
    </div>
  );
}

ObjectNumber.propTypes = {
}
ObjectNumber.defaultProps={
}

export default ObjectNumber
