import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { Paper, Typography, Grid, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import SelectWithIcon from "../../../../../components/Selects/SelectWithIcon";
import { ReactComponent as TodoIcon } from "../../../../../assets/icons/siab/time-circle.svg";
import { ReactComponent as DoingIcon } from "../../../../../assets/icons/siab/refresh-blue.svg";
import { ReactComponent as DoneIcon } from "../../../../../assets/icons/duotone-others/check-green.svg";
import { ReactComponent as StripIcon } from "../../../../../assets/icons/siab/strip-circle.svg";
import { ReactComponent as WarningIcon } from "../../../../../assets/icons/duotone-gray/alert-triangle-gray.svg";
import InputBordered from "../../common/InputComponent";

const useStyles = makeStyles({
  rootPaper: {
    width: "100%",
    minHeight: "400px",
    height: "100%",
    borderRadius: 10,
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
});

const dataSelectRekeningBank = [
  {
    id: 0,
    value: "TODO",
    nameId: "TODO",
    nameEn: "TODO",
    icon: <TodoIcon />,
  },
  {
    id: 1,
    value: "DOING",
    nameId: "DOING",
    nameEn: "DOING",
    icon: <DoingIcon />,
  },
  {
    id: 2,
    value: "DONE",
    nameId: "DONE",
    nameEn: "DONE",
    icon: <DoneIcon />,
  },
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
  const { status, handleChangeStatus } = props;

  return (
    <div>
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
                    defaultValue={status}
                    suggestions={dataSelectRekeningBank}
                    width="96%"
                    handleChange={(e)=> handleChangeStatus(e.target.value)}
                    disable
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
          </Grid>
        </div>
      </Paper>
    </div>
  );
}

RightComponent.propTypes = {
  status: PropTypes.string.isRequired,
  handleChangeStatus: PropTypes.func.isRequired,
};
RightComponent.defaultProps = {
};
function mapStateToProps() {
  return {};
}

export default withRouter(
  connect(mapStateToProps)(withTranslation("translations")(RightComponent))
);
