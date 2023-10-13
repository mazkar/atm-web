import React from 'react';

import ChkyTablePagination from '../../../components/chky/ChkyTablePagination';
import { Status } from '../../../components/TabelCellOptions';

const TableSection = () => {
  return (
    <div style={{ marginTop: 22 }}>
      <ChkyTablePagination
        fields={titleTable}
        cellOption={valueType}
        totalPages={10}
        rowsPerPage={10}
        totalRows={1000}
        data={dummyData.map((val) => {
          const { status } = val;
          return {
            ...val,
            status: (
              <Status
                value={status ? 'Success' : 'Failed'}
                borderColor={status ? '#65D170' : '#FF7A76'}
                textColor={status ? '#65D170' : '#FF7A76'}
                fillColor={status ? '#DEFFE1' : '#FFE9E9'}
              />
            ),
          };
        })}
      />
    </div>
  );
};

export default TableSection;

const titleTable = [
  'ID Activity',
  'User ID',
  'Activity Name',
  'Module Name',
  'Channel Group',
  'Core Ref No',
  'Start Date',
  'End Date',
  'Processing Time',
  'Channel Code',
  'Status',
  'Error Code',
  'Error Desc',
  'Additional Data',
];

const valueType = [
  'string',
  'string',
  'string',
  'string',
  'string',
  'string',
  'string',
  'string',
  'string',
  'string',
  'child',
  'string',
  'string',
  'string',
];

const dummyData = [
  {
    activityId: 1,
    userId: 402812,
    activityName: 'Audit ATM Data',
    moduleName: 'Audit Data',
    channelGroup: 'Audit',
    coreRefNo: 24,
    startDate: '12 Februari 2021',
    endDate: '22 Februari 2021',
    processingTime: '12 : 45 : 13',
    channelCode: 3,
    status: true,
    errorCode: 1,
    errorDesc: 'No Error',
    additionalData: 0,
  },
  {
    activityId: 2,
    userId: 965326,
    activityName: 'Audit ATM Data',
    moduleName: 'Audit Data',
    channelGroup: 'Audit',
    coreRefNo: 73,
    startDate: '12 Februari 2021',
    endDate: '22 Februari 2021',
    processingTime: '12 : 45 : 13',
    channelCode: 5,
    status: true,
    errorCode: 3,
    errorDesc: 'No Error',
    additionalData: 0,
  },
  {
    activityId: 3,
    userId: 566239,
    activityName: 'Audit ATM Data',
    moduleName: 'Audit Data',
    channelGroup: 'Audit',
    coreRefNo: 67,
    startDate: '12 Februari 2021',
    endDate: '22 Februari 2021',
    processingTime: '12 : 45 : 13',
    channelCode: 4,
    status: true,
    errorCode: 4,
    errorDesc: 'No Error',
    additionalData: 0,
  },
  {
    activityId: 4,
    userId: 234235,
    activityName: 'Audit ATM Data',
    moduleName: 'Audit Data',
    channelGroup: 'Audit',
    coreRefNo: 70,
    startDate: '12 Februari 2021',
    endDate: '22 Februari 2021',
    processingTime: '12 : 45 : 13',
    channelCode: 2,
    status: false,
    errorCode: 4,
    errorDesc: 'No Error',
    additionalData: 0,
  },
  {
    activityId: 5,
    userId: 851131,
    activityName: 'Audit ATM Data',
    moduleName: 'Audit Data',
    channelGroup: 'Audit',
    coreRefNo: 17,
    startDate: '12 Februari 2021',
    endDate: '22 Februari 2021',
    processingTime: '12 : 45 : 13',
    channelCode: 8,
    status: true,
    errorCode: 3,
    errorDesc: 'No Error',
    additionalData: 0,
  },
  {
    activityId: 6,
    userId: 173840,
    activityName: 'Audit ATM Data',
    moduleName: 'Audit Data',
    channelGroup: 'Audit',
    coreRefNo: 90,
    startDate: '12 Februari 2021',
    endDate: '22 Februari 2021',
    processingTime: '12 : 45 : 13',
    channelCode: 10,
    status: false,
    errorCode: 2,
    errorDesc: 'No Error',
    additionalData: 0,
  },
  {
    activityId: 7,
    userId: 275126,
    activityName: 'Audit ATM Data',
    moduleName: 'Audit Data',
    channelGroup: 'Audit',
    coreRefNo: 12,
    startDate: '12 Februari 2021',
    endDate: '22 Februari 2021',
    processingTime: '12 : 45 : 13',
    channelCode: 1,
    status: false,
    errorCode: 4,
    errorDesc: 'No Error',
    additionalData: 0,
  },
  {
    activityId: 8,
    userId: 700350,
    activityName: 'Audit ATM Data',
    moduleName: 'Audit Data',
    channelGroup: 'Audit',
    coreRefNo: 36,
    startDate: '12 Februari 2021',
    endDate: '22 Februari 2021',
    processingTime: '12 : 45 : 13',
    channelCode: 7,
    status: true,
    errorCode: 3,
    errorDesc: 'No Error',
    additionalData: 0,
  },
  {
    activityId: 9,
    userId: 485061,
    activityName: 'Audit ATM Data',
    moduleName: 'Audit Data',
    channelGroup: 'Audit',
    coreRefNo: 71,
    startDate: '12 Februari 2021',
    endDate: '22 Februari 2021',
    processingTime: '12 : 45 : 13',
    channelCode: 10,
    status: false,
    errorCode: 5,
    errorDesc: 'No Error',
    additionalData: 0,
  },
  {
    activityId: 10,
    userId: 704778,
    activityName: 'Audit ATM Data',
    moduleName: 'Audit Data',
    channelGroup: 'Audit',
    coreRefNo: 16,
    startDate: '12 Februari 2021',
    endDate: '22 Februari 2021',
    processingTime: '12 : 45 : 13',
    channelCode: 4,
    status: false,
    errorCode: 4,
    errorDesc: 'No Error',
    additionalData: 0,
  },
];
