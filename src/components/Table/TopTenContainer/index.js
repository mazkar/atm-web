import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Card,
  Grid,
  Link,
  Typography,
  Avatar,
  Divider,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import EllipsisText from "react-ellipsis-text";
import { useHistory } from "react-router-dom";
import LoadingView from "../../Loading/LoadingView";
import * as Colors from "../../../assets/theme/colors";
import Stable from "../../../assets/images/revenue-unchange.png";
import Unchange from "../../../assets/images/revenue-unchange.png";
import Unstable from "../../../assets/images/revenue-unstable.png";
import EmptyImg from "../../../assets/images/empty_data.png";
import { Row, Col } from "antd";

/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable func-names */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/prop-types */
// /* eslint-disable no-unused-vars */
// import React, { useState } from "react";
// import Card from "@material-ui/core/Card";
// import PropTypes from "prop-types";
// import { makeStyles } from "@material-ui/core/styles";
// import { Grid, Link, Typography } from "@material-ui/core";
// import CardContent from "@material-ui/core/CardContent";
// import Avatar from "@material-ui/core/Avatar";
// import Divider from "@material-ui/core/Divider";
// import CircularProgress from "@material-ui/core/CircularProgress";
// import { nullFormat } from "numeral";
// import EllipsisText from "react-ellipsis-text";
// import * as Colors from "../../assets/theme/colors";
// import Stable from "../../assets/images/revenue-stable.png";
// import Unchange from "../../assets/images/revenue-unchange.png";
// import Unstable from "../../assets/images/revenue-unstable.png";
// import LoadingView from "../../components/Loading/LoadingView";
// import EmptyImg from "../../assets/images/empty_data.png";
// import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  bgImage: {
    position: "relative",
    zIndex: 1,
  },
  amount: {
    margin: "10px 0px 10px 0px",
    textAlign: "center",
  },
  item: {
    padding: 0,
    margin: 0,
    maxWidth: 30,
  },
  section: {
    margin: 0,
    // width: 720,
    maxWidth: 870,
    // overflow: 'auto'
  },
  sectionCard: {
    marginTop: 20,
    zIndex: 4,
  },
  card: {
    maxWidth: 870,
    maxHeight: 220,
    minHeight: 220,
    overflowY: "auto",
    boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
  },
  cardHeader: {
    maxWidth: 870,
    maxHeight: 200,
    boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
    marginBottom: "-5px",
  },
  avatar: {
    backgroundColor: Colors.White,
    padding: "4px 4px 4px 4px",
    width: "30px",
    height: "30px",
  },
  loaderWrapper: {
    width: "100%",
    height: "100%",
    position: "relative",
    zIndex: 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
}));

const OrdinalNumber = (i) => {
  const j = i % 10;
  const k = i % 100;
  if (j === 1 && k !== 11) {
    return `${i}st`;
  }
  if (j === 2 && k !== 12) {
    return `${i}nd`;
  }
  if (j === 3 && k !== 13) {
    return `${i}rd`;
  }
  return `${i}th`;
};

const renderStatus = (status) => {
  if (status) {
    if (status === "0") {
      return Unchange;
    }
    if (status === "1") {
      return Stable;
    }
    return Unstable;
  }
  return Unchange;
};

const checkSize = () => {
  if (window.innerWidth <= 1366) {
    return "30";
  }
  return "55";
};

