import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { Grid, Typography } from "@material-ui/core";
import { Dark, GrayHard } from "../../../../assets/theme/colors";
import img from "../../../../assets/images/atm-1.png";
import pt from "../../../../assets/images/pt.png";
import { ReactComponent as IconCalendar } from "../../../../assets/icons/general/calendar-grey.svg";
import { ReactComponent as IconPaperclip } from "../../../../assets/icons/general/paperclip.svg";
import { ReactComponent as AngleDownIcon } from "../../../../assets/icons/general/dropdown_red.svg";
import { Select } from "antd";
import TagCardTask from "../../../../components/TagCardTask";
import settingApi from "../../../../services/implementation/implementationDetail";

const statusImplement = [
  { id: 0, value: "Todo" },
  { id: 1, value: "Doing" },
  { id: 2, value: "Done" },
];

const CardTask = (props) => {
  const { data, getPostApi } = props;

  //fungsi update udah jalan tetapi belum terreset datanya di listcard jadi datanya masih numpuk
  const handleStatusOnChange = (newValue) => {
    settingApi
      .implementationDetailUpdate({
        id: data.id,
        status: newValue,
        //belum tau kalau data tasktype harus lowercase atau ngga, kayanya lowercase
        //kalo data kategori belum lowecase
        taskType: data.kategori,
        // taskType: "jarkom",
      })
      .then((response) => {
        console.log(response);
        getPostApi();
      });
  };

  console.log(data);

  let tag, valselect;
  if (data.status === 0) {
    tag = <TagCardTask type="Todo" />;
    valselect = "Todo";
  } else if (data.status === 1) {
    tag = <TagCardTask type="Doing" />;
    valselect = "Doing";
  } else if (data.status === 2 || data.status === 3 || data.status === null) {
    tag = <TagCardTask type="Done" />;
    valselect = "Done";
  }

  // <TagCardTask type="Overdue" />

  const handleDetail = () => {
    console.log("coba :", data);
  };

  return (
    <div onClick={handleDetail}>
      <Card style={{ margin: "15px 9.5px 0px 9.5px " }}>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image={img}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Grid container justify="space-between">
            <Typography
              style={{
                fontSize: 15,
                color: Dark,
                fontFamily: "Barlow",
                fontWeight: 600,
              }}
            >
              {data.taskTitle}
            </Typography>
            {tag}
          </Grid>
          <Typography
            style={{
              fontSize: 13,
              textAlign: "left",
              color: Dark,
              fontFamily: "Barlow",
              marginTop: 20,
              marginBottom: 20,
            }}
          >
            {data.notesDescription}
          </Typography>

          <CardActionArea style={{ left: 0 }}>
            <Grid container alignItems="flex-start">
              <Grid item>
                <Select
                  className="CommonSelect__select--bordered"
                  defaultValue={valselect}
                  style={{ width: "100px" }}
                  onChange={handleStatusOnChange}
                  suffixIcon={
                    <AngleDownIcon className="CommonSelect__select-icon" />
                  }
                  dropdownStyle={{ zIndex: 1500 }}
                >
                  {statusImplement.map((implement) => (
                    <Option key={implement.id}>{implement.value}</Option>
                  ))}
                </Select>
              </Grid>
            </Grid>
          </CardActionArea>
        </CardContent>
        <hr />
        <CardContent>
          <Grid container>
            <img
              src={pt}
              style={{
                width: 24,
                height: 24,
                borderRadius: 4,
                marginRight: 10,
              }}
            />
            <p>{data.picVendor}</p>
          </Grid>
          <Grid
            container
            justify="space-between"
            direction="row"
            style={{ marginBottom: -20 }}
          >
            <Grid item>
              <Grid container direction="row" justify="center">
                <Grid item style={{ marginRight: 11 }}>
                  <IconCalendar />
                </Grid>
                <Grid item>
                  <p
                    style={{
                      fontSize: 13,
                      color: GrayHard,
                      fontFamily: "Barlow",
                    }}
                  >
                    {data.dueDate}
                  </p>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container direction="row" alignContent="center">
                <Grid item style={{ marginRight: 11 }}>
                  <IconPaperclip />
                </Grid>
                <Grid item>
                  <p
                    style={{
                      fontSize: 13,
                      color: GrayHard,
                      fontFamily: "Barlow",
                    }}
                  >
                    {data.documentList.length} Attachments
                  </p>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default CardTask;
