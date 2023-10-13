import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/styles";
import { Card, Grid, Typography, Button } from "@material-ui/core";
import { GrayUltrasoft } from "../../../assets/theme/colors";
import { Layout } from "antd";
import PropTypes from "prop-types";
import { ReactComponent as FolderImg } from "../../../assets/icons/general/folderImg.svg";
import { ReactComponent as FileImg } from "../../../assets/icons/linear-red/file-text.svg";
import { PrimaryHard, Dark } from "../../../assets/theme/colors";

/*
dokumentasi

data harus berupa object

contoh object bisa di lihat di variable initialValue
*/

const GrayCard = withStyles({
  root: {
    borderRadius: 12,
    background: GrayUltrasoft,
    minHeight: 180,
    border: 0,
    padding: 12,
  },
})(Card);

const MiniCard = withStyles({
  root: {
    border: 0,
    borderRadius: 8,
    padding: 6,
  },
})(Card);

const Barlow = withStyles({
  root: {
    fontFamily: "Barlow",
    fontStyle: "normal",
  },
})(Typography);

const ViewAllButton = withStyles({
  root: {
    color: PrimaryHard,
    borderColor: PrimaryHard,
    background: "white",
    width: "100%",
  },
})(Button);

const useStyle = makeStyles({
  mainLayout: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    justifyContent: "flex-start",
    background: "inherit",
  },
  documentLayout: {
    background: "inherit",
    marginTop: 10,
    marginBottom: 10,

    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  rowContent: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
});

const initialValue = {
  folderName: "initialVal",
  totalFile: "2",
  modifiedDate: "20-10-2021",
  documents: [
    "initialVal.pdf",
    "initialVal.jpg",
    "Dokumen2.pdf",
    "Dokumen.png",
  ],
};

const CardFolderDocument = (props) => {
  const { Content } = Layout;
  const { mainLayout, documentLayout, rowContent } = useStyle();
  const { data, handleClick } = props;
  const [dataState, setDataState] = useState(initialValue);
  const slicedDocuments = dataState.documents.slice(0, 2);

  useEffect(() => {
    if (data) setDataState(data);
  }, [data]);

  return (
    <>
      <GrayCard variant="outlined">
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item xs={9}>
            <Layout className={mainLayout}>
              <Content style={{ width: 42 }}>
                <FolderImg />
              </Content>
              <Layout style={{ background: "inherit", width: "100%" }}>
                <Content>
                  <Barlow
                    style={{ fontSize: 15, fontWeight: 500, color: Dark }}
                  >
                    {dataState.folderName}
                  </Barlow>
                </Content>
                <Content>
                  <Barlow
                    style={{ fontSize: 13, fontWeight: 400, color: Dark }}
                  >
                    {dataState.modifiedDate}
                  </Barlow>
                </Content>
              </Layout>
            </Layout>
          </Grid>
          <Grid item xs={3}>
            <MiniCard
              variant="outlined"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Barlow
                style={{ fontSize: 13, fontWeight: 500, color: PrimaryHard }}
              >
                {`${dataState.totalFile} File`}
              </Barlow>
            </MiniCard>
          </Grid>
        </Grid>
        <Layout className={documentLayout}>
          {slicedDocuments.length > 0 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                height: 60,
                alignItems: "flex-start",
                gap: 8,
              }}
            >
              {slicedDocuments.map((item) => (
                <Content className={rowContent}>
                  <FileImg />
                  <Barlow
                    style={{ fontSize: 13, fontWeight: 400, color: Dark }}
                  >
                    {item}
                  </Barlow>
                </Content>
              ))}
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                height: 60,
                alignItems: "center",
              }}
            >
              <Barlow style={{ fontSize: 24, fontWeight: 600, color: Dark }}>
                Empty
              </Barlow>
            </div>
          )}
        </Layout>
        <ViewAllButton variant="outlined" onClick={handleClick}>
          <Barlow style={{ fontSize: 13, fontWeight: 500 }}>View All</Barlow>
        </ViewAllButton>
      </GrayCard>
    </>
  );
};

CardFolderDocument.propTypes = {
  data: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default CardFolderDocument;
