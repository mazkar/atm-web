/* eslint-disable react/jsx-no-bind */
/* Third Party Import */
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import { Typography, Button, Grid, Avatar, Box } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

/* Internal Import */
import { ChkyTablePagination } from "../../../components";
import { PrimaryHard, PrimaryUltrasoft } from "../../../assets/theme/colors";
import FilterProgress from "./common/FilterProgress";
import TableTemplate from "./common/TableTemplate";
import PropTypes from "prop-types";
import MenuPopUp from "./common/MenuPopUp";
import TableChips from "../../../components/Chips/TableChips";
import MuiIconLabelButton from "../../../components/Button/MuiIconLabelButton";
import AddMasterKeyPopUp from "./common/PopUp/addRequestMasterKey";

const useStyles = makeStyles({
  root: {
    padding: "30px 20px 20px 30px",
  },
  title: {
    fontWeight: 500,
    fontSize: 36,
    color: "#2B2F3C",
  },
  textButton: {
    color: PrimaryHard,
    textTransform: "capitalize",
  },
});

const rowsPerPage = 10; // <--- init default rowsPerPage
const defaultDataHit = {
  pageNumber: 0,
  dataPerPage: rowsPerPage,
  sortBy: "id",
  sortType: "ASC",
};

const approvalStyles = makeStyles({
  root: {
    display: "flex",
    flexWrap: "wrap",
    padding: "0px 0px",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    display: "flex",
    "& > *": {},
    fontSize: 18,
  },
});

const ApprovalBy = (props) => {
  const classes = approvalStyles();
  // init Props
  const { initial } = props;
  function renderBackColor(intialName) {
    if (intialName === "DH") {
      return "#88ADFF";
    }
    if (intialName === "TS") {
      return "#FFB443";
    }
    if (intialName === "BA") {
      return "#65D170";
    }
    if (intialName === "Y") {
      return "#FF6A6A";
    }
    return "#88ADFF";
  }
  return (
    <div className={classes.root}>
      <Avatar
        style={{ backgroundColor: renderBackColor(initial) }}
        className={classes.avatar}
      >
        {initial}
      </Avatar>
    </div>
  );
};

ApprovalBy.propTypes = {
  name: PropTypes.string,
  jobTitle: PropTypes.string,
  initial: PropTypes.string,
};

ApprovalBy.defaultProps = {
  name: "Nama Lengkap",
  jobTitle: "Job Title",
  initial: "N",
};
let approvals = [
  { id: 1, initial: "BA" },
  { id: 2, initial: "TS" },
  { id: 3, initial: "AA" },
];
//FUNCTION CHIP HANDLER
function chipsHandler(type) {
  /*
    [props in table] : "color in chips component"
  */
  const condition = {
    done: "success",
    assigned: "info",
    onprogress: "warning",
    open: "purple",
    unprocessed: "error",
    overdue: "default",
  };

  return condition[type] ?? "default";
}

const StatusApproval = (
  <TableChips label="Approved" type={chipsHandler("done")} />
);
const Status = <TableChips label="Done" type={chipsHandler("done")} />;
const Status1 = (
  <TableChips label="Waiting Acknowledge" type={chipsHandler("onprogress")} />
);
const Status2 = (
  <TableChips label="Rejected" type={chipsHandler("unprocessed")} />
);