const topTenContainer = (props) => {
  const {
    data,
    Icon,
    Title,
    isLoadData,
    titleTable1,
    titleTable2,
    titleTable3,
  } = props;
  const history = useHistory();
  const classes = useStyles();
  const [ellipsisLength, setEllipsisLength] = useState(checkSize);
  const handleEllipsis = (newValue) => {
    if (ellipsisLength !== newValue) {
      setEllipsisLength(newValue);
    } else {
      setEllipsisLength(checkSize);
    }
  };
  return (
    <div>
      <Card className={classes.cardHeader}>
        <Row
          justify="start"
          align="middle"
          style={{ padding: "10px 0 10px 20px" }}
        >
          <Col flex={"20px"}>{Icon}</Col>
          <Col flex={"auto"}>
            <Typography
              style={{
                fontSize: "15px",
                fontWeight: 500,
                padding: "2px 0 0 5px",
              }}
              variant="h6"
              component="h2"
            >
              {Title}
            </Typography>
          </Col>
        </Row>

        <Row
          gutter={[5, 5]}
          align="middle"
          justify="start"
          style={{ padding: 10, paddingBottom: 15 }}
        >
          <Col span={2}></Col>
          <Col span={10} style={{ textAlign: "left", paddingLeft: 8 }}>
            <Typography
              style={{ fontSize: "15px", fontWeight: 600 }}
              variant="h6"
              component="h2"
            >
              {titleTable1}
            </Typography>
          </Col>
          <Col span={5} style={{ textAlign: "center" }}>
            <Typography
              style={{ fontSize: "15px", fontWeight: 600 }}
              variant="h6"
              component="h2"
            >
              {titleTable2}
            </Typography>
          </Col>
          <Col span={7} style={{ textAlign: "center" }}>
            <Typography
              style={{
                fontSize: "15px",
                fontWeight: 600,
                alignItems: "center",
                paddingRight: 35,
              }}
              variant="h6"
              component="h2"
            >
              {titleTable3}
            </Typography>
          </Col>
        </Row>
      </Card>

      <Card className={classes.card}>
        {isLoadData ? (
          <div className={classes.loaderWrapper}>
            <LoadingView maxheight="100%" isTransparent />
          </div>
        ) : (
          <>
            {data && data.length > 0 ? (
              data &&
              data.map((item, index) => {
                return (
                  <>
                    <Row
                      align="middle"
                      justify="start"
                      gutter={[5, 5]}
                      style={{ padding: 10, marginLeft: 3 }}
                    >
                      <Col span={2} style={{ textAlign: "center" }}>
                        <Typography
                          gutterBottom
                          style={{
                            color: Colors.PrimaryHard,
                            fontSize: "15px",
                            fontWeight: 600,
                            fontFamily: "Barlow",
                          }}
                          variant="p"
                        >
                          {OrdinalNumber(index + 1)}
                        </Typography>
                      </Col>
                      <Col span={10}>
                        <Typography
                          gutterBottom
                          variant="p"
                          style={{
                            fontSize: "15px",
                            fontFamily: "Barlow",
                            fontWeight: 400,
                            color: "#2B2F3C",
                          }}
                        >
                          {item[titleTable1]}
                        </Typography>
                      </Col>
                      <Col span={5} style={{ textAlign: "center" }}>
                        <Typography
                          gutterBottom
                          variant="p"
                          style={{
                            marginLeft: 10,
                            fontSize: "15px",
                            fontFamily: "Barlow",
                            fontWeight: 400,
                          }}
                        >
                          {item[titleTable2]}
                        </Typography>
                      </Col>
                      <Col span={7} style={{ textAlign: "center" }}>
                        <Typography
                          gutterBottom
                          style={{
                            fontSize: "15px",
                            fontWeight: 600,
                            fontFamily: "Barlow",
                          }}
                          variant="p"
                        >
                          {item[titleTable3]}
                        </Typography>
                      </Col>
                    </Row>
                    <Divider variant="middle" light="true" />
                  </>
                );
              })
            ) : (
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
            )}
          </>
        )}
      </Card>
    </div>
  );
};

export default topTenContainer;

{
  /* <EllipsisText
                            text={item[titleTable2] === null ? "-" : item[titleTable2]}
                            length={ellipsisLength}
                            onClick={() => {
                              handleEllipsis("60");
                            }}
                          /> */
}

{
  /* <Link
                            onClick={() =>
                              history.push(
                                `/trend-analisa/detail/${item[titleTable1]}`
                              )
                            }
                            style={{
                              fontSize: "15px",
                              fontFamily: "Barlow",
                              fontWeight: 500,
                              color: "#2B2F3C",
                            }}
                          >
                          </Link> */
}

