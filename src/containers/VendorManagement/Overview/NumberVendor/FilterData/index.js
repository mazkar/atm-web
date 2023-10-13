import React, {useState,useEffect} from 'react'
import {withStyles,makeStyles} from "@material-ui/styles"
import {Paper,Grid,FormControl,MenuItem,ButtonGroup,InputBase,Button} from "@material-ui/core"
import {Typography,Select} from "antd"
import PropTypes from "prop-types";
import {
  GrayUltrasoft,
  GrayMedium,
  PrimaryHard,
} from "../../../../../assets/theme/colors";
import GroupBtn from '../GroupBtn';
import MuiButton from '../../../../../components/Button/MuiButton';

const SmallInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
    padding: 0,
    "& ::placeholder": {
      fontSize: 13,
      color: "#BCC8E7",
      opacity: 1,
      fontStyle: "italic",
    },
  },
  input: {
    borderRadius: 8,
    position: "relative",
    backgroundColor: (props) => props.backgroundColor, // theme.palette.common.white,
    fontSize: 15,
    width: "140px",
    height: "100%",
    padding: "7px 9px",
    border: "1px solid #BCC8E7",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    "&:focus": {
      borderColor: "#DC241F",
    },
  },
}))(InputBase);
const BtnGroupItem = withStyles((theme) => ({
  root: {
    fontSize: 12,
    textTransform: "capitalize",
    backgroundColor: GrayUltrasoft,
    color: GrayMedium,
    border: "none!important",
    padding: "6px 15px",
  },
  label: {
    whiteSpace: "nowrap",
  },
  contained: {
    "&.Mui-disabled": {
      color: "white",
      backgroundColor: PrimaryHard,
    },
    "&:hover": {
      color: "white",
    },
  },
}))(Button);
const styles = () => ({
  filterSection: {
    padding: "10px 20px 10px 20px",
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
    background: "#FFFFFF",
    boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
    borderRadius: "10px",
  },
  titleTextFilter: {
    fontWeight: "bold",
    fontFamily: "Barlow",
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: "13px",
    lineHeight: "16px",
    color: "#2B2F3C",
  },
});
function FilterData(props) {
    const {
      onFilterSubmit,
      handleReset,
      classes,
      isOpening,
      itemSearch,
      isTable,
      //buttonList,
    } = props;
    const [openingType, setOpeningType] = useState("All");
    const [isFilterActive, setIsFilterActive] = useState(false);
    const openings = ["All", "Jlh Survey", "Open", "Tepat Waktu","Delay","Tidak Dikerjakan","Manual"];
    const [listFilter, setListFilter] = useState(null); 
    const [inputSearch, setInputSearch] = useState("");

    

    const onChangeInputSearch = (e) => {
      const { value } = e.target;
      setInputSearch(value);
    };

    const changeDataFilter = () => {
      setListFilter({
        vendorName: inputSearch === "" ? "All" :inputSearch,
        status: openingType === "All" ? "All" : openingType,
      });
    };
   /* const onChangeFilter=()=>{
      console.log("hallow")
      let idStatus;
      switch(openings){
        case "Jlh Survey":
          idStatus="0"
          break
        case "Open":
          idStatus="1"
          break
        case "Tepat Waktu":
          idStatus="2"
          break
        case "Delay":
          idStatus="3"
          break
        case "Tidak Dikerjakan":
          idStatus="4"
          break
        case "Manual":
          idStatus="5"
          break
        default:
          idStatus="All";
          break
      }
    const newDataFilter={
      selectInputSearch : inputSearch === "" ? "All":inputSearch,
      [isTable]:idStatus,
    }
    if(newDataFilter.hasOwnProperty("All")){
      delete newDataFilter.All
       onFilterSubmit(newDataFilter)
    }
    console.log("newData",newDataFilter)
    }*/

    const handleKeyPress = (e) => {
      if (e.which === 13) {
        changeDataFilter()
        setIsFilterActive(true);
      }
    }

    useEffect(()=>{
      onFilterSubmit(listFilter)
    },[listFilter])
    
   
  return (
    <Paper className={classes.filterSection}>
      <Grid container direction="row" alignItems="center">
        <Grid item xs={1}>
          <Typography className={classes.titleTextFilter}>Showing:</Typography>
        </Grid>
        <Grid item xs={3}>
          <Grid container direction="row" justifyContent="space-between">
            <Grid item>
              <Typography
                style={{
                  fontSize: 13,
                  fontWeight: 400,
                  lineHeight: "16px",
                  paddingTop: 10,
                }}
              >
                Vendor Name
              </Typography>
            </Grid>
            <Grid item>
              <SmallInput
                placeholder="Vendor Name"
                value={inputSearch}
                onChange={onChangeInputSearch}
                onKeyDown={handleKeyPress}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={7}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ButtonGroup
            variant="contained"
            disableElevation
            // style={{ margin: "0", marginRight: 10 }}
          >
            {listButton.map(({ label, value }, i) => (
              <GroupBtn
                key={i}
                disabled={value === openingType}
                onClick={() => {
                  setOpeningType(value);
                  setIsFilterActive(true);
                }}
              >
                {label}
              </GroupBtn>
            ))}
          </ButtonGroup>
        </Grid>
        <Grid item xs={1}>
          <Grid container>
            <MuiButton
              label="Apply"
              style={{ height: "30px" }}
              onClick={() => {
                changeDataFilter()
                setIsFilterActive(true);
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
FilterData.propTypes = {
  classes: PropTypes.object.isRequired,
  captionD: PropTypes.string,
  onFilterSubmit: PropTypes.func,
  isOpening: PropTypes.bool,
  itemSearch: PropTypes.object.isRequired,
  isTable: PropTypes.string,
  buttonList: PropTypes.array,
};

FilterData.defaultProps = {
  captionD: "Status",
  isOpening: true,
  isTable: "status",
  onFilterSubmit: () => {},
  handleReset: () => {},
};
export default withStyles(styles)(FilterData)

const listButton=[
  {label:'All',value:'All'},
  {label:'Jlh Survey',value:0},
  {label:'Open',value:1},
  {label:'Tepat Waktu',value:2},
  {label:'Delay',value:3},
  {label:'Tidak Dikerjakan', value:4},
  {label:'Manual',value:5}
]