/* eslint-disable eqeqeq */
/* eslint-disable import/no-cycle */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-shadow */
/* eslint-disable no-else-return */
/* eslint-disable prefer-template */
/* eslint-disable indent */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { useState } from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { Avatar } from "@material-ui/core";
import { ReactComponent as TrashIcon } from "../../assets/images/trash.svg";
import { ReactComponent as EditIcon } from "../../assets/images/edit.svg";
import { ReactComponent as EyeIcon } from "../../assets/images/eye.svg";
import { ReactComponent as ApprIcon } from "../../assets/images/check.svg";
import { ReactComponent as RegenIcon } from "../../assets/images/refresh.svg";
import { ReactComponent as DetailIcon } from "../../assets/images/xclose.svg";
import { ReactComponent as TrendUp } from "../../assets/icons/siab/revenue_green_up.svg";
import { ReactComponent as TrendDown } from "../../assets/icons/siab/revenue_red_down.svg";
import { ReactComponent as Success } from "../../assets/icons/siab/check-circle.svg";
import { ReactComponent as Failed } from "../../assets/icons/siab/time-circle.svg";
import ArrowUp from "../../assets/icons/siab/arrow-up-green.png";
import { ArrowDownward } from "@material-ui/icons";
import FileText from "../../assets/images/file-text.png";
import CheckGreen from "../../assets/images/check-green.png";
import RejectRed from "../../assets/icons/siab/reject-icon-solid.svg";
import ChevronDown from "../../assets/images/chevron-down.png";
import { ReactComponent as ArrowRight } from "../../assets/icons/siab/arrow-right.svg";
import { ReactComponent as Edit2 } from "../../assets/icons/siab/edit-2.svg";
import { ReactComponent as File } from "../../assets/icons/siab/file-text.svg";
import { ReactComponent as Eye } from "../../assets/icons/siab/eye-red.svg";
import {
  ChildApprover,
  ChildStatusApproval,
  ChildMenuMore,
  ChildIsChecked,
} from "../chky";
import useRupiahConverterSecondary from "../../helpers/useRupiahConverterSecondary";
import getFiles from "../../helpers/getFiles";
import MenuTwo from "./MenuTwo";
import { ReactComponent as Excalamation } from "../../assets/icons/duotone-red/exclamation-circle.svg";
import ChildStringLimit from "../chky/TableChild/ChildStringLimit";
import ChildCardStatus from "../chky/TableChild/ChildCardStatus";
import ChildApproverImple from "../chky/TableChild/ChildApproverImple";
import ChildScheduleStatus from "../chky/TableChild/ChildScheduleStatus";
import ChildTicketStatus from "../chky/TableChild/ChildTicketStatus";
import ChildResultStatus from "../chky/TableChild/ChildResultStatus";
import ChildStatusTicketByNumber from "../chky/TableChild/ChildStatusTicketByNumber";
import ChildFileApproveStatus from "../chky/TableChild/ChildFileApproveStatus";
import ChildSingleApprover from "../chky/TableChild/ChildSingleApprover";

const useStyles = makeStyles({
  value: {
    fontSize: 13,
  },
  menuMoreItem: {
    fontSize: 13,
    justifyContent: "space-between",
    display: "flex",
    "&:hover": {
      color: "#DC241F",
    },
  },
});

function Progress(props) {
  const classes = useStyles();

  const useStylesProgress = makeStyles({
    rootProgress: {
      display: "block",
      height: "100%",
      borderRadius: 5,
      "& .MuiLinearProgress-barColorPrimary": {
        backgroundColor: props.barColor,
      },
    },
  });

  const classesProgress = useStylesProgress();
  return (
    <Box alignItems="center">
      <Box
        width="100%"
        style={{
          position: "relative",
          height: "20px",
        }}
      >
        <LinearProgress
          className={classesProgress.rootProgress}
          variant="determinate"
          {...props}
        />
        <Box
          minWidth={35}
          style={{
            textAlign: "right",
            width: "100%",
            height: "15px",
            paddingRight: "5%",
            transform: "translate(20px, -20px)",
            zIndex: 9,
          }}
        >
          <Typography
            style={{ paddingRight: "15%" }}
            className={classes.value}
          >{`${Math.round(props.value)}%`}</Typography>
        </Box>
      </Box>
    </Box>
  );
}

function Priority(props) {
  const classes = useStyles();
  return (
    <Box>
      <Box
        style={{
          textAlign: "center",
          border: "1px solid",
          borderColor: props.borderColor,
          background: props.fillColor,
          borderRadius: 20,
          width: "max-content",
          paddingLeft: 10,
          paddingRight: 10,
          margin: "auto",
        }}
      >
        <Typography className={classes.value}>{props.value}</Typography>
      </Box>
    </Box>
  );
}

function Status(props) {
  const classes = useStyles();
  return (
    <Box>
      <Box
        style={{
          textAlign: "center",
          border: "1px solid",
          borderColor: props.borderColor,
          background: props.fillColor,
          color: props.textColor,
          borderRadius: 20,
          width: "max-content",
          paddingLeft: 10,
          paddingRight: 10,
          margin: "auto",
        }}
      >
        <Typography className={classes.value}>{props.value}</Typography>
      </Box>
    </Box>
  );
}

function Action(props) {
  const classes = useStyles();

  const actionProps = props.value;
  const actionObj = Object.values(actionProps)[0];

  return (
    <Box>
      <Box
        style={{
          textAlign: "center",
          width: "max-content",
          paddingLeft: 10,
          paddingRight: 10,
          margin: "auto",
        }}
      >
        <Typography className={classes.value}>
          {actionObj.map((item, i) => {
            return (
              <Link href={item.url} style={{ color: "#DC241F" }}>
                {item.name} &nbsp;
              </Link>
            );
          })}
        </Typography>
      </Box>
    </Box>
  );
}

