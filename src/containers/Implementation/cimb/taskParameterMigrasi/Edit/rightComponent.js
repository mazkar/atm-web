import React, { useEffect, useState } from "react";
import { Paper, Typography, Grid, Box, InputBase } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import TimeLineAvatar from "../../common/TimeLineAvatarKebutuhan";
import Comment from "../../common/Comment";
import SelectWithIcon from "../../../../../components/Selects/SelectWithIcon";
import { ReactComponent as TodoIcon } from "../../../../../assets/icons/siab/time-circle.svg";
import { ReactComponent as DoingIcon } from "../../../../../assets/icons/siab/refresh-blue.svg";
import { ReactComponent as DoneIcon } from "../../../../../assets/icons/duotone-others/check-green.svg";
import { ReactComponent as StripIcon } from "../../../../../assets/icons/siab/strip-circle.svg";
import { ReactComponent as WarningIcon } from "../../../../../assets/icons/duotone-gray/alert-triangle-gray.svg";
import { PrimaryHard } from "../../../../../assets/theme/colors";
import SelectItemsIcon from "../../../../../components/Selects/SelectItemsIcon";
import InputBordered from "../../common/InputComponent";
import useTimestampConverter from "../../../../../helpers/useTimestampConverter";
import moment from "moment";
import { filterOptionsByStatus } from "../../common/filterStatusOptions";
const useStyles = makeStyles({
  rootPaper: {
    width: "100%",
    minHeight: "310px",
    height: "100%",
    borderRadius: 10,
    paddingBottom: 30,
    boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
  },

  dashedLine: {
    position: "relative",
    width: "100%",
    margin: "0 auto",
    "&::after": {
      content: '""',
      position: "absolute",
      width: 0,
      top: 35,
      bottom: 0,
      left: 17,
      border: "3px solid #BCC8E7",
      height: "90%",
      backgroundColor: "white",
      borderWidth: 2,
      borderColor: "#BCC8E7",
      borderRadius: 1,
      borderStyle: "dashed",
    },
  },
  boxStyle: {
    padding: "15px 15px",
    position: "relative",
    borderRadius: 10,
    marginTop: 20,
    border: "1px solid #BCC8E7",
    backgroundColor: "#fff",
    width: "100%",
    "&::after": {
      content: '""',
      position: "absolute",
      width: 20,
      height: "125%",
      left: -37,
      backgroundColor: "#fff",
      top: -100,
      zIndex: 1,
    },
    height: "250px",
    overflow: "auto",
    overflowX: "hidden",
    "&::-webkit-scrollbar": {
      width: "5px",
    },
    "&::-webkit-scrollbar-track": {
      background: "#F4F7FB",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#BCC8E7",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: "#9AC2FF",
    },
  },
  noData: {
    color: "#BCC8E7",
    fontStyle: "italic",
    fontSize: 13,
    marginTop: 10,
  },
});

const timeLineData = [
  {
    name: "Ghefira Faradhia Shofa",
    message: "Change Due Date",
    initial: "GF",
    date: "12-12-2020",
    time: "12:36:12 AM",
  },
  {
    name: "Anfika Sigma",
    message: "Change Due Date",
    initial: "AS",
    date: "12-12-2020",
    time: "12:36:12 AM",
  },
  {
    name: "Tamima ARS",
    message: "Change Due Date",
    initial: "TA",
    date: "12-12-2020",
    time: "12:36:12 AM",
  },
];

const commentsData = [
  {
    name: "Deden Hidayat",
    comment: "Untuk pesanannya warnanya kurang sesuai",
    date: "10/12/2020 | 16:18",
  },
  {
    name: "Adam Rizananda",
    comment: "Ada perubahan ukuran dari requirement awalnya",
    date: "05/12/2020 | 16:18",
  },
  {
    name: "Ghefira FS",
    comment: "Ada perubahan ukuran dari requirement awalnya",
    date: "01/12/2020 | 16:18",
  },
];

