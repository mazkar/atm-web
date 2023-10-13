/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import PropTypes from 'prop-types';
import { Col, Divider, Row } from 'antd';
import { makeStyles } from '@material-ui/core/styles';
import MailRed from '../../../assets/icons/siab/mail.png';
import MailGray from '../../../assets/icons/siab/mail-gray.png';
import useTimestampConverter from "../../../helpers/useTimestampConverter";

const useStyles = makeStyles({
  messageTitle: {
    fontFamily: 'Barlow',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '14px',
    color: 'dark',
  },
  messageTitleGray: {
    fontFamily: 'Barlow',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '14px',
    color: 'dark',
  },
  messageInfo: {
    fontFamily: 'Barlow',
    fontStyle: 'normal',
    fontWeight: '200',
    fontSize: '9px',
    color: 'dark',
  },
  messageDesc: {
    fontFamily: 'Barlow',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '11px',
    color: 'dark',
  },
  divider: { margin: '10px 0px' },
});
  
function ItemNotif({data, handleSelectNotif}) {
  const classes = useStyles();
  function renderIcon(isRead){
    if (isRead) {
      return MailGray;
    }
    return MailRed;
  }
  return (
    <div onClick={()=>handleSelectNotif(data)} style={{cursor: "pointer"}}>
      <Row justify="start">
        <Col flex="20px" order={2}>
          <img src={renderIcon(data.read)} style={{ height: 20, width: 20 }} />
        </Col>
        <Col flex="auto" order={1}>
          <div
            style={{ maxWidth: 350, display: 'flex', flexDirection: 'column' }}
          >
            <span className={data.read ? classes.messageTitleGray : classes.messageTitle}>{data.title}</span>
            <span className={classes.messageInfo}>{useTimestampConverter(data.time/1000, "DD-MM-YYYY HH:MM")}</span>
            <span className={classes.messageDesc}>{data.desc}</span>
          </div>
        </Col>
      </Row>
      <Divider dashed className={classes.divider} />
    </div>
  );
}

ItemNotif.propTypes = {
  data: PropTypes.object.isRequired,
  handleSelectNotif: PropTypes.func.isRequired,
};

export default ItemNotif;
