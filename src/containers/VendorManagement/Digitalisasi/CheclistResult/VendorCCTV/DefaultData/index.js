
  
export const dataTopInfoPdfCctv = {
  infoLeft: [
    {
      desc: "Ticket ID",
      value: "",
    },
    {
      desc: "ATM ID",
      value: "",
    },
    {
      desc: "Lokasi",
      value: "",
    },
    {
      desc: "Checklist Vendor",
      value: "",
    },
    {
      desc: "Vendor Name",
      value: "",
    },
  ],
  infoRight: [
    {
      desc: "Vendor User",
      value: "",
    },
    {
      desc: "Start Date",
      value: "",
    },
    {
      desc: "End Date",
      value: "",
    },
    {
      desc: "Durasi",
      value: "",
    },
  ],
};

// export const changeStateSurvey=async(old, keyname, newAnswerValues)=>{
// //   const newAnswerValue = [
// //     ["flmRpl1A", "flmRpl1B"],
// //     ["flmRpl2A", "flmRpl2B"]
// //   ];

//   const newArr = [];
//   //   console.log(">>> old", old[keyname]); 
//   old[keyname].map((item, index)=>{
//     // console.log(">>> item", item);
//     const newThisAnswer = [];
//     if(newAnswerValues[index]){
//       item.answer.map((itemAnswer, indexAnswer)=>{
//         newThisAnswer.push({
//           ...itemAnswer,
//           value: newAnswerValues[index][indexAnswer]? newAnswerValues[index][indexAnswer]: ""
//         });
//       });
//       newArr.push({
//         ...item,
//         answer: newThisAnswer
//       });
//     }else{
//       newArr.push(item);
//     }
//   });

//   //   const newState = {
//   //     ...old,
//   //     [keyname]: newArr,
//   //   };
//   return newArr;
// };

export const changeStateTop=async(old, keyname, newValues)=>{
  const newArr = [];
  //   console.log(">>> old", old[keyname]); 
  old[keyname].map((item, index)=>{
    // console.log(">>> item", item);
    if(newValues[index]){
      newArr.push({
        ...item,
        value: newValues[index]
      });
    }else{
      newArr.push(item);
    }
  });
  return newArr;
};