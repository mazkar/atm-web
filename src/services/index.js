/* eslint-disable import/prefer-default-export */
import axios from "axios";

export async function getDataTermin(){
  console.log(`======< START getDataTermin!`);
  const dataTerminRBB = [];
  try{
    const result = await axios({
      url: 'https://atmbusiness.getsandbox.com:443/masterData/termin',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
      },
      data: {},
    }
    );
    try{
      // reconstruct data from DB to dataTerminRBB
      const dataTerminPre = result.data.data;
          
      // eslint-disable-next-line array-callback-return
      dataTerminPre.map((row) => {
        const actionPenutupan = [
          // { name: 'View Detail', url: `/rencana-bisnis/detail-penutupan/${row.id}`, type:'view' }, 
          { name: 'Update', url: `/rencana-bisnis/termin/update/${row.id}`, type:'edit' }, 
          { name: 'Delete', url: `/rencana-bisnis/termin/delete/${row.id}`, type:'delete' }
        ];
        const newRow = {
          ...row,
          action : actionPenutupan
        };
        dataTerminRBB.push(newRow);
      });
    }catch(e){
      console.log(`=====< SERVICE Error Re-Construct Data Termin...! Message: ${e}`);
    }
  }catch(e){
    console.log(`=====< SERVICE Error render dataTerminRBB Message: ${e}`);
  }
  console.log(`====< SERVICE dataTerminRBB: ${JSON.stringify(dataTerminRBB)}`);
  return dataTerminRBB;
}