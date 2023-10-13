import React,{useEffect, useState} from 'react'
import {makeStyles,Paper,Grid,Typography} from "@material-ui/core"
import {ReactComponent as IconNumber} from "../../../../assets/icons/duotone-red/exchange-icon.svg"
import FilterData from './FilterData'
import { ChkyTablePagination } from '../../../../components'
import ModalLoader from '../../../../components/ModalLoader'
import { doGetOrderToVendor } from '../../ApiServices'
import { LiveTvOutlined } from '@material-ui/icons'

const UseStyles=makeStyles((theme)=>({
    paperWrapper: {
    "& .MuiPaper-elevation1": {
      boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
    },
    //maxWidth:1100
  },
  root: {
    padding: 20,
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 2,
    position: "relative",
    borderRadius: 10,
  },
  col: {
    display: "flex",
    alignItems: "center",
  },
  indicator: {
    marginTop: 10,
    marginBottom: 20,
  },
  title: {
    fontFamily: "Barlow",
    fontWeight: 500,
    fontSize: "15px",
    color: "#2B2F3C",
    marginLeft: 10,
  },
}))
const dataTable = {
  content: [
    {
      id: 1,
      namaVendor: "PT.TRIAS",
      data: [
        {
          id: 1,
          jenisPekerjaan: "New",
          valuePekerjaan: 8,
        },
        {
          id: 2,
          jenisPekerjaan: "Bangunan Baru",
          valuePekerjaan: 9,
        },
      ],
    },
    {
      id: 2,
      namaVendor: "PT.GK TAU",
      data: [
        {
          id: 1,
          jenisPekerjaan: "New",
          valuePekerjaan: 7,
        },
        {
          id: 2,
          jenisPekerjaan: "Bangunan Baru",
          valuePekerjaan: 8,
        },
        {
          id: 3,
          jenisPekerjaan: "AC",
          valuePekerjaan: 10,
        },
      ],
    },
  ],
  titleTab: [
    {
      id: 1,
      title: "Nama Vendor",
      columnInDb: "namaVendor",
    },
    {
      id: 2,
      title: "New",
      columnInDb: "new",
    },
    {
      id: 3,
      title: "Bangunan Baru",
      columnInDb: "bangunanBaru",
    },
    {
      id: 4,
      title: "AC",
      columnInDb: "ac",
    },
  ],
};
const rowsPerPage = 10; // <--- init default rowsPerPage
function OrderToVendor() {
   const classes = UseStyles();
   const page = new URLSearchParams(window.location.search).get("page");
   const [isModalLoaderOpen, setIsModalLoaderOpen] = useState(false);
  // INIT DATA REQUEST
  const defaultDataHit = {
    pageNumber: page || 0,
    dataPerPage: rowsPerPage,
    sortBy: "id",
    sortType: "ASC",
  };
  // =====> DATA TABLE  <=====
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRows, setTotalRows] = useState(0); // <--- init default totalRows
  const [orderDirection, setOrderDirection] = useState("ASC");
  // const [orderBy, setOrderBy] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const [resetPageCounter, setResetPageCounter] = useState(0);
  const [dataRequest, setDataRequest] = useState(defaultDataHit);
  // LOADER LOAD DATA
  const [isLoadData, setIsLoadData] = useState(false);
  // set handler loader when call Approval API Service
  function loadDataHandler(loaderValue) {
    setIsLoadData(loaderValue);
  }
  //tabel needed
  const [tabelData, setTabelData] = useState([]);
  const [fillVendor,setFillVendor]=useState([]);
  const [fillOption,setFillOption]=useState([]);
  const [valueType,setValueType]=useState([])
  const [isSort,setSortType]=useState([])
  const [fillJenisPekerjaan,setFillJenisPekerjaan]=useState([])

  const titleTable = [
    "Vendor Name",
    "Bangunan Baru",
    "Renovasi Ruangan",
    "Pemasangan AC",
    "Pemasangan CCTV",
  ];
  //const valueType = ["string", "string", "string", "string", "string"];
  //const isSort =[ true ,true,true,true,true]
  const columnNameVar=["vendorName","bangunanBaru", "renovasiRuangan","pemasanganAc","pemasanganCCTV"]
  // HANDLER
  function handleChangePage(newPage) {
    setDataRequest({
      ...dataRequest,
      pageNumber: newPage,
    });
  }
  function handleFilterSubmit(value) {
    // console.log(">>>>> FILTER DATA: ", JSON.stringify(value));
    // console.log(">>>>> FILTER DATA: ", JSON.stringify(dataRequest));
    setResetPageCounter((prevCount) => prevCount + 1);
    if (value === null) {
      setDataRequest(defaultDataHit);
    } else {
      setDataRequest({
        ...defaultDataHit,
        // // pageNumber: 0,
        // // dataPerPage: rowsPerPage,
        ...value,
      });
    }
  }
 function handleSort(property) {
   return function actualFn(e) {
     const isActiveAndAsc = sortBy === property && orderDirection === "ASC";
     const sortByNewVal =
       columnNameVar[titleTable.indexOf(property)];
     const sortType = isActiveAndAsc ? "DESC" : "ASC";
     setOrderDirection(sortType);
     setSortBy(property);
     // setOrderBy(sortByNewVal);
     setDataRequest({
       ...dataRequest,
       sortType,
       sortBy: sortByNewVal,
     });
   };
 }
 useEffect(()=>{
  doGetOrderToVendor(loadDataHandler,dataRequest).then((res)=>{
    console.log("respData",res)
    if(res.data.responseCode == "00"){
      const tableFilter=res.data.content
      const fillTable=res.data.content
      const dataHeader = res.data.titleHeader;
       const dataRow=[]
      //const typeWork=res.data.
      //filter
      const fillFilter =[]
      tableFilter.map((item,i)=>{
        let filter={
          id:i,
          nameVendor:item.nameVendor
        }
        fillFilter.push(filter)
        console.log("fill",fillFilter)
      })
      //headernnya
      const titleData=[];
      dataHeader.map((item)=>{
        console.log("itemmm",item)
        const nmVendor="Nama Vendor"
        const headRow={
          title:item
        }
        titleData.push(headRow.title)
      })
      setTabelData(titleData)
      const valueTypes=[];
      dataHeader.map((item)=>{
        const valueType={
          value:"string"
        }
        valueTypes.push(valueType)
      })
      setValueType(valueTypes)
      const sortTypes=[];
      dataHeader.map((ite)=>{
        const sortType={
          value:true
        }
        sortTypes.push(sortType)
      })
      setSortType(sortTypes)
      //fillnya
      fillTable.map((itemTable,i)=>{
        let itemRow={}
        dataHeader.map(async(headerItem,i)=>{
          if(i != 0){
            itemTable.data.map((itemData) => {
              if (headerItem === itemData.key) {
                itemRow[headerItem] = itemData.value;
              }
            });
          }else{
            itemRow[headerItem]=itemTable.nameVendor
          }
         if (!itemRow.hasOwnProperty(headerItem)) {
           itemRow[headerItem] = "-";
         }
        })
        dataRow.push(itemRow)
        console.log("itemRow", itemRow);
      })
      setFillVendor(dataRow)
      
      setFillOption(fillFilter)
    }else{
      setFillVendor([])
    }
  })
 },[dataRequest])
  
  useEffect(()=>{
    console.log("title+++",tabelData)
  },[])
  return (
    <div className={classes.paperWrapper}>
      <Paper className={classes.root}>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          className={classes.indicator}
        >
          <Grid item>
            <div className={classes.col}>
              <IconNumber />
              <Typography className={classes.title} style={{ marginLeft: 10 }}>
                Total Order Ke Vendor
              </Typography>
            </div>
          </Grid>
        </Grid>
        <div className={classes.container}>
          <Grid container direction="column" spacing={1}>
            <Grid item style={{ width: "-webkit-fill-available" }}>
              <div>
                {" "}
                <FilterData
                  fillFilter={fillOption}
                  onFilterSubmit={handleFilterSubmit}
                  workType={tabelData}
                />
              </div>
            </Grid>
              <ChkyTablePagination
                data={fillVendor}
                fields={tabelData}
                cellOption={valueType}
                changePage={handleChangePage}
                totalPages={totalPages}
                rowsPerPage={rowsPerPage}
                totalRows={totalRows}
                isLoadData={isLoadData}
                isSort={isSort}
                isUsingMuiSort
                handleSort={handleSort}
                sortBy={sortBy}
                order={orderDirection}
              />
          </Grid>
        </div>
      </Paper>
    </div>
  );
}

export default OrderToVendor