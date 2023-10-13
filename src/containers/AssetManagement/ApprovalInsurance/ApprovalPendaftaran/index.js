import React, { useEffect, useState } from "react";
// import lib
import { Layout } from "antd";
import { useHistory } from "react-router-dom";
import GeneralCard from "../../../../components/Card/GeneralCard";
import { makeStyles, withStyles } from "@material-ui/styles";
import { Grid, Box } from "@material-ui/core";
// import component
import {
  Barlow36,
  Barlow13,
  Barlow24,
  Barlow12,
  Barlow18,
  Barlow14,
} from "../../../../components/Typography/BarlowWithSize";
import { TableCheckPagination } from "../../../../components/chky";
import FilterComponent from "./common/FilterComponent";
import MuiButton from "../../../../components/Button/MuiButton";
import RedCheckbox from "../../../../components/Checkbox/RedCheckbox";
import dataDummy, { dummyApprover } from "./common/DataDummy";
import TableTemplate from "./common/TableTemplate";
import AvatarBox from "../../../../components/Box/AvatarBox";
import * as Colors from "../../../../assets/theme/colors";
import { PrimaryHard } from "../../../../assets/theme/colors";
import TableChips from "../../../../components/Chips/TableChips";

const useStyles = makeStyles({
  root: {
    padding: 30,
    background: "inherit",
  },
  buttonApprove: {
    margin: 10,
    paddingTop: 11,
    paddingBottom: 11,
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 14,
    backgroundColor: "#65D170",
    textTransform: "capitalize",
    color: Colors.White,
    boxShadow: "0px 6px 6px 0px rgba(220, 36, 31, 0.1)",
    borderRadius: "8px",
  },
  flexRow: {
    display: "flex",
    flexDirection: "row",
    gap: 2,
    justifyContent: "center",
    alignItems: "center",
  },
});

const defaultDataHit = {
  sortType: "ASC",
  sortBy: "tanggal",
  pageNumber: 0,
  dataPerPage: 10,
  ceklist: [""],
  textInput: "",
};

