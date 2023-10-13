import React, { useState } from "react";

// libs import
import { Dialog, Paper, Grid } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/styles";
import { Layout, Space } from "antd";

// components import
import {
  Barlow36,
  Barlow13,
  Barlow15,
} from "../../../../../components/Typography/BarlowWithSize";
import SelectMui from "../../../../../components/Selects/SelectMui";
import { GrayMedium } from "../../../../../assets/theme/colors";
import {
  OutlinedButton,
  ContainedButton,
} from "../../../../../components/Button/NoiconButton";

const CustomDialog = withStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& .MuiDialog-paper": {
      width: "720px",
    },
  },
})(Dialog);

const optionJenisPekerjaan = [
  {
    name: "Pilih Jenis Pekerjaan",
    value: "",
  },
  {
    name: "CCTV",
    value: "CCTV",
  },
  {
    name: "Setting AP",
    value: "Setting AP",
  },
  {
    name: "Bersih Bersih",
    value: "Bersih Bersih",
  },
];

const optionVendorName = [
  {
    name: "Pilih Nama Vendor",
    value: "",
  },
  {
    name: "PT. Trias",
    value: "PT. Trias",
  },
  {
    name: "PT. contoh",
    value: "PT. contoh",
  },
];

const AddNewOrder = ({ isOpen, onClose }) => {
  const { Content } = Layout;
  const [inputForm, setInputForm] = useState({
    jenisPekerjaan: "",
    vendorName: "",
    description: "",
  });
  const onSelect = (key, e) => {
    setInputForm({ ...inputForm, [key]: e });
  };
  return (
    <CustomDialog open={isOpen} onClose={onClose}>
      <Paper elevation={3}>
        <Layout style={{ background: "inherit", padding: "35px 30px" }}>
          <Content style={{ marginTop: 25, textAlign: "center" }}>
            <Barlow36 style={{ fontWeight: 500 }}>Add New Order</Barlow36>
          </Content>
          <Content style={{ marginTop: 50 }}>
            <Space direction="vertical" size={20} style={{ width: "100%" }}>
              {/* first line Grid */}
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
                spacing={1}
              >
                <Grid item xs={6}>
                  <Space direction="vertical" size={10}>
                    <Barlow13 style={{ fontWeight: 400 }}>No Ticket :</Barlow13>
                    <Barlow15 style={{ fontWeight: 600 }}>A-02342</Barlow15>
                  </Space>
                </Grid>
                <Grid item xs={6}>
                  <Space direction="vertical" size={10}>
                    <Barlow13 style={{ fontWeight: 400 }}>Lokasi :</Barlow13>
                    <Barlow15 style={{ fontWeight: 600 }}>
                      TGR-CRM-CBG-CLG
                    </Barlow15>
                  </Space>
                </Grid>
              </Grid>

              {/* second line Grid */}
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
                spacing={1}
              >
                <Grid item xs={6}>
                  <Space direction="vertical" size={10}>
                    <Barlow13 style={{ fontWeight: 400 }}>ID Mesin :</Barlow13>
                    <Barlow15 style={{ fontWeight: 600 }}>A-02342</Barlow15>
                  </Space>
                </Grid>
                <Grid item xs={6}>
                  <Space direction="vertical" size={10}>
                    <Barlow13 style={{ fontWeight: 400 }}>Detail :</Barlow13>
                    <Barlow15 style={{ fontWeight: 600 }}>
                      TGR-CRM-CBG-CLG
                    </Barlow15>
                  </Space>
                </Grid>
              </Grid>

              {/* third line Grid */}
              <Grid container justifyContent="space-between" spacing={1}>
                <Grid item xs={6}>
                  <Space
                    direction="vertical"
                    size={10}
                    style={{ width: "100%" }}
                  >
                    <Barlow13 style={{ fontWeight: 400 }}>
                      Jenis Pekerjaan :
                    </Barlow13>
                    <SelectMui
                      placeholder="Jenis Pekerjaan"
                      selectOptionData={optionJenisPekerjaan}
                      selectedValue={inputForm.jenisPekerjaan}
                      onSelectValueChange={(e) => onSelect("jenisPekerjaan", e)}
                      height={40}
                    />
                  </Space>
                </Grid>
                <Grid item xs={6}>
                  <Space
                    direction="vertical"
                    size={10}
                    style={{ width: "100%" }}
                  >
                    <Barlow13 style={{ fontWeight: 400 }}>
                      Jenis Pekerjaan :
                    </Barlow13>
                    <SelectMui
                      placeholder="Nama Vendor"
                      selectOptionData={optionVendorName}
                      selectedValue={inputForm.vendorName}
                      onSelectValueChange={(e) => onSelect("vendorName", e)}
                      height={40}
                    />
                  </Space>
                </Grid>
              </Grid>

              {/* fourth line Grid */}
              <Space direction="vertical" size={5} style={{ width: "100%" }}>
                <Barlow13 style={{ fontWeight: 400 }}>
                  Notes & Description :
                </Barlow13>
                <textarea
                  value={inputForm.description}
                  onChange={(e) =>
                    setInputForm({ ...inputForm, description: e.target.value })
                  }
                  placeholder="Masukkan Notes & Description"
                  style={{
                    border: `1 solid ${GrayMedium}`,
                    borderColor: GrayMedium,
                    fontFamily: "Barlow",
                    fontSize: 13,
                    fontWeight: 400,
                    padding: 12,
                    borderRadius: 8,
                    width: "100%",
                    "&:focus": {
                      outline: "none",
                    },
                    "&:active": {
                      outline: "none",
                    },
                  }}
                />
              </Space>
            </Space>
            <Content style={{ marginTop: 22 }}>
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item>
                  <OutlinedButton>Cancel</OutlinedButton>
                </Grid>
                <Grid item>
                  <ContainedButton>Submit</ContainedButton>
                </Grid>
              </Grid>
            </Content>
          </Content>
        </Layout>
      </Paper>
    </CustomDialog>
  );
};

export default AddNewOrder;
