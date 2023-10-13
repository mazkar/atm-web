export const dataDafaultChart = [
  {label: 'Jan', type: 'New', value: 0, target: 0},
  {label: 'Jan', type: 'Replace', value: 0, target: 0},
  {label: 'Jan', type: 'Termin', value: 0, target: 0},
  {label: 'Jan', type: 'Migrasi', value: 0, target: 0},
  {label: 'Feb', type: 'New', value: 0, target: 0},
  {label: 'Feb', type: 'Replace', value: 0, target: 0},
  {label: 'Feb', type: 'Termin', value: 0, target: 0},
  {label: 'Feb', type: 'Migrasi', value: 0, target: 0},
  {label: 'Mar', type: 'New', value: 0, target: 0},
  {label: 'Mar', type: 'Replace', value: 0, target: 0},
  {label: 'Mar', type: 'Termin', value: 0, target: 0},
  {label: 'Mar', type: 'Migrasi', value: 0, target: 0},
  {label: 'Apr', type: 'New', value: 0, target: 0},
  {label: 'Apr', type: 'Replace', value: 0, target: 0},
  {label: 'Apr', type: 'Termin', value: 0, target: 0},
  {label: 'Apr', type: 'Migrasi', value: 0, target: 0},
  {label: 'Mei', type: 'New', value: 0, target: 0},
  {label: 'Mei', type: 'Replace', value: 0, target: 0},
  {label: 'Mei', type: 'Termin', value: 0, target: 0},
  {label: 'Mei', type: 'Migrasi', value: 0, target: 0},
  {label: 'Jun', type: 'New', value: 0, target: 0},
  {label: 'Jun', type: 'Replace', value: 0, target: 0},
  {label: 'Jun', type: 'Termin', value: 0, target: 0},
  {label: 'Jun', type: 'Migrasi', value: 0, target: 0},
  {label: 'Jul', type: 'New', value: 0, target: 0},
  {label: 'Jul', type: 'Replace', value: 0, target: 0},
  {label: 'Jul', type: 'Termin', value: 0, target: 0},
  {label: 'Jul', type: 'Migrasi', value: 0, target: 0},
  {label: 'Agu', type: 'New', value: 0, target: 0},
  {label: 'Agu', type: 'Replace', value: 0, target: 0},
  {label: 'Agu', type: 'Termin', value: 0, target: 0},
  {label: 'Agu', type: 'Migrasi', value: 0, target: 0},
  {label: 'Sep', type: 'New', value: 0, target: 0},
  {label: 'Sep', type: 'Replace', value: 0, target: 0},
  {label: 'Sep', type: 'Termin', value: 0, target: 0},
  {label: 'Sep', type: 'Migrasi', value: 0, target: 0},
  {label: 'Okt', type: 'New', value: 0, target: 0},
  {label: 'Okt', type: 'Replace', value: 0, target: 0},
  {label: 'Okt', type: 'Termin', value: 0, target: 0},
  {label: 'Okt', type: 'Migrasi', value: 0, target: 0},
  {label: 'Nov', type: 'New', value: 0, target: 0},
  {label: 'Nov', type: 'Replace', value: 0, target: 0},
  {label: 'Nov', type: 'Termin', value: 0, target: 0},
  {label: 'Nov', type: 'Migrasi', value: 0, target: 0},
  {label: 'Des', type: 'New', value: 0, target: 0},
  {label: 'Des', type: 'Replace', value: 0, target: 0},
  {label: 'Des', type: 'Termin', value: 0, target: 0},
  {label: 'Des', type: 'Migrasi', value: 0, target: 0},
];

// eslint-disable-next-line consistent-return
async function getItemMonth(val){
  // eslint-disable-next-line default-case
  switch (val) {
  case "01": return "Jan";
  case "02": return "Feb";
  case "03": return "Mar";
  case "04": return "Apr";
  case "05": return "Mei";
  case "06": return "Jun";
  case "07": return "Jul";
  case "08": return "Agu";
  case "09": return "Sep";
  case "10": return "Okt";
  case "11": return "Nov";
  case "12": return "Des";
  }
}

async function updateVal(month, type, currentItem){
  const objIndex = dataDafaultChart.findIndex((obj => obj.label === month && obj.type === type));
  console.log(`+++ label: '${month}' , type: '${type}' , obj: ${JSON.stringify(currentItem)}, objIndex: ${objIndex}`);
  if(objIndex > -1){
    dataDafaultChart[objIndex].value = currentItem.actual;
    dataDafaultChart[objIndex].target = currentItem.target;
  }
}
const reformatChartData = async (arr) =>{
  // console.log('+++ response groupingImplementationOverview', arr);
  // console.log('+++  arr', arr);
  const newArr = dataDafaultChart;
  try {
    arr.map(async (item)=>{
      // console.log('+++ item:', item);
      const itemMonth = await getItemMonth(item.month);
      // console.log('+++ itemMonth:', itemMonth);
      const type = item.type.split(' ').shift();
      const objIndex = newArr.findIndex((obj => obj.label === itemMonth && obj.type === type));
      // console.log(`+++ label: '${itemMonth}' , type: '${type}' , obj: ${JSON.stringify(item)}, objIndex: ${objIndex}`);
      if(objIndex > -1){
        console.log("+++ objIndex",objIndex);
        newArr[objIndex].value = item.actual;
        newArr[objIndex].target = item.total;
      }
      // await updateVal(itemMonth, type, item);
    });

    // newArr[1].value = 5;
    // newArr[1].target = 10;

  } catch (err) {
    return [];
  }
  return newArr;
  
};
export default reformatChartData;

// if(item.month === "12"){
//   const type = item.type.split(' ').shift();
//   newDataChart.push({label: 'Des', type, value: item.actual, target: item.total});
//   oldData.splice(oldData.findIndex(it => it.label === "Des"), 1);
// }