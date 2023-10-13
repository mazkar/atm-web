/* eslint-disable no-console */
/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { Tabs, Tab } from "@material-ui/core";
import { TimePicker } from "antd";
import Moment from "moment";
import * as Colors from "../../../assets/theme/colors";

const useStyles = makeStyles({
  root: {
    display: "flex",
    borderRadius: 6,
    // backgroundColor: Colors.GrayUltrasoft,
    overflow: "hidden",
  },
  datePicker: {
    border: 0,
    backgroundColor: Colors.GrayUltrasoft,
    height: 36,
  },
  // Tabs Style
  rootTabs: {
    minHeight: 30,
    backgroundColor: Colors.GrayUltrasoft,
    color: Colors.GrayMedium,
    position: "relative",
    "& .MuiTab-textColorInherit.Mui-disabled": {
      opacity: 1,
    },
  },
  tabsIndicator: {
    display: "none",
  },
  rootItemTabs: {
    minHeight: 30,
    minWidth: 30,
  },
  selectedTabItem: {
    backgroundColor: Colors.PrimaryHard,
    color: Colors.White,
  },
  wrapperTabItem: {
    textTransform: "none",
  },
});

function ChkyTimePickerAmPm(props) {
  const classes = useStyles();

  const {
    currentTab,
    dataTab,
    handleChangeTab,
    getTime,
    type,
    gimmeThat,
    isDisable,
  } = props;

  const tabsStyles = {
    root: classes.rootTabs,
    indicator: classes.tabsIndicator,
  };
  const tabItemStyles = {
    root: classes.rootItemTabs,
    selected: classes.selectedTabItem,
    wrapper: classes.wrapperTabItem,
  };
  const [amPm, setAmPm] = useState(currentTab);
  // TABS
  const [selectedTab, setSelectedTab] = useState(amPm);
  const [valueTime, setValueTime] = useState("");
  //   const handleSelectedTab = (event, newValue) => {
  //     event.preventDefault();
  //     setSelectedTab(newValue);
  //     handleChangeTab(newValue);
  //   };

  useEffect(() => {
    setSelectedTab(amPm);
  // console.log("NANI : ", amPm);
  }, [amPm]);

  function handleChangetime(time, timeString) {
  // console.log(time, timeString);
    // const valueTime = time.format('hh:mm A');
    const valueTime = time.format("HH:mm");
    getTime(valueTime);
  // console.log("TIME : ", time);
    setValueTime(valueTime);
    if (valueTime.includes("AM")) {
      setAmPm(0);
      handleChangeTab(0);
    }
    if (valueTime.includes("PM")) {
      setAmPm(1);
      handleChangeTab(1);
    }
  }

  useEffect(() => {
    var getItem = localStorage.getItem("dataGetDraftDetail");
    if (getItem) {
      var parseItem = JSON.parse(getItem);
      // if(parseItem.checkStatus){
      parseItem.checkStatus = false;
      localStorage.setItem("dataGetDraftDetail", JSON.stringify(parseItem));
      if (parseItem.startWorkHour && parseItem.endWorkHour) {
        if (type === "start") {
          setValueTime(parseItem.startWorkHour);
          if (parseItem.startWorkHour.includes("AM")) {
            setAmPm(0);
          }
          if (parseItem.startWorkHour.includes("PM")) {
            setAmPm(1);
          }
        } else {
          setValueTime(parseItem.endWorkHour);
          if (parseItem.endWorkHour.includes("AM")) {
            setAmPm(0);
          }
          if (parseItem.endWorkHour.includes("PM")) {
            setAmPm(1);
          }
        }
      }
      // };
    }
  }, []);

  useEffect(() => {
  // console.log("KRATOS : ", gimmeThat);
  }, [gimmeThat]);

  useEffect(() => {
    // console.log('KRATOS 2 : ', gimmeThat);
  }, [valueTime]);

  const ifEmpty = () => {
    if (gimmeThat === "") {
      return "";
    } else {
      return Moment(gimmeThat, "HH:mm");
    }
  };

  return (
    <div className={classes.root}>
      {/* <TimePicker
        defaultValue={valueTime}
        // value={openingHour}
        value={valueTime === '' ? ifEmpty() : Moment(valueTime, 'HH:mm')}
        allowClear={false}
        suffixIcon
        onChange={handleChangetime}
        className={classes.datePicker}
        picker="time"
        format="hh:mm"
        // use12Hours
        disabled={isDisable}
      /> */}
      <TimePicker
        format="HH:mm"
        picker="time"
        onChange={handleChangetime}
        defaultValue={valueTime}
        value={valueTime === "" ? ifEmpty() : Moment(valueTime, "HH:mm")}
        className={classes.datePicker}
        allowClear={false}
        disabled={isDisable}
      />
      {/* <Tabs classes={tabsStyles} value={selectedTab} variant="fullWidth">
        {dataTab.map((item) => {
          return <Tab classes={tabItemStyles} disabled label={item} />;
        })}
      </Tabs> */}
    </div>
  );
}

ChkyTimePickerAmPm.propTypes = {
  dataTab: PropTypes.array,
  handleChangeTab: PropTypes.func,
  getTime: PropTypes.any,
  type: PropTypes.any,
};

ChkyTimePickerAmPm.defaultProps = {
  dataTab: ["AM", "PM"],
  handleChangeTab: () => {
    console.log("Tab Value Changed");
  },
};

export default ChkyTimePickerAmPm;
