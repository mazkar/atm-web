import React,{useState,useEffect} from 'react'
import {makeStyles,withStyles,Typography,Grid,InputBase,FormControl,Select,MenuItem,Button} from "@material-ui/core"
import {ReactComponent as CalenderIcon} from "../../../../../assets/icons/linear-red/calendar.svg"
import {ReactComponent as DropdownIcon} from "../../../../../assets/icons/general/dropdown_red.svg"
import { PrimaryHard } from "../../../../../assets/theme/colors";
import MuiButton from '../../../../../components/Button/MuiButton';
import { ChkyButtons } from '../../../../../components';

const BootstrapInput = withStyles((theme)=>({
    root:{
      "label + &": {
      marginTop: theme.spacing(3),
    },
    },
    select:{
        padding:10
    },
    input:{
    borderRadius: 8,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #BCC8E7",
    fontSize: 13,
    padding: "6px 12px 6px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    "&:focus": {
      borderRadius: 8,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
    }
}))(InputBase)

const UseStyles = makeStyles({
  datePicker: {
    padding: "7px 10px 7px 10px",
    borderRadius: 6,
    border: "1px solid #BCC8E7",
    "& .ant-picker-input > input::placeholder": {
      color: "#BCC8E7",
      textOverflow: "ellipsis !important",
      fontSize: 14,
    },
    "&:hover": {
      border: "1px solid #000000",
      boxShadow: "0 0 2px #000000",
    },
  },
  formSelect: {
    width: "auto",
    borderRadius: 6,
    fontSize: 14,
    height: 40,
    padding: "0 10px",
    "& .MuiSelect-icon": {
      top: "unset",
      right: 5,
    },
    "&:last-child": {
      paddingRight: 0,
    },
  },
  col: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
  },

});
function FilterData(props) {
 const classes = UseStyles();
 const [dataFilter, setDataFilter] = useState(null);
 const [vendor, setVendor] = useState(" ");
 const [pekerjaan, setPekerjaan] = useState(" ")
 const {fillFilter,onFilterSubmit,workType}=props
 const [isFilterActive, setIsFilterActive] = useState(false);

 function handleVendor(e){
   setVendor(e.target.value)
 }

 function handlePekerjaan(e){
   setPekerjaan(e.target.value)
 }
 const changeDataFilter=()=>{
  setIsFilterActive(true)
  setDataFilter({
    orderBy:vendor === " "?"All":vendor,
    taskTitle:pekerjaan === " "?"All":pekerjaan
  })
 }
 function resetFilter(){
  setVendor(" ")
  setPekerjaan(" ")
  onFilterSubmit(null)
  setIsFilterActive(false)
 }
 useEffect(() => {
   onFilterSubmit(dataFilter);
   console.log(`==> dari Filter Component ${JSON.stringify(dataFilter)}`);
 }, [dataFilter]);
 const vendors = [
   {id:'All',nameVendor:'Berdasarkan Vendor'},
   {id:1, nameVendor:'PT.Raline Shah Abadi'},
   {id:2, nameVendor:'PT.TRIAS'},
   {id:3, nameVendor:'PT.Jaya'}
 ]
 const pekerjaans =[
   {id:'All',name:"Jenis Pekerjaan"},
   {id:1,name:"Bangunan Baru"},
   {id:2,name:"Renovasi Ruangan"},
   {id:3,name:"Pemasangan AC"},
   {id:4,name:"Pemasangan CCTV"}
 ]
  return (
    <div>
      <Grid container direction="row">
        <Grid item xs={1} style={{ paddingTop: 10 }}>
          <Typography style={{ fontSize: 13, fontWeight: 600 }}>
            Showing:
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Grid container direction="row">
            <Grid item style={{ paddingTop: 10 }}>
              <Typography style={{ fontSize: 13, fontWeight: 400 }}>
                Urutkan
              </Typography>
            </Grid>
            <Grid item>
              <FormControl>
                <Select
                  className={classes.formSelect}
                  input={<BootstrapInput />}
                  IconComponent={DropdownIcon}
                  onChange={handleVendor}
                  value={vendor}
                >
                  <MenuItem value=" ">All</MenuItem>
                  {fillFilter.map((item) => {
                    return (
                      <MenuItem key={item.id} value={item.nameVendor}>
                        {item.nameVendor}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Grid container direction="row">
            <Grid item style={{ paddingTop: 10 }}>
              <Typography style={{ fontSize: 13, fontWeight: 400 }}>
                Jenis Pekerjaan:
              </Typography>
            </Grid>
            <Grid item>
              <FormControl>
                <Select
                  className={classes.formSelect}
                  input={<BootstrapInput />}
                  IconComponent={DropdownIcon}
                  onChange={handlePekerjaan}
                  value={pekerjaan}
                >
                  {" "}
                  <MenuItem value=" ">All</MenuItem>
                  {workType.map((item, i) => {
                    return (
                      <MenuItem key={i} value={item}>
                        {item}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
            <ChkyButtons
              onClick={resetFilter}
              height={30}
              buttonType="redOutlined"
              style={{
                textTransform: "capitalize",
                visibility: isFilterActive ? "visible" : "hidden",
              }}
            >
              Reset
            </ChkyButtons>
            <MuiButton
              label="Apply Filter"
              onClick={changeDataFilter}
              style={{ height: "30px" }}
            />
        </Grid>
      </Grid>
    </div>
  );
}

export default FilterData