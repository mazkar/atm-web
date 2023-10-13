/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Link, Grid, Typography } from '@material-ui/core';
import constants from '../../../helpers/constants';
import { ChkySearchBar, ChkyTablePagination } from '../../../components';
import BudgetInformation from './BudgetInformation';
import { ReactComponent as GreenCheckIcon } from '../../../assets/icons/general/green_check_circle.svg';
import { ReactComponent as RedRejectIcon } from '../../../assets/icons/general/red_reject_circle.svg';
import { useDispatch, useSelector } from '../../../helpers/Utils/react-redux-hook';
import useRupiahConverter from '../../../helpers/useRupiahConverter';
// import { Modal } from 'antd';
import DynamicTablePagination from '../../../components/DynamicTablePagination';

import './FinancialApproval.css'
import * as ThemeColor from "../../../assets/theme/colors";
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    padding: "30px 20px 20px 30px",
    "& .MuiBox-root": {
      padding: 0,
    },
    backgroundColor: ThemeColor.GrayUltrasoft,
    minHeight: 'calc(100vh - 64px)',
  },
  rootMap: {
    position: 'relative',
    top: -50,
    zIndex: 1,
  },
  titleContainer: {
    marginBottom: 15,
  },
  title: {
    fontFamily: 'Barlow',
    fontWeight: '500',
    fontSize: '36px',
    color: constants.color.dark,
  },
});

function FirstColumn(value) {
  return (
    <Typography style={{ fontSize: 13, fontWeight: 400, color: '#2B2F3' }}>
      {value}
    </Typography>
  );
}

function FinancialApproval(props) {
  const classes = useStyles();
  const dispatch = useDispatch()
  const history = useHistory()
  const financialApprovalTable = useSelector(state => state.financialTable)
  const financialApproval = useSelector(state => state.financial)

  // init data table Fields and valueTypes
  const titleTable = ['Description', 'Category', 'SL Code', 'Days', 'No NPB', 'Amount NPB', 'Inisiator', 'Status', ''];
  const valueType = ['child', 'string', 'string', 'string', 'string', 'string', 'string', 'child', ''];
  const alignTitle = ['left', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center'];

  const [keywords, setKeyword] = useState(''); // <--- init default keyword

  const [approvalNPB, setApprovalNPB] = useState([])
  const [isLoadData, setIsLoadData] = useState(true)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dataApprove, setDataApprove] = useState({});

  const rowsPerPage = 10
  const [totalRows, setTotalRows] = useState(0)

  const actionDetail = (index, data) => {
    localStorage.setItem('detailApproval', JSON.stringify(data))
    history.push(`/financial-approval/detail/${index + 1}`)
  }

  const dataAction = [{ name: 'Detail', func: actionDetail }]

  function ChildComponent(value, idRow, data) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {value === "1" ?
          <div
            style={{
              width: 'fit-content',
              padding: '2px 12px',
              display: 'flex',
              alignItems: 'center',
              borderRadius: 40,
              border: '1px solid #65D170',
              backgroundColor: '#D9FFDD',
            }}>
            <GreenCheckIcon width={16} height={16} />
            <Typography style={{ marginLeft: 5, color: '#65D170', fontSize: 13, fontWeight: 400 }}>
              Approved
            </Typography>
          </div>
          : value === "2" ?
          <div
            style={{
              width: 'fit-content',
              padding: '2px 12px',
              display: 'flex',
              alignItems: 'center',
              borderRadius: 40,
              border: '1px solid #FF6A6A',
              backgroundColor: '#FFF6F6',
            }}>
            <RedRejectIcon width={16} height={16} />
            <Typography style={{ marginLeft: 5, color: '#FF6A6A', fontSize: 13, fontWeight: 400 }}>
              Rejected
            </Typography>
          </div>
          : '-'
          // <Link
          //   component="button"
          //   onClick={() => {
          //     setIsModalVisible(true),
          //       setDataApprove(data)
          //   }}
          //   style={{ color: '#DC241F', fontSize: 13, fontWeight: 400, textAlign: 'center', width: '100%', textDecoration: 'none' }}>
          //   {value}
          // </Link>
        }
      </div>
    );
  }

  function handleKeyword(newValue) {
    setKeyword(newValue);
  }

  function showTableData() {
    let store = []
    let response = financialApprovalTable.data
    if (response.approvalNpb !== undefined) {
      let totalData = response.approvalNpb.length
      setTotalRows(totalData)
      response.approvalNpb.map((item, index) => {
        let data = {}
        data = {
          description: FirstColumn(item.description),
          category: item.category,
          slCode: item.numberSl,
          age: item.age + ' Days',
          noNpb: item.npbCode,
          amountNpb: useRupiahConverter(item.npbAmount),
          inisiator: item.inisiator,
          status: ChildComponent(item.status, (index + 1).toString(), item),
          action: dataAction.map(act => {
            return (
              <a onClick={() => act.func(index, item)}>{act.name}</a>
            )
          })
        }
        store.push(data)
      })
      setApprovalNPB(store)
      setIsLoadData(false)
    }
  }

  useEffect(() => {
    dispatch.financialTable.listApprovalNPB(keywords==='' ? {} : {description: keywords})
  }, [keywords])

  useEffect(() => {
    showTableData()
  }, [financialApprovalTable])

  useEffect(() => {
    let response = financialApproval.data
    if (response.responseMessage !== undefined && response.responseMessage === "SUCCESS") {
      dispatch.financialTable.listApprovalNPB()
      dispatch.financial.budgetSummaryInfo()
    }
  }, [financialApproval])

  return (
    <div className={classes.root}>
      <Grid container justify="space-between" className={classes.titleContainer} alignItems="center">
        <Grid item>
          <Typography className={classes.title}>Approval Potong Budget</Typography>
        </Grid>
        <Grid item>
          <ChkySearchBar placeholder="Pencarian berdasarkan deskripsi..." onKeywordChange={handleKeyword} width={290} />
        </Grid>
      </Grid>
      <Grid container direction="column" spacing={2} style={{ marginTop: 20 }}>
        <Grid item>
          <BudgetInformation />
        </Grid>
        <Grid item style={{width:'100%'}}>
          <DynamicTablePagination
            rowsPerPage={rowsPerPage}
            totalRows={totalRows}
            data={approvalNPB}
            fields={titleTable}
            cellOption={valueType}
            isLoading={isLoadData}
          />
        </Grid>
      </Grid>

      {/* <Modal
        visible={isModalVisible}
        onOk={approveData}
        onCancel={() => setIsModalVisible(false)}
        centered
        closable={false}
        bodyStyle={{
          borderRadius: "8px",
          backgroundColor: "#ffffff",
          marginTop: "50px"
        }}
      >
        <span>Apakah anda yakin setuju?</span>
      </Modal> */}
    </div>

  );
}

FinancialApproval.propTypes = {

};

export default FinancialApproval;
