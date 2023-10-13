import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
  Grid,
} from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/styles";
import React from "react";
import { GrayHard } from "../../../../../assets/theme/colors";
import MuiIconLabelButton from "../../../../../components/Button/MuiIconLabelButton";
import { ReactComponent as Plus } from "../../../../../assets/icons/linear-red/plus.svg";
import { PrimaryHard } from "../../../../../assets/theme/colors";
const useStyles = makeStyles(() => ({
  paper: {
    boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
    borderRadius: "8px",
    minHeight: 500,
  },
  title: {
    fontWeight: "600",
    fontSize: "17px",
    lineHeight: "20px",
    padding: 20,
  },
  addBtn: {
    backgroundColor: "transparent",
    boxShadow: "none",
    "& .MuiButton-label": {
      textTransform: "capitalize",
      fontWeight: "600",
      fontSize: "11px",
      lineHeight: "13px",
      color: PrimaryHard,
      padding: 20,
    },
    "&:hover": {
      backgroundColor: "transparent",
      boxShadow: "none",
    },
  },
  list: {
    padding: 0,
  },
  listItem: {
    padding: "6px 20px",
    "&:hover": {
      backgroundColor: "#FFF5F4",
    },
  },
  listItemSelected: {
    backgroundColor: "#FFF5F4!important",
    "&:hover": {
      backgroundColor: "#FFF5F4!important",
    },
  },
}));

const SideBar = ({ title, items, onValueChange, value, addCategory }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Grid container direction="row">
        <Grid item xs={8}>
          <Typography className={classes.title}>{title}</Typography>
        </Grid>
        <Grid item xs={4}>
          <MuiIconLabelButton
            label="Tambah"
            iconPosition="endIcon"
            onClick={addCategory}
            buttonIcon={<Plus style={{ width: 16, height: 16 }} />}
            className={classes.addBtn}
          />
        </Grid>
      </Grid>
      <List className={classes.list}>
        {items.map((item, index) => (
          <ListItem
            classes={{
              root: classes.listItem,
              selected: classes.listItemSelected,
            }}
            key={index}
            button
            onClick={() => onValueChange(item.value)}
            selected={value === item.value}
          >
            <CustomListText
              primary={item.label}
              secondary={item.count + " Items"}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default SideBar;

const CustomListText = withStyles((theme) => ({
  root: {
    margin: 0,
  },
  primary: {
    fontWeight: "600",
    fontSize: "12px",
    lineHeight: "14px",
  },
  secondary: {
    fontSize: "12px",
    lineHeight: "14px",
    color: GrayHard,
  },
}))(ListItemText);
