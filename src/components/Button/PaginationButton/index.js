/* eslint-disable no-console */
import React from 'react';
import { Button, Radio } from "antd";

import { ReactComponent as ArrowLeft } from "../../../assets/images/angle-left.svg";
import { ReactComponent as ArrowRight } from "../../../assets/images/angle-right.svg";

// eslint-disable-next-line react/prop-types
const PaginationButton = ({ totalData, limitPerShow, maxShown, onChangePage, selectedNumber }) => {
  const [data, setData] = React.useState([]);
  const pagination = () => {

    const datas = [];
    const totalPages = Math.ceil(totalData / limitPerShow);
    const j = Math.ceil(maxShown / 2) + selectedNumber - 1;
    const k = Math.abs(selectedNumber - j);
    // eslint-disable-next-line no-plusplus
    for (let i = 1; i < totalPages; i++) {
      // if (i <= j) {
      datas.push(i);
      // continue;
      // }
      // if (selectedNumber >= Math.ceil(maxShown / 2) + 1) {
      //     datas.unshift('...');
      //     datas.unshift(1);
      // }
      // if (selectedNumber < totalPages - Math.ceil(maxShown / 2)) {
      //     datas.push('...');
      //     break;
      // }
    }
    // eslint-disable-next-line no-console
    console.log(`maxShown ${maxShown}`);
    console.log(`selectedNumber ${selectedNumber}`);
    console.log(`totalPages ${totalPages}`);
    console.log(`j ${j}`);
    console.log('k', k);
    datas.push(totalPages);
    setData(datas);

  };

  React.useEffect(() => {
    pagination();
  }, [selectedNumber]);

  return (
    <div className="PaginationButton">
      <Button className="PaginationButton__previous-disabled" size="middle" icon={<ArrowLeft className='PaginationButton__arrow-left' />} />
      <Radio.Group value={selectedNumber} className="PaginationButton__group" onChange={onChangePage}>
        {data.map((item, index) => {
          // eslint-disable-next-line react/no-array-index-key
          return (item !== '...' ? <Radio.Button className="PaginationButton__number" key={index} value={item}>{item}</Radio.Button> : <Radio.Button className="PaginationButton__number" key={index} disabled value={item}>{item}</Radio.Button>);
        })}
      </Radio.Group>
      <Button className="PaginationButton__next" size="middle" icon={<ArrowRight className='PaginationButton__arrow-right' />} />
    </div>

  );
};

export default PaginationButton;