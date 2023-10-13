import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import { useState } from 'react';
import { ChkyButtons, ChkyTabsAsOption, NumericInput } from '../../../components';
import { makeStyles } from '@material-ui/core/styles';
import { useEffect } from 'react';
import { calculateLength, countRentRange } from '../../LocationProfilling';
import CommonInput from './CommonInput';
import { useContext } from 'react';
import { EditMasterCtx } from '../Edit';
import moment from 'moment';

const useStyles = makeStyles({
  subTitle: {
    fontWeight: '500',
    fontSize: '15px',
    lineHeight: '18px',
    marginBottom: 5,
  },
  containerInput: { marginBottom: 5 },
  labelInput: {
    fontSize: 14,
    fontWeight: 500,
  },
});

const FieldBiayaSewa = () => {
  const { detailData, setDetailData } = useContext(EditMasterCtx);
  const { startRentDate, endRentDate, yearlyRentCostList } = detailData;
  const classes = useStyles();
  const [currentTab, setCurrentTab] = useState(1); // 0 Flatcost, 1 tiering
  const flatCost = !currentTab;
  const [costList, setCostList] = useState([]);
  const costListString = costList?.toString();

  useEffect(() => {
    setDetailData({ ...detailData, yearlyRentCostList: costListString });
    // console.log('~ costListString', costListString);
  }, [costListString]);

  useEffect(() => {
    // console.log('~ costList', costList);
  }, [costList]);

  useEffect(() => {
    if (yearlyRentCostList) {
      setCostList(
        yearlyRentCostList
          .replace('[', '')
          .replace(']', '')
          .split(',')
          .map((val) => val * 1)
      );
    } else setCostList([]);
  }, [yearlyRentCostList]);

  useEffect(() => {
    // change to a function when ngebug
    if (flatCost) {
      setCostList((old) => old.map((oldVal, i, arr) => arr[0]));
    }
  }, [flatCost]);

  function handleChangeDate(start, end) {
    // console.log('~ start, end', start, end);
    // khusus user interactionlet newCostList;
    if (start && end) {
      const startMoment = moment(start);
      const endMoment = moment(end);
      // console.log('~ startMoment, endMoment', startMoment.format(), endMoment.format());
      const range = countRentRange(startMoment, endMoment);
      // console.log('~ range', range);
      const [years] = range;
      let newInputLength = years >= 1 ? years : 1;
      if (costList.length > newInputLength) {
        // mengurangi
        const newCostList = costList.filter((val, i) => i < newInputLength);
        setCostList(newCostList);
      } else if (costList.length < newInputLength) {
        // menambah
        const newCostList = [...Array(newInputLength)].map((val, i) =>
          flatCost ? costList[0] : costList[i] || 0
        );
        setCostList(newCostList);
      }
    }
  }

  return (
    <>
      <Grid item xs={4}>
        <Typography className={classes.subTitle}>Biaya Sewa per Tahun</Typography>
        <div style={{ marginBottom: 20 }}>
          {yearlyRentCostList?.length > 0 ? (
            <ChkyTabsAsOption
              currentTab={currentTab}
              dataTab={['Sama', 'Beda']}
              disableTab={[false, false]}
              handleChangeTab={(newVal) => {
                setCurrentTab(newVal);
              }}
              isUseChangeEffect
            />
          ) : (
            <ChkyButtons onClick={() => handleChangeDate(startRentDate, endRentDate)}>
              Generate Fields
            </ChkyButtons>
          )}
        </div>
        {costList.map((value, i) => {
          return (
            <Grid container alignItems='center' className={classes.containerInput} key={i}>
              <Grid item xs={5}>
                <Typography className={classes.labelInput}>Tahun Ke - {i + 1}</Typography>
              </Grid>
              <Grid item xs>
                <NumericInput
                  onValueChange={(val) => {
                    const newValue = val.floatValue || 0;
                    setCostList(
                      costList?.map((oldValue, index) => {
                        return flatCost ? newValue : index === i ? newValue : oldValue;
                      })
                    );
                  }}
                  value={value}
                  disabled={i > 0 && flatCost}
                  style={{ width: '100%' }}
                />
              </Grid>
            </Grid>
          );
        })}
      </Grid>
      <CommonInput
        type='date'
        label='Tanggal Mulai Sewa'
        name='startRentDate'
        onChangeDate={(newStart) => handleChangeDate(+moment(newStart, 'YYYY-MM-DD'), endRentDate)}
        isUnix
      />
      <CommonInput
        type='date'
        label='Tanggal Akhir Sewa'
        name='endRentDate'
        onChangeDate={(newEnd) => handleChangeDate(startRentDate, +moment(newEnd, 'YYYY-MM-DD'))}
        isUnix
      />
    </>
  );
};

export default FieldBiayaSewa;
