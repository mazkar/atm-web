/* eslint-disable no-fallthrough */
/* eslint-disable react/jsx-no-bind */
import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import { Grid, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import MuiIconLabelButton from '../../../components/Button/MuiIconLabelButton';
import PriorityCardContainer from '../../../components/TodoList/PriorityCardContainer';
import { doGetAllUsers, doGetTodoList } from '../ApiServicesAddOns';
import FilterComponent from './FilterComponent';
import ModalLoader from '../../../components/ModalLoader';

const useStyles = makeStyles({
  root: {
    padding: "30px 20px 20px 30px",
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
  },
});

const dummyData = {
  high: [
    { 
      id: 1,
      title: "Laporan Harian 1",
      status: 0, // 0 or 1
      deadline: 1696402163357,
    },
    { 
      id: 2,
      title: "Laporan Harian 2",
      status: 0, // 0 or 1
      deadline: 1595007321000,
    },
    { 
      id: 3,
      title: "Laporan Harian 3",
      status: 1, // 0 or 1
      deadline: 1595007321000,
    },
    { 
      id: 10,
      title: "Laporan Harian 3",
      status: 1, // 0 or 1
      deadline: 1595007321000,
    },
    { 
      id: 11,
      title: "Laporan Harian 3",
      status: 1, // 0 or 1
      deadline: 1595007321000,
    },
    { 
      id: 12,
      title: "Laporan Harian 3",
      status: 1, // 0 or 1
      deadline: 1595007321000,
    },
    { 
      id: 13,
      title: "Laporan Harian 3",
      status: 1, // 0 or 1
      deadline: 1595007321000,
    },
  ],
  medium: [
    { 
      id: 4,
      title: "Laporan Harian 1",
      status: 0, // 0 or 1
      deadline: 1696402163357,
    },
    { 
      id: 5,
      title: "Laporan Harian 2",
      status: 0, // 0 or 1
      deadline: 1595007321000,
    },
    { 
      id: 6,
      title: "Laporan Harian 3",
      status: 1, // 0 or 1
      deadline: 1595007321000,
    },
  ],
  low: [
    { 
      id: 7,
      title: "Laporan Harian 1",
      status: 0, // 0 or 1
      deadline: 1696402163357,
    },
    { 
      id: 8,
      title: "Laporan Harian 2",
      status: 0, // 0 or 1
      deadline: 1595007321000,
    },
    { 
      id: 9,
      title: "Laporan Harian 3",
      status: 1, // 0 or 1
      deadline: 1595007321000,
    },
  ],
};
const defaultDataHit={
  createdBy:"All",
  asignBy:"All",
};
function TodoList() {
  const classes = useStyles();
  const history = useHistory();
  const [isFetching, setIsFetching] = useState(false);
  const [resetPageCounter, setResetPageCounter] = useState(0);
  const [dataRequest, setDataRequest] = useState(defaultDataHit);
  const [dataResponse, setDataResponse] = useState({
    high: [],
    medium: [],
    low: [],
  });

  const [usersOption, setUsersOption] = useState([]);
  const [isFetchingUsers, setIsFetchingUsers] = useState(false); 

  function handleFilterSubmit(value) {
    setResetPageCounter((prevCount) => prevCount + 1);
    if (value === null) {
      setDataRequest(defaultDataHit);
    } else {
      // console.log("Sasa",value);
      setDataRequest({
        ...defaultDataHit,
        ...value,
      });
    }
  }

  function handleResetFilter() {
    setDataRequest({
      ...defaultDataHit,
    });
  }

  useEffect(() => {
    doGetTodoList((bool)=>setIsFetching(bool), dataRequest)
      .then((response) => {
        // console.log("+++ response", response);
        if(response){
          if(response.responseCode === "00"){
            const {todoList} = response.data;
            const  high = []; 
            const medium = []; 
            const low = [];
            if(todoList?.length>0){
              todoList.map((item)=>{
                if (item.priority === 0) {
                  item.title.map((itemTitle)=>{
                    // console.log("+++ itemTitle Low", itemTitle);
                    low.push(
                      { 
                        id: itemTitle.idTask,
                        title: itemTitle.task,
                        status: itemTitle.status,
                        deadline: itemTitle.dueDate,
                      });
                  });
                }
                if (item.priority === 1) {
                  item.title.map((itemTitle)=>{
                    // console.log("+++ itemTitle Low", itemTitle);
                    medium.push(
                      { 
                        id: itemTitle.idTask,
                        title: itemTitle.task,
                        status: itemTitle.status,
                        deadline: itemTitle.dueDate,
                      });
                  });
                }
                if (item.priority === 2) {
                  item.title.map((itemTitle)=>{
                    // console.log("+++ itemTitle Low", itemTitle);
                    high.push(
                      { 
                        id: itemTitle.idTask,
                        title: itemTitle.task,
                        status: itemTitle.status,
                        deadline: itemTitle.dueDate,
                      });
                  });
                }
              });
            }
            const newData = {
              high,
              medium,
              low,
            };
            // console.log("+++ newData", newData);
            setDataResponse(newData);
          }
        }
      })
      .catch((err) => {
        // console.log("Error Fetch Data Summary", err);
        alert(`Terjadi Kesalahan:${err}`);
      });
  }, [dataRequest]);
    
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
              const newObj = {value: item.id, lable: item.fullName};
              options.push(newObj);
            }
          });
          setUsersOption(options);
        }
      }
    });
  }, []);
  return (
    <div className={classes.root}>
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
              right: 0,
              height: 40,
              boxShadow: "0px 6px 6px rgba(220, 36, 31, 0.1)",
              borderRadius: "6px",
            }}
            label="Task"
            iconPosition="startIcon"
            onClick={() => history.push(`/add-ons/todo-list/add`)}
            buttonIcon={<AddIcon />}
          />
        </Grid>
      </Grid>
      <FilterComponent
        onFilterSubmit={handleFilterSubmit} 
        handleReset={handleResetFilter}
        usersOption={usersOption}
      />
      <div className={classes.contentContainer}>
        <Grid container spacing={3}>
          <Grid item sm={4}>
            <PriorityCardContainer level="high" data={dataResponse.high}/>
          </Grid>
          <Grid item sm={4}>
            <PriorityCardContainer level="medium" data={dataResponse.medium}/>
          </Grid>
          <Grid item sm={4}>
            <PriorityCardContainer level="low" data={dataResponse.low}/>
          </Grid>
        </Grid>
      </div>
      <ModalLoader isOpen={isFetching}/>
    </div>
  );
}

TodoList.propTypes = {

};

export default TodoList;

