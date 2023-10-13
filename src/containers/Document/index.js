/* eslint-disable no-use-before-define */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

import TitleAndSearch from '../../components/Title/TitleAndSearch/TitleSearchLeftIcon';
import Filter from '../../components/GeneralComponent/FilterByDateAndShowing';
import MuiIconLabelButton from '../../components/Button/MuiIconLabelButton';

import { ReactComponent as PlusWhite } from '../../assets/icons/siab/plus-white.svg';
import FileImg from '../../assets/images/file.png';
import FolderImg from '../../assets/images/folder.png';
import ImageImg from '../../assets/images/image.png';

const useStyles = makeStyles({
  filterSection: {
    padding: '10px 20px 10px 20px',
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  dataSectionNoPadding: {
    borderRadius: 4,
    marginTop: 10,
    marginBottom: 20,
  },
});

const Document = () => {
  const classes = useStyles();

  const dateSuggestion = [
    {
      id: 0,
      value: 'Today',
      nameEn: 'Today',
      nameId: 'Hari ini',
    },
  ];

  const showingSuggestion = [
    {
      id: 0,
      value: 'All',
      nameEn: 'All',
      nameId: 'Semua',
    },
  ];

  const handleButton = () => {
    // eslint-disable-next-line no-console
    console.log('Button Clicked');
  };

  return (
    <div className="content_container" style={{ paddingBottom: 65 }}>
      <TitleAndSearch title="Document" searchPlaceholder="Search file..." />
      <div style={{ width: '100%', textAlign: 'end' }}>
        <MuiIconLabelButton
          style={{ marginBottom: 20, width: 150 }}
          label="New Document"
          iconPosition="startIcon"
          onClick={handleButton}
          buttonIcon={<PlusWhite />}
        />
      </div>

      <Paper elevation={3} className={classes.filterSection}>
        <Filter
          captionD="Document"
          dateSuggestions={dateSuggestion}
          showingSuggestions={showingSuggestion}
          handleDateOnChange={(value) => {
            console.log(value);
          }}
          handleShowingOnChange={(value) => {
            console.log(value);
          }}
          onFilterSubmit={(value) => {
            handleButton(value);
          }}
          //   classes
        />
      </Paper>
      <Box
        display="flex"
        flexWrap="wrap"
        // bgcolor="gray"
        css={{ width: '100%' }}
      >
        {boxItem(FileImg, 'file-1')}
        {boxItem(FolderImg, 'folder-1')}
        {boxItem(ImageImg, 'image-1')}
        {boxItem(FileImg, 'file-2')}
        {boxItem(FolderImg, 'folder-2')}
        {boxItem(ImageImg, 'image-2')}
      </Box>
    </div>
  );
};

const boxItem = (img, boxname) => {
  return (
    <Box
      //   bgcolor="white"
      m={0}
      p={1}
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <img src={img} style={{ height: 125, width: 150 }} alt={boxname} />
      <span style={{ margin: 0 }}>{boxname}</span>
    </Box>
  );
};

function mapStateToProps() {
  return {};
}

export default withRouter(
  connect(mapStateToProps)(withTranslation('translations')(Document))
);
