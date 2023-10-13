import { ReactComponent as SearchIcon } from "../../../assets/icons/duotone-red/search-red.svg";
import {
  FormControl,
  InputAdornment,
  InputBase,
  makeStyles,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
  searchContainer: {
    width: "100%",
    padding: 20,
  },
  search: {
    fontFamily: "Barlow",
    fontStyle: "italic",
    fontSize: "13px",
    width: "100%",
    border: "1px solid #BCC8E7",
    borderRadius: "8px",
    padding: "12px",
  },
});

const CategorySearchBar = ({placeholder}) => {
  const classes = useStyles();
  return (
    <FormControl className={classes.searchContainer}>
      <InputBase
        className={classes.search}
        placeholder={placeholder}
        endAdornment={
          <InputAdornment position="end">
            <SearchIcon />
          </InputAdornment>
        }
      />
    </FormControl>
  );
};

export default CategorySearchBar;
