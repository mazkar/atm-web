/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Image, Link, StyleSheet, Text, View } from '@react-pdf/renderer';
import getMinioFile from '../../../helpers/getMinioFile';
import NoImage from "../../../assets/images/image.png";

const styles = StyleSheet.create({
  gridContainer:{
    flexDirection: "row",
  },
  grid50:{
    width: "50%",
    paddingRight: 10,
  },
  imageList: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 3,
  },
  description: {
    width: "40%",
    fontFamily: "Barlow",
    fontSize: 11,
  },
  separator: {
    width: "5%",
    fontFamily: "Barlow",
    fontStyle: "bold",
    fontSize: 11,
  },
  value: {
    width: "55%",
    fontFamily: "Barlow",
    fontStyle: "bold",
    fontSize: 11,
  },
  valueLink: {
    width: "55%",
    fontFamily: "Barlow",
    fontStyle: "bold",
    fontSize: 11,
    color: "#DC241F",
    textDecoration: "none"
  },
  imageItem: {
    width: 100, 
    height: 70, 
    objectFit: "cover", 
    borderRadius: 10, 
    marginRight: 10
  },
});

const Answer = ({answer})=>{
  switch (answer.type) {
  case "link":
    return (
      <View style={styles.row}>
        <Text style={styles.description}>{answer.keyname}</Text>
        <Text style={styles.separator}>{answer.keyname === ""  ? "" : ":" }</Text>
        <Link style={styles.valueLink} src={answer.value}>{answer.value}</Link>
      </View>
    );
  case "image":
    if(answer.value){
      return (
        <MinioImageComponent filePath={answer.value}/>
      );
    }
    return null;
  default:
    return (
      <View style={styles.row}>
        <Text style={styles.description}>{answer.keyname}</Text>
        <Text style={styles.separator}>{answer.keyname === ""  ? "" : ":" }</Text>
        <Text style={styles.value}>{answer.value}</Text>
      </View>
    );
  }
};

function QnAItemSecondary({data}) {
  // console.log("+++ data QnAItemSecondary", data);
  return (
    <View>
      {data.map((item, index)=>{
        return (
          <>
            <View style={{backgroundColor: (index%2) === 0? "#FFFFFF": "#F9FBFF", padding: 10}}>

              <View style={styles.gridContainer}>
                <View style={styles.grid50}>
                  <Text style={{
                    fontStyle: "bold",
                    fontFamily: "Barlow",
                    fontSize: 11,
                  }}>
                    {item.question}
                  </Text>
                </View>
                <View style={styles.grid50}>
                  {item.answer.map((itemAnswer)=>{
                    return (
                      <Answer answer={itemAnswer}/>
                    );
                  })}
                </View>
              </View>
            </View>
          </>
        );
      })}
    </View>
  );
}

QnAItemSecondary.propTypes = {
  data: PropTypes.array.isRequired
};

export default QnAItemSecondary;

const MinioImageComponent = ({ filePath, ...others }) => {
  const [minioFile, setMinioFile] = useState(null);
  // console.log(">>>> filePath",filePath);

  useEffect(() => {
    if (filePath) {
      try {
        getMinioFile(filePath).then((result) => {
          // console.log(">>>> try getMinio Offering ", JSON.stringify(result));
          if(result){
            setMinioFile(result);
          }
        });
      } catch (err) {
        // console.log(">>>> Error try getMinio", err);
      }
    }
  }, [filePath]);

  return (
    <>
      {minioFile !== null ? (
        <Image style={styles.imageItem} src={minioFile.fileUrl} alt="img" {...others} />
      ) : (
        <Image style={styles.imageItem} src={NoImage} alt="img" {...others} />
      )}
    </>
  );
};

MinioImageComponent.propTypes = {
  filePath: PropTypes.string.isRequired,
};