const ApprovalInsurance = () => {
  // Lib variable
  const { Content } = Layout;
  const history = useHistory();
  const { root, buttonApprove, flexRow } = useStyles();

  // State
  const [dataAPI, setDataAPI] = useState([]);
  const [inputSearch, setInputSearch] = useState("");
  const [selectFilter, setSelectFilter] = useState("all");
  const [checkInput, setCheckInput] = useState();
  const [dataRequest, setDataRequest] = useState(defaultDataHit);

  // chkyPagination handler start =======================================

  // chips handler
  const chipsHandler = (type) => {
    const condition = {
      done: "success",
      assigned: "info",
      onprogress: "warning",
      open: "purple",
      unprocessed: "error",
      overdue: "default",
    };

    return condition[type] ?? "default";
  };

  const approverHandler = (approvers) => {
    let colorIndex = 0;
    const color = ["#88ADFF", "#FFB443", "#65D170"];
    const listApprover = approvers.map((approver, index) => {
      colorIndex += 1;
      if (colorIndex % 3 === 0) colorIndex = 0;
      return (
        <AvatarBox
          key={index}
          style={{ background: color[colorIndex], width: 30, height: 30 }}
        >
          <Barlow14 style={{ fontWeight: 500, color: "#FFFFFF" }}>
            {approver}
          </Barlow14>
        </AvatarBox>
      );
    });
    return listApprover;
  };

  const handleChangePage = (newPage) => {
    setDataRequest({
      ...dataRequest,
      pageNumber: newPage,
    });
  };

  const handleSorting = (type, column) => {
    setDataRequest({
      ...dataRequest,
      sortType: type,
      sortBy: column,
    });
  };

  const onCheckOne = (selectedItems) => {
    console.log("<<<<< CHECK PARENT : ", JSON.stringify(selectedItems));
    setCheckInput(selectedItems);
  };

  const tableHeader = [
    {
      id: "id",
      numeric: false,
      disablePadding: false,
      label: "ID",
    },
    {
      id: "approvalId",
      numeric: false,
      disablePadding: false,
      label: "Approval ID",
    },
    {
      id: "requestId",
      numeric: false,
      disablePadding: false,
      label: "Request ID",
    },
    {
      id: "requestorName",
      numeric: false,
      disablePadding: false,
      label: "Nama Requestor",
    },
    {
      id: "requestDate",
      numeric: false,
      disablePadding: false,
      label: "Tgl Request",
    },
    {
      id: "machineId",
      numeric: false,
      disablePadding: false,
      label: "ID Mesin",
    },
    {
      id: "location",
      numeric: false,
      disablePadding: false,
      label: "Lokasi",
    },
    {
      id: "jenisAsuransi",
      numeric: false,
      disablePadding: false,
      label: "Jenis Asuransi",
    },
    {
      id: "typeAsuransi",
      numeric: false,
      disablePadding: false,
      label: "Type Asuransi",
    },
    {
      id: "harga",
      numeric: false,
      disablePadding: false,
      label: "Harga",
    },
    {
      id: "sla",
      numeric: false,
      disablePadding: false,
      label: "SLA",
    },
    {
      id: "approver",
      numeric: false,
      disablePadding: false,
      label: "Approver",
    },
    {
      id: "statusApproval",
      numeric: false,
      disablePadding: false,
      label: "Status Approval",
    },
    {
      id: "approvalDate",
      numeric: false,
      disablePadding: false,
      label: "Tanggal Approval",
    },
    {
      id: "action",
      numeric: false,
      disablePadding: false,
      label: "",
      disabledSort: true,
    },
  ];

  useEffect(() => {
    const dataArr = [];
    dataDummy.map((item, index) => {
      const obj = {};
      obj.id = item.id;
      obj.approvalId = item.approvalId;
      obj.requesterId = item.requesterId;
      obj.namaRequestor = item.namaRequestor;
      obj.requestDate = item.requestDate;
      obj.idMesin = item.idMesin;
      obj.location = item.location;
      obj.jenisAsuransi = item.jenisAsuransi;
      obj.typeTransaksi = item.typeTransaksi;
      obj.harga = item.harga;
      obj.sla = item.sla;
      obj.approver = (
        <div className={flexRow}>{approverHandler(item.approver)}</div>
      );
      obj.statusApproval =
        item.statusApproval === 1 ? (
          <TableChips label="Approved" type={chipsHandler("done")} />
        ) : item.statusApproval === 2 ? (
          <TableChips label="Need Approval" type={chipsHandler("onprogress")} />
        ) : null;
      obj.approvalDate = item.approvalDate;
      obj.detail = (
        <div
          onClick={() =>
            history.push(
              `/asset-management/insurance/register-insurance-approval/detail/${item.id}`
            )
          }
        >
          <Barlow13
            style={{ fontWeight: 400, color: PrimaryHard, cursor: "pointer" }}
          >
            Detail
          </Barlow13>
        </div>
      );
      dataArr.push(obj);
    });
    setDataAPI(dataArr);
  }, []);

  // chkyPagination handler end =========================================

  // Function
  const onChangeSearch = (value) => {
    setInputSearch(value);
  };

  const onSelectFilter = (value) => {
    setSelectFilter(value);
  };

  const onSubmitFilter = () => {
    console.log(inputSearch);
    console.log(selectFilter);
  };

  let colorIndex = 0;
  const listApprover = dummyApprover.map((item, index) => {
    const color = ["#88ADFF", "#FFB443", "#65D170"];
    colorIndex += 1;
    if (colorIndex % 3 === 0) colorIndex = 0;
    return (
      <Grid item key={index} xs={4}>
        <Grid
          container
          alignItems="flex-start"
          justifyContent="flex-start"
          spacing={1}
        >
          <Grid item xs={2}>
            <AvatarBox style={{ background: color[colorIndex] }}>
              <Barlow18 style={{ fontWeight: 500, color: "#FFFFFF" }}>
                {item.initial}
              </Barlow18>
            </AvatarBox>
          </Grid>
          <Grid item xs={10}>
            <Barlow12 style={{ fontWeight: 600 }}>{item.name}</Barlow12>
            <Barlow12 style={{ fontWeight: 400 }}>{item.division}</Barlow12>
          </Grid>
        </Grid>
      </Grid>
    );
  });

  return (
    <>
      <Layout className={root}>
        {/* title */}
        <Content>
          <Barlow36 style={{ fontWeight: 500 }}>Approval</Barlow36>
        </Content>

        {/* filter */}
        <Content style={{ marginTop: 25 }}>
          <FilterComponent
            inputSearch={inputSearch}
            selected={selectFilter}
            onChangeSearch={onChangeSearch}
            onChangeSelect={onSelectFilter}
            onSubmit={onSubmitFilter}
          />
        </Content>

        {/* reject and approve button */}
        <Content style={{ marginTop: 20 }}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <MuiButton
                label={<Barlow13 style={{ fontWeight: 600 }}>Reject</Barlow13>}
                style={{ height: "41px" }}
                onClick={() => {}}
              />
            </Grid>
            <Grid item>
              <MuiButton
                label={<Barlow13 style={{ fontWeight: 600 }}>Approve</Barlow13>}
                style={{ height: "40px" }}
                className={buttonApprove}
                onClick={() => {}}
              />
            </Grid>
          </Grid>
        </Content>

        {/* chkyTablePagination */}
        <Content style={{ marginTop: 30 }}>
          <TableCheckPagination
            data={dataAPI}
            fields={tableHeader}
            totalPages={1}
            totalRows={dataDummy.length}
            cellOption={TableTemplate.valueType}
            onSelectedItemsObj={onCheckOne}
            changePage={handleChangePage}
            sorting={handleSorting}
            rowsPerPage={10}
            isSort
          />
        </Content>
        <Content>
          <GeneralCard
            variant="outlined"
            style={{ padding: 15, paddingBottom: 30 }}
          >
            <Barlow24 style={{ fontWeight: 500 }}>Approver</Barlow24>
            <Grid container alignItems="flex-start" style={{ marginTop: 20 }}>
              {listApprover}
            </Grid>
          </GeneralCard>
        </Content>
      </Layout>
    </>
  );
};

export default ApprovalInsurance;
