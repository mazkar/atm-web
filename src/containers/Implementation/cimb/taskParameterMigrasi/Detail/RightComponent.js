import React, { useState } from "react";
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
import useTimestampConverter from "../../../../../helpers/useTimestampConverter";
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
    width: "96%",
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
    fontSize: 12,
  },
});

const dataSelectRekeningBank = [
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
];

function RightComponent(props) {
  const classes = useStyles();
  const {
    showChatInput,
    disableDropdown,
    showHistory,
    showChatHistory,
    valueStatus,
    data,
  } = props;
  const [value, setValue] = useState("TODO");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    console.log(e);
    setValue(e);
  };

  return (
    <Grid item xs={5}>
      <Paper className={classes.rootPaper}>
        <div style={{ paddingTop: 25, paddingLeft: 25 }}>
          <Grid container direction="column">
            {/* Top */}
            <Grid item>
              <Grid container direction="column">
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
                  <SelectWithIcon
                    bordered
                    value={data.status}
                    suggestions={dataSelectRekeningBank}
                    width="96%"
                    handleChange={handleChange}
                    disabled={disableDropdown}
                  />
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
              </Grid>
            </Grid>

            {showChatInput ? (
              <Grid item style={{ marginTop: "25px" }}>
                <SmallInput
                  style={{ width: "96%", height: "23px" }}
                  onChange={(e) => setMessage(e)}
                  placeholder="Masukkan Pesan Anda"
                />
              </Grid>
            ) : null}

            {/* Middle */}
            {showHistory ? (
              <Grid item>
                <Box className={classes.boxStyle}>
                  <div className={classes.dashedLine}>
                    {data.timeLineData.length > 0 ? (
                      data.timeLineData.map((item) => (
                        <TimeLineAvatar
                          name={item.name}
                          initial={item.initial}
                          message={item.message}
                          date={item.date}
                          time={item.time}
                        />
                      ))
                    ) : (
                      <Typography className={classes.noData}>
                        No History Log
                      </Typography>
                    )}
                  </div>
                </Box>
              </Grid>
            ) : null}

            {/* Bottom */}
            {showChatHistory && (
              <Grid item>
                <Box className={classes.boxStyle}>
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
                </Box>
              </Grid>
            )}
          </Grid>
        </div>
      </Paper>
    </Grid>
  );
}

RightComponent.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired,
  isLoadData: PropTypes.bool,
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
