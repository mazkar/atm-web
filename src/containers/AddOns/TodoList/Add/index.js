/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable no-alert */
import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import { Avatar, Button, ButtonBase, Grid, Paper, Typography } from "@material-ui/core";
import { DatePicker } from 'antd';
import moment from 'moment';
import { ReactComponent as BackIcon } from "../../../../assets/icons/general/arrow_back_red.svg";
import { ReactComponent as UserIcon } from "../../../../assets/icons/general/user.svg";
import { ReactComponent as PlusIcon } from "../../../../assets/icons/general/plus-circle.svg";
import constansts from '../../../../helpers/constants';
import { ChkyButtons, ChkyInputSmall, ChkySelectInput } from '../../../../components';
import { getInitialName, numberFromText, todoListColors } from '../../../../helpers/todoList';
import { ReactComponent as CalendarIcon } from "../../../../assets/icons/linear-red/calendar.svg";
import { ReactComponent as PlusAddIcon } from "../../../../assets/icons/general/plus.svg";
import { ReactComponent as TrashIcon } from "../../../../assets/images/trash.svg";
import { ReactComponent as FileIcon } from "../../../../assets/icons/linear-red/paperclip.svg";
import { ReactComponent as FlagIcon } from "../../../../assets/icons/general/flag.svg";
import { ReactComponent as FlagRedIcon } from "../../../../assets/icons/general/flag-red.svg";
import { ReactComponent as FlagYellowIcon } from "../../../../assets/icons/general/flag-yellow.svg";
import { ReactComponent as FlagGreenIcon } from "../../../../assets/icons/general/flag-green.svg";
import InputSubtask from '../../../../components/InputSubtask';
import InputChecklist from '../../../../components/InputChecklist';
import AddFileTodo from '../../../../components/TodoList/AddFileTodo';
import { doUploadDocument } from '../../../Implementation/ApiServiceImplementation';
import { doGetAllUsers, doSaveAndUpdateTodoList } from '../../ApiServicesAddOns';
import ModalLoader from '../../../../components/ModalLoader';
import UsersSelectorMenu from '../../../../components/UsersSelectorMenu';
import PopupSucces from '../../../../components/PopupSucces';
import AttachedFileTodo from '../../../../components/TodoList/AttachedFileTodo';
import AddSubTask from '../../../../components/TodoList/AddSubTask';
import ChecklistSubTask from '../../../../components/TodoList/ChecklistSubTask';

const useStyles = makeStyles({
  root: {
    padding: "30px 20px 20px 30px",
  },
  backLabel: {
    fontSize: 17,
    color: constansts.color.primaryHard,
    marginLeft: 5,
    textTransform: "capitalize",
  },
  title: {
    fontFamily: "Barlow",
    fontWeight: 500,
    fontSize: 36,
    color: "#2B2F3C",
  },
  titleContainer: {
    marginBottom: 25,
  },
  contentContainer: {
    marginBottom: 25,
    borderRadius: 10,
    boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
    minHeight: 400,
    padding: 20,
  },
  avatarContainer: {
    display: "flex", 
    flexDirection: "row", 
    paddingLeft: 25,
    "& > div": {
      marginLeft: -10,  
    }
  },
  datePicker: {
    padding: "7px 10px 7px 10px",
    borderRadius: 6,
    border: "1px solid #BCC8E7",
    '& .ant-picker-input > input::placeholder': {
      color: "#BCC8E7",
      fontStyle: "italic",
      textOverflow: 'ellipsis !important',
      fontSize: 12,
    }
  },
  lable: {
    fontSize: 13,
    color: "#2B2F3C",
    fontWeight: 500,
    paddingBottom: 8
  }

});

const priorities=[
  { value: "-", name: "- Pilih Jenis Priority -" },
  { value: "2", name: "High Priority" },
  { value: "1", name: "Medium Priority" },
  { value: "0", name: "Low Priority" },
];

function disabledDate(current) {
  return current < moment().startOf("day");
}

