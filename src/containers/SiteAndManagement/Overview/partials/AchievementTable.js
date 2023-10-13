import React, { useContext } from 'react';
import {
  Table,
  TableContainer,
  TableBody,
  TableRow,
  TableCell,
  Typography,
} from '@material-ui/core';

import { GrayUltrasoft, GrayMedium } from '../../../../assets/theme/colors';
import { SiteManOvContext } from '../index';
import NoData from './NoData';
import LoadingView from '../../../../components/Loading/LoadingView';
import LoadingOverlayWrapper from './LoadingOverlayWrapper';

let monthsArr = [];

for (let i = 1; i <= 12; i++) {
  monthsArr.push(i);
}

const AchievementTable = (props) => {
  const { achData, isAchLoading } = useContext(SiteManOvContext);
  // console.log(achData);
  let data = achData
    ? [
        ['Bulan', ...monthsArr, 'Total'],
        [
          'RBB',
          // props.type === 'New' ? 'RBB (11)' : 'RBB',
          // ...achData.dataRbb?.map(({value}) => value),
          ...achData.dataRbb?.map(i => props.type === 'New' ? (i.month !== "1" && i.month !== "12") && i.value : i.value),
          achData.sumTotalRbb,
        ],
        [
          'Target',
          ...achData.dataTarget?.map(({ value }) => value),
          achData.sumTarget,
        ],
        ...(props.type === 'Termin'
          ? []
          : [
              [
                props.type === 'Renewal' ? 'Approval' : 'Online',
                ...achData.dataOnline?.map(({ value }) => value),
                achData.sumOnline,
              ],
            ]),
        [
          'Achievement',
          ...achData.dataAchievement?.map(({ value }) => value),
          achData.sumAchievement,
        ],
      ]
    : [];
  // console.log(data);

  return (
    <div
      style={{
        borderRadius: 8,
        border: `1px solid ${GrayMedium}`,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {isAchLoading ? (
        <LoadingView maxheight='100%' />
      ) : (
        <>
          <LoadingOverlayWrapper open={isAchLoading}>
            {data.length > 0 ? (
              <TableContainer style={{ paddingTop: 18 }}>
                <Table size='small'>
                  <TableBody>
                    {data?.map((row, i) => (
                      <TableRow
                        key={i}
                        style={{
                          backgroundColor: i % 2 ? GrayUltrasoft : null,
                        }}
                      >
                        {row?.map((cell, j) => (
                          <TableCell
                            key={j}
                            style={j === 0 ? headerStyle : bodyStyle}
                          >
                            {cell}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <NoData />
            )}
            {data?.length > 0 && (
              <Typography
                style={{
                  fontWeight: 500,
                  fontSize: '10px',
                  lineHeight: '12px',
                  padding: '12px 8px',
                  marginTop: 'auto',
                }}
              >
                Achievement dari{' '}
                {props.type === 'Renewal'
                  ? 'Approval'
                  : props.type === 'Termin'
                  ? 'implementation (data team implementation)'
                  : 'mesin online (data team implementation)'}
              </Typography>
            )}
          </LoadingOverlayWrapper>
        </>
      )}
    </div>
  );
};

export default AchievementTable;

const headerStyle = {
  fontWeight: 500,
  fontSize: '10px',
  lineHeight: '12px',
  borderBottom: 'none',
  padding: 8,
};

const bodyStyle = {
  fontWeight: 500,
  fontSize: '13px',
  lineHeight: '16px',
  borderBottom: 'none',
  padding: 8,
  textAlign: 'center',
};
