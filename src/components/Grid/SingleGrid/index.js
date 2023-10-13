import React from "react";
import PropTypes from "prop-types";

import { Col, Row } from "antd";

const SingleGrid = props => {
    const { container, singleComponent } = props;

    return (
        <Row
            gutter={container.gutter}
            style={container.style}
            className={container.className}
        >
            <Col
                span={24}
                className={`${
                    singleComponent.justify === undefined
                        ? "left"
                        : singleComponent.justify
                } ${
                    singleComponent.className === undefined
                        ? ""
                        : singleComponent.className
                }`}
                style={singleComponent.style}
            >
                {singleComponent.component}
            </Col>
        </Row>
    );
};

SingleGrid.defaultProps = {
    container: {
        gutter: 20
    }
};

SingleGrid.propTypes = {
    container: PropTypes.shape({
        gutter: PropTypes.number,
        className: PropTypes.string,
        style: PropTypes.object
    }),
    singleComponent: PropTypes.shape({
        component: PropTypes.element,
        justify: PropTypes.string,
        className: PropTypes.string,
        style: PropTypes.object
    })
};

export default SingleGrid;