const Approval = approvals.map((item) => (
  <div key={item.id} style={{ display: "inline-flex", marginRight: "2px" }}>
    <ApprovalBy
      name="Roy Axter"
      jobTitle="ATM Site Management Head"
      initial={item.initial}
    />
  </div>
));
const MasterKey = () => {
  const classes = useStyles();
  const history = useHistory();

  const [openMasterKey, setOPenMasterKey] = useState(false);
  const [dataRequest, setDataRequest] = useState(defaultDataHit);
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [resetPageCounter, setResetPageCounter] = useState(0);
  const [tableConfig, setTableConfig] = useState({
    dataRequest: {
      pageNumber: 0,
      dataPerPage: rowsPerPage,
      sortBy: "id",
      sortType: "ASC",
    },
    orderDirection: "ASC",
    totalPages: 0,
    totalRows: 0,
    sortBy: null,
  });

  /* Methods */
  function handleFilterSubmit(value) {
    setIsFilterApplied(true);
    setResetPageCounter((prevCount) => prevCount + 1);
    if (value === null) {
      setDataRequest(defaultDataHit);
    } else {
      // console.log("Sasa",value);
      setDataRequest({
        ...defaultDataHit,
        ...value,
      });
    }
  }

  function handleSortTable(property) {
    return function actualFn(e) {
      const isActiveAndAsc =
        tableConfig.sortBy === property && tableConfig.orderDirection === "ASC";
      const sortByNewVal =
        TableTemplate.columnNameVar[TableTemplate.titleTable.indexOf(property)];
      const sortType = isActiveAndAsc ? "DESC" : "ASC";
      setTableConfig((prevValue) => ({
        ...prevValue,
        orderDirection: sortType,
        sortBy: property,
        dataRequest: {
          ...tableConfig.dataRequest,
          sortType,
          sortBy: sortByNewVal,
        },
      }));
    };
  }

  function handleChangePage(newPage) {
    setTableConfig({
      dataRequest: {
        ...tableConfig.dataRequest,
        pageNumber: newPage,
      },
    });
  }

  function handleResetFilter() {
    setIsFilterApplied(false);
    setDataRequest({
      ...defaultDataHit,
    });
  }

  const tableData = [
    {
      IDRequest: "01",
      UserRequest: "Vina Panduwinata",
      TanggalRequest: "18-06-2022",
      NamaVendor: "PT Trias NUsantara",
      ATMID: "122",
      Lokasi: "TGR-CGM-CBB-CLG",
      Detail: "TGR-CGM-CBB-CLG",
      Remark: "-",
      MasterKey: "****",
      Approver: Approval,
      StatusApproval: StatusApproval,
      TglApproval: "12-12-2022",
      Status: Status,
      action: <MenuPopUp />,
    },
    {
      IDRequest: "02",
      UserRequest: "Vina Panduwinata",
      TanggalRequest: "18-06-2022",
      NamaVendor: "PT Trias Nusantara",
      ATMID: "122",
      Lokasi: "TGR-CGM-CBB-CLG",
      Detail: "TGR-CGM-CBB-CLG",
      Remark: "-",
      MasterKey: "****",
      Approver: "-",
      StatusApproval: "",
      TglApproval: "12-12-2022",
      Status: Status1,
      action: <MenuPopUp />,
    },
    {
      IDRequest: "03",
      UserRequest: "Vina Panduwinata",
      TanggalRequest: "18-06-2022",
      NamaVendor: "PT Trias Nusantara",
      ATMID: "122",
      Lokasi: "TGR-CGM-CBB-CLG",
      Detail: "TGR-CGM-CBB-CLG",
      Remark: "-",
      MasterKey: "****",
      Approver: "-",
      StatusApproval: "",
      TglApproval: "12-12-2022",
      Status: Status2,
      action: <MenuPopUp  />,
    },
  ];

  return (
    <div className={classes.root}>
      <Grid container justify="space-between">
        <Grid item>
          <Typography className={classes.title}>
            Master Key dan BA Penghancuran
          </Typography>
        </Grid>
        <Grid item>
          <MuiIconLabelButton
            style={{
              width: "max-content",
              right: 0,
              height: 40,
              boxShadow: "0px 6px 6px rgba(220, 36, 31, 0.1)",
              borderRadius: "6px",
            }}
            label="Request Master Key"
            iconPosition="endIcon"
            onClick={() => {
              setOPenMasterKey(true);
            }}
            buttonIcon={<AddIcon />}
          />
        </Grid>
      </Grid>

      <FilterProgress isOpening={false} />
      <ChkyTablePagination
        data={tableData}
        rowsPerPage={rowsPerPage}
        fields={TableTemplate.titleTable}
        cellOption={TableTemplate.valueType}
        isSort={TableTemplate.isSort}
        totalPages={tableConfig.totalPages}
        totalRows={tableConfig.totalRows}
        sortBy={tableConfig.sortBy}
        order={tableConfig.orderDirection}
        changePage={handleChangePage}
        handleSort={handleSortTable}
        isUsingMuiSort
      />
      <AddMasterKeyPopUp
        isOpen={openMasterKey}
        onClose={() => setOPenMasterKey(false)}
      />
    </div>
  );
};

export default MasterKey;
