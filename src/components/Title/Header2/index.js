/* eslint-disable react/prop-types */
import React from 'react';
import { Row } from 'antd';

import TextButtonWithIcon from '../../Button/TextButtonWithIcon';
import {
  RadioControllerContainer,
  RadioControllerButton,
} from '../../RadioController';

import { ReactComponent as Excel } from '../../../assets/images/excel.svg';
import { ReactComponent as Pdf } from '../../../assets/images/pdf.svg';

const Header2 = ({ addButton, onChange, sortMode, sortingMode }) => {
  return (
    <Row style={{ width: '65%', justifyContent: 'flex-end' }}>
      <TextButtonWithIcon
        title="Download Excel"
        icon={<Excel fill="#99CC00" height="20px" />}
      />
      <TextButtonWithIcon
        title="Download PDF"
        icon={<Pdf fill="#99CC00" height="20px" />}
      />
      {addButton === true ? (
        <RadioControllerContainer onChange={onChange} defaultValue={sortMode}>
          {sortingMode.map((item, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <RadioControllerButton value={item} key={index}>
              {item}
            </RadioControllerButton>
          ))}
        </RadioControllerContainer>
      ) : (
        <div />
      )}
    </Row>
  );
};

export default Header2;
