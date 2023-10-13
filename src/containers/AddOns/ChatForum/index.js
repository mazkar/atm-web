import React,{useEffect,useState,useContext} from 'react';
import axios from "axios";
import { useHistory } from "react-router-dom";
import {makeStyles} from "@material-ui/styles";
import {Markup}from "interweave";
import { Typography, Grid,Paper,IconButton} from "@material-ui/core";
import InputBase from "@material-ui/core/InputBase";
import { RootContext } from "../../../router";
import constansts from '../../../helpers/constants';
import FloatingChat from "../../../components/GeneralComponent/FloatingChat";
import AddButton from '../../../components/Button/AddButton';
import LabelTextField from '../../../components/Form/LabelTextField';
import {ReactComponent as SearchIcon} from "../../../assets/icons/linear-red/search.svg";
import PaginationCard from "../../../components/Card/PaginationCard";
import ModalLoader from "../../../components/ModalLoader";
import {GrayMedium} from "../../../assets/theme/colors";
import LoadingView from '../../../components/Loading/LoadingView';
import EmptyImg from "../../../assets/images/empty_data.png";
import PopUpConfirmation from "../../../components/PopUpConfirmation";

const useStyle = makeStyles({
  root: {
    padding: "30px 20px 20px 30px",
  },
  title: {
    fontFamily: "Barlow",
    fontWeight: "500",
    fontSize: "36px",
  },
  titleContainer: {
    marginBottom: 15,
  },
  paginationContainer: {
    "& > *": {
      marginTop: 15,
      marginBottom: 35,
    },
    display: "flex",
    justifyContent: "space-between",
  },
  input: {
    marginLeft: 8,
    flex: 1,
    // color: Colors.Dark,
    width: "350px",
    fontSize: 13,
    "& ::placeholder": {
      color: "#BCC8E7",
      opacity: 1,
      fontStyle: "italic",
    },
  },
  pagination: {
    padding: 5,
    backgroundColor: constansts.color.white,
    borderRadius: 10,
    "& .Mui-selected": {
      backgroundColor: constansts.color.primaryUltaSoft,
    },
    "& .MuiPaginationItem-root": {
      color: constansts.color.primaryHard,
    },
  },
});

