import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextButton from "../../components/Button/TextButton";
import Button from "../../components/Button/MuiButton";
import ModalLocationNotFound from "./ModalLocationNotFound";

import Requester from "./Requester";
import SearchAtm from "./SearchAtm";
import Location from "./Location";
import MachineType from "./MachineType";
import CategoryAtm from "./CategoryAtm";
import ComonSelect from "../../components/Selects/CommonSelect";
import { Radio } from "antd";

const useStyles = makeStyles({
  label: {
    fontSize: "13px",
    fontWeight: 400,
  },
  col: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: 10,
    marginLeft: 5,
  },
  col2: {
    padding: 2,
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    marginTop: 10,
    marginLeft: 10,
  },
});

const typeSugestions = [
  { id: 0, value: "ATM", nameId: "ATM", nameEn: "ATM" },
  { id: 1, value: "CRM", nameId: "CRM", nameEn: "CRM" },
  { id: 2, value: "MDM", nameId: "MDM", nameEn: "MDM" },
  { id: 3, value: "CDM", nameId: "CDM", nameEn: "CDM" },
];

function NewAtm({
  onClick,
  onChangeReq,
  onChangeLocationMode,
  onChangeModelType,
  onChangeATMId,
  onChangeMachineType,
  onChangeConven,
  locationMode,
  requester,
  machineType,
  modelType,
  atmID,
}) {
  const [atmId, setATMId] = useState(atmID);
  const onChange = (e) => {
    setATMId(e.target.value);
    onChangeATMId(e.target.value);
  };
  const { label, col, col2 } = useStyles();

  useEffect(() => {
    // console.log(atmId);
  }, [atmId]);

  function handleChange(e) {
    setMachineTypeValue(e);
    onChangeMachineType(e);
    // console.log("RAW", e);
  }

  const [radioValue, setRadioValue] = useState(true);
  const [MachineTypeValue, setMachineTypeValue] = useState("ATM");
  useEffect(() => {
    var getItem = localStorage.getItem("dataGetDraftDetail");
    if (getItem) {
      var parseItem = JSON.parse(getItem);
      // if(parseItem.checkStatus){
      setRadioValue(parseItem.conven !== null ? parseItem.conven : true);
      setMachineTypeValue(
        parseItem.machineType !== null ? parseItem.machineType : "ATM"
      );
      // parseItem.checkStatus = false;
      localStorage.setItem("dataGetDraftDetail", JSON.stringify(parseItem));
      // };
    }
  }, []);

  useEffect(() => {
    if (machineType) {
      setMachineTypeValue(machineType);
    }
  }, [machineType]);

  const onSelectType = (e) => {
    // console.log('Radio : ', e.target.value);
    setRadioValue(e.target.value);
    onChangeConven(e.target.value);
  };

  return (
    <div>
      <SearchAtm
        atmID={atmID}
        onChange={onChange}
        onChangeATMId={onChangeATMId}
        label="Pilihan lokasi ID ATM dalam lokasi yang sama : "
        onActionClicked={() => onClick(atmId)}
      />
      <div style={{ marginTop: 15 }}>
        <Requester onChangeRequester={onChangeReq} requester={requester} />
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Location
          onChangeLocationMode={onChangeLocationMode}
          locationMode={locationMode}
        />
        <div className={col2}>
          <label className={label}>Machine Type :</label>
          <div className={col}>
            <ComonSelect
              suggestions={typeSugestions}
              defaultValue={MachineTypeValue}
              width="215px"
              bordered
              handleChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <CategoryAtm
          locationMode={locationMode}
          onChangeModelType={onChangeModelType}
          modelType={modelType}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <Button label="Process" height={40} onClick={() => onClick(atmId)} />
      </div>
    </div>
  );
}

export default NewAtm;
