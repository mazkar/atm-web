import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { Typography, Paper, Tab, Tabs } from "@material-ui/core";
import { Layout, Row, Col } from "antd";
import { PrimaryHard } from "../../../assets/theme/colors";

// Widgets
import CardDocInvoice from "./Widget/Card";
import FloatingChat from "../../../components/GeneralComponent/FloatingChat";
import TableDocNew from "./Widget/TableDocNew/index";
import TableDocTermin from "./Widget/TableDocTermin/index";
import TableDocReplace from "./Widget/TableDocReplace/index";
import TableDocMigrasi from "./Widget/TableDocMigrasi/index";

const UseStyles = makeStyles({
  root: {
    paddingTop: 30,
    paddingLeft: 30,
    paddingRight: 28.5,
    paddingBottom: 75,

    background: "inherit",
  },
  Barlow: {
    fontFamily: "Barlow",
    fontStyle: "normal",
  },
  title: {
    fontWeight: 500,
    fontSize: 36,
  },
  //   title2: {
  //     fontFamily: "Barlow",
  //     fontWeight: 500,
  //     fontSize: 36,
  //     color: "#2B2F3C",
  //   },
  textButton: {
    color: PrimaryHard,
    textTransform: "capitalize",
  },
  containerCard: {
    marginTop: 16,
  },
  indicator: {
    backgroundColor: PrimaryHard,
    height: 4,
  },
  card: {
    height: 130,
    borderRadius: 10,
    padding: "20px 15px 20px 15px",
  },
  titleCard: {
    fontSize: 16,
    fontWeight: 500,
  },
});

export default function DocumentInvoice() {
  const classes = UseStyles();
  const { Barlow, title } = classes;
  const { Header } = Layout;
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
    console.log(newValue, "test");
  };

  return (
    <div>
      <Layout className={classes.root}>
        <Header style={{ padding: 0, background: "inherit" }}>
          <Typography className={`${Barlow} ${title}`}>
            Document Invoice
          </Typography>
        </Header>
        <CardDocInvoice />
        <div style={{ marginTop: 30, marginLeft: 50 }}>
          <Tabs
            value={selectedTab}
            onChange={handleChange}
            classes={{
              indicator: classes.indicator,
            }}
            style={{ marginTop: 12 }}
          >
            <Tab label="New" style={{ fontWeight: "bold", fontSize: 16 }} />
            <Tab label="Termin" style={{ fontWeight: "bold", fontSize: 16 }} />
            <Tab label="Replace" style={{ fontWeight: "bold", fontSize: 16 }} />
            <Tab label="Migrasi" style={{ fontWeight: "bold", fontSize: 16 }} />
          </Tabs>
        </div>
        {selectedTab === 0 && (
          <>
            <TableDocNew />
          </>
        )}
        {selectedTab === 1 && (
          <>
            <TableDocTermin />
          </>
        )}
        {selectedTab === 2 && (
          <>
            <TableDocReplace />
          </>
        )}
        {selectedTab === 3 && (
          <>
            <TableDocMigrasi />
          </>
        )}
      </Layout>
      {/* <FloatingChat /> */}
    </div>
  );
}
