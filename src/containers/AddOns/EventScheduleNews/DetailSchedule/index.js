import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import { Grid, Card, Typography } from "@material-ui/core";
import MuiIconLabelButton from "../../../../components/Button/MuiIconLabelButton";
import { ReactComponent as LeftArrow } from "../../../..//assets/icons/linear-red/arrow-left.svg";
import { withStyles, makeStyles } from "@material-ui/styles";
import { useHistory, useParams } from "react-router-dom";
import FloatingChat from "../../../../components/GeneralComponent/FloatingChat";
import {
  doGetDetailSchedule,
} from "../../ApiServicesAddOns";
import ModalLoader from "../../../../components/ModalLoader";
import { unix } from "moment";
import MinioImageComponent from "../../../../components/MinioImageComponent";
import Comment from "../common/Comment";
import { Markup } from "interweave";

const useStyle = makeStyles({
  imageStyle: {
    width: "100%",
    aspectRatio: 16 / 9,
    borderRadius: 10,
  },
  ppStyle: {
    borderRadius: 9999,
    width: 60,
    height: 60,
    border: "4px solid #FFFFFF",
    filter: "drop-shadow(0px 6px 12px rgba(175, 184, 206, 0.3))",
  },
});

const BarlowTypography = withStyles({
  root: {
    fontStyle: "normal",
    fontFamily: "Barlow",
  },
})(Typography);

const ContentCard = withStyles({
  root: {
    borderRadius: 10,
    border: 0,
  },
})(Card);

const DetailSchedule = () => {
  const { Content } = Layout;
  const { id } = useParams();
  const windowHash = window.location.hash;
  const classes = useStyle();
  const history = useHistory();

  const [dataDetail, setDataDetail] = useState({
    title:
      "Problem di ATM Daerah Yogyakarta, Terdapat kemungkinan Fraud dan kesalahan teknis",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae netus egestas sed amet mi vitae purus. Scelerisque quis in sed eu, velit. Odio orci mauris gravida massa, amet tempus. Venenatis eget tempor mus non neque, non, a ullamcorper eget. Sit in dolor at ut aliquam egestas phasellus pretium. In convallis pharetra aliquam massa. Mi viverra ornare elit ut ipsum sed libero, etiam. Nibh dis in eget vehicula. Sit viverra nibh ullamcorper viverra in curabitur enim, tellus nibh. Convallis tincidunt erat ac, justo massa odio in quam vitae. Quam pulvinar integer malesuada in volutpat iaculis. Tellus dictum morbi vitae elementum leo sit eu dictumst tristique. Sed rutrum et magnis turpis hac leo. Sit proin arcu congue ut viverra risus pulvinar fermentum. Sagittis tellus enim lorem interdum nec aliquam enim. Volutpat et cursus sit amet fermentum gravida at. Id elementum quam ut pharetra leo gravida nunc. Odio nulla viverra vestibulum, commodo neque nisl, pellentesque egestas. Vitae egestas porta quam cras tincidunt placerat in consequat. Fermentum quis massa cursus mi at nisl. Consectetur quam placerat diam pretium, urna. Auctor blandit in vitae tortor in urna. Tempor enim, sollicitudin tristique imperdiet tellus. Sed purus maecenas diam nulla. Quis neque dolor ut pellentesque. Orci, semper morbi sit ornare non tristique habitasse. Convallis nisi, morbi elit curabitur. Vitae, pretium eu aliquam aliquet nulla sem nunc diam. Integer eleifend posuere diam pellentesque in eros amet, nisi. Ullamcorper aenean tempus arcu urna, cursus ultrices bibendum et vitae. Sed volutpat felis sagittis, viverra. Dolor pulvinar praesent fringilla at donec quam. Amet, mi at risus consequat, cursus senectus pulvinar vel pellentesque. Tincidunt augue pellentesque neque interdum congue elit est.",
    userName: "Ahmad Wicaksana",
    publishDate: 1658845844000,
    coverImage:
      "https://th.bing.com/th/id/OIP.Ix6XjMbuCvoq3EQNgJoyEQHaFj?w=211&h=180&c=7&r=0&o=5&pid=1.7",
  });

  const [detailTitle, setDetailTitle] = useState("schedule");

  const [dataComment, setDataComment] = useState([]);

  const [isLoadData, setLoadData] = useState(false);

  function loadingHandler(bool) {
    setLoadData(bool);
  }

  const getDetailDataHandler = () => {
    doGetDetailSchedule(loadingHandler, id).then((res) => {
      if (res.responseCode == 200) {
        setDataDetail(res.getDetailSchedule);
        setDataComment(res.commentSchedulDtoList);
        console.log("res comment>>", res.commentSchedulDtoList);
      }
    });
    console.log("dataDetail >>>", dataDetail);
  };

  useEffect(() => {
    getDetailDataHandler();
  }, []);

  useEffect(() => {
    console.log("dataComment >>>", dataComment);
  }, [dataComment]);

  const htmlToDraftBlocks = (html) => {
    return <Markup content={html} />;
  };

  return (
    <>
      <Layout
        style={{
          padding: 30,
          paddingBottom: 70,
          background: "inherit",
        }}
      >
        <Content>
          <MuiIconLabelButton
            label={"Back"}
            iconPosition="startIcon"
            buttonIcon={<LeftArrow />}
            onClick={() => {
              history.push("/add-ons/event-schedule-news");
            }}
            style={{ background: "inherit", color: "#DC241F", padding: 0 }}
          />
        </Content>
        <Content style={{ marginTop: 20 }}>
          <BarlowTypography style={{ fontWeight: 500, fontSize: 36 }}>
            Schedule Detail
          </BarlowTypography>
        </Content>
        <Content style={{ marginTop: 50 }}>
          <ContentCard variant="outlined">
            <Layout style={{ padding: "30px 100px", background: "inherit" }}>
              <Content style={{ textAlign: "center" }}>
                <BarlowTypography style={{ fontSize: 30, fontWeight: 600 }}>
                  {dataDetail.title}
                </BarlowTypography>
              </Content>
              <Content style={{ marginTop: 50 }}>
                <BarlowTypography
                  style={{ fontSize: 18, fontWeight: 600, color: "#8D98B4" }}
                >
                  {unix(dataDetail.publishDate / 1000).format("DD/MM/YYYY")} -{" "}
                  {dataDetail.userName}
                </BarlowTypography>
              </Content>
              <Content style={{ marginTop: 20 }}>
                <MinioImageComponent
                  filePath={dataDetail?.coverImage}
                  className={classes.imageStyle}
                />
              </Content>
              <Content style={{ marginTop: 50 }}>
                <BarlowTypography style={{ fontWeight: 400, fontSize: 18 }}>
                  {htmlToDraftBlocks(dataDetail.description)}
                </BarlowTypography>
              </Content>
            </Layout>
          </ContentCard>
        </Content>
        <Comment
          comments={dataComment}
          isLoading={isLoadData}
          jmlComment={dataComment.length}
          id={id}
          detailTitle={detailTitle}
          handleSendComment={getDetailDataHandler}
        />
      </Layout>
      {/* <FloatingChat /> */}
      <ModalLoader isOpen={isLoadData} />
    </>
  );
};

export default DetailSchedule;
