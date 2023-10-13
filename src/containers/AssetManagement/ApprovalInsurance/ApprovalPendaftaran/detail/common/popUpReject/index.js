import React from "react";
// lib import
import { Modal, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Layout } from "antd";

// component import
import MuiButton from "../../../../../../../components/Button/MuiButton";
import constants from "../../../../../../../helpers/constants";
import { ReactComponent as Xicon } from "../../../../../../../assets/icons/linear-red/x.svg";
import {
  Barlow36,
  Barlow15,
} from "../../../../../../../components/Typography/BarlowWithSize";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  paper: {
    position: "absolute",
    background: constants.color.white,
    width: 660,
    borderRadius: 10,
    padding: 30,
  },
});

const PopupReject = ({ isOpen, onClose, onConfirm, value, onChange }) => {
  const { Content } = Layout;
  const { root, paper } = useStyles();
  return (
    <>
      <Modal open={isOpen} onClose={onClose} className={root}>
        <div className={paper}>
          <Layout
            style={{
              width: "100%",
              background: "inherit",
              position: "relative",
            }}
          >
            {/* close button */}
            <Xicon
              style={{
                position: "absolute",
                right: 0,
                top: 0,
                cursor: "pointer",
              }}
              onClick={onClose}
            />

            {/* rejection title */}
            <Content
              style={{
                marginTop: 30,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Barlow36 style={{ fontWeight: 500 }}>Rejection</Barlow36>
            </Content>

            {/* reason */}
            <Content style={{ marginTop: 10 }}>
              <Barlow15 style={{ fontWeight: 500 }}>Reason</Barlow15>
            </Content>

            {/* text area for reason */}
            <Content style={{ marginTop: 10 }}>
              <textarea
                style={{
                  border: `1px solid ${constants.color.graySoft}`,
                  borderRadius: 8,
                  padding: "7px 10px",
                  width: "100%",
                  height: 76,
                }}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="reason to reject..."
              />
            </Content>

            {/* button cancel && approve */}
            <Content style={{ marginTop: 20 }}>
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
              >
                {/* button cancel */}
                <Grid item>
                  <MuiButton
                    label="Cancel"
                    style={{
                      background: constants.color.white,
                      color: constants.color.primaryHard,
                      border: `1px solid ${constants.color.primaryHard}`,
                    }}
                    onClick={onClose}
                  />
                </Grid>

                {/* button confirm */}
                <Grid item>
                  <MuiButton label="Confirm" onClick={onConfirm} />
                </Grid>
              </Grid>
            </Content>
          </Layout>
        </div>
      </Modal>
    </>
  );
};

export default PopupReject;
