import React, { useEffect,useState } from 'react'
import { Grid, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { ReactComponent as IconOpen } from "../../../../assets/icons/duotone-red/check-circle2.svg";
import {ReactComponent as IconTepat} from "../../../../assets/icons/duotone-red/tachometer-fast.svg";
import {ReactComponent as IconDelay} from "../../../../assets/icons/duotone-red/pause-circle.svg";
import {ReactComponent as IconClose} from "../../../../assets/icons/duotone-red/close.svg"
import {ReactComponent as IconManual} from "../../../../assets/icons/duotone-red/manual.svg"
import CardPersentation from './CardPersentation';
import {Row,Col} from 'antd'
import { doGetNumberVendor } from '../../ApiServices';



function PersentationStatus() {
  const [data, setData] = useState({});
  // INIT DATA REQUEST
  const page = new URLSearchParams(window.location.search).get("page");
  const rowsPerPage = 10; // <--- init default rowsPerPage
  const defaultDataHit = {
    pageNumber: page || 0,
    dataPerPage: rowsPerPage,
    sortBy: "id",
    sortType: "ASC",
  };
  const [dataRequest, setDataRequest] = useState(defaultDataHit);
  // LOADER LOAD DATA
  const [isLoadData, setIsLoadData] = useState(false);
  // set handler loader when call Approval API Service
  function loadDataHandler(loaderValue) {
    setIsLoadData(loaderValue);
  }
  useEffect(() => {
    doGetNumberVendor(loadDataHandler, dataRequest).then((response) => {
      if (response) {
        console.log("datpersen",response)
        setData(response.data);
      }
    });
  }, [dataRequest]);

  const dummyData = [
    { title: "Open", value: data.open + "%", icon: <IconOpen /> },
    { title: "Tepat Waktu", value: data.tepatWaktu + "%", icon: <IconTepat /> },
    { title: "Delay", value: data.delay +"%", icon: <IconDelay /> },
    { title: "Tidak Dikerjakan", value: data.tidakDikerjakan + "%", icon: <IconClose /> },
    { title: "Manual", value: data.manual + "%", icon: <IconManual /> },
  ];
  return (
    <div>
      <Row justify="center" align="middle" gutter={[10, 10]}>
        {dummyData.map((item) => {
          return (
            <Col flex={1}>
              <CardPersentation
                leftIcon={item.icon}
                title={item.title}
                value={item.value}
              />
            </Col>
          );
        })}
      </Row>
    </div>
  );
}

export default PersentationStatus