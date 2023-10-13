import React, { useState, useContext } from "react";
import { Row, Col, Layout } from "antd";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import constansts from "../../../../helpers/constants";
import AddButton from "../../../../components/Button/AddButton";
import { ReactComponent as SearchIcon } from "../../../../assets/icons/linear-red/search.svg";
import LabelTextField from "../../../../components/Form/LabelTextField";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { RootContext } from "../../../../router";

const useStyle = makeStyles({
  root: {
    padding: "28px 30px",
    background: "inherit",
  },
  barlow: {
    fontFamily: "Barlow",
    fontStyle: "normal",
  },
});

const ContainerEventScheduleNews = (props) => {
  // variable
  const { userRoleName } = useContext(RootContext);
  const isAdmin = userRoleName?.toLowerCase().includes("admin");
  const windowHash = window.location.hash;
  const classess = useStyle();
  const { root, barlow } = classess;
  const { Header, Content } = Layout;
  const history = useHistory();
  const [input, setInput] = useState(
    props.inputSearch ? props.inputSearch : ""
  );

  // function
  const onChange = (e) => {
    setInput(e.target.value);
  };

  const onEntered = (e) => {
    if (e.key === "Enter") props.onSearch(input, !props.onEnterValue);
  };

  return (
    <Layout className={root}>
      {/* <Header style={{ padding: 0, margin: 0 }}> */}
      <Row justify="space-between" align="middle">
        <Col span={7}>
          <Typography
            className={barlow}
            style={{ fontWeight: 500, color: constansts.color.dark }}
            variant="h3"
            color="inherit"
          >
            {windowHash === "#events" && "Events"}
            {windowHash === "#schedule" && "Schedule"}
            {windowHash === "#news" && "News"}
          </Typography>
        </Col>
        <Col span={17}>
          <Row
            align="middle"
            justify="center"
            style={{ padding: 0, margin: 0 }}
          >
            <Col flex={"auto"}></Col>
            <Col flex={"130px"}>
              {isAdmin && (
                <>
                  {windowHash === "#events" && (
                    <AddButton
                      label={"Add New"}
                      onClick={() =>
                        history.push("/add-ons/event-schedule-news/add-event")
                      }
                    />
                  )}
                  {windowHash === "#schedule" && (
                    <AddButton
                      label={"Add New"}
                      onClick={() =>
                        history.push(
                          "/add-ons/event-schedule-news/add-schedule"
                        )
                      }
                    />
                  )}
                  {windowHash === "#news" && (
                    <AddButton
                      label={"Add New"}
                      onClick={() =>
                        history.push("/add-ons/event-schedule-news/add-news")
                      }
                    />
                  )}
                </>
              )}
            </Col>
            <Col
              flex={"350px"}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <LabelTextField
                placeholder={"Pencarian forum"}
                endIcon={<SearchIcon />}
                value={input}
                onChange={(e) => onChange(e)}
                onKeyPress={(e) => onEntered(e)}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      {/* </Header> */}
      <Content style={{ marginTop: 40 }}>
        {props.children}
        {/* {contentTabs}
        <PaginationCard style={{ marginTop: 10 }} data={data} 
    mappingTitle
    mappingImage
    mappingDate
    mappingWriter
    mappingDescription /> */}
      </Content>
    </Layout>
  );
};

ContainerEventScheduleNews.propTypes = {
  onSearch: PropTypes.func.isRequired,
  inputSearch: PropTypes.string.isRequired,
  onEnterValue: PropTypes.bool.isRequired,
};

export default ContainerEventScheduleNews;