/*const dataSelectRekeningBank = [
  { id: 0, value: "TODO", nameId: "TODO", nameEn: "TODO", icon: <TodoIcon /> },
  {
    id: 1,
    value: "DOING",
    nameId: "DOING",
    nameEn: "DOING",
    icon: <DoingIcon />,
  },
  { id: 2, value: "DONE", nameId: "DONE", nameEn: "DONE", icon: <DoneIcon /> },
  {
    id: 3,
    value: "STRIP",
    nameId: "STRIP",
    nameEn: "STRIP",
    icon: <StripIcon />,
  },
];*/
const dataSelectStatus = [
  { value: "TODO", name: "TODO", icon: <TodoIcon /> },
  { value: "DOING", name: "DOING", icon: <DoingIcon /> },
  { value: "DONE", name: "DONE", icon: <DoneIcon /> },
  { value: "STRIP", name: "STRIP", icon: <StripIcon /> },
];
function RightComponent({ data, handleChangeState, onMessageEnter }) {
  const classes = useStyles();
  const [statusOptionToShow, setStatusOptionToShow] = useState(dataSelectStatus);

  useEffect(() => {
    setStatusOptionToShow(filterOptionsByStatus(dataSelectStatus, data.status));
  }, [data]);

  return (
    <Grid item xs={5}>
      <Paper className={classes.rootPaper}>
        <div style={{ padding: 25 }}>
          <Grid container direction="column">
            {/* Top */}
            <Grid item>
              <Grid container direction="row">
                <Grid item style={{ padding: "2px 7px" }}>
                  <WarningIcon />
                </Grid>
                <Grid item>
                  <Typography style={{ fontWeight: 500, color: "#8D98B4" }}>
                    Status
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item style={{ marginTop: 5 }}>
              <SelectItemsIcon
                selectOptionData={statusOptionToShow}
                selectedValue={data.status}
                onSelectValueChange={(newVal) =>
                  handleChangeState(newVal, "status")
                }
              />

              {/*<SelectWithIcon
                    bordered
                    //defaultValue={valueStatus ? valueStatus : value}
                    suggestions={dataSelectRekeningBank}
                    width="96%"
                    handleChange={handleChange}
                    disabled={disableDropdown}
                  />*/}
            </Grid>
            <Grid item style={{ marginTop: 5 }}>
              <Typography
                style={{
                  fontWeight: 400,
                  fontStyle: "Italic",
                  color: "#8D98B4",
                  fontSize: "13px",
                }}
              >
                *Status berubah menjadi overdue ketika due date terlewati
              </Typography>
            </Grid>
            <Grid item style={{ marginTop: "25px" }}>
              <InputBordered
                style={{ width: "100%", height: "23px" }}
                value={data.message}
                onKeyUp={onMessageEnter}
                placeholder="Masukkan Pesan Anda"
                onChange={(e) => handleChangeState(e.target.value, "message")}
              />
            </Grid>
            <Grid item>
              <div className={classes.boxStyle}>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    padding: "5px 0px",
                    alignItems: "center",
                    zIndex: 2,
                  }}
                >
                  {data.commentsData.length > 0 ? (
                    data.commentsData.map((item) => (
                      <Comment
                        name={item.userName}
                        comment={item.message}
                        date={useTimestampConverter(
                          item.createdDate / 1000,
                          "DD/MM/YYYY | HH:mm"
                        )}
                      />
                    ))
                  ) : (
                    <Typography className={classes.noData}>
                      No Comment Data
                    </Typography>
                  )}
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      </Paper>
    </Grid>
  );
}

RightComponent.propTypes = {
  data: PropTypes.object,
  handleChangeState: PropTypes.func.isRequired,
  onMessageEnter: PropTypes.func.isRequired,
};

export default RightComponent;

const SmallInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
    padding: 0,
  },
  input: {
    borderRadius: 6,
    position: "relative",
    backgroundColor: (props) => props.backgroundColor, //theme.palette.common.white,
    fontSize: 15,
    width: "100%",
    height: "100%",
    padding: "7px 9px",
    border: "1px solid #BCC8E7",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    "&:focus": {
      borderColor: PrimaryHard,
    },
  },
}))(InputBase);
