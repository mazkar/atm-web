/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { Box, Chip, Link, Typography } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Axios from 'axios';
import Layout from './partials/Layout';
import { sectionPop } from './constants';
import CommonTable from './partials/CommonTable';
import { WarningMedium, WarningSoft, Green } from '../../assets/theme/colors';
import { ChkyTablePagination } from '../../components';
import FloatingChat from '../../components/GeneralComponent/FloatingChat';
import ModalLoader from '../../components/ModalLoader';
import ModalNotFound from './AnalyzeTargetDetail/ModalNotFound';

const useStyles = makeStyles((theme) => ({
  goodStatus: {
    padding: '4px 10px 4px 10px',
    background: '#D9FFDD',
    border: `1px solid ${Green}`,
    borderRadius: '40px',
    textAlign: 'center',
    color: `${Green}`,
    fontFamily: 'Barlow',
    fontWeight: 400,
    fontSize: '10px',
  },
  overBudgetStatus: {
    padding: '4px 10px 4px 10px',
    background: '#FFE9E9',
    border: '1px solid #FF7A76',
    borderRadius: '40px',
    textAlign: 'center',
    color: '#FF7A76',
    fontFamily: 'Barlow',
    fontWeight: 400,
    fontSize: '10px',
  },
}));

const CustomChip = withStyles((theme) => ({
  root: {
    borderRadius: 30,
    padding: '4px 10px',
    height: 'auto',
    border: `1px solid ${WarningMedium}`,
    backgroundColor: WarningSoft,
    color: WarningMedium,
  },
  label: {
    fontSize: '10px',
    lineHeight: '12px',
    padding: 0,
  },
}))(Chip);
const UrlAction = ({ text, idAtm, handlingModal }) => {

  const [isOpenModalLoader, setModalLoader] = useState(false);

  const getDataDetail = async (atmIdJump) => {
    try {
      setModalLoader(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": "true",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        },
      };
      const result = await Axios.post(
        `${process.env.REACT_APP_API_DOMAIN}/analysismodelingservice/v1/analyticData/detailAnalyticData`,
        {
          atmId: atmIdJump,
        },
        config
      );
      console.log("<<< RESULT: ",result);
      if((result.data.message === "ATM ID NOT FOUND")||(result.data.data === null)){
        setModalLoader(false);
        handlingModal(true);
      }else{
        window.location.assign(`/trend-analisa/detail/${atmIdJump}`);
        setModalLoader(false);
      }
      setModalLoader(false);
    } catch (err) {
      alert(`Error Fetching Data dataBrand Select...! \n${err}`);
      setModalLoader(false);
    }
  };

  function actionDetails(atmIdJump){
    if(atmIdJump === null){
      handlingModal(true);
    }else{
      getDataDetail(atmIdJump);
      // window.location.assign(`/trend-analisa/detail/${atmIdJump}`);
    }
  }
  return (
    <Box>
      <Box
        style={{
          textAlign: "center",
          width: "max-content",
          paddingLeft: 10,
          paddingRight: 10,
          margin: "auto",
        }}
      >
        <Typography style={{ fontSize: 13 }}>
          <Link
            style={{ color: "#DC241F", textDecoration: "none" }}
            onClick={()=>{actionDetails(idAtm);}}
          >
            {text}
          </Link>
        </Typography>
      </Box>
      <ModalLoader isOpen={isOpenModalLoader} />
    </Box>
  );
};

const ChildComponentMedical = (props) => {
  const { value } = props;
  const classes = useStyles();

  return (
    <div style={{ justifyContent: 'center', display: 'flex' }}>
      {value === 'Good' ? (
        <div className={classes.goodStatus}>{value}</div>
      ) : (
        <div className={classes.overBudgetStatus}>{value}</div>
      )}
    </div>
  );
};