export const renderPriority= (key)=>{
  switch (key) {
  case "2":
    return (<div style={{paddingTop: 5, paddingLeft: 6, paddingRight: 6, borderRadius: 20, border: "1px solid #FF6A6A"}}><FlagRedIcon/></div>);
  case "1":
    return (<div style={{paddingTop: 5, paddingLeft: 6, paddingRight: 6, borderRadius: 20, border: "1px solid #FFB443"}}><FlagYellowIcon/></div>);
  case "0":
    return (<div style={{paddingTop: 5, paddingLeft: 6, paddingRight: 6, borderRadius: 20, border: "1px solid #65D170"}}><FlagGreenIcon/></div>);
  
  default:
    return (<div style={{paddingTop: 5, paddingLeft: 6, paddingRight: 6, borderRadius: 20, border: "1px solid #BCC8E7"}}><FlagIcon/></div>);
  }
};
function Add() {
  const classes = useStyles();
  const history = useHistory();
  const [usersOption, setUsersOption] = useState([]);
  const [users, setUsers] = useState([]);

  const [stateRequest, setStateRequest] = useState({
    priority: "-",
    startDate: "",
    endDate: "",
    title: "",
    desc: "",
    subtask: [],
    checklist: [""],
    files: []
  });
  
  const [errorForm, setErrorForm] = useState({
    title: false,
    startDate: false,
    endDate: false,
    priority: false,
    users: false
  });

  const [isLoading, setLoading] = useState(false);  
  const [isSuccessAdd, setIsSuccessAdd] = useState(false);  
  
  const [isFetchingUsers, setIsFetchingUsers] = useState(false);  
  // HANDLER FOR STATE
  function loadingHandler(bool) {
    setLoading(bool);
  }

  const handleChangeState = (newVal, state) => {
    // console.log(`+++ ${state}: ${newVal}`);
    setStateRequest((prevValue)=>{
      return{
        ...prevValue,
        [state]: newVal
      };
    });
  };

  function handleChangeSubtask(index, keyname, newVal){
    const arr = stateRequest.subtask;
    arr[index][keyname] = newVal;
    // console.log("+++ new arr", arr);
    handleChangeState(arr, "subtask");
  }

  function handleChangeChecklist(val,index){
    const arr = stateRequest.checklist;
    arr[index] = val;
    handleChangeState(arr, "checklist");
  }

  function handleError(keyname, bool) {
    // eslint-disable-next-line default-case
    setErrorForm((prevVal) => {
      return {
        ...prevVal,
        [keyname]: bool,
      };
    });
  }

  function validateForm(){
    let errorCount = 0;

    if(stateRequest.title === ""){
      handleError('title', true);
      errorCount+= 1;
    }else{
      handleError('title', false);
    }

    if(stateRequest.startDate === ""){
      handleError('startDate', true);
      errorCount+= 1;
    }else{
      handleError('startDate', false);
    }

    if(stateRequest.endDate === ""){
      handleError('endDate', true);
      errorCount+= 1;
    }else{
      handleError('endDate', false);
    }

    if(users.length < 1 ){
      handleError('users', true);
      errorCount+= 1;
    }else{
      handleError('users', false);
    }

    if(stateRequest.priority === "" || stateRequest.priority === "-" || stateRequest.priority === null){
      handleError('priority', true);
      errorCount+= 1;
    }else{
      handleError('priority', false);
    }

    return(errorCount);
  }

  const handleSubmit = async() => {

    let errorCount = 0;
    errorCount = validateForm();
    if(errorCount > 0){
      alert('Harap lengkapi data terlebih dahulu!');
    } else {
      // HANDLE ATTACHMENT FILES
      const documentList = [];
      const doUploadDocuments = async(arr) =>{
        if(arr.length > 0){
          loadingHandler(true);
          await Promise.all(arr.map(async(item)=>{
            await doUploadDocument(item)
              .then((res) => {
              // console.log("data res", res)
                if (res.status === 200) {
                  if (res.data.responseCode === "00") {
                    documentList.push(res.data.path);
                  } else {
                    alert(res.data.responseMessage);
                  }
                }
              }).catch((err) => {
                alert(`Failed to upload file ${err}`);
                loadingHandler(false);
              });
          }));
        }
      };
      await doUploadDocuments(stateRequest.files);
      const userArr = [];
      users.map((item)=>userArr.push(item.id));
      const dataHit = {
        id: null,
        // eslint-disable-next-line radix
        priority: parseInt(stateRequest.priority),
        title: stateRequest.title,
        description: stateRequest.desc,
        taskStatus: 0,
        startDate: moment.unix(stateRequest.startDate/1000).format("YYYY-MM-DD"),
        endDate: moment.unix(stateRequest.endDate/1000).format("YYYY-MM-DD"),
        attachment: documentList,
        subTask: stateRequest.subtask,
        assignTo: userArr,
      };
      // console.log("+++ dataHit", dataHit);

      doSaveAndUpdateTodoList(loadingHandler, dataHit)
        .then((response) => {
          // console.log("+++ response", response);
          if(response){
            if (response.status === 200) {
              setIsSuccessAdd(true);
            }
          }
        }).catch((err) => {
          // console.log('Error Create New Task', err);
          alert(`Terjadi Kesalahan:${err}`);
        });
    }
  };

  // GET ALL USERS
  useEffect(() => {
    doGetAllUsers((bool)=>setIsFetchingUsers(bool)).then(response=>{
      // console.log("+++ doGetAllUsers :", response);
      if(response){
        if(response.users.length > 0){
          const options = [];
          response.users.map((item)=>{
            // Select User CIMB only = vendorId (null)
            if(!item.vendorId){
              const newObj = {id: item.id, name: item.fullName};
              options.push(newObj);
            }
          });
          setUsersOption(options);
        }
      }
    });
  }, []);

  useEffect(() => {
    console.log("+++ stateRequest", stateRequest);
  }, [stateRequest]);
  // useEffect(() => {
  //   console.log("+++ usersOption", usersOption);
  // }, [usersOption]);
  return (
    <div className={classes.root}>
      <Grid item className={classes.backAction}>
        <Button
          onClick={() =>
            history.push("/add-ons/todo-list")
          }
        >
          <BackIcon />
          <Typography className={classes.backLabel}>Back</Typography>
        </Button>
      </Grid>
      <Grid
        container
        justify="space-between"
        className={classes.titleContainer}
      >
        <Grid item>
          <Typography className={classes.title}>Add Todo List</Typography>
        </Grid>
      </Grid>
      <Paper className={classes.contentContainer}>
        <Grid container alignItems='center' style={{borderBottom: "1px solid #E6EAF3"}}>
          <Grid item xs={7} style={{borderRight: "1px solid #E6EAF3", paddingBottom: 10}}>
            <Grid container justifyContent='space-between' alignItems='center'>
              <Grid item xs>
                <Grid container alignItems='center'>
                  <Grid item xs={6}>
                    <Grid container>
                      <ChkySelectInput
                        value={stateRequest.priority}
                        selectOptionData={priorities}
                        onSelectValueChange={(value) =>
                          handleChangeState(value, "priority")
                        }
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs>
                        <UsersSelectorMenu value={users} handleChange={(values)=>setUsers(values)} usersOption={usersOption}/>
                      </Grid>
                      <Grid item xs="auto">
                        <div style={{paddingRight: 10}}>
                          {renderPriority(stateRequest.priority)}
                        </div>
                      </Grid>
                    </Grid>
                    {/* <div className={classes.avatarContainer}>
                      {users.map((item, index)=>{
                        if(index > 4){
                          return (
                            <Avatar style={{backgroundColor: "#ffe9e8", color: "#db241f", fontSize: 15}}>+{users.length-5}</Avatar>
                          );
                        }
                        const initialName = getInitialName(item.name);
                        const backgroundColorRand = todoListColors[numberFromText(initialName) % todoListColors.length];
                        return (
                          <Avatar style={{backgroundColor: backgroundColorRand}}>{initialName}</Avatar>
                        );
                      })}
                      <ButtonBase style={{position: "relative", marginLeft: -10}} onClick={()=>alert("Add new User")}>
                        <Avatar style={{backgroundColor: "#FFFFFF", border: "1px solid #BCC8E7"}}>
                          <UserIcon/>
                        </Avatar>
                        <PlusIcon style={{position: "absolute", right: -2, bottom: -2}}/>
                      </ButtonBase>
                      <UsersSelectorMenu style={{position: "relative", marginLeft: -10}} />
                    </div> */} 
                  </Grid>
                </Grid>
              </Grid>
              {/* <Grid item xs="auto">
                <Typography>MORE MENU</Typography>
              </Grid> */}
            </Grid>
          </Grid>
          <Grid item xs={5} style={{paddingLeft: 25}}>
            {/* <Typography>Top Right</Typography> */}
            <Grid container spacing={3}>
              <Grid item>
                <DatePicker
                  format="DD/MM/YYYY"
                  allowClear={false}
                  suffixIcon={<CalendarIcon />}
                  className={classes.datePicker}
                  placeholder="Start Date"
                  value={stateRequest.startDate? moment(stateRequest.startDate): ""}
                  onChange={(newDate)=>{
                    let valDate = "";
                    if(newDate === null){
                      valDate = "";
                    }else{
                      valDate = newDate.unix() * 1000;
                    }
                    handleChangeState(valDate, "startDate");
                  }} 
                  disabledDate={disabledDate}
                />
              </Grid>
              <Grid item>
                <DatePicker
                  format="DD/MM/YYYY"
                  allowClear={false}
                  suffixIcon={<CalendarIcon />}
                  className={classes.datePicker}
                  placeholder="End Date"
                  value={stateRequest.endDate? moment(stateRequest.endDate): ""}
                  onChange={(newDate)=>{
                    let valDate = "";
                    if(newDate === null){
                      valDate = "";
                    }else{
                      valDate = newDate.unix() * 1000;
                    }
                    handleChangeState(valDate, "endDate");
                  }} 
                  disabledDate={disabledDate}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container style={{minHeight: 100}}>
          <Grid item xs={7} style={{borderRight: "1px solid #E6EAF3"}}>
            <Grid container direction="column" spacing={3} style={{paddingTop: 20}}>
              <Grid item style={{paddingRight: 50}}>
                <ChkyInputSmall
                  rows={3}
                  placeholder="Judul Task"
                  fullWidth
                  onChange={(e) =>
                    handleChangeState(e.target.value, 'title')
                  }
                  value={stateRequest.title}
                />
              </Grid>
              <Grid item style={{paddingRight: 50}}>
                <ChkyInputSmall
                  multiline
                  rows={3}
                  placeholder="Deskripsi"
                  fullWidth
                  onChange={(e) =>
                    handleChangeState(e.target.value, 'desc')
                  }
                  value={stateRequest.desc}
                />
              </Grid>
              <Grid item style={{paddingRight: 10}}>
                <Typography className={classes.lable}>Subtask</Typography>
                <AddSubTask onSubmit={(obj)=>{
                  const newArr = stateRequest.subtask;
                  newArr.push(obj);
                  handleChangeState(newArr, "subtask");
                }}/>
                {/* <Grid container alignItems='center'>
                  <Grid item xs>
                    <InputSubtask
                      placeholder="Sub Task"
                      // fullWidth
                      onChange={(e) =>{
                        const {value} = e.target;
                        console.log("+++ value",value);

                        setTempSubTask((prev)=>{
                          console.log("+++ prev",prev);
                          return {...prev, subTaskName: value};
                        });
                      }
                      }
                      value={tempSubTask.subTaskName}
                    />
                  </Grid>
                  <Grid item xs="auto">
                    <ButtonBase 
                      style={{position: "relative", paddingLeft: 10, paddingRight: 10}} 
                      onClick={()=>{
                        const isEmpty = Object.values(tempSubTask).every(x => x === null || x === '');
                        if(isEmpty){
                          alert('Harap lengkapi informasi sub task!');
                        }else{
                          const newArr = stateRequest.subtask;
                          newArr.push(tempSubTask);
                          handleChangeState(newArr, "subtask");
                          setTempSubTask(defTempSubTask);
                        }
                      }}>
                      <PlusAddIcon/>
                    </ButtonBase>
                  </Grid>
                </Grid> */}
                {stateRequest.subtask.map((item, indexSub)=>{
                  return(
                    <Grid container alignItems='center' style={{marginTop: 10}}>
                      <Grid item xs>
                        <ChecklistSubTask 
                          value={item}
                          onChange={(newVal, keyname)=>handleChangeSubtask(indexSub, keyname, newVal)}
                        />
                      </Grid>
                      <Grid item xs="auto">
                        <ButtonBase
                          style={{position: "relative", paddingLeft: 10, paddingRight: 10}} 
                          onClick={()=>{
                            const newArr = stateRequest.subtask;
                            newArr.splice(indexSub, 1);
                            handleChangeState(newArr, "subtask");
                          }}>
                          <TrashIcon/>
                        </ButtonBase>
                      </Grid>
                    </Grid>
                  );
                })}
              </Grid>
              {/* <Grid item style={{paddingRight: 10}}>
                <Typography className={classes.lable}>Checklist</Typography>
                <Grid container alignItems='center'>
                  <Grid item xs>
                    <InputChecklist
                      placeholder="Checklist"
                      onChange={(e) =>
                        handleChangeChecklist(e.target.value, 0)
                      }
                      value={stateRequest.checklist[0]||""}
                    />
                  </Grid>
                  <Grid item xs="auto">
                    <ButtonBase 
                      style={{position: "relative", paddingLeft: 10, paddingRight: 10}} 
                      onClick={()=>{
                        const newArr = stateRequest.checklist;
                        newArr.push("");
                        handleChangeState(newArr, "checklist");
                      }}>
                      <PlusAddIcon/>
                    </ButtonBase>
                  </Grid>
                </Grid>
                {stateRequest.checklist.map((item, indexSub)=>{
                  if(indexSub > 0){
                    return(
                      <Grid container alignItems='center' style={{marginTop: 10}}>
                        <Grid item xs>
                          <InputChecklist
                            placeholder="Checklist"
                            onChange={(e) =>
                              handleChangeChecklist(e.target.value, indexSub)
                            }
                            value={item}
                          />
                        </Grid>
                        <Grid item xs="auto">
                          <ButtonBase
                            style={{position: "relative", paddingLeft: 10, paddingRight: 10}} 
                            onClick={()=>{
                              const newArr = stateRequest.checklist;
                              newArr.splice(indexSub, 1);
                              handleChangeState(newArr, "checklist");
                            }}>
                            <TrashIcon/>
                          </ButtonBase>
                        </Grid>
                      </Grid>
                    );
                  }
                })}
              </Grid> */}
              <Grid item style={{marginTop: 10}}>

                <AddFileTodo 
                  onChange={(e)=>{
                    const arr = stateRequest.files;
                    arr.push(e.target.files[0]);
                    handleChangeState(arr, "files");
                  }}/>
                <Grid container style={{marginTop: 20}} justifyContent="flex-start" spacing={2}>
                  {stateRequest.files.map((item, indexFile)=>{
                    return(
                      <Grid item>
                        <AttachedFileTodo filename={item.name} 
                          onDelete={()=>{
                            const newArr = stateRequest.files;
                            newArr.splice(indexFile, 1);
                            handleChangeState(newArr, "files");
                          }}
                        />
                      </Grid>
                      // <Grid container style={{marginBottom: 5}}>
                      //   <Grid item>
                      //     <div style={{ display: "flex", alignItems: "center", paddingRight: 30}}>
                      //       <FileIcon height={15}/>
                      //       <Typography
                      //         style={{ fontSize: 13, color: "#DC241F", marginLeft: 5, wordBreak: "break-all"  }}
                      //       >
                      //         <b>{item.name}</b>
                      //       </Typography>
                      //     </div>
                      //   </Grid>
                      //   <Grid item>
                      //     <ButtonBase
                      //       style={{position: "relative", paddingLeft: 10, paddingRight: 10}} 
                      //       onClick={()=>{
                      //         const newArr = stateRequest.files;
                      //         newArr.splice(indexFile, 1);
                      //         handleChangeState(newArr, "files");
                      //       }}>
                      //       <TrashIcon/>
                      //     </ButtonBase>
                      //   </Grid>
                      // </Grid>

                    );
                  })}
                </Grid>
                
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={5}>
            {/* <Typography>Bottom Right</Typography> */}
          </Grid>
        </Grid>
      </Paper>
      <Grid container justifyContent='space-between'>
        <Grid item/>
        <Grid item>
          <ChkyButtons
            onClick={handleSubmit}
            style={{textTransform: 'capitalize'}}
          >
            Simpan task
          </ChkyButtons>
        </Grid>
      </Grid>
      <PopupSucces
        isOpen={isSuccessAdd}
        onClose={()=>history.push(`/add-ons/todo-list`)}
        message="Task Berhasil Ditambah"
      />
      <ModalLoader isOpen={isLoading}/>
    </div>
  );
}

Add.propTypes = {

};

export default Add;

