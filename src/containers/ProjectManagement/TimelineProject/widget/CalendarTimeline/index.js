/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/prop-types */
import * as React from "react";
import Paper from "@mui/material/Paper";
import { Grid } from "@mui/material";
import { Button, Typography } from "antd";
import {
  ViewState,
  EditingState,
  GroupingState,
  IntegratedGrouping,
  IntegratedEditing,
} from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  Resources,
  WeekView,
  Appointments,
  AppointmentTooltip,
  AppointmentForm,
  GroupingPanel,
  Toolbar,
  ViewSwitcher,
  MonthView,
  DragDropProvider,
  AllDayPanel,
} from "@devexpress/dx-react-scheduler-material-ui";
import "./style.css";
import { blue, orange, red } from "@mui/material/colors";

import moment from "moment";
import { data as appointments } from "./data";

const resources = [
  {
    fieldName: "priorityId",
    title: "Priority",
    instances: [
      { text: "Card Baru", id: 1, color: blue },
      { text: "Developing ", id: 2, color: orange },
      { text: "Timeline 3", id: 3, color: red },
      { text: "Membuat Card Baru ", id: 4, color: "#30b16c" },
    ],
  },
];
const groupOrientation = (viewName) => viewName.split(" ")[0];
const grouping = [
  {
    resourceName: "priorityId",
  },
];

const AllDayCell = (props) => (
  <>
    <AllDayPanel.Cell {...props} style={{ height: "70px" }} />
    {/* <Button onClick={() => console.log(props)}>Test</Button> */}
  </>
);

export default (props) => {
  const [data, setData] = React.useState(appointments);

  const { dataCalendar } = props;
  const { dataResourceCalendar } = props;
  const { defaultDate } = props;

  const onCommitChanges = React.useCallback(
    ({ added, changed, deleted }) => {
      if (added) {
        const startingAddedId =
          data.length > 0 ? data[data.length - 1].id + 1 : 0;
        setData([...data, { id: startingAddedId, ...added }]);
      }
      if (changed) {
        setData(
          data.map((appointment) =>
            changed[appointment.id]
              ? { ...appointment, ...changed[appointment.id] }
              : appointment
          )
        );
      }
      if (deleted !== undefined) {
        setData(data.filter((appointment) => appointment.id !== deleted));
      }
    },
    [setData, data]
  );

  const AllDayTitleCell = (props) => (
    <AllDayPanel.TitleCell {...props} style={{ display: "none" }} />
  );

  const WeekViewTimeScaleLayout = (props) => (
    <WeekView.TimeScaleLayout
      {...props}
      style={{ display: "none", height: 12 }}
    />
  );
  const dayViewTimeScaleLayout = (props) => (
    <WeekView.DayScaleEmptyCell
      {...props}
      style={{ height: 40, padding: "0px 0px 20px 10px" }}
    >
      <Typography
        style={{ fontSize: 13, fontFamily: "Barlow", fontWeight: "600" }}
      >
        Judul Project
      </Typography>
    </WeekView.DayScaleEmptyCell>
  );
  const cellTime = (props) => (
    <WeekView.TimeTableCell {...props} style={{ height: 24 }} />
  );
  const labelGroup = (props) => (
    <GroupingPanel.Cell
      title="asd"
      {...props}
      textStyle={{ fontSize: 13, fontFamily: "Barlow" }}
      style={{ height: 70, width: 100 }}
    />
  );

  React.useEffect(() => {
    console.log(moment(defaultDate), "date");
  }, []);

  // const Content = ({ children, appointmentData, ...restProps }) => (
  //   <AppointmentTooltip.Content
  //     {...restProps}
  //     appointmentData={appointmentData.title}
  //   >
  //     <Grid container alignItems="center" />
  //   </AppointmentTooltip.Content>
  // );

  // const Header = ({ children, appointmentData, ...restProps }) => (
  //   <StyledAppointmentTooltipHeader
  //     {...restProps}

  //     appointmentData={appointmentData.tile}
  //   />
  // );
  return (
    <>
      <Scheduler data={dataCalendar} height={480} allDay title="akz">
        <ViewState defaultCurrentDate={moment(defaultDate)} />
        <EditingState onCommitChanges={onCommitChanges} />
        <GroupingState
          grouping={grouping}
          groupOrientation={groupOrientation}
          label="test"
        />
        {/* 
        <WeekView
          startDayHour={9}
          endDayHour={17}
          excludedDays={[0, 6]}
          cellDuration={240}
          name="Vertical Orientation"
          height={400}
          displayName="judul"
        />
        <WeekView
          startDayHour={9}
          endDayHour={17}
          excludedDays={[0, 6]}
          name="Horizontal Orientation"
       
        /> */}
        {/* <WeekView
          // startDayHour={10}
          // endDayHour={11}
          // excludedDays={[0, 6]}
          // cellDuration= {30}
          name="Vertical Orientation"
          height={400}
          intervalCount={4}
          showAllDayTitle
          timeCellTemplate={ () => {}}
          startDayHour= {8}
          endDayHour= {20}
          cellDuration= {480}
        /> */}
        <WeekView
          startDayHour={9}
          name="Vertical Orientation"
          height={900}
          endDayHour={17}
          cellDuration={240}
          timeScaleLayoutComponent={WeekViewTimeScaleLayout}
          timeTableCellComponent={cellTime}
          dayScaleEmptyCellComponent={dayViewTimeScaleLayout}
          intervalCount={4}
        />

        <Appointments />

        <AllDayPanel
          cellComponent={AllDayCell}
          titleCellComponent={AllDayTitleCell}
        />
        <Resources data={dataResourceCalendar} mainResourceName="priorityId" />

        <IntegratedGrouping />
        <IntegratedEditing />
        {/* <AppointmentTooltip contentComponent={Content} /> */}
        <AppointmentTooltip visible={false} />
        {/* <AppointmentForm /> */}

        <GroupingPanel
          textStyle={{ color: "red" }}
          height={100}
          cellStyle={{ display: "none" }}
          cellComponent={labelGroup}
        />
        <Toolbar />

        <DragDropProvider />
      </Scheduler>
    </>
  );
};
