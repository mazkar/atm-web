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
import { getInitialName, numberFromText, todoListColors } from '../../../../helpers/todoList';
import { ReactComponent as IconChecklist } from '../../../../assets/icons/general/check-grey.svg';
import { ReactComponent as IconShare } from '../../../../assets/icons/general/share.svg';
import { ReactComponent as IconEdit } from '../../../../assets/icons/general/edit.svg';
import { ReactComponent as FlagIcon } from "../../../../assets/icons/general/flag.svg";
import { ReactComponent as FlagRedIcon } from "../../../../assets/icons/general/flag-red.svg";
import { ReactComponent as FlagYellowIcon } from "../../../../assets/icons/general/flag-yellow.svg";
import { ReactComponent as FlagGreenIcon } from "../../../../assets/icons/general/flag-green.svg";
import StatusTaskDetail from '../../../../components/TodoList/StatusTaskDetail';
import { renderStatus } from '../../../../components/TodoList/TodoItem';
import MinioDocComponent from '../../../../components/MinioDocComponent';
import MuiIconLabelButton from '../../../../components/Button/MuiIconLabelButton';
import useTimestampConverter from '../../../../helpers/useTimestampConverter';
import InputComments from '../../../../components/TodoList/InputComments';
import CommentItems from '../../../../components/TodoList/CommentItems';
import ShareLink from '../../../../components/TodoList/ShareLink';
import { doCommentTodolist, doGetDetailTodoList } from '../../ApiServicesAddOns';
import ModalLoader from '../../../../components/ModalLoader';
import UsersAssigned from '../../../../components/TodoList/UsersAssigned';
import ChecklistSubTaskView from '../../../../components/TodoList/ChecklistSubTaskView';
import MinioDocTodolist from '../../../../components/TodoList/MinioDocTodolist';
import CommentsForumItems from '../../../../components/TodoList/CommentsForumItems';
import { doUploadDocument } from '../../../Implementation/ApiServiceImplementation';

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
  lable: {
    fontSize: 13,
    color: "#2B2F3C",
    fontWeight: 500,
    paddingBottom: 8
  },
  lableTop: {
    color: "#BCC8E7",
    fontSize: 13,
    fontWeight: 400,
  },
  value: {
    color: "#8D98B4",
    fontSize: 15,
    fontWeight: 400,
  }

});

export const dummyHistory = [
  {
    type: "history",
    value: {
      text: "Task dibuat",
      name: "Administrator",
    },
    dateTime: 1659934775000,
  },
  {
    type: "comment",
    value: {
      text: "Test Long text, Test Long text, Test Long text, Test Long text, Test Long text, Test Long text, Test Long text, Test Long text, Test Long text, ", 
      name: "Dani"
    },
    dateTime: 1549312452000,
  },
];

