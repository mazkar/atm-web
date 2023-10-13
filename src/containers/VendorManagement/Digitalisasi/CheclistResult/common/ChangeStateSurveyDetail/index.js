/* eslint-disable array-callback-return */
export const changeStateSurvey=async(old, keyname, newAnswerValues)=>{
  const newArr = [];
  console.log("+++ old", old[keyname]); 
  old[keyname].map((item, index)=>{
    // console.log(">>> item", item);
    const newThisAnswer = [];
    if(newAnswerValues[index]){
      item.answer.map((itemAnswer, indexAnswer)=>{
        newThisAnswer.push({
          ...itemAnswer,
          value: newAnswerValues[index][indexAnswer]? newAnswerValues[index][indexAnswer]: ""
        });
      });
      newArr.push({
        ...item,
        answer: newThisAnswer
      });
    }else{
      newArr.push(item);
    }
  });
  return newArr;
};
    
export const changeStateTopPdf=async(old, keyname, newValues)=>{
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