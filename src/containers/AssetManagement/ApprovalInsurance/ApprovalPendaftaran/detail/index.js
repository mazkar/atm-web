import React, { useState, useEffect } from "react";
// lib import
import { makeStyles, withStyles } from "@material-ui/styles";
import { useHistory, useParams } from "react-router-dom";
import moment from "moment";
import numeral from "numeral";
import { Layout } from "antd";
import { Grid } from "@material-ui/core";

// component import
import GeneralCard from "../../../../../components/Card/GeneralCard";
import MuiIconLabelButton from "../../../../../components/Button/MuiIconLabelButton";
import MuiButton from "../../../../../components/Button/MuiButton";
import RedCheckbox from "../../../../../components/Checkbox/RedCheckbox";
import constant from "../../../../../helpers/constants";
import { ReactComponent as LeftArrow } from "../../../../../assets/icons/linear-red/arrow-left.svg";
import dataDummy from "./common/dataDummy";
import {
  Barlow36,
  Barlow13,
  Barlow15,
} from "../../../../../components/Typography/BarlowWithSize";
import useTimestampConverter from "../../../../../helpers/useTimestampConverter";
import TableChips from "../../../../../components/Chips/TableChips";
import HistoryList from "./common/HistoryList";
import PopupReject from "./common/popUpReject";
import PopUpConfirmationSecondary from "../../../../../components/PopUpConfirmationSecondary";
import PopupSuccesSecondary from "../../../../../components/PopupSuccessSecondary";

const useStyles = makeStyles({
  cardStyle: {
    padding: "30px 20px",
  },
  bottomLine: {
    paddingBottom: 10,
    borderBottom: `2px solid ${constant.color.grayMedium}`,
  },
  flexBetween: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
    color: constant.color.white,
    boxShadow: "0px 6px 6px 0px rgba(220, 36, 31, 0.1)",
    borderRadius: "8px",
  },
});

