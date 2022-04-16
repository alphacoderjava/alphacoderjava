import React from 'react';
import { Row, Col, Breadcrumb, Divider, Typography } from 'antd';
import { withRouter, Link } from "react-router-dom";
import { connect } from 'react-redux';

import ArticleSidebar from "../../globalComponents/ArticleSidebar";

import "../pages.less";

const { Paragraph } = Typography;

const Rules = (props) => {
    const { langs, lang } = props;
    const content = langs[lang];

    return (
        <div className="article container">
            <Breadcrumb separator="-" className="dynamic-breadcrumb">
                <Breadcrumb.Item>
                    <Link to="/">
                        {content.breadcrumb_home}
                    </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    {content.rules}
                </Breadcrumb.Item>
            </Breadcrumb>

            <Row className="mb-4" gutter={[48]}>
                <Col xs={24} md={12} lg={6} className="visble-md visible-lg">
                    <ArticleSidebar />
                </Col>

                <Col xs={24} lg={18}>
                    <React.Fragment>
                        <h2 className="header">
                            {content.rules_header}
                        </h2>

                        <Divider />

                        <Paragraph className="description" ellipsis={{ rows: 15, expandable: true, symbol: content.more }}>
                            {content.rules_content}
                        </Paragraph>
                    </React.Fragment>
                </Col>
            </Row>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        langs: state.langs,
        lang: state.lang,
    }
}

export default withRouter(connect(mapStateToProps)(Rules));