const AnalyzeTransaksi = () => {
  const [currentPage, setCurrentPage] = useState(0); // <--- init default currentPage
  const rowsPerPage = 10; // <--- init default rowsPerPage
  const [totalPages, setTotalPages] = useState(0); // <--- init default totalPages
  const [totalRows, setTotalRows] = useState(0); // <--- init default totalRows
  const [dataHit, setDataHit] = useState({
    pageNumber: currentPage,
    dataPerPage: rowsPerPage,
  });

  // modalLoader
  const [isLoading, setIsLoading] = useState(false);
  // >>>> FIND ATM ID FOR DETAIL
  const [isNotFound, setIsNotFound] = useState(false);
  function handleIsNotFound(bool){
    setIsNotFound(bool);
  };
  // API INTEGRATION
  const [dataTable, setDataTable] = useState([]);
  useEffect(() => {
    const dataToSet = [];
    const fetchDataTable = async () => {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      };
      try {
        setIsLoading(true);
        const result = await Axios.get(
          `${process.env.REACT_APP_API_DOMAIN}/masterrbbservices/v1/planAnalytic/analyticTransaction/analisisPopulation?pageNumber=${dataHit.pageNumber}&dataPerpage=${dataHit.dataPerPage}`,
          config
        );
        // reconstruct data from DB to dataMaps
        try {
          const dataPre = result.data.analisisPopulationData.content;
          setTotalPages(result.data.analisisPopulationData.totalPages);
          setTotalRows(result.data.analisisPopulationData.totalElements);
          // setTotalRows(result.data.numberOfElements);

          const hash = window.location.hash.substring(1);

          // console.log(`<<< CEKPoint C => ${JSON.stringify(dataPre)}`);
          dataPre.map((row) => {
            const newRow = {
              atm_id: (
                <Typography style={{ fontSize: 13 }}>#{row.atm_id}</Typography>
              ),
              location_id: row.location_id,
              model_final: row.model_final,
              medical_record: <ChildComponentMedical value={row.medical} />,
              action: <UrlAction idAtm={row.atm_id} handlingModal={handleIsNotFound} text="Lihat Detail"/>,
            };
            // set constructed data
            dataToSet.push(newRow);
          });
        } catch (error) {
          setIsLoading(false);
          alert(`Error Refactor Data Table...! \n ${error}`);
        }
        setDataTable(dataToSet);
        setIsLoading(false);
      } catch (err) {
        alert(`Error Fetching Data Table...! \n${err}`);
        setIsLoading(false);
      }
    };
    fetchDataTable();
  }, [dataHit]);

  // init data table Fields and valueTypes
  const titleTable = ['ATM ID', 'Lokasi', 'Status', 'Medical Record', ''];
  const valueType = ['child', 'string', 'string', 'child', 'child'];
  const alignTitle = ['left', 'center', 'center', 'center', 'center'];

  function handleChangePageValue(newPage) {
    setCurrentPage(newPage);
    setDataHit({
      pageNumber: newPage,
      dataPerPage: rowsPerPage,
    });
  }
  return (
    <div>
      <Layout
        title="Analisis Populasi Low Usage"
        contents={sectionPop.map((val, i) => {
          return {
            ...val,
            tabContent: (
              <ChkyTablePagination
                data={dataTable}
                fields={titleTable}
                cellOption={valueType}
                totalPages={totalPages}
                rowsPerPage={rowsPerPage}
                totalRows={totalRows}
                changePage={handleChangePageValue}
                alignTitleData={alignTitle}
                isLoadData={isLoading}
                leftAlignBody={[1]}
              />
            ),
          };
        })}
      />
      {/* <FloatingChat /> */}
      <ModalNotFound isOpen={isNotFound} onClose={()=>handleIsNotFound(false)}/>
    </div>
  );
};

export default AnalyzeTransaksi;

const tableHeaderContent = ['ATM ID', 'Lokasi', 'Status', 'Medical Record'];

const tableContent = [
  [
    '#1101',
    'CIMBN.JKT.MERUYA.SPBU',
    'Low Usage',
    <CustomChip label="Bad" variant="outlined" />,
  ],
  [
    '#1101',
    'CIMBN.JKT.MERUYA.SPBU',
    'Low Usage',
    <CustomChip label="Bad" variant="outlined" />,
  ],
  [
    '#1101',
    'CIMBN.JKT.MERUYA.SPBU',
    'Low Usage',
    <CustomChip label="Bad" variant="outlined" />,
  ],
  [
    '#1101',
    'CIMBN.JKT.MERUYA.SPBU',
    'Low Usage',
    <CustomChip label="Bad" variant="outlined" />,
  ],
  [
    '#1101',
    'CIMBN.JKT.MERUYA.SPBU',
    'Low Usage',
    <CustomChip label="Bad" variant="outlined" />,
  ],
  [
    '#1101',
    'CIMBN.JKT.MERUYA.SPBU',
    'Low Usage',
    <CustomChip label="Bad" variant="outlined" />,
  ],
  [
    '#1101',
    'CIMBN.JKT.MERUYA.SPBU',
    'Low Usage',
    <CustomChip label="Bad" variant="outlined" />,
  ],
  [
    '#1101',
    'CIMBN.JKT.MERUYA.SPBU',
    'Low Usage',
    <CustomChip label="Bad" variant="outlined" />,
  ],
  [
    '#1101',
    'CIMBN.JKT.MERUYA.SPBU',
    'Low Usage',
    <CustomChip label="Bad" variant="outlined" />,
  ],
  [
    '#1101',
    'CIMBN.JKT.MERUYA.SPBU',
    'Low Usage',
    <CustomChip label="Bad" variant="outlined" />,
  ],
];
