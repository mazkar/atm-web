/* eslint-disable radix */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable no-alert */
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from "react-router-dom";
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
import InputSubtask from '../../../../components/InputSubtask';
import InputChecklist from '../../../../components/InputChecklist';
import AddFileTodo from '../../../../components/TodoList/AddFileTodo';
import CommentItems from '../../../../components/TodoList/CommentItems';
import InputComments from '../../../../components/TodoList/InputComments';
import { dummyHistory } from '../Detail';
import ModalLoader from '../../../../components/ModalLoader';
import { doCommentTodolist, doGetAllUsers, doGetDetailTodoList, doSaveAndUpdateTodoList } from '../../ApiServicesAddOns';
import AddSubTask from '../../../../components/TodoList/AddSubTask';
import ChecklistSubTask from '../../../../components/TodoList/ChecklistSubTask';
import UsersSelectorMenu from '../../../../components/UsersSelectorMenu';
import { renderPriority } from '../Add';
import PopupSucces from '../../../../components/PopupSucces';
import { doUploadDocument } from '../../../Implementation/ApiServiceImplementation';
import MinioDocTodolist from '../../../../components/TodoList/MinioDocTodolist';
import AttachedFileTodo from '../../../../components/TodoList/AttachedFileTodo';
import CommentsForumItems from '../../../../components/TodoList/CommentsForumItems';

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

const statuses=[
  { value: "-", name: "- Pilih Jenis Status -" },
  { value: "4", name: "Overdue" },
  { value: "3", name: "Done" },
  { value: "2", name: "On Going" },
  { value: "1", name: "To Do" },
  { value: "0", name: "Open" },
];

