import React, {useEffect, useState} from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import InputLatLong from './InputLatLong';
import Requester from './Requester';
import SearchAtm from './SearchAtm';
import Location from './Location';
import MachineType from './MachineType';
import CategoryAtm from './CategoryAtm';
import Button from '../../components/Button/MuiButton';
import TextButton from '../../components/Button/TextButton';
import ComonSelect from '../../components/Selects/CommonSelect';
import { Radio } from 'antd';

const useStyles = makeStyles({
  label: {
    fontSize: '13px',
    fontWeight: 400
  },
  col: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: 10,
    marginLeft: 5,
  },
  col2: {
    padding: 2,
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    marginTop: 10,
    marginLeft: 10,
  },
});

function Reopen({onClick, onChangeATMId, onChangeMachineType, onChangeReq, onChangeLocationMode, onChangeModelType, inputPosition, onChangeConven}) {
  const [atmId, setATMId] = useState('');
  const [viewATM, setViewATM] = useState('ATM');
  const onChange = (e) => { 
    onChangeATMId(e.target.value);
    setATMId(e.target.value)
  };
  const { label, col, col2 } = useStyles();

  useEffect(() => {
    console.log(atmId);
  }, [atmId]);

  function handleChange(e) {
    setMachineTypeValue(e);
    onChangeMachineType(e);
    // setViewATM(e);
    console.log("RAW", e);
  };

  const typeSugestions = [
    { id: 0, value: 'ATM', nameId: 'ATM', nameEn: 'ATM' },
    { id: 1, value: 'CRM', nameId: 'CRM', nameEn: 'CRM' },
    { id: 2, value: 'MDM', nameId: 'MDM', nameEn: 'MDM' },
    { id: 3, value: 'CDM', nameId: 'CDM', nameEn: 'CDM' },
  ];

  const [radioValue, setRadioValue] = useState(true);
  const [MachineTypeValue, setMachineTypeValue] = useState("ATM");
  useEffect(()=>{
    var getItem = localStorage.getItem('dataGetDraftDetail');
    if(getItem){
      var parseItem = JSON.parse(getItem);
        // if(parseItem.checkStatus){
          setRadioValue(parseItem.conven !== null ? parseItem.conven : true);
          setMachineTypeValue(parseItem.machineType !== null ? parseItem.machineType : 'ATM');
          // parseItem.checkStatus = false;
          localStorage.setItem('dataGetDraftDetail', JSON.stringify(parseItem));
        // };
    };
  }, []);

  const onSelectType = (e) => {
    console.log('Radio : ', e.target.value);
    setRadioValue(e.target.value);
    onChangeConven(e.target.value);
  };

  return (
    <div>
      <SearchAtm onChange={onChange} onChangeATMId={onChangeATMId} label="Pilih ATM ID yang hendak diganti : " onActionClicked={()=>onClick(atmId)}/>
      {/* <div style={{ marginTop: 20 }}>
        <InputLatLong
          captionLat="Masukan latitude baru"
          captionLong="Masukan longitude baru"
          inputPosition={inputPosition}
        />
      </div> */}
      {/* <Requester onChangeRequester={onChangeReq} /> */}
      <div style={{ display: 'flex', flexDirection: 'row', marginTop: '20px', justifyContent: 'space-between' }}>
        {/* <Location onChangeLocationMode={onChangeLocationMode}/> */}
        <div className={col2}>
        <label className={label}>Jenis Mesin ATM Saat Ini :</label>
            <div className={col}>
                <label style={{fontWeight: 500, fontSize: '15px'}}>{viewATM}</label>
            </div>
        </div>
        <div className={col2}>
          <label className={label}>Jenis Mesin ATM Baru :</label>
          <div className={col}>
            <ComonSelect
              suggestions={typeSugestions}
              defaultValue={MachineTypeValue}
              width="300px"
              bordered
              handleChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        {/* <CategoryAtm onChangeModelType={onChangeModelType} /> */}
        {/* <div style={{ marginLeft: '15px', marginTop: '10%' }}>
          <Radio.Group onChange={onSelectType} defaultValue={radioValue}>
            <Radio style={{ fontWeight: 400, fontSize: '15px' }} value={true}>
              Conven
            </Radio>
            <Radio
              style={{ fontWeight: 400, fontSize: '15px', marginLeft: '30px' }}
              value={false}
            >
              Syariah
            </Radio>
          </Radio.Group>
        </div> */}
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
          marginTop: 10,
        }}
      >
        {/* <TextButton title="Saved Location" /> */}
        <Button label="Process" height={40} onClick={() => onClick()} />
      </div>
    </div>
  );
}

export default Reopen;
