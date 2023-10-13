import React, { useEffect, useState } from "react";
import CardPersentation from "../../../VendorManagement/Overview/PersentationStatus/CardPersentation";
import { Row, Col } from "antd";
import { ReactComponent as IconOpen } from "../../../../assets/icons/duotone-red/check-circle2.svg";
import { ReactComponent as IconTepat } from "../../../../assets/icons/duotone-red/tachometer-fast.svg";
import { ReactComponent as IconDelay } from "../../../../assets/icons/duotone-red/pause-circle.svg";
import { ReactComponent as IconClose } from "../../../../assets/icons/duotone-red/close.svg";
import { ReactComponent as IconManual } from "../../../../assets/icons/duotone-red/manual.svg";
import { doGetSummarySurveyVendor } from "../../services";
import LoadingView from "../../../../components/Loading/LoadingView";

const defaultHit = {
  pageNumber: 0,
  dataPerPage: 10,
  sortBy: "id",
  sortType: "ASC",
  vendorName: "All",
  status: "All",
};

function PersentationStatus() {
  const [dataRequest, setDataRequest] = useState(defaultHit);
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  //loading
  function LoadingHandler(loaderValue) {
    setIsLoading(loaderValue);
  }

  useEffect(() => {
    doGetSummarySurveyVendor(LoadingHandler, dataRequest)
      .then((response) => {
        console.log(response);
        if (response) {
          if (response.responseCode === "00") {
            setData(response);
          }
        }
      })
      .catch((err) => {
        console.log(`Error Fetching data \n${err}`);
      });
  }, [dataRequest]);

  const dummyData = [
    {
      title: "Open",
      value: data.open ? data.open + "%" : 0 + "%",
      icon: <IconOpen />,
    },
    {
      title: "Tepat Waktu",
      value: data.tepatWaktu ? data.tepatWaktu + "%" : 0 + "%",
      icon: <IconTepat />,
    },
    {
      title: "Delay",
      value: data.delay ? data.delay + "%" : 0 + "%",
      icon: <IconDelay />,
    },
    {
      title: "Tidak Dikerjakan",
      value: data.tidakDikerjakan ? data.tidakDikerjakan + "%" : 0 + "%",
      icon: <IconClose />,
    },
    {
      title: "Manual",
      value: data.manual ? data.manual + "%" : 0 + "%",
      icon: <IconManual />,
    },
  ];
  return (
    <div>
      <Row justify="center" align="middle" gutter={[10, 10]}>
        {dummyData.map((item) => {
          return (
            <Col flex={1}>
              {isLoading ? (
                <LoadingView />
              ) : (
                <CardPersentation
                  leftIcon={item.icon}
                  title={item.title}
                  value={item.value}
                />
              )}
            </Col>
          );
        })}
      </Row>
    </div>
  );
}

export default PersentationStatus;
