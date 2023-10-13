import React, { useState } from "react";
// import Lib
import PropTypes from "prop-types";
import { Grid, FormControl } from "@material-ui/core";
import { Select } from "antd";
import { makeStyles, withStyles } from "@material-ui/styles";

// import Component
import GeneralCard from "../../../../../../components/Card/GeneralCard";
import MuiButton from "../../../../../../components/Button/MuiButton";
import {
  Barlow13,
  Barlow15,
} from "../../../../../../components/Typography/BarlowWithSize";
import { PrimaryHard } from "../../../../../../assets/theme/colors";
import ChkySearchBar from "./searchBar";

const useStyles = makeStyles({
  root: {
    padding: "18px 20px",
  },
  flexRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  selectStyle: {
    "& .ant-select-single .ant-select-selector": {
      height: "100%",
      border: "1px solid #BCC8E7",
      backgroundColor: "#DC241F",
      paddingTop: "5px",
      paddingBottom: "4px",
      color: "#FFFF",
      borderRadius: "6px 0px 0px 6px",
      minWidth: 150,
    },
    "& .ant-select-single .ant-select-arrow": {
      color: "#FFFF",
      transition: "transform 0.2s ease-in",
    },
    "& .ant-select.ant-select-open .ant-select-arrow": {
      transform: "rotate(180deg)",
      transition: "transform 0.2s ease-in",
    },
  },
});

const valueFilter = [
  {
    label: "Approval ID",
    value: "approvalId",
  },
  {
    label: "Request ID",
    value: "requestId",
  },
  {
    label: "Nama Requestor",
    value: "requestorName",
  },
  {
    label: "Tgl Request",
    value: "requestDate",
  },
  {
    label: "ID Mesin",
    value: "idMesin",
  },
  {
    label: "Lokasi",
    value: "location",
  },
  {
    label: "Jenis Asuransi",
    value: "jenisAsuransi",
  },
  {
    label: "Type Transaksi",
    value: "typeTransaksi",
  },
  {
    label: "Harga",
    value: "harga",
  },
  {
    label: "SLA",
    value: "sla",
  },
  {
    label: "Approver",
    value: "approver",
  },
  {
    label: "Status Approval",
    value: "statusApproval",
  },
  {
    label: "Tanggal Approval",
    value: "approvalDate",
  },
];

const FlexFilter = (props) => {
  const { flexRow } = useStyles();
  return (
    <>
      <div className={flexRow}>{props.children}</div>
    </>
  );
};

const FilterComponent = (props) => {
  // props
  const { selected, inputSearch, onChangeSearch, onChangeSelect, onSubmit } =
    props;

  // variable
  const { root, selectStyle } = useStyles();

  // function

  return (
    <>
      <GeneralCard variant="outlined" className={root}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Grid container alignItems="center" spacing={2}>
              <Grid item>
                <Barlow13 style={{ fontWeight: 600 }}>Showing :</Barlow13>
              </Grid>
              <Grid item>
                <FlexFilter>
                  <FormControl className={selectStyle}>
                    <Select value={selected} onChange={onChangeSelect}>
                      <Option value="all">All</Option>
                      {valueFilter.map((item, index) => (
                        <Option value={item.value} key={index}>
                          {item.label}
                        </Option>
                      ))}
                    </Select>
                  </FormControl>
                  <ChkySearchBar
                    value={inputSearch}
                    onChange={onChangeSearch}
                    onSubmit={onSubmit}
                    width={200}
                    placeholder={"search ..."}
                  />
                </FlexFilter>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <MuiButton
              label="Apply"
              style={{ height: "41px" }}
              onClick={() => {
                onSubmit();
              }}
            />
          </Grid>
        </Grid>
      </GeneralCard>
    </>
  );
};

FilterComponent.propTypes = {
  inputSearch: PropTypes.string,
  selected: PropTypes.string,
  onChangeSearch: PropTypes.func,
  onChangeSelect: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default FilterComponent;
