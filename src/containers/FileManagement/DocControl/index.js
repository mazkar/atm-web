import React, { useState, useEffect } from "react";
import { Layout, Row, Col } from "antd";
import { Typography, Grid, Card } from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/styles";
import MuiButton from "../../../components/Button/MuiButton";
import LabelTextField from "../../../components/Form/LabelTextField";
import { ReactComponent as SearchIcon } from "../../../assets/images/search.svg";
import CardFolderDocument from "../../../components/Card/CardFolderDocument";
import ServiceDocControl from "./service";
import LoadingView from "../../../components/Loading/LoadingView";
import { useHistory } from "react-router-dom";
import { getDocumenControl } from "../serviceFileManagement";
import EmptyImg from "../../../assets/images/empty_data.png";
import moment from "moment";

const Barlow = withStyles({
  root: {
    fontFamily: "Barlow",
    fontStyle: "normal",
  },
})(Typography);

const CustomCard = withStyles({
  root: {
    borderRadius: 10,
    padding: 30,
    border: 0,
  },
})(Card);

const loaderWrapper = {
  width: "100%",
  height: "100%",
  position: "relative",
  zIndex: 2,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: 20,
};

const defaultDataHit = {
  pageNumber: 0,
  dataPerPage: 1000,
  orderBy: "id",
  orderType: "asc",
  search: "",
};

const DocControl = () => {
  const { Content } = Layout;
  const [dataAPI, setDataAPI] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  const [dataRequest, setDataRequest] = useState(defaultDataHit);
  const [searchInput, setSearchInput] = useState("");

  const onSearchHandler = (e) => {
    setSearchInput(e.target.value);
  };

  const onSearch = () => {
    setDataRequest({
      ...dataRequest,
      search: searchInput,
    });
  };

  const loaderHandler = (bool) => setIsLoading(bool);

  // const { hitDummyAPI } = ServiceDocControl();

  // useEffect(() => {
  //   setIsLoading(true);
  //   hitDummyAPI()
  //     .then((res) => {
  //       setDataAPI(res);
  //       setIsLoading(false);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       setIsLoading(false);
  //     });
  // }, []);

  const convertToUI = (dataRes) => {
    const dataArr = [];
    dataRes.map((data, index) => {
      const arrList = [];
      const objParent = {};
      objParent.id = data.idFolder;
      data.listFolder.map((folder) => {
        objParent.folderName = folder.folderName;
        objParent.modifiedDate = moment(folder.createdAt).format("DD-MM-YYYY");
        if (folder.fileName) arrList.push(folder.fileName);
      });
      objParent.totalFile = arrList.length;
      objParent.documents = arrList;
      dataArr.push(objParent);
    });

    console.log(dataArr);
    return dataArr;
  };

  useEffect(() => {
    getDocumenControl(loaderHandler, dataRequest).then((res) => {
      if (res.status === 200) {
        setDataAPI(convertToUI(res.data.data));
      }
    });
  }, [dataRequest]);

  const handleViewAll = (param) => {
    history.push(`/file-management/doc-control/${param}`);
  };

  return (
    <>
      <Layout style={{ padding: 30, background: "inherit" }}>
        <Content style={{ padding: 0 }}>
          <Barlow style={{ fontWeight: 500, fontSize: 36 }}>
            Document Control
          </Barlow>
        </Content>
        <Content style={{ padding: 0, marginTop: 60 }}>
          <Grid container justifyContent="center" alignItems="center">
            <Grid item xs={2} />
            <Grid item xs={6}>
              <LabelTextField
                placeholder={"Pencarian berdasarkan nama folder atau artikel"}
                icon={<SearchIcon />}
                value={searchInput}
                onChange={onSearchHandler}
                onKeyDown={(e) => {
                  if (e.key === "Enter") onSearch();
                }}
              />
            </Grid>
            <Grid item xs={2}>
              <MuiButton label="Search" height={40} onClick={onSearch} />
            </Grid>
            <Grid item xs={2} />
          </Grid>
        </Content>
        <Content style={{ padding: 0, marginTop: 40 }}>
          <CustomCard variant="outlined">
            {isLoading ? (
              <div style={loaderWrapper}>
                <LoadingView maxheight="100%" isTransparent />
              </div>
            ) : (
              <>
                {!dataAPI ? (
                  <Grid
                    container
                    alignContent="center"
                    justify="center"
                    style={{ height: 175 }}
                    direction="column"
                  >
                    <img src={EmptyImg} alt="Empty" style={{ opacity: 0.4 }} />
                    <Typography
                      style={{
                        opacity: 0.3,
                        textAlign: "center",
                        fontSize: 11,
                        marginTop: 10,
                      }}
                    >
                      Empty
                    </Typography>
                  </Grid>
                ) : (
                  <Grid
                    container
                    spacing={3}
                    justifyContent="center"
                    alignContent="center"
                  >
                    {dataAPI.map((item) => (
                      <Grid item xs={4}>
                        <CardFolderDocument
                          data={item}
                          handleClick={() => {
                            handleViewAll(item.id);
                          }}
                        />
                      </Grid>
                    ))}
                  </Grid>
                )}
              </>
            )}
          </CustomCard>
        </Content>
      </Layout>
    </>
  );
};

export default DocControl;
