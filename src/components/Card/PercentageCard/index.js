import React from "react";
import { Card, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Col, Row } from "antd";
import PropTypes from "prop-types";

const useStyle = makeStyles({
  card: {
    border: 0,
    borderRadius: 10,
    padding: 3,
  },
  flexCol: {
    display: "flex",
    alignItems: "center",
  },
  barlow: {
    fontFamily: "Barlow",
    fontStyle: "normal",
  },
  labelStyle: {
    fontWeight: 600,
    fontSize: 17,
    color: "#2B2F3C",
  },
  numberStyle: {
    fontWeight: 600,
    fontSize: 25,
    color: "#DC241F",
  },
});

const PercentageCard = (props) => {
  const { value, label, icon, height } = props;
  const classess = useStyle();
  const barlow = classess.barlow;
  return (
    <Card variant="outlined" className={classess.card}>
      <Row align="middle" justify="center" style={{ height: height }}>
        <Col>{icon}</Col>
        <Col span={16} style={{ paddingLeft: 18 }}>
          <Typography className={`${barlow} ${classess.labelStyle}`}>
            {label}
          </Typography>
          <Typography
            className={`${barlow} ${classess.numberStyle}`}
          >{`${value}`}</Typography>
        </Col>
      </Row>
    </Card>
  );
};

PercentageCard.propTypes = {
  value: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
  height: PropTypes.number,
};

PercentageCard.defaultProps = {
  height: 98,
};

export default PercentageCard;
