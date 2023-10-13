import React, { useState, useRef, useEffect } from "react";

// import libs
import { useParams, useHistory } from "react-router-dom";
import { Layout, DatePicker, Space } from "antd";
import { makeStyles } from "@material-ui/styles";

// import components
import { Grid } from "@material-ui/core";
import { PrimaryHard, GrayMedium } from "../../../../assets/theme/colors";
import MuiIconLabelButton from "../../../../components/Button/MuiIconLabelButton";
import GeneralCard from "../../../../components/Card/GeneralCard";
import LabelTextField from "../../../../components/Form/LabelTextField";
import FloatingChat from "../../../../components/GeneralComponent/FloatingChat";
import { ReactComponent as CalendarIcon } from "../../../../assets/icons/linear-red/calendar.svg";
import { ReactComponent as LeftArrow } from "../../../../assets/icons/linear-red/arrow-left.svg";
import {
  Barlow36,
  Barlow13,
  Barlow15,
} from "../../../../components/Typography/BarlowWithSize";
import {
  OutlinedButton,
  ContainedButton,
} from "../../../../components/Button/NoiconButton";

const useStyles = makeStyles({
  datePicker: {
    height: "47px",
    borderRadius: "6px",
    border: "1px solid #BCC8E7",
    width: "100%",
    "& .ant-picker-input > input::placeholder": {
      color: "#BCC8E7",
      fontStyle: "italic",
      textOverflow: "ellipsis !important",
      fontSize: 12,
    },
  },
});

