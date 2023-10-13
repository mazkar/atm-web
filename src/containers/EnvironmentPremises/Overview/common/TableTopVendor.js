import React from "react";
import { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { ReactComponent as ArrowUp } from "../../../../assets/icons/linear-red/arrow-alt-up.svg";
import TopTenContainer from "../../../../components/Table/TopTenContainer";
import { useEffect } from "react";
import { doGetTopTenVendor } from "../../ApiServicesEnvironmentPremises";

const useStyle = makeStyles({
  root: {
    paddingLeft: 20,
    paddingTop: 20,
    paddingRight: 20,
    maxHeight: 315,

    border: 0,
    borderRadius: 10,
  },
  icon: {
    width: 20,
    height: 20,
    marginTop: 8,
  },
});

const TableTopVendor = () => {
  // variable is here
  const classess = useStyle();
  const { root, icon } = classess;
  const [isLoading, setIsLoading] = useState(true);
  const [dataAPI, setDataAPI] = useState(null);
  const thisIsDummy = [
    {
      "Vendor Name": "PT Raline Shah Abadi",
      "Jumlah Task": "500",
      "Task Selesai": "456",
    },
    {
      "Vendor Name": "PT Raline Shah Abadi",
      "Jumlah Task": "500",
      "Task Selesai": "456",
    },
    {
      "Vendor Name": "PT Raline Shah Abadi",
      "Jumlah Task": "500",
      "Task Selesai": "456",
    },
    {
      "Vendor Name": "PT Raline Shah Abadi",
      "Jumlah Task": "500",
      "Task Selesai": "456",
    },
    {
      "Vendor Name": "PT Raline Shah Abadi",
      "Jumlah Task": "500",
      "Task Selesai": "456",
    },
    {
      "Vendor Name": "PT Raline Shah Abadi",
      "Jumlah Task": "500",
      "Task Selesai": "456",
    },
    {
      "Vendor Name": "PT Raline Shah Abadi",
      "Jumlah Task": "500",
      "Task Selesai": "456",
    },
    {
      "Vendor Name": "PT Raline Shah Abadi",
      "Jumlah Task": "500",
      "Task Selesai": "456",
    },
    {
      "Vendor Name": "PT Raline Shah Abadi",
      "Jumlah Task": "500",
      "Task Selesai": "456",
    },
    {
      "Vendor Name": "PT Raline Shah Abadi",
      "Jumlah Task": "500",
      "Task Selesai": "456",
    },
  ];

  // function is here
  const simulasiFetchData = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(thisIsDummy);
      }, 3000);
    });
  };

  const fetchData = async () => {
    await simulasiFetchData().then((res) => {
      setDataDummy(res);
      setIsLoading(false);
    });
  };

  const loaderHandler = (bool) => {
    setIsLoading(bool);
  };

  const convertResToUI = (response) => {
    const dataArr = [];
    response.map((res) => {
      const obj = {};
      obj["Vendor Name"] = res.vendorName;
      obj["Jumlah Task"] = res.totalTask;
      obj["Task Selesai"] = res.completedTask;
      dataArr.push(obj);
    });
    return dataArr;
  };

  useEffect(() => {
    doGetTopTenVendor(loaderHandler)
      .then((res) => {
        setDataAPI(convertResToUI(res.data.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // simulasi fethData

  return (
    <>
      <TopTenContainer
        Title="Top 10 Vendor"
        titleTable1="Vendor Name"
        titleTable2="Jumlah Task"
        titleTable3="Task Selesai"
        Icon={<ArrowUp className={icon} />}
        isLoadData={isLoading}
        data={dataAPI}
      />
    </>
  );
};

// const { data, Icon, Title, isLoadData, type1, type2, type3 } = props;

// const [currentTabTrx, setCurrentTabTrx] = useState(0);

// const [dataTopTen, setDataTopTen] = useState(null);
// const dataTop10s = null;

// function renderViewTopTen(tab, category, data) {
//   if (data !== null) {
//     // Yearly
//     if (tab === 0) {
//       // eslint-disable-next-line default-case
//       switch (category) {
//       case "transaksiTertinggi":
//         return reformatDataTopTen(data.topTenHighestTransactionsYearly, "");
//       case "revenueTertinggi":
//         return reformatDataTopTen(data.topTenHighestRevenueYearly, "Rp");
//       case "transaksiTerendah":
//         return reformatDataTopTen(data.topTenLowestTransactionsYearly, "");
//       case "transaksiGagal":
//         return reformatDataTopTen(data.topTenFailedHighestYearly, "");
//       default:
//         return dataTop10s;
//       }
//     }
//     // Monthly
//     if (tab === 1) {
//       switch (category) {
//       case "transaksiTertinggi":
//         return reformatDataTopTen(
//           data.topTenHighestTransactionsMonthly,
//           ""
//         );
//       case "revenueTertinggi":
//         return reformatDataTopTen(data.topTenHighestRevenueMonthly, "Rp");
//       case "transaksiTerendah":
//         return reformatDataTopTen(data.topTenLowestTransactionsMonthly, "");
//       case "transaksiGagal":
//         return reformatDataTopTen(data.topTenFailedHighestMonthly, "");
//       default:
//         return dataTop10s;
//       }
//     } else {
//       return dataTop10s;
//     }
//   } else {
//     return dataTop10s;
//   }
// }

{
  /* <Row
gutter={16}
style={{ marginBottom: "1%", justifyContent: "space-between" }}
>
<Col className="gutter-row" span={12}>
  <TopTenContent
    data={renderViewTopTen(
      currentTabTrx,
      "transaksiTertinggi",
      dataTopTen
    )}
    Icon={HighestTrx}
    Title="Top 10 ID Transaksi Tertinggi"
    isLoadData={isOpenModalLoaderTopTen}
    type="Frequency"
  />
</Col>
<Col className="gutter-row" span={12}>
  <TopTenContent
    data={renderViewTopTen(
      currentTabTrx,
      "revenueTertinggi",
      dataTopTen
    )}
    Icon={HighestRev}
    Title="Top 10 ID Revenue Tertinggi"
    isLoadData={isOpenModalLoaderTopTen}
    type="Amount"
  />
</Col>
</Row> */
}

export default TableTopVendor;
