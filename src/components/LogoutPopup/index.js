import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Row } from 'antd';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';

import { ReactComponent as CloseIcon } from '../../assets/images/GeneralIcon/close.svg';

import TextButton from '../Button/TextButton';
import GeneralButton from '../Button/GeneralButton';

const useStyles = makeStyles(() => ({
  logoutTitle: {
    marginTop: '13px',
    fontFamily: 'NunitoRegular',
    fontWeight: '600',
    fontSize: '28px',
    textAlign: 'center',
    color: '#364449',
  },
  logout: {
    textAlign: 'center',
    fontFamily: 'NunitoRegular',
    fontSize: '16px',
    color: '#364449',
    marginTop: '62px',
  },
}));

const LogoutPopup = ({ visible, onCancel }) => {
  const classes = useStyles();

  return (
    <div>
      <Modal
        visible={visible}
        footer={null}
        onCancel={onCancel}
        closeIcon={<CloseIcon />}
      >
        <div className={classes.logoutTitle}>Log Out</div>
        <div className={classes.logout}>Are you sure want to logout?</div>
        <Row style={{ marginTop: '77px' }}>
          <div style={{ width: '50%' }}>
            <TextButton
              title="No, Keep me inside"
              height="41px"
              paddingLeft="0px"
              onClick={onCancel}
            />
          </div>
          <div style={{ width: '50%', textAlign: 'end' }}>
            <GeneralButton
              title="Yes, I want to go"
              height="41px"
              width="159px"
              onClick={onCancel}
            />
          </div>
        </Row>
      </Modal>
    </div>
  );
};

LogoutPopup.propTypes = {
  visible: PropTypes.bool,
  onCancel: PropTypes.func.isRequired,
};

LogoutPopup.defaultProps = {
  visible: true,
};

export default LogoutPopup;