const renderPriority= (key)=>{
  switch (key) {
  case 2:
    return (<div style={{paddingTop: 5, paddingLeft: 6, paddingRight: 6, borderRadius: 20, border: "1px solid #FF6A6A"}}><FlagRedIcon/></div>);
  case 1:
    return (<div style={{paddingTop: 5, paddingLeft: 6, paddingRight: 6, borderRadius: 20, border: "1px solid #FFB443"}}><FlagYellowIcon/></div>);
  case 0:
    return (<div style={{paddingTop: 5, paddingLeft: 6, paddingRight: 6, borderRadius: 20, border: "1px solid #65D170"}}><FlagGreenIcon/></div>);
  
  default:
    return (<div style={{paddingTop: 5, paddingLeft: 6, paddingRight: 6, borderRadius: 20, border: "1px solid #BCC8E7"}}><FlagIcon/></div>);
  }
};
function Detail() {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();

  const [users, setUsers] = useState([]);

  const [stateResponse, setStateResponse] = useState({
    priority: "",
    createdDate: "",
    statusTask: 1,
    startDate: "",
    endDate: "",
    title: "",
    desc: "",
    files: [],
    subtask: [],
    checklist: [],
  });

  const [historyComments, setHistoryComments] = useState([]);
  
  const [isLoading, setLoading] = useState(false);   
  const [contentReply, setContentReply] = useState(null); 
  
  // HANDLER FOR STATE
  function loadingHandler(bool) {
    setLoading(bool);
  }
  // FETCH DETAIL
  function fetchData(){
    doGetDetailTodoList(loadingHandler,id)
      .then(response=>{
        if(response){
          console.log("+++ response", response);
          if(response.responseCode==="200"){
            setStateResponse((prevData)=>{
              return {
                ...prevData,
                priority: response.priority,
                createdDate: response.createdAt,
                statusTask: response.statusTask,
                startDate: response.startDate,
                endDate: response.endDate,
                title: response.title,
                desc: response.description,
                files: response.attachment,
                subtask: response.subTask
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
                assignedTo.push(item.userName);
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
  
  useEffect(() => {
    console.log("+++ stateResponse",stateResponse);
  }, [stateResponse]);

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
          <Typography className={classes.title}>Todo List</Typography>
        </Grid>
        <Grid item>
          <MuiIconLabelButton
            style={{
              width: "max-content",
              background: "#FFFFFF",
              border: "1px solid #DC241F",
              boxShadow: "0px 6px 6px rgba(220, 36, 31, 0.1)",
              borderRadius: "6px",
              color: "#DC241F",
              textTransform: "capitalize",
              padding: "10px 15px",
              fontWeight: 600
            }}
            label="Edit"
            onClick={() => {
              history.push(`/add-ons/todo-list/edit/${id}`);
            }}
            buttonIcon={<IconEdit />}
            iconPosition="startIcon"
          />
        </Grid>
      </Grid>
      <Paper className={classes.contentContainer}>
        <Grid container alignItems='center' style={{borderBottom: "1px solid #E6EAF3"}}>
          <Grid item xs={7} style={{borderRight: "1px solid #E6EAF3", paddingBottom: 10}}>
            <Grid container justifyContent='space-between' alignItems='center'>
              <Grid item xs>
                <Grid container alignItems='center'>
                  <Grid item xs="auto">
                    <StatusTaskDetail status={stateResponse.statusTask} />
                  </Grid>
                  <Grid item xs>
                    <div className={classes.avatarContainer}>
                      <UsersAssigned value={users}/>
                    </div>
                  </Grid>
                  <Grid item xs="auto">
                    <div style={{paddingRight: 10}}>
                      {renderPriority(stateResponse.priority)}
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs="auto" style={{paddingRight: 25}}>
                <ShareLink/>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={5} style={{paddingLeft: 25}}>
            {/* <Typography>Top Right</Typography> */}
            <Grid container spacing={3}>
              <Grid item>
                <Typography className={classes.lableTop}>Create Date</Typography>
                <Typography className={classes.value}>{stateResponse.createdDate? moment(stateResponse.createdDate).format("DD MMM YYYY"): ""}</Typography>
              </Grid>
              <Grid item>
                <Typography className={classes.lableTop}>Start Date</Typography>
                <Typography className={classes.value}>{stateResponse.startDate? moment(stateResponse.startDate).format("DD MMM YYYY"): ""}</Typography>
              </Grid>
              <Grid item>
                <Typography className={classes.lableTop}>Due Date</Typography>
                <Typography className={classes.value}>{stateResponse.endDate? moment(stateResponse.endDate).format("DD MMM YYYY"): ""}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container style={{minHeight: 100}}>
          <Grid item xs={7} style={{borderRight: "1px solid #E6EAF3"}}>
            <Grid container direction="column" spacing={3} style={{paddingTop: 20}}>
              <Grid item style={{paddingRight: 50}}>
                <Typography style={{fontSize: 24, color: "#2B2F3C"}}>{stateResponse.title}</Typography>
              </Grid>
              <Grid item style={{paddingRight: 50}}>
                <Typography style={{fontSize: 15, color: "#2B2F3C"}}>{stateResponse.desc}</Typography>
              </Grid>
              <Grid item style={{paddingRight: 10}}>
                <Typography className={classes.lable}>Subtask</Typography>
                {stateResponse.subtask.map((item)=>{
                  return(
                    <Grid container alignItems='center' style={{marginTop: 5}}>
                      <ChecklistSubTaskView value={item} />
                    </Grid>
                  );
                })}
              </Grid>
              {/* <Grid item style={{paddingRight: 10}}>
                <Typography className={classes.lable}>Checklist</Typography>
                {stateResponse.checklist.map((item)=>{
                  return(
                    <Grid container alignItems='center' style={{marginTop: 5}}>
                      <Grid item>
                        <IconChecklist style={{height: 20, paddingRight: 10, display: "block"}} />
                      </Grid>
                      <Grid item>
                        <Typography style={{color:" #BCC8E7", fontSize: 15}}>{item}</Typography> 
                      </Grid>
                    </Grid>
                  );
                })}
              </Grid> */}
              <Grid item style={{marginTop: 10}}>
                <Typography className={classes.lable}>Attachment</Typography>
                <Grid container style={{marginTop: 20}} justifyContent="flex-start" spacing={2}>
                  {stateResponse.files.map((item)=>{
                    return(
                      <Grid item>
                        <MinioDocTodolist filePath={item}/>
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
      <ModalLoader isOpen={isLoading}/>
    </div>
  );
}

Detail.propTypes = {

};

export default Detail;