function ChatForum() {
  const classes = useStyle();
  const rowsPerPage=6;
  const history = useHistory();
  const dataHit = {
    pageNumber: 0,
    dataPerPage: 6,
    sortBy: "threadId",
    sortType: "ASC",
  };
  const [dataRequest,setDataRequest]= useState(dataHit);
  const [dataChat,setDataChat]= useState([]);
  const [dataElement,setDataElement]=useState(0);
  const [totalPages,setTotalPages]=useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const [loaderOpen,setLoaderOpen]= useState(false);
  const [inputSearchValue,setInputSearch]= useState("");
  const { userId, userFullName, userRoleName } = useContext(RootContext);
  const [openDeletePop, setOpenDeletePop] = useState(false);
  const [idDelete,setIdDelete]=useState();
  const [userChat,setUserChat]=useState();
  const isAdmin = userRoleName?.toLowerCase().includes("admin");
   const [currentPage, setCurrentPage] = useState(1);

  const convertDate = (resDate)=>{
    const date = new Date(resDate).getDate();
    const month = new Date(resDate).getMonth();
    const year = new Date(resDate).getFullYear();

    const listMonth=[
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];
    return `${date} ${listMonth[month]} ${year}`;
  };
  useEffect(()=>{
    const headers = {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    };
    try{
      setLoaderOpen(true);
      axios
        .post(
          `${process.env.REACT_APP_API_ADD_ONS}/getThread`,
          dataRequest,
          headers
        )
        .then((res) => {
          setLoaderOpen(false);
          console.log("response", res);
          const dataPush=[];
          setDataElement(res.data.totalElements);
          setTotalPages(res.data.totalPages);
          setTotalRows(res.data.numberOfElements);
          const dataArr= res.data.content;
          dataArr.map((item)=>{
            const newRow = {
              id: item?.threadId,
              userId: item?.userId,
              title: item?.title,
              coverImage: item?.coverImage,
              publishDate: convertDate(item?.publishDate),
              userName: item?.userName,
              description: <Markup content={item?.description} />,
            };
            dataPush.push(newRow);
          });
          setDataChat(dataPush);
        })
        .catch((err) => {
          alert(err);
          setLoaderOpen(false);
        });
    }catch(err){
      alert(`Fail to Send Remark..!\n ${err}`);
      setLoaderOpen(false);
    }
  },[dataRequest]);

  const onSearch = ()=>{
    const headers = {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    };
    const hitdata = {
      ...dataHit,
      title: inputSearchValue,
    };
    try{
      setLoaderOpen(true);
      axios
        .post(
          `${process.env.REACT_APP_API_ADD_ONS}/getThread`,
          hitdata,
          headers
        )
        .then((res) => {
          setLoaderOpen(false);
          console.log("response", res);
          const dataPush = [];
          setDataElement(res.data.totalElements);
          setTotalPages(res.data.totalPages);
          setTotalRows(res.data.numberOfElements);
          const dataArr = res.data.content;
          dataArr.map((item) => {
            const newRow = {
              id: item?.threadId,
              title: item?.title,
              coverImage: item?.coverImage,
              publishDate: convertDate(item?.publishDate),
              userName: item?.userName,
              description: item?.description,
            };
            dataPush.push(newRow);
          });
          setDataChat(dataPush);
        })
        .catch((err) => {
          alert(err);
          setLoaderOpen(false);
        });
    }catch(err){
      alert(`Fail to Send Remark..!\n ${err}`);
    }
  };
  const deleteChat = (idChat,userIdChat)=>{
    const headers = {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    };
    try {
      axios
        .get(
          `${process.env.REACT_APP_API_ADD_ONS}/deleteThread?id=${idChat}`,
          headers
        )
        .then((res) => {
          setOpenDeletePop(false);
          history.go(0);
        })
        .catch((err) => {
          alert(err);
          // setLoaderOpen(false);
        });
    } catch (errr) {
      alert(`Fail to Send Remark..!\n ${err}`);
    } 
  };
  function handleChangePage(newPage) {
    setDataRequest({
      ...dataRequest,
      pageNumber: newPage,

    });
    setCurrentPage(newPage + 1);
  }
 
  return (
    <div className={classes.root}>
      <Grid
        container
        justifyContent="space-between"
        className={classes.titleContainer}
        direction="column"
      >
        <Grid item style={{ paddingBottom: "30px" }}>
          <Grid container direction="row" justifyContent="space-between">
            <Grid item>
              <Typography className={classes.title}>Chat & Forum</Typography>
            </Grid>
            <Grid item>
              <Grid
                container
                direction="row"
                justifyContent="flex-end"
                spacing={1}
              >
                <Grid item>
                  <AddButton
                    label="Thread"
                    onClick={() =>
                      history.push("/add-ons/chat-forum/add-thread")
                    }
                    style={{ height: "49px" }}
                  />
                </Grid>
                <Grid item>
                  {/* <LabelTextField
                    placeholder="Pencarian Forum"
                    style={{ width: "350px" }}
                    endIcon={<SearchIcon />}
                  /> */}
                  <Paper style={{ border: `1px solid ${GrayMedium}` }}>
                    <InputBase
                      className={classes.input}
                      placeholder="Pencarian Forum"
                      onChange={(e) => setInputSearch(e.target.value)}
                      inputProps={{ "aria-label": "search" }}
                      onKeyDown={(e) => {
                        if(e.key === "Enter") onSearch()
                      }}
                    />
                    <IconButton
                      type="submit"
                      aria-label="search"
                      onClick={onSearch}
                    >
                      <SearchIcon />
                    </IconButton>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          {loaderOpen ? (
            <LoadingView />
          ) : (
            <div>
              <PaginationCard
                data={dataChat}
                mappingTitle="title"
                mappingImage="coverImage"
                mappingDate="publishDate"
                mappingWriter="userName"
                mappingDescription="description"
                rowsPerPage={rowsPerPage}
                totalRows={totalRows}
                totalPages={totalPages}
                cardStyle={{ cursor: "pointer" }}
                changePage={handleChangePage}
                currentPage={currentPage}
                isAdministrator={isAdmin}
                onDelete={(a) => {
                  setOpenDeletePop(true);
                  setIdDelete(a);
                  // setUserChat(b);
                }}
                onEdit={(idThread) => {
                  history.push(`/add-ons/chat-forum/edit-thread/${idThread}`);
                }}
                cardOnClick={(param) => {
                  history.push(`/add-ons/chat-forum/detail/${param}`);
                }}
              />
            </div>
          )}
        </Grid>
      </Grid>
      {/* <FloatingChat /> */}
      <PopUpConfirmation
        isOpen={openDeletePop}
        onSubmit={() => {
          deleteChat(idDelete, userChat);
        }}
        onLeave={() => setOpenDeletePop(false)}
        onClose={() => setOpenDeletePop(false)}
        message="Apakah anda yakin hapus data?"
      />
    </div>
  );
}

export default ChatForum;