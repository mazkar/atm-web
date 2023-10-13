import React, { useState, useEffect } from "react";
import MuiIconLabelButton from "../../../../../components/Button/MuiIconLabelButton";
import { useHistory, useParams } from "react-router";
import PropTypes from "prop-types";
import { ReactComponent as ArrowLeft } from "../../../../../assets/icons/siab/arrow-left.svg";
import { ReactComponent as Trash } from "../../../../../assets/icons/linear-red/trash-2.svg";
import { makeStyles } from "@material-ui/styles";
import { Grid, Typography } from "@material-ui/core";
import RightComponent from "./RightComponent";
import FromInput from "./FromInput";
import { PrimaryHard } from "../../../../../assets/theme/colors";
import { ChkyButtons } from "../../../../../components/chky";
import ConfirmDeletePopUp from "../../common/PopUp/deletePopUp";
import SuccessPopUp from "../../common/PopUp/successPopUp";
import moment from "moment";
import {
  doFetchDetailMigrasi,
  doFetchDeleteMigrasi,
} from "../../../ApiServiceImplementation";
import ModalLoader from "../../../../../components/ModalLoader";

const useStyles = makeStyles({
  backButton: {
    marginBottom: 20,
    "& .MuiButton-contained": {
      boxShadow: "none",
      backgroundColor: "transparent",
      color: "red",
    },
    "& .MuiButton-root": {
      textTransform: "capitalize",
      padding: 0,
      "& :hover": {
        backgroundColor: "#F4F7FB",
      },
      "& .MuiButton-label": {
        fontSize: 17,
        fontWeight: 500,
      },
    },
  },
});
function getInitialName(name) {
  if(name){
    let initials = name.match(/\b\w/g) || [];
    initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
    return initials;
  }return "";
}

function selectedStatus(num) {
  // console.log("+++ num", num);
  const status = parseInt(num);
  switch (status) {
    case 0:
      return "TODO";
    case 1:
      return "DOING";
    case 2:
      return "DONE";
    case 3:
      return "STRIP";
    default:
      return "TODO";
  }
}

