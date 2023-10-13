import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import constansts from '../../../helpers/constants';
import { Modal, Box, Typography, IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import {
  GrayHard,
  GrayMedium,
  PrimaryHard,
  SuccessMedium,
  SuccessSoft,
} from '../../../assets/theme/colors';
import { Input } from 'antd';
import ChkyButtons from '../../../components/chky/ChkyButtons';
import { ReactComponent as Check } from '../../../assets/icons/duotone-others/check-green.svg';
import { ReactComponent as CloseGreen } from '../../../assets/icons/general/close_green.svg';
import { useEffect } from 'react';
import axios from 'axios';
import AddIcon from '@material-ui/icons/Add';
import ModalLoader from '../../../components/ModalLoader';

const useStyles = makeStyles({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    position: 'absolute',
    backgroundColor: constansts.color.white,
    width: 500,
    borderRadius: 10,
    padding: 30,
  },
  closeIcon: {
    color: PrimaryHard,
  },
  input: {
    border: '1px solid ' + GrayMedium,
    borderRadius: '8px',
    padding: '16px 12px',
    fontSize: '13px',
    lineHeight: '16px',
    '&:placeholder': {
      color: GrayMedium,
    },
  },
});

const Popup = ({ isOpen, onClose, item, reloadList }) => {
  const { modal, paper, closeIcon, input } = useStyles();
  const { id, attributeId, name, status } = item || {};
  const parentId = attributeId;
  const [text, setText] = useState('');
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [detailInputs, setDetailInputs] = useState(['']);
  const [isOpenModalLoader, setIsOpenModalLoader] = useState(false);
  const inputLabel = parentId ? 'Detail Atribut' : 'Nama'; // kalau ada parentId berarti detail, kalau tidak berarti job
  const titleLevel = parentId ? 'Detail Atribut' : 'Jenis Pekerjaan';
  const titleType = id ? 'Edit' : 'Tambah'; // kalau ada id berarti edit, kalau tidak ada berarti add

  const isNameShown = !attributeId || id;
  const isMultiShown = !id;

  useEffect(() => {
    setText(name || '');
  }, [name]);

  function handleChangeMulti(newVal, i) {
    // console.log('~ newVal,i', newVal, i);
    setDetailInputs(detailInputs.map((oldVal, index) => (i === index ? newVal : oldVal)));
  }

  function addDetailField() {
    setDetailInputs([...detailInputs, '']);
  }

  function handleSubmit() {
    let promises = [];
    if (!attributeId) {
      // JOBS atau ATRIBUT
      if (!id) {
        // add new
        const filtered = detailInputs.filter((val) => val);
        // console.log('~ filtered', filtered);
        const data = {
          attributeStatus: status || 0,
          name: text,
          ...(filtered.length > 0 && { detailNames: filtered }),
        };
        promises.push(postData(data));
      } else {
        // edit
        const data = { id, name: text, attributeStatus: status || 0 };
        promises.push(postData(data));
      }
    } else {
      // DETAIL ATRIBUT
      if (!id) {
        // add new
        const filtered = detailInputs.filter((val) => val);
        // console.log('~ filtered', filtered);
        promises = filtered.map((nameText) => {
          const data = { name: nameText, attributeId };
          return postData(data);
        });
      } else {
        // edit
        const data = { id, name: text, attributeId };
        promises.push(postData(data));
      }
    }
    setIsOpenModalLoader(true);
    Promise.allSettled(promises)
      .then((res) => {
        // console.log('~ res', res);
        onClose();
        reloadList();
        setIsOpenModalLoader(false);
      })
      .catch((err) => {
        setIsOpenModalLoader(false);
        console.log('~ err', err);
      });
  }

  function postData(data) {
    return axios.post(`${constansts.IMPLEMENTATION_SERVICE}/saveOrUpdateConfigAttribute`, data);
  }

  function handleChange(e) {
    setText(e.target.value);
  }

  function closeInfo() {
    setIsInfoOpen(false);
  }

  return (
    <>
      <Modal className={modal} open={isOpen} onClose={onClose}>
        <Box className={paper}>
          <div style={{ position: 'absolute', top: 0, right: 0 }}>
            <IconButton onClick={onClose}>
              <Close className={closeIcon} />
            </IconButton>
          </div>
          <div>
            <Typography
              style={{
                fontWeight: '500',
                fontSize: '36px',
                lineHeight: '43px',
                textAlign: 'center',
                margin: '30px 0 50px 0',
              }}
            >
              {titleType} {titleLevel}
            </Typography>
          </div>
          {isNameShown && (
            <>
              <Typography
                style={{
                  fontSize: '13px',
                  lineHeight: '16px',
                  marginBottom: 10,
                }}
              >
                {inputLabel} :
              </Typography>
              <Input
                className={input}
                placeholder={`Masukkan ${inputLabel}`}
                onChange={handleChange}
                value={text}
              />
            </>
          )}
          <div style={{ minHeight: 60, position: 'relative' }}>
            {isInfoOpen && (
              <div style={{ position: 'absolute', width: '100%' }}>
                <div
                  style={{
                    backgroundColor: SuccessSoft,
                    borderLeft: `10px solid ${SuccessMedium}`,
                    borderRadius: 8,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', padding: '6px 30px' }}>
                    <div style={{ marginRight: 15 }}>
                      <Check style={{ width: 32, height: 32 }} />
                    </div>
                    <div>
                      <Typography
                        style={{
                          fontWeight: '600',
                          fontSize: '16px',
                          lineHeight: '19px',
                          marginBottom: 8,
                        }}
                      >
                        Success
                      </Typography>
                      <Typography
                        style={{
                          fontSize: '13px',
                          lineHeight: '16px',
                          color: GrayHard,
                        }}
                      >
                        {inputLabel} Successfully Added
                      </Typography>
                    </div>
                    <div style={{ marginLeft: 'auto' }}>
                      <IconButton style={{ padding: 0 }} onClick={closeInfo}>
                        <CloseGreen />
                      </IconButton>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {isMultiShown && (
              <div style={{ width: '50%' }}>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <Typography
                    style={{
                      fontSize: '13px',
                      lineHeight: '16px',
                    }}
                  >
                    Detail Atribut :
                  </Typography>
                  <IconButton onClick={addDetailField}>
                    <AddIcon style={{ color: PrimaryHard }} />
                  </IconButton>
                </div>
                {detailInputs.map((val, i) => {
                  return (
                    <Input
                      className={input}
                      style={{ marginBottom: 12 }}
                      placeholder={`Masukan Detail Atribut`}
                      value={val}
                      onChange={(e) => handleChangeMulti(e.target.value, i)}
                    />
                  );
                })}
              </div>
            )}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <ChkyButtons buttonType='redOutlined' style={{ borderRadius: 6 }} onClick={onClose}>
                Cancel
              </ChkyButtons>
            </div>
            <div>
              <ChkyButtons
                style={{ borderRadius: 6 }}
                onClick={handleSubmit}
                disabled={isNameShown && !text}
              >
                Submit
              </ChkyButtons>
            </div>
          </div>
        </Box>
      </Modal>
      <ModalLoader isOpen={isOpenModalLoader} />
    </>
  );
};

export default Popup;
