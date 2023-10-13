/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable func-names */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Link, Typography } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import CircularProgress from "@material-ui/core/CircularProgress";
import { nullFormat } from "numeral";
import EllipsisText from "react-ellipsis-text";
import * as Colors from "../../assets/theme/colors";
import Stable from "../../assets/images/revenue-stable.png";
import Unchange from "../../assets/images/revenue-unchange.png";
import Unstable from "../../assets/images/revenue-unstable.png";
import LoadingView from "../../components/Loading/LoadingView";
import EmptyImg from "../../assets/images/empty_data.png";
import { useHistory } from "react-router";

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
    maxHeight: 280,
    overflowY: "auto",
    boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
  },
  cardHeader: {
    maxWidth: 870,
    maxHeight: 280,
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
  const { data, Icon, Title, isLoadData, type } = props;
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
        <Grid
          container
          direction="row"
          justify="flex-start"
          style={{ padding: "10px 0 10px 10px" }}
        >
          <Grid item>
            <Avatar src={Icon} className={classes.avatar} />
          </Grid>
          <Grid item>
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
          </Grid>
        </Grid>

        <Grid
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
              ATM ID
            </Typography>
          </Grid>
          <Grid item xs={6} style={{ textAlign: "center" }}>
            <Typography
              style={{ fontSize: "15px", fontWeight: 600 }}
              variant="h6"
              component="h2"
            >
              Location
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
              {type}
            </Typography>
          </Grid>
        </Grid>
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
                    <Grid
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
                      <Grid item xs={2}>
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
                            onClick={()=>history.push(`/trend-analisa/detail/${item.id}`)}
                            style={{ 
                              fontSize: "15px",
                              fontFamily: "Barlow",
                              fontWeight: 500,
                              color: "#2B2F3C"}}>
                            {item.id}
                          </Link>
                        </Typography>
                      </Grid>
                      <Grid item xs={6} style={{ textAlign: "justify" }}>
                        <Typography
                          gutterBottom
                          variant="p"
                          style={{
                            fontSize: "15px",
                            fontFamily: "Barlow",
                            fontWeight: 400,
                          }}
                        >
                          {/* {item.locationName === null ? '-' : item.locationName} */}
                          <EllipsisText
                            text={
                              item.locationName === null
                                ? "-"
                                : item.locationName
                            }
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
                          {item.amount}
                        </Typography>
                      </Grid>
                    </Grid>
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

        {/* {isLoadData ?
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
        } */}
      </Card>
    </div>
  );
};

export default topTenContainer;