const index = () => {
  const history = useHistory();
  const classes = useStyles();
  const [openDeletePopUp, setOpenDeletePopUp] = useState(false);
  const [openSuccesDelete, setOpenSuccesDelete] = useState(false);
  const [successLabel, setSuccessLabel] = useState("Hapus Berhasil Dilakukan");
  const { id } = useParams();
  const [successType, setSuccessType] = useState("Add");
  const [OpenSuccessPopUp, setOpenSuccessPopUp] = useState(false);
  const implementationId = new URLSearchParams(window.location.search).get(
    "implementationId"
  );
  const [dataLeft, setDataLeft] = useState({
    id: null,
    taskTitle: "",
    notesDescription: "",
    dueDate: "",
    picVendorId: "",
    requestType: "",
    locationMode: "OFF",
    modelTeam: "konvensional",
    newAtmId: "",
    newMachineType: "",
    lokasiBaru: "",
    denom: "",
    codeGfms: "",
    machineType: "",
    noRfc: "",
    noPsf: "",
    bastId: "",
    tglRfcSelesai: "",
    cimbAttachment: [],
    vendorAttachment: [],
  });
  const [dataRight, setDataRight] = useState({
    status: null,
    timeLineData: [],
    commentsData: [],
  });

  const [isLoadData, setLoadData] = useState(false);

  function loadingHandler(bool) {
    setLoadData(bool);
  }
  function handleDelete() {
    doFetchDeleteMigrasi(loadingHandler, { idParameter: id })
      .then((response) => {
        console.log("+++resp delete", response);
        if (response.responseCode === "00") {
          setSuccessLabel("Hapus Berhasil Dilakukan");
          setSuccessType("Delete");
          setOpenSuccessPopUp(true);
          setOpenDeletePopUp(false);
        }
      })
      .catch((err) => {
        console.log("Error Delete Parameter", err);
        alert(`Terjadi Kesalahan:${err}`);
      });
  }
  const onDelete = () => {
    setOpenDeletePopUp(true);
  };

  const onFixDelete = () => {
    setOpenDeletePopUp(false);
    setOpenSuccesDelete(true);
  };

  const onCloseSuccesDelete = () => {
    setOpenSuccesDelete(false);
    history.goBack();
  };

  const onClose = () => {
    setOpenDeletePopUp(false);
    console.log("close");
  };

  const handleEdit = () => {
    window.location.assign(`/implementation/task/parameter-migrasi/${id}/edit`);
  };
  useEffect(() => {
    doFetchDetailMigrasi(loadingHandler, {
      idParameter: id,
    })
      .then((response) => {
        console.log("+++ Resp Get", response);
        const resDataLeft = {
          id: response.implementationParameterMigrasiDto.id,
          implementationId:
            response.implementationParameterMigrasiDto.implementationId,
          taskTitle:
            response.implementationParameterMigrasiDto.taskTitle !== null
              ? response.implementationParameterMigrasiDto.taskTitle
              : "-",
          notesDescription:
            response.implementationParameterMigrasiDto.notesDescription !== null
              ? response.implementationParameterMigrasiDto.notesDescription
              : "-",
          dueDate:
            response.implementationParameterMigrasiDto.dueDate !== null
              ? moment
                  .unix(
                    response.implementationParameterMigrasiDto.dueDate / 1000
                  )
                  .format("DD/MM/YYYY")
              : "-",
          picVendorId:
            response.implementationParameterMigrasiDto.picVendor !== null
              ? response.implementationParameterMigrasiDto.picVendor
              : "-",
          requestType:
            response.implementationParameterMigrasiDto.requestType !== null
              ? response.implementationParameterMigrasiDto.requestType
              : "-",
          denom:
            response.implementationParameterMigrasiDto.denom !== null
              ? response.implementationParameterMigrasiDto.denom
              : "-",
          codeGfms:
            response.implementationParameterMigrasiDto.codeGfms !== null
              ? response.implementationParameterMigrasiDto.codeGfms
              : "-",
          machineType:
            response.implementationParameterMigrasiDto.machineType !== null
              ? response.implementationParameterMigrasiDto.machineType
              : "-",
          noPsf:
            response.implementationParameterMigrasiDto.noPsf !== null
              ? response.implementationParameterMigrasiDto.noPsf
              : "-",
          noRfc:
            response.implementationParameterMigrasiDto.noRfc !== null
              ? response.implementationParameterMigrasiDto.noRfc
              : "-",
          tglRfcSelesai:
            response.implementationParameterMigrasiDto.tglRfcSelesai !== null
              ? moment
                  .unix(
                    response.implementationParameterMigrasiDto.tglRfcSelesai /
                      1000
                  )
                  .format("DD/MM/YYYY")
              : "-",
          bastId:
            response.implementationParameterMigrasiDto.bastId !== null
              ? response.implementationParameterMigrasiDto.bastId
              : "-",
          locationMode:
            response.implementationParameterMigrasiDto.locationMode !== null
              ? response.implementationParameterMigrasiDto.locationMode
              : "-",
          modelTeam:
            response.implementationParameterMigrasiDto.modelTeam !== null
              ? response.implementationParameterMigrasiDto.modelTeam
              : "-",
          newAtmId:
            response.implementationParameterMigrasiDto.newAtmId !== null
              ? response.implementationParameterMigrasiDto.newAtmId
              : "-",
          newMachineType:
            response.implementationParameterMigrasiDto.newMachineType !== null
              ? response.implementationParameterMigrasiDto.newMachineType
              : "-",
          lokasiBaru:
            response.implementationParameterMigrasiDto.newLocation !== null
              ? response.implementationParameterMigrasiDto.newLocation
              : "-",
          cimbAttachment: response.cimbAttachment,
          vendorAttachment: response.vendorAttachment,
        };
        setDataLeft(resDataLeft);
        console.log(resDataLeft);

        const timeline = [];
        if (response.logHistoryChanges.length > 0) {
          response.logHistoryChanges.map((item) => {
            timeline.push({
              name: item.userName,
              initial: getInitialName(item.userName),
              message: item.message,
              date: moment.unix(item.createdDate / 1000).format("DD-MM-YYYY"),
              time: moment.unix(item.createdDate / 1000).format("HH:mm"),
            });
          });
        }
        const resDataRight = {
          status: selectedStatus(
            response.implementationParameterMigrasiDto.status
          ),
          timeLineData: timeline,
          commentsData: response.comments,
        };
        console.log(timeline);
        setDataRight(resDataRight);
        console.log(resDataRight);
      })
      .catch((err) => {
        console.log("Error Get Detail Parameter", err);
        alert(`Terjadi Kesalahan:${err}`);
      });
  }, []);
  return (
    <div style={{ padding: 30 }}>
      <div className={classes.backButton}>
        <MuiIconLabelButton
          label="Back"
          iconPosition="startIcon"
          onClick={() => history.goBack()}
          buttonIcon={<ArrowLeft />}
        />
      </div>
      <Typography
        style={{
          fontWeight: "500",
          fontSize: "36px",
          lineHeight: "43px",
          marginBottom: 20,
        }}
      >
        Task Detail
      </Typography>
      <Grid container spacing={6}>
        <FromInput data={dataLeft} />
        <RightComponent
          disableDropdown={true}
          showChatInput={false}
          showHistory={true}
          showChatHistory={true}
          data={dataRight}
        />
      </Grid>
      <Grid
        container
        justify="space-between"
        direction="row"
        style={{ marginTop: 25 }}
      >
        <div onClick={() => setOpenDeletePopUp(true)}>
          <Grid container alignItems="center">
            <Trash />
            <Typography
              style={{
                fontFamily: "Barlow",
                fontSize: 15,
                color: PrimaryHard,
                fontWeight: 600,
                marginLeft: 10,
              }}
            >
              Delete Card
            </Typography>
          </Grid>
        </div>
        <ChkyButtons
          height={38}
          btnType="redOutlined"
          buttonType="redOutlined"
          onClick={() => {
            handleEdit();
          }}
        >
          Edit
        </ChkyButtons>
      </Grid>
      <ConfirmDeletePopUp
        isOpen={openDeletePopUp}
        onClose={() => setOpenDeletePopUp(false)}
        onLeave={() => setOpenDeletePopUp(false)}
        onSubmit={() => {
          handleDelete();
        }}
      />
      <SuccessPopUp
        isOpen={OpenSuccessPopUp}
        onClose={() => {
          setOpenSuccessPopUp(false);
          history.push(`/implementation/${implementationId}`);
        }}
        label={successLabel}
        type={successType}
      />
      <ModalLoader isOpen={isLoadData} />
    </div>
  );
};
index.propTypes = {};
export default index;
