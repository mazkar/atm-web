/* eslint-disable no-nested-ternary */
/* eslint-disable no-alert */
import React, { useState, useEffect } from "react";
import {
  Avatar,
  Divider,
  Grid,
  Paper,
  Table,
  TableCell,
  TableRow,
  Typography,
  Link,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import { ReactComponent as FileIcon } from "../../../../../assets/icons/general/paperclip.svg";
import ChkyButtons from "../../../../../components/chky/ChkyButtons";
import getMinioFile from "../../../../../helpers/getMinioFile";
import LoadingView from "../../../../../components/Loading/LoadingView";

const useStyles = makeStyles({
  root: { padding: 20, borderRadius: 10, minHeight: 410, position: "relative" },
  tableRow: {
    "& .MuiTableCell-sizeSmall": { padding: "2px 0px" },
  },
  tableCell: {
    borderBottom: "unset",
    fontSize: 12,
  },
  tableCellTot: {
    borderBottom: "unset",
    fontSize: 13,
    fontWeight: 500,
  },
  textTitle: {
    fontFamily: "Barlow",
    fontSize: 15,
    fontWeight: 600,
    borderBottom: "unset",
  },
  textBody: {
    fontFamily: "Barlow",
    fontWeight: 400,
    fontSize: 12,
    borderBottom: "unset",
  },
  textTotal: {
    fontFamily: "Barlow",
    fontWeight: 700,
    fontSize: 13,
    borderBottom: "unset",
  },
  documentLink: {
    backgroundColor: "unset",
    padding: 0,
    "& .MuiButton-root": {
      padding: 0,
      textTransform: "none",
      backgroundColor: "unset",
    },
    "& .MuiButton-root:hover": { opacity: 0.6, backgroundColor: "unset" },
  },
});

const RenderOfferingFile = ({ filePath }) => {
  const [dataOffering, setDataOffering] = useState(null);
  function limitString(string, count) {
    const result =
      string.slice(0, count) + (string.length > count ? "..." : "");
    return result;
  }
  useEffect(() => {
    try {
      getMinioFile(filePath).then((result) => {
        console.log(">>>> try getMinio Offering ", JSON.stringify(result));
        setDataOffering(result);
      });
    } catch (err) {
      console.log(">>>> Error try getMinio", err);
    }
  }, []);
  useEffect(() => {
    console.log(">>>> dataOffering: ", dataOffering);
  }, [dataOffering]);
  return (
    <Link
      href={dataOffering === null ? "#" : dataOffering.fileUrl}
      target="_blank"
      style={{
        textDecoration: "none",
        fontSize: 13,
        color: "#DC241F",
        fontWeight: 400,
      }}
    >
      {dataOffering === null ? "N/A" : limitString(dataOffering.fileName, 50)}
    </Link>
  );
};
RenderOfferingFile.propTypes = {
  filePath: PropTypes.string.isRequired,
};

const idrCurrencyFormat = (value, delimiter) => {
  return `Rp ${`${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, delimiter)}`;
};

function isEmpty(obj) {
  for (const x in obj) {
    if (obj.hasOwnProperty(x)) return false;
  }
  return true;
}

function Approver(props) {
  const { approver } = props;
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

  function getInitialName(name) {
    let initials = name.match(/\b\w/g) || [];
    initials = (
      (initials.shift() || "") + (initials.pop() || "")
    ).toUpperCase();
    return initials;
  }

  return (
    <div style={{ display: "flex" }}>
      {approver.map((item) => {
        if (item !== null) {
          return (
            <Avatar
              style={{
                backgroundColor: renderBackColor(getInitialName(item)),
                width: 42,
                height: 42,
                margin: 2.5,
                fontSize: 18,
              }}
            >
              {getInitialName(item)}
            </Avatar>
          );
        }
      })}
    </div>
  );
}

Approver.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  approver: PropTypes.array,
};

Approver.defaultProps = {
  approver: ["DH", "TS", "BA", "Y", "L"],
};
function DetailInfoApprove(props) {
  const classes = useStyles();
  const {
    dataApproval,
    rejectionBtnHandler,
    renegotiateBtnHandler,
    approveBtnHandler,
    isLoadData,
    isWithAction,
  } = props;
  const [totalBiayaRent, setTotalBiayaRent] = useState(0);
  const [minOffering, setMinOffering] = useState(0);
  const [averageOffering, setAverageOffering] = useState(0);
  const [maxOffering, setMaxOffering] = useState(0);

  useEffect(() => {
    function handleAddTotalBiaya() {
      let biayaTotal = 0;
      dataApproval.detailRent.map((item) => {
        biayaTotal += item.yearlyRentCost;
      });
      setTotalBiayaRent(biayaTotal);
      setMinOffering(dataApproval.informasiApproval.minOffering);
      setAverageOffering(dataApproval.informasiApproval.averageOffering);
      setMaxOffering(dataApproval.informasiApproval.maxOffering);
    }
    if (!isEmpty(dataApproval)) {
      handleAddTotalBiaya();
    }
  }, [dataApproval]);

  return (
    <Paper className={classes.root}>
      {isLoadData ? (
        <LoadingView maxheight="100%" />
      ) : (
        <div>
          
          <Grid
            container
            spacing={1}
            direction="column"
            style={{ marginTop: 0 }}
          >
            <Grid item>
              <Typography style={{ fontSize: 15, fontWeight: 600 }}>
                Approved By
              </Typography>
            </Grid>
            <Grid item>
              {isEmpty(dataApproval) ? (
                "N/A"
              ) : dataApproval.detail.daNameList === null ? (
                "N/A"
              ) : (
                <Approver approver={dataApproval.detail.daNameList} />
              )}
            </Grid>
          </Grid>
          { isWithAction &&
            <Grid container justify="space-between" style={{ marginTop: 230 }}>
              <Grid item>
                <ChkyButtons onClick={rejectionBtnHandler}>Reject</ChkyButtons>
              </Grid>
              <Grid item>
                {/* <ChkyButtons onClick={renegotiateBtnHandler} buttonType="redOutlined">Renegotiate</ChkyButtons> */}
              </Grid>
              <Grid item>
                <ChkyButtons onClick={approveBtnHandler} buttonType="greenFilled">
                  Approve
                </ChkyButtons>
              </Grid>
            </Grid>
          }

        </div>
      )}
    </Paper>
  );
}
DetailInfoApprove.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  dataApproval: PropTypes.array,
  rejectionBtnHandler: PropTypes.func,
  renegotiateBtnHandler: PropTypes.func,
  approveBtnHandler: PropTypes.func,
  isLoadData: PropTypes.bool,
  isWithAction: PropTypes.bool,
};

DetailInfoApprove.defaultProps = {
  dataApproval: [],
  rejectionBtnHandler: () => {
    alert("Button Rejection Clicked");
  },
  renegotiateBtnHandler: () => {
    alert("Button Renegotiate Clicked");
  },
  approveBtnHandler: () => {
    alert("Button Approve Clicked");
  },
  isLoadData: false,
  isWithAction: true,
};

export default DetailInfoApprove;