{
  /* <Grid
                      container
                      direction="row"
                      justify="flex-start"
                      style={{ padding: 10, marginLeft: "3px" }}
                      spacing={1}
                      alignItems="center"
                    >
                      <Grid item xs={1}>
                        <Typography
                          gutterBottom
                          style={{
                            color: Colors.PrimaryHard,
                            fontSize: "15px",
                            fontWeight: 600,
                            fontFamily: "Barlow",
                          }}
                          variant="p"
                        >
                          {OrdinalNumber(index + 1)}
                        </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography
                          gutterBottom
                          variant="p"
                          style={{
                            fontSize: "15px",
                            fontFamily: "Barlow",
                            fontWeight: 400,
                          }}
                        >
                          <Link
                            onClick={() =>
                              history.push(
                                `/trend-analisa/detail/${item[titleTable1]}`
                              )
                            }
                            style={{
                              fontSize: "15px",
                              fontFamily: "Barlow",
                              fontWeight: 500,
                              color: "#2B2F3C",
                            }}
                          >
                            {item[titleTable1]}
                          </Link>
                        </Typography>
                      </Grid>
                      <Grid item xs={4} style={{ textAlign: "justify" }}>
                        <Typography
                          gutterBottom
                          variant="p"
                          style={{
                            marginLeft: 20,
                            fontSize: "15px",
                            fontFamily: "Barlow",
                            fontWeight: 400,
                          }}
                        > */
}
{
  /* {item.locationName === null ? '-' : item.locationName} */
}
{
  /* <EllipsisText
                            text={item[titleTable2] === null ? "-" : item[titleTable2]}
                            length={ellipsisLength}
                            onClick={() => {
                              handleEllipsis("60");
                            }}
                          />
                        </Typography>
                      </Grid>
                      <Grid item xs={3} style={{ textAlign: "center" }}>
                        <Typography
                          gutterBottom
                          style={{
                            fontSize: "15px",
                            fontWeight: 600,
                            fontFamily: "Barlow",
                          }}
                          variant="p"
                        >
                          {item[titleTable3]}
                        </Typography>
                      </Grid>
                    </Grid> */
}

{
  /* <Grid
          container
          direction="row"
          justify="flex-start"
          style={{ justifyItems: "center", paddingBottom: 15 }}
          spacing={1}
          alignItems="stretch"
        >
          <Grid item xs={1} />
          <Grid item xs={2}>
            <Typography
              style={{ fontSize: "15px", fontWeight: 600, paddingLeft: 10 }}
              variant="h6"
              component="h2"
            >
              {titleTable1}
            </Typography>
          </Grid>
          <Grid item xs={6} style={{ textAlign: "center" }}>
            <Typography
              style={{ fontSize: "15px", fontWeight: 600 }}
              variant="h6"
              component="h2"
            >
              {titleTable2}
            </Typography>
          </Grid>
          <Grid item xs={3} style={{ textAlign: "center" }}>
            <Typography
              style={{
                fontSize: "15px",
                fontWeight: 600,
                alignItems: "center",
                paddingRight: 35,
              }}
              variant="h6"
              component="h2"
            >
              {titleTable3}
            </Typography>
          </Grid>
        </Grid> */
}

{
  /* {isLoadData ?
          <div className={classes.loaderWrapper}>
            <LoadingView maxheight='100%' isTransparent />
          </div>
          :
          <CardContent>
            {data && data.length > 0 ? data && data.map((item, index) => {
              return (
                <>
                  <div className={classes.item}>
                    <div className={classes.section}>
                      <Grid container alignItems="stretch" spacing={1}>
                        <Grid className={classes.amount} item xs sm={1}>
                          <Typography
                            gutterBottom
                            style={{
                              color: Colors.PrimaryHard,
                              fontSize: '13px',
                              fontWeight: 600,
                              fontFamily: 'Barlow'
                            }}
                            variant="p"
                          >
                            {OrdinalNumber(index + 1)}
                          </Typography>
                        </Grid>
                        <Grid className={classes.amount} item xs sm={2}>
                          <Typography gutterBottom variant="p" style={{fontSize: '13px', fontFamily: 'Barlow'}}>
                            {item.id}
                          </Typography>
                        </Grid>
                        <Grid className={classes.amount} item xs sm={6}>
                          <Typography gutterBottom variant="p" style={{fontSize: '13px'}}> 
                            {item.locationName === null ? '-' : item.locationName}
                          </Typography>
                        </Grid>
                        <Grid className={classes.amount} item xs sm={3}>
                          <Typography
                            gutterBottom
                            style={{ fontSize: '13px', fontWeight: 600, fontFamily: 'Barlow' }}
                            variant="p"
                          >
                            {item.amount}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Divider variant="fullWidth" light="true" />
                    </div>
                  </div>
                </>
              );
            }) : 
              <Grid container alignContent="center" justify="center" style={{height: 175}} direction="column">
                <img src={EmptyImg} alt="Empty" style={{opacity: 0.4}}/>
                <Typography style={{opacity: 0.3, textAlign: 'center', fontSize: 11, marginTop: 10}}>Empty</Typography>
              </Grid>
            }
          </CardContent>
        } */
}