function disabledDate(current) {
  return current < moment().startOf("day");
}
function Edit() {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();
  const [usersOption, setUsersOption] = useState([]);
  const [users, setUsers] = useState([]);
  const [isSuccessEdit, setIsSuccessEdit] = useState(false); 

  const [isFetchingUsers, setIsFetchingUsers] = useState(false); 
  const [stateRequest, setStateRequest] = useState({
    priority: "-",
    startDate: "",
    endDate: "",
    title: "",
    desc: "",
    subtask: [],
    checklist: [""],
    files: [],
    taskStatus: ""
  });
  const [historyComments, setHistoryComments] = useState(dummyHistory);
  const [comment, setComment] = useState("");

  const [isLoading, setLoading] = useState(false); 
  const [contentReply, setContentReply] = useState(null);  

  const [errorForm, setErrorForm] = useState({
    title: false,
    startDate: false,
    endDate: false,
    priority: false,
    users: false,
    taskStatus: false
  });

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

  useEffect(() => {
    console.log("+++ stateRequest", stateRequest);
  }, [stateRequest]);
  
  // FETCH DETAIL
  function fetchData(){
    doGetDetailTodoList(loadingHandler,id)
      .then(response=>{
        if(response){
        // console.log("+++ response", response);
          if(response.responseCode==="200"){
            const newFiles = [];
            response.attachment.map((item)=>{
              const arr = item.split('/');
              const name = arr[arr.length - 1];
              newFiles.push({
                oldFile: true,
                path: item,
                name
              });
            });
            const subTaskArr = [];
            response.subTask.map((item)=>{
              subTaskArr.push({
                // ...item,
                // id: item.id,
                subTaskName: item.subTaskName,
                subTaskPriority: item.subTaskPriority,
                subTaskStatus: item.subTaskStatus,
                subTaskStartDate: item.subTaskStartDate? moment(item.subTaskStartDate).format("YYYY-MM-DD"):"",
                subTaskEndDate:  item.subTaskEndDate? moment(item.subTaskEndDate).format("YYYY-MM-DD"):"",
                // createdAt:  moment.unix(item.createdAt/1000).format("YYYY-MM-DD"),
              });
            });
            console.log("+++ subTaskArr", subTaskArr);
            setStateRequest((prevData)=>{
              return {
                ...prevData,
                priority: response.priority.toString(),
                createdDate: response.createdAt,
                taskStatus: response.statusTask.toString(),
                startDate: response.startDate?moment(response.startDate).valueOf():"",
                endDate: response.endDate?moment(response.endDate).valueOf():"",
                title: response.title,
                desc: response.description,
                files: newFiles,
                subtask: subTaskArr,
              };
            });
            const arrHistoryComments = [];
            if(response.comments?.length>0){
              response.comments.map((item)=>{
                arrHistoryComments.push({
                  type: "comment",
                  value: {
                    id: item.idComment,
                    name: item.userName,
                    text: item.message, 
                    files: item.attachment,
                    reply: item.reply,
                  },
                  dateTime: item.createdAt/1000,
                });
              });
            }
            if(response.history?.length>0){
              response.history.map((item)=>{
                arrHistoryComments.push({
                  type: "history",
                  value: {text: item.change, name: item.updatedBy},
                  dateTime: item.updateTime/1000,
                });
              });
            }
            arrHistoryComments.sort(function(a,b){
              return new Date(b.dateTime) - new Date(a.dateTime);
            });
            setHistoryComments(arrHistoryComments);
            if(response.assignedTo?.length>0){
              const assignedTo = [];
              response.assignedTo.map((item)=>{
                assignedTo.push({id: item.userId, name: item.userName});
              });
              setUsers(assignedTo);
            }
          }
        }
      }).catch((err) => {
        console.log('Error Get Detail Parameter', err);
        alert(`Terjadi Kesalahan:${err}`);
      });
  }

  async function submitComment(obj){
    // console.log("+++ payload comment", obj);
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
    await doUploadDocuments(obj.filesAttach);

    const dataHit = {
      todoListId: id,
      message: obj.message,
      attachment: documentList,
      ...(obj.contentReply && {repliedTo: obj.contentReply.id})
    };

    doCommentTodolist(loadingHandler,dataHit)
      .then((res) => {
        // console.log('~ res.data', res.data);
        if(res.data){
          if(res.data.responseCode === "200"){
            alert(`Berhasil submit comment`);
            fetchData();
          }
        }
      })
      .catch((err) => {
        alert(`Gagal submit comment. ${err}`);
        loadingHandler(false);
      });
  }
  // COMPONENT DID MOUNT
  useEffect(() => {
    fetchData();
  }, []);
  
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

    if(stateRequest.taskStatus === "" || stateRequest.taskStatus === "-" || stateRequest.taskStatus === null){
      handleError('taskStatus', true);
      errorCount+= 1;
    }else{
      handleError('taskStatus', false);
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
            if(item.oldFile){
              documentList.push(item.path);
            }else{
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
            }

          }));
        }
      };
      await doUploadDocuments(stateRequest.files);
      const userArr = [];
      users.map((item)=>userArr.push(item.id));
      const dataHit = {
        id,
        priority: parseInt(stateRequest.priority),
        title: stateRequest.title,
        description: stateRequest.desc,
        taskStatus: parseInt(stateRequest.taskStatus),
        startDate: moment.unix(stateRequest.startDate/1000).format("YYYY-MM-DD"),
        endDate: moment.unix(stateRequest.endDate/1000).format("YYYY-MM-DD"),
        attachment: documentList,
        subTask: stateRequest.subtask,
        assignTo: userArr,
      };
      console.log("+++ dataHit", dataHit);

      doSaveAndUpdateTodoList(loadingHandler, dataHit)
        .then((response) => {
          // console.log("+++ response", response);
          if(response){
            if (response.status === 200) {
              setIsSuccessEdit(true);
            }
          }
        }).catch((err) => {
          // console.log('Error Create New Task', err);
          alert(`Terjadi Kesalahan:${err}`);
        });
    }
  };

  useEffect(() => {
    console.log("+++ stateRequest",stateRequest);
  }, [stateRequest]);

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
          <Typography className={classes.title}>Edit Todo List</Typography>
        </Grid>
      </Grid>
      <Paper className={classes.contentContainer}>
        <Grid container alignItems='center' style={{borderBottom: "1px solid #E6EAF3"}}>
          <Grid item xs={7} style={{borderRight: "1px solid #E6EAF3", paddingBottom: 10}}>
            <Grid container justifyContent='space-between' alignItems='center'>
              <Grid item xs>
                <Grid container alignItems='center'>
                  <Grid item xs={6}>
                    <ChkySelectInput
                      value={stateRequest.priority}
                      selectOptionData={priorities}
                      onSelectValueChange={(value) =>
                        handleChangeState(value, "priority")
                      }
                    />
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
                  </Grid>
                  {/* <Grid item xs={6}>
                    <div className={classes.avatarContainer}>
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
                    </div>
                  </Grid> */}
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
              <Grid item style={{width: 180}}>
                <ChkySelectInput
                  value={stateRequest.taskStatus}
                  selectOptionData={statuses}
                  onSelectValueChange={(value) =>
                    handleChangeState(value, "taskStatus")
                  }
                />
              </Grid>
              <Grid item style={{paddingRight: 10}}>
                <Typography className={classes.lable}>Subtask</Typography>
                <AddSubTask onSubmit={(obj)=>{
                  const newArr = stateRequest.subtask;
                  newArr.push(obj);
                  handleChangeState(newArr, "subtask");
                }}/>
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
                        <AttachedFileTodo 
                          filename={item.name} 
                          onDelete={()=>{
                            const newArr = stateRequest.files;
                            newArr.splice(indexFile, 1);
                            handleChangeState(newArr, "files");
                          }}/>
                      </Grid>
                    );
                  })}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={5}>
            <Grid container direction='column' justifyContent='space-between' style={{height: "100%", padding: 10, minHeight: 400}}>
              <Grid item xs style={{ overflowY: "scroll", paddingTop: 15 }}>
                {historyComments.map((item) =>
                  <CommentsForumItems data={item} onReply={(obj)=>{
                    setContentReply(obj);
                  }}/>
                )}
              </Grid>
              <Grid item xs="auto" style={{paddingTop: 10}}>
                <InputComments 
                  onCloseReply={()=>{
                    setContentReply(null);
                  }}
                  contentReply={contentReply || null}
                  onSubmit={(payload)=> submitComment(payload)} />
              </Grid>
            </Grid>
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
        isOpen={isSuccessEdit}
        onClose={()=>history.push(`/add-ons/todo-list`)}
        message="Task Berhasil Ditambah"
      />
      <ModalLoader isOpen={isLoading}/>
    </div>
  );
}

Edit.propTypes = {

};

export default Edit;