function ActionRef(props) {
  const classes = useStyles();
  return (
    <Box>
      <Box
        style={{
          textAlign: "center",
          width: "max-content",
          paddingLeft: 10,
          paddingRight: 10,
          margin: "auto",
        }}
      >
        <Typography className={classes.value}>
          <Link href="#" style={{ color: "#88ADFF" }}>
            {props.value}
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}

function ActionFunc(props) {
  const classes = useStyles();
  const actionObj = props.value.dataAction;
  return (
    <Box>
      <Box
        style={{
          textAlign: "center",
          width: "max-content",
          paddingLeft: 10,
          paddingRight: 10,
          margin: "auto",
        }}
      >
        <Typography className={classes.value}>
          {actionObj.map((item, i) => {
            return (
              <Link
                // href={item.url}
                style={{ color: "#DC241F" }}
                onClick={(event) => {
                  // console.log(item);
                  // console.log(event);
                  item.funct(item.data);
                }}
              >
                {item.name} &nbsp;
              </Link>
            );
          })}
        </Typography>
      </Box>
    </Box>
  );
}

function MenuMore(props) {
  const classes = useStyles();
  const obj = props.value;
  // console.log("===> MENU MORE OBJ" + JSON.stringify(obj));
  // const actionObject = obj[Object.keys(obj)[0]];
  const actionObject = obj;

  const ITEM_HEIGHT = 48;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function renderIconMenu(type) {
    if (type === "view") {
      return <EyeIcon height={16} width={16} />;
    } else if (type === "edit") {
      return <EditIcon height={16} width={16} />;
    } else if (type === "delete") {
      return <TrashIcon height={16} width={16} />;
    } else if (type === "approve") {
      return <ApprIcon height={16} width={16} />;
    } else if (type === "renegotiation") {
      return <RegenIcon height={16} width={16} />;
    } else if (type === "detail") {
      return <DetailIcon height={16} width={16} />;
    } else {
      return <EyeIcon height={16} width={16} />;
    }
  }

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreHorizIcon style={{ color: "#DC241F" }} />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        {actionObject.map((item, i) => {
          // console.log("Menu more");
          // console.log({ item });
          // console.log({ i });
          return (
            <MenuItem
              key={i}
              onClick={() => {
                item.handler;
                if (item.action) {
                  item.action();
                }
              }}
              className={classes.menuMoreItem}
            >
              <Typography style={{ fontSize: 13 }}>{item.name}</Typography>
              <div>{renderIconMenu(item.type)}</div>
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
}

function UrlAction(props) {
  const classes = useStyles();

  const obj = props.value;
  const actionObject = obj;

  return (
    <Box>
      <Box
        style={{
          textAlign: "center",
          width: "max-content",
          paddingLeft: 10,
          paddingRight: 10,
          margin: "auto",
        }}
      >
        <Typography className={classes.value}>
          {actionObject.map((item, i) => {
            return (
              <Link
                href={item.url}
                style={{ color: "#DC241F", textDecoration: "none" }}
                key={i}
              >
                {item.name} &nbsp;
              </Link>
            );
          })}
        </Typography>
      </Box>
    </Box>
  );
}

function String(props) {
  const classes = useStyles();
  return (
    <Typography
      style={{
        textAlign: props.align || "center",
        width: "max-content",
        margin: props.align && props.align !== "center" ? 0 : "auto",
      }}
      className={classes.value}
    >
      {props.value === "" || props.value === null ? "-" : props.value}
    </Typography>
  );
}

function StringWithRandom(props) {
  const classes = useStyles();
  function splitString(str) {
    const string = str.split("~_~");
    return string[0];
  }
  return (
    <Typography
      style={{
        textAlign: "center",
        width: "max-content",
        margin: "auto",
      }}
      className={classes.value}
    >
      {props.value === "" || props.value === null
        ? "-"
        : splitString(props.value)}
    </Typography>
  );
}

function StatusString(props) {
  const classes = useStyles();
  const nilai = props.value;
  return (
    <div>
      {nilai === "Bad" ? (
        <Typography
          style={{
            textAlign: "center",
            width: "max-content",
            paddingLeft: 10,
            paddingRight: 10,
            margin: "auto",
            color: "#DC241F",
          }}
          className={classes.value}
        >
          {props.value}
        </Typography>
      ) : (
        <Typography
          style={{
            textAlign: "center",
            width: "max-content",
            paddingLeft: 10,
            paddingRight: 10,
            margin: "auto",
            color: "#65D170",
          }}
          className={classes.value}
        >
          {props.value}
        </Typography>
      )}
    </div>
  );
}

function ForecastTable(props) {
  const classes = useStyles();
  return (
    <Typography
      style={{
        textAlign: "center",
        width: "max-content",
        paddingLeft: 10,
        paddingRight: 10,
        margin: "auto",
      }}
      className={classes.value}
    >
      {props.value}
      <img src={ArrowUp} />
    </Typography>
  );
}
// approver cellType
function Approver(props) {
  const dataArray = props.value;
  // console.log("===> Data Approval" + JSON.stringify(dataArray));
  function renderBackColor(intialName) {
    if (intialName === "DH") {
      return "#88ADFF";
    }
    if (intialName === "TS") {
      return "#FFB443";
    }
    if (intialName === "BA") {
      return "#65D170";
    }
    if (intialName === "Y") {
      return "#FF6A6A";
    }
    return "#88ADFF";
  }

  return (
    <div style={{ display: "flex" }}>
      {dataArray === null ? (
        ""
      ) : (
        <div style={{ display: "flex" }}>
          {dataArray.map((item) => {
            return (
              <Avatar
                style={{
                  backgroundColor: renderBackColor(item),
                  width: 32,
                  height: 32,
                  margin: 2.5,
                  fontSize: 14,
                }}
              >
                {item}
              </Avatar>
            );
          })}
        </div>
      )}
    </div>
  );
}
function getInitialName(name) {
  let initials = name.match(/\b\w/g) || [];
  initials = ((initials.shift() || "") + (initials.pop() || "")).toUpperCase();
  return initials;
}
// reasonAuthor cellType

function ReasonAuthor(props) {
  const { value } = props;
  function renderBackColor(intialName) {
    if (intialName === "DH") {
      return "#88ADFF";
    }
    if (intialName === "TS") {
      return "#FFB443";
    }
    if (intialName === "BA") {
      return "#65D170";
    }
    if (intialName === "Y") {
      return "#FF6A6A";
    }
    return "#88ADFF";
  }

  return (
    <div style={{ textAlign: "center" }}>
      {value === null ? (
        "-"
      ) : (
        <div style={{ textAlign: "center" }}>
          <Avatar
            style={{
              backgroundColor: renderBackColor(getInitialName(value)),
              width: 32,
              height: 32,
              margin: "auto",
              fontSize: 14,
            }}
          >
            {getInitialName(value)}
          </Avatar>
        </div>
      )}
    </div>
  );
}

// file details budget tracking financial
function FileBudgetTracking(props) {
  const dataArray = props.value;
  return dataArray.map((val, i) => (
    <div
      key={i}
      onClick={() =>
        getFiles({
          url: `${process.env.REACT_APP_API_DOMAIN}/financialservices/financialTransactionServices/v1/fileDownloadDocument`,
          data: {
            name: val.name,
          },
          fileName: val.name,
          loading: () => {
            console.log("onLoading");
          },
        })
      }
      style={{ color: "rgb(220, 36, 31)", cursor: "pointer", padding: 5 }}
    >
      <img src={FileText} /> {val.name}
    </div>
  ));
}

function RemarkBudgetTracking(param) {
  return (
    <div
      onClick={() => alert(param)}
      style={{ color: "#DC241F", fontSize: "13px" }}
    >
      {param} <img src={ChevronDown} />
    </div>
  );
}

function ApprovalBudgetTracking(param) {
  return (
    <div>
      <img
        src={
          param === "approve"
            ? CheckGreen
            : param === "not approve"
            ? RejectRed
            : null
        }
        style={{
          marginLeft: 20,
          width: param === "not approve" ? 20 : "unset",
        }}
      />
    </div>
  );
}
// =====> BATAS AWAL INDEX COMPONENT

const index = (props) => {
  const { value, cellType, align } = props;
  function renderProgresStyle(param) {
    if (param >= 26 && param < 51) {
      return <Progress value={param} barColor="#FFB443" />;
    } else if (param >= 51 && param < 99) {
      return <Progress value={param} barColor="#88ADFF" />;
    } else if (param >= 100) {
      return <Progress value={param} barColor="#65D170" />;
    } else {
      return <Progress value={param} barColor="#DC241F" />;
    }
  }

  function renderPriorityStyle(param) {
    if (param === "High") {
      return (
        <Priority value={param} borderColor="#DC241F" fillColor="#FFE9E9" />
      );
    } else if (param === "Medium") {
      return (
        <Priority value={param} borderColor="#FFB443" fillColor="#FFEBD3" />
      );
    } else {
      return (
        <Priority value={param} borderColor="#A4A4A5" fillColor="#E9E9E9" />
      );
    }
  }

  function renderStatusStyle(param) {
    if (param === "Complete" || param === "Deal") {
      return (
        <Status
          value={param}
          borderColor="#65D170"
          textColor="#65D170"
          fillColor="#D9FFDD"
        />
      );
    } else {
      return (
        <Status
          value={param}
          borderColor="#88ADFF"
          textColor="#88ADFF"
          fillColor="#EFF4FF"
        />
      );
    }
  }

  function renderStatusNego(param) {
    if (param === "6") {
      return (
        <Status
          value="Renegotiation"
          borderColor="#CD62FF"
          textColor="#CD62FF"
          fillColor="#FAEFFF"
        />
      );
    } else if (param === "1") {
      return (
        <Status
          value="Negotiation"
          borderColor="#65D170"
          textColor="#65D170"
          fillColor="#DEFFE1"
        />
      );
    } else if (param === "7") {
      return (
        <Status
          /* ISSUE-181 Negotiation */
          //value="Profiling 2"
          value="Profiling"
          borderColor="#749BFF"
          textColor="#749BFF"
          fillColor="#EBF0FF"
        />
      );
    } else if (param === "5" || param === "3") {
      return (
        <Status
          value={param === "5" ? "Terminated" : "Rejected"}
          borderColor="#FF7A76"
          textColor="#FF7A76"
          fillColor="#FFE9E9"
        />
      );
    } else if (param === "4") {
      return (
        <Status
          value="Approve"
          borderColor="#ffbd42"
          textColor="#ffbd42"
          fillColor="#FFF9F0"
        />
      );
    } else if (param === "2") {
      return (
        <Status
          value="On Review"
          borderColor="#ffbd42"
          textColor="#ffbd42"
          fillColor="#FFF9F0"
        />
      );
    } else {
      return (
        <Status
          value={param}
          borderColor="#65D170"
          textColor="#65D170"
          fillColor="#D9FFDD"
        />
      );
    }
  }

  function renderHargaNego(param) {
    if (param.flatCost === false) {
      if (param.costList !== null) {
        const datacostList = param.costList;
        const arraydata = datacostList
          .replace("[", "")
          .replace("]", "")
          .split(",");
        let elements = [];
        for (let i = 0; i < arraydata.length; i++) {
          elements.push(
            <div>
              th-{i + 1} {useRupiahConverterSecondary(Number(arraydata[i]))}
            </div>
          );
        }
        return <div align={align}>{elements}</div>;
      } else {
        return <div align={align}>-</div>;
      }
    } else {
      return (
        <String value={param.cost === "N/A" ? "-" : param.cost} align={align} />
      );
    }
  }

  function renderStatusApproval(param) {
    if (param === "Need Approval") {
      return (
        <Status
          value={param}
          borderColor="#ffbd42"
          textColor="#ffbd42"
          fillColor="#FFF9F0"
        />
      );
    } else {
      return (
        <Status
          value={param}
          borderColor="#65D170"
          textColor="#65D170"
          fillColor="#D9FFDD"
        />
      );
    }
  }

  function renderStatusPaid(param) {
    if (param === "1") {
      return (
        <Status
          value={"Paid"}
          borderColor="#749BFF"
          textColor="#749BFF"
          fillColor="#EBF0FF"
        />
      );
    } else {
      return (
        <Status
          value={"Unpaid"}
          borderColor="#FF6A6A"
          textColor="#FF6A6A"
          fillColor="#FFF6F6"
        />
      );
    }
  }

  function renderSLAPembayaran(param) {
    if (parseInt(param) > 4) {
      return (
        <Typography style={{ color: "#65D170", textAlign: "center" }}>
          {param}
        </Typography>
      );
    } else {
      return (
        <Typography style={{ color: "#FF6A6A", textAlign: "center" }}>
          {param}
        </Typography>
      );
    }
  }

  function renderSLAPekerjaan(param) {
    if ( parseInt(param) >= 14) {
      return (
        <div style={{ display: "flex" }}>
          <Typography
            style={{ color: "#FF6A6A", textAlign: "center", marginRight: 5 }}
          >
            {param}
          </Typography>
          <Excalamation />
        </div>
      );
    }else{
      return (
        <div style={{ display: "flex" }}>
        <Typography>
          {param}
        </Typography>
        </div>
      );
    }
  }

  function renderSLAImplementation(param) {
    if (parseInt(param) > 14) {
      return (
        <div style={{ display: "flex" }}>
          <Typography
            style={{ color: "#FF6A6A", textAlign: "center", width: "75px" }}
          >
            {param} Days
          </Typography>
          <Excalamation />
        </div>
      );
    } else {
      return (
        <Typography style={{ color: "#65D170", textAlign: "center" }}>
          {param} Days
        </Typography>
      );
    }
  }

  function renderSLAVendor(param) {
    if (parseInt(param) > 14) {
      return (
        <div style={{ display: "flex" }}>
          <Typography
            style={{ color: "#FF6A6A", textAlign: "center", width: "75px" }}
          >
            {param}
          </Typography>
          <Excalamation />
        </div>
      );
    } else {
      return (
        <Typography style={{ color: "#65D170", textAlign: "center" }}>
          {param}
        </Typography>
      );
    }
  }

  function renderStatusMedical(param) {
    if (param === "Complete") {
      return (
        <Status
          value={param}
          borderColor="#65D170"
          textColor="#65D170"
          fillColor="#D9FFDD"
        />
      );
    } else {
      return (
        <Status
          value={param}
          borderColor="background: rgba(255, 122, 118, 1)"
          textColor="rgba(255, 122, 118, 1)"
          fillColor="rgba(255, 233, 233, 1)"
        />
      );
    }
  }

  function IssueMedical(props) {
    const classes = useStyles();
    return (
      <Typography
        style={{
          textAlign: "left",
          width: "100%",
          paddingLeft: 10,
          paddingRight: 10,
          margin: "auto",
        }}
        className={classes.value}
      >
        {props.value}
      </Typography>
    );
  }

  function renderStatusProcurement(param) {
    if (param === "1") {
      return (
        <Status
          value="Waiting to Approve"
          borderColor="#88ADFF"
          textColor="#88ADFF"
          fillColor="#EFF4FF"
        />
      );
    } else if (param === "2") {
      return (
        <Status
          value="Renegotiate"
          borderColor="#FFB443"
          textColor="#FFB443"
          fillColor="#FFF9F0"
        />
      );
    } else if (param === "3") {
      return (
        <Status
          value="Reject"
          borderColor="#FF7A76"
          textColor="#FF7A76"
          fillColor="#FFE9E9"
        />
      );
    } else if (param === "4") {
      return (
        <Status
          value="Approve"
          borderColor="#65D170"
          textColor="#65D170"
          fillColor="#D9FFDD"
        />
      );
    }
  }

  function renderSlaStatusProcurement(param) {
    if (param == "1 Days Left" || param == "2 Days Left") {
      return (
        <Status
          value={param + " Days Left"}
          borderColor="#FFFFFF"
          textColor="#DC241F"
        />
      );
    } else {
      return (
        <Status
          value={param + " Days Left"}
          borderColor="#FFFFFF"
          textColor="#2B2F3C"
        />
      );
    }
  }

  function renderStatusModel(param) {
    if (param === "Need Review") {
      return (
        <Status
          value={param}
          borderColor="#FFB443"
          textColor="#FFB443"
          fillColor="#FFF9F0"
        />
      );
    } else if (param === "Reviewed" || param === "OK") {
      return (
        <Status
          value={param}
          borderColor="#65D170"
          textColor="#65D170"
          fillColor="#D9FFDD"
        />
      );
    } else if (param === "Not Review") {
      return (
        <Status
          value={param}
          borderColor="#FF7A76"
          textColor="#FF7A76"
          fillColor="#FFE9E9"
        />
      );
    } else {
      return (
        <center>
          <p>-</p>
        </center>
      );
    }
  }

  function renderStatusSubmission(param) {
    if (param === "2") {
      return (
        <Status
          value="Completed"
          borderColor="#65D170"
          textColor="#65D170"
          fillColor="#D9FFDD"
        />
      );
    } else if (param === "3") {
      return (
        <Status
          value="On Going"
          borderColor="#88ADFF"
          textColor="#88ADFF"
          fillColor="#EFF4FF"
        />
      );
    } else if (param === "1") {
      return (
        <Status
          value="Incompleted"
          borderColor="#FFB443"
          textColor="#FFB443"
          fillColor="#FFF9F0"
        />
      );
    } else if (param === "4") {
      return (
        <Status
          value="Late"
          borderColor="#FF7A76"
          textColor="#FF7A76"
          fillColor="#FFE9E9"
        />
      );
    } else {
      return <center>-</center>;
    }
  }

  function renderTrendData(param) {
    if (param === "up") {
      return (
        <center>
          <TrendUp />
        </center>
      );
    } else if (param === "down") {
      return (
        <center>
          <TrendDown />
        </center>
      );
    } else {
      return (
        <center>
          <p>-</p>
        </center>
      );
    }
  }

  function ModalAction(props) {
    const classes = useStyles();
    const actionObj = props.value;

    return (
      <Box>
        <Box
          style={{
            textAlign: "center",
            width: "max-content",
            paddingLeft: 10,
            paddingRight: 10,
            margin: "auto",
          }}
        >
          <Typography className={classes.value}>
            {actionObj?.map((item, i) => {
              return (
                <Link
                  style={{
                    color: item.isDisable ? "gray" : "#DC241F",
                    textDecoration: "none",
                  }}
                  onClick={() => {
                    if (!item.isDisable) {
                      item.funct(item.id, item.data, item.status);
                    }
                  }}
                  key={i}
                >
                  {item.name} &nbsp;
                </Link>
              );
            })}
          </Typography>
        </Box>
      </Box>
    );
  }

  function ModalActionRBB(props) {
    const classes = useStyles();
    const actionObj = props.value;
    // const {isDisable} = props;
    // console.log(isDisable);

    return (
      <Box>
        <Box
          style={{
            textAlign: "center",
            width: "max-content",
            paddingLeft: 10,
            paddingRight: 10,
            margin: "auto",
          }}
        >
          <Typography className={classes.value}>
            {actionObj.map((item, i) => {
              return (
                <Link
                  key={i}
                  style={{
                    color: item.isDisable ? "#BCC8E7" : "#DC241F",
                    textDecoration: "none",
                  }}
                  onClick={(event) => {
                    // console.log(item);
                    // console.log(event);
                    event.preventDefault();
                    if (!item.isDisable) {
                      item.funct(item);
                    }
                  }}
                >
                  {item.name} &nbsp;
                </Link>
              );
            })}
          </Typography>
        </Box>
      </Box>
    );
  }

  function MenuThree(props) {
    const classes = useStyles();
    const obj = props.value;
    // console.log("===> MENU MORE OBJ" + JSON.stringify(obj));
    // const actionObject = obj[Object.keys(obj)[0]];
    const actionObject = obj;

    const ITEM_HEIGHT = 48;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    function renderIconMenu(type) {
      if (type === "detail") {
        return <ArrowRight height={16} width={16} />;
      } else if (type === "edit") {
        return <EditIcon height={16} width={16} />;
      } else if (type === "acknowledge") {
        return <ApprIcon height={16} width={16} />;
      } else if (type === "create") {
        return <Edit2 height={16} width={16} />;
      } else {
        return <ArrowRight height={16} width={16} />;
      }
    }

    return (
      <div>
        <Typography
          style={{
            fontSize: 13,
            color: "#DC241F",
            textAlign: "center",
            cursor: "pointer",
          }}
          onClick={handleClick}
        >
          Action
        </Typography>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          keepMounted
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: "20ch",
            },
          }}
        >
          {actionObject.map((item, i) => {
            return (
              <MenuItem
                onClick={() => {
                  item.handler[0](props.value);
                }}
                className={classes.menuMoreItem}
              >
                <Typography style={{ fontSize: 13 }}>{item.name[0]}</Typography>
                <div>{renderIconMenu(item.type[0])}</div>
              </MenuItem>
            );
          })}
          {actionObject.map((item, i) => {
            return (
              <MenuItem
                onClick={() => {
                  item.handler[1]();
                }}
                className={classes.menuMoreItem}
              >
                <Typography style={{ fontSize: 13 }}>{item.name[1]}</Typography>
                <div>{renderIconMenu(item.type[1])}</div>
              </MenuItem>
            );
          })}
          {actionObject.map((item, i) => {
            return (
              <MenuItem
                onClick={() => {
                  item.handler[2](props.value);
                }}
                className={classes.menuMoreItem}
              >
                <Typography style={{ fontSize: 13 }}>{item.name[2]}</Typography>
                <div>{renderIconMenu(item.type[2])}</div>
              </MenuItem>
            );
          })}
        </Menu>
      </div>
    );
  }

  function MenuFourth(props) {
    const classes = useStyles();
    const obj = props.value;
    // console.log("===> MENU MORE OBJ MenuFourth" + JSON.stringify(obj));
    // const actionObject = obj[Object.keys(obj)[0]];
    const actionObject = obj;

    const ITEM_HEIGHT = 48;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    function renderIconMenu(type) {
      if (type === "detail") {
        return <ArrowRight height={16} width={16} />;
      } else if (type === "edit") {
        return <EditIcon height={16} width={16} />;
      } else if (type === "acknowledge") {
        return <ApprIcon height={16} width={16} />;
      } else if (type === "create") {
        return <Edit2 height={16} width={16} />;
      } else if (type === "file") {
        return <File height={16} width={16} />;
      } else {
        return <ArrowRight height={16} width={16} />;
      }
    }

    return (
      <div>
        <Typography
          style={{
            fontSize: 13,
            color: "#DC241F",
            textAlign: "center",
            cursor: "pointer",
          }}
          onClick={handleClick}
        >
          Action
          <span
            style={{
              position: "relative",
              right: 0,
              backgroundColor: "red",
              padding: "2px 5px 2px 5px",
              color: "white",
              fontWeight: 600,
              fontSize: 10,
              borderRadius: 25,
              marginLeft: 5,
            }}
          >
            {actionObject[0].remarkCount}
          </span>
        </Typography>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          keepMounted
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: "20ch",
            },
          }}
        >
          {actionObject.map((item, i) => {
            return (
              <MenuItem
                onClick={() => {
                  item.handler[0](props.value);
                }}
                className={classes.menuMoreItem}
              >
                <Typography style={{ fontSize: 13 }}>{item.name[0]}</Typography>
                <div>{renderIconMenu(item.type[0])}</div>
              </MenuItem>
            );
          })}
          {actionObject.map((item, i) => {
            return (
              <MenuItem
                onClick={() => {
                  item.handler[1](props.value);
                }}
                className={classes.menuMoreItem}
              >
                <Typography style={{ fontSize: 13 }}>{item.name[1]}</Typography>
                <div>{renderIconMenu(item.type[1])}</div>
              </MenuItem>
            );
          })}
          {actionObject.map((item, i) => {
            return (
              <MenuItem
                onClick={() => {
                  item.handler[2](props.value);
                }}
                className={classes.menuMoreItem}
              >
                <Typography style={{ fontSize: 13 }}>{item.name[2]}</Typography>
                <div>{renderIconMenu(item.type[2])}</div>
              </MenuItem>
            );
          })}
          {actionObject.map((item, i) => {
            return (
              <MenuItem
                onClick={() => {
                  item.handler[3](props.value);
                }}
                className={classes.menuMoreItem}
              >
                <Typography style={{ fontSize: 13 }}>{item.name[3]}</Typography>
                <div>{renderIconMenu(item.type[3])}</div>
              </MenuItem>
            );
          })}
        </Menu>
      </div>
    );
  }

  function MenuFifth(props) {
    const classes = useStyles();
    const obj = props.value;
    // console.log("===> MENU MORE OBJ" + JSON.stringify(obj));
    // const actionObject = obj[Object.keys(obj)[0]];
    const actionObject = obj;

    const ITEM_HEIGHT = 48;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    function renderIconMenu(type) {
      if (type === "detail") {
        return <ArrowRight height={16} width={16} />;
      } else if (type === "edit") {
        return <EditIcon height={16} width={16} />;
      } else if (type === "acknowledge") {
        return <ApprIcon height={16} width={16} />;
      } else if (type === "create") {
        return <Edit2 height={16} width={16} />;
      } else if (type === "file") {
        return <File height={16} width={16} />;
      } else if (type === "eye") {
        return <Eye height={16} width={16} />;
      } else {
        return <ArrowRight height={16} width={16} />;
      }
    }

    return (
      <div>
        <Typography
          style={{
            fontSize: 13,
            color: "#DC241F",
            textAlign: "center",
            cursor: "pointer",
          }}
          onClick={handleClick}
        >
          Action
          <span
            style={{
              position: "relative",
              right: 0,
              backgroundColor: "red",
              padding: "2px 5px 2px 5px",
              color: "white",
              fontWeight: 600,
              fontSize: 10,
              borderRadius: 25,
              marginLeft: 5,
            }}
          >
            {actionObject[0].remarkCount}
          </span>
        </Typography>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          keepMounted
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: "20ch",
            },
          }}
        >
          {actionObject.map((item, i) => {
            return (
              <MenuItem
                onClick={() => {
                  item.handler[0](props.value);
                }}
                className={classes.menuMoreItem}
              >
                <Typography style={{ fontSize: 13 }}>{item.name[0]}</Typography>
                <div>{renderIconMenu(item.type[0])}</div>
              </MenuItem>
            );
          })}
          {actionObject.map((item, i) => {
            return (
              <MenuItem
                onClick={() => {
                  item.handler[1](props.value);
                }}
                className={classes.menuMoreItem}
              >
                <Typography style={{ fontSize: 13 }}>{item.name[1]}</Typography>
                <div>{renderIconMenu(item.type[1])}</div>
              </MenuItem>
            );
          })}
          {actionObject.map((item, i) => {
            return (
              <MenuItem
                onClick={() => {
                  item.handler[2](props.value);
                }}
                className={classes.menuMoreItem}
              >
                <Typography style={{ fontSize: 13 }}>{item.name[2]}</Typography>
                <div>{renderIconMenu(item.type[2])}</div>
              </MenuItem>
            );
          })}
          {actionObject.map((item, i) => {
            return (
              <MenuItem
                onClick={() => {
                  item.handler[3](props.value);
                }}
                className={classes.menuMoreItem}
              >
                <Typography style={{ fontSize: 13 }}>{item.name[3]}</Typography>
                <div>{renderIconMenu(item.type[3])}</div>
              </MenuItem>
            );
          })}
          {actionObject.map((item, i) => {
            return (
              <MenuItem
                onClick={() => {
                  item.handler[4](props.value);
                }}
                className={classes.menuMoreItem}
              >
                <Typography style={{ fontSize: 13 }}>{item.name[4]}</Typography>
                <div>{renderIconMenu(item.type[4])}</div>
              </MenuItem>
            );
          })}
        </Menu>
      </div>
    );
  }

  function renderstatusRbbImplementation(param) {
    if (param === "0") {
      return (
        <Status
          value="RBB Implementation"
          borderColor="#749BFF"
          textColor="#749BFF"
          fillColor="#EBF0FF"
        />
      );
    } else if (param === "1") {
      return (
        <Status
          value="Profiling 1"
          borderColor="#749BFF"
          textColor="#749BFF"
          fillColor="#EBF0FF"
        />
      );
    } else if (param === "2") {
      return (
        <Status
          value="Profiling 2"
          borderColor="#749BFF"
          textColor="#749BFF"
          fillColor="#EBF0FF"
        />
      );
    } else if (param === "3") {
      return (
        <Status
          value="Negotiation"
          borderColor="#749BFF"
          textColor="#749BFF"
          fillColor="#EBF0FF"
        />
      );
    } else if (param === "4") {
      return (
        <Status
          value="Procurement"
          borderColor="#749BFF"
          textColor="#749BFF"
          fillColor="#EBF0FF"
        />
      );
    } else if (param === "5") {
      return (
        <Status
          value="Approval"
          borderColor="#749BFF"
          textColor="#749BFF"
          fillColor="#EBF0FF"
        />
      );
    } else if (param === "6") {
      return (
        <Status
          value="Submission"
          borderColor="#749BFF"
          textColor="#749BFF"
          fillColor="#EBF0FF"
        />
      );
    } else if (param === "6s") {
      return (
        <Status
          value="Approved"
          borderColor="#749BFF"
          textColor="#749BFF"
          fillColor="#EBF0FF"
        />
      );
    } else if (param === "7") {
      return (
        <Status
          value="Konfirmasi Perpanjangan"
          borderColor="#749BFF"
          textColor="#749BFF"
          fillColor="#EBF0FF"
        />
      );
    } else if (param === "8") {
      return (
        <Status
          value="Konfirmasi Termin"
          borderColor="#749BFF"
          textColor="#749BFF"
          fillColor="#EBF0FF"
        />
      );
    } else if (param === "9") {
      return (
        <Status
          value="Izin / Jadwal penarikan"
          borderColor="#749BFF"
          textColor="#749BFF"
          fillColor="#EBF0FF"
        />
      );
    } else if (param === "10") {
      return (
        <Status
          value="Terminated"
          borderColor="#749BFF"
          textColor="#749BFF"
          fillColor="#EBF0FF"
        />
      );
    } else if (param === "11") {
      return (
        <Status
          value="Replaced"
          borderColor="#749BFF"
          textColor="#749BFF"
          fillColor="#EBF0FF"
        />
      );
    } else if (param === "12") {
      return (
        <Status
          value="Implementation"
          borderColor="#749BFF"
          textColor="#749BFF"
          fillColor="#EBF0FF"
        />
      );
    } else if (param === "13") {
      return (
        <Status
          value="Renewal"
          borderColor="#749BFF"
          textColor="#749BFF"
          fillColor="#EBF0FF"
        />
      );
    } else if (param === "14") {
      return (
        <Status
          value="Document & Legality"
          borderColor="#749BFF"
          textColor="#749BFF"
          fillColor="#EBF0FF"
        />
      );
    } else if (param === "99") {
      return (
        <Status
          value="Approved"
          borderColor="#749BFF"
          textColor="#749BFF"
          fillColor="#EBF0FF"
        />
      );
    } else {
      return <Typography style={{ textAlign: "center" }}>-</Typography>;
    }
  }

  function renderLastStatus(param) {
    if (param === "1") {
      return (
        <Status
          value="Negotiation"
          borderColor="#88ADFF"
          textColor="#88ADFF"
          fillColor="#EFF4FF"
        />
      );
    } else if (param === "2") {
      return (
        <Status
          value="Procurement"
          borderColor="#88ADFF"
          textColor="#88ADFF"
          fillColor="#EFF4FF"
        />
      );
    } else if (param === "3") {
      return (
        <Status
          value="Approved"
          borderColor="#88ADFF"
          textColor="#88ADFF"
          fillColor="#EFF4FF"
        />
      );
    } else if (param === "4") {
      return (
        <Status
          value="Submission"
          borderColor="#88ADFF"
          textColor="#88ADFF"
          fillColor="#EFF4FF"
        />
      );
    } else if (param === "5") {
      return (
        <Status
          value="Implementation"
          borderColor="#88ADFF"
          textColor="#88ADFF"
          fillColor="#EFF4FF"
        />
      );
    } else if (param === "6") {
      return (
        <Status
          value="Waiting Approval"
          borderColor="#88ADFF"
          textColor="#88ADFF"
          fillColor="#EFF4FF"
        />
      );
    } else {
      return (
        <Status
          value="-"
          borderColor="#DC241F"
          textColor="#FF7774"
          fillColor="#FFBAB9"
        />
      );
    }
  }

  function renderExpireStatus(param) {
    if (param === 1) {
      return (
        <Status
          value="1 Bulan"
          borderColor="#FFB443"
          textColor="#FFB443"
          fillColor="#FFF9F0"
        />
      );
    } else if (param === 2) {
      return (
        <Status
          value="2 Bulan"
          borderColor="#65D170"
          textColor="#65D170"
          fillColor="#D9FFDD"
        />
      );
    } else {
      if (param !== "-") {
        var newParam = param + " Bulan";
        if (param < 0) {
          return (
            <Status
              value={newParam}
              borderColor="#DC241F"
              textColor="#DC241F"
              fillColor="#FFF5F4"
            />
          );
        }
        return (
          <Status
            value={newParam}
            borderColor="#65D170"
            textColor="#65D170"
            fillColor="#D9FFDD"
          />
        );
      }
      return <Typography style={{ textAlign: "center" }}>-</Typography>;
    }
  }

  function renderStatusLegality(param) {
    if (param === "Complete") {
      return (
        <Status
          value={param}
          borderColor="#65D170"
          textColor="#65D170"
          fillColor="#D9FFDD"
        />
      );
    } else if (param === "Acknowledge") {
      return (
        <Status
          value={param}
          borderColor="#749BFF"
          textColor="#749BFF"
          fillColor="#EBF0FF"
        />
      );
    } else {
      return (
        <Status
          value={param}
          borderColor="#FFB443"
          textColor="#FFB443"
          fillColor="#FFF9F0"
        />
      );
    }
  }

  function renderProcurementProgress(param) {
    if (param === "1") {
      return (
        <Status
          value="Acknowledge"
          borderColor="#CB88FF"
          textColor="#CB88FF"
          fillColor="#F3E3FF"
        />
      );
    } else if (param === "2") {
      return (
        <Status
          value="Renego"
          borderColor="#FF7A76"
          textColor="#FF7A76"
          fillColor="#FFE9E9"
        />
      );
    } else if (param === "3") {
      return (
        <Status
          value="Approved"
          borderColor="#65D170"
          textColor="#65D170"
          fillColor="#D9FFDD"
        />
      );
    }
  }

  function renderProgressProgress(param) {
    // if (param === "profiling1") {
    //   return (
    //     <Status
    //       value="Profiling 1"
    //       borderColor="#FF6A6A"
    //       textColor="#FF6A6A"
    //       fillColor="#FFF7F7"
    //     />
    //   );
    // } else if (param === "profiling2") {
    //   return (
    //     <Status
    //       value="Profiling 2"
    //       borderColor="#FFB443"
    //       textColor="#FFB443"
    //       fillColor="#FFF9F0"
    //     />
    //   );
    // } else if (param === "negotiation") {
    //   return (
    //     <Status
    //       value="Negotiation"
    //       borderColor="#CB88FF"
    //       textColor="#CB88FF"
    //       fillColor="#F3E3FF"
    //     />
    //   );
    // } else if (param === "procurement") {
    //   return (
    //     <Status
    //       value="Procurement"
    //       borderColor="#749BFF"
    //       textColor="#749BFF"
    //       fillColor="#EBF0FF"
    //     />
    //   );
    // } else if (param === "approval") {
    //   return (
    //     <Status
    //       value="Approval"
    //       borderColor="#65D170"
    //       textColor="#65D170"
    //       fillColor="#DEFFE1"
    //     />
    //   );
    // };
    return (
      <Status
        value={param}
        borderColor="#749BFF"
        textColor="#749BFF"
        fillColor="#EBF0FF"
      />
    );
  }

  function renderDevelopStatus(param) {
    if (param === "Success") {
      return (
        <center>
          <Success style={{ width: 20, height: 20 }} />
        </center>
      );
    } else if (param === "Failed") {
      return (
        <center>
          <Failed />
        </center>
      );
    }
  }

  function renderStatusUser(param) {
    if (param === "1") {
      return (
        <Status
          value="Active"
          borderColor="#65D170"
          textColor="#65D170"
          fillColor="#D9FFDD"
        />
      );
    } else if (param === "2") {
      return (
        <Status
          value="Inactive"
          borderColor="#FF7A76"
          textColor="#FF7A76"
          fillColor="#FFE9E9"
        />
      );
    }
  }

  function renderStatusKebersihan(param) {
    if (param === "Done") {
      return (
        <Status
          value={param}
          borderColor="#65D170"
          textColor="#65D170"
          fillColor="#DEFFE1"
        />
      );
    } else if (param === "Open") {
      return (
        <Status
          value={param}
          borderColor="#749BFF"
          textColor="#749BFF"
          fillColor="#EBF0FF"
        />
      );
    } else if (param === "Delay") {
      return (
        <Status
          value={param}
          borderColor="#FF6A6A"
          textColor="#FF6A6A"
          fillColor="#FFF6F6"
        />
      );
    } else {
      return (
        <Status
          value={param}
          borderColor="#FFB443"
          textColor="#FFB443"
          fillColor="#FFF9F0"
        />
      );
    }
  }
  function renderStatusImplementation(param){
    if(param === "ToDo"){
      return(
        <Status value="Todo" borderColor="#FF7A76" textColor="#FF7A76" fillColor="FFE9E9"/>
      )
    }else if(param === "Doing"){
      return (
        <Status value="Doing" borderColor="#749BFF" textColor="#749BFF" fillColor="#DEFFE1"/>
      )
    }else if(param === "Done"){
      return(
        <Status value="Done" borderColor="#65D170" textColor="#65D170" fillColor="#D9FFDD"/>
      )
    }else{
      return(
        <Status value="Doing" borderColor="#749BFF" textColor="#749BFF" fillColor="#DEFFE1"/>
      )
    }
  }

  function renderStatusObjectPajak(param){
    if(param === 1){
      return(
        <Status value="Done" borderColor="#65D170" textColor="#65D170" fillColor="#D9FFDD"/>
      )
    }else if(param === 5){
      return(
        <Status value="Open" borderColor="#CB88FF" textColor="#CB88FF" fillColor="#F3E3FF"/>
      )
    }else if(param === 2){
      return(
        <Status value="Assign To Vendor" borderColor="#749BFF" textColor="#749BFF" fillColor="#EBF0FF"/>
      )  
    }else if(param === 3){
      return(
        <Status value="On Progress" borderColor="#FFB443" textColor="#FFB443" fillColor="#FFF9F0"/>
      )      
    }
    else if(param === 4){
      return(
        <Status value="Overdue" borderColor="#13BED6" textColor="#13BED6" fillColor="#F7FEFF"/>
      ) 
    }
    else{
       return(
        <Status value="Tidak Bisa Diproses" borderColor="#FF6A6A" textColor="#FF6A6A" fillColor="#FFF7F7"/>
      ) 
    }
  }

  function renderSwitchOption(param) {
    switch (param) {
      case "progress":
        return renderProgresStyle(value);
      case "priority":
        return renderPriorityStyle(value);
      case "status":
        return renderStatusStyle(value);
      case "action":
        return <Action value={value} />;
      case "actionref":
        return <ActionRef value={value} />;
      case "string":
        return <String value={value} align={align} />;
      case "stringWithRandom":
        return <StringWithRandom value={value} />;
      case "actionfunc":
        return <ActionFunc value={value} />;
      case "menu":
        return <MenuMore value={value} />;
      case "menuNew":
        return <ChildMenuMore value={value} />;
      case "statusMedical":
        return renderStatusMedical(value);
      case "issueMedical":
        return <IssueMedical value={value} />;
      case "url":
        return <UrlAction value={value} />;
      case "status_string":
        return <StatusString value={value} />;
      case "status_approval":
        return renderStatusApproval(value);
      case "statusApproval":
        return <ChildStatusApproval status={value} />;
      case "statusFileApproval":
        return <ChildFileApproveStatus status={value} />;
      case "status_nego":
        return renderStatusNego(value);
      case "harga_nego":
        return renderHargaNego(value);
      case "status_procurement":
        return renderStatusProcurement(value);
      case "sla_status_procurement":
        return renderSlaStatusProcurement(value);
      case "statusModel":
        return renderStatusModel(value);
      case "statusSubmission":
        return renderStatusSubmission(value);
      case "trendData":
        return renderTrendData(value);
      case "idrCurrency":
        return <String value={useRupiahConverterSecondary(value)} />;
      case "forecast":
        return <ForecastTable value={value} />;
      case "modal":
        return <ModalAction value={value} />;
      case "modal_RBB":
        return <ModalActionRBB value={value} />;
      case "approver":
        return <Approver value={value} />;
      case "reasonAuthor":
        return <ReasonAuthor value={value} />;
      case "approverNew":
        return <ChildApprover approver={value} />;
      case "approverImple":
        return <ChildApproverImple approver={value} />;
      case "singleApprover":
        return <ChildSingleApprover approver={value} />;
      case "child":
        return value;
      case "file_budget_tracking":
        return <FileBudgetTracking value={value} />;
      case "remark_budget_tracking":
        return RemarkBudgetTracking(value);
      case "approve_budget_tracking":
        return ApprovalBudgetTracking(value);
      case "menu_three":
        return <MenuThree value={value} />;
      case "menu_four":
        return <MenuFourth value={value} />;
      case "menu_fifth":
        return <MenuFifth value={value} />;
      case "statusRbb_Implementation":
        return renderstatusRbbImplementation(value);
      case "status_last":
        return renderLastStatus(value);
      case "status_expire":
        return renderExpireStatus(value);
      case "status_legality":
        return renderStatusLegality(value);
      case "menu_two":
      case "menu_twouser":
      case "menu_tworole":
        return <MenuTwo value={value} />;
      case "progress_procurement":
        return renderProcurementProgress(value);
      case "progress_progress":
        return renderProgressProgress(value);
      case "developStatus":
        return renderDevelopStatus(value);
      case "status_user":
        return renderStatusUser(value);
      case "isChecked":
        return <ChildIsChecked value={value} />;
      case "cardStatus":
        return <ChildCardStatus value={value} />;
      case "status_kebersihan":
        return renderStatusKebersihan(value);
      case "status_paid":
        return renderStatusPaid(value);
      case "sla_pembayaran":
        return renderSLAPembayaran(value);
      case "sla_pekerjaan":
        return renderSLAPekerjaan(value);
      case "sla_implementation":
        return renderSLAImplementation(value);
      case "sla_Vendor":
        return renderSLAVendor(value);
      case "statusImplementation":
        return renderStatusImplementation(value);
      case "object_pajak":
        return renderStatusObjectPajak(value);
      case "limit20":
        return <ChildStringLimit value={value} />;
      case "limit20Left":
        return <ChildStringLimit align="left" value={value} />;
      case "statusSchedule":
        return <ChildScheduleStatus value={value} />;
      case "statusTicket":
        return <ChildTicketStatus value={value} />;
      case "statusTicketNum":
        return <ChildStatusTicketByNumber value={value} />;
      case "statusResult":
        return <ChildResultStatus value={value} />;
      default:
        return <String value={value} />;
    }
  }

  return <div>{renderSwitchOption(cellType)}</div>;
};

index.propTypes = {
  // value: PropTypes.string,
  cellType: PropTypes.string,
};

index.defaultProps = {
  value: "Value",
  cellType: "string",
};

export default index;
export { Status };
