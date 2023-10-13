/* eslint-disable array-callback-return */
/* eslint-disable react/prop-types */
import { Grid, makeStyles } from "@material-ui/core";
import React, { useEffect , useState } from "react";
import {
  Dark,
  PrimaryHard,
  InfoMedium,
  SuccessMedium,
} from "../../../../assets/theme/colors";
import { ReactComponent as IconTodo } from "../../../../assets/icons/general/todo_circle_red.svg";
import { ReactComponent as IconDoing } from "../../../../assets/icons/general/load_circle_blue.svg";
import { ReactComponent as IconDone } from "../../../../assets/icons/general/done_circle_green.svg";
import CardTasks from "./CardTasks";

const useStyles = makeStyles({
  title: {
    fontFamily: "barlow",
    fontSize: 15,
    color: Dark,
    fontWeight: 600,
  },
});

const CardList = (props) => {
  const { data, getPostApi, resetData, setResetData } = props;
  // useEffect(() => {
  //   console.log("+++ data", data?.implementationInformation?.openingType);
  // }, [data]);
  const classes = useStyles();

  function parameterType(type){
    switch (type) {
    case "New":
      return "parameter";
    case "Replace":
      return "parameter-replace";
    case "Migrasi":
      return "parameter-migrasi";
    default:
      return "parameter";
    }
  }

  return (
    <Grid container direction="row" spacing={8}>
      {/* TODO SECTION */}
      <Grid item xs={4}>
        <Grid container alignItems="center" direction="column">
          <IconTodo />
          <p className={classes.title}>TODO</p>
          <Grid
            style={{
              backgroundColor: PrimaryHard,
              display: "flex",
              width: "100%",
              height: 4,
              borderRadius: 18,
              marginBottom: 20,
            }}
          />
        </Grid>
        {/* >>> all openingType Task */}
        <CardTasks openingType={data?.implementationInformation?.openingType} data={data?.implementationParameterList?.filter(item=>{return item.status === 0 || item.status === null;})} taskType={parameterType(data?.implementationInformation?.openingType)} title={ data?.implementationInformation?.openingType === "Termin" ? "Cabut Parameter":"Parameter"}  getPostApi={getPostApi}/>

        {/* >>> new/replace */}
        {(data?.implementationInformation?.openingType === "New" || data?.implementationInformation?.openingType === "New Location" || data?.implementationInformation?.openingType === "Replace" || data?.implementationInformation?.openingType === "Reopen" || data?.implementationInformation?.openingType.toLowerCase() === "new atm") && (
          <>
            <CardTasks openingType={data?.implementationInformation?.openingType} data={data?.implementationSignageList?.filter(item=>{return item.status === 0 || item.status === null;})} taskType="signage" title="Signage" getPostApi={getPostApi}/>
          </>
        )}

        {/* >>> new/replace/migrasi */}
        {data?.implementationInformation?.openingType !== "Termin" && (
          <>
            <CardTasks openingType={data?.implementationInformation?.openingType} data={data?.implementationActivationList?.filter(item=>{return item.status === 0 || item.status === null;})} taskType="activation" title="Aktivasi"  getPostApi={getPostApi}/>
          </>
        )}

        {/* >>> termin */}
        {data?.implementationInformation?.openingType === "Termin" && (
          <>
            <CardTasks openingType={data?.implementationInformation?.openingType} data={data?.implementationBalanceList?.filter(item=>{return item.status === 0 || item.status === null;})} taskType="balance" title="Konfirmasi Saldo 0"  getPostApi={getPostApi}/>
            <CardTasks openingType={data?.implementationInformation?.openingType} data={data?.implementationTerminationList?.filter(item=>{return item.status === 0 || item.status === null;})} taskType="termination" title="Status Terminasi"  getPostApi={getPostApi} tipeAtm={data?.implementationInformation?.machineType}/>
          </>
        )}

        {/* >>> new/replace/termin */}
        {data?.implementationInformation?.openingType !== "Migrasi" && (
          <>
            <CardTasks openingType={data?.implementationInformation?.openingType} data={data?.implementationNeedList?.filter(item=>{return item.status === 0 || item.status === null;})} taskType="need" title={ data?.implementationInformation?.openingType === "Termin" ? "Perapihan Ruangan":"Kebutuhan"}  getPostApi={getPostApi}/>
            <CardTasks openingType={data?.implementationInformation?.openingType} data={data?.implementationBoothList?.filter(item=>{return item.status === 0 || item.status === null;})} taskType="booth" title={ data?.implementationInformation?.openingType === "Termin" ? "Cabut Booth & Promosi":"Booth"} getPostApi={getPostApi}/>
            <CardTasks openingType={data?.implementationInformation?.openingType} data={data?.implementationSecurityList?.filter(item=>{return item.status === 0 || item.status === null;})} taskType="security" title={ data?.implementationInformation?.openingType === "Termin" ? "Cabut Security":"Security"} getPostApi={getPostApi}/>
            <CardTasks openingType={data?.implementationInformation?.openingType} data={data?.implementationJarkomList?.filter(item=>{return item.status === 0 || item.status === null;})} taskType="jarkom" title={ data?.implementationInformation?.openingType === "Termin" ? "Cabut Jarkom":"Jarkom"} getPostApi={getPostApi}/>
            <CardTasks openingType={data?.implementationInformation?.openingType} data={data?.implementationMesinList?.filter(item=>{return item.status === 0 || item.status === null;})} taskType="mesin" title={ data?.implementationInformation?.openingType === "Termin" ? "Cabut Mesin":"Mesin"} getPostApi={getPostApi}/>
          </>
        )}

      </Grid>
      {/* DOING SECTION */}
      <Grid item xs={4}>
        <Grid container alignItems="center" direction="column">
          <IconDoing />
          <p className={classes.title}>DOING</p>
          <Grid
            style={{
              backgroundColor: InfoMedium,
              display: "flex",
              width: "100%",
              height: 4,
              borderRadius: 18,
              marginBottom: 20,
            }}
          />
        </Grid>
        {/* >>> all openingType Task */}
        {data?.implementationParameterList?.filter(item=>{return item.status === 1;}).length>0 &&
          <CardTasks openingType={data?.implementationInformation?.openingType} data={data?.implementationParameterList?.filter(item=>{return item.status === 1;})} taskType={parameterType(data?.implementationInformation?.openingType)} title={ data?.implementationInformation?.openingType === "Termin" ? "Cabut Parameter":"Parameter"} addButton={false} getPostApi={getPostApi}/>
        }

        {/* >>> new/replace */}
        {(data?.implementationInformation?.openingType === "New" || data?.implementationInformation?.openingType === "New Location" || data?.implementationInformation?.openingType === "Replace" || data?.implementationInformation?.openingType === "Reopen" || data?.implementationInformation?.openingType.toLowerCase() === "new atm") && (
          <>
            {data?.implementationSignageList?.filter(item=>{return item.status === 1;}).length>0 &&
              <CardTasks openingType={data?.implementationInformation?.openingType} data={data?.implementationSignageList?.filter(item=>{return item.status === 1;})} taskType="signage" title="Signage" addButton={false} getPostApi={getPostApi}/>
            }
          </>
        )}

        {/* >>> new/replace/migrasi */}
        {data?.implementationInformation?.openingType !== "Termin" && (
          <>
            {data?.implementationActivationList?.filter(item=>{return item.status === 1;}).length>0 &&
              <CardTasks openingType={data?.implementationInformation?.openingType} data={data?.implementationActivationList?.filter(item=>{return item.status === 1;})} taskType="activation" title="Aktivasi" addButton={false} getPostApi={getPostApi}/>
            }
          </>
        )}

        {/* >>> termin */}
        {data?.implementationInformation?.openingType === "Termin" && (
          <>
            {data?.implementationBalanceList?.filter(item=>{return item.status === 1;}).length>0 &&
              <CardTasks openingType={data?.implementationInformation?.openingType} data={data?.implementationBalanceList?.filter(item=>{return item.status === 1;})} taskType="balance" title="Konfirmasi Saldo 0" addButton={false} getPostApi={getPostApi}/>
            }
            {data?.implementationTerminationList?.filter(item=>{return item.status === 1;}).length>0 &&
              <CardTasks openingType={data?.implementationInformation?.openingType} data={data?.implementationTerminationList?.filter(item=>{return item.status === 1;})} taskType="termination" title="Status Terminasi" addButton={false} getPostApi={getPostApi}/>
            }
          </>
        )}

        {/* >>> new/replace/termin */}
        {data?.implementationInformation?.openingType !== "Migrasi" && (
          <>
            {data?.implementationNeedList?.filter(item=>{return item.status === 1;}).length>0 &&
              <CardTasks openingType={data?.implementationInformation?.openingType} data={data?.implementationNeedList?.filter(item=>{return item.status === 1;})} taskType="need" title={ data?.implementationInformation?.openingType === "Termin" ? "Perapihan Ruangan":"Kebutuhan"} addButton={false} getPostApi={getPostApi}/>
            }
            {data?.implementationBoothList?.filter(item=>{return item.status === 1;}).length>0 &&
              <CardTasks openingType={data?.implementationInformation?.openingType} data={data?.implementationBoothList?.filter(item=>{return item.status === 1;})} taskType="booth" title={ data?.implementationInformation?.openingType === "Termin" ? "Cabut Booth & Promosi":"Booth"} addButton={false} getPostApi={getPostApi}/>
            }
            {data?.implementationSecurityList?.filter(item=>{return item.status === 1;}).length>0 &&
              <CardTasks openingType={data?.implementationInformation?.openingType} data={data?.implementationSecurityList?.filter(item=>{return item.status === 1;})} taskType="security" title={ data?.implementationInformation?.openingType === "Termin" ? "Cabut Security":"Security"} addButton={false} getPostApi={getPostApi}/>
            }
            {data?.implementationJarkomList?.filter(item=>{return item.status === 1;}).length>0 &&
              <CardTasks openingType={data?.implementationInformation?.openingType} data={data?.implementationJarkomList?.filter(item=>{return item.status === 1;})} taskType="jarkom" title={ data?.implementationInformation?.openingType === "Termin" ? "Cabut Jarkom":"Jarkom"} addButton={false} getPostApi={getPostApi}/>
            }
            {data?.implementationMesinList?.filter(item=>{return item.status === 1;}).length>0 &&
              <CardTasks openingType={data?.implementationInformation?.openingType} data={data?.implementationMesinList?.filter(item=>{return item.status === 1;})} taskType="mesin" title={ data?.implementationInformation?.openingType === "Termin" ? "Cabut Mesin":"Mesin"} addButton={false} getPostApi={getPostApi}/>
            }
          </>
        )}

      </Grid>
      {/* DONE SECTION */}
      <Grid item xs={4}>
        <Grid container alignItems="center" direction="column">
          <IconDone />
          <p className={classes.title}>DONE</p>
          <Grid
            style={{
              backgroundColor: SuccessMedium,
              display: "flex",
              width: "100%",
              height: 4,
              borderRadius: 18,
              marginBottom: 20,
            }}
          />
        </Grid>
        {/* >>> all openingType Task */}
        {data?.implementationParameterList?.filter(item=>{return item.status === 2;}).length>0 &&
          <CardTasks openingType={data?.implementationInformation?.openingType} data={data?.implementationParameterList?.filter(item=>{return item.status === 2;})} taskType={parameterType(data?.implementationInformation?.openingType)} title={ data?.implementationInformation?.openingType === "Termin" ? "Cabut Parameter":"Parameter"} addButton={false} getPostApi={getPostApi}/>
        }

        {/* >>> new/replace */}
        {(data?.implementationInformation?.openingType === "New" || data?.implementationInformation?.openingType === "New Location" || data?.implementationInformation?.openingType === "Replace" || data?.implementationInformation?.openingType === "Reopen" || data?.implementationInformation?.openingType.toLowerCase() === "new atm") && (
          <>
            {data?.implementationSignageList?.filter(item=>{return item.status === 2;}).length>0 &&
              <CardTasks openingType={data?.implementationInformation?.openingType} data={data?.implementationSignageList?.filter(item=>{return item.status === 2;})} taskType="signage" title="Signage" addButton={false} getPostApi={getPostApi}/>
            }
          </>
        )}

        {/* >>> new/replace/migrasi */}
        {data?.implementationInformation?.openingType !== "Termin" && (
          <>
            {data?.implementationActivationList?.filter(item=>{return item.status === 2;}).length>0 &&
              <CardTasks openingType={data?.implementationInformation?.openingType} data={data?.implementationActivationList?.filter(item=>{return item.status === 2;})} taskType="activation" title="Aktivasi" addButton={false} getPostApi={getPostApi}/>
            }
          </>
        )}

        {/* >>> termin */}
        {data?.implementationInformation?.openingType === "Termin" && (
          <>
            {data?.implementationBalanceList?.filter(item=>{return item.status === 2;}).length>0 &&
              <CardTasks openingType={data?.implementationInformation?.openingType} data={data?.implementationBalanceList?.filter(item=>{return item.status === 2;})} taskType="balance" title="Konfirmasi Saldo 0" addButton={false} getPostApi={getPostApi}/>
            }
            {data?.implementationTerminationList?.filter(item=>{return item.status === 2;}).length>0 &&
              <CardTasks openingType={data?.implementationInformation?.openingType} data={data?.implementationTerminationList?.filter(item=>{return item.status === 2;})} taskType="termination" title="Status Terminasi" addButton={false} getPostApi={getPostApi}/>
            }
          </>
        )}

        {/* >>> new/replace/termin */}
        {data?.implementationInformation?.openingType !== "Migrasi" && (
          <>
            {data?.implementationNeedList?.filter(item=>{return item.status === 2;}).length>0 &&
              <CardTasks openingType={data?.implementationInformation?.openingType} data={data?.implementationNeedList?.filter(item=>{return item.status === 2;})} taskType="need" title={ data?.implementationInformation?.openingType === "Termin" ? "Perapihan Ruangan":"Kebutuhan"} addButton={false} getPostApi={getPostApi}/>
            }
            {data?.implementationBoothList?.filter(item=>{return item.status === 2;}).length>0 &&
              <CardTasks openingType={data?.implementationInformation?.openingType} data={data?.implementationBoothList?.filter(item=>{return item.status === 2;})} taskType="booth" title={ data?.implementationInformation?.openingType === "Termin" ? "Cabut Booth & Promosi":"Booth"} addButton={false} getPostApi={getPostApi}/>
            }
            {data?.implementationSecurityList?.filter(item=>{return item.status === 2;}).length>0 &&
              <CardTasks openingType={data?.implementationInformation?.openingType} data={data?.implementationSecurityList?.filter(item=>{return item.status === 2;})} taskType="security" title={ data?.implementationInformation?.openingType === "Termin" ? "Cabut Security":"Security"} addButton={false} getPostApi={getPostApi}/>
            }
            {data?.implementationJarkomList?.filter(item=>{return item.status === 2;}).length>0 &&
              <CardTasks openingType={data?.implementationInformation?.openingType} data={data?.implementationJarkomList?.filter(item=>{return item.status === 2;})} taskType="jarkom" title={ data?.implementationInformation?.openingType === "Termin" ? "Cabut Jarkom":"Jarkom"} addButton={false} getPostApi={getPostApi}/>
            }
            {data?.implementationMesinList?.filter(item=>{return item.status === 2;}).length>0 &&
              <CardTasks openingType={data?.implementationInformation?.openingType} data={data?.implementationMesinList?.filter(item=>{return item.status === 2;})} taskType="mesin" title={ data?.implementationInformation?.openingType === "Termin" ? "Cabut Mesin":"Mesin"} addButton={false} getPostApi={getPostApi}/>
            }
          </>
        )}

        {/* NOT REQUEST */}
        {/* >>> all openingType Task */}
        {data?.implementationParameterList?.filter(item=>{return item.status === 3;}).length>0 &&
          <CardTasks openingType={data?.implementationInformation?.openingType} data={data?.implementationParameterList?.filter(item=>{return item.status === 3;})} taskType={parameterType(data?.implementationInformation?.openingType)} title={ data?.implementationInformation?.openingType === "Termin" ? "Cabut Parameter":"Parameter"} addButton={false} getPostApi={getPostApi}/>
        }

        {/* >>> new/replace */}
        {(data?.implementationInformation?.openingType === "New" || data?.implementationInformation?.openingType === "New Location" || data?.implementationInformation?.openingType === "Replace" || data?.implementationInformation?.openingType === "Reopen" || data?.implementationInformation?.openingType.toLowerCase() === "new atm") && (
          <>
            {data?.implementationSignageList?.filter(item=>{return item.status === 3;}).length>0 &&
              <CardTasks openingType={data?.implementationInformation?.openingType} data={data?.implementationSignageList?.filter(item=>{return item.status === 3;})} taskType="signage" title="Signage" addButton={false} getPostApi={getPostApi}/>
            }
          </>
        )}

        {/* >>> new/replace/migrasi */}
        {data?.implementationInformation?.openingType !== "Termin" && (
          <>
            {data?.implementationActivationList?.filter(item=>{return item.status === 3;}).length>0 &&
              <CardTasks openingType={data?.implementationInformation?.openingType} data={data?.implementationActivationList?.filter(item=>{return item.status === 3;})} taskType="activation" title="Aktivasi" addButton={false} getPostApi={getPostApi}/>
            }
          </>
        )}

        {/* >>> termin */}
        {data?.implementationInformation?.openingType === "Termin" && (
          <>
            {data?.implementationBalanceList?.filter(item=>{return item.status === 3;}).length>0 &&
              <CardTasks openingType={data?.implementationInformation?.openingType} data={data?.implementationBalanceList?.filter(item=>{return item.status === 3;})} taskType="balance" title="Konfirmasi Saldo 0" addButton={false} getPostApi={getPostApi}/>
            }
            {data?.implementationTerminationList?.filter(item=>{return item.status === 3;}).length>0 &&
              <CardTasks openingType={data?.implementationInformation?.openingType} data={data?.implementationTerminationList?.filter(item=>{return item.status === 3;})} taskType="termination" title="Status Terminasi" addButton={false} getPostApi={getPostApi}/>
            }
          </>
        )}

        {/* >>> new/replace/termin */}
        {data?.implementationInformation?.openingType !== "Migrasi" && (
          <>
            {data?.implementationNeedList?.filter(item=>{return item.status === 3;}).length>0 &&
              <CardTasks openingType={data?.implementationInformation?.openingType} data={data?.implementationNeedList?.filter(item=>{return item.status === 3;})} taskType="need" title={ data?.implementationInformation?.openingType === "Termin" ? "Perapihan Ruangan":"Kebutuhan"} addButton={false} getPostApi={getPostApi}/>
            }
            {data?.implementationBoothList?.filter(item=>{return item.status === 3;}).length>0 &&
              <CardTasks openingType={data?.implementationInformation?.openingType} data={data?.implementationBoothList?.filter(item=>{return item.status === 3;})} taskType="booth" title={ data?.implementationInformation?.openingType === "Termin" ? "Cabut Booth & Promosi":"Booth"} addButton={false} getPostApi={getPostApi}/>
            }
            {data?.implementationSecurityList?.filter(item=>{return item.status === 3;}).length>0 &&
              <CardTasks openingType={data?.implementationInformation?.openingType} data={data?.implementationSecurityList?.filter(item=>{return item.status === 3;})} taskType="security" title={ data?.implementationInformation?.openingType === "Termin" ? "Cabut Security":"Security"} addButton={false} getPostApi={getPostApi}/>
            }
            {data?.implementationJarkomList?.filter(item=>{return item.status === 3;}).length>0 &&
              <CardTasks openingType={data?.implementationInformation?.openingType} data={data?.implementationJarkomList?.filter(item=>{return item.status === 3;})} taskType="jarkom" title={ data?.implementationInformation?.openingType === "Termin" ? "Cabut Jarkom":"Jarkom"} addButton={false} getPostApi={getPostApi}/>
            }
            {data?.implementationMesinList?.filter(item=>{return item.status === 3;}).length>0 &&
              <CardTasks openingType={data?.implementationInformation?.openingType} data={data?.implementationMesinList?.filter(item=>{return item.status === 3;})} taskType="mesin" title={ data?.implementationInformation?.openingType === "Termin" ? "Cabut Mesin":"Mesin"} addButton={false} getPostApi={getPostApi}/>
            }
          </>
        )}
      </Grid>
    </Grid>
  );
};

export default CardList;
