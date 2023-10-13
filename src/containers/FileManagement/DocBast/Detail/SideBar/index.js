import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/styles";
import React from "react";
import { GrayHard } from "../../../../../assets/theme/colors";

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
    padding: "14px 20px",
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

const SideBar = ({ title, items, onValueChange, value }) => {
  // console.log("ini items",items)
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <Typography className={classes.title}>{title}</Typography>
      <Divider />
      <List className={classes.list}>
        {items.map((item, index) => (
          <ListItem
            classes={{
              root: classes.listItem,
              selected: classes.listItemSelected,
            }}
            key={index}
            button
            onClick={() => onValueChange(index)}
            selected={value === index}
          >
            <CustomListText
              primary={item.name}
              secondary={item.total}
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
