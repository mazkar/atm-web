/* Third Party Import */
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { Typography, Grid,InputBase } from "@material-ui/core";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";


/* Internal Import */
import { PrimaryHard } from "../../../assets/theme/colors";
import ListPagination from "./common/ListPagination";
import ListConfiguration from "./common/ListConfiguration";
import { ReactComponent as AddIcon } from "../../../assets/icons/siab/plus-white.svg";
import MuiIconLabelButton from "../../../components/Button/MuiIconLabelButton";
import DialogAddList from "./common/DialogAddList";
import dummyData from "./static_data/index";

const { dummyDataAnomali, dummyDataIntermiten } = dummyData;
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
    backgroundColor: (props) => props.backgroundColor, // theme.palette.common.white,
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

const useStyles = makeStyles({
  root: {
    padding: "30px 20px 20px 30px",
  },
  title: {
    fontWeight: 500,
    fontSize: 36,
    color: "#2B2F3C",
    marginBottom: "32px",
  },
  wrapper: {
    padding: "20px",
    border: "1px solid #E6EAF3",
    borderRadius: "8px",
    boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3);",
    background: "#ffffff",
  },
  wrapperTitle: {
    fontSize: "17px",
    fontWeight: 600,
    color: "#2B2F3C",
    marginBottom: "20px",
  },
  rootButton: {
    width: "max-content",
    height: 40,
    borderRadius: 10,
    textTransform: "capitalize",
    boxShadow: "0px 6px 6px rgba(220, 36, 31, 0.1)",
  },
  containedButton: {
    color: "#ffffff",
    backgroundColor: PrimaryHard,
  },
});



const Monitoring = () => {
  const classes = useStyles();
  const [search, setSearch] = useState("");
  const [dialog, setDialog] = useState(false);
  const [currentMenu, setCurrentMenu] = useState(0);
  const [dataConfiguration, setDataConfiguration] = useState([]);
  const [isLoadData,setIsLoadData]= useState(false);
  const [dataLength,setDataLength]=useState(0);
  const [dataLengthInter, setDataLengthInter] = useState(0);
  // const [dataHit,setDataHit]=useState();
  const isMenuAnomaliChoosed = Boolean(currentMenu === 0);

  const handleCurrentMenu = (index) => {
    setCurrentMenu(index);
  };

  useEffect(() => {
    const headers = {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    };
    // const hitDetermine = isMenuAnomaliChoosed;
    // console.log("anomal",hitDetermine);
    if(isMenuAnomaliChoosed){
      const dataHit={
        id:"1"
      };
      try {
        setIsLoadData(true);
        axios
          .post(
            `${process.env.REACT_APP_API_INFORMATION_MONITORING}/getViewConfiguration`,
            dataHit,
            headers
          )
          .then((res) => {
            setIsLoadData(false);
            const dataPush=[];
            const dataMap = res.data.configurationResultResponse[0].subConfig;
            setDataLength(res.data.configurationResultResponse[0].subConfig.length);
            dataMap.map((item,i)=>{
              const newRow = {
                idSubConfig: item?.idSubConfig,
                title: item?.problem,
                description: item?.description,
                duration: item?.duration,
                startTime: item?.startTime,
                endTime: item?.endTime,
              };
              dataPush.push(newRow);
            });
            setDataConfiguration(dataPush);
          })
          .catch((err) => {
            alert(err);
          });
      } catch (err) {
        alert(`Fail to Send Remark..!\n ${err}`);
      }
    }
    if(!isMenuAnomaliChoosed){
      const dataHitInter = {
        id: "2",
      };
      try {
        setIsLoadData(true);
        axios
          .post(
            `${process.env.REACT_APP_API_INFORMATION_MONITORING}/getViewConfiguration`,
            dataHitInter,
            headers
          )
          .then((res) => {
            setIsLoadData(false);
            const dataPush = [];
            const dataMap = res.data.configurationResultResponse[1].subConfig;
            setDataLengthInter(res.data.configurationResultResponse[1].subConfig.length);
            dataMap.map((item, i)=>{
              const newRow = {
                idSubConfig:item?.idSubConfig,
                title: item?.problem,
                description: item?.description,
                rangeDateDes: item?.rangeDateDes,
                rangeDate: item?.rangeDate,
                kejadian: item?.kejadian,
                configType: item?.configType,
              };
              dataPush.push(newRow);
            });
            setDataConfiguration(dataPush);
          })
          .catch((err) => {
            alert(err);
          });
      } catch (err) {
        alert(`Fail to Send Remark..!\n ${err}`);
      }
    }
   
    // if (isMenuAnomaliChoosed) setDataConfiguration(dummyDataAnomali);
    if (!isMenuAnomaliChoosed) setDataConfiguration(dummyDataIntermiten);
  }, [currentMenu]);

  const cekOne=(val)=>{
    // console.log("val",val)
    return val.filter((item)=>item.title.toLowerCase().includes(search));
  };
  const listMenu = [ {
    title: "Anomali",
    subtitle: `${dataLength} Configuration`,
  },
  {
    title: "Intermiten",
    subtitle: `${dataLengthInter} Configuration`,
  },
];
  return (
    <div className={classes.root}>
      <Typography className={classes.title}>Configuration</Typography>
      <Grid container alignItems="start" spacing={2}>
        <Grid item xs={3}>
          <ListPagination
            listMenu={listMenu}
            handleClick={handleCurrentMenu}
            selected={currentMenu}
          />
        </Grid>
        <Grid item xs={9}>
          <div className={classes.wrapper}>
            <Typography className={classes.wrapperTitle}>
              List Configuration
            </Typography>

            <SmallInput
              style={{ width: "100%", height: "23px", marginBottom: "20px" }}
              value={search}
              onChange={(newVal) => setSearch(newVal.target.value)}
              // onKeyUp={cekOne(dataConfiguration)}
              placeholder="Cari List Configuration"
            />
            <ListConfiguration
              data={cekOne(dataConfiguration)}
              loadData={isLoadData}
              type={isMenuAnomaliChoosed ? "anomali" : "intermiten"}
            />
            <Grid
              container
              justifyContent="center"
              style={{ marginTop: "20px" }}
            >
              <MuiIconLabelButton
                className={`${classes.rootButton} ${classes.containedButton}`}
                label="Tambah List"
                iconPosition="endIcon"
                buttonIcon={<AddIcon width={18} height={18} />}
                onClick={() => setDialog(true)}
              />
            </Grid>
            {dialog && (
              <DialogAddList
                isOpen={dialog}
                onClose={() => setDialog(false)}
                type={isMenuAnomaliChoosed ? "anomali" : "intermiten"}
              />
            )}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Monitoring;