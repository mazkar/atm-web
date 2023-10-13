import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/styles";
import {
  Grid,
  Typography,
  Paper,
  FormControl,
  MenuItem,
  InputBase,
  Link,
} from "@material-ui/core";
import Select from "@material-ui/core/Select";
import { DonutChart } from "bizcharts";
import { ReactComponent as DropDownIcon } from "../../../../../assets/icons/general/dropdown_red.svg";

const useStyles = makeStyles({
  superRoot: {
    "& .MuiPaper-elevation1": {
      boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
    },
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 600,
  },
  select: {
    padding: 10,
    "& .MuiSelect-icon": {
      top: "unset",
      right: 5,
    },
  },
});
const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(1),
      marginLeft: 10,
    },
    marginTop: -10,
  },
  input: {
    borderRadius: 8,
    //position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #BCC8E7",
    fontSize: 16,
    fontWeight: 600,
    padding: "6px 12px 8px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    "&:focus": {
      borderRadius: 8,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}))(InputBase);

const dummyName = [
  {
    id: 1,
    name: "Alarm System",
  },
  {
    id: 2,
    name: "Booth",
  },
];
const data = [
  {
    type: "Total Ter Rollout",
    value: 2500,
  },
  {
    type: "Target Jumlah",
    value: 2800,
  },
];
const colors = ["#DC241F","#FFB443"];

const PresentasiAsset = () => {
  const classes = useStyles();
  const [namePersentation, setNamePersentation] = useState(1);
  const totalLabels = "Persentasi";
  // const DashPopCtxVal = useContext(DashboardPopulationContext);
  // const { dataFilter } = DashPopCtxVal || {};
  const numberWithCommas = (x) => {
    return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  function handleChangeName(newName) {
    setNamePersentation(newName);
  }
  return (
    <div>
      <Paper
        style={{
          padding: 20,
          boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
          borderRadius: 10,
          marginTop: 30,
          border: "1px solid #BCC8E7",
        }}
      >
        <Grid container direction="row" justifyContent="space-between">
          <Grid item>
            <Typography className={classes.title}>Persentasi Asset</Typography>
          </Grid>
          <Grid item>
            <FormControl className={classes.select}>
              <Select
                input={<BootstrapInput />}
                IconComponent={DropDownIcon}
                value={namePersentation}
                onChange={(e) => handleChangeName(e.target.value)}
              >
                {dummyName.map((item, i) => {
                  return (
                    <MenuItem key={i} value={item.id}>
                      {item.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container alignItems="center">
          <Grid item xs={6} style={{ position: "relative", left: -15 }}>
            <DonutChart
              data={data}
              height={155}
              width={155}
              padding={0}
              color={colors}
              innerRadius={0.7}
              label={{
                visible: false,
              }}
              statistic={{
                title: {
                  style: {
                    fontSize: 13,
                    lineHeight: "16px",
                    fontFamily: "Barlow",
                    fontWeight: 400,
                  },
                  formatter: () => totalLabels,
                },
                content: {
                  style: {
                    fontSize: 17,
                    lineHeight: "20px",
                    fontFamily: "Barlow",
                    fontWeight: 600,
                  },
                },
              }}
              legend={{
                visible: false,
              }}
              angleField="value"
              colorField="type"
              pieStyle={{ lineWidth: 0 }}
            />
          </Grid>
          <Grid item xs={6}>
            {data.map((item, index) => {
              return (
                <div>
                  <Grid
                    key={index}
                    container
                    spacing={1}
                    justify="space-between"
                    wrap="nowrap"
                    alignItems="center"
                  >
                    <Grid item style={{ flex: 1, minWidth: 0 }}>
                      <Grid
                        container
                        spacing={1}
                        alignItems="center"
                        wrap="nowrap"
                      >
                        <Grid item>
                          <div
                            style={{
                              height: 20,
                              width: 30,
                              borderRadius: 4,
                              backgroundColor: colors[index],
                            }}
                          />
                        </Grid>
                        <Grid item style={{ flex: 1, minWidth: 0 }}>
                          <Typography
                            style={{
                              fontSize: 12,
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                            title={item.type}
                          >
                            {item.type}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Typography style={{ fontSize: 14, fontWeight: 600 }}>
                        {numberWithCommas(item.value)}
                      </Typography>
                    </Grid>
                  </Grid>
                </div>
              );
            })}
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

PresentasiAsset.defaultProps = {
  // data: dataDummy,
  totalLabels: "Persentase",
  // colors: ColorsHexCollection,
  // titleChart: "By Group",
};
export default PresentasiAsset;
