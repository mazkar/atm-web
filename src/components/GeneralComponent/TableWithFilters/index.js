/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Row, Col } from 'antd';

import GeneralTable from '../GeneralTable';
import {
  RadioControllerContainer,
  RadioControllerButton,
} from '../../RadioController';
import FilterByViewAndSort from '../FilterByViewAndSort';
import TextButtonWithIcon from '../../Button/TextButtonWithIcon';

import { ReactComponent as Excel } from '../../../assets/images/excel.svg';
import { ReactComponent as Pdf } from '../../../assets/images/pdf.svg';

const styles = makeStyles(() => ({
  container: {
    backgroundColor: '#ffffff',
    padding: '20px',
    border: '1px solid #E5EDF8',
    borderRadius: '4px',
    marginTop: '20px',
  },
  tableTitleStyle: {
    fontFamily: 'NunitoRegular',
    fontWeight: '600',
    fontSize: '22px',
    color: '#364449',
  },
  controllerPosition: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  filterStyle: {
    margin: '20px 0',
  },
}));

const TableWithFilters = ({
  tableTitle,
  filterSuggestions,
  filtersCaptions,
  columns,
  dataSources,
  onChangeDateSortingMode,
  onFilterSubmit,
  withSummary,
  withDownloadButtons,
  withRightButtons = true,
  withFilter = true,
}) => {
  const [selectedData, setSelectedData] = React.useState(
    filterSuggestions[0][0].value
  );
  const [column, setColumm] = React.useState(
    Array.from(new Set(columns[selectedData]))
  );
  // const filteredNumber = []
  const classes = styles();
  React.useEffect(() => {
    setColumm(Array.from(new Set(columns[selectedData])));
    console.log(Array.from(new Set(columns[selectedData])));
  }, [selectedData]);
  return (
    <div className={classes.container}>
      <Row>
        <Col span={12}>
          <span className={classes.tableTitleStyle}>{tableTitle}</span>
        </Col>
        <Col span={12} className={classes.controllerPosition}>
          {withRightButtons ? (
            <>
              {withDownloadButtons ? (
                <>
                  <TextButtonWithIcon
                    title="Download Excel"
                    icon={<Excel fill="#99CC00" />}
                  />
                  <TextButtonWithIcon
                    title="Download PDF"
                    icon={<Pdf fill="#99CC00" />}
                  />
                </>
              ) : null}
              <RadioControllerContainer
                onChange={(e) => onChangeDateSortingMode(e)}
                defaultValue="Full Month"
              >
                {['Full Month', 'Full Year'].map((item) => (
                  <RadioControllerButton value={item} key={item}>
                    {item}
                  </RadioControllerButton>
                ))}
              </RadioControllerContainer>
            </>
          ) : null}
        </Col>
      </Row>
      {withFilter ? (
        <FilterByViewAndSort
          className={classes.filterStyle}
          viewingSuggestions={filterSuggestions[0]}
          sortingSuggestions={filterSuggestions[1]}
          caption1={filtersCaptions[0]}
          caption2={filtersCaptions[1]}
          onFilterSubmit={() => {}}
          handleViewByOnChange={(e) => {
            setSelectedData(e);
          }}
          handleSortByOnChange={(e) => {
            console.log(e);
          }}
          handleEndDateOnChange={() => {}}
          handleStartDateOnChange={() => {}}
        />
      ) : null}
      <GeneralTable
        className="TableWithFilters"
        columns={column}
        containerStyles={{
          marginTop: '10px',
        }}
        rowClassName={withSummary ? 'table-row-with-summary' : 'table-row'}
        pagination={false}
        dataSource={dataSources[selectedData]}
      />
    </div>
  );
};

export default TableWithFilters;
