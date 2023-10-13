import React from "react";
import { useTranslation } from "react-i18next";
import { Col, Row } from "antd";

import "./DrafNegotiationTable.css"

const DrafNegotiationTable = (props) => {
    const { t } = useTranslation();
    const {
        data
    } = props;

    return (
        <div>
            <Row className="table-header">
                <Col span={4} className="right-style-white">{t("negotiation.draft.table.title.item")}</Col>
                <Col span={4} className="center-style-white">{t("negotiation.draft.table.title.rentalPrice")}</Col>
                <Col span={4} className="center-style-white">{t("negotiation.draft.table.title.securityDeposit")}</Col>
                <Col span={4} className="center-style-white">{t("negotiation.draft.table.title.electricity")}</Col>
                <Col span={4} className="center-style-white">{t("negotiation.draft.table.title.antennaAreaVsat")}</Col>
                <Col span={4} className="center-style-white">{t("negotiation.draft.table.title.landNeonSign")}</Col>
            </Row>

            {data.map((value, index) => {
                return (
                    <div style={{ border: "1px solid #E6EAF3", borderRadius: "4px", marginBottom: "10px" }}>
                        <div style={{ background: "#E6EAF3", width: "60px", height: "20px", color: "#8D98B4", borderTopLeftRadius: "4px", borderBottomRightRadius: "4px", marginBottom: "10px" }}>{t("negotiation.draft.table.title.Nego")}{index + 1}</div>
                        {
                            value.map((dataValue, index) => {
                                return (
                                    <Row style={{ padding: "0px 10px 10px 10px" }}>
                                        <Col span={4} className="right-style-black">{dataValue.item}</Col>
                                        <Col span={4} className="center-style-black">{dataValue.rentalPrice}</Col>
                                        <Col span={4} className="center-style-black">{dataValue.securityDeposit}</Col>
                                        <Col span={4} className="center-style-black">{dataValue.electricity}</Col>
                                        <Col span={4} className="center-style-black">{dataValue.antennaAreaVsat}</Col>
                                        <Col span={4} className="center-style-black">{dataValue.landNeonSign}</Col>
                                    </Row>
                                )
                            })
                        }
                    </div>
                )
            })}
        </div >
    )
}

export default DrafNegotiationTable

