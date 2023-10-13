export function filterOptionsByStatus(array, status){
  // eslint-disable-next-line no-param-reassign
  // console.log("+++ array", array);
  const newArr = array.slice();
  newArr.removeByStatus = st => ((st === "TODO")|| (st === "DOING")) ? newArr.splice(newArr.findIndex(x=>x.value==="DONE"),1) : undefined;
  newArr.removeByStatus(status);
  // console.log("+++ array", newArr);
  return newArr;
}

export function filterOptionsById(array, idStatus){
  // eslint-disable-next-line no-param-reassign
  const newArr = array.slice();
  newArr.removeById = id => (id < 2) ? newArr.splice(newArr.findIndex(x=>x.id===2),1) : undefined;
  newArr.removeById(idStatus);
  return newArr;
}