const RegisterApprovalDetail = () => {
  const { Content } = Layout;
  const { cardStyle, bottomLine, flexBetween, buttonApprove } = useStyles();
  const [isReject, setIsReject] = useState(false);
  const [isConfirmation, setIsConfirmation] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [reasonReject, setReasonReject] = useState("");

  const [onBehalf, setOnBehalf] = useState(false);

  const onChangeCheckBox = (bool) => {
    setOnBehalf(bool);
  };

  const onChangeReason = (val) => {
    setReasonReject(val);
  };

  const onCloseRejection = () => {
    setIsReject(false);
  };

  const submitRejection = () => {
    console.log(reasonReject);
  };

  const onCloseConfirmation = () => {
    setIsConfirmation(false);
  };

  const onApprove = () => {
    setIsConfirmation(false);
    setIsApproved(true);
  };

  const onCloseSuccess = () => {
    setIsApproved(false);
  };

  const labelUserData = (key) => {
    switch (key) {
      case "requestorName":
        return "Nama Requestor";
      case "onBehalf":
        return "On Behalf";
      case "telephone":
        return "Telephone";
      case "email":
        return "Email";
      case "divisi":
        return "Divisi";
      case "team":
        return "Team";
      case "branch":
        return "Branch";

      default:
        return "unknown";
    }
  };

  const labelDetailPermintaan = (key) => {
    switch (key) {
      case "jenisAsuransi":
        return "Jenis Asuransi";
      case "typeAsuransi":
        return "Type Asuransi";
      case "cashMachineName":
        return "Cash Machine Name";
      case "model":
        return "Model";
      case "machineId":
        return "Machine ID";
      case "lokasi":
        return "Lokasi";
      case "typeMesin":
        return "Type Mesin";
      case "serialNumber":
        return "Serial Number";
      case "harga":
        return "Harga";
      case "tanggalEfektif":
        return "Tanggal Efektif";
      case "alamat":
        return "Alamat";

      default:
        return "unknown";
    }
  };

  const leftListUserData = Object.keys(dataDummy.dummyDataUser).map(
    (key, index) => {
      const lastIndex = Math.floor(
        Object.keys(dataDummy.dummyDataUser).length / 2
      );

      if (index <= lastIndex)
        return (
          <Grid
            key={index}
            container
            justifyContent="space-between"
            alignItems="center"
            style={{ marginTop: 15 }}
          >
            <Grid item xs={5}>
              <Barlow15 style={{ fontWeight: 400 }}>
                {labelUserData(key)}
              </Barlow15>
            </Grid>
            <Grid item xs={1}>
              :
            </Grid>
            <Grid item xs={6}>
              {key === "onBehalf" ? (
                <RedCheckbox
                  inputState={onBehalf}
                  onChange={() => onChangeCheckBox(!onBehalf)}
                />
              ) : (
                <Barlow15 style={{ fontWeight: 600 }}>
                  {Object.values(dataDummy.dummyDataUser)[index]}
                </Barlow15>
              )}
            </Grid>
          </Grid>
        );
    }
  );

  const rightListUserData = Object.keys(dataDummy.dummyDataUser).map(
    (key, index) => {
      const firstIndex = Math.floor(
        Object.keys(dataDummy.dummyDataUser).length / 2
      );

      if (index > firstIndex)
        return (
          <Grid
            key={index}
            container
            justifyContent="space-between"
            alignItems="center"
            style={{ marginTop: 15 }}
          >
            <Grid item xs={5}>
              <Barlow15 style={{ fontWeight: 400 }}>
                {labelUserData(key)}
              </Barlow15>
            </Grid>
            <Grid item xs={1}>
              :
            </Grid>
            <Grid item xs={6}>
              <Barlow15 style={{ fontWeight: 600 }}>
                {Object.values(dataDummy.dummyDataUser)[index]}
              </Barlow15>
            </Grid>
          </Grid>
        );
    }
  );

  const leftListDetailPermintaan = Object.keys(
    dataDummy.dummyDetailPermintaan
  ).map((key, index) => {
    const lastIndex = Math.floor(
      Object.keys(dataDummy.dummyDetailPermintaan).length / 2
    );

    if (index <= lastIndex)
      return (
        <Grid
          container
          key={index}
          justifyContent="space-between"
          alignItems="center"
          style={{ marginTop: 15 }}
        >
          <Grid item xs={5}>
            <Barlow15 style={{ fontWeight: 400 }}>
              {labelDetailPermintaan(key)}
            </Barlow15>
          </Grid>
          <Grid item xs={1}>
            :
          </Grid>
          <Grid item xs={6}>
            <Barlow15 style={{ fontWeight: 600 }}>
              {Object.values(dataDummy.dummyDetailPermintaan)[index]}
            </Barlow15>
          </Grid>
        </Grid>
      );
  });

  const rightListDetailPermintaan = Object.keys(
    dataDummy.dummyDetailPermintaan
  ).map((key, index) => {
    const firstIndex = Math.floor(
      Object.keys(dataDummy.dummyDetailPermintaan).length / 2
    );

    if (index > firstIndex)
      return (
        <Grid
          container
          key={index}
          justifyContent="space-between"
          alignItems="center"
          style={{ marginTop: 15 }}
        >
          <Grid item xs={5}>
            <Barlow15 style={{ fontWeight: 400 }}>
              {labelDetailPermintaan(key)}
            </Barlow15>
          </Grid>
          <Grid item xs={1}>
            :
          </Grid>
          <Grid item xs={6}>
            <Barlow15 style={{ fontWeight: 600 }}>
              {Object.values(dataDummy.dummyDetailPermintaan)[index]}
            </Barlow15>
          </Grid>
        </Grid>
      );
  });

  const GridStatus = (props) => {
    return (
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        style={{ marginTop: 15 }}
      >
        <Grid item xs={5}>
          <Barlow15 style={{ fontWeight: 400 }}>{props.label}</Barlow15>
        </Grid>
        <Grid item xs={1}>
          :
        </Grid>
        <Grid item xs={6}>
          <Barlow15 style={{ fontWeight: 600 }}>{props.content}</Barlow15>
        </Grid>
      </Grid>
    );
  };

  return (
    <>
      {/* pop up reject */}
      <PopupReject
        value={reasonReject}
        onChange={onChangeReason}
        onClose={onCloseRejection}
        onConfirm={submitRejection}
        isOpen={isReject}
      />

      {/* pop up confirmation */}
      <PopUpConfirmationSecondary
        message="Pendaftaran Asuransi Approve"
        desc="Are you sure want to approve new insurance registration?"
        onClose={onCloseConfirmation}
        onLeave={onCloseConfirmation}
        onSubmit={onApprove}
        isOpen={isConfirmation}
        width={620}
      />

      {/* pop up succes */}
      <PopupSuccesSecondary
        isOpen={isApproved}
        onClose={onCloseSuccess}
        message="Pendaftaran Asuransi Approved"
        desc={"New insurance has been approved"}
        width={620}
      />

      <Layout style={{ background: "inherit", padding: 30 }}>
        {/* back button */}
        <Content>
          <MuiIconLabelButton
            label={"Back"}
            style={{
              background: "inherit",
              color: constant.color.primaryHard,
              paddingLeft: 0,
            }}
            iconPosition="startIcon"
            buttonIcon={<LeftArrow />}
          />
        </Content>

        {/* title page */}
        <Content style={{ marginTop: 20 }}>
          <Barlow36 style={{ fontWeight: 500 }}>Detail Asuransi</Barlow36>
        </Content>

        {/* content card */}
        <Content style={{ marginTop: 20 }}>
          <Grid
            container
            justifyContent="space-between"
            alignItems="flex-start"
            spacing={2}
          >
            {/* left grid card */}
            <Grid item xs={8}>
              {/* Card */}
              <GeneralCard variant="outlined" className={cardStyle}>
                <Layout style={{ background: "inherit" }}>
                  {/* Data User Title */}
                  <Content className={bottomLine}>
                    <Barlow13
                      style={{
                        fontWeight: 600,
                        color: constant.color.grayMedium,
                      }}
                    >
                      Data User
                    </Barlow13>
                  </Content>

                  {/* Data User Content */}
                  <Content style={{ marginTop: 5 }}>
                    <Grid
                      container
                      justifyContent="space-between"
                      alignItems="flex-start"
                      spacing={2}
                    >
                      {/* left Grid */}
                      <Grid item xs={6}>
                        {leftListUserData}
                      </Grid>

                      {/* right Grid */}
                      <Grid item xs={6}>
                        {rightListUserData}
                      </Grid>
                    </Grid>
                  </Content>

                  {/* Detail Permintaan Title */}
                  <Content className={bottomLine} style={{ marginTop: 20 }}>
                    <Barlow13
                      style={{
                        fontWeight: 600,
                        color: constant.color.grayMedium,
                      }}
                    >
                      Detail Permintaan
                    </Barlow13>
                  </Content>

                  {/* Detail Permintaan Content */}
                  <Content style={{ marginTop: 5 }}>
                    <Grid
                      container
                      justifyContent="space-between"
                      alignItems="flex-start"
                      spacing={2}
                    >
                      <Grid item xs={6}>
                        {leftListDetailPermintaan}
                      </Grid>
                      <Grid item xs={6}>
                        {rightListDetailPermintaan}
                      </Grid>
                    </Grid>
                  </Content>

                  {/* button reject and approve */}
                  <Content className={flexBetween} style={{ marginTop: 20 }}>
                    {/* button reject */}
                    <MuiButton
                      label="Reject"
                      onClick={() => setIsReject(true)}
                      style={{ height: 38 }}
                    />

                    {/* button approve */}
                    <MuiButton
                      label="Approve"
                      onClick={() => setIsConfirmation(true)}
                      className={buttonApprove}
                      style={{ height: 38 }}
                    />
                  </Content>
                </Layout>
              </GeneralCard>
            </Grid>

            {/* right grid */}
            <Grid item xs={4}>
              <GeneralCard variant="outlined" className={cardStyle}>
                <Layout style={{ background: "inherit" }}>
                  {/* status title */}
                  <Content className={bottomLine}>
                    <Barlow15
                      style={{
                        fontWeight: 600,
                        color: constant.color.grayMedium,
                      }}
                    >
                      Status
                    </Barlow15>
                  </Content>

                  {/* list status */}
                  <Content style={{ marginTop: 5 }}>
                    <GridStatus
                      label="Request ID"
                      content={dataDummy.dummyStatus.requestId}
                    />
                    <GridStatus
                      label="Order Date"
                      content={useTimestampConverter(
                        dataDummy.dummyStatus.orderDate,
                        "DD/MM/YYYY H:mm"
                      )}
                    />
                    <GridStatus
                      label="Due Date"
                      content={useTimestampConverter(
                        dataDummy.dummyStatus.dueDate,
                        "DD/MM/YYYY H:mm"
                      )}
                    />
                    <GridStatus
                      label="Status"
                      content={
                        dataDummy.dummyStatus.status === 0 ? (
                          <TableChips
                            label="Need Approval"
                            type={"warning"}
                            // style={{ width: 105 }}
                          />
                        ) : (
                          <TableChips
                            label="Overdue"
                            type={"error"}
                            // style={{ width: 105 }}
                          />
                        )
                      }
                    />
                  </Content>
                </Layout>
              </GeneralCard>

              {/* history List */}
              <GeneralCard
                variant="outlined"
                className={cardStyle}
                style={{ marginTop: 20, paddingBottom: 0 }}
              >
                <Layout style={{ background: "inherit" }}>
                  {/* history title */}
                  <Content>
                    <Barlow15 style={{ fontWeight: 600 }}>History</Barlow15>
                  </Content>

                  {/* history List */}
                  <Content style={{ marginTop: 10 }}>
                    <HistoryList data={dataDummy.historyDummy} />
                  </Content>
                </Layout>
              </GeneralCard>
            </Grid>
          </Grid>
        </Content>
      </Layout>
    </>
  );
};

export default RegisterApprovalDetail;
