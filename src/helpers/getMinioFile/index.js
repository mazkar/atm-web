/* eslint-disable consistent-return */
const Minio = require('minio');

let SecretKey = process.env.REACT_APP_MINIO_SECRET_KEY;

if(SecretKey === 'IstuatATM'){
  SecretKey = 'IstuatATM$14b';
}

const minioClient = new Minio.Client({
  endPoint: `${process.env.REACT_APP_MINIO_URL}`,
  useSSL: true,
  accessKey: `${process.env.REACT_APP_MINIO_ACCESS_KEY}`,
  secretKey: `${SecretKey}`,
});    

const BucketName = `${process.env.REACT_APP_MINIO_BUCKET}`;

const getMinioFile = async (filePath) => {
   
  // console.log("<<<< MINIO NODE ENV", process.env.NODE_ENV);
  // console.log("<<<< MINIO URL", process.env.REACT_APP_MINIO_URL);
  // console.log("<<<< MINIO BUCKET", process.env.REACT_APP_MINIO_BUCKET);
  // console.log("<<<< MINIO ACCESS KEY", process.env.REACT_APP_MINIO_ACCESS_KEY);
  // console.log("<<<< MINIO SECRET KEY", SecretKey);
  if(!filePath){
    return null
  }
  const array = filePath.split('/');
  const fileName = array[array.length-1];

  try{
    const result = await minioClient.presignedGetObject(BucketName, filePath, 24*60*60);
    const fileNewSet = {
      "fileName": fileName,
      "fileUrl": result
    };
    return fileNewSet;
  }catch(err){
    // alert("Error get try file",err);
    console.log("Error get try file",err);
  }

};

export default getMinioFile;