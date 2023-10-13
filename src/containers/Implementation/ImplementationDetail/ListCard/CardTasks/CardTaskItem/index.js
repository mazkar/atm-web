/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/forbid-prop-types */
import React, { useState } from "react";
import PropTypes from 'prop-types';
import moment from "moment";
import "moment/locale/id";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Grid, Typography, Link } from "@material-ui/core";
import { Select } from "antd";
import { Dark, GrayHard } from "../../../../../../assets/theme/colors";
import { ReactComponent as IconCalendar } from "../../../../../../assets/icons/general/calendar-grey.svg";
import { ReactComponent as IconPaperclip } from "../../../../../../assets/icons/general/paperclip.svg";
import { ReactComponent as AngleDownIcon } from "../../../../../../assets/icons/general/dropdown_red.svg";
import TagCardTask from "../../../../../../components/TagCardTask";
import ModalLoader from "../../../../../../components/ModalLoader";
import CardMediaMinioPath from "../../../../../../components/CardMediaMinioPath";
import { doUpdateStatusTaskDetailImplementation } from "../../../../ApiServiceImplementation";

moment.locale('id');

const statusImplement = [
  { id: 0, value: "Todo" },
  { id: 1, value: "Doing" },
  { id: 2, value: "Done" },
  { id: 3, value: "Strip" },
];

const CardTaskItem = (props) => {
  const { data, getPostApi, handleDetail, taskType } = props;
  // INIT STATE
  const [isLoadData, setLoadData] = useState(false);
  // HANDLER FOR STATE
  function loadingHandler(bool) {
    setLoadData(bool);
  }

  // fungsi update udah jalan tetapi belum terreset datanya di listcard jadi datanya masih numpuk
  const handleStatusOnChange = (newStatus) => {
    const dataHit = {
      id: data.id,
      status: newStatus,
      taskType,
    };

    doUpdateStatusTaskDetailImplementation(loadingHandler,dataHit)
      .then((res) => {
        // console.log("+++ res", res);
        if(res.data.responseCode === "200"){
          getPostApi();
        }
      });
  };

  function renderIcon(status){
    switch (status) {
    case 0:
      return <TagCardTask type="Todo" />;
    case 1:
      return <TagCardTask type="Doing" />;
    case 2 :
      return <TagCardTask type="Done" />;
    case 3 :
      return <TagCardTask type="Done" />;
    default:
      return <TagCardTask type="Todo" />;
    }
  }

  function renderSelectStatus(status){
    switch (status) {
    case 0:
      return "Todo";
    case 1:
      return "Doing";
    case 2:
      return "Done";
    case 3:
      return "Strip";
    default:
      return "Todo";
    }
  }

  return (
    <Card style={{ margin: "15px 9.5px 0px 9.5px ", boxShadow:'none', border:"1px solid #BCC8E7" }}>
      <CardMediaMinioPath filePath={data.photoFront} onClick={handleDetail}/>

      <CardContent>
        <Grid container justify="space-between">
          <Link
            style={{
              fontSize: 15,
              color: Dark,
              fontFamily: "Barlow",
              fontWeight: 600,
              textDecoration: "none",
            }}
            onClick={handleDetail}
          >
            {data.taskTitle? data.taskTitle : "-"}
          </Link>
          {data.dueDate && (data.dueDate/1000) < moment().unix() ? <TagCardTask type="Overdue" /> : renderIcon(data.status)}
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
        <Select
          className="CommonSelect__select--bordered"
          value={renderSelectStatus(data.status)}
          onChange={handleStatusOnChange}
          suffixIcon={
            <AngleDownIcon className="CommonSelect__select-icon" />
          }
          dropdownStyle={{ zIndex: 1500 }}
          disabled={taskType === 'balance' || data.status === 3 }
        >
          {statusImplement.map((implement) =>{
            if(implement.id === 2 && data.status < 2){
              return null;
            }
            return (
              <Select.Option key={implement.id}>{implement.value}</Select.Option>
            );
          })}
        </Select>
      </CardContent>
      <hr style={{border: "1px solid #BCC8E7"}} />
      <CardContent>
        <Grid container alignItems="center">
          <Grid item>
            <CardMediaMinioPath filePath={data.picVendorImage} height={24}/>
          </Grid>
          <Grid item style={{marginLeft: 5}}>
            <Typography>{data.picVendor !== null ? data.picVendor : "-"}</Typography>
          </Grid>
        </Grid>
        <Grid
          container
          justify="space-between"
          style={{marginTop: 10}}
        >
          <Grid item>
            <Grid container direction="row" alignItems="center">
              <Grid item style={{ marginRight: 11 }}>
                <IconCalendar />
              </Grid>
              <Grid item>
                <Typography
                  style={{
                    fontSize: 13,
                    color: GrayHard,
                    fontFamily: "Barlow",
                    marginTop: -4,
                  }}
                >
                  {data.dueDate !== null ? moment.unix(data.dueDate/1000).format("DD-MM-YYYY") : "-"}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            {
              (taskType !== 'security' && taskType !== 'mesin') &&(
                <Grid container direction="row" alignContent="center">
                  <Grid item style={{ marginRight: 11 }}>
                    <IconPaperclip />
                  </Grid>
                  <Grid item>
                    <Typography
                      style={{
                        fontSize: 13,
                        color: GrayHard,
                        fontFamily: "Barlow",
                      }}
                    >
                      {data.documentList.length} Attachments
                    </Typography>
                  </Grid>
                </Grid>
              )
            }
          </Grid>
        </Grid>
      </CardContent>
      <ModalLoader isOpen={isLoadData} />
    </Card>
  );
};

CardTaskItem.propTypes = {
  data: PropTypes.object.isRequired,
  getPostApi: PropTypes.func.isRequired,
  handleDetail:  PropTypes.func,
  taskType: PropTypes.string.isRequired,
};

CardTaskItem.defaultProps = {
  handleDetail:  ()=>console.log("Button Clicked!"),
};
export default CardTaskItem;