const EditMasterData = () => {
  const { Content } = Layout;
  const { id } = useParams();
  const history = useHistory();
  const [inputForm, setInputForm] = useState({
    ticketId: "",
    atmId: "",
    lokasi: "",
    detail: "",
    problem: "",
    tanggal: "",
    bulan: "",
    selesai: "",
    start: "",
    typeMesin: "",
    durasi: "",
    nameIng: "",
  });

  const { datePicker } = useStyles();

  const onChangeform = (key, e, type) => {
    if (type === "date") setInputForm({ ...inputForm, [key]: e });
    if (!type) setInputForm({ ...inputForm, [key]: e.target.value });
  };

  return (
    // root style
    <Layout
      style={{ background: "inherit", padding: "30px 25px", paddingBottom: 40 }}
    >
      {/* floating chat */}
      <FloatingChat />

      {/* content */}
      <Content>
        <MuiIconLabelButton
          label={"Back"}
          iconPosition="startIcon"
          buttonIcon={<LeftArrow />}
          style={{ background: "inherit", color: PrimaryHard, padding: 0 }}
          onClick={() => history.goBack()}
        />
      </Content>
      <Content style={{ marginTop: 20 }}>
        <Barlow36 style={{ fontWeight: 500 }}>Master Data Edit</Barlow36>
      </Content>
      <Content
        style={{
          marginTop: 20,
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        {/* card */}
        <GeneralCard variant="outlined" style={{ width: 640 }}>
          <Layout style={{ background: "inherit", padding: "30px 20px" }}>
            <Content
              style={{
                paddingBottom: 10,
                borderBottom: `2px solid ${GrayMedium}`,
                color: GrayMedium,
              }}
            >
              <Barlow13 style={{ fontWeight: 600 }}>
                Informasi Master Data
              </Barlow13>
            </Content>
            <Content style={{ marginTop: 20 }}>
              {/* first line input */}
              <Grid container alignItems="center" spacing={2}>
                <Grid item xs={6}>
                  <LabelTextField
                    label={
                      <Barlow15 style={{ fontWeight: 400 }}>Ticket ID</Barlow15>
                    }
                    value={inputForm.ticketId}
                    onChange={(e) => onChangeform("ticketId", e)}
                    height={47}
                    disabled
                  />
                </Grid>
                <Grid item xs={6}>
                  <LabelTextField
                    label={
                      <Barlow15 style={{ fontWeight: 400 }}>ATM ID</Barlow15>
                    }
                    value={inputForm.atmId}
                    onChange={(e) => onChangeform("atmId", e)}
                    placeholder="Masukkan ATM ID"
                    height={47}
                  />
                </Grid>
              </Grid>

              {/* second line input */}
              <Grid
                container
                alignItems="center"
                spacing={2}
                style={{ marginTop: 15 }}
              >
                <Grid item xs={6}>
                  <LabelTextField
                    label={
                      <Barlow15 style={{ fontWeight: 400 }}>Lokasi</Barlow15>
                    }
                    value={inputForm.lokasi}
                    onChange={(e) => onChangeform("lokasi", e)}
                    placeholder="Masukkan Lokasi"
                    height={47}
                  />
                </Grid>
                <Grid item xs={6}>
                  <LabelTextField
                    label={
                      <Barlow15 style={{ fontWeight: 400 }}>Detail</Barlow15>
                    }
                    value={inputForm.detail}
                    onChange={(e) => onChangeform("detail", e)}
                    placeholder="Masukkan Detail"
                    height={47}
                  />
                </Grid>
              </Grid>

              {/* third line input */}
              <Grid
                container
                alignItems="center"
                spacing={2}
                style={{ marginTop: 15 }}
              >
                <Grid item xs={6}>
                  <LabelTextField
                    label={
                      <Barlow15 style={{ fontWeight: 400 }}>Problem</Barlow15>
                    }
                    value={inputForm.problem}
                    onChange={(e) => onChangeform("problem", e)}
                    placeholder="Masukkan Problem"
                    height={47}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item xs={6}>
                      <Space direction="vertical" size={5}>
                        <Barlow15 style={{ fontWeight: 400 }}>Tanggal</Barlow15>
                        <DatePicker
                          className={datePicker}
                          value={inputForm.tanggal}
                          onChange={(e) => onChangeform("tanggal", e, "date")}
                          placeholder="Tanggal"
                          format={"DD/MM/YYYY"}
                          suffixIcon={<CalendarIcon />}
                          allowClear={false}
                        />
                      </Space>
                    </Grid>
                    <Grid item xs={6}>
                      <Space direction="vertical" size={5}>
                        <Barlow15 style={{ fontWeight: 400 }}>Bulan</Barlow15>
                        <DatePicker
                          className={datePicker}
                          value={inputForm.bulan}
                          onChange={(e) => onChangeform("bulan", e, "date")}
                          placeholder="Bulan"
                          format={"MMM YYYY"}
                          picker="month"
                          suffixIcon={<CalendarIcon />}
                          allowClear={false}
                        />
                      </Space>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              {/* fourth line input */}
              <Grid
                container
                spacing={2}
                alignItems="center"
                style={{ marginTop: 15 }}
              >
                <Grid item xs={6}>
                  <Space
                    direction="vertical"
                    size={5}
                    style={{ width: "100%" }}
                  >
                    <Barlow15 style={{ fontWeight: 400 }}>Selesai</Barlow15>
                    <DatePicker
                      className={datePicker}
                      value={inputForm.selesai}
                      onChange={(e) => onChangeform("selesai", e, "date")}
                      placeholder="Masukkan Selesai"
                      format={"DD/MM/YYYY"}
                      suffixIcon={<CalendarIcon />}
                      allowClear={false}
                    />
                  </Space>
                </Grid>
                <Grid item xs={6}>
                  <Space
                    direction="vertical"
                    size={5}
                    style={{ width: "100%" }}
                  >
                    <Barlow15 style={{ fontWeight: 400 }}>Start</Barlow15>
                    <DatePicker
                      value={inputForm.start}
                      onChange={(e) => onChangeform("start", e, "date")}
                      placeholder="Masukkan Start"
                      format={"DD/MM/YYYY"}
                      suffixIcon={<CalendarIcon />}
                      allowClear={false}
                      className={datePicker}
                    />
                  </Space>
                </Grid>
              </Grid>

              {/* fifth line input */}
              <Grid
                container
                spacing={2}
                alignItems="center"
                style={{ marginTop: 15 }}
              >
                <Grid item xs={6}>
                  <LabelTextField
                    label={
                      <Barlow15 style={{ fontWeight: 400 }}>
                        Type Mesin
                      </Barlow15>
                    }
                    value={inputForm.typeMesin}
                    onChange={(e) => onChangeform("typeMesin", e)}
                    placeholder="Masukkan Type Mesin"
                    height={47}
                  />
                </Grid>
                <Grid item xs={6}>
                  <LabelTextField
                    label={
                      <Barlow15 style={{ fontWeight: 400 }}>Durasi</Barlow15>
                    }
                    value={inputForm.durasi}
                    onChange={(e) => onChangeform("durasi", e)}
                    placeholder="Masukkan Durasi"
                    height={47}
                  />
                </Grid>
              </Grid>

              {/* sixth line input */}
              <Grid
                container
                spacing={2}
                alignItems="center"
                style={{ marginTop: 15 }}
              >
                <Grid item xs={6}>
                  <LabelTextField
                    label={
                      <Barlow15 style={{ fontWeight: 400 }}>Nameing</Barlow15>
                    }
                    value={inputForm.nameIng}
                    onChange={(e) => onChangeform("nameIng", e)}
                    placeholder="Masukkan Nameing"
                    height={47}
                  />
                </Grid>
              </Grid>
            </Content>

            {/* button cancel and submit */}
            <Content style={{ marginTop: 20 }}>
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item>
                  <OutlinedButton
                    onClick={() => history.push("/monitoring/master")}
                  >
                    Cancel
                  </OutlinedButton>
                </Grid>
                <Grid item>
                  <ContainedButton>Submit</ContainedButton>
                </Grid>
              </Grid>
            </Content>
          </Layout>
        </GeneralCard>
      </Content>
    </Layout>
  );
};

export default EditMasterData;
