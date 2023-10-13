import React from "react";
import { useTranslation } from "react-i18next";
import { Modal, Col, Row, Button } from "antd";

import "./DraftNegotiation.css"
import Logo from '../../../assets/images/SideMenu/logo_cimb.png';
import DrafNegotiationTable from '../../Table/DrafNegotiationTable'

const SummaryOpexApex = (props) => {
    const { t } = useTranslation();
    const {
        visible,
        referenceNumber,
        dateAndPlace,
        userName,
        subjectLetter,
        letterNumber,
        letterDate,
        location,
        leasePeriod,
        wide,
        data,
        clickCancel,
        clickSend
    } = props;

    function onCLickCancel() {
        clickCancel(false)
    }

    function onCLickSend() {
        clickSend(false)
    }


    return (
        <Modal
            id={"draft-negotiation"}
            data-test-id="modadlPopUp"
            zIndex={999999}
            closable={false}
            centered
            width={'80%'}
            visible={visible}
            footer={null}
            bodyStyle={{
                borderRadius: "8px",
                backgroundColor: "#ffffff",
                marginBottom: "50px"
            }}
        >
            <div style={{
                width: "100%",
                overflow: "scroll",
            }}>
                <div style={{ overflow: "auto", fontSize: "13px", fontFamily: "Barlow" }}>
                    <img style={{ width: "145px" }} src={Logo} alt="logo" />
                    <div style={{ marginTop: "40px" }}>
                        {referenceNumber}
                        <br />
                        {dateAndPlace}
                        <br /><br />
                        {t("negotiation.draft.headerTo")}
                        <br />
                        {t("negotiation.draft.subHeaderTo")} {userName}
                        <br /><br />
                        {t("negotiation.draft.subjectLetter")} {subjectLetter}
                        <br /><br />
                        {t("negotiation.draft.greeting")}
                        <br /><br />
                        {t("negotiation.draft.headerLetter", { letterNumber, letterDate, location })}
                    </div>

                    <DrafNegotiationTable data={data} />

                    <div>
                        {t("negotiation.draft.period", { leasePeriod })}
                        <br />
                        {t("negotiation.draft.wide", { wide })}
                        <br /><br />
                        {t("negotiation.draft.paymenMethod")}
                        <br /><br />
                        {t("negotiation.draft.clause1")}
                        <br />
                        {t("negotiation.draft.clause2")}
                        <br />
                        {t("negotiation.draft.clause3")}
                        <br />
                        {t("negotiation.draft.clause4")}
                        <br /><br />
                        {t("negotiation.draft.end1")}
                        <br />
                        {t("negotiation.draft.end2")}
                        <br /><br /><br /><br />
                        {t("negotiation.draft.regards")}
                        <br />
                        {t("negotiation.draft.cimb")}
                    </div>

                    <Row style={{ marginTop: "34px" }}>
                        <Col span={12} style={{ textAlign: 'left' }}>
                            <Button className="button-cancel" onClick={onCLickCancel}>{t("negotiation.draft.button.cancel")}</Button>
                        </Col>
                        <Col span={12} style={{ textAlign: 'right' }}>
                            <Button className="button-send" onClick={onCLickSend}>{t("negotiation.draft.button.send")}</Button>
                        </Col>
                    </Row>
                </div>
            </div>
        </Modal>
    )
}

export default SummaryOpexApex

