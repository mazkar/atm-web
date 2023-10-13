function explode(str) {
  const listString = str?.replace(/\[|]/g, '');
  return listString ? listString.split(',') : null;
  // return non empty array or null
}

export default explode