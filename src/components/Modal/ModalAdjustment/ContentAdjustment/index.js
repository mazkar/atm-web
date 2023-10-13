/* eslint-disable react/prop-types */
/* eslint-disable radix */
import React, { useEffect, useState } from 'react';
import { Box, Grid, IconButton, makeStyles, Typography } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { Row } from 'antd';
import { ChkyButtons, IdrNumberInput } from '../../../chky';
import DoubleGrid from '../../../Grid/DoubleGrid';
import CommonSelect from '../../../Selects/CommonSelect';
import constansts from '../../../../helpers/constants';
import { useDispatch, useSelector } from "../../../../helpers/Utils/react-redux-hook";

import './style.css';
import AutoCompleteGroupOption from '../../../AutoCompleteGroupOption';

const useStyles = makeStyles({
  paper: {
    width: 660,
    position: 'absolute',
    borderRadius: 10,
    padding: 30,
    backgroundColor: constansts.color.white,
  },
  closeIcon: {
    color: constansts.color.primaryHard,
  },
  select: {
    width: '100%',
    padding: 0
  },
  subTitle: {
    margin: '20px 0 10px 0',
    fontSize: 15,
    fontWeight: 500
  },
  endingBalance: {
    width: '100%',
    margin: '38px 0 28px 0',
    padding: 0,
  },
});

const numberWithCommas = value => {
  if (value === null) { return 0; }
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const ContentAdjustment = props => {
  const { dataModal, dataSl, dataRequest, index, onClose, isOpen, setOpen, slValue, setLoading, slOptions=[] } = props;
  const classes = useStyles();

  const dispatch = useDispatch();
  const financial = useSelector(state => state.financial);
  const financialTable = useSelector(state => state.financialTable);

  const [budgetDestination, setBudgetDestination] = useState('');
  const [slDestination, setSlDestination] = useState('');
  // const [selectedData, setSelectedData] = useState(null);
  const [selectedAmount, setSelectedDataAmount] = useState(0);

  const [selectedSl, setSelectedSl] = useState(null);

  const viewSwitchFrom = [{
    id: 0,
    value: `${dataModal.numberSl[index].codeSl} : ${dataModal.numberSl[index].category}`,
    nameId: `${dataModal.numberSl[index].codeSl} : ${dataModal.numberSl[index].category}`,
    nameEn: `${dataModal.numberSl[index].codeSl} : ${dataModal.numberSl[index].category}`,
    budgetId: dataModal.numberSl[index].budgetId
  }];

  const viewSwitchTo = dataSl;
  const result = selectedAmount - budgetDestination;
  // const handleSelectSwitchTo = newValue => {

  //   let selectedData = {};

  //   viewSwitchTo.map((data, index) => {
  //     if (data.value.indexOf(newValue) !== -1) {
  //       selectedData = data;
  //       const code = data.code.split(' ')[0];
  //       if(selectedData.value !== slValue) {
  //         setSlDestination(code);
  //         setSelectedDataAmount(data.endingBalance);
  //       }
  //     }
  //   });

  //   if(selectedData.value === slValue) {
  //     alert('Unable to retrieve from the same SL');
  //   } else {
  //     setSelectedData(selectedData);
  //   }
  // };

  const handleChangeBudgetUsed = value => {
    setBudgetDestination(value.value);
  };

  const handleConfirmButton = () => {
    if(budgetDestination) {
      if (budgetDestination <= selectedAmount) {
        setLoading(true);
        const requestData = {
          source: {
            budgetId: selectedSl.value,
            numberSl: slDestination,
            amount: budgetDestination,
            endingBalance: parseInt(selectedSl.balance?.ending)
          },
          destination: {
            budgetId: dataModal.numberSl[index].budgetId,
            numberSl: dataModal.numberSl[index].codeSl,
            amount: budgetDestination,
            endingBalance: dataModal.numberSl[index].balance.ending
          },
          endingBalance: result
        };

        console.log("+++ requestData", requestData);
    
        dispatch.financial.adjustmentBudgetBesaran(requestData);
      } else {
        alert('Adjustment is too higher than ending balance');
      }
    }
    else {
      alert('Please Input Nominal Amount');
    }
  };

  const handleCloseButton = () => {
    onClose();
  };

  const handleCancelButton = () => {
    onClose();
  };

  useEffect(() => {
    const response = financial.data;
    if (response.balance !== undefined) {
      if (response.balance.adjustment !== undefined && response.balance.adjustment !== null) {
        alert('Adjustment Success');
        setLoading(false);
        onClose();
        dispatch.financialTable.searchBudgetBesaran(dataRequest);
        window.location.reload();
      } else {
        alert('Error');
      }
    }
  }, [financial]);
  
  //   console.log("+++ dataSl in modal", dataSl);
  // useEffect(() => {
  //   console.log("+++ selectedSl", selectedSl);
  // }, [selectedSl]);
  
  return (
    <Box className={classes.paper}>
      <Grid container justify='space-evenly' >

        <Grid container justify='flex-end' >
          <IconButton onClick={handleCloseButton} style={{ position: 'absolute', top: 8, right: 8 }}>
            <Close className={classes.closeIcon} />
          </IconButton>
        </Grid>

        <Grid container justify='center' direction='column' spacing={5} >
          <Grid item>
            <Typography variant='h4' component='h4' style={{ margin: '30px 0 50px 0', fontWeight: 500, textAlign: 'center' }}>
                            Adjustment
            </Typography>
          </Grid>
        </Grid>

        <Grid container justify='flex-start'>
          <Typography className={classes.subTitle}>Mengambil dari SL :</Typography>
        </Grid>
        <DoubleGrid
          container={{ className: classes.select }}
          leftComponent={{
            span: 12,
            component: (
            //   <CommonSelect
            //     bordered
            //     suggestions={viewSwitchTo}
            //     defaultValue='Please choose the SL'
            //     value={selectedData ? selectedData.nameId : null}
            //     width='300px'
            //     handleChange={handleSelectSwitchTo}
            //     color={constansts.color.dark}
            //   />
              <AutoCompleteGroupOption 
                value={selectedSl} 
                onChange={(obj)=>{
                  // console.log("+++ obj", obj);
                  // console.log("+++ slValue", slValue);
                  if(obj.value === slValue) {
                    alert('Unable to retrieve from the same SL');
                  } else {
                    setSelectedSl(obj);
                    setSlDestination(obj.codeSl);
                    setSelectedDataAmount(obj.balance?.ending);
                  }
                }} 
                style={{width: 300}} 
                options={slOptions}/>
            )
          }}
          rightComponent={{
            span: 12,
            component: (
            // <Row style={{ justifyContent: 'flex-end' }}>
            //     <IdrNumberInput className='input-budget' onValueChange={handleChangeBudgetUsed} value={budgetDestination} placeholder='' />
            // </Row>
              <Typography style={{ fontSize: 20, fontWeight: 500, textAlign: 'right' }}>
                <span style={{ opacity: 0.2 }}>Rp.</span>{numberWithCommas(selectedAmount)}
              </Typography>
            )
          }}
        />

        <Grid container justify='flex-start'>
          <Typography className={classes.subTitle}>Dialihkan ke SL :</Typography>
        </Grid>

        <DoubleGrid
          container={{ className: classes.select }}
          leftComponent={{
            span: 12,
            component: (
              <CommonSelect
                bordered
                suggestions={viewSwitchFrom}
                defaultValue={viewSwitchFrom[0].value}
                width='300px'
                color={constansts.color.dark}
                disable
              />
            )
          }}
          rightComponent={{
            span: 12,
            component: (
            // <Typography style={{ fontSize: 20, fontWeight: 500, textAlign: 'right' }}>
            //     <span style={{ opacity: 0.2 }}>Rp.</span>{numberWithCommas(dataModal.numberSl[index].balance.ending)}
            // </Typography>
              <Row style={{ justifyContent: 'flex-end' }}>
                <IdrNumberInput className='input-budget' onValueChange={handleChangeBudgetUsed} value={budgetDestination} placeholder='' />
              </Row>
            )
          }}
        />

        <DoubleGrid
          container={{ className: classes.endingBalance }}
          leftComponent={{
            span: 12,
            component: (
              <Row style={{ justifyContent: 'flex-start' }}>
                <Typography style={{ fontSize: 15, fontWeight: 500 }}>Ending Balance :</Typography>
              </Row>
            )
          }}
          rightComponent={{
            span: 12,
            component: (
              <Row style={{ justifyContent: 'flex-end' }}>
                <Typography style={{ fontSize: 20, fontWeight: 500 }}>
                  <span style={{ opacity: 0.2 }}>Rp.</span>{numberWithCommas(result)}
                </Typography>
              </Row>
            )
          }}
        />

        <Grid container direction='row'>
          <Grid item>
            <ChkyButtons buttonType='redOutlined' style={{ borderRadius: 6, textTransform: 'none' }} onClick={handleCancelButton}>Cancel</ChkyButtons>
          </Grid>
          <Grid item>
            <ChkyButtons style={{ position: 'absolute', right: 30, borderRadius: 6, textTransform: 'none' }} onClick={handleConfirmButton}>Confirm</ChkyButtons>
          </Grid>
        </Grid>

      </Grid>
    </Box>
  );
};

export default ContentAdjustment;