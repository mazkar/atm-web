import React from "react";
import { Row, Col } from "antd";
import { Card, Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import EmptyImg from "../../../../assets/images/empty_data.png";
import LoadingView from "../../../../components/Loading/LoadingView";

const useStyle = makeStyles({
  root: {
    minHeight: 286,
    maxHeight: 286,
    paddingLeft: 10,
    paddingRight: 10,
  },
  barlow: {
    fontFamily: "Barlow",
    fontStyle: "normal",
  },
  headerStyle: {
    fontWeight: 500,
    fontSize: 15,
    color: "#000000",
  },
  bodyStyle: {
    height: 40,
    boxShadow: "inset 0px -1px 0px rgba(188, 200, 231, 0.4)",
  },
  bodyText1: {
    fontWeight: 400,
    fontSize: 13,
    color: "#2B2F3C",
  },
  bodyText2: {
    fontWeight: 400,
    fontSize: 15,
    color: "#2B2F3C",
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
});

const TablePagination = (props) => {
  const classess = useStyle();
  const { header, data, isLoading } = props;
  const { root, barlow, headerStyle, bodyStyle, bodyText1, loaderWrapper } =
    classess;

  const formatedString = (param) => {
    if (param.length > 36) return `${param.substring(0, 37)}...`;
    return param;
  };
  return (
    <>
      <Card variant="outlined" className={root}>
        <Row
          justify="start"
          align="middle"
          style={{ marginTop: 7, marginBottom: 15 }}
        >
          {header.map((item, index) => {
            let colSpan = 5;
            if (index == header.length - 1) colSpan = 4;

            return (
              <Col span={colSpan}>
                <Typography className={`${barlow} ${headerStyle}`}>
                  {item}
                </Typography>
              </Col>
            );
          })}
        </Row>
        {isLoading ? (
          <div className={loaderWrapper}>
            <LoadingView maxheight="100%" isTransparent />
          </div>
        ) : (
          <>
            {data ? (
              data.map((item, index) => {
                return (
                  <Row
                    key={index}
                    justify="start"
                    align="middle"
                    className={bodyStyle}
                  >
                    {Object.values(item).map((val, index) => {
                      let colSpan = 5;
                      if (index == item.length - 1) colSpan = 4;
                      return (
                        <Col span={colSpan}>
                          <Typography className={`${barlow} ${bodyText1}`}>
                            {val ? val : ""}
                          </Typography>
                        </Col>
                      );
                    })}
                  </Row>
                );
              })
            ) : (
              <Grid
                container
                alignContent="center"
                justify="center"
                style={{ height: 120 }}
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
    </>
  );
};

export default TablePagination;
