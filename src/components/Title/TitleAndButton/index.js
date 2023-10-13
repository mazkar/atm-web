/* eslint-disable react/prop-types */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Row } from 'antd';

import { ReactComponent as Excel } from '../../../assets/images/excel.svg';
import { ReactComponent as Pdf } from '../../../assets/images/pdf.svg';

import ButtonIcon from '../../Button/MuiIconLabelButton';
import Button from '../../Button/WhiteGreenButton';

const useStyles = makeStyles(() => ({
  title: {
    width: '40%',
    fontFamily: 'NunitoRegular',
    fontWeight: '600',
    fontSize: '28px',
    color: '#364449',
  },
}));

const TitleAndButton = ({ title, titleStyle, threeButton, onClickRaw }) => {
  const classes = useStyles();

  return (
    <div>
      <Row style={{ alignItems: 'center' }}>
        <div className={classes.title} style={titleStyle}>
          {title}
        </div>
        <Row
          style={{
            width: '60%',
            textAlign: 'end',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          {threeButton ? (
            <div>
              <Button
                title="Show RAW Data"
                buttonStyle={{ margin: '10px 10px', height: '48px' }}
                onClick={onClickRaw}
              />
            </div>
          ) : (
            <div />
          )}

          <div>
            <ButtonIcon
              label="Download Excel"
              buttonIcon={<Excel fill="#ffffff" />}
            />
          </div>
          <div>
            <ButtonIcon
              label="Download PDF"
              buttonIcon={<Pdf fill="#ffffff" />}
            />
          </div>
        </Row>
      </Row>
    </div>
  );
};

export default TitleAndButton